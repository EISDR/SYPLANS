/**
 * Created by EIS on 4/15/2019.
 */
app.controller("configuration_wizard", function ($scope, $http, $compile) {
    configuration_wizard = this;
    RUNCONTROLLER("configuration_wizard", configuration_wizard, $scope, $http, $compile);
    configuration_wizard.formulary = function (data, mode, defaultData) {
        if (configuration_wizard !== undefined) {
            RUN_B("configuration_wizard", configuration_wizard, $scope, $http, $compile);
            configuration_wizard.form.readonly = {};
            configuration_wizard.createForm(data, mode, defaultData);
        }
    };
});