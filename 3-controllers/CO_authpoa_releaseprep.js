app.controller("authpoa_releaseprep", function ($scope, $http, $compile) {
    authpoa_releaseprep = this;
    //authpoa_releaseprep.singular = "singular";
    //authpoa_releaseprep.plural = "plural";
    //authpoa_releaseprep.headertitle = "Hola Title";
    authpoa_releaseprep.destroyForm = false;
    RUNCONTROLLER("authpoa_releaseprep", authpoa_releaseprep, $scope, $http, $compile);


        RUN_B("authpoa_releaseprep", authpoa_releaseprep, $scope, $http, $compile);

        authpoa_releaseprep.start_modal = function () {

            let modal = {
                width: 'modal-full',
                header: {
                    title: 'Trabajar: Autorización POA / Liberar Presupuesto - Departamental',
                    icon: ''
                },
                footer: {
                    cancelButton: false
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading'),
                    sameController: true
                },
                event: {
                    show: {
                        begin: function (data) {

                        },
                        end: function (data) {

                        }
                    }
                }
            };
            baseController.currentModel.modal.modalView('authpoa_releaseprep', modal);

        };



    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //Put This in 0-config/security/permission.json
    //"blog": {
        //"type": "empty",
        //"allow": {}
    //},
});