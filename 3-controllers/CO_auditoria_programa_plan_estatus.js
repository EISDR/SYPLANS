app.controller("auditoria_programa_plan_estatus", function ($scope, $http, $compile) {
    if (typeof auditoria_programa_plan_estatus !== "undefined")
        delete auditoria_programa_plan_estatus;
    auditoria_programa_plan_estatus = this;
    //auditoria_programa_plan_estatus.fixFilters = [];
    auditoria_programa_plan_estatus.singular = "singular";
    auditoria_programa_plan_estatus.plural = "plural";
    auditoria_programa_plan_estatus.headertitle = "Estatus de Auditoría";
    auditoria_programa_plan_estatus.do_me_once = false;
    //auditoria_programa_plan_estatus.destroyForm = false;
    //auditoria_programa_plan_estatus.permissionTable = "tabletopermission";
    auditoria_programa_plan_estatus.destroyForm = false;
    if (typeof auditoria_entidad_flujo !== "undefined")
        if (auditoria_entidad_flujo.controller)
            auditoria_programa_plan_estatus.entidad_view = auditoria_entidad_flujo.controller;
    if ((window.location.href.split('?')[1]))
        auditoria_programa_plan_estatus.entidad_view = (window.location.href.split('?')[1]).replaceAll('RF', '');
    RUNCONTROLLER("auditoria_programa_plan_estatus", auditoria_programa_plan_estatus, $scope, $http, $compile);
    RUN_B("auditoria_programa_plan_estatus", auditoria_programa_plan_estatus, $scope, $http, $compile);
    auditoria_programa_plan_estatus.formulary = function (data, mode, defaultData) {
        if (auditoria_programa_plan_estatus !== undefined) {
            // RUN_B("auditoria_programa_plan_estatus", auditoria_programa_plan_estatus, $scope, $http, $compile);
            auditoria_programa_plan_estatus.form.modalWidth = ENUM.modal.width.full;
            auditoria_programa_plan_estatus.form.readonly = {entidad: auditoria_programa_plan_estatus.entidadobj.id};
            auditoria_programa_plan_estatus.createForm(data, mode, defaultData);
            $scope.$watch("auditoria_programa_plan_estatus.orden", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus, 'orden', rules);
            });
            $scope.$watch("auditoria_programa_plan_estatus.tiempo_estimado", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus, 'tiempo_estimado', rules);
            });
            $scope.$watch("auditoria_programa_plan_estatus.code", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus, 'code', rules);
            });
            $scope.$watch("auditoria_programa_plan_estatus.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus, 'nombre', rules);
            });
            $scope.$watch("auditoria_programa_plan_estatus.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_programa_plan_estatus, 'descripcion', rules);
            });
        }
    };
    auditoria_programa_plan_estatus.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        if (!auditoria_programa_plan_estatus.do_me_once) {
            auditoria_programa_plan_estatus.entidadobj = await BASEAPI.firstp('auditoria_entidad_flujo', {
                where: [{
                    field: "controller",
                    value: auditoria_programa_plan_estatus.entidad_view
                }]
            });
            auditoria_programa_plan_estatus.fixFilters = [
                {
                    "field": "entidad",
                    "value": auditoria_programa_plan_estatus.entidadobj.id
                }
            ];
            auditoria_programa_plan_estatus.entidad_view = auditoria_programa_plan_estatus.entidadobj.controller;
            auditoria_programa_plan_estatus.refresh();
            auditoria_programa_plan_estatus.do_me_once = true;
        } else {
            if (!auditoria_programa_plan_estatus.entidadobj)
                return;
            auditoria_programa_plan_estatus.plural = auditoria_programa_plan_estatus.entidadobj.nombre + ` (Estatus)`;
            auditoria_programa_plan_estatus.singular = auditoria_programa_plan_estatus.entidadobj.nombre + ` (Estatus)`;
            auditoria_programa_plan_estatus.headertitle = auditoria_programa_plan_estatus.entidadobj.nombre + ` (Estatus)`;
            //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);

            // CRUD_auditoria_programa_plan_estatus.table.columns.entidad_nombre.label = function () {
            //     if (auditoria_programa_plan_estatus.entidadobj)
            //         return auditoria_programa_plan_estatus.entidadobj.nombre;
            // };
        }
        auditoria_programa_plan_estatus.runMagicManyToMany('estatus_permitido', 'auditoria_programa_plan_estatus',
            'plan_status', 'id', 'nombre', 'auditoria_programa_plan_estatus_permitido',
            'estatus_permitido', 'id');
        auditoria_programa_plan_estatus.runMagicManyToMany('rol_permitido', 'a_clone_group',
            'plan_status', 'id', 'name', 'auditoria_programa_plan_estatus_rol',
            'rol', 'id');
    };
    auditoria_programa_plan_estatus.changeIndicador = function (table) {
        location.href = location.href.split('?')[0] + '?' + table;
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
    auditoria_programa_plan_estatus.triggers.table.after.close = function (data) {
        delete auditoria_programa_plan_estatus.id;
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    auditoria_programa_plan_estatus.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        delete data.inserting.entidad_view;
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    auditoria_programa_plan_estatus.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        delete data.updating.entidad_view;
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
