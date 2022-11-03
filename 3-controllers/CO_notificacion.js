app.controller("notificacion", function ($scope, $http, $compile) {
    notificacion = this;
    //notificacion.singular = "singular";
    //notificacion.plural = "plural";
    notificacion.headertitle = "Notificaciones";
    //notificacion.destroyForm = false;
    //notificacion.permissionTable = "tabletopermission";
    notificacion.session = new SESSION().current();
    notificacion.poabushin = [];
    if (notificacion.institucion === "[NULL]") {
        notificacion.poabushin = [];
        for (var item of notificacion.form.options.institucion.data) {
            if (item.compania == notificacion.compania_id) {
                if (item.poa)
                    notificacion.poabushin.push(item.poa);
            }
        }
    } else {
        notificacion.poabushin = notificacion.poadd;
    }
    notificacion.fixFilters = [
        {
            field: "compania",
            value: notificacion.session.compania_id
        }
    ];
    notificacion.group_caracteristica = notificacion.session.groups[0] ? notificacion.session.groups[0].caracteristica : "";
    notificacion.director_general = ENUM_2.Grupos.director_general;
    notificacion.analista_de_planificacion = ENUM_2.Grupos.analista_de_planificacion;
    notificacion.encargado_planificacion = function () {
        // if (notificacion.group_caracteristica == notificacion.director_general || notificacion.group_caracteristica == notificacion.analista_de_planificacion) {
        if (notificacion.group_caracteristica == notificacion.director_general) {
            return true;
        } else {
            return false;
        }
    };
    RUNCONTROLLER("notificacion", notificacion, $scope, $http, $compile);
    notificacion.formulary = function (data, mode, defaultData) {
        if (notificacion !== undefined) {
            RUN_B("notificacion", notificacion, $scope, $http, $compile);
            notificacion.form.modalWidth = ENUM.modal.width.full;
            notificacion.form.readonly = {
                compania: notificacion.session.compania_id,
                institucion: notificacion.session.institucion_id,
                usuario: notificacion.session.id, active: 1
            };
            notificacion.createForm(data, mode, defaultData);
            notificacion.form.titles = {
                new: "Agregar - Notificación",
                edit: "Editar - Notificación",
                view: "Ver ALL - Notificaciones"
            };
            $scope.$watch("notificacion.title", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(notificacion, 'title', rules);
            });
            $scope.$watch("notificacion.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(notificacion, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("notificacion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'compania', rules);
            });
            //ms_product.selectQueries['usuario'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("notificacion.usuario", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'usuario', rules);
            });
            $scope.$watch("notificacion.range_date", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'range_date', rules);
            });
            $scope.$watch("notificacion.fecha_desde", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'fecha_desde', rules);
            });
            $scope.$watch("notificacion.fecha_hasta", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'fecha_hasta', rules);
            });
            $scope.$watch("notificacion.rol", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'rol', rules);
            });
            $scope.$watch("notificacion.link", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(notificacion, 'link', rules);
            });
            $scope.$watch("notificacion.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'estatus', rules);
            });
            $scope.$watch("notificacion.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notificacion, 'active', rules);
            });
            notificacion.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (mode === 'new' && data == 'range_date') {
                    notificacion.range_date = "";
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + notificacion.session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + notificacion.session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }

                    notificacion.range_date_min(rango_minimo);
                    notificacion.range_date_max(rango_maximo);
                    //cambio placebo
                    if (moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        notificacion.range_date_start(rango_minimo);
                        notificacion.range_date_end(rango_minimo);
                    }
                    notificacion.refreshAngular();
                }

                if (mode === 'edit' && data == 'range_date') {
                    var rango_minimo = moment().format("YYYY-MM-DD");
                    var rango_maximo = moment(("01-01-" + moment("01-01-" + notificacion.session.periodo_poa).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                    if (CONFIG.seguridad === "abierta" || moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                        rango_minimo = moment(("01-02-" + notificacion.session.periodo_poa)).add(-1, 'day').format("YYYY-MM-DD");
                    }
                    console.log(rango_minimo, rango_maximo)
                    notificacion.range_date_min(rango_minimo);
                    notificacion.range_date_max(rango_maximo);
                    notificacion.refreshAngular();
                }
            };
        }
    };
    notificacion.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        // notificacion.runMagicManyToMany('prueba', 'group',
        //     "notificacion", "id", "name", "notificacion_rol",
        //     "rol", "id")
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
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
    notificacion.openmodalproductos = function (value) {
        dashboard_cofiguration = null;
        dashboard = null;
        notificacion.Mproductos = value;
        if (notificacion.institucion === "[NULL]") {
            notificacion.poabushin = [];
            for (var item of notificacion.form.options.institucion.data) {
                if (item.compania == notificacion.compania_id) {
                    if (item.poa)
                        notificacion.poabushin.push(item.poa);
                }
            }
        } else {
            notificacion.poabushin = notificacion.poadd;
        }
        notificacion.modal.modalView("productos_poa", {
            width: 'modal-full',
            header: {
                title: notificacion.session.tipo_institucion === 1 ? "Proyecto/Producto "  + notificacion.Mproductos : "Proyectos/Planes de Acción " + notificacion.Mproductos,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'productos_poa',
            },
            event: {
                show: {
                    end: function(data) {
                        setTimeout(function(){
                            $('#productos_poaTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    notificacion.openmodalactividades = function (value) {
        dashboard_cofiguration = null;
        dashboard = null;
        var title = "";
        notificacion.Mactividades = value;
        switch (notificacion.Mactividades) {
            case "planificados":
                title = "planificadas";
                break;
            case "en ejecución":
                title = "en ejecución";
                break;
            case "detenidos":
                title = "detenidas";
                break;
            case "vencidos":
                title = "vencidas";
                break;
            case "cancelados":
                title = "canceladas";
                break;
            case "completados":
                title = "completadas";
                break;
            case "ejecutado":
                title = "ejecutadas";
                break;
            default:
                title = value;
        }
        switch (notificacion.Mactividades) {
            case "planificadas":
                notificacion.Mactividades = "planificados";
                break;
            case "en ejecución":
                notificacion.Mactividades = "en ejecución";
                break;
            case "ejecutado":
                notificacion.Mactividades = "completados";
                break;
            case "detenidas":
                notificacion.Mactividades = "detenidos";
                break;
            case "vencidas":
                notificacion.Mactividades = "vencidos";
                break;
            case "canceladas":
                notificacion.Mactividades = "cancelados";
                break;
            case "completadas":
                notificacion.Mactividades = "completados";
                break;
        }
        notificacion.modal.modalView("actividades_poa", {
            width: 'modal-full',
            header: {
                title: "Actividades " + title,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'actividades_poa',
            },
            event: {
                show: {
                    end: function(data) {
                        setTimeout(function(){
                            $('#actividades_poaTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    notificacion.openmodalasignaciones = function (value) {
        dashboard_cofiguration = null;
        dashboard = null;
        var title = "";
        notificacion.Masignaciones = value;
        switch (notificacion.Masignaciones) {
            case "planificados":
                title = "planificadas";
                break;
            case "en ejecución":
                title = "en ejecución";
                break;
            case "vencidos":
                title = "vencidas";
                break;
            case "cancelados":
                title = "canceladas";
                break;
            case "completados":
                title = "completadas";
                break;
            default:
                title = value;
        }
        switch (notificacion.Masignaciones) {
            case "planificadas":
                notificacion.Masignaciones = "planificados";
                break;
            case "en ejecución":
                notificacion.Masignaciones = "en ejecución";
                break;
            case "detenidas":
                notificacion.Masignaciones = "detenidos";
                break;
            case "vencidas":
                notificacion.Masignaciones = "vencidos";
                break;
            case "canceladas":
                notificacion.Masignaciones = "cancelados";
                break;
            case "completadas":
                notificacion.Masignaciones = "completados";
                break;
        }
        notificacion.modal.modalView("vw_asignacion_especial_dashboard", {
            width: 'modal-full',
            header: {
                title: "Asignaciones especiales " + title,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'vw_asignacion_especial_dashboard',
            },
            event: {
                show: {
                    end: function(data) {
                        setTimeout(function(){
                            $('#vw_asignacion_especial_dashboardTable').css('display', 'inline-table')
                        }, 1000)
                    }
                }
            }
        });
    };
    notificacion.pie_events = {
        'click': function (data) {
            console.log(data);
            dashboard_cofiguration = null;
            notificacion.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    notificacion.pie2_events = {
        'click': function (data) {
            console.log(data);
            dashboard_cofiguration = null;
            data.name = data.name == 'Sin información' ? ' ' : data.name.toString().toLowerCase();
            notificacion.openmodalactividades(data.name);
        }
    };
    notificacion.pie3_events = {
        'click': function (data) {
            dashboard_cofiguration = null;
            notificacion.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };
});
