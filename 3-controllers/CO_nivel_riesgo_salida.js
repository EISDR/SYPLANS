app.controller("nivel_riesgo_salida", function ($scope, $http, $compile) {
    nivel_riesgo_salida = this;
    //nivel_riesgo_salida.fixFilters = [];
    nivel_riesgo_salida.session = new SESSION().current();
    nivel_riesgo_salida.fixFilters = [
        {
           field: "compania",
           value: nivel_riesgo_salida.session.compania_id
        },
        {
            field: "proceso",
            value: 0
        },
        {
            field: "institucion",
            operator: nivel_riesgo_salida.session.institucion_id ? "=" : "is",
            value: nivel_riesgo_salida.session.institucion_id ? nivel_riesgo_salida.session.institucion_id : "$null"
        },
    ];
    //nivel_riesgo_salida.singular = "singular";
    //nivel_riesgo_salida.plural = "plural";
    nivel_riesgo_salida.headertitle = "Niveles de Riesgo";
    //nivel_riesgo_salida.destroyForm = false;
    //nivel_riesgo_salida.permissionTable = "tabletopermission";
    RUNCONTROLLER("nivel_riesgo_salida", nivel_riesgo_salida, $scope, $http, $compile);
    nivel_riesgo_salida.formulary = function (data, mode, defaultData) {
        if (nivel_riesgo_salida !== undefined) {
            RUN_B("nivel_riesgo_salida", nivel_riesgo_salida, $scope, $http, $compile);
            nivel_riesgo_salida.form.modalWidth = ENUM.modal.width.full;
            nivel_riesgo_salida.form.readonly = {compania: nivel_riesgo_salida.session.compania_id, institucion: nivel_riesgo_salida.session.institucion_id};
            nivel_riesgo_salida.form.titles = {
                new: "Agregar Nivel de Riesgo",
                edit: "Editar Nivel de Riesgo",
                view: "Ver Nivel de Riesgo"
            };
            nivel_riesgo_salida.createForm(data, mode, defaultData);
            $scope.$watch("nivel_riesgo_salida.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'nombre', rules);
            });
            $scope.$watch("nivel_riesgo_salida.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'descripcion', rules);
            });
            $scope.$watch("nivel_riesgo_salida.color", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'color', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("nivel_riesgo_salida.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("nivel_riesgo_salida.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'institucion', rules);
            });
            $scope.$watch("nivel_riesgo_salida.valor", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'valor', rules);
            });
            $scope.$watch("nivel_riesgo_salida.valor_to", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'valor_to', rules);
            });
            $scope.$watch("nivel_riesgo_salida.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(nivel_riesgo_salida, 'proceso', rules);
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
    nivel_riesgo_salida.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (!nivel_riesgo_salida.proceso) {
            var exist = await BASEAPI.listp("nivel_riesgo_salida", {
                where: [
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "proceso",
                        value: 0
                    },
                    {
                        open: '((',
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        connector: "OR",
                        value: `$ valor and valor_to`,
                        close: ')'
                    },
                    {
                        open: '(',
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`,
                        close: '))'
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con el nivel de riesgo "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }else{
            var exist = await BASEAPI.listp("nivel_riesgo_salida", {
                where: [
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "proceso",
                        value: 1
                    },
                    {
                        open: '((',
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor,
                        operator: 'BETWEEN',
                        connector: "OR",
                        value: `$ valor and valor_to`,
                        close: ')'
                    },
                    {
                        open: '(',
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.inserting.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`,
                        close: '))'
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con el nivel de riesgo "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    nivel_riesgo_salida.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (!nivel_riesgo_salida.proceso) {
            var exist = await BASEAPI.listp("nivel_riesgo_salida", {
                where: [
                    {
                        field: 'id',
                        operator: '!=',
                        value: nivel_riesgo_salida.id
                    },
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "proceso",
                        value: 0
                    },
                    {
                        open: '((',
                        field: "$" + data.updating.valor,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.updating.valor,
                        operator: 'BETWEEN',
                        connector: "OR",
                        value: `$ valor and valor_to`,
                        close: ')'
                    },
                    {
                        open: '(',
                        field: "$" + data.updating.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.updating.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`,
                        close: '))'
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con el nivel de riesgo "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }else{
            var exist = await BASEAPI.listp("nivel_riesgo_salida", {
                where: [
                    {
                        field: 'id',
                        operator: '!=',
                        value: nivel_riesgo_salida.id
                    },
                    {
                        field: 'compania',
                        value: new SESSION().current().compania_id
                    },
                    {
                        field: 'institucion',
                        operator: new SESSION().current().institucion_id ? "=" : '',
                        value: new SESSION().current().institucion_id || "$ is NULL"
                    },
                    {
                        field: "proceso",
                        value: 1
                    },
                    {
                        open: '((',
                        field: "$" + data.updating.valor,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.updating.valor,
                        operator: 'BETWEEN',
                        connector: "OR",
                        value: `$ valor and valor_to`,
                        close: ')'
                    },
                    {
                        open: '(',
                        field: "$" + data.updating.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`
                    },
                    {
                        field: "$" + data.updating.valor_to,
                        operator: 'BETWEEN',
                        value: `$ valor and valor_to`,
                        close: '))'
                    }
                ]
            });
            if (exist.data)
                if (exist.data.length) {
                    SWEETALERT.show({
                        type: 'warning',
                        message: `El rango desde y hasta interfiere con el nivel de riesgo "${exist.data[0].nombre}"`
                    });
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                }
        }
        resolve(true);
    });
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
    nivel_riesgo_salida.change_filters_salida = function () {
        nivel_riesgo_salida.fixFilters = [
            {
                field: "compania",
                value: nivel_riesgo_salida.session.compania_id
            },
            {
                field: "proceso",
                value: 0
            },
            {
                field: "institucion",
                operator: nivel_riesgo_salida.session.institucion_id ? "=" : "is",
                value: nivel_riesgo_salida.session.institucion_id ? nivel_riesgo_salida.session.institucion_id : "$null"
            },
        ];
        nivel_riesgo_salida.refresh();
    };
    nivel_riesgo_salida.change_filters_proceso = function () {
        nivel_riesgo_salida.fixFilters = [
            {
                field: "compania",
                value: nivel_riesgo_salida.session.compania_id
            },
            {
                field: "proceso",
                value: 1
            },
            {
                field: "institucion",
                operator: nivel_riesgo_salida.session.institucion_id ? "=" : "is",
                value: nivel_riesgo_salida.session.institucion_id ? nivel_riesgo_salida.session.institucion_id : "$null"
            },
        ];
        nivel_riesgo_salida.refresh();
    };
});