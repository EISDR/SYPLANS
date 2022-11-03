app.controller("vw_reporte_prod_riesgo", function ($scope, $http, $compile) {
    vw_reporte_prod_riesgo = this;
    vw_reporte_prod_riesgo.session = new SESSION().current();
    //vw_reporte_prod_riesgo.fixFilters = [];
    vw_reporte_prod_riesgo.singular = "singular";
    vw_reporte_prod_riesgo.plural = "plural";
    vw_reporte_prod_riesgo.headertitle = vw_reporte_prod_riesgo.session.tipo_institucion == 1 ? "Riesgos asociados a los Proyectos/Planes de Acción" : "Riesgos asociados a los Proyectos/Planes de Acción";
    //vw_reporte_prod_riesgo.destroyForm = false;
    //vw_reporte_prod_riesgo.permissionTable = "tabletopermission";
    var animation = new ANIMATION();
    RUNCONTROLLER("vw_reporte_prod_riesgo", vw_reporte_prod_riesgo, $scope, $http, $compile);
    vw_reporte_prod_riesgo.formulary = function (data, mode, defaultData) {
        if (vw_reporte_prod_riesgo !== undefined) {
            RUN_B("vw_reporte_prod_riesgo", vw_reporte_prod_riesgo, $scope, $http, $compile);
            vw_reporte_prod_riesgo.form.modalWidth = ENUM.modal.width.full;
            vw_reporte_prod_riesgo.form.readonly = {};
            vw_reporte_prod_riesgo.createForm(data, mode, defaultData);
            $scope.$watch("vw_reporte_prod_riesgo.tipo_entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'tipo_entidad', rules);
            });
            $scope.$watch("vw_reporte_prod_riesgo.id_producto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'id_producto', rules);
            });
            $scope.$watch("vw_reporte_prod_riesgo.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'nombre', rules);
            });
            $scope.$watch("vw_reporte_prod_riesgo.eje_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'eje_estrategico', rules);
            });
            $scope.$watch("vw_reporte_prod_riesgo.objetivo_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'objetivo_estrategico', rules);
            });
            $scope.$watch("vw_reporte_prod_riesgo.riesgo_control", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'riesgo_control', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_reporte_prod_riesgo.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_reporte_prod_riesgo.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_prod_riesgo, 'institucion', rules);
            });
        }
    };
    vw_reporte_prod_riesgo.rowspanme = function (field, value, parent_field, parent_value, list) {
        var r = 0;
        if (parent_field && parent_value) {
            r = list.filter(d => {
                if (value != ' ')
                    return eval(`d.${field}==value && d.${parent_field} == parent_value`)
            }).length;
        }else {
            r = list.filter(d => {
                if (value != ' ')
                    return eval(`d.${field}==value`)
            }).length;
        }
        return r ? r : 1;
    };
    vw_reporte_prod_riesgo.seeme = function (field, value, key, parent_field, parent_value, list) {
        if (list[key - 1])
            if (value != ' ') {
                if (parent_field && parent_value) {
                    return list[key - 1][field] != value || list[key - 1][parent_field] != parent_value;
                } else {
                    return list[key - 1][field] != value;
                }
            }
        return true;
    };
    vw_reporte_prod_riesgo.get_riesgos = async function () {
        animation.loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_reporte_prod_riesgo.riesgos_list = await BASEAPI.listp('vw_reporte_prod_riesgo', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [
                {
                    field: "compania",
                    value: vw_reporte_prod_riesgo.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  vw_reporte_prod_riesgo.session.institucion_id ? "=" : "is",
                    "value":  vw_reporte_prod_riesgo.session.institucion_id ?  vw_reporte_prod_riesgo.session.institucion_id : "$null"
                },
            ]
        });
        vw_reporte_prod_riesgo.riesgos_list =  vw_reporte_prod_riesgo.riesgos_list.data;
        vw_reporte_prod_riesgo.resultados = [];
        for (var item of vw_reporte_prod_riesgo.riesgos_list) {
            if (vw_reporte_prod_riesgo.resultados.filter(d =>
                d.resultado == item.resultado
            ).length === 0) {
                vw_reporte_prod_riesgo.resultados.push({
                    resultado: item.resultado,
                    records: vw_reporte_prod_riesgo.riesgos_list.filter(d =>
                        d.resultado == item.resultado
                    )
                });
            }
        }
        animation.stoploading(`.subcontent`);
        vw_reporte_prod_riesgo.refreshAngular();
    }
    vw_reporte_prod_riesgo.get_riesgos();

    vw_reporte_prod_riesgo.exportXLS = function () {
        var url = $("#prod_riesgoExportXLS").excelexportjs({
            containerid: "prod_riesgoExportXLS",
            datatype: 'table',
            worksheetName: `Reporte de riesgos asociados a los Productos/Proyectos`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte de riesgos asociados a los Productos/Proyectos", url);
    };

    vw_reporte_prod_riesgo.exportPDF = function () {
        //
        $("#prod_riesgoExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333
        });
    };

    vw_reporte_prod_riesgo.openmodalField = function (value) {

        vw_reporte_prod_riesgo.tipeExport = value.toString();

        vw_reporte_prod_riesgo.modal.modalView("vw_reporte_prod_riesgo/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Reporte de riesgos asociados a los Productos/Proyectos.`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }
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