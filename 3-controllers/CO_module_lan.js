app.controller("module_lan", function ($scope, $http, $compile) {
    module_lan = this;
    //module_lan.fixFilters = [];
    module_lan.session = new SESSION().current();
    //module_lan.fixFilters = [{
    //    field: "compania",
    //    value: module_lan.session.compania_id
    //}];
    module_lan.singular = "Módulo de lenguaje";
    module_lan.plural = "Módulos de lenguaje";
    module_lan.headertitle = "Módulo de lenguaje";
    //module_lan.destroyForm = false;
    //module_lan.permissionTable = "tabletopermission";
    RUNCONTROLLER("module_lan", module_lan, $scope, $http, $compile);
    module_lan.formulary = function (data, mode, defaultData) {
        if (module_lan !== undefined) {
            RUN_B("module_lan", module_lan, $scope, $http, $compile);
            module_lan.form.modalWidth = ENUM.modal.width.full;
            // module_lan.form.readonly = {compania: module_lan.session.compania_id};
            module_lan.form.titles = {
                new: "Agregar Módulo de lenguaje",
                edit: "Editar Módulo de lenguaje",
                view: "Ver Módulo de lenguaje"
            };
            module_lan.createForm(data, mode, defaultData);
            //ms_product.selectQueries['language'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("module_lan.language", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(module_lan, 'language', rules);
            });
            $scope.$watch("module_lan.key", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(module_lan, 'key', rules);
            });
            $scope.$watch("module_lan.value", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(module_lan, 'value', rules);
            });
            $scope.$watch("module_lan.ia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(module_lan, 'ia', rules);
            });
        }
    };
    module_lan.downloadJson = async function() {
        module_lan.data = await BASEAPI.listp('module_lan', {
            limit: 0,
            join: [
                {
                    'table': 'language',
                    'base': 'language',
                    'field': 'id',
                    'columns': ['nombre']
                }
            ],
        });
        module_lan.data = module_lan.data.data;

        const groupedData = module_lan.data.reduce((acc, item) => {
            if (!acc[item.language_nombre]) {
                acc[item.language_nombre] = [];
            }
            acc[item.language_nombre].push(item);
            return acc;
        }, {});
        console.log('Datos agrupados por language_nombre:', groupedData);

        Object.keys(groupedData).forEach(language => {
            const jsonData = JSON.stringify(groupedData[language], null, 4);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${language}_data.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
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