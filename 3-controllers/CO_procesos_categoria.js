app.controller("procesos_categoria", function ($scope, $http, $compile) {
    procesos_categoria = this;
    procesos_categoria.session = new SESSION().current();
    procesos_categoria.onlyview = false;

    //procesos_categoria.fixFilters = [];
    procesos_categoria.singular = "Macroproceso";
    procesos_categoria.plural = "Macroprocesos";
    procesos_categoria.headertitle = "Creación de Macroproceso";
    procesos_categoria.destroyForm = false;
    //procesos_categoria.permissionTable = "tabletopermission";
    RUNCONTROLLER("procesos_categoria", procesos_categoria, $scope, $http, $compile);
    RUN_B("procesos_categoria", procesos_categoria, $scope, $http, $compile);
    procesos_categoria.getMapa = async function () {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  procesos_categoria.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  procesos_categoria.session.institucion_id ? "=" : "is",
                    "value":  procesos_categoria.session.institucion_id ?  procesos_categoria.session.institucion_id : "$null"
                },
                {
                    field: "condicion",
                    value: "Vigente"
                }
            ]
        });
        if (mapaData) {
            procesos_categoria.mapa_created = true;
            procesos_categoria.mapa_id = mapaData.id;
            procesos_categoria.mapa_nombre = mapaData.nombre;
            procesos_categoria.mapa_descripcion = mapaData.descripcion;
            procesos_categoria.mapa_fecha_inicio = mapaData.fecha_inicio;
            procesos_categoria.mapa_fecha_fin = mapaData.fecha_fin;
            procesos_categoria.mapa_range_date = mapaData.fecha_inicio ? LAN.date(mapaData.fecha_inicio) + " - " + LAN.date(mapaData.fecha_fin) : "";
            procesos_categoria.mapa_estatus = mapaData.estatus + '';
            procesos_categoria.mapa_current_estatus = mapaData.estatus;
            procesos_categoria.mapa_estatus_nombre = mapaData.estatus_nombre;
            if (procesos_categoria.mapa_estatus == 3){
                procesos_categoria.onlyview = true;
                $('.icon-plus-circle2 ').parent().hide();
                procesos_categoria.refreshAngular();
            }else{
                procesos_categoria.onlyview = false;
                $('.icon-plus-circle2 ').parent().show();
                procesos_categoria.refreshAngular();
            }
            procesos_categoria.form.loadDropDown('estatus')
        }else{
            procesos_categoria.mapa_created = false;
            procesos_categoria.mapa_estatus_nombre = "En Elaboración";
            procesos_categoria.mapa_current_estatus = 1;
        }
        procesos_categoria.fixFilters = [
            {
                field: "mapa_proceso",
                value: procesos_categoria.mapa_id ? procesos_categoria.mapa_id : -1
            },
            {
                field: "compania",
                value: procesos_categoria.session.compania_id
            },
            {
                "field": "institucion",
                "operator": procesos_categoria.session.institucion_id ? "=" : "is",
                "value": procesos_categoria.session.institucion_id ? procesos_categoria.session.institucion_id : "$null"
            }
        ];
        procesos_categoria.refresh();
        procesos_categoria.refreshAngular();
    };
    procesos_categoria.getMapa();
    procesos_categoria.formulary = function (data, mode, defaultData) {
        if (procesos_categoria !== undefined) {
            RUN_B("procesos_categoria", procesos_categoria, $scope, $http, $compile);
            procesos_categoria.form.modalWidth = ENUM.modal.width.full;
            procesos_categoria.form.readonly = {compania: procesos_categoria.session.compania_id, institucion: procesos_categoria.session.institucion_id ? procesos_categoria.session.institucion_id : '$null', mapa_proceso: procesos_categoria.mapa_id };
            procesos_categoria.createForm(data, mode, defaultData);
            $scope.$watch("procesos_categoria.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procesos_categoria, 'nombre', rules);
            });
            $scope.$watch("procesos_categoria.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(procesos_categoria, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
        }
    };
    procesos_categoria.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        procesos_categoria.runMagicOneToMany('procesos', 'vw_procesos_grid', 'procesos_categoria', 'nombre', 'id');
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
