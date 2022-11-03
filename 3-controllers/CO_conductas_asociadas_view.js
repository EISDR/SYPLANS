app.controller("conductas_asociadas_view", function ($scope, $http, $compile) {
    conductas_asociadas_view = this;
    RUNCONTROLLER("conductas_asociadas_view", conductas_asociadas_view, $scope, $http, $compile);
    conductas_asociadas_view.headertitle = MESSAGE.i('planificacion.titleMarcoEstrategicoVirtudes');
    conductas_asociadas_view.formulary = function (data, mode, defaultData) {
        if (conductas_asociadas_view !== undefined) {
            RUN_B("conductas_asociadas_view", conductas_asociadas_view, $scope, $http, $compile);
            conductas_asociadas_view.createForm(data, mode, defaultData);

        }
    };
});