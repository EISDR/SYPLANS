app.controller("control_mando", function ($scope, $http, $compile) {
    control_mando = this;
    //control_mando.fixFilters = [];
    //control_mando.singular = "singular";
    //control_mando.plural = "plural";
    //control_mando.headertitle = "Hola Title";
    //control_mando.destroyForm = false;
    //control_mando.permissionTable = "tabletopermission";
    control_mando.session = new SESSION().current();
    RUNCONTROLLER("control_mando", control_mando, $scope, $http, $compile);
    RUN_B("control_mando", control_mando, $scope, $http, $compile);
    control_mando.poco = (str) => {
        return v.prune(str, 170);
    };
    control_mando.paginations = {
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
    control_mando.formulary = function (data, mode, defaultData) {
        if (control_mando !== undefined) {
            RUN_B("control_mando", control_mando, $scope, $http, $compile);
            control_mando.form.modalWidth = ENUM.modal.width.full;
            control_mando.form.readonly = {};
            control_mando.createForm(data, mode, defaultData);
        }
    };
    control_mando.selecteds = {
        perspectiva: null,
        eje: null,
        objetivo: null,
        usuario: null,
        departamento: null
    };
    control_mando.init = async () => {
        control_mando.oreder = 'no_orden';
        control_mando.name = 'nombre';
        control_mando.perspectivas = await BASEAPI.listp('perspectiva', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    operator: "=",
                    value: control_mando.session.compania_id
                },
                {
                    field: "institucion",
                    value: control_mando.session.institucion_id ? control_mando.session.institucion_id : "null"
                }
            ],
            orderby: control_mando.oreder,
            order: "asc",
        });
        control_mando.icons = [];
        control_mando.perspectivas = control_mando.perspectivas.data;
        control_mando.perspectivas.forEach(d => {
            if (!d.icono) {
                if (d.nombre === "Usuario" || d.nombre === "Cliente") {
                    d.icono = "icon-user"
                }
                if (d.nombre === "Proceso - Operacional") {
                    d.icono = "icon-gear"
                }
                if (d.nombre === "Persona - Conocimiento") {
                    d.icono = "icon-users4"
                }
                if (d.nombre === "Finanzas") {
                    d.icono = "icon-coin-dollar"
                }
            }
        });
        control_mando.refreshAngular();
    };
    control_mando.clean = () => {
        control_mando.filter_objetivo = '[NULL]';
        control_mando.filter_departamento = '[NULL]';
        control_mando.filter_usuario = '[NULL]';
        control_mando.showtable = false;
        control_mando.productos = [];
    };

    control_mando.getEjes = async (pid) => {
        SWEETALERT.loading({message: "Listando Ejes Estratégicos"});
        control_mando.selecteds.perspectiva = pid;
        let whersito = [
            {
                field: "perspectiva",
                value: pid
            },
            {
                field: "compania",
                value: control_mando.session.compania_id
            },
            {
                field: "institucion",
                operator: "is",
                value: "$null"
            }
        ];
        if (control_mando.session.institucion_id) {
            whersito = [
                {
                    field: "perspectiva",
                    value: pid
                },
                {
                    field: "compania",
                    value: control_mando.session.compania_id
                },
                {
                    field: "institucion",
                    value: control_mando.session.institucion_id
                }
            ]
        }
        control_mando.ejes = await BASEAPI.listp('vw_cm_ejes', {
            where: whersito,
            orderby: 'no_orden',
            order: "asc",
            limit: 0
        });
        control_mando.ejes = control_mando.ejes.data;
        control_mando.clean();
        control_mando.refreshAngular();
        $(".lostabs li a:eq(0)").trigger("click");
        SWEETALERT.stop();
    };
    control_mando.getObjetivos = async (pid) => {
        SWEETALERT.loading({message: "Listando Objetivos Estratégicos"});
        control_mando.selecteds.eje = pid;
        control_mando.clean();
        control_mando.refreshAngular();
        SWEETALERT.stop();
    };
    control_mando.money = (val) => {
        return LAN.money(val).format(true);
    };
    $scope.$watch("control_mando.filter_objetivo", function (value) {
        control_mando.getTabla();
    });
    $scope.$watch("control_mando.filter_departamento", function (value) {
        control_mando.getTabla();
    });
    $scope.$watch("control_mando.filter_usuario", function (value) {
        control_mando.getTabla();
    });
    control_mando.showtable = false;
    control_mando.getTabla = async () => {
        if (!DSON.oseaX(control_mando.filter_objetivo)) {
            SWEETALERT.loading({message: "Listando Productos"});
            control_mando.selecteds.objetivo = control_mando.filter_objetivo;
            let filters = [
                {
                    field: "id_objetivo_estrategico",
                    value: control_mando.filter_objetivo
                },
                {
                    field: "perspectiva",
                    value: control_mando.selecteds.perspectiva
                },
                {
                    field: "estado_producto_id",
                    operator: "NOT IN",
                    value: [2, 4]
                }
            ];
            if (control_mando.filter_departamento !== "[NULL]")
                filters.push({
                    field: "departamento",
                    value: control_mando.filter_departamento
                });
            if (control_mando.filter_usuario !== "[NULL]")
                filters.push({
                    field: "responsable_id",
                    value: control_mando.filter_usuario
                });
            control_mando.productos = await BASEAPI.listp('vw_tc_tabla', {
                where: filters,
                orderby: "departamento_nombre_2, no1+' '+producto_nombre",
                order: "asc",
                limit: 0
            });
            control_mando.productos = control_mando.productos.data.filter(d => {
                return d.estatus_actividad != 3 && d.estatus_actividad != 4;
            });
            control_mando.presupuesto = await BASEAPI.listp('vw_productos_poa_resultado', {
                where: [
                    {
                        field: "id",
                        value: control_mando.productos.map(d => {
                            return d.producto
                        })
                    }
                ],
                limit: 0
            });
            control_mando.presupuesto = control_mando.presupuesto.data;
            control_mando.productos.forEach(pro => {
                pro.presupuesto = control_mando.presupuesto.filter(d => {
                    return d.id == pro.producto;
                })[0];
            });
            if (control_mando.productos.length) {
                control_mando.get_productos();
                control_mando.get_actividades();
            }
            control_mando.showtable = true;
            control_mando.refreshAngular();
            SWEETALERT.stop();
        } else {
            control_mando.showtable = false;
        }
        await control_mando.perf_prod();
        await control_mando.perf_acts();
    };
    control_mando.perf_prod = async () => {
        if (!DSON.oseaX(control_mando.filter_objetivo)) {
            let filters = [
                {
                    field: "id_objetivo_estrategico",
                    value: control_mando.filter_objetivo
                },
                {
                    field: "perspectiva",
                    value: control_mando.selecteds.perspectiva
                },
                {
                    field: "actividades_poa",
                    operator: "is not",
                    value: "$null"
                },
                {
                    field: "estado_producto_id",
                    operator: "NOT IN",
                    value: [2, 4]
                }
            ];
            if (control_mando.filter_departamento !== "[NULL]")
                filters.push({
                    field: "id_departamento",
                    value: control_mando.filter_departamento
                });
            control_mando.from_gauge_productos = await BASEAPI.listp('vw_productos_poa_detalles', {
                where: filters,
                orderby: "id",
                distinct: true,
                order: "asc",
                limit: 0
            });
            control_mando.from_gauge_productos = control_mando.from_gauge_productos.data;

            control_mando.paginations.productos.data = control_mando.from_gauge_productos;
            control_mando.paginations.productos.currentPage = 0;
            control_mando.refreshAngular();
        }
    }
    control_mando.perf_acts = async () => {
        if (!DSON.oseaX(control_mando.filter_objetivo)) {
            let filters = [
                {
                    field: "id_objetivo_estrategico",
                    value: control_mando.filter_objetivo
                },
                {
                    field: "perspectiva",
                    value: control_mando.selecteds.perspectiva
                },
                {
                    field: "estatus_actividad",
                    operator: "NOT IN",
                    value: [3, 4]
                }
            ];
            if (control_mando.filter_departamento !== "[NULL]")
                filters.push({
                    field: "id_departamento",
                    value: control_mando.filter_departamento
                });
            if (control_mando.filter_usuario !== "[NULL]")
                filters.push({
                    field: "responsable_id",
                    value: control_mando.filter_usuario
                });
            control_mando.from_gauge_actividades = await BASEAPI.listp('vw_actividades_poa_slim_2', {
                where: filters,
                orderby: "id",
                order: "asc",
                distinct: true,
                limit: 0
            });
            control_mando.from_gauge_actividades = control_mando.from_gauge_actividades.data;
            control_mando.paginations.actividades.data = control_mando.from_gauge_actividades;
            control_mando.paginations.actividades.currentPage = 0;
            control_mando.refreshAngular();
        }
    }
    control_mando.init();
    control_mando.calculate_productoEqualize = async function () {
        equlizer_with_Style('productos');
    };
    control_mando.calculate_actividadEqualize = async function () {
        equlizer_with_Style('actividades');
    };
    control_mando.open_view = function (data) {
        control_mando.dataForView2 = data;

        control_mando.modal.modalView(String.format("{0}/view_dashboard", 'productos_poa'), {
            header: {
                title: MESSAGE.i('mono.Viewof') + " " + (control_mando.session.tipo_institucion == 1 ? "Proyecto/Productos": "Proyecto/Plan de Acción"),
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
    control_mando.open_view_actividades = function (data) {
        control_mando.dataForView2 = data;

        control_mando.modal.modalView(String.format("{0}/view_dashboard", 'actividades_poa'), {
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
