app.controller("evento_indicador_relacion", function ($scope, $http, $compile) {
    evento_indicador_relacion = this;
    //evento_indicador_relacion.fixFilters = [];
    evento_indicador_relacion.session = new SESSION().current();
    if (evento_indicador.accion){
        evento_indicador_relacion.singular = "Evento";
        evento_indicador_relacion.plural = "Eventos";
        evento_indicador_relacion.headertitle = "Eventos  relacionados a Indicadores";
        evento_indicador_relacion.fixFilters = [
            {
                field: "compania",
                value: evento_indicador_relacion.session.compania_id
            },
            {
                field: "tipo",
                value: 2
            }
        ];
    }else {
        evento_indicador_relacion.singular = "Evento de Indicador";
        evento_indicador_relacion.plural = "Eventos de Indicadores";
        evento_indicador_relacion.headertitle = "Eventos relacionados a Indicadores";
        evento_indicador_relacion.fixFilters = [
            {
                field: "compania",
                value: evento_indicador_relacion.session.compania_id
            },
            {
                field: "tipo",
                value: 1
            }
        ];
    }
    //evento_indicador_relacion.destroyForm = false;
    //evento_indicador_relacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("evento_indicador_relacion", evento_indicador_relacion, $scope, $http, $compile);
    evento_indicador_relacion.formulary = function (data, mode, defaultData) {
        if (evento_indicador_relacion !== undefined) {
            RUN_B("evento_indicador_relacion", evento_indicador_relacion, $scope, $http, $compile);
            evento_indicador_relacion.form.modalWidth = ENUM.modal.width.full;
            if(evento_indicador.accion){
                evento_indicador_relacion.form.readonly = {compania: evento_indicador_relacion.session.compania_id, tipo: 2};
                evento_indicador_relacion.form.titles = {
                    new: "Agregar Evento Relacionado",
                    edit: "Editar Evento Relacionado",
                    view: "Ver Evento Relacionado"
                };
            }
            else{
                evento_indicador_relacion.form.readonly = {compania: evento_indicador_relacion.session.compania_id, tipo: 1};
                evento_indicador_relacion.form.titles = {
                    new: "Agregar Evento de Indicador Relacionado",
                    edit: "Editar Evento de Indicador Relacionado",
                    view: "Ver Evento de Indicador Relacionado"
                };
            }
            evento_indicador_relacion.createForm(data, mode, defaultData);
            $scope.$watch("evento_indicador_relacion.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador_relacion, 'nombre', rules);
            });
            $scope.$watch("evento_indicador_relacion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador_relacion, 'descripcion', rules);
            });
            $scope.$watch("evento_indicador_relacion.urgencia", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador_relacion, 'urgencia', rules);
            });
            //ms_product.selectQueries['evento_indicador'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("evento_indicador_relacion.evento_indicador", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador_relacion, 'evento_indicador', rules);
            });
            $scope.$watch("evento_indicador_relacion.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_indicador_relacion, 'tempid', rules);
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