app.controller("documentos_import", function ($scope, $http, $compile) {
    documentos_import = this;
    //documentos_import.fixFilters = [];
    documentos_import.session = new SESSION().current();
    documentos_import.fixFilters = [{
        field: "compania",
        value: documentos_import.session.compania_id
    }];
    //documentos_import.singular = "singular";
    //documentos_import.plural = "plural";
    documentos_import.headertitle = "Grupo de documentos a importar";
    //documentos_import.destroyForm = false;
    //documentos_import.permissionTable = "tabletopermission";
    RUNCONTROLLER("documentos_import", documentos_import, $scope, $http, $compile);
    documentos_import.allowFields = (field) => {
        let entityValue = baseController.dynamicDocuments.filter(d => {
            return d.nombre === documentos_import.documentos_ia;
        })[0];
        if (entityValue)
            return entityValue.config.fields.filter(d => d.tipo === "7").map(d => d.from).indexOf(field) !== -1;
        return false;
    }
    documentos_import.formulary = function (data, mode, defaultData) {
        documentos_import.log = [];
        documentos_import.headertitle = "Lista de documentos a importar";
        documentos_import.refreshAngular()
        if (documentos_import !== undefined) {
            RUN_B("documentos_import", documentos_import, $scope, $http, $compile);
            documentos_import.form.modalWidth = ENUM.modal.width.full;
            documentos_import.form.readonly = {compania: documentos_import.session.compania_id};
            documentos_import.form.titles = {
                new: "Agregar Conjunto de Importación",
                edit: "Editar Conjunto de Importación",
                view: "Ver Conjunto de Importación"
            };
            documentos_import.createForm(data, mode, defaultData);
            //ms_product.selectQueries['documentos_ia'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("documentos_import.documentos_ia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_import, 'documentos_ia', rules);
            });
            $scope.$watch("documentos_import.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_import, 'nombre', rules);
            });
        }
    };
    documentos_import.TesseractPromise = (url) => new Promise((resolve, reject) => {
        Tesseract.recognize(url, 'eng').then(async ({data: {text}}) => {
            resolve(text);
        });
    });
    documentos_import.directQuery = (query, acumuladted) => new Promise((resolve, reject) => {
        let finalQuery = query;
        if (acumuladted) {
            Object.keys(acumuladted).forEach(field => {
                finalQuery = finalQuery.replaceAll(`@${field}`, acumuladted[field]);
            });
        }
        SERVICE.base_db.directQuery({query: finalQuery}, (data) => {
            if (data)
                if (data.data)
                    if (data.data.recordset)
                        if (data.data.recordset.rows)
                            if (data.data.recordset.rows[0]) {
                                resolve(data.data.recordset.rows[0]["id"]);
                                return;
                            }
            resolve(0);
        });
    });
    documentos_import.beforeData = async (toinsert) => {

    };
    documentos_import.ejecutarImport = async () => {
        var http = new HTTP();
        documentos_import.log = [];
        if (documentos_import.documentos_ia_object.tipo !== 'EXCEL') {
            BASEAPI.ajax.get(http.path(["files", "api"]), {folder: `documentos_import/profileimage/${documentos_import.id}`}, async function (data) {
                if (data)
                    if (data.data) {
                        if (data.data.files) {
                            let root = data.data.root;
                            let count = data.data.count;
                            let entityValue = baseController.dynamicDocuments.filter(d => {
                                return d.nombre === documentos_import.documentos_ia;
                            })[0];
                            SWEETALERT.loading({message: `Procesando Documentos`});
                            for (const file of data.data.files) {
                                let ix = data.data.files.indexOf(file);
                                let num = ix + 1;
                                let url = http.path([root, file]);
                                SWEETALERT.loading({message: `Procesando Documentos ${num} de ${count}`});
                                let crude = [];
                                let informe = [];
                                let result = await documentos_import.TesseractPromise(url);
                                if (result) {
                                    result.split("\n").forEach((line, ix) => {
                                        crude.push({
                                            id: ix + 1,
                                            text: line.replaceAll('"', "'")
                                        });
                                    });
                                    if (entityValue.config.fields)
                                        if (entityValue.config.fields.length) {
                                            let toinsert = {};
                                            IA.readFile(entityValue.config.fields, crude, informe);
                                            informe.forEach(info => {
                                                toinsert[info.field] = info.result;
                                            });
                                            let result = await BASEAPI.insertp(documentos_import.tabla, toinsert);
                                            let bonito = [];
                                            if (result.data.error === true)
                                                bonito.push(`<b class="text-danger">${result.data.sqlMessage}:</b>`);
                                            else
                                                Object.keys(toinsert).forEach(prop => {
                                                    if (bonito.length < 2)
                                                        bonito.push(`<b>${prop}:</b> ${toinsert[prop]}`);
                                                });
                                            documentos_import.log.push({
                                                id: num,
                                                message: `${documentos_import.tabla} insertada con exito con los valores: ${bonito.join(", ")}`
                                            });
                                        } else {
                                            documentos_import.log.push({
                                                id: num,
                                                message: `Sin insertar por falta de campos configurados`
                                            });
                                        }
                                }
                            }
                            SWEETALERT.stop();
                            documentos_import.refreshAngular();
                        } else {
                            documentos_import.log.push({
                                id: 1,
                                message: `Sin insertar por falta de Documentos Adjuntados`
                            });
                        }
                    }
            });
        } else {
            let entityValue = baseController.dynamicDocuments.filter(d => {
                return d.nombre === documentos_import.documentos_ia;
            })[0];
            let etapas = {
                "Cargando Archivos en memoria": undefined
            };
            if (entityValue) {
                entityValue = entityValue.config.data_excel;
                SWEETALERT.loading({message: SWEETALERT.checkMarks(etapas)});
                let files = await FILE.serverp(`documentos_import/profileimage/${documentos_import.id}`, undefined, "notLoad");
                etapas["Cargando Archivos en memoria"] = true;
                SWEETALERT.changeHtml(SWEETALERT.checkMarks(etapas));
                for (const file of files) {
                    if (file.original.indexOf(".xls") === -1 && file.original.indexOf(".xlsx") === -1)
                        continue;
                    if (file) {
                        etapas[`Leyendo Archivo ${file.original}`] = undefined;
                        SWEETALERT.changeHtml(SWEETALERT.checkMarks(etapas));
                        let readDoc = await FILE.xlsjsonp(`files/documentos_import/profileimage/${documentos_import.id}/${file.fileName}`, undefined, "notLoad");
                        etapas[`Leyendo Archivo ${file.original}`] = true;
                        SWEETALERT.changeHtml(SWEETALERT.checkMarks(etapas));
                        if (readDoc) {
                            let realData = readDoc.data.excel;

                            for (const sheet of entityValue.sheets) {
                                let datum = realData[sheet];
                                etapas[`Insertando:${datum.length} ${sheet}`] = undefined;
                                SWEETALERT.changeHtml(SWEETALERT.checkMarks(etapas));
                                console.log(realData);
                                let tableName = entityValue.destiny[sheet].table;
                                for (const row of datum) {
                                    let dataToInsert = {};
                                    let childsToInsert = [];
                                    let realValue = row[field.excel];
                                    for (const field of entityValue.fields[sheet]) {
                                        if (field.tipo === "SQL") {
                                            let evalor = await documentos_import.directQuery(field.from, dataToInsert);
                                            dataToInsert[field.field] = evalor || "$null";
                                        } else if (field.tipo === "fijo") {
                                            dataToInsert[field.field] = field.defaultValue || "";
                                        } else if (field.tipo === "texto") {
                                            dataToInsert[field.field] = realValue || field.defaultValue || "";
                                        } else if (field.tipo === "entero") {
                                            dataToInsert[field.field] = parseInt(realValue) || parseInt(field.defaultValue) || 0;
                                        } else if (field.tipo === "decimal") {
                                            dataToInsert[field.field] = parseFloat(realValue) || parseFloat(field.defaultValue) || 0;
                                        } else if (field.tipo === "dinero") {
                                            dataToInsert[field.field] = parseFloat(realValue) || parseFloat(field.defaultValue) || 0;
                                        } else if (field.tipo === "booleano") {
                                            if (((realValue + "") || "").trim() === (field.from || "").trim())
                                                dataToInsert[field.field] = "1";
                                            else
                                                dataToInsert[field.field] = field.defaultValue || "0";
                                        } else if (field.tipo === "fecha") {
                                            if (Number.isInteger(realValue)) {
                                                dataToInsert[field.field] = realValue ? moment("01/01/1900").add(realValue - 2, 'd').format(DSON.UNIVERSAL) : moment().format(DSON.UNIVERSAL);
                                            } else
                                                dataToInsert[field.field] = moment().format(DSON.UNIVERSAL);
                                        } else if (field.tipo === "fecha y hora") {
                                            if (Number.isInteger(realValue)) {
                                                dataToInsert[field.field] = realValue ? moment("01/01/1900").add(realValue - 2, 'd').format(DSON.UNIVERSAL) : moment().format(DSON.UNIVERSAL);
                                            } else
                                                dataToInsert[field.field] = moment().format(DSON.UNIVERSAL);
                                        } else if (field.tipo === "lista simple") {
                                            let listConfig = IA.listConfig(field.from);
                                            let elregistro = await BASEAPI.firstp(listConfig.table, {
                                                columns: [listConfig.key],
                                                where: [{
                                                    field: "$" + listConfig.desc,
                                                    value: realValue
                                                }]
                                            });
                                            if (elregistro) {
                                                dataToInsert[field.field] = elregistro[listConfig.key];
                                            } else {
                                                dataToInsert[field.field] = "$null";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    documentos_import.triggers.table.after.close = function (data) {
        documentos_import.headertitle = "Grupo de documentos a importar";
        documentos_import.refreshAngular()
    };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});