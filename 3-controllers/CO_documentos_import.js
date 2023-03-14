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
    documentos_import.headertitle = "Documentos";
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
    documentos_import.ejecutarImport = () => {
        var http = new HTTP();
        documentos_import.log = [];
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
                                        let result = BASEAPI.insertp(documentos_import.tabla, toinsert);
                                        let bonito = [];
                                        Object.keys(toinsert).forEach(prop => {
                                            bonito.push(`<b>${prop}:</b> ${toinsert[prop]}`);
                                        });
                                        documentos_import.log.push({
                                            id: num,
                                            message: `${documentos_import.tabla} insertada con exito con los valores:<br>${bonito.join("<br>")}`
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
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
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