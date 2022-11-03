app.controller("catalogo_bienes_servicios", function ($scope, $http, $compile) {
    catalogo_bienes_servicios = this;
    //catalogo_bienes_servicios.fixFilters = [];
    //catalogo_bienes_servicios.singular = "singular";
    //catalogo_bienes_servicios.plural = "plural";
    catalogo_bienes_servicios.headertitle = "Catálogo de Bienes y Servicios";
    //catalogo_bienes_servicios.destroyForm = false;
    //catalogo_bienes_servicios.permissionTable = "tabletopermission";
    RUNCONTROLLER("catalogo_bienes_servicios", catalogo_bienes_servicios, $scope, $http, $compile);
    catalogo_bienes_servicios.formulary = function (data, mode, defaultData) {
        if (catalogo_bienes_servicios !== undefined) {
            RUN_B("catalogo_bienes_servicios", catalogo_bienes_servicios, $scope, $http, $compile);
            catalogo_bienes_servicios.form.modalWidth = ENUM.modal.width.full;
            catalogo_bienes_servicios.form.readonly = {};
            catalogo_bienes_servicios.createForm(data, mode, defaultData);
            $scope.$watch("catalogo_bienes_servicios.nivel", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'nivel', rules);
            });
            $scope.$watch("catalogo_bienes_servicios.segmento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'segmento', rules);
            });
            $scope.$watch("catalogo_bienes_servicios.familia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'familia', rules);
            });
            $scope.$watch("catalogo_bienes_servicios.clase", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'clase', rules);
            });
            $scope.$watch("catalogo_bienes_servicios.material", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'material', rules);
            });
            $scope.$watch("catalogo_bienes_servicios.desc_es", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'desc_es', rules);
            });
            $scope.$watch("catalogo_bienes_servicios.desc_en", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(catalogo_bienes_servicios, 'desc_en', rules);
            });
            // $scope.$watch("catalogo_bienes_servicios.codigo_clasificador_obj1", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(catalogo_bienes_servicios, 'codigo_clasificador_obj1', rules);
            // });
            // $scope.$watch("catalogo_bienes_servicios.codigo_clasificador_obj2", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(catalogo_bienes_servicios, 'codigo_clasificador_obj2', rules);
            // });
            // $scope.$watch("catalogo_bienes_servicios.desc_clasificador_obj1", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(catalogo_bienes_servicios, 'desc_clasificador_obj1', rules);
            // });
            // $scope.$watch("catalogo_bienes_servicios.desc_clasificador_obj2", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(catalogo_bienes_servicios, 'desc_clasificador_obj2', rules);
            // });
            // $scope.$watch("catalogo_bienes_servicios.definicion", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(catalogo_bienes_servicios, 'definicion', rules);
            // });
            // $scope.$watch("catalogo_bienes_servicios.sinonimos", function (value) {
            //     var rules = [];
            //     //rules here
            //     //rules.push(VALIDATION.general.required(value));
            //     VALIDATION.validate(catalogo_bienes_servicios, 'sinonimos', rules);
            // });
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
    catalogo_bienes_servicios.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (catalogo_bienes_servicios.segmento)
            data.updating.segmento = catalogo_bienes_servicios.segmento;
        if (catalogo_bienes_servicios.familia)
            data.updating.familia = catalogo_bienes_servicios.familia;
        if (catalogo_bienes_servicios.clase)
            data.updating.clase = catalogo_bienes_servicios.clase;
        if (catalogo_bienes_servicios.material)
            data.updating.material = catalogo_bienes_servicios.material;
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