app.controller("control_mando_b", function ($scope, $http, $compile) {
    control_mando_b = this;
    //control_mando_b.fixFilters = [];
    //control_mando_b.singular = "singular";
    //control_mando_b.plural = "plural";
    //control_mando_b.headertitle = "Hola Title";
    //control_mando_b.destroyForm = false;
    //control_mando_b.permissionTable = "tabletopermission";
    let do_me_once = false;
    control_mando_b.session = new SESSION().current();
    RUNCONTROLLER("control_mando_b", control_mando_b, $scope, $http, $compile);
    RUN_B("control_mando_b", control_mando_b, $scope, $http, $compile);
    control_mando_b.poco = (str) => {
        return v.prune(str, 170);
    };
    control_mando_b.paginations = {
        itemsPerPage: 2,
        show: (item, i) => {
            return i >= ((item.currentPage) * item.pageSize) && i < ((item.currentPage + 1) * item.pageSize);
        },
        pages: (item) => {
            if (item.data)
                return Math.ceil(item.data.length / item.pageSize);
        },
        productos: {
            currentPage: 0,
            pageSize: 6,
            data: [],
        },
        actividades: {
            currentPage: 0,
            pageSize: 6,
            data: [],
        },
        grid: {}
    };
    $scope.$watch("control_mando_b.paginations.productos.currentPage", function (value) {

        setTimeout(() => {
            resizeCharts();
        }, 100);
    });
    $scope.$watch("control_mando_b.paginations.actividades.currentPage", function (value) {
        $("graficosactividades").hide();
        setTimeout(() => {
            resizeCharts();
            $("graficosactividades").show("slow");
        }, 100);
    });

    control_mando_b.formulary = function (data, mode, defaultData) {
        if (control_mando_b !== undefined) {
            RUN_B("control_mando_b", control_mando_b, $scope, $http, $compile);
            control_mando_b.form.modalWidth = ENUM.modal.width.full;
            control_mando_b.form.readonly = {};
            control_mando_b.createForm(data, mode, defaultData);
        }
    };
    control_mando_b.selecteds = {
        usuario: null,
        departamento: null
    };
    control_mando_b.init = async () => {

        control_mando_b.oreder = control_mando_b.session.tipo_institucion === 1 ? 'no_orden' : 'no_orden_privada';
        control_mando_b.name = control_mando_b.session.tipo_institucion === 1 ? 'nombre' : 'nombre_privada';
        control_mando_b.perspectivas = await BASEAPI.listp('perspectiva', {
            limit: 0,
            orderby: control_mando_b.oreder,
            order: "asc",
        });
        control_mando_b.icons = [];
        control_mando_b.perspectivas = control_mando_b.perspectivas.data;
        control_mando_b.perspectivas.forEach(d => {
            if (d.nombre === "Usuario")
                control_mando_b.icons.push("user");
            if (d.nombre === "Proceso - Operacional")
                control_mando_b.icons.push("gear");
            if (d.nombre === "Persona - Conocimiento")
                control_mando_b.icons.push("users4");
            if (d.nombre === "Finanzas")
                control_mando_b.icons.push("coin-dollar");
        });
        control_mando_b.refreshAngular();
    };
    control_mando_b.clean = () => {
        control_mando_b.filter_departamento = '[NULL]';
        control_mando_b.filter_usuario = '[NULL]';
        control_mando_b.showtable = false;
        control_mando_b.productos = [];
    };
    control_mando_b.triggers.table.after.control = function (data) {
        if (data === 'filter_departamento') {
            if (!do_me_once) {
                control_mando_b.filter_departamento = "0";

                control_mando_b.fixed = false;
                if (control_mando_b.session.profile != 4 && control_mando_b.session.profile != 5) {
                    control_mando_b.fixed = true;
                    control_mando_b.form.options.filter_departamento.disabled = true;
                    control_mando_b.filter_departamento = control_mando_b.session.departamento + "";
                }

                control_mando_b.form.loadDropDown('filter_departamento');


                control_mando_b.getTabla();
                do_me_once = true;
            }
        }
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    };
    control_mando_b.getEjes = async (pid) => {
        SWEETALERT.loading({message: "Listando Ejes Estratégicos"});
        control_mando_b.selecteds.perspectiva = pid;
        let whersito = [
            {
                field: "compania",
                value: control_mando_b.session.compania_id
            },
            {
                field: "institucion",
                operator: "is",
                value: "$null"
            }
        ];
        if (control_mando_b.session.institucion_id) {
            whersito = [
                {
                    field: "compania",
                    value: control_mando_b.session.compania_id
                },
                {
                    field: "institucion",
                    value: control_mando_b.session.institucion_id
                }
            ]
        }
        control_mando_b.ejes = await BASEAPI.listp('vw_cm_ejes', {
            where: whersito,
            orderby: 'no_orden',
            order: "asc",
            limit: 0
        });
        control_mando_b.ejes = control_mando_b.ejes.data;
        control_mando_b.clean();
        control_mando_b.refreshAngular();
        $(".lostabs li a:eq(0)").trigger("click");
        SWEETALERT.stop();
    };
    control_mando_b.getObjetivos = async (pid) => {
        SWEETALERT.loading({message: "Listando Objetivos Estratégicos"});
        control_mando_b.selecteds.eje = pid;
        control_mando_b.clean();
        control_mando_b.refreshAngular();
        SWEETALERT.stop();
    };
    control_mando_b.money = (val) => {
        return LAN.money(val).format(true);
    };
    $scope.$watch("control_mando_b.filter_objetivo", function (value) {
        control_mando_b.getTabla();
    });
    $scope.$watch("control_mando_b.filter_departamento", function (value) {
        if (value > 0) {
            control_mando_b.selectQueries["filter_usuario"] = [
                {
                    "field": "departamento",
                    "value": value
                }
            ];
        } else {
            control_mando_b.selectQueries["filter_usuario"] = [];
        }
        control_mando_b.form.loadDropDown('filter_usuario');
        control_mando_b.getTabla();
    });
    $scope.$watch("control_mando_b.filter_usuario", function (value) {
        if (!control_mando_b.filter_usuario) {
            control_mando_b.filter_usuario = '[NULL]';
            control_mando_b.form.loadDropDown('filter_usuario');
        }
        control_mando_b.getTabla();
    });
    control_mando_b.showtable = false;
    control_mando_b.getTabla = async () => {
        if (!DSON.oseaX0(control_mando_b.filter_departamento) || !DSON.oseaX(control_mando_b.filter_usuario)) {
            SWEETALERT.loading({message: "Listando Productos"});
            control_mando_b.selecteds.objetivo = control_mando_b.filter_objetivo;
            let filters = [
                {
                    field: "estado_producto_id",
                    operator: "NOT IN",
                    value: [2, 4]
                }
            ];
            if (control_mando_b.filter_departamento !== "[NULL]" && control_mando_b.filter_departamento != "0") {
                filters.push({
                    field: "departamento",
                    value: control_mando_b.filter_departamento
                });
                filters.push({
                    field: "poa",
                    value: control_mando_b.session.poa_id
                });
            } else {
                filters.push({
                    field: "poa",
                    value: control_mando_b.session.poa_id
                });
            }

            if (control_mando_b.filter_usuario !== "[NULL]") {
                let array_actividades_id = [];
                let list_actividades_apoyo = await BASEAPI.listp('vw_actividades_apoyo', {
                    limit: 0,
                    where: [
                        {
                            field: "responsable",
                            value: control_mando_b.filter_usuario
                        }
                    ]
                });
                list_actividades_apoyo = list_actividades_apoyo.data;
                let list_actividades_poa = await BASEAPI.listp('vw_actividades_poa_slim_2', {
                    limit: 0,
                    where: [
                        {
                            field: "responsable_id",
                            value: control_mando_b.filter_usuario
                        }
                    ]
                });
                list_actividades_poa = list_actividades_poa.data;
                for (var i in list_actividades_apoyo) {
                    array_actividades_id.push(list_actividades_apoyo[i].actividades_poa);
                }
                for (var i in list_actividades_poa) {
                    array_actividades_id.push(list_actividades_poa[i].id);
                }
                filters.push({
                    field: "id",
                    value: array_actividades_id
                });
            }
            control_mando_b.productos = await BASEAPI.listp('vw_tc_tabla_b', {
                where: filters,
                orderby: "departamento_nombre_2, no1,no2",
                order: "asc",
                limit: 0
            });
            control_mando_b.productos = control_mando_b.productos.data.filter(d => {
                return d.estatus_actividad != 3 && d.estatus_actividad != 4;
            });
            control_mando_b.presupuesto = await BASEAPI.listp('vw_productos_poa_resultado', {
                where: [
                    {
                        field: "id",
                        value: control_mando_b.productos.map(d => {
                            return d.producto
                        })
                    }
                ],
                limit: 0
            });
            control_mando_b.presupuesto = control_mando_b.presupuesto.data;
            if (control_mando_b.presupuesto) {
                control_mando_b.productos.forEach(pro => {
                    pro.presupuesto = control_mando_b.presupuesto.filter(d => {
                        return d.id == pro.producto;
                    })[0];
                });
            }
            if (control_mando_b.productos.length) {
                control_mando_b.get_productos();
                control_mando_b.get_actividades();
            }
            control_mando_b.showtable = true;
            control_mando_b.refreshAngular();
            SWEETALERT.stop();
        } else {
            control_mando_b.showtable = false;
        }
        await control_mando_b.perf_prod();
        await control_mando_b.perf_acts();
    };
    control_mando_b.Crowspanme = function (field, value, parent_field, parent_value) {
        var r = 0;
        if (parent_field && parent_value) {
            r = control_mando_b.productos.filter(d => {
                if (value != ' ')
                    return eval(`d.${field}==value && d.${parent_field} == parent_value`)
            }).length;
        } else {
            r = control_mando_b.productos.filter(d => {
                if (value != ' ')
                    return eval(`d.${field}==value`)
            }).length;
        }
        return r ? r : 1;
    };
    control_mando_b.Cseeme = function (field, value, key, parent_field, parent_value) {
        if (control_mando_b.productos[key - 1])
            if (value != ' ') {
                if (parent_field && parent_value) {
                    return control_mando_b.productos[key - 1][field] != value || control_mando_b.productos[key - 1][parent_field] != parent_value;
                } else {
                    return control_mando_b.productos[key - 1][field] != value;
                }
            }
        return true;
    };
    control_mando_b.perf_prod = async () => {
        if (!DSON.oseaX0(control_mando_b.filter_departamento) || !DSON.oseaX(control_mando_b.filter_usuario)) {
            let filters = [
                {
                    field: "estado_producto_id",
                    operator: "NOT IN",
                    value: [2, 4]
                }
            ];
            if (control_mando_b.filter_departamento !== "[NULL]" && control_mando_b.filter_departamento != "0") {
                filters.push({
                    field: "id_departamento",
                    value: control_mando_b.filter_departamento
                });
                filters.push({
                    field: "poa_id",
                    value: control_mando_b.session.poa_id
                });
            } else {
                filters.push({
                    field: "poa_id",
                    value: control_mando_b.session.poa_id
                });
            }

            if (control_mando_b.filter_usuario !== "[NULL]") {
                let array_productos_id = [];
                let list_actividades_apoyo = await BASEAPI.listp('vw_actividades_apoyo', {
                    limit: 0,
                    where: [
                        {
                            field: "responsable",
                            value: control_mando_b.filter_usuario
                        }
                    ]
                });
                list_actividades_apoyo = list_actividades_apoyo.data;
                let list_actividades_poa = await BASEAPI.listp('vw_actividades_poa_slim_2', {
                    limit: 0,
                    where: [
                        {
                            field: "responsable_id",
                            value: control_mando_b.filter_usuario
                        }
                    ]
                });
                list_actividades_poa = list_actividades_poa.data;
                for (var i in list_actividades_apoyo) {
                    array_productos_id.push(list_actividades_apoyo[i].producto_poa);
                }
                for (var i in list_actividades_poa) {
                    array_productos_id.push(list_actividades_poa[i].producto);
                }
                filters.push({
                    field: "id",
                    value: array_productos_id
                });
            }
            control_mando_b.from_gauge_productos = await BASEAPI.listp('vw_productos_poa_detalles', {
                where: filters,
                orderby: "id",
                distinct: true,
                order: "asc",
                limit: 0
            });
            control_mando_b.from_gauge_productos = control_mando_b.from_gauge_productos.data;
            control_mando_b.paginations.productos.data = control_mando_b.from_gauge_productos;
            control_mando_b.paginations.productos.currentPage = 0;
            control_mando_b.refreshAngular();
        }
    };
    control_mando_b.perf_acts = async () => {
        if (!DSON.oseaX0(control_mando_b.filter_departamento) || !DSON.oseaX(control_mando_b.filter_usuario)) {
            let filters = [
                {
                    field: "estatus_actividad",
                    operator: "NOT IN",
                    value: [3, 4]
                }
            ];
            if (control_mando_b.filter_departamento !== "[NULL]" && control_mando_b.filter_departamento != "0") {
                filters.push({
                    field: "id_departamento",
                    value: control_mando_b.filter_departamento
                });
                filters.push({
                    field: "poa",
                    value: control_mando_b.session.poa_id
                });
            } else {
                filters.push({
                    field: "poa",
                    value: control_mando_b.session.poa_id
                });
            }
            if (control_mando_b.filter_usuario !== "[NULL]") {
                let array_actividades_id = [];
                let list_actividades_apoyo = await BASEAPI.listp('vw_actividades_apoyo', {
                    limit: 0,
                    where: [
                        {
                            field: "responsable",
                            value: control_mando_b.filter_usuario
                        }
                    ]
                });
                list_actividades_apoyo = list_actividades_apoyo.data;
                let list_actividades_poa = await BASEAPI.listp('vw_actividades_poa_slim_2', {
                    limit: 0,
                    where: [
                        {
                            field: "responsable_id",
                            value: control_mando_b.filter_usuario
                        }
                    ]
                });
                list_actividades_poa = list_actividades_poa.data;
                for (var i in list_actividades_apoyo) {
                    array_actividades_id.push(list_actividades_apoyo[i].actividades_poa);
                }
                for (var i in list_actividades_poa) {
                    array_actividades_id.push(list_actividades_poa[i].id);
                }
                filters.push({
                    field: "id",
                    value: array_actividades_id
                });
            }
            control_mando_b.from_gauge_actividades = await BASEAPI.listp('vw_actividades_poa_slim_2', {
                where: filters,
                orderby: "id",
                order: "asc",
                distinct: true,
                limit: 0
            });
            control_mando_b.from_gauge_actividades = control_mando_b.from_gauge_actividades.data;
            control_mando_b.paginations.actividades.data = control_mando_b.from_gauge_actividades;
            control_mando_b.paginations.actividades.currentPage = 0;
            control_mando_b.refreshAngular();
        }
    }
    control_mando_b.init();
    control_mando_b.calculate_productoEqualize = async function () {
        equlizer_with_Style('productos');
    };
    control_mando_b.calculate_actividadEqualize = async function () {
        equlizer_with_Style('actividades');
    };
    control_mando_b.console_log = function (data) {
        console.log(data)
    }
    control_mando_b.open_view = function (data) {
        control_mando_b.dataForView2 = data;

        control_mando_b.modal.modalView(String.format("{0}/view_dashboard_b", 'productos_poa'), {
            header: {
                title: MESSAGE.i('mono.Viewof') + " " +  (control_mando_b.session.tipo_institucion == 1 ? "Proyecto/Productos": "Proyecto/Plan de Acción"),
                icon: "user"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'productos_poa'
            },
        });
    }
    control_mando_b.open_view_actividades = function (data) {
        control_mando_b.dataForView2 = data;

        control_mando_b.modal.modalView(String.format("{0}/view_dashboard_b", 'actividades_poa'), {
            header: {
                title: MESSAGE.i('mono.Viewof') + " " + "Actividades",
                icon: "user"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'actividades_poa'
            },
        });
    }
});
