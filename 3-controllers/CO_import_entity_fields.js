app.controller("import_entity_fields", function ($scope, $http, $compile) {
    import_entity_fields = this;
    //import_entity_fields.fixFilters = [];
    //import_entity_fields.singular = "singular";
    //import_entity_fields.plural = "plural";
    import_entity_fields.headertitle = "Campos del Import";
    //import_entity_fields.destroyForm = false;
    //import_entity_fields.permissionTable = "tabletopermission";
    RUNCONTROLLER("import_entity_fields", import_entity_fields, $scope, $http, $compile);
    import_entity_fields.formulary = function (data, mode, defaultData) {
        if (import_entity_fields !== undefined) {
            RUN_B("import_entity_fields", import_entity_fields, $scope, $http, $compile);
            import_entity_fields.form.modalWidth = ENUM.modal.width.full;
            import_entity_fields.form.readonly = {};
            import_entity_fields.createForm(data, mode, defaultData);
            $scope.$watch("import_entity_fields.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'nombre', rules);
            });
            $scope.$watch("import_entity_fields.field_name", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'field_name', rules);
            });
            $scope.$watch("import_entity_fields.required", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'required', rules);
            });
            $scope.$watch("import_entity_fields.validacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'validacion', rules);
            });
            $scope.$watch("import_entity_fields.fkof", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'fkof', rules);
            });
            $scope.$watch("import_entity_fields.multipleof", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'multipleof', rules);
            });
            //ms_product.selectQueries['import_entity'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("import_entity_fields.import_entity", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'import_entity', rules);
            });
            $scope.$watch("import_entity_fields.query", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'query', rules);
            });
            $scope.$watch("import_entity_fields.field_excel", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(import_entity_fields, 'field_excel', rules);
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