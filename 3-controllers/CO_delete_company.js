app.controller("delete_company", function ($scope, $http, $compile) {
    delete_company = this;
    delete_company.destroyForm = false;
    RUNCONTROLLER("delete_company", delete_company, $scope, $http, $compile);
    RUN_B("delete_company", delete_company, $scope, $http, $compile);
    delete_company.rs = "";

    delete_company.deleteCompany = function () {
        SWEETALERT.confirm({
            message: "Esta seguro de realizar esta acción?",
            confirm: function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                var yesNo  = delete_company.option ? 1 : 0;
                SERVICE.planificacion_exec_functions.delete_company({ company:delete_company.company, option:yesNo },function(rs){
                    if(rs.data.error==false){
                        console.log(rs.data);
                        delete_company.rs = rs.data;
                        delete_company.company = "";
                        delete_company.refreshAngular();
                        delete_company.form.loadDropDown('company');

                    }else{
                        console.log(rs.data);
                        delete_company.rs = rs.data;
                        delete_company.company = "";
                        delete_company.refreshAngular();
                        delete_company.form.loadDropDown('company');
                    }
                    SWEETALERT.stop();
                });

            }
        });

    }
    delete_company.clearResult = function () {
        delete_company.rs = "";
        delete_company.refreshAngular();
    }
});