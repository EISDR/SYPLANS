app.controller("auditoria_lista_preventiva", function ($scope, $http, $compile) {
    auditoria_lista_preventiva = this;
    //auditoria_lista_preventiva.fixFilters = [];
    auditoria_lista_preventiva.session = new SESSION().current();
    auditoria_lista_preventiva.singular = "Asignar acciones preventivas";
    auditoria_lista_preventiva.plural = "Asignar acciones preventivas";
    auditoria_lista_preventiva.headertitle = "Asignar acciones preventivas";
    //auditoria_lista_preventiva.destroyForm = false;
    //auditoria_lista_preventiva.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_lista_preventiva", auditoria_lista_preventiva, $scope, $http, $compile);
    auditoria_lista_preventiva.formulary = async function (data, mode, defaultData) {
        if (auditoria_lista_preventiva !== undefined) {
            RUN_B("auditoria_lista_preventiva", auditoria_lista_preventiva, $scope, $http, $compile);
            auditoria_lista_preventiva.form.modalWidth = ENUM.modal.width.full;
            auditoria_lista_preventiva.form.readonly = {};
            auditoria_lista_preventiva.form.titles = {
                new: "Agregar Nueva Acción Preventiva",
                edit: "Editar Nueva Acción Preventiva"
            };
            auditoria_lista_preventiva.firststatus = await BASEAPI.firstp('auditoria_lista_status', {
                order: "asc",
                where: [
                    {
                        field: "id",
                        value: 1
                    }
                ]
            });
            auditoria_lista_preventiva.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_lista_preventiva.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'nombre', rules);
            });
            $scope.$watch("auditoria_lista_preventiva.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'descripcion', rules);
            });
            $scope.$watch("auditoria_lista_preventiva.elemento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'elemento', rules);
            });
            $scope.$watch("auditoria_lista_preventiva.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'tempid', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_lista_preventiva.departamento", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'departamento', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_lista_preventiva.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'responsable', rules);
            });
            $scope.$watch("auditoria_lista_preventiva.ejecucion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_preventiva, 'ejecucion', rules);
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
    auditoria_lista_preventiva.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        if (typeof vw_correctiva !== "undefined")
            vw_correctiva.refresh();
        if (typeof riesgo !== "undefined")
            riesgo.refresh();
        return true;
    };
    auditoria_lista_preventiva.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        data.inserting.estatus = 1;
        resolve(true);
    });
    //
    auditoria_lista_preventiva.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        if (typeof vw_correctiva !== "undefined")
            vw_correctiva.refresh();
        if (typeof riesgo !== "undefined")
            riesgo.refresh();
    };
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
