app.controller("tipo_documento", function ($scope, $http, $compile) {
    tipo_documento = this;
    tipo_documento.session = new SESSION().current();
    tipo_documento.variables = ["nombre_mapa", "nombre_proceso", "responsable_proceso", "codigo",
        "nombre", "estatus", "documento_estatus", "nombre_drp", "descripcion",
        "creador_por_nombre", "creado_en", "aprobado_por_nombre", "tipo_documento",
        "aprobado_en", "observacion", "solicitante_nombre", "solicitante_departamento", "fecha_solicitud",
        "solicitud_documento_nombre", "alcance", "objetivo", "resultado_esperado", "marco_legal",
        "folder", "version", "responsable_proceso_departamento", "documento_general", "version_documento", "es_confidencial"];
    tipo_documento.variables = tipo_documento.variables.map(d => `@${d}@`);
    tipo_documento.fixFilters = [
        {
            field: "compania",
            value: tipo_documento.session.compania_id
        },
        {
            field: "institucion",
            operator: tipo_documento.session.institucion ? "=" : "is",
            value: tipo_documento.session.institucion ? tipo_documento.session.institucion_id : "$null"
        }
    ];
    tipo_documento.singular = "Tipo de Documento";
    tipo_documento.plural = "Tipos de Documentos";
    tipo_documento.headertitle = "Tipos de Documentos";
    //tipo_documento.destroyForm = false;
    //tipo_documento.permissionTable = "tabletopermission";
    RUNCONTROLLER("tipo_documento", tipo_documento, $scope, $http, $compile);
    tipo_documento.formulary = function (data, mode, defaultData) {
        if (tipo_documento !== undefined) {
            RUN_B("tipo_documento", tipo_documento, $scope, $http, $compile);
            tipo_documento.form.modalWidth = ENUM.modal.width.full;
            tipo_documento.form.readonly = {
                compania: tipo_documento.session.compania_id,
                institucion: tipo_documento.session.institucion_id
            };
            tipo_documento.createForm(data, mode, defaultData);
            tipo_documento.form.titles = {
                new: "Nuevo - Tipo de Documento",
                edit: "Editar - Tipo de Documento",
                view: "Ver ALL - Tipo de Documento"
            };
            $scope.$watch("tipo_documento.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_documento, 'nombre', rules);
            });
            $scope.$watch("tipo_documento.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_documento, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tipo_documento.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_documento, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("tipo_documento.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(tipo_documento, 'institucion', rules);
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