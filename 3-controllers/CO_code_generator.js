app.controller("code_generator", function ($scope, $http, $compile) {
    code_generator = this;
    //code_generator.fixFilters = [];
    code_generator.session = new SESSION().current();
    code_generator.fixFilters = [{
        field: "compania",
        value: code_generator.session.compania_id
    }];
    code_generator.singular = "Nomenclatura para Código";
    code_generator.plural = "Nomenclaturas para Códigos";
    code_generator.headertitle = "Nomenclaturas para Códigos";
    //code_generator.destroyForm = false;
    //code_generator.permissionTable = "tabletopermission";
    RUNCONTROLLER("code_generator", code_generator, $scope, $http, $compile);
    code_generator.formulary = function (data, mode, defaultData) {
        if (code_generator !== undefined) {
            RUN_B("code_generator", code_generator, $scope, $http, $compile);
            code_generator.form.modalWidth = ENUM.modal.width.full;
            code_generator.form.readonly = {compania: code_generator.session.compania_id};
            code_generator.form.titles = {
                new: "Agregar Nomenclatura",
                edit: "Editar Nomenclatura",
                view: "Ver Nomenclatura"
            };
            code_generator.createForm(data, mode, defaultData);
            $scope.$watch("code_generator.nomenclatura", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(code_generator, 'nomenclatura', rules);
            });
            $scope.$watch("code_generator.modulo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(code_generator, 'modulo', rules);
            });
        }
    };
    code_generator.triggers.table.after.load = async function (records) {
        let nuevos = false;
        let registradasEmpresa = await BASEAPI.listf("code_generator",
            [{
                field: 'compania',
                value: code_generator.session.compania_id
            }]
        );
        console.log(registradasEmpresa);
        let modulos = ["Módulo de Calidad -> Documentos", "Módulo de Calidad -> Procesos", "Módulo de Calidad -> Solicitud de Documentos", "Módulo de Calidad -> Solicitud de Procesos"];
        for (const modulo of modulos) {
            let exist = registradasEmpresa.filter(d => {
                return d.modulo === modulo;
            }).length;
            if (!exist) {
                await BASEAPI.insertp("code_generator", {
                    nomenclatura: modulo.split(" ").pop().substr(0, 3).toUpperCase() + "-@S",
                    modulo: modulo,
                    compania: code_generator.session.compania_id
                });
                nuevos = true;
            }
        }
        if (nuevos)
            code_generator.refresh();
    };
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