app.controller("vw_compromiso", function ($scope, $http, $compile) {
    vw_compromiso = this;
    var session = new SESSION().current();
    // vw_compromiso.fixFilters = [
    //     {
    //         field: "compania",
    //         value: session.compania_id
    //     }
    // ];
    vw_compromiso.singular = "Compromisos Nacionales e Internacionales";
    vw_compromiso.plural = "Compromisos Nacionales e Internacionales";
    vw_compromiso.headertitle = "Compromisos Nacionales e Internacionales";
    //vw_compromiso.destroyForm = false;
    //vw_compromiso.permissionTable = "tabletopermission";
    setTimeout(function (){
        if(new SESSION().current().groups[0].caracteristica == 'SL'){
            vw_compromiso.setPermission("add", false);
            vw_compromiso.setPermission("edit", false);
            vw_compromiso.setPermission("active", false);
            vw_compromiso.setPermission("remove", false);
            vw_compromiso.refreshAngular();
        }
    }, 500);
    RUNCONTROLLER("vw_compromiso", vw_compromiso, $scope, $http, $compile);
    vw_compromiso.formulary = function (data, mode, defaultData) {
        if (vw_compromiso !== undefined) {
            RUN_B("vw_compromiso", vw_compromiso, $scope, $http, $compile);
            vw_compromiso.form.modalWidth = ENUM.modal.width.full;
            vw_compromiso.form.readonly = {compania: session.compania_id, active: 1, institucion: session.institucion_id};
            vw_compromiso.createForm(data, mode, defaultData);
            $scope.$watch("vw_compromiso.tipo_compromiso", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_compromiso, 'tipo_compromiso', rules);
            });
            $scope.$watch("vw_compromiso.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_compromiso, 'nombre', rules);
            });
            $scope.$watch("vw_compromiso.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_compromiso, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
        }
    };
    vw_compromiso.triggers.table.after.load = function (records) {
        vw_compromiso.runMagicOneToMany('metas', 'otros_compromiso', 'compromiso', 'nombre', 'id');
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
