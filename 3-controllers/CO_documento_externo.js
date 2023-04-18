app.controller("documento_externo", function ($scope, $http, $compile) {
    documento_externo = this;
    //documento_externo.fixFilters = [];
    documento_externo.session = new SESSION().current();
    documento_externo.fixFilters = [
        {
           field: "compania",
           value: documento_externo.session.compania_id
        }
    ];
    documento_externo.singular = "Documento Externo";
    documento_externo.plural = "Documentos Externos";
    documento_externo.headertitle = "Documentos Externos";
    documento_externo.my_true_estatus = 1;
    //documento_externo.destroyForm = false;
    //documento_externo.permissionTable = "tabletopermission";
    RUNCONTROLLER("documento_externo", documento_externo, $scope, $http, $compile);
    documento_externo.formulary = function (data, mode, defaultData, view) {
        if (documento_externo !== undefined) {
            RUN_B("documento_externo", documento_externo, $scope, $http, $compile);
            documento_externo.form.modalWidth = ENUM.modal.width.full;
            documento_externo.form.readonly = {compania: documento_externo.session.compania_id};
            documento_externo.form.titles = {
                new: "Agregar Documento Externo",
                edit: "Editar Documento Externo",
                view: "Ver Documento Externo"
            };
            documento_externo.createForm(data, mode, defaultData, view);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            documento_externo.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: documento_externo.session.groups[0].id
                }
            ];
            $scope.$watch("documento_externo.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_externo, 'nombre', rules);
            });
            $scope.$watch("documento_externo.institucion_duena", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_externo, 'institucion_duena', rules);
            });
            $scope.$watch("documento_externo.estatus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_externo, 'estatus', rules);
            });
            $scope.$watch("documento_externo.fecha_creacion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documento_externo, 'fecha_creacion', rules);
            });
            documento_externo.triggers.table.after.control = function (data) {
                if (data === 'estatus' && mode === 'new') {
                    documento_externo.estatus = "1";
                    documento_externo.refreshAngular();
                }
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
            };
        }
    };
    documento_externo.triggers.table.after.load = async function (records) {
        await tableUtilities.filesForRecords(documento_externo, "evidencia", "id");
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
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