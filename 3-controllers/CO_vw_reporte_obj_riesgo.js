app.controller("vw_reporte_obj_riesgo", function ($scope, $http, $compile) {
    vw_reporte_obj_riesgo = this;
    vw_reporte_obj_riesgo.session = new SESSION().current();
    //vw_reporte_obj_riesgo.fixFilters = [];
    vw_reporte_obj_riesgo.singular = "singular";
    vw_reporte_obj_riesgo.plural = "plural";
    vw_reporte_obj_riesgo.headertitle = "Riesgos asociados a los Objetivos Estratégicos Institucionales";
    //vw_reporte_obj_riesgo.destroyForm = false;
    //vw_reporte_obj_riesgo.permissionTable = "tabletopermission";
    var animation = new ANIMATION();
    RUNCONTROLLER("vw_reporte_obj_riesgo", vw_reporte_obj_riesgo, $scope, $http, $compile);
    vw_reporte_obj_riesgo.formulary = function (data, mode, defaultData) {
        if (vw_reporte_obj_riesgo !== undefined) {
            RUN_B("vw_reporte_obj_riesgo", vw_reporte_obj_riesgo, $scope, $http, $compile);
            vw_reporte_obj_riesgo.form.modalWidth = ENUM.modal.width.full;
            vw_reporte_obj_riesgo.form.readonly = {};
            vw_reporte_obj_riesgo.createForm(data, mode, defaultData);
            $scope.$watch("vw_reporte_obj_riesgo.tipo_entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'tipo_entidad', rules);
            });
            $scope.$watch("vw_reporte_obj_riesgo.id_objetivo_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'id_objetivo_estrategico', rules);
            });
            $scope.$watch("vw_reporte_obj_riesgo.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'nombre', rules);
            });
            $scope.$watch("vw_reporte_obj_riesgo.eje_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'eje_estrategico', rules);
            });
            $scope.$watch("vw_reporte_obj_riesgo.objetivo_estrategico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'objetivo_estrategico', rules);
            });
            $scope.$watch("vw_reporte_obj_riesgo.riesgo_control", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'riesgo_control', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_reporte_obj_riesgo.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_reporte_obj_riesgo.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_obj_riesgo, 'institucion', rules);
            });
        }
    };
    vw_reporte_obj_riesgo.rowspanme = function (field, value, parent_field, parent_value, list) {
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
    vw_reporte_obj_riesgo.seeme = function (field, value, key, parent_field, parent_value, list) {
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
    vw_reporte_obj_riesgo.get_riesgos = async function () {
        animation.loading(`.subcontent`, "", ``, '200', undefined, true);
        vw_reporte_obj_riesgo.riesgos_list = await BASEAPI.listp('vw_reporte_obj_riesgo', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [
                {
                    field: "compania",
                    value: vw_reporte_obj_riesgo.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  vw_reporte_obj_riesgo.session.institucion_id ? "=" : "is",
                    "value":  vw_reporte_obj_riesgo.session.institucion_id ?  vw_reporte_obj_riesgo.session.institucion_id : "$null"
                },
            ]
        });
        vw_reporte_obj_riesgo.riesgos_list =  vw_reporte_obj_riesgo.riesgos_list.data;
        vw_reporte_obj_riesgo.ejes = [];
        for (var item of vw_reporte_obj_riesgo.riesgos_list) {
            if (vw_reporte_obj_riesgo.ejes.filter(d =>
                d.eje_estrategico == item.eje_estrategico
            ).length === 0) {
                vw_reporte_obj_riesgo.ejes.push({
                    eje_estrategico: item.eje_estrategico,
                    records: vw_reporte_obj_riesgo.riesgos_list.filter(d =>
                        d.eje_estrategico == item.eje_estrategico
                    )
                });
            }
        }
        animation.stoploading(`.subcontent`);
        vw_reporte_obj_riesgo.refreshAngular();
    }
    vw_reporte_obj_riesgo.get_riesgos();

    vw_reporte_obj_riesgo.exportXLS = function () {
        var url = $("#obj_riesgoExportXLS").excelexportjs({
            containerid: "obj_riesgoExportXLS",
            datatype: 'table',
            worksheetName: `Reporte de riesgos asociados a los Objetivos Estratégicos Institucionales`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte de riesgos asociados a los Objetivos Estratégicos Institucionales", url);
    };

    vw_reporte_obj_riesgo.exportPDF = function () {
        //
        $("#obj_riesgoExport").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333
        });
    };

    vw_reporte_obj_riesgo.openmodalField = function (value) {

        vw_reporte_obj_riesgo.tipeExport = value.toString();

        vw_reporte_obj_riesgo.modal.modalView("vw_reporte_obj_riesgo/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Reporte de riesgos asociados a los Objetivos Estratégicos Institucionales.`,
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