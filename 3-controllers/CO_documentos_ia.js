app.controller("documentos_ia", function ($scope, $http, $compile) {
    ready = async () => {
        documentos_ia = this;
        //documentos_ia.fixFilters = [];
        documentos_ia.session = new SESSION().current();
        documentos_ia.fixFilters = [{
            field: "compania",
            value: documentos_ia.session.compania_id
        }];
        //documentos_ia.singular = "singular";
        //documentos_ia.plural = "plural";
        documentos_ia.headertitle = "Configuración Carga de Documentos";
        //documentos_ia.destroyForm = false;
        //documentos_ia.permissionTable = "tabletopermission";
        documentos_ia.movecode = (ix, array) => {
            if (array[ix - 1]) {
                let temp = array[ix - 1];
                array[ix - 1] = array[ix];
                array[ix] = temp;
            } else if (ix !== (array.length - 1)) {
                let temp = array[array.length - 1];
                array[array.length - 1] = array[ix];
                array[ix] = temp;
            }
        }
        documentos_ia.customfields = IA.customFields;
        documentos_ia.deleteField = (ix, obj) => {
            let final = obj || documentos_ia.config.fields
            if (final)
                final.splice(ix, 1);
        }
        documentos_ia.elcode = (id, ix) => {
            return documentos_ia.codes.filter(d => d.id === id)[0].params[ix] || undefined;
        }
        documentos_ia.executeCode = IA.executeCode;
        documentos_ia.valoresEspeciales = IA.valoresEspeciales;
        documentos_ia.valoresEspecialesList = IA.valoresEspecialesList;
        documentos_ia.codes = IA.codes;
        documentos_ia.addField = (obj) => {

            if (documentos_ia.config) {
                let final = obj || documentos_ia.config.fields
                if (final)
                    final.push({
                        id: new Date().getTime(),
                        field: "Field " + (documentos_ia.config.fields.length + 1),
                        tipo: "1",
                        from: 0,
                        to: 5,
                        idnex: 1,
                        script: "",
                        defaultValue: "",
                        codes: [
                            {
                                code: "L",
                                param1: null,
                                param2: null
                            }
                        ]
                    });
                else
                    documentos_ia.config = {fields: []};
            } else
                documentos_ia.config = {fields: []};
        }
        documentos_ia.excelTypes = IA.excelTypes;
        documentos_ia.lists = IA.lists;
        documentos_ia.tables = MODELLIST;
        documentos_ia.listConfig = IA.listConfig;
        documentos_ia.formated = (tipo, dato) => {
            if (tipo) {
                switch (tipo) {
                    case "date": {
                        if (Number.isInteger(dato)) {
                            return new Date(dato * 24 * 60 * 60 * 1000);
                        } else
                            return new Date(dato);
                    }
                }
            }
            return dato;
        }
        documentos_ia.getCrude = async () => {
            if (documentos_ia.tipo === 'EXCEL') {
                documentos_ia.config.data_excel = [];
                SWEETALERT.loading({message: "Obteniendo Archivo Excel"});
                let files = await FILE.serverp(`documentos_ia/excel/${documentos_ia.id}`, undefined, "notLoad");
                let xlspath = files.filter(e => {
                    return e.original.indexOf(".xls") !== -1 || e.original.indexOf(".xlsx") !== -1;
                })[0];
                if (xlspath) {
                    SWEETALERT.loading({message: "Verificando Archivo Excel"});
                    let sheets = await FILE.xlsjsonp(`files/documentos_ia/excel/${documentos_ia.id}/${xlspath.fileName}`, undefined, "notLoad");
                    if (sheets) {
                        documentos_ia.config.data_excel = sheets.data;
                        if (Object.keys(documentos_ia.config.data_excel.excel).length) {
                            documentos_ia.config.data_excel.sheets = Object.keys(documentos_ia.config.data_excel.mapping);
                            documentos_ia.config.data_excel.fields = {};
                            documentos_ia.config.data_excel.destiny = {};
                            documentos_ia.config.data_excel.sheets.forEach(d => {
                                documentos_ia.config.data_excel.fields[d] = [];
                                documentos_ia.config.data_excel.destiny[d] = {};
                            });


                            SWEETALERT.stop();
                            documentos_ia.refreshAngular();
                        } else {
                            SWEETALERT.show({
                                type: 'warning',
                                message: `El archivo Excel debe contener por lo menos un sheet(hoja)`
                            });
                        }
                    } else {
                        SWEETALERT.show({
                            type: 'warning',
                            message: `No se pudo leer el archivo Excel`
                        });
                    }
                } else {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `No es un archivo excel válido`
                    });
                }

            } else {
                if (documentos_ia.config.exampleImage) {
                    SWEETALERT.loading({message: "Processando Documento"});
                    Tesseract.recognize(documentos_ia.config.exampleImage, 'eng').then(async ({data: {text}}) => {
                        documentos_ia.config.informe_crude = [];
                        documentos_ia.config.informe = [];
                        if (text) {
                            text.split("\n").forEach((line, ix) => {
                                documentos_ia.config.informe_crude.push({
                                    id: ix + 1,
                                    text: line.replaceAll('"', "'")
                                });
                            });
                        }
                        SWEETALERT.stop();
                        documentos_ia.refreshAngular();
                    });
                } else {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `Debe proveer una Imagen de ejemplo para ejecutar esta acción`
                    });
                }
            }
        }
        documentos_ia.readFile = () => {
            if (documentos_ia.config.exampleImage) {
                documentos_ia.config.informe = [];
                if (documentos_ia.config.informe_crude.length) {
                    if ((documentos_ia.config.fields || []).length) {
                        SWEETALERT.loading({message: "Processando Informe y Configuración"});
                        IA.readFile(documentos_ia.config.fields, documentos_ia.config.informe_crude, documentos_ia.config.informe);
                        SWEETALERT.stop();
                        documentos_ia.refreshAngular();
                    } else
                        SWEETALERT.show({type: 'warning', message: `Debe configurar por lo menos un campo`});
                } else {
                    SWEETALERT.show({type: 'warning', message: `Debe generar primero el informe en bruto.`});
                }
            } else {
                SWEETALERT.show({
                    type: 'warning',
                    message: `Debe subir una Imagen de ejemplo para ejecutar esta acción`
                });
            }
        }
        documentos_ia.uploadImage = () => {
            let a = document.createElement("input");
            a.type = "file";
            a.accept = "image/png, image/gif, image/jpeg"
            a.click();
            a.onchange = () => {
                let file = a.files[0];
                if (file) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (evt) => {
                        try {
                            documentos_ia.config.exampleImage = reader.result;
                            documentos_ia.refreshAngular();
                        } catch (e) {
                            SWEETALERT.show({type: 'error', message: `Archivo inválido`});
                        }
                    };
                    reader.onerror = function () {
                        SWEETALERT.show({type: 'error', message: `Error al subir el archivo`});
                    };
                } else {
                    SWEETALERT.show({type: 'error', message: `Error al subir el archivo`});
                }
            }
        };
        RUNCONTROLLER("documentos_ia", documentos_ia, $scope, $http, $compile);
        documentos_ia.formulary = function (data, mode, defaultData) {
            if (documentos_ia !== undefined) {
                RUN_B("documentos_ia", documentos_ia, $scope, $http, $compile);
                documentos_ia.form.modalWidth = ENUM.modal.width.full;
                documentos_ia.form.readonly = {compania: documentos_ia.session.compania_id};
                documentos_ia.form.titles = {
                    new: "Agregar Documento Inteligente",
                    edit: "Editar Documento Inteligente",
                    view: "Ver Documento Inteligente"
                };
                documentos_ia.createForm(data, mode, defaultData, undefined, (data) => {
                    try {
                        if (mode === "new") {
                            documentos_ia.config = {fields: []};
                        } else {
                            let parse = (documentos_ia.config || "{fields: []}");
                            documentos_ia.config = JSON.parse(parse);
                        }
                    } catch (e) {
                        console.log(e);
                        documentos_ia.config = {fields: []};
                    }
                });
                $scope.$watch("documentos_ia.nombre", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(documentos_ia, 'nombre', rules);
                });
                $scope.$watch("documentos_ia.config", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(documentos_ia, 'config', rules);
                });
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
        // $scope.triggers.table.after.close = function (data) {
        //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        // };
        // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // documentos_ia.triggers.table.after.insert = function (data) {
        //     data.inserting.config = JSON.stringify(documentos_ia.config);
        //     return true;
        // };
        documentos_ia.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            data.inserting.config = JSON.stringify(documentos_ia.config);
            resolve(true);
        });
        //
        // $scope.triggers.table.after.update = function (data) {
        //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        // };
        documentos_ia.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            data.updating.config = JSON.stringify(documentos_ia.config);
            resolve(true);
        });
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
    };
    ready();
});