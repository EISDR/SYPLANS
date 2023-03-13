app.controller("documentos_ia", function ($scope, $http, $compile) {
    documentos_ia = this;
    //documentos_ia.fixFilters = [];
    documentos_ia.session = new SESSION().current();
    documentos_ia.fixFilters = [{
        field: "compania",
        value: documentos_ia.session.compania_id
    }];
    //documentos_ia.singular = "singular";
    //documentos_ia.plural = "plural";
    documentos_ia.headertitle = "Documentos Inteligentes";
    //documentos_ia.destroyForm = false;
    //documentos_ia.permissionTable = "tabletopermission";
    documentos_ia.deleteField = (ix) => {
        if (documentos_ia.config.fields)
            documentos_ia.config.fields.splice(ix, 1);
    }
    documentos_ia.addField = () => {
        if (documentos_ia.config)
            if (documentos_ia.config.fields)
                documentos_ia.config.fields.push({
                    id: new Date().getTime(),
                    field: "Field " + (documentos_ia.config.fields.length + 1),
                    from: 0,
                    to: 1,
                    script: "",
                    defaultValue: ""
                });
            else
                documentos_ia.config = {fields: []};
        else
            documentos_ia.config = {fields: []};
    }
    documentos_ia.getCrude = () => {
        if (documentos_ia.config.exampleImage) {
            SWEETALERT.loading({message: "Processando Imagen"});
            Tesseract.recognize(documentos_ia.config.exampleImage, 'eng').then(async ({data: {text}}) => {
                documentos_ia.config.informe_crude = [];
                documentos_ia.config.informe = [];
                console.log(text);
                if (text) {
                    console.log(text.split("\n"));
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
            SWEETALERT.show({type: 'warning', message: `Debe proveer una Imagen de ejemplo para ejecutar esta acción`});
        }
    }
    documentos_ia.readFile = () => {
        if (documentos_ia.config.exampleImage) {
            documentos_ia.config.informe = [];
            if (documentos_ia.config.informe_crude.length) {
                if ((documentos_ia.config.fields || []).length) {
                    SWEETALERT.loading({message: "Processando Informe y Configuración"});
                    documentos_ia.config.fields.forEach((field, ix) => {
                        if (field.script) {
                            try {
                                let extract = eval(field.script);
                                extract = extract.map(d => d.text).join(" ").replaceAll("\n", " ").trim();
                                documentos_ia.config.informe.push({
                                    id: ix + 1,
                                    field: field.field,
                                    result: extract
                                });
                            } catch (e) {
                                documentos_ia.config.informe.push({
                                    id: ix + 1,
                                    field: field.field,
                                    result: JSON.stringify(e)
                                });
                            }
                        } else {
                            let extract = documentos_ia.config.informe_crude.filter(d => d.id >= field.from && d.id <= field.to).map(d => d.text);
                            extract = extract.join(" ").replaceAll("\n", " ");
                            if (extract.trim()) {
                                documentos_ia.config.informe.push({
                                    id: ix + 1,
                                    field: field.field,
                                    result: extract.trim()
                                });
                            } else {
                                documentos_ia.config.informe.push({
                                    id: ix + 1,
                                    field: field.field,
                                    result: field.defaultValue
                                });
                            }
                        }
                    });
                    SWEETALERT.stop();
                    documentos_ia.refreshAngular();
                } else
                    SWEETALERT.show({type: 'warning', message: `Debe configurar por lo menos un campo`});
            } else {
                SWEETALERT.show({type: 'warning', message: `Debe generar primero el informe en bruto.`});
            }
        } else {
            SWEETALERT.show({type: 'warning', message: `Debe subir una Imagen de ejemplo para ejecutar esta acción`});
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
                console.log(data);
                try {
                    if (mode === "new") {
                        documentos_ia.config = {fields: []};
                    } else {
                        let parse = (documentos_ia.config || "{fields: []}");
                        console.log(parse);
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
});