app.controller("transfer_pacc", function ($scope, $http, $compile) {
    transfer_pacc = this;
    //transfer_pacc.fixFilters = [];
    //transfer_pacc.singular = "singular";
    //transfer_pacc.plural = "plural";
    //transfer_pacc.headertitle = "Hola Title";
    transfer_pacc.destroyForm = false;
    //transfer_pacc.permissionTable = "tabletopermission";
    transfer_pacc.session = new SESSION().current();
    transfer_pacc.group_caracteristica = transfer_pacc.session.groups[0] ? transfer_pacc.session.groups[0].caracteristica : "";
    transfer_pacc.analista_departamental = ENUM_2.Grupos.analista_departamental;
    transfer_pacc.director_departamental = ENUM_2.Grupos.director_departamental;
    transfer_pacc.cargar = true;
    RUNCONTROLLER("transfer_pacc", transfer_pacc, $scope, $http, $compile);
    RUN_B("transfer_pacc", transfer_pacc, $scope, $http, $compile);
    transfer_pacc.formulary = function (data, mode, defaultData) {
        if (transfer_pacc !== undefined) {
            RUN_B("transfer_pacc", transfer_pacc, $scope, $http, $compile);
            transfer_pacc.form.modalWidth = ENUM.modal.width.full;
            transfer_pacc.form.readonly = {};
            transfer_pacc.createForm(data, mode, defaultData);
            $scope.$watch("transfer_pacc.1", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(transfer_pacc, '1', rules);
            });
        }
    };
    $scope.$watch("transfer_pacc.departamento", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(transfer_pacc, 'departamento', rules);
    });
    transfer_pacc.no_trabaja_poa = function () {
        if (transfer_pacc.group_caracteristica != transfer_pacc.analista_departamental && transfer_pacc.group_caracteristica != transfer_pacc.director_departamental) {
            return true;
        } else {
            return false;
        }
    };
    transfer_pacc.triggers.table.after.control = async function (data) {
        var session = new SESSION().current();
        if (data == 'departamento') {
            if (transfer_pacc.cargar && typeof transfer_pacc.form.options.departamento != "undefined") {
                if (!transfer_pacc.no_trabaja_poa()) {
                    transfer_pacc.departamento = session.departamento + "";
                    transfer_pacc.form.options.departamento.disabled = true;
                    transfer_pacc.form.loadDropDown('departamento');
                    transfer_pacc.refreshAngular();
                    transfer_pacc.cargar = false;
                }
            }
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

    transfer_pacc.transfer_acts = async function(departamento){
        if (departamento){
            if (departamento !== '[NULL]' ){
                await merge_acts_PACC(departamento);
            }else{
                await merge_acts_PACC()
            }
        }
    }

    transfer_pacc.open_audit = function(){
        transfer_pacc.modal.modalView("vw_trans_pacc_audit", {
            width: 'modal-full',
            header: {
                title: transfer_pacc.departamento == '[NULL]' ? "Historico por Departamentos": "Historico del Departamento: " + transfer_pacc.form.selected('departamento').nombre.replace(/[\W_]+/g," ").replace(/[0-9]/g, ""),
                icon: "book3"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'vw_trans_pacc_audit',
            },
        });
    }
});