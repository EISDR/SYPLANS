app.controller("unidad_medida", function ($scope, $http, $compile) {
    unidad_medida = this;
    var session = new SESSION().current();
    unidad_medida.fixFilters = [];
    RUNCONTROLLER("unidad_medida", unidad_medida, $scope, $http, $compile);
    unidad_medida.headertitle = "Unidad de Medida";
    unidad_medida.plural = "Unidades de Medida";
    unidad_medida.singular = "Unidad de Medida";
    unidad_medida.setPermission("active", true);
    unidad_medida.formulary = function (data, mode, defaultData) {
        if (unidad_medida !== undefined) {
            RUN_B("unidad_medida", unidad_medida, $scope, $http, $compile);
            unidad_medida.form.titles = {
                new: MESSAGE.i('planificacion.titleunidad_medida'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleunidad_medida')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleunidad_medida')}`
            };
            unidad_medida.form.readonly = {active: 1};
            unidad_medida.createForm(data, mode, defaultData);

            unidad_medida.$scope.$watch('unidad_medida.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(unidad_medida, "nombre", rules);
            });
            unidad_medida.$scope.$watch('unidad_medida.compania', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unidad_medida, "compania", rules);
            });
        }
    };
    unidad_medida.triggers.table.after.load = function (records) {
        unidad_medida.runMagicColum('compania', 'compania', "id", "nombre");
        unidad_medida.runMagicColum('institucion', 'institucion', "id", "nombre");
    };
    unidad_medida.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        data.inserting.compania = unidad_medida.compania;
        data.inserting.institucion = unidad_medida.institucion != '[NULL]' ? unidad_medida.institucion : "null";
        resolve(true);
    });
    unidad_medida.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        data.updating.compania = unidad_medida.compania;
        data.updating.institucion = unidad_medida.institucion != '[NULL]' ? unidad_medida.institucion : "null";
        resolve(true);
    });
});