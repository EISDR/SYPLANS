app.controller("reporte_tipometa_formula", function ($scope, $http, $compile) {
    reporte_tipometa_formula = this;
    //reporte_tipometa_formula.fixFilters = [];
    reporte_tipometa_formula.session = new SESSION().current();
    //reporte_tipometa_formula.fixFilters = [{
    //    field: "compania",
    //    value: reporte_tipometa_formula.session.compania_id
    //}];
    reporte_tipometa_formula.singular = "Fórmula";
    reporte_tipometa_formula.plural = "Fórmulas";
    //reporte_tipometa_formula.headertitle = "Hola Title";
    //reporte_tipometa_formula.destroyForm = false;
    //reporte_tipometa_formula.permissionTable = "tabletopermission";
    RUNCONTROLLER("reporte_tipometa_formula", reporte_tipometa_formula, $scope, $http, $compile);
    reporte_tipometa_formula.reverseReplace = {
        " ": " ",
        '$RESULTMETA': "<b class=\'bg-primary\'>@RESULTADOMETA</b>",
        '$RESULTALCANZADA': "<b class=\'bg-primary\'>@RESULTADOALCANZADO</b>",
        "parseInt(": "<b class='text-primary'>ENTERO</b>(",
        "$META": "<b class=\'bg-primary\'>@META</b>",
        "&&": "<b>Y</b>",
        "<=": "<b class='text-success'><=</b>",
        ">=": "<b class='text-success'>>=</b>",
        "*": "<b class='text-success'>*</b>",
        "?": "<br><b class='text-info'>[ENTONCES]</b><br>",
        ":": "<br><b class='text-danger'>[SINO]<br></b>",
        "||": "<b class='text-danger'>[O]</b>",
        '""': "<b class=\'bg-danger\'>[VACIO]</b>",
        '`': '',
        '.value': '',
        '${': '',
        '}': '',
        'Math.abs(': '<b class=\'text-primary\'>VALORABSOLUTO</b>(',
        'addZeroes(': '<b class=\'text-primary\'>AGREGARCEROSDECIMALES</b>(',
        'Math.min(': '<b class=\'text-primary\'>MINIMO</b>(',
        'LAN.money(': '<b class=\'text-primary\'>DECIMAL</b>(',
        '.format(true)': '.<b class=\'text-primary\'>DINERO()</b>',
        '.format(false)': '',
        '$RESULT': "<b class=\'bg-primary\'>@RESULTADOFORMULA</b>",
        '$ALCANZADO': "<b class=\'bg-primary\'>@METAALCANZADA</b>",
        '$SUMA': "<b class=\'bg-primary\'>@SUMADELOSPERIODOS</b>",
        '$SUM': "<b class=\'bg-primary\'>@SUMA</b>",
        '$CANTIDAD': "<b class=\'bg-primary\'>@CANTIDADDEPERIODOS</b>",
        '(': "<b>(</b>",
        ')': "<b>)</b>"
    };
    reporte_tipometa_formula.progToNormal = (str) => {
        let result = str;
        Object.keys(reporte_tipometa_formula.reverseReplace).forEach(id => {
            let item = reporte_tipometa_formula.reverseReplace[id];
            result = result.replaceAll(id, item);
        });
        return result;
    }

    reporte_tipometa_formula.normalToProg = (str) => {
        let result = str;
        Object.keys(reporte_tipometa_formula.reverseReplace).forEach(id => {
            let item = reporte_tipometa_formula.reverseReplace[id];
            result = result.replaceAll(item, id);
        });
        return result;
    }

    reporte_tipometa_formula.formulary = function (data, mode, defaultData) {
        if (reporte_tipometa_formula !== undefined) {
            RUN_B("reporte_tipometa_formula", reporte_tipometa_formula, $scope, $http, $compile);
            reporte_tipometa_formula.form.modalWidth = ENUM.modal.width.full;
            reporte_tipometa_formula.form.readonly = {compania: reporte_tipometa_formula.session.compania_id};
            reporte_tipometa_formula.form.titles = {
                new: "Agregar Fórmulas",
                edit: "Editar Fórmulas",
                view: "Ver Fórmulas"
            };
            reporte_tipometa_formula.createForm(data, mode, defaultData);


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
    reporte_tipometa_formula.triggers.table.after.open = function (data) {
        let tipometa = baseController.session.tipoMenta.filter(d => d.id == reporte_tipometa_formula.tipo_meta)[0];
        let direccionmeta = baseController.session.direccionMeta.filter(d => d.id == reporte_tipometa_formula.direccion_meta)[0];
        reporte_tipometa_formula.descMenta = tipometa;
        reporte_tipometa_formula.descDireccion = direccionmeta;
    };
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