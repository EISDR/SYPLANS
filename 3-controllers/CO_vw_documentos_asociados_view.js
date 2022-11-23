app.controller("vw_documentos_asociados_view", function ($scope, $http, $compile) {
    vw_documentos_asociados_view = this;
    //vw_documentos_asociados_view.fixFilters = [];
    vw_documentos_asociados_view.session = new SESSION().current();
    //vw_documentos_asociados_view.fixFilters = [{
    //    field: "compania",
    //    value: vw_documentos_asociados_view.session.compania_id
    //}];
    //vw_documentos_asociados_view.singular = "singular";
    //vw_documentos_asociados_view.plural = "plural";
    vw_documentos_asociados_view.headertitle = "Documentos Asociados";
    //vw_documentos_asociados_view.destroyForm = false;
    //vw_documentos_asociados_view.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_documentos_asociados_view", vw_documentos_asociados_view, $scope, $http, $compile);
    vw_documentos_asociados_view.formulary = function (data, mode, defaultData) {
        if (vw_documentos_asociados_view !== undefined) {
            RUN_B("vw_documentos_asociados_view", vw_documentos_asociados_view, $scope, $http, $compile);
            vw_documentos_asociados_view.form.modalWidth = ENUM.modal.width.full;
            vw_documentos_asociados_view.form.readonly = {compania: vw_documentos_asociados_view.session.compania_id};
            vw_documentos_asociados_view.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_documentos_asociados_view.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_documentos_asociados_view.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_documentos_asociados_view.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'institucion', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.nombre_mapa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'nombre_mapa', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.nombre_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'nombre_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.id_responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'id_responsable_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'responsable_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'codigo', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'estatus_id', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'estatus', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.documento_estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'documento_estatus', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.nombre_drp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'nombre_drp', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'descripcion', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'proceso', rules);
            });
            //ms_product.selectQueries['procesos_categoria'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_documentos_asociados_view.procesos_categoria", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'procesos_categoria', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.creado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'creado_por', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.creado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'creado_por_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.creado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'creado_en', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.aprobado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'aprobado_por', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.aprobado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'aprobado_por_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.tipo_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'tipo_documento', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.tipo_documento_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'tipo_documento_id', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.aprobado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'aprobado_en', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'observacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'tempid', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'active', rules);
            });
            //ms_product.selectQueries['solicitud_documento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_documentos_asociados_view.solicitud_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'solicitud_documento', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.solicitante_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'solicitante_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.solicitante_departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'solicitante_departamento', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.solicitante", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'solicitante', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.fecha_solicitud", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'fecha_solicitud', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.solicitud_documento_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'solicitud_documento_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.alcance", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'alcance', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.objetivo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'objetivo', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.resultado_esperado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'resultado_esperado', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.marco_legal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'marco_legal', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.trabaja_marco_legal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'trabaja_marco_legal', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.folder", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'folder', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'version', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.responsable_proceso_departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'responsable_proceso_departamento', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.documento_general", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'documento_general', rules);
            });
            $scope.$watch("vw_documentos_asociados_view.version_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_view, 'version_documento', rules);
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