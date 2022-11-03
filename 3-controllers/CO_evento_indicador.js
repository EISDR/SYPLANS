app.controller("evento_indicador", function ($scope, $http, $compile) {
    evento_indicador = this;
    //evento_indicador.fixFilters = [];
    evento_indicador.session = new SESSION().current();
    if (window.location.href.split('?').length > 0)
        evento_indicador.accion = window.location.href.split('?')[1] === "mejora";
    //evento_indicador.destroyForm = false;
    //evento_indicador.permissionTable = "tabletopermission";
    RUNCONTROLLER("evento_indicador", evento_indicador, $scope, $http, $compile);
    if (evento_indicador.accion){
        evento_indicador.singular = "Evento";
        evento_indicador.plural = "Eventos";
        evento_indicador.headertitle = "Eventos";
        evento_indicador.fixFilters = [
            {
                field: "compania",
                value: evento_indicador.session.compania_id
            },
            {
                field: "tipo",
                value: 2
            }
        ];
    }else {
        evento_indicador.singular = "Evento de Indicador";
        evento_indicador.plural = "Eventos de Indicadores";
        evento_indicador.headertitle = "Eventos de Indicadores";
        evento_indicador.fixFilters = [
            {
                field: "compania",
                value: evento_indicador.session.compania_id
            },
            {
                field: "tipo",
                value: 1
            }
        ];
    }
    evento_indicador.formulary = function (data, mode, defaultData) {
        if (evento_indicador !== undefined) {
            RUN_B("evento_indicador", evento_indicador, $scope, $http, $compile);
            evento_indicador.form.modalWidth = ENUM.modal.width.full;
            if(evento_indicador.accion){
                evento_indicador.form.readonly = {compania: evento_indicador.session.compania_id, tipo: 2};
                evento_indicador.form.titles = {
                    new: "Agregar Evento",
                    edit: "Editar Evento",
                    view: "Ver Evento"
                };
            }
            else{
                evento_indicador.form.readonly = {compania: evento_indicador.session.compania_id, tipo: 1};
                evento_indicador.form.titles = {
                    new: "Agregar Evento de Indicador",
                    edit: "Editar Evento de Indicador",
                    view: "Ver Evento de Indicador"
                };
            }

            evento_indicador.createForm(data, mode, defaultData);
            $scope.$watch("evento_indicador.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador, 'nombre', rules);
            });
            $scope.$watch("evento_indicador.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador, 'descripcion', rules);
            });
            $scope.$watch("evento_indicador.urgencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador, 'urgencia', rules);
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