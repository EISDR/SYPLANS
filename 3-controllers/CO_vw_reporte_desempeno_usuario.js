app.controller("vw_reporte_desempeno_usuario", function ($scope, $http, $compile) {
    vw_reporte_desempeno_usuario = this;
    vw_reporte_desempeno_usuario.session = new SESSION().current();
    var do_me_once = false;
    //vw_reporte_desempeno_usuario.fixFilters = [];
    //vw_reporte_desempeno_usuario.singular = "singular";
    //vw_reporte_desempeno_usuario.plural = "plural";
    //vw_reporte_desempeno_usuario.headertitle = "Hola Title";
    vw_reporte_desempeno_usuario.destroyForm = false;
    vw_reporte_desempeno_usuario.dont_show_me = true;
    //vw_reporte_desempeno_usuario.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_reporte_desempeno_usuario", vw_reporte_desempeno_usuario, $scope, $http, $compile);
    RUN_B("vw_reporte_desempeno_usuario", vw_reporte_desempeno_usuario, $scope, $http, $compile);
    var animation = new ANIMATION();
    vw_reporte_desempeno_usuario.formulary = function (data, mode, defaultData) {
        if (vw_reporte_desempeno_usuario !== undefined) {
            RUN_B("vw_reporte_desempeno_usuario", vw_reporte_desempeno_usuario, $scope, $http, $compile);
            vw_reporte_desempeno_usuario.form.modalWidth = ENUM.modal.width.full;
            vw_reporte_desempeno_usuario.form.readonly = {};
            vw_reporte_desempeno_usuario.createForm(data, mode, defaultData);
            $scope.$watch("vw_reporte_desempeno_usuario.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_desempeno_usuario, 'nombre', rules);
            });
            $scope.$watch("vw_reporte_desempeno_usuario.calificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_desempeno_usuario, 'calificacion', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_reporte_desempeno_usuario.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_reporte_desempeno_usuario, 'responsable', rules);
            });
        }
    };
    vw_reporte_desempeno_usuario.get_actividades = function(){
        vw_reporte_desempeno_usuario.dont_show_me = true;
        let filters = [
            {
                field: "compania",
                operator: "=",
                value: vw_reporte_desempeno_usuario.session.compania_id
            },
            {
                "field": "institucion",
                "operator": vw_reporte_desempeno_usuario.session.institucion_id ? "=" : "is",
                "value":  vw_reporte_desempeno_usuario.session.institucion_id ?  vw_reporte_desempeno_usuario.session.institucion_id : "$null"
            }
        ];
        if (vw_reporte_desempeno_usuario.filter_departamento !== "[NULL]" && vw_reporte_desempeno_usuario.filter_departamento != "0") {
            filters.push({
                field: "departamento",
                value: vw_reporte_desempeno_usuario.filter_departamento
            });
        }

        if (vw_reporte_desempeno_usuario.filter_usuario !== "[NULL]") {
            filters.push(
                {
                    field: "responsable",
                    value: vw_reporte_desempeno_usuario.filter_usuario
                }
            );
        }
        animation.loading(`#reload_container`, "", ``, '130');
        BASEAPI.listp('vw_reporte_desempeno_usuario_actividades', {
            limit: 0,
            where: filters
        }).then(async function (data) {
            vw_reporte_desempeno_usuario.usuario_list = await BASEAPI.listp('vw_reporte_desempeno_usuario', {
                limit: 0,
                where: filters
            });
            vw_reporte_desempeno_usuario.usuario_list = vw_reporte_desempeno_usuario.usuario_list.data;
            vw_reporte_desempeno_usuario.actividades_list = data.data;
            vw_reporte_desempeno_usuario.usuarios = [];
            var count = 0;
            for (var i of vw_reporte_desempeno_usuario.usuario_list) {
                vw_reporte_desempeno_usuario.usuarios[count] = {
                    header: i,
                    data: vw_reporte_desempeno_usuario.actividades_list.filter(d => d.responsable === i.id && d.departamento == i.departamento)
                };
                if(vw_reporte_desempeno_usuario.actividades_list.filter(d => d.responsable === i.id && d.departamento == i.departamento).length > 0){
                    vw_reporte_desempeno_usuario.dont_show_me = false;
                }
                count++;
            }
            animation.stoploading(`#reload_container`, "", ``, '30');
            vw_reporte_desempeno_usuario.refreshAngular();
        });
    }
    vw_reporte_desempeno_usuario.get_actividades();
    vw_reporte_desempeno_usuario.findAverageCal = (arr) => {
        const { length } = arr;
        return arr.reduce((acc, val) => {
            return acc + (val.calificacion/length);
        }, 0);
    };
    vw_reporte_desempeno_usuario.get_all = function () {}
    vw_reporte_desempeno_usuario.triggers.table.after.control = function (data) {
        if (data === 'filter_departamento') {
            if (!do_me_once) {
                vw_reporte_desempeno_usuario.filter_departamento = "0";
                if (vw_reporte_desempeno_usuario.session.profile != 4 && vw_reporte_desempeno_usuario.session.profile != 5) {
                    vw_reporte_desempeno_usuario.form.options.filter_departamento.disabled = true;
                    vw_reporte_desempeno_usuario.filter_departamento = vw_reporte_desempeno_usuario.session.departamento + "";
                }

                vw_reporte_desempeno_usuario.form.loadDropDown('filter_departamento');
                do_me_once = true;
            }
        }
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    };
    $scope.$watch("vw_reporte_desempeno_usuario.filter_departamento", function (value) {
        if (value > 0) {
            vw_reporte_desempeno_usuario.selectQueries["filter_usuario"] = [
                {
                    "field": "departamento",
                    "value": value
                }
            ];
        } else {
            vw_reporte_desempeno_usuario.selectQueries["filter_usuario"] = [];
        }
        vw_reporte_desempeno_usuario.form.loadDropDown('filter_usuario');
        vw_reporte_desempeno_usuario.get_actividades();
    });
    $scope.$watch("vw_reporte_desempeno_usuario.filter_usuario", function (value) {
        if (!vw_reporte_desempeno_usuario.filter_usuario) {
            vw_reporte_desempeno_usuario.filter_usuario = '[NULL]';
            vw_reporte_desempeno_usuario.form.loadDropDown('filter_usuario');
        }
        vw_reporte_desempeno_usuario.get_actividades();
    });
    vw_reporte_desempeno_usuario.openmodalField = function (value) {

        vw_reporte_desempeno_usuario.tipeExport = value.toString();


        vw_reporte_desempeno_usuario.modal.modalView("vw_reporte_desempeno_usuario/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Reporte de Eficiencia por Usuario`,
                icon: "ICON.classes.printer2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };
    vw_reporte_desempeno_usuario.exportXLS = function () {
        var url = $("#desempenoTable").excelexportjs({
            containerid: "desempenoTable",
            datatype: 'table',
            worksheetName: `Reporte de Eficiencia por Usuario.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Reporte de Eficiencia por Usuario", url);
    };
    vw_reporte_desempeno_usuario.exportPDF = function () {

        $("#TablePDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
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