app.controller("marco_legal", function ($scope, $http, $compile) {
    marco_legal = this;
    var session = new SESSION().current();
    //marco_legal.fixFilters = [];
    marco_legal.singular = "singular";
    marco_legal.plural = "plural";
    //marco_legal.headertitle = "Hola Title";
    marco_legal.destroyForm = false;
    var do_once = false;
    //marco_legal.permissionTable = "tabletopermission";
    marco_legal.group_caracteristica = session.groups[0] ? session.groups[0].caracteristica : "";
    marco_legal.administrador_compania = ENUM_2.Grupos.solo_lectura;
    RUNCONTROLLER("marco_legal", marco_legal, $scope, $http, $compile);
    RUN_B("marco_legal", marco_legal, $scope, $http, $compile);
    if (marco_legal.group_caracteristica == marco_legal.administrador_compania){
        marco_legal.setPermission("add",false);
        marco_legal.setPermission("edit",false);
        marco_legal.setPermission("remove",false);
    }
    title_header_table_pei(marco_legal,"Marco Legal");
    marco_legal.formulary = function (data, mode, defaultData) {
        RUN_B("marco_legal", marco_legal, $scope, $http, $compile);
        if (marco_legal !== undefined) {

            marco_legal.form.modalWidth = ENUM.modal.width.full;
            marco_legal.form.readonly = {marco_estrategico: marco_legal.id_marco};
            marco_legal.createForm(data, mode, defaultData);
            $scope.$watch("marco_legal.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(marco_legal, 'nombre', rules);
            });
            $scope.$watch("marco_legal.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(marco_legal, 'descripcion', rules);
            });
            //ms_product.selectQueries['marco_estrategico'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            // $scope.$watch("marco_legal.marco_estrategico", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(marco_legal, 'marco_estrategico', rules);
            // });
            // $scope.$watch("marco_legal.tempid", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(marco_legal, 'tempid', rules);
            // });
        }
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    marco_legal.triggers.table.before.load = () => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        BASEAPI.first('marco_estrategico', {
            where: [{
                field: "pei",
                value: session.pei_id
            }]
        },function (result) {
            if (result) {
                marco_legal.id_marco = result.id;
            }
            if(!do_once){
                do_once = true;
                marco_legal.refresh();
            }
            BASEAPI.list('marco_legal',{
                where:[{
                    field: "marco_estrategico",
                    value: marco_legal.id_marco
                }]
            },function (resultado) {
                marco_estrategico_valores.legal_data = resultado.data;
                var data = {};
                console.log(resultado);
                if(resultado.data.length > 0){
                    // for (item in resultado.data){
                    //     if (!data[resultado.data[item].id])
                    //         data[resultado.data[item].id] = {};
                    //     data[resultado.data[item].id]['nombre'] = {};
                    //     data[resultado.data[item].id]['nombre']['valor'] = resultado.data[item].nombre;
                    //     if (!data[resultado.data[item].id]["data"])
                    //         data[resultado.data[item].id]["data"] = {};
                    //     if(!data[resultado.data[item].id]["data"][item])
                    //         data[resultado.data[item].id]["data"][item] ={};
                    //     data[resultado.data[item].id]["data"][item]['conducta'] = resultado.data[item].marco_estrategicos_virtudes_nombre;
                    //
                    // }
                    // marco_estrategico_valores.data = data;
                }
            });
        });
        marco_legal.fixFilters = [
            {
                "field": "marco_estrategico",
                "value": marco_legal.id_marco
            }
        ];
        resolve(true);
    });
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