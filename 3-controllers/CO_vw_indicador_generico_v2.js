app.controller("vw_indicador_generico_v2", function ($scope, $http, $compile) {
    vw_indicador_generico_v2 = this;
    //vw_indicador_generico_v2.fixFilters = [];
    vw_indicador_generico_v2.session = new SESSION().current();
    //vw_indicador_generico_v2.fixFilters = [{
    //    field: "compania",
    //    value: vw_indicador_generico_v2.session.compania_id
    //}];
    //vw_indicador_generico_v2.singular = "singular";
    //vw_indicador_generico_v2.plural = "plural";
    //vw_indicador_generico_v2.headertitle = "Hola Title";
    //vw_indicador_generico_v2.destroyForm = false;
    //vw_indicador_generico_v2.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_indicador_generico_v2", vw_indicador_generico_v2, $scope, $http, $compile);
    vw_indicador_generico_v2.formulary = function (data, mode, defaultData) {
        if (vw_indicador_generico_v2 !== undefined) {
            RUN_B("vw_indicador_generico_v2", vw_indicador_generico_v2, $scope, $http, $compile);
            vw_indicador_generico_v2.form.modalWidth = ENUM.modal.width.full;
            vw_indicador_generico_v2.form.readonly = {compania: vw_indicador_generico_v2.session.compania_id};
            vw_indicador_generico_v2.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_indicador_generico_v2.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'compania', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.registro", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'registro', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.table_", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'table_', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'institucion', rules);
            });
            //ms_product.selectQueries['poa'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.poa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'poa', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.nombre_indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'nombre_indicador', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.condition", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'condition', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.Nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'Nombre', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.descripcion_indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'descripcion_indicador', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.fuente", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'fuente', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.metodo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'metodo', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.linea", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'linea', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.medio_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'medio_verificacion', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.tipo_meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'tipo_meta', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.direccion_meta", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'direccion_meta', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.indicador_pei_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'indicador_pei_id', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.ano_linea_base", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'ano_linea_base', rules);
            });
            //ms_product.selectQueries['caracteristica'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.caracteristica", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'caracteristica', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.desagregacion_demografica_geografia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'desagregacion_demografica_geografia', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'observacion', rules);
            });
            //ms_product.selectQueries['poa_monitoreo'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.poa_monitoreo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'poa_monitoreo', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.related", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'related', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.ano", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'ano', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'entidad', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'departamento', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.edt_mod", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'edt_mod', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.edt_ods", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'edt_ods', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.ods_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'ods_nombre', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.mod_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'mod_nombre', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.edt_indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'edt_indicador', rules);
            });
            //ms_product.selectQueries['mapa_proceso'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_indicador_generico_v2.mapa_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'mapa_proceso', rules);
            });
            $scope.$watch("vw_indicador_generico_v2.mapa_proceso_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_indicador_generico_v2, 'mapa_proceso_nombre', rules);
            });
        }
    };
    vw_indicador_generico_v2.triggers.table.after.load = function (records) {
        vw_indicador_generico_v2.runMagicColum('tipo_meta', 'tipoMeta', "id", "nombre");
        vw_indicador_generico_v2.runMagicColum('direccion_meta', 'direccionMeta', "id", "nombre");
        vw_indicador_generico_v2.runMagicManyToMany('caracteristica', "caracteristica_indicador", "indicador_generico", "id", 'nombre', "caracteristica_indicador_generico", "caracteristica", "id");
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