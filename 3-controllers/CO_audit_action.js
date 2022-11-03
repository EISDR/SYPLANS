app.controller("audit_action", function ($scope, $http, $compile) {
    audit_action = this;
    // audit_action.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": SESSION.current().compania
    //     }
    // ];
    RUNCONTROLLER("audit_action", audit_action, $scope, $http, $compile);

    audit_action.formulary = function (data, mode, defaultData) {
        if (audit_action !== undefined) {
            RUN_B("audit_action", audit_action, $scope, $http, $compile);
            audit_action.form.titles = {
                new: MESSAGE.i('planificacion.titleaudit_action'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleaudit_action')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleaudit_action')}`
            };
            audit_action.form.readonly = {};
            audit_action.createForm(data, mode, defaultData);
        }
    };
});