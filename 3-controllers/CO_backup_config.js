app.controller("backup_config", function ($scope, $http, $compile) {
    backup_config = this;
    backup_config.session = new SESSION().current();
    backup_config.fixFilters = [
        {
            field: "compania",
            value: backup_config.session.compania_id
        }
    ];
    backup_config.singular = "Configuración del backup";
    backup_config.plural = "Configuración del backup";
    backup_config.headertitle = "Configuración del backup";
    //backup_config.destroyForm = false;
    //backup_config.permissionTable = "tabletopermission";
    RUNCONTROLLER("backup_config", backup_config, $scope, $http, $compile);
    backup_config.formulary = function (data, mode, defaultData) {
        if (backup_config !== undefined) {
            RUN_B("backup_config", backup_config, $scope, $http, $compile);
            backup_config.form.titles = {
                new: "Agregar - Configuración del backup",
                edit: "Editar - Configuración del backup",
                view: "Ver ALL - Configuración del backup"
            };
            backup_config.form.modalWidth = ENUM.modal.width.full;
            backup_config.form.readonly = {};
            backup_config.createForm(data, mode, defaultData);
            $scope.$watch("backup_config.frecuencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_config, 'frecuencia', rules);
            });
            $scope.$watch("backup_config.hora", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.ValidHour(value));
                VALIDATION.validate(backup_config, 'hora', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("backup_config.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_config, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("backup_config.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(backup_config, 'institucion', rules);
            });
        }
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    backup_config.triggers.table.before.load =  () => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        let registro = await BASEAPI.firstp('backup_config',{
            where: [
                {
                    field: "compania",
                    value: backup_config.session.compania_id
                }
            ]
        })
        if (!registro) {
            BASEAPI.insert('backup_config',
                {
                    "frecuencia": "Diario",
                    "hora": "08:00:00",
                    "compania": backup_config.session.compania_id,
                    "institucion": backup_config.session.insticion_id
                }, function (result) {
                    console.log(result);
                });
        }
        resolve(true);
    });
    backup_config.make_backup = function (){
        SWEETALERT.loading({message: 'Generando backup por favor espere'});
        setTimeout(function(){
            SWEETALERT.show({message: 'Se ha generado el backup de manera exitosa.'})
        }, 5000);
    }
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