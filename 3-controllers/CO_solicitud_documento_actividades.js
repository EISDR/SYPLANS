app.controller("solicitud_documento_actividades", function ($scope, $http, $compile) {
    solicitud_documento_actividades = this;
    solicitud_documento_actividades.session = new SESSION().current();
    //solicitud_documento_actividades.fixFilters = [];
    //solicitud_documento_actividades.singular = "singular";
    //solicitud_documento_actividades.plural = "plural";
    solicitud_documento_actividades.headertitle = "Actividades";
    //solicitud_documento_actividades.destroyForm = false;
    //solicitud_documento_actividades.permissionTable = "tabletopermission";
    RUNCONTROLLER("solicitud_documento_actividades", solicitud_documento_actividades, $scope, $http, $compile);
    solicitud_documento_actividades.formulary = function (data, mode, defaultData) {
        if (solicitud_documento_actividades !== undefined) {
            RUN_B("solicitud_documento_actividades", solicitud_documento_actividades, $scope, $http, $compile);
            solicitud_documento_actividades.form.modalWidth = ENUM.modal.width.full;
            solicitud_documento_actividades.form.readonly = {};
            solicitud_documento_actividades.createForm(data, mode, defaultData);
            solicitud_documento_actividades.form.titles = {
                new: baseController.currentModel.modelName === 'documentos_asociados' ? 'Nueva Actividad del Documento Asociado: "' + documentos_asociados.nombre + '"' :'Nueva Actividad de la Solicitud del Documento: "' + solicitud_documento.nombre + '"'
            };
            $scope.$watch("solicitud_documento_actividades.no_orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'no_orden', rules);
            });
            $scope.$watch("solicitud_documento_actividades.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'nombre', rules);
            });
            $scope.$watch("solicitud_documento_actividades.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'responsable', rules);
            });
            $scope.$watch("solicitud_documento_actividades.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(solicitud_documento_actividades, 'descripcion', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
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
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    solicitud_documento_actividades.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (baseController.currentModel.modelName === 'documentos_asociados') {
            var validatett = await BASEAPI.firstp("solicitud_documento_actividades", {
                where: [
                    {
                        field: "no_orden",
                        operator: "=",
                        value: data.inserting.no_orden
                    },
                    {
                        open: "(",
                        field: "documento_asociado",
                        operator: "=",
                        value: documentos_asociados.id ? documentos_asociados.id : "$null",
                        connector: "OR"
                    },
                    {
                        close: ")",
                        field: "tempid",
                        operator: "=",
                        value: `documentos_asociados${documentos_asociados.form.options.funciones.tempId}`
                    },
                ]
            });
            if (validatett) {
                SWEETALERT.show({
                    type: "error",
                    title: "",
                    message: "Para este Documento Asociado existe una Actividad con el No. Secuencia: " + data.inserting.no_orden
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        }else{
            var validatett = await BASEAPI.firstp("solicitud_documento_actividades", {
                where: [
                    {
                        field: "no_orden",
                        operator: "=",
                        value: data.inserting.no_orden
                    },
                    {
                        open: "(",
                        field: "solicitud_documento",
                        operator: "=",
                        value: solicitud_documento.id ? solicitud_documento.id : "$null",
                        connector: "OR"
                    },
                    {
                        close: ")",
                        field: "tempid",
                        operator: "=",
                        value: `documentos_asociados${solicitud_documento.form.options.funciones.tempId}`
                    },
                ]
            });
            if (validatett) {
                SWEETALERT.show({
                    type: "error",
                    title: "",
                    message: "Para esta Solicitud de Documento existe una Actividad con el No. Secuencia: " + data.inserting.no_orden
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    solicitud_documento_actividades.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (baseController.currentModel.modelName === 'documentos_asociados') {
            var validatett = await BASEAPI.firstp("solicitud_documento_actividades", {
                where: [
                    {
                        field: "no_orden",
                        operator: "=",
                        value: data.updating.no_orden
                    },
                    {
                        open: "(",
                        field: "documento_asociado",
                        operator: "=",
                        value: documentos_asociados.id ? documentos_asociados.id : "$null",
                        connector: "OR"
                    },
                    {
                        close: ")",
                        field: "tempid",
                        operator: "=",
                        value: `documentos_asociados${documentos_asociados.form.options.funciones.tempId}`
                    },
                    {
                        field: "id",
                        operator: "!=",
                        value: solicitud_documento_actividades.id
                    },
                ]
            });
            if (validatett) {
                SWEETALERT.show({
                    type: "error",
                    title: "",
                    message: "Para este Documento Asociado existe una Actividad con el No. Secuencia: " + data.updating.no_orden
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        }else{
            var validatett = await BASEAPI.firstp("solicitud_documento_actividades", {
                where: [
                    {
                        field: "no_orden",
                        operator: "=",
                        value: data.updating.no_orden
                    },
                    {
                        open: "(",
                        field: "solicitud_documento",
                        operator: "=",
                        value: solicitud_documento.id ? solicitud_documento.id : "$null",
                        connector: "OR"
                    },
                    {
                        close: ")",
                        field: "tempid",
                        operator: "=",
                        value: `documentos_asociados${solicitud_documento.form.options.funciones.tempId}`
                    },
                    {
                        field: "id",
                        operator: "!=",
                        value: solicitud_documento_actividades.id
                    },
                ]
            });
            if (validatett) {
                SWEETALERT.show({
                    type: "error",
                    title: "",
                    message: "Para esta Solicitud de Documento existe una Actividad con el No. Secuencia: " + data.updating.no_orden
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            }
        }
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