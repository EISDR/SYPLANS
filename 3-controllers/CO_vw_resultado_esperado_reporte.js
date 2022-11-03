app.controller("vw_resultado_esperado_reporte", function ($scope, $http, $compile) {
    vw_resultado_esperado_reporte = this;
    vw_resultado_esperado_reporte.session = new SESSION().current();
    //vw_resultado_esperado_reporte.fixFilters = [];
    vw_resultado_esperado_reporte.singular = "singular";
    vw_resultado_esperado_reporte.plural = "plural";
    vw_resultado_esperado_reporte.headertitle = "Riesgos asociados a los Resultados Esperados";
    //vw_resultado_esperado_reporte.destroyForm = false;
    //vw_resultado_esperado_reporte.permissionTable = "tabletopermission";
    var animation = new ANIMATION();
    RUNCONTROLLER("vw_resultado_esperado_reporte", vw_resultado_esperado_reporte, $scope, $http, $compile);
    vw_resultado_esperado_reporte.formulary = function (data, mode, defaultData) {
        if (vw_resultado_esperado_reporte !== undefined) {
            RUN_B("vw_resultado_esperado_reporte", vw_resultado_esperado_reporte, $scope, $http, $compile);
            vw_resultado_esperado_reporte.form.modalWidth = ENUM.modal.width.full;
            vw_resultado_esperado_reporte.form.readonly = {};
            vw_resultado_esperado_reporte.createForm(data, mode, defaultData);
            $scope.$watch("vw_resultado_esperado_reporte.tipo_entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'tipo_entidad', rules);
            });
            $scope.$watch("vw_resultado_esperado_reporte.id_objetivo_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'id_objetivo_estrategico', rules);
            });
            $scope.$watch("vw_resultado_esperado_reporte.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'nombre', rules);
            });
            $scope.$watch("vw_resultado_esperado_reporte.eje_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'eje_estrategico', rules);
            });
            $scope.$watch("vw_resultado_esperado_reporte.objetivo_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'objetivo_estrategico', rules);
            });
            $scope.$watch("vw_resultado_esperado_reporte.riesgo_control", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'riesgo_control', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_resultado_esperado_reporte.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_resultado_esperado_reporte.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_resultado_esperado_reporte, 'institucion', rules);
            });
        }
    };
    vw_resultado_esperado_reporte.rowspanme = function (field, value, parent_field, parent_value, list) {
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
    vw_resultado_esperado_reporte.seeme = function (field, value, key, parent_field, parent_value, list) {
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
    vw_resultado_esperado_reporte.get_riesgos = async function () {
        animation.loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_resultado_esperado_reporte.riesgos_list = await BASEAPI.listp('vw_resultado_esperado_reporte', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [
                {
                    field: "compania",
                    value: vw_resultado_esperado_reporte.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  vw_resultado_esperado_reporte.session.institucion_id ? "=" : "is",
                    "value":  vw_resultado_esperado_reporte.session.institucion_id ?  vw_resultado_esperado_reporte.session.institucion_id : "$null"
                },
            ]
        });
        vw_resultado_esperado_reporte.riesgos_list =  vw_resultado_esperado_reporte.riesgos_list.data;
        vw_resultado_esperado_reporte.ejes = [];
        for (var item of vw_resultado_esperado_reporte.riesgos_list) {
            if (vw_resultado_esperado_reporte.ejes.filter(d =>
                d.eje_estrategico == item.eje_estrategico &&
                d.objetivo_estrategico == item.objetivo_estrategico
            ).length === 0) {
                vw_resultado_esperado_reporte.ejes.push({
                    eje_estrategico: item.eje_estrategico,
                    objetivo_estrategico: item.objetivo_estrategico,
                    records: vw_resultado_esperado_reporte.riesgos_list.filter(d =>
                        d.eje_estrategico == item.eje_estrategico &&
                        d.objetivo_estrategico == item.objetivo_estrategico
                    )
                });
            }
        }
        animation.stoploading(`.subcontent`);
        vw_resultado_esperado_reporte.refreshAngular();
    }
    vw_resultado_esperado_reporte.get_riesgos();

    vw_resultado_esperado_reporte.exportXLS = function () {
        var url = $("#res_riesgoExportXLS").excelexportjs({
            containerid: "res_riesgoExportXLS",
            datatype: 'table',
            worksheetName: `Reporte de riesgos asociados a los Resultados Esperados`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte de riesgos asociados a los Resultados Esperados", url);
    };

    vw_resultado_esperado_reporte.exportPDF = function () {
        //
        $("#res_riesgoExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333
        });
    };

    vw_resultado_esperado_reporte.openmodalField = function (value) {

        vw_resultado_esperado_reporte.tipeExport = value.toString();

        vw_resultado_esperado_reporte.modal.modalView("vw_resultado_esperado_reporte/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Reporte de riesgos asociados a los Resultados Esperados.`,
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