app.controller("vw_documentos_asociados_pv2", function ($scope, $http, $compile) {
    vw_documentos_asociados_pv2 = this;
    //vw_documentos_asociados_pv2.fixFilters = [];
    vw_documentos_asociados_pv2.session = new SESSION().current();
    //vw_documentos_asociados_pv2.fixFilters = [{
    //    field: "compania",
    //    value: vw_documentos_asociados_pv2.session.compania_id
    //}];
    //vw_documentos_asociados_pv2.singular = "singular";
    //vw_documentos_asociados_pv2.plural = "plural";
    //vw_documentos_asociados_pv2.headertitle = "Hola Title";
    vw_documentos_asociados_pv2.destroyForm = false;
    //vw_documentos_asociados_pv2.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_documentos_asociados_pv2", vw_documentos_asociados_pv2, $scope, $http, $compile);
    RUN_B("vw_documentos_asociados_pv2", vw_documentos_asociados_pv2, $scope, $http, $compile);
    $scope.$watch("vw_documentos_asociados_pv2.plan", async function (value) {
        var rules = [];
        //rules here
        SWEETALERT.loading({message: "Cargando Informe Preliminar"});
        vw_documentos_asociados_pv2.fixFilters = [
            {
                field: 'programa_plan',
                value: vw_documentos_asociados_pv2.plan,
            }
        ];
        vw_documentos_asociados_pv2.refresh(async () => {
            SWEETALERT.stop();
            vw_documentos_asociados_pv2.refreshAngular();
        });
    });
    vw_documentos_asociados_pv2.formulary = function (data, mode, defaultData) {
        if (vw_documentos_asociados_pv2 !== undefined) {
            vw_documentos_asociados_pv2.form.modalWidth = ENUM.modal.width.full;
            vw_documentos_asociados_pv2.form.readonly = {compania: vw_documentos_asociados_pv2.session.compania_id};
            vw_documentos_asociados_pv2.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_documentos_asociados_pv2.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_documentos_asociados_pv2.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'compania', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.nombre_mapa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'nombre_mapa', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.nombre_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'nombre_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.id_responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'id_responsable_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'responsable_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'codigo', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'estatus_id', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'estatus', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.nombre_drp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'nombre_drp', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.programa_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'programa_plan', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.id_punto_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'id_punto_verificacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.punto_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'punto_verificacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.cumple", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'cumple', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.observaciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'observaciones', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.tipo_inconformidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'tipo_inconformidad', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'descripcion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.creado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'creado_por', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.creado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'creado_por_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.creado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'creado_en', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.aprobado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'aprobado_por', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.aprobado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'aprobado_por_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.tipo_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'tipo_documento', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.aprobado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'aprobado_en', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'observacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'tempid', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.responsable_ducumento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'responsable_ducumento', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv2.comentfinal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv2, 'comentfinal', rules);
            });
        }
    };
    vw_documentos_asociados_pv2.allow_estatus = function (estatus){
        let permitidos = [5,7,8];
        return permitidos.includes(estatus);
    }
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