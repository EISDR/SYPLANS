app.controller("u_pacc_dept", function ($scope, $http, $compile) {

    u_pacc_dept = this;
    //u_pacc_dept.fixFilters = [];
    u_pacc_dept.lan = LAN;
    u_pacc_dept.singular = "singular";
    u_pacc_dept.plural = "elementos";
    u_pacc_dept.modelName = "u_pacc_dept";
    u_pacc_dept.periodopoa = new SESSION().current().cantidad;
    u_pacc_dept.us = new SESSION().current();
    u_pacc_dept.monitoreo_nombre = new SESSION().current().monitoreo_nombre;
    u_pacc_dept.periodopoa = 4;
    u_pacc_dept.readonly = window.location.href.indexOf("readonly") !== -1;
    u_pacc_dept.monitoreo_nombre = "Trimestre";
    u_pacc_dept.month = new Date().getMonth() + 1;
    u_pacc_dept.trimestre = Math.ceil(u_pacc_dept.month / 3);
    u_pacc_dept.periodopoas = [];
    u_pacc_dept.allowme = function (row, trimestre) {
        if (trimestre > u_pacc_dept.trimestre)
            return false;
        if (row.id) {
            let parallel = u_pacc_dept.pacc_detail_list.filter(d => {
                return d.id == row.id
            })[0];
            if (parallel[`periodo_${trimestre}_cantidad`] === null || parallel[`periodo_${trimestre}_real`] === null)
                return true;
            if (u_pacc_dept.trimestre <= trimestre)
                return true;
            return false;
        }
        return true;
    };

    vw_pacc = undefined;
    for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
        u_pacc_dept.periodopoas.push(i);
    }
    u_pacc_dept.ordename = "id";
    u_pacc_dept.ordenametipo = "asc";
    PAGINATOR.run(u_pacc_dept, true);
    u_pacc_dept.refresh = function () {
        u_pacc_dept.get_pacc_detail();
    };

    u_pacc_dept.actualizar = function () {

    };
    u_pacc_dept.maza = function () {
        //RUN_B("u_pacc_dept", u_pacc_dept, $scope, $http, $compile);
        u_pacc_dept.masa_familia = "[NULL]";
        u_pacc_dept.masa_biene = "[NULL]";
        u_pacc_dept.masa_unidad_medida = "[NULL]";
        u_pacc_dept.masa_procedimiento_seleccion = "[NULL]";
        u_pacc_dept.masa_fuente_financiamiento = "[NULL]";
        u_pacc_dept.masa_precio_unitario = "";
        u_pacc_dept.modal.modalView("u_pacc_dept/masa", {
            header: {
                title: "Actualización en Masa",
                icon: "list",
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `Cargando...`,
                sameController: 'u_pacc_dept'
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {
                        setTimeout(function () {
                            MODAL.closeAll();
                        }, 1000);
                        location.refresh();
                    }
                }
            }
        });
    };

    u_pacc_dept.tototalCBS = function (row) {
        if (u_pacc_dept.PACCROWS) {
            var same_cbs = u_pacc_dept.PACCROWS.filter(d => {
                return d.cbs == row.cbs
            });
            var costo_real = 0;
            for (var i of same_cbs) {
                costo_real += i.costo_total;
            }
            row.costo_total_real = costo_real;
            return '$' + LAN.money(costo_real).format(false);
        }
    };
    u_pacc_dept.tototalUnitario = function (row, from_export) {
        row.costo_total = LAN.money(u_pacc_dept.tototal(row) * (row.precio_unitario || 0)).value;
        return from_export ? LAN.money(u_pacc_dept.tototal(row) * (row.precio_unitario || 0)).value : "$" + LAN.money(u_pacc_dept.tototal(row) * (row.precio_unitario || 0)).format(false);
    };
    u_pacc_dept.tototalUnitarioReal = function (row) {
        row.costo_unitario_real = LAN.money(u_pacc_dept.tototalRead(row)).value;
        return "$" + LAN.money(u_pacc_dept.tototalRead(row)).format(false);
    };

    u_pacc_dept.tototalUnitarioRAW = function (row) {
        row.costo_total = LAN.money(u_pacc_dept.tototal(row) * (row.precio_unitario || 0)).value;
        return u_pacc_dept.tototal(row) * (row.precio_unitario || 0);
    };
    u_pacc_dept.tototalUnitarioRealRAW = function (row) {
        row.costo_unitario_real = LAN.money(u_pacc_dept.tototalRead(row)).value;
        return u_pacc_dept.tototalRead(row);
    };
    u_pacc_dept.tototal = function (row) {
        var total = 0;
        for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
            if (row['periodo_' + i]) {
                total += LAN.money(row['periodo_' + i]).value;
            }
        }
        row.cantidad_total = total;
        return total;
    };

    u_pacc_dept.tototalRead = function (row) {
        var total = 0;
        for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
            if (row['periodo_' + i + "_real"]) {
                if (LAN.money(row['periodo_' + i + "_cantidad"]).value) {
                    total += LAN.money(row['periodo_' + i + "_real"]).value * LAN.money(row['periodo_' + i + "_cantidad"]).value;
                } else
                    total += LAN.money(row['periodo_' + i + "_real"]).value;
            }
        }
        row.cantidad_total = total;
        return total;
    };

    u_pacc_dept.colortototal = function (row) {
        return u_pacc_dept.tototalRead(row) > (u_pacc_dept.tototal(row) * (row.precio_unitario || 0)) ? "red" : "black";
    };

    u_pacc_dept.ordenar = function (field) {
        if (u_pacc_dept.ordename === field) {
            u_pacc_dept.ordenametipo = u_pacc_dept.ordenametipo === "asc" ? "desc" : "asc";
        } else {
            u_pacc_dept.ordename = field;
            u_pacc_dept.ordenametipo = "asc";
        }
        u_pacc_dept.get_pacc_detail();
    };
    u_pacc_dept.updateteCant = function () {
        setTimeout(function () {
            u_pacc_dept.cantidadfiltrada = $(".paccrow:visible").length;
            u_pacc_dept.refreshAngular()
        }, 200);
    };
    u_pacc_dept.filtrar = function (row, filter, rr) {
        console.log(row, filter, rr);
        for (var i in row) {
            if (["departamento", "descripcion", "cantidad_total", "unidad"].indexOf(i) !== -1) {
                if (row[i].toLowerCase) {
                    if (rr) {
                        if (row[i].toLowerCase().indexOf(filter.toLowerCase()) !== -1 && row[i].departamento.toLowerCase().indexOf(rr.toLowerCase()) !== -1) {
                            return true;
                        }
                    } else {
                        if (row[i].toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                            return true;
                        }
                    }
                } else {
                    if ((row[i] + "").toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
                        return true;
                    }
                }
            }
        }


        return false;
    };
    u_pacc_dept.pageChanged = function () {
        var animation = new ANIMATION();
        animation.loading(`#tb-custom2`, "Cargando ", ``, '200');
        STORAGE.savePage(u_pacc_dept);
        PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS);
        setTimeout(function () {
            animation.stoploading(`#tb-custom2`, ``);
        }, 300);
    };
    u_pacc_dept.c = function (l, f, v, d) {
        if (l) {
            if (l.filter(d => {
                return d[f] == v
            }).length > 0) {
                return l.filter(d => {
                    return d[f] == v
                })[0][d];
            }
        }
        return "";
    };
    u_pacc_dept.export = function () {
        var url = $("#tb-custom23").excelexportjs({
            containerid: "tb-custom23",
            datatype: 'table',
            worksheetName: `PACC - SNCC.F053`,
            returnUri: true
        });
        DOWNLOAD.excel("sncc_f_053_plan_anual_de_compras_y_contrataciones.xls", url);
    };

    u_pacc_dept.new_export = function () {
        var url = $("#tb-custom24").excelexportjs({
            containerid: "tb-custom24",
            datatype: 'table',
            worksheetName: `PACC - SNCC.F053`,
            returnUri: true
        });
        DOWNLOAD.excel("sncc_f_053_plan_anual_de_compras_y_contrataciones.xls", url);
    };
    u_pacc_dept.todosvalidos = function () {
        if (u_pacc_dept.PACCROWS) {
            if (!u_pacc_dept.PACCROWS.length)
                return false;
            if (!u_pacc_dept.PACCROWS)
                return false;
            return u_pacc_dept.PACCROWS.filter(d => {
                return d.validColor() !== true || d.revision == "1"
            }).length === 0
        }
    };

    function PACCROW() {
        this.id = new Date().getTime();
        this.mode = "new";
        this.valid = function () {
            return true;
            if (this.fecha_necesidad)
                return (this.descripcion.length > 0 && this.unidad && this.cantidad_total > 0 && this.fecha_necesidad.length > 0)
            else
                return false;
        };
        this.monitoreoColor = function () {
            if (this.deleted) {
                return {label: "Eliminado", color: "#FF0000", valid: true};
            }

            let proyecadas = ((this.periodo_1 || 0) + (this.periodo_2 || 0) + (this.periodo_3 || 0) + (this.periodo_4 || 0));
            let alcanzadas = ((this.periodo_1_cantidad || 0) + (this.periodo_2_cantidad || 0) + (this.periodo_3_cantidad || 0) + (this.periodo_4_cantidad || 0));

            let adquirido = u_pacc_dept.tototalUnitarioRealRAW(this);
            let planificado = u_pacc_dept.tototalUnitarioRAW(this);

            if (adquirido === 0) {
                return {label: "Por Ejecutar", color: "#5F5FAF", valid: false};
            } else if (planificado > adquirido) {
                return {label: "En Ejecución", color: "#F1C232", valid: false};
            } else if (adquirido >= planificado) {
                return {label: "Ejecutado", color: "#548235", valid: true};
            }
        };
        this.validColor = function () {
            var cantidadwas = 0;
            for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                if (this['periodo_' + i]) {
                    cantidadwas += parseInt(this['periodo_' + i]);
                }
            }
            if (typeof unificacion !== 'undefined') {
                if (typeof unificacion !== 'not defined') {
                    if (unificacion) {
                        return (this.cbs && this.precio_unitario > 0 && this.descripcion.length > 0 && this.unidad && cantidadwas > 0 && !this.not_valid);
                    }
                }
            }
            return (this.descripcion.length > 0 && this.unidad && cantidadwas > 0);
        };
        this.descripcion = "";
        this.unidad = "";
        this.cbs = "";
        this.procedimiento_seleccion = "";
        this.fuente_financiamiento = "";
        this.precio_unitario = "";
        this.costo_total_real = "";
        this.costo_total = "";
        this.cantidad_total = "";
        for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
            this["periodo_" + i] = null;
        }
        for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
            this["periodo_" + i + "_real"] = null;
        }
        this.periodos = [];
        for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
            this.periodos.push(i);
        }
        this.fecha_necesidad = "";
    }

    var session = new SESSION().current();
    u_pacc_dept.oldstatus = "";
    u_pacc_dept.fullvalid = function () {
        if (u_pacc_dept.PACCROWS.length === 0 && (u_pacc_dept.oldstatus + "") !== (u_pacc_dept.estatus + ""))
            return false;
        if (u_pacc_dept.PACCROWS.length > 0 && (u_pacc_dept.oldstatus + "") !== (u_pacc_dept.estatus + "")) {
            for (var row of u_pacc_dept.PACCROWS) {
                if (!row.validColor()) {
                    return false;
                }
            }
        }
        return true;
    };
    u_pacc_dept.headertitle = `PACC departamental (${session.departamento_nombre})`;
    u_pacc_dept.actions = ['Eliminar fila completa', 'Eliminar toda la tabla', 'Duplicar registro', 'Limpiar fila'];
    u_pacc_dept.destroyForm = false;
    //u_pacc_dept.permissionTable = "tabletopermission";
    RUNCONTROLLER("u_pacc_dept", u_pacc_dept, $scope, $http, $compile);
    RUN_B("u_pacc_dept", u_pacc_dept, $scope, $http, $compile);
    u_pacc_dept.selectedKey = undefined;
    u_pacc_dept.cbslist = (key) => {
        u_pacc_dept.selectedKey = key;
        $("#exampleModalCenter").modal("show");
    };
    u_pacc_dept.selectcbs = (cbs) => {
        if (u_pacc_dept.selectedKey !== undefined) {
            u_pacc_dept.PACCROWS[u_pacc_dept.selectedKey].cbs = cbs.id;
            u_pacc_dept.saveA(u_pacc_dept.selectedKey);
            u_pacc_dept.selectedKey = undefined;
        }
        $("#exampleModalCenter").modal("hide");
    };
    u_pacc_dept.loadlist = async () => {
        if (!u_pacc_dept.list) {
            var animation = new ANIMATION();
            animation.loading(`#tb-custom2`, "Cargando ", ``, '200');
            u_pacc_dept.list = await BASEAPI.listp('vw_bienes_servicio_large', {
                limit: 0,
                orderby: "id",
                order: "asc",
            });
            u_pacc_dept.list = u_pacc_dept.list.data;
            u_pacc_dept.refreshAngular();
            animation.stoploading(`#tb-custom2`, ``);
        }
    };
    u_pacc_dept.dbsdesc = (key) => {
        if (u_pacc_dept.list) {
            let selected = u_pacc_dept.list.filter(d => {
                return d.id === u_pacc_dept.PACCROWS[key].cbs;
            });
            if (selected.length > 0)
                return selected[0].cbsnombre;
        }
        if (u_pacc_dept.list === undefined)
            return "Error al cargar la lista";
        return "-Clic para Seleccionar-";
    };
    u_pacc_dept.get_data = async function () {

        var animation = new ANIMATION();
        animation.loading(`#infopac`, "Cargando ", ``, '800');
        if (!u_pacc_dept.list) {
            u_pacc_dept.list = await BASEAPI.listp('vw_bienes_servicio_large', {
                limit: 0,
                orderby: "id",
                order: "asc",
            });
            u_pacc_dept.list = u_pacc_dept.list.data;
        }
        u_pacc_dept.noexist = false;
        u_pacc_dept.loadingpacc = true;
        u_pacc_dept.session = new SESSION().current();
        if (typeof unificacion_m !== 'undefined') {
            if (typeof unificacion_m !== 'not defined') {
                if (unificacion_m) {
                    u_pacc_dept.paccData = await BASEAPI.firstp('vw_pacc', {
                        order: "desc",
                        where: [
                            {
                                field: "estatus",
                                operator: "=",
                                value: 7
                            },
                            {
                                field: "compania",
                                value: u_pacc_dept.session.compania_id
                            },
                            {
                                "field": "institucion",
                                "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                                "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                            }
                        ]
                    });
                } else {
                    u_pacc_dept.paccData = await BASEAPI.firstp('vw_pacc', {
                        order: "desc",
                        where: [
                            {
                                field: "estatus",
                                operator: "<=",
                                value: 7
                            },
                            {
                                field: "compania",
                                value: u_pacc_dept.session.compania_id
                            },
                            {
                                "field": "institucion",
                                "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                                "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                            }
                        ]
                    });
                }
            } else {
                u_pacc_dept.paccData = await BASEAPI.firstp('vw_pacc', {
                    order: "desc",
                    where: [
                        {
                            field: "estatus",
                            operator: "<=",
                            value: 7
                        },
                        {
                            field: "compania",
                            value: u_pacc_dept.session.compania_id
                        },
                        {
                            "field": "institucion",
                            "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                            "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                        }
                    ]
                });
            }
        } else {
            u_pacc_dept.paccData = await BASEAPI.firstp('vw_pacc', {
                order: "desc",
                where: [
                    {
                        field: "estatus",
                        operator: "<=",
                        value: 7
                    },
                    {
                        field: "compania",
                        value: u_pacc_dept.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                        "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                    }
                ]
            });
        }
        // if(u_pacc_dept.paccData.estatus == 1){
        //     u_pacc_dept.noexist = true;
        // }else{
        //     u_pacc_dept.noexist = false;
        // }
        u_pacc_dept.loadingpacc = false;
        u_pacc_dept.loadingpaccdep = true;
        if (u_pacc_dept.paccData) {
            u_pacc_dept.dept_data = await BASEAPI.firstp("vw_pacc_departamental", {
                order: "desc",
                where: [
                    {
                        field: "pacc",
                        value: u_pacc_dept.paccData.id
                    },
                    {
                        field: "departamento",
                        value: u_pacc_dept.session.departamento
                    },
                    {
                        "field": "institucion",
                        "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                        "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                    }
                ]
            });

            u_pacc_dept.pacclist = await BASEAPI.listp('vw_pacc_departamental', {
                order: "desc",
                where: [
                    {
                        field: "pacc",
                        value: u_pacc_dept.paccData.id
                    },
                    {
                        field: "compania",
                        value: u_pacc_dept.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                        "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                    }
                ],
                limit: 0
            });
            if (u_pacc_dept.pacclist.data.length > 0) {
                u_pacc_dept.lastpacc = u_pacc_dept.pacclist.data[0].codigo;
                u_pacc_dept.lastpacc = u_pacc_dept.lastpacc.split(u_pacc_dept.paccData.año)[1];
                u_pacc_dept.lastpacc = parseInt(u_pacc_dept.lastpacc) + "";
                if (u_pacc_dept.lastpacc.length < 4)
                    u_pacc_dept.lastpacc = "0" + u_pacc_dept.lastpacc;
                if (u_pacc_dept.lastpacc.length < 4)
                    u_pacc_dept.lastpacc = "0" + u_pacc_dept.lastpacc;
                if (u_pacc_dept.lastpacc.length < 4)
                    u_pacc_dept.lastpacc = "0" + u_pacc_dept.lastpacc;
            } else {
                u_pacc_dept.lastpacc = "1";
            }

            if (u_pacc_dept.dept_data) {
                u_pacc_dept.id = u_pacc_dept.dept_data.id;
                u_pacc_dept.codigo_plan = u_pacc_dept.dept_data.codigo ? u_pacc_dept.dept_data.codigo : u_pacc_dept.dept_data.codigo_general;
                u_pacc_dept.nombre = u_pacc_dept.dept_data.departamento_nombre;
                //u_pacc_dept.cantidad = u_pacc_dept.dept_data.cantidadtotal;
                u_pacc_dept.version = u_pacc_dept.dept_data.version;
                u_pacc_dept.descripcion = u_pacc_dept.dept_data.descripcion;
                u_pacc_dept.fecha_modificacion = moment(u_pacc_dept.dept_data.fecha_modificacion).format("DD-MM-YYYY");
                u_pacc_dept.fecha_modificacion_label = moment(u_pacc_dept.dept_data.fecha_modificacion).format("DD/MM/YYYY");
                u_pacc_dept.rawestatus = u_pacc_dept.dept_data.estatus;
                u_pacc_dept.estatus = u_pacc_dept.dept_data.estatus + "";
                u_pacc_dept.oldstatus = u_pacc_dept.dept_data.estatus + "";
                u_pacc_dept.show_estatus = u_pacc_dept.form.selected('estatus') ? u_pacc_dept.form.selected('estatus').nombre : "";
                await get_pacc_dept_status(u_pacc_dept, u_pacc_dept.estatus);
            } else {
                console.log({
                    pacc: u_pacc_dept.paccData.id,
                    nombre: "PACC departamental " + u_pacc_dept.session.departamento_nombre,
                    descripcion: "PACC departamental " + u_pacc_dept.session.departamento_nombre,
                    departamento: u_pacc_dept.session.departamento,
                    codigo: getNueNumber(u_pacc_dept.session.compania_id, u_pacc_dept.session.sigla, u_pacc_dept.paccData.año, u_pacc_dept.lastpacc),
                    cantidadtotal: 0,
                    version: 1,
                    estatus: 1
                });
                await BASEAPI.insertIDp("pacc_departamental", {
                    pacc: u_pacc_dept.paccData.id,
                    nombre: "PACC departamental " + u_pacc_dept.session.departamento_nombre,
                    descripcion: "PACC departamental " + u_pacc_dept.session.departamento_nombre,
                    departamento: u_pacc_dept.session.departamento,
                    codigo: getNueNumber(u_pacc_dept.session.compania_id, u_pacc_dept.session.sigla, u_pacc_dept.paccData.año, u_pacc_dept.lastpacc),
                    cantidadtotal: 0,
                    version: "1.0",
                    estatus: 2,
                    fecha_modificacion: moment().format("YYYY-MM-DD"),
                }, '', '');

                u_pacc_dept.dept_data = await BASEAPI.firstp("vw_pacc_departamental", {
                    order: "desc",
                    where: [
                        {
                            field: "pacc",
                            value: u_pacc_dept.paccData.id
                        },
                        {
                            field: "departamento",
                            value: u_pacc_dept.session.departamento
                        },
                        {
                            field: "compania",
                            value: u_pacc_dept.session.compania_id
                        },
                        {
                            "field": "institucion",
                            "operator": u_pacc_dept.session.institucion_id ? "=" : "is",
                            "value": u_pacc_dept.session.institucion_id ? u_pacc_dept.session.institucion_id : "$null"
                        },
                        {
                            field: "estatus",
                            operator: "<=",
                            value: 3
                        }
                    ]
                });

                u_pacc_dept.id = u_pacc_dept.dept_data.id;
                u_pacc_dept.codigo_plan = u_pacc_dept.dept_data.codigo ? u_pacc_dept.dept_data.codigo : u_pacc_dept.dept_data.codigo_general;
                u_pacc_dept.nombre = u_pacc_dept.dept_data.departamento_nombre;
                //u_pacc_dept.cantidad = u_pacc_dept.dept_data.cantidadtotal;
                u_pacc_dept.version = u_pacc_dept.dept_data.version;
                u_pacc_dept.descripcion = u_pacc_dept.dept_data.descripcion;
                u_pacc_dept.fecha_modificacion = moment(u_pacc_dept.dept_data.fecha_modificacion).format("DD-MM-YYYY");
                u_pacc_dept.fecha_modificacion_label = moment(u_pacc_dept.dept_data.fecha_modificacion).format("DD/MM/YYYY");
                u_pacc_dept.estatus = u_pacc_dept.dept_data.estatus + "";
                u_pacc_dept.show_estatus = u_pacc_dept.form.selected('estatus').nombre;
                await get_pacc_dept_status(u_pacc_dept, u_pacc_dept.estatus);
            }
            u_pacc_dept.loadingpaccdep = false;
        } else {
            u_pacc_dept.noexist = true;
        }
        u_pacc_dept.allowedit = true;
        if (u_pacc_dept.estatus != ENUM_2.PACC_DEPARTAMENTAL["D-EP"]) {
            u_pacc_dept.actions = [];
            u_pacc_dept.allowedit = false;
            if (u_pacc_dept.form.options.estatus)
                u_pacc_dept.form.options.estatus.disabled = true
            if (u_pacc_dept.form.options.descripcion)
                u_pacc_dept.form.options.descripcion.disabled = true;
        }
        if (typeof unificacion !== 'undefined') {
            if (typeof unificacion !== 'not defined') {
                if (unificacion) {
                    if (unificacion.rawestatus < 4) {
                        if (unificacion.lastprofile == unificacion.myProfile) {
                            u_pacc_dept.allowedit = false;
                            u_pacc_dept.actions = [];
                        } else {
                            u_pacc_dept.allowedit = true;
                            u_pacc_dept.actions = ['Eliminar fila completa'];
                        }
                    } else {
                        u_pacc_dept.actions = [];
                    }
                }
            }
        }
        // setTimeout(function () {
        //     u_pacc_dept.get_pacc_detail();
        // }, 1000);

        u_pacc_dept.refreshAngular();
        animation.stoploading(`#animationDepartamento`, ``);

    };
    u_pacc_dept.formulary = function (data, mode, defaultData) {
        if (u_pacc_dept !== undefined) {
            u_pacc_dept.form.modalWidth = ENUM.modal.width.full;
            u_pacc_dept.form.readonly = {};
            u_pacc_dept.createForm(data, mode, defaultData);
            $scope.$watch("u_pacc_dept.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(u_pacc_dept, 'nombre', rules);
            });
        }
    };
    u_pacc_dept.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        if (typeof unificacion !== 'undefined') {
            if (typeof unificacion !== 'not defined') {
                if (unificacion) {
                    unificacion.refreshAngular();
                }
            }
        }
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

    u_pacc_dept.updateDataMasa = async function (estatus) {
        // if (u_pacc_dept.masa_familia !== '[NULL]' && u_pacc_dept.masa_biene !== '[NULL]') {

        // if (
        //     u_pacc_dept.masa_unidad_medida === '[NULL]' &&
        //     u_pacc_dept.masa_procedimiento_seleccion === '[NULL]' &&
        //     u_pacc_dept.masa_fuente_financiamiento === '[NULL]' &&
        //     !u_pacc_dept.masa_precio_unitario
        // ) {
        //     SWEETALERT.show({
        //         type: 'warning',
        //         message: "Debe seleccionar por lo menos un campo para proceder a actualizar."
        //     });
        //     return;
        // }
        let busquedade = `<b>"${u_pacc_dept.filtro}"</b>`;
        if (u_pacc_dept.masa_familia !== '[NULL]') {
            busquedade += ` y con la <b>familia</b> "${u_pacc_dept.masa_familia_object.familianombre}"`;
        }
        // if (u_pacc_dept.masa_biene !== '[NULL]') {
        //     if (u_pacc_dept.masa_familia !== '[NULL]') {
        //         busquedade += ` más el <b>CBS</b> "${u_pacc_dept.masa_biene_object.familianombre}"`;
        //     } else {
        //         busquedade += ` y con el <b>CBS</b> "${u_pacc_dept.masa_biene_object.familianombre}"`;
        //     }
        // }

        let aactualizar = [];
        if (u_pacc_dept.masa_biene !== '[NULL]') {
            aactualizar.push(`<b>CBS:</b> ${u_pacc_dept.masa_biene_object.familianombre}`);
        }

        if (u_pacc_dept.masa_unidad_medida !== '[NULL]') {
            aactualizar.push(`<b>Unidad de Medida:</b> ${u_pacc_dept.masa_unidad_medida_object.nombre}`);
        }
        if (u_pacc_dept.masa_procedimiento_seleccion !== '[NULL]')
            aactualizar.push(`<b>Procedimiento de Selección:</b> ${u_pacc_dept.masa_procedimiento_seleccion_object.nombre}`);

        if (u_pacc_dept.masa_fuente_financiamiento !== '[NULL]')
            aactualizar.push(`<b>Fuente de Financiamiento:</b> ${u_pacc_dept.masa_fuente_financiamiento_object.nombre}`);

        if (u_pacc_dept.masa_precio_unitario_DragonClean)
            aactualizar.push(`<b>Precio Unitario:</b> $${u_pacc_dept.masa_precio_unitario}`);
        if (!aactualizar.length) {
            SWEETALERT.confirm({
                message: "No ha seleccionado ningun valor para la actualización en masa, desea salir?",
                confirm: function () {
                    u_pacc_dept.modal.close();
                }
            });
            return;
        }

        SWEETALERT.confirm({
            message: `Está seguro de actualizar en masa los registros que cumplen con la búsqueda ${busquedade}? <br><br> <b>Informaciones a actualizar:</b> <br><br> ${DSON.ULALIA(aactualizar, "list-unstyled text-left")}`,
            confirm: async () => {

                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});


                var datatoupdate = {
                    where: []
                };
                if (u_pacc_dept.toyfiltrado) {
                    datatoupdate.where.push({
                        "field": "pacc_departamento",
                        "operator": "=",
                        "value": u_pacc_dept.toyfiltrado
                    });
                }

                if (u_pacc_dept.masa_biene !== '[NULL]') {
                    datatoupdate.cbs = u_pacc_dept.masa_biene;
                }

                if (u_pacc_dept.masa_unidad_medida !== '[NULL]')
                    datatoupdate.unidad = u_pacc_dept.masa_unidad_medida;

                if (u_pacc_dept.masa_procedimiento_seleccion !== '[NULL]')
                    datatoupdate.procedimiento_seleccion = u_pacc_dept.masa_procedimiento_seleccion;

                if (u_pacc_dept.masa_fuente_financiamiento !== '[NULL]')
                    datatoupdate.fuente_financiamiento = u_pacc_dept.masa_fuente_financiamiento;

                if (u_pacc_dept.masa_precio_unitario_DragonClean)
                    datatoupdate.precio_unitario = u_pacc_dept.masa_precio_unitario_DragonClean;

                if (u_pacc_dept.masa_familia !== '[NULL]') {
                    let item = {
                        "field": `$ SUBSTR(cbs FROM 1 FOR 4) `,
                        "operator": "=",
                        "connector": "AND",
                        "value": u_pacc_dept.masa_familia.substr(0, 4)
                    };
                    datatoupdate.where.push(item);
                }

                ["descripcion", "cantidad_total", "unidad"].forEach((d, index) => {
                    let item = {
                        "field": `$ ${(index === 0) ? '(' : ''}${d}`,
                        "operator": "like",
                        "connector": "OR",
                        "value": `$ '%${u_pacc_dept.filtro}%' ${(index === 2) ? ')' : ''}`
                    };
                    datatoupdate.where.push(item);
                });


                datatoupdate.procedimiento_seleccion !== 'null' ? datatoupdate.procedimiento_seleccion : datatoupdate.procedimiento_seleccion = undefined;
                datatoupdate.fuente_financiamiento !== 'null' ? datatoupdate.fuente_financiamiento : datatoupdate.fuente_financiamiento = undefined;
                await BASEAPI.updateallp("pacc_departamental_detail", datatoupdate);

                u_pacc_dept.masa_familia_search = "";
                u_pacc_dept.masa_biene_search = "";
                SERVICE.planificacion_transfer.updateMasa({
                    pacc: u_pacc_dept.paccData.id
                }, function () {
                    SWEETALERT.stop();
                    SWEETALERT.show({
                        message: `Los registros que coinciden con su búsqueda han sido actualizados.`,
                        confirm: function () {
                            u_pacc_dept.get_pacc_detail();
                            u_pacc_dept.modal.close();
                        }
                    });
                });

            }
        });


        // } else {
        // SWEETALERT.show({
        //     type: 'warning',
        //     message: "El campo familia y código de catálogo de bienes y servicios(CBS) son requeridos"
        // });
        // }


    };
    u_pacc_dept.updateData = function (estatus) {
        if (u_pacc_dept.fullvalid()) {
            VALIDATION.save(u_pacc_dept, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.updateall('pacc_departamental', {
                    descripcion: u_pacc_dept.descripcion ? u_pacc_dept.descripcion : "$null",
                    estatus: estatus != 1 ? estatus : 2,
                    where: [
                        {
                            field: "id",
                            value: u_pacc_dept.id
                        }
                    ]
                }, function (result) {
                    location.reload();
                });
            }, ["estatus"]);
        } else {
            SWEETALERT.show({
                type: ENUM.modal.type.warning,
                title: "Validación",
                message: "No puede cambiar el estado sin completar los registros correctamente.",
                confirm: function () {

                }
            });
        }
    };
    u_pacc_dept.cancelar = function () {
        location.reload();
    };
    u_pacc_dept.isRojo = (p, key) => {
        if (!u_pacc_dept.comments)
            return ["text-danger"];
        if (!u_pacc_dept.PACCROWS[key].id)
            return ["text-primary"];
        return [!u_pacc_dept.comments.filter(d => {
            return d.value3 == p && d.value == u_pacc_dept.PACCROWS[key].id
        }).length ? 'text-danger' : 'text-primary'];
    };

    u_pacc_dept.isRojoBool = (p, key) => {
        if (!u_pacc_dept.comments)
            return true;
        if (!u_pacc_dept.PACCROWS[key].id)
            return false;
        return !u_pacc_dept.comments.filter(d => {
            return d.value3 == p && d.value == u_pacc_dept.PACCROWS[key].id
        }).length ? true : false;
    };
    u_pacc_dept.get_pacc_detail_solo = async function (pacc, pacc_departamento) {
        var animation = new ANIMATION();
        animation.loading(`#tb-custom2`, "Cargando ", ``, '200');
        u_pacc_dept.loadingpaccdetail = true;
        u_pacc_dept.PACCROWS = [];
        if (pacc) {
            u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                where: [{
                    field: "pacc",
                    value: pacc
                }],
                orderby: u_pacc_dept.ordename,
                order: u_pacc_dept.ordenametipo,
                limit: 0
            });
            animation.stoploading(`#tb-custom2`, ``);
            u_pacc_dept.refreshAngular();
        } else if (pacc_departamento) {
            u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                where: [{
                    field: "pacc_departamento",
                    value: pacc_departamento
                }],
                orderby: u_pacc_dept.ordename,
                order: u_pacc_dept.ordenametipo,
                limit: 0
            });
            animation.stoploading(`#tb-custom2`, ``);
            u_pacc_dept.refreshAngular();
        } else {
            if (typeof unificacion !== 'undefined') {
                if (typeof unificacion !== 'not defined') {
                    if (unificacion) {
                        u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                            where: [
                                {
                                    field: "pacc",
                                    value: unificacion.id
                                },
                                {
                                    field: "deleted",
                                    operator: "!=",
                                    value: 1
                                }
                            ],
                            orderby: u_pacc_dept.ordename,
                            order: u_pacc_dept.ordenametipo,
                            limit: 0
                        });
                        animation.stoploading(`#tb-custom2`, ``);
                        u_pacc_dept.refreshAngular();
                    } else {
                        u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                            where: [{
                                field: "pacc_departamento",
                                value: u_pacc_dept.id
                            }],
                            orderby: u_pacc_dept.ordename,
                            order: u_pacc_dept.ordenametipo,
                            limit: 0
                        });
                        animation.stoploading(`#tb-custom2`, ``);
                        u_pacc_dept.refreshAngular();
                    }
                } else {
                    u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                        where: [{
                            field: "pacc_departamento",
                            value: u_pacc_dept.id
                        }],
                        orderby: u_pacc_dept.ordename,
                        order: u_pacc_dept.ordenametipo,
                        limit: 0
                    });
                    animation.stoploading(`#tb-custom2`, ``);
                    u_pacc_dept.refreshAngular();
                }
            } else {
                u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                    where: [{
                        field: "pacc_departamento",
                        value: u_pacc_dept.id
                    }],
                    orderby: u_pacc_dept.ordename,
                    order: u_pacc_dept.ordenametipo,
                    limit: 0
                });
                animation.stoploading(`#tb-custom2`, ``);
                u_pacc_dept.refreshAngular();
            }
        }

        u_pacc_dept.pacc_detail_list = u_pacc_dept.pacc_detail_list.data;
        if (u_pacc_dept.pacc_detail_list) {
            u_pacc_dept.PACCROWS = [];
            for (var item of u_pacc_dept.pacc_detail_list) {
                console.log("entre", item.fuente_financiamiento, item.procedimiento_seleccion)
                var somerow = new PACCROW();
                somerow.id = item.id;
                somerow.mode = "edit";
                somerow.descripcion = item.descripcion;
                somerow.unidad = item.unidad;
                somerow.cbs = item.cbs;
                somerow.codigo_clasificador = item.codigo_clasificador;
                somerow.desc_clasificador = item.desc_clasificador;
                somerow.precio_unitario = item.precio_unitario;
                somerow.costo_total_real = item.costo_total_real;
                somerow.procedimiento_seleccion = item.procedimiento_seleccion != null ? item.procedimiento_seleccion + "" : "";
                somerow.fuente_financiamiento = item.fuente_financiamiento != null ? item.fuente_financiamiento + "" : "";
                somerow.cantidad_total = item.cantidad_total;
                somerow.pacc_departamento = item.pacc_departamento;
                somerow.revision = item.revision;
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    somerow['periodo_' + i] = item['periodo_' + i];
                }
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    somerow['periodo_' + i + "_real"] = item['periodo_' + i + "_real"];
                }
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    somerow['periodo_' + i + "_cantidad"] = item['periodo_' + i + "_cantidad"];
                }
                somerow.cantidad_total = item.cantidad_total;
                somerow.departamento = item.departamento_nombre;
                somerow.fecha_necesidad = moment(item.fecha_necesidad).isValid() ? moment(item.fecha_necesidad).format("DD/MM/YYYY") : "";
                u_pacc_dept.PACCROWS.push(somerow);
                PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS);
                console.log(somerow);

            }
        }
        u_pacc_dept.refreshAngular();
    };
    u_pacc_dept.get_pacc_detail = async function (pacc, pacc_departamento) {
        u_pacc_dept.toyfiltrado = pacc_departamento;
        var animation = new ANIMATION();
        animation.loading(`#tb-custom2`, "Cargando ", ``, '200');
        u_pacc_dept.loadingpaccdetail = true;
        u_pacc_dept.PACCROWS = [];
        u_pacc_dept.comments = await BASEAPI.listp('comentarios', {
            where: [{
                field: "type",
                value: 13
            }, {
                field: "value3",
                "operator": "is not",
                value: "$null"
            }],
            limit: 0
        });
        if (u_pacc_dept.comments)
            u_pacc_dept.comments = u_pacc_dept.comments.data;
        if (pacc) {
            u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                where: [
                    {
                        field: "pacc",
                        value: pacc
                    },
                    {
                        field: "deleted",
                        value: 0
                    }
                ],
                orderby: u_pacc_dept.ordename,
                order: u_pacc_dept.ordenametipo,
                limit: 0
            });
            animation.stoploading(`#tb-custom2`, ``);
            u_pacc_dept.refreshAngular();
        } else if (pacc_departamento) {
            u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                where: [
                    {
                        field: "pacc_departamento",
                        value: pacc_departamento
                    },
                    {
                        field: "deleted",
                        value: 0
                    }
                ],
                orderby: u_pacc_dept.ordename,
                order: u_pacc_dept.ordenametipo,
                limit: 0
            });
            animation.stoploading(`#tb-custom2`, ``);
            u_pacc_dept.refreshAngular();
        } else {
            if (typeof unificacion !== 'undefined') {
                if (typeof unificacion !== 'not defined') {
                    if (unificacion) {
                        u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                            where: [
                                {
                                    field: "pacc",
                                    value: unificacion.id
                                },
                                {
                                    field: "deleted",
                                    value: 0
                                }
                            ],
                            orderby: u_pacc_dept.ordename,
                            order: u_pacc_dept.ordenametipo,
                            limit: 0
                        });
                        animation.stoploading(`#tb-custom2`, ``);
                        u_pacc_dept.refreshAngular();
                    } else {
                        u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                            where: [{
                                field: "pacc_departamento",
                                value: u_pacc_dept.id
                            }],
                            orderby: u_pacc_dept.ordename,
                            order: u_pacc_dept.ordenametipo,
                            limit: 0
                        });
                        animation.stoploading(`#tb-custom2`, ``);
                        u_pacc_dept.refreshAngular();
                    }
                } else {
                    u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                        where: [{
                            field: "pacc_departamento",
                            value: u_pacc_dept.id
                        }],
                        orderby: u_pacc_dept.ordename,
                        order: u_pacc_dept.ordenametipo,
                        limit: 0
                    });
                    animation.stoploading(`#tb-custom2`, ``);
                    u_pacc_dept.refreshAngular();
                }
            } else {
                u_pacc_dept.pacc_detail_list = await BASEAPI.listp('vw_pacc_departamental_detail', {
                    where: [{
                        field: "pacc_departamento",
                        value: u_pacc_dept.id
                    }],
                    orderby: u_pacc_dept.ordename,
                    order: u_pacc_dept.ordenametipo,
                    limit: 0
                });
                animation.stoploading(`#tb-custom2`, ``);
                u_pacc_dept.refreshAngular();
            }
        }

        u_pacc_dept.pacc_detail_list = u_pacc_dept.pacc_detail_list.data;
        if (u_pacc_dept.pacc_detail_list) {
            u_pacc_dept.PACCROWS = [];
            for (var item of u_pacc_dept.pacc_detail_list) {
                var somerow = new PACCROW();
                somerow.id = item.id;
                somerow.mode = "edit";
                somerow.descripcion = item.descripcion;
                somerow.deleted = item.deleted;
                somerow.unidad = item.unidad;
                somerow.cbs = item.cbs;
                somerow.codigo_clasificador = item.codigo_clasificador;
                somerow.desc_clasificador = item.desc_clasificador;
                somerow.precio_unitario = item.precio_unitario;
                somerow.costo_total_real = item.costo_total_real;
                somerow.costo_unitario_real = item.costo_unitario_real;
                somerow.procedimiento_seleccion = item.procedimiento_seleccion ? item.procedimiento_seleccion + "" : "";
                somerow.fuente_financiamiento = item.fuente_financiamiento ? item.fuente_financiamiento + "" : "";
                somerow.cantidad_total = item.cantidad_total;
                somerow.pacc_departamento = item.pacc_departamento;
                somerow.revision = item.revision;
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    somerow['periodo_' + i] = item['periodo_' + i];
                }
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    somerow['periodo_' + i + "_real"] = item['periodo_' + i + "_real"];
                }
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    somerow['periodo_' + i + "_cantidad"] = item['periodo_' + i + "_cantidad"];
                }
                somerow.cantidad_total = item.cantidad_total;
                somerow.fecha_necesidad = moment(item.fecha_necesidad).isValid() ? moment(item.fecha_necesidad).format("DD/MM/YYYY") : "";
                somerow.observacion = item.observacion;
                somerow.departamento = item.departamento_nombre;
                u_pacc_dept.PACCROWS.push(somerow);
                PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS);

            }
        }
        u_pacc_dept.refreshAngular();
        u_pacc_dept.unidad_medida = await BASEAPI.listp('unidad_medida', {
            where: [{
                field: "compania",
                value: u_pacc_dept.us.compania_id
            }, {
                field: "active",
                value: 1
            }],
            limit: 0
        });
        u_pacc_dept.unidad_medida = u_pacc_dept.unidad_medida.data;

        u_pacc_dept.cbs = await BASEAPI.listp('vw_bienes_servicio', {
            limit: 0
        });
        u_pacc_dept.cbs = u_pacc_dept.cbs.data;

        u_pacc_dept.fuente_financiamiento = await BASEAPI.listp('fuente_financiamiento', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: u_pacc_dept.us.compania_id
                },
                {
                    "field": "institucion",
                    "operator": u_pacc_dept.us.institucion_id ? "=" : "is",
                    "value": u_pacc_dept.us.institucion_id ? u_pacc_dept.us.institucion_id : "$null"
                }
            ]
        });
        u_pacc_dept.fuente_financiamiento = u_pacc_dept.fuente_financiamiento.data;

        u_pacc_dept.procedimiento_seleccion = await BASEAPI.listp('procedimiento_seleccion', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: u_pacc_dept.us.compania_id
                },
                {
                    "field": "institucion",
                    "operator": u_pacc_dept.us.institucion_id ? "=" : "is",
                    "value": u_pacc_dept.us.institucion_id ? u_pacc_dept.us.institucion_id : "$null"
                }
            ]
        });
        u_pacc_dept.procedimiento_seleccion = u_pacc_dept.procedimiento_seleccion.data;

        u_pacc_dept.loadingpaccdetail = false;
        u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
        u_pacc_dept.refreshAngular();
        $(`.paccrow`).show();
        $('.inputdate').datetimepicker({
            scrollMonth: false,
            scrollTime: false,
            scrollInput: false,
            format: 'd/m/Y',
            timepicker: false,
            datepicker: true,
            inline: false,
            validateOnBlur: false,
            minDate: moment()
        });
        if (typeof unificacion !== 'undefined') {
            if (typeof unificacion !== 'not defined') {
                if (unificacion) {
                    unificacion.refreshAngular();
                }
            }
        }
    };
    u_pacc_dept.PACCROWSNODELETED = () => {
        return u_pacc_dept.PACCROWS.filter(d => {
            return !d.deleted
        });
    };
    u_pacc_dept.get_pacc_detail();
    u_pacc_dept.listtorow = function () {

    };
    u_pacc_dept.saveA = async function (key, firu, audit) {
        if (u_pacc_dept.PACCROWS[key]) {
            if (u_pacc_dept.PACCROWS[key].valid()) {
                if (u_pacc_dept.PACCROWS[key].mode === "new") {
                    var fechareal = '$null';
                    if (u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/').length > 2) {
                        fechareal = u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[2] + "/" +
                            u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[1] + "/" +
                            u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[0];
                    }
                    var dataToInser = {
                        pacc_departamento: u_pacc_dept.id,
                        unidad: u_pacc_dept.PACCROWS[key].unidad || "",
                        cbs: u_pacc_dept.PACCROWS[key].cbs || "",
                        precio_unitario: u_pacc_dept.PACCROWS[key].precio_unitario || 0,
                        cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                        costo_total: u_pacc_dept.PACCROWS[key].costo_total || 0,
                        costo_total_real: u_pacc_dept.PACCROWS[key].costo_total_real || 0,
                        procedimiento_seleccion: u_pacc_dept.PACCROWS[key].procedimiento_seleccion || "$null",
                        fuente_financiamiento: u_pacc_dept.PACCROWS[key].fuente_financiamiento || "$null",
                        descripcion: u_pacc_dept.PACCROWS[key].descripcion || "",
                        cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                        fecha_necesidad: fechareal,
                    };
                    for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                        if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo])
                            dataToInser["periodo_" + periodo] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo];
                    }
                    for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                        if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"])
                            dataToInser["periodo_" + periodo + "_real"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"];
                    }
                    for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                        if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"])
                            dataToInser["periodo_" + periodo + "_cantidad"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"];
                    }

                    new ANIMATION().loadingPure($("#row" + key + firu), "Guardando");
                    var dateven = await BASEAPI.insertIDp("pacc_departamental_detail", dataToInser, '', '');

                    u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                        cantidadtotal: u_pacc_dept.PACCROWS.length,
                        where: [
                            {
                                field: "id",
                                value: u_pacc_dept.id
                            }
                        ]
                    });
                    u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                    u_pacc_dept.PACCROWS[key].mode = "edit";
                    if (dateven.data)
                        if (dateven.data.data)
                            if (dateven.data.data[0])
                                u_pacc_dept.PACCROWS[key].id = dateven.data.data[0].id;
                    u_pacc_dept.refreshAngular();
                } else {
                    if (firu) {
                        if (u_pacc_dept.PACCROWS[key][firu] === "") {
                            return;
                        }
                    }
                    var fechareal = '$null';
                    if (u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/').length > 2) {
                        fechareal = u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[2] + "/" +
                            u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[1] + "/" +
                            u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[0];
                    }
                    var datatoupdate = {
                        pacc_departamento: u_pacc_dept.PACCROWS[key].pacc_departamento || u_pacc_dept.id,
                        unidad: u_pacc_dept.PACCROWS[key].unidad || "",
                        cbs: u_pacc_dept.PACCROWS[key].cbs || "",
                        precio_unitario: u_pacc_dept.PACCROWS[key].precio_unitario || 0,
                        cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                        costo_total: u_pacc_dept.PACCROWS[key].costo_total || 0,
                        costo_total_real: u_pacc_dept.PACCROWS[key].costo_total_real || 0,
                        procedimiento_seleccion: u_pacc_dept.PACCROWS[key].procedimiento_seleccion || "$null",
                        fuente_financiamiento: u_pacc_dept.PACCROWS[key].fuente_financiamiento || "$null",
                        descripcion: u_pacc_dept.PACCROWS[key].descripcion || "",
                        cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                        fecha_necesidad: fechareal,
                        where: [{
                            "field": "id",
                            "operator": "=",
                            "value": u_pacc_dept.PACCROWS[key].id
                        }]
                    };
                    datatoupdate.procedimiento_seleccion != 'null' ? datatoupdate.procedimiento_seleccion : datatoupdate.procedimiento_seleccion = undefined;
                    datatoupdate.fuente_financiamiento != 'null' ? datatoupdate.fuente_financiamiento : datatoupdate.fuente_financiamiento = undefined;
                    for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                        if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo])
                            datatoupdate["periodo_" + periodo] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo];
                        else
                            datatoupdate["periodo_" + periodo] = "$null";
                    }
                    for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                        if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"])
                            datatoupdate["periodo_" + periodo + "_real"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"];
                    }
                    for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                        if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"])
                            datatoupdate["periodo_" + periodo + "_cantidad"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"];
                    }
                    new ANIMATION().loadingPure($("#row" + key + firu), "Guardando");
                    await BASEAPI.updateallp("pacc_departamental_detail", datatoupdate);
                    if (audit) {
                        if (!u_pacc_dept.realparallel[key])
                            u_pacc_dept.realparallel[key] = {};
                        let parallel = u_pacc_dept.pacc_detail_list.filter(d => {
                            return d.id == u_pacc_dept.PACCROWS[key].id
                        })[0];
                        await BASEAPI.insertIDp("pacc_auditoria", {
                            compania: u_pacc_dept.session.compania_id,
                            institucion: u_pacc_dept.session.institucion_id || undefined,
                            campo: firu,
                            valoranterior: u_pacc_dept.realparallel[key][firu] || parallel[firu],
                            valornuevo: u_pacc_dept.PACCROWS[key][firu],
                            usuario: u_pacc_dept.session.usuario_id,
                            pacc_departamental_detail: u_pacc_dept.PACCROWS[key].id,
                        }, '', '');
                        u_pacc_dept.realparallel[key][firu] = u_pacc_dept.PACCROWS[key][firu];

                    }
                    u_pacc_dept.PACCROWS[key].mode = "edit";
                    u_pacc_dept.refreshAngular();
                }
                new ANIMATION().stoploadingPure($("#row" + key + firu));
            }
        }
    };
    u_pacc_dept.realparallel = [];
    u_pacc_dept.deleteAAll = async function () {
        await BASEAPI.deleteallp("pacc_departamental_detail", [{
            "field": "pacc_departamento",
            "operator": "=",
            "value": u_pacc_dept.id
        }]);
        u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
            cantidadtotal: u_pacc_dept.PACCROWS.length,
            where: [
                {
                    field: "id",
                    value: u_pacc_dept.id
                }
            ]
        });
        u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
        u_pacc_dept.refreshAngular();
    };
    u_pacc_dept.deleteA = async function (key) {
        if (u_pacc_dept.PACCROWS[key]) {
            if (u_pacc_dept.PACCROWS[key].mode === "edit") {
                if (typeof unificacion !== "undefined") {
                    if (typeof unificacion !== "not defined") {
                        if (unificacion) {
                            await BASEAPI.updateallp("pacc_departamental_detail", {
                                deleted: 1,
                                where: [{
                                    "field": "id",
                                    "operator": "=",
                                    "value": u_pacc_dept.PACCROWS[key].id
                                }]
                            });
                            u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                cantidadtotal: u_pacc_dept.PACCROWS.length,
                                where: [
                                    {
                                        field: "id",
                                        value: u_pacc_dept.id
                                    }
                                ]
                            });
                            u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                            unificacion.getOpenpacc();
                            u_pacc_dept.refreshAngular();
                        } else {
                            await BASEAPI.deleteallp("pacc_departamental_detail", [{
                                "field": "id",
                                "operator": "=",
                                "value": u_pacc_dept.PACCROWS[key].id
                            }]);
                            u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                cantidadtotal: u_pacc_dept.PACCROWS.length,
                                where: [
                                    {
                                        field: "id",
                                        value: u_pacc_dept.id
                                    }
                                ]
                            });
                            u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                            u_pacc_dept.refreshAngular();
                        }
                    } else {
                        await BASEAPI.deleteallp("pacc_departamental_detail", [{
                            "field": "id",
                            "operator": "=",
                            "value": u_pacc_dept.PACCROWS[key].id
                        }]);
                        u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                            cantidadtotal: u_pacc_dept.PACCROWS.length,
                            where: [
                                {
                                    field: "id",
                                    value: u_pacc_dept.id
                                }
                            ]
                        });
                        u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                        u_pacc_dept.refreshAngular();
                    }
                } else {
                    await BASEAPI.deleteallp("pacc_departamental_detail", [{
                        "field": "id",
                        "operator": "=",
                        "value": u_pacc_dept.PACCROWS[key].id
                    }]);
                    u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                        cantidadtotal: u_pacc_dept.PACCROWS.length,
                        where: [
                            {
                                field: "id",
                                value: u_pacc_dept.id
                            }
                        ]
                    });
                    u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                    u_pacc_dept.refreshAngular();
                }
            }
        }
    };
    u_pacc_dept.add = function (some) {
        var allow = false;
        if (u_pacc_dept.PACCROWS.length === 0) {
            allow = true;
        } else {
            if (ARRAY.last(u_pacc_dept.PACCROWS).valid()) {
                allow = true;
            }
        }

        if (allow) {
            if (some === undefined) {
                u_pacc_dept.PACCROWS.push(new PACCROW());
            } else {
                var somerow = new PACCROW();
                somerow.id = new Date().getTime();
                somerow.descripcion = DSON.OSO(u_pacc_dept.PACCROWS[some].descripcion);
                somerow.unidad = DSON.OSO(u_pacc_dept.PACCROWS[some].unidad);
                somerow.cantidad_total = DSON.OSO(u_pacc_dept.PACCROWS[some].cantidad_total);
                somerow.fecha_necesidad = DSON.OSO(u_pacc_dept.PACCROWS[some].fecha_necesidad);
                u_pacc_dept.PACCROWS.push(somerow);
            }
            setTimeout(function () {
                $(`.paccrow:eq(${$(".paccrow").length - 1})`).show();
                var firstFieldWithError = $(`.paccrow:eq(${$(".paccrow").length - 1})`);
                new ANIMATION().playPure(firstFieldWithError, !some ? "fadeIn" : "bounceInUp", function () {
                    u_pacc_dept.refreshAngular();
                });
                $('.inputdate').datetimepicker({
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    format: 'd/m/Y',
                    timepicker: false,
                    datepicker: true,
                    inline: false,
                    validateOnBlur: false,
                    minDate: moment()
                });
                PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS);
                u_pacc_dept.lastPage();
                u_pacc_dept.refreshAngular();
            }, 200);
        } else {
            var firstFieldWithError = $(`.paccrow:eq(${$(".paccrow").length - 1})`);
            new ANIMATION().playPure(firstFieldWithError, "shake", function () {
                u_pacc_dept.refreshAngular();
            });
        }

    };
    u_pacc_dept.popaction = function (option, key) {
        //u_pacc_dept.actions = ['Eliminar fila completa', 'Eliminar toda la tabla', 'Duplicar registro', 'Limpiar fila'];
        switch (option) {
            case 0: {
                var firstFieldWithError = $(`.paccrow:eq(${key})`);
                new ANIMATION().playPure(firstFieldWithError, "bounceOutLeft", function () {
                    u_pacc_dept.deleteA(key);
                    u_pacc_dept.PACCROWS.splice(key, 1);
                    PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS);
                    if (u_pacc_dept.table.currentPage > u_pacc_dept.table.pages.length) {
                        u_pacc_dept.lastPage();
                    }
                    u_pacc_dept.refreshAngular();
                });
                break;
            }
            case 1: {
                SWEETALERT.confirm({
                    message: "Está seguro de eliminar toda la tabla?",
                    confirm: function () {
                        var firstFieldWithError = $(`#tb-custom2`);
                        new ANIMATION().playPure(firstFieldWithError, "bounceOut", function () {
                            u_pacc_dept.PACCROWS = [];
                            u_pacc_dept.deleteAAll();

                            PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS);
                            u_pacc_dept.firstPage();
                            u_pacc_dept.refreshAngular();
                        });
                    }
                });

                break;
            }
            case 2: {
                var firstFieldWithError = $(`.paccrow:eq(${key})`);
                new ANIMATION().playPure(firstFieldWithError, "bounce", function () {


                });
                u_pacc_dept.add(key);
                break;
            }
            case 3: {
                var firstFieldWithError = $(`.paccrow:eq(${key})`);
                u_pacc_dept.PACCROWS[key].descripcion = "";
                u_pacc_dept.PACCROWS[key].cantidad_total = 0;
                u_pacc_dept.PACCROWS[key].fecha_necesidad = "";
                u_pacc_dept.PACCROWS[key].unidad = "";
                u_pacc_dept.refreshAngular();
                new ANIMATION().playPure(firstFieldWithError, "flipInX", function () {

                });
                break;
            }
        }

    };
    u_pacc_dept.onOptionChange = () => {
        // if (u_pacc_dept.PACCROWS)
        // u_pacc_dept.PACCROWS.forEach((d, key) => {
        //     [1, 2, 3, 4].forEach(async (p) => {
        //         if (d['periodo_' + p + '_cantidad'] > d['periodo_' + p + ''] && u_pacc_dept.isRojoBool(p, key)) {
        //             await BASEAPI.insertIDp('comentarios', {
        //                 "comentario": "\"Cantidad adquirida\" es distinta a la \"cantidad planificada\". Comentario automático",
        //                 "type": ENUM_2.tipo_comentario.Pacc_departamental_detail,
        //                 "created_by": u_pacc_dept.session.usuario_id,
        //                 "value": d.id,
        //                 "value2": "$null",
        //                 "value3": p
        //             }, '', '');
        //         }
        //     })
        // });
    };
    u_pacc_dept.modalAuditoria = (idpacc) => {
        IDDELPACC = idpacc;
        baseController.modal.modalView("pacc_auditoria", {
            width: ENUM.modal.width.full,
            header: {
                title: "Auditoría Para Registros del PACC",
                icon: "list"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `Cargando`,
                sameController: 'pacc_auditoria'
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {
                        u_pacc_dept.saveA = async function (key, firu, audit) {
                            if (u_pacc_dept.PACCROWS[key]) {
                                if (u_pacc_dept.PACCROWS[key].valid()) {
                                    if (u_pacc_dept.PACCROWS[key].mode === "new") {
                                        var fechareal = '$null';
                                        if (u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/').length > 2) {
                                            fechareal = u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[2] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[1] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[0];
                                        }
                                        var dataToInser = {
                                            pacc_departamento: u_pacc_dept.id,
                                            unidad: u_pacc_dept.PACCROWS[key].unidad || "",
                                            cbs: u_pacc_dept.PACCROWS[key].cbs || "",
                                            precio_unitario: u_pacc_dept.PACCROWS[key].precio_unitario || 0,
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            costo_total: u_pacc_dept.PACCROWS[key].costo_total || 0,
                                            costo_total_real: u_pacc_dept.PACCROWS[key].costo_total_real || 0,
                                            procedimiento_seleccion: u_pacc_dept.PACCROWS[key].procedimiento_seleccion || "$null",
                                            fuente_financiamiento: u_pacc_dept.PACCROWS[key].fuente_financiamiento || "$null",
                                            descripcion: u_pacc_dept.PACCROWS[key].descripcion || "",
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            fecha_necesidad: fechareal,
                                        };
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo])
                                                dataToInser["periodo_" + periodo] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo];
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"])
                                                dataToInser["periodo_" + periodo + "_real"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"];
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"])
                                                dataToInser["periodo_" + periodo + "_cantidad"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"];
                                        }

                                        new ANIMATION().loadingPure($("#row" + key + firu), "Guardando");
                                        var dateven = await BASEAPI.insertIDp("pacc_departamental_detail", dataToInser, '', '');

                                        u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                            cantidadtotal: u_pacc_dept.PACCROWS.length,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: u_pacc_dept.id
                                                }
                                            ]
                                        });
                                        u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                                        u_pacc_dept.PACCROWS[key].mode = "edit";
                                        if (dateven.data)
                                            if (dateven.data.data)
                                                if (dateven.data.data[0])
                                                    u_pacc_dept.PACCROWS[key].id = dateven.data.data[0].id;
                                        u_pacc_dept.refreshAngular();
                                    } else {
                                        var fechareal = '$null';
                                        if (u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/').length > 2) {
                                            fechareal = u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[2] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[1] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[0];
                                        }
                                        var datatoupdate = {
                                            pacc_departamento: u_pacc_dept.PACCROWS[key].pacc_departamento || u_pacc_dept.id,
                                            unidad: u_pacc_dept.PACCROWS[key].unidad || "",
                                            cbs: u_pacc_dept.PACCROWS[key].cbs || "",
                                            precio_unitario: u_pacc_dept.PACCROWS[key].precio_unitario || 0,
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            costo_total: u_pacc_dept.PACCROWS[key].costo_total || 0,
                                            costo_total_real: u_pacc_dept.PACCROWS[key].costo_total_real || 0,
                                            procedimiento_seleccion: u_pacc_dept.PACCROWS[key].procedimiento_seleccion || "$null",
                                            fuente_financiamiento: u_pacc_dept.PACCROWS[key].fuente_financiamiento || "$null",
                                            descripcion: u_pacc_dept.PACCROWS[key].descripcion || "",
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            fecha_necesidad: fechareal,
                                            where: [{
                                                "field": "id",
                                                "operator": "=",
                                                "value": u_pacc_dept.PACCROWS[key].id
                                            }]
                                        };
                                        datatoupdate.procedimiento_seleccion != 'null' ? datatoupdate.procedimiento_seleccion : datatoupdate.procedimiento_seleccion = undefined;
                                        datatoupdate.fuente_financiamiento != 'null' ? datatoupdate.fuente_financiamiento : datatoupdate.fuente_financiamiento = undefined;
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo])
                                                datatoupdate["periodo_" + periodo] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo];
                                            else
                                                datatoupdate["periodo_" + periodo] = "$null";
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"])
                                                datatoupdate["periodo_" + periodo + "_real"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"];
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"])
                                                datatoupdate["periodo_" + periodo + "_cantidad"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"];
                                        }
                                        new ANIMATION().loadingPure($("#row" + key + firu), "Guardando");
                                        await BASEAPI.updateallp("pacc_departamental_detail", datatoupdate);
                                        if (audit) {
                                            if (!u_pacc_dept.realparallel[key])
                                                u_pacc_dept.realparallel[key] = {};
                                            let parallel = u_pacc_dept.pacc_detail_list.filter(d => {
                                                return d.id == u_pacc_dept.PACCROWS[key].id
                                            })[0];
                                            await BASEAPI.insertIDp("pacc_auditoria", {
                                                compania: u_pacc_dept.session.compania_id,
                                                institucion: u_pacc_dept.session.institucion_id || undefined,
                                                campo: firu,
                                                valoranterior: u_pacc_dept.realparallel[key][firu] || parallel[firu],
                                                valornuevo: u_pacc_dept.PACCROWS[key][firu],
                                                usuario: u_pacc_dept.session.usuario_id,
                                                pacc_departamental_detail: u_pacc_dept.PACCROWS[key].id,
                                            }, '', '');
                                            u_pacc_dept.realparallel[key][firu] = u_pacc_dept.PACCROWS[key][firu];

                                        }
                                        u_pacc_dept.PACCROWS[key].mode = "edit";
                                        u_pacc_dept.refreshAngular();
                                    }
                                    new ANIMATION().stoploadingPure($("#row" + key + firu));
                                }
                            }
                        };
                    }
                }
            }
        });
    };
    u_pacc_dept.open_comment = function (key, trimestre) {
        Row_id = u_pacc_dept.PACCROWS[key].id;
        Revision = u_pacc_dept.PACCROWS[key].revision;
        Deleted = u_pacc_dept.PACCROWS[key].deleted;
        Trimestre = trimestre;
        if (u_pacc_dept.rawestatus > 2) {

        }
        baseController.modal.modalView("pacc_departamental_detail/comentario", {
            width: ENUM.modal.width.full,
            header: {
                title: "Observación ( " + u_pacc_dept.PACCROWS[key].descripcion + " )" + (trimestre ? ` para trimestre ${trimestre}` : ""),
                icon: "comment"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'pacc_departamental_detail'
            },
            event: {
                hide: {
                    end: async function (data) {
                        u_pacc_dept.saveA = async function (key, firu, audit) {
                            if (u_pacc_dept.PACCROWS[key]) {
                                if (u_pacc_dept.PACCROWS[key].valid()) {
                                    if (u_pacc_dept.PACCROWS[key].mode === "new") {
                                        var fechareal = '$null';
                                        if (u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/').length > 2) {
                                            fechareal = u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[2] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[1] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[0];
                                        }
                                        var dataToInser = {
                                            pacc_departamento: u_pacc_dept.id,
                                            unidad: u_pacc_dept.PACCROWS[key].unidad || "",
                                            cbs: u_pacc_dept.PACCROWS[key].cbs || "",
                                            precio_unitario: u_pacc_dept.PACCROWS[key].precio_unitario || 0,
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            costo_total: u_pacc_dept.PACCROWS[key].costo_total || 0,
                                            costo_total_real: u_pacc_dept.PACCROWS[key].costo_total_real || 0,
                                            procedimiento_seleccion: u_pacc_dept.PACCROWS[key].procedimiento_seleccion || "$null",
                                            fuente_financiamiento: u_pacc_dept.PACCROWS[key].fuente_financiamiento || "$null",
                                            descripcion: u_pacc_dept.PACCROWS[key].descripcion || "",
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            fecha_necesidad: fechareal,
                                        };
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo])
                                                dataToInser["periodo_" + periodo] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo];
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"])
                                                dataToInser["periodo_" + periodo + "_real"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"];
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"])
                                                dataToInser["periodo_" + periodo + "_cantidad"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"];
                                        }

                                        new ANIMATION().loadingPure($("#row" + key + firu), "Guardando");
                                        var dateven = await BASEAPI.insertIDp("pacc_departamental_detail", dataToInser, '', '');

                                        u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                            cantidadtotal: u_pacc_dept.PACCROWS.length,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: u_pacc_dept.id
                                                }
                                            ]
                                        });
                                        u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                                        u_pacc_dept.PACCROWS[key].mode = "edit";
                                        if (dateven.data)
                                            if (dateven.data.data)
                                                if (dateven.data.data[0])
                                                    u_pacc_dept.PACCROWS[key].id = dateven.data.data[0].id;
                                        u_pacc_dept.refreshAngular();
                                    } else {
                                        var fechareal = '$null';
                                        if (u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/').length > 2) {
                                            fechareal = u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[2] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[1] + "/" +
                                                u_pacc_dept.PACCROWS[key].fecha_necesidad.split('/')[0];
                                        }
                                        var datatoupdate = {
                                            pacc_departamento: u_pacc_dept.PACCROWS[key].pacc_departamento || u_pacc_dept.id,
                                            unidad: u_pacc_dept.PACCROWS[key].unidad || "",
                                            cbs: u_pacc_dept.PACCROWS[key].cbs || "",
                                            precio_unitario: u_pacc_dept.PACCROWS[key].precio_unitario || 0,
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            costo_total: u_pacc_dept.PACCROWS[key].costo_total || 0,
                                            costo_total_real: u_pacc_dept.PACCROWS[key].costo_total_real || 0,
                                            procedimiento_seleccion: u_pacc_dept.PACCROWS[key].procedimiento_seleccion || "$null",
                                            fuente_financiamiento: u_pacc_dept.PACCROWS[key].fuente_financiamiento || "$null",
                                            descripcion: u_pacc_dept.PACCROWS[key].descripcion || "",
                                            cantidad_total: u_pacc_dept.PACCROWS[key].cantidad_total || 0,
                                            fecha_necesidad: fechareal,
                                            where: [{
                                                "field": "id",
                                                "operator": "=",
                                                "value": u_pacc_dept.PACCROWS[key].id
                                            }]
                                        };
                                        datatoupdate.procedimiento_seleccion != 'null' ? datatoupdate.procedimiento_seleccion : datatoupdate.procedimiento_seleccion = undefined;
                                        datatoupdate.fuente_financiamiento != 'null' ? datatoupdate.fuente_financiamiento : datatoupdate.fuente_financiamiento = undefined;
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo])
                                                datatoupdate["periodo_" + periodo] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo];
                                            else
                                                datatoupdate["periodo_" + periodo] = "$null";
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"])
                                                datatoupdate["periodo_" + periodo + "_real"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_real"];
                                        }
                                        for (var periodo of u_pacc_dept.PACCROWS[key].periodos) {
                                            if (u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"])
                                                datatoupdate["periodo_" + periodo + "_cantidad"] = u_pacc_dept.PACCROWS[key]["periodo_" + periodo + "_cantidad"];
                                        }
                                        new ANIMATION().loadingPure($("#row" + key + firu), "Guardando");
                                        await BASEAPI.updateallp("pacc_departamental_detail", datatoupdate);
                                        if (audit) {
                                            if (!u_pacc_dept.realparallel[key])
                                                u_pacc_dept.realparallel[key] = {};
                                            let parallel = u_pacc_dept.pacc_detail_list.filter(d => {
                                                return d.id == u_pacc_dept.PACCROWS[key].id
                                            })[0];
                                            await BASEAPI.insertIDp("pacc_auditoria", {
                                                compania: u_pacc_dept.session.compania_id,
                                                institucion: u_pacc_dept.session.institucion_id || undefined,
                                                campo: firu,
                                                valoranterior: u_pacc_dept.realparallel[key][firu] || parallel[firu],
                                                valornuevo: u_pacc_dept.PACCROWS[key][firu],
                                                usuario: u_pacc_dept.session.usuario_id,
                                                pacc_departamental_detail: u_pacc_dept.PACCROWS[key].id,
                                            }, '', '');
                                            u_pacc_dept.realparallel[key][firu] = u_pacc_dept.PACCROWS[key][firu];

                                        }
                                        u_pacc_dept.PACCROWS[key].mode = "edit";
                                        u_pacc_dept.refreshAngular();
                                    }
                                    new ANIMATION().stoploadingPure($("#row" + key + firu));
                                }
                            }
                        };
                        if (Trimestre) {
                            u_pacc_dept.comments = await BASEAPI.listp('comentarios', {
                                where: [{
                                    field: "type",
                                    value: 13
                                }, {
                                    field: "value3",
                                    "operator": "is not",
                                    value: "$null"
                                }],
                                limit: 0
                            });

                            if (u_pacc_dept.comments)
                                u_pacc_dept.comments = u_pacc_dept.comments.data;
                            u_pacc_dept.refreshAngular();
                            return;
                        }
                        if (DSON.oseaX(unificacion)) {
                            unificacion.allow_estatus();
                        }

                        u_pacc_dept.deleteAAll = async function () {
                            await BASEAPI.deleteallp("pacc_departamental_detail", [{
                                "field": "pacc_departamento",
                                "operator": "=",
                                "value": u_pacc_dept.id
                            }]);
                            u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                cantidadtotal: u_pacc_dept.PACCROWS.length,
                                where: [
                                    {
                                        field: "id",
                                        value: u_pacc_dept.id
                                    }
                                ]
                            });
                            u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                            u_pacc_dept.refreshAngular();
                        };
                        u_pacc_dept.deleteA = async function (key) {
                            if (u_pacc_dept.PACCROWS[key]) {
                                if (u_pacc_dept.PACCROWS[key].mode === "edit") {
                                    if (typeof unificacion !== "undefined") {
                                        if (typeof unificacion !== "not defined") {
                                            if (unificacion) {
                                                await BASEAPI.updateallp("pacc_departamental_detail", {
                                                    deleted: 1,
                                                    where: [{
                                                        "field": "id",
                                                        "operator": "=",
                                                        "value": u_pacc_dept.PACCROWS[key].id
                                                    }]
                                                });
                                                u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                                    cantidadtotal: u_pacc_dept.PACCROWS.length,
                                                    where: [
                                                        {
                                                            field: "id",
                                                            value: u_pacc_dept.id
                                                        }
                                                    ]
                                                });
                                                u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                                                unificacion.getOpenpacc();
                                                u_pacc_dept.refreshAngular();
                                            } else {
                                                await BASEAPI.deleteallp("pacc_departamental_detail", [{
                                                    "field": "id",
                                                    "operator": "=",
                                                    "value": u_pacc_dept.PACCROWS[key].id
                                                }]);
                                                u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                                    cantidadtotal: u_pacc_dept.PACCROWS.length,
                                                    where: [
                                                        {
                                                            field: "id",
                                                            value: u_pacc_dept.id
                                                        }
                                                    ]
                                                });
                                                u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                                                u_pacc_dept.refreshAngular();
                                            }
                                        } else {
                                            await BASEAPI.deleteallp("pacc_departamental_detail", [{
                                                "field": "id",
                                                "operator": "=",
                                                "value": u_pacc_dept.PACCROWS[key].id
                                            }]);
                                            u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                                cantidadtotal: u_pacc_dept.PACCROWS.length,
                                                where: [
                                                    {
                                                        field: "id",
                                                        value: u_pacc_dept.id
                                                    }
                                                ]
                                            });
                                            u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                                            u_pacc_dept.refreshAngular();
                                        }
                                    } else {
                                        await BASEAPI.deleteallp("pacc_departamental_detail", [{
                                            "field": "id",
                                            "operator": "=",
                                            "value": u_pacc_dept.PACCROWS[key].id
                                        }]);
                                        u_pacc_dept.dept_data = await BASEAPI.updateallp("pacc_departamental", {
                                            cantidadtotal: u_pacc_dept.PACCROWS.length,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: u_pacc_dept.id
                                                }
                                            ]
                                        });
                                        u_pacc_dept.cantidad = u_pacc_dept.PACCROWS.length;
                                        u_pacc_dept.refreshAngular();
                                    }
                                }
                            }
                        };

                    }
                }
            },


        });
    };
    u_pacc_dept.get_data();
    u_pacc_dept.valid_period = function (key) {
        var cantidadwas = 0;
        if (u_pacc_dept.PACCROWS) {
            if (u_pacc_dept.PACCROWS[key]) {
                u_pacc_dept.PACCROWS[key]
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    if (u_pacc_dept.PACCROWS[key]['periodo_' + i]) {
                        cantidadwas += parseInt(u_pacc_dept.PACCROWS[key]['periodo_' + i]);
                    }
                }
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    if (u_pacc_dept.PACCROWS[key]['periodo_' + i + "_real"]) {
                        cantidadwas += parseInt(u_pacc_dept.PACCROWS[key]['periodo_' + i + "_real"]);
                    }
                }
                for (var i = 1; i <= u_pacc_dept.periodopoa; i++) {
                    if (u_pacc_dept.PACCROWS[key]['periodo_' + i + "_cantidad"]) {
                        cantidadwas += parseInt(u_pacc_dept.PACCROWS[key]['periodo_' + i + "_cantidad"]);
                    }
                }
            }
        }
        if (cantidadwas > 0) {
            return 'success'
        } else {
            return 'error'
        }
    }
    u_pacc_dept.getSelectedText = function (type, key) {
        return $('#' + type + '_' + key + ' option:selected').text();
    }
    u_pacc_dept.validate_cbs = function (key) {
        if (u_pacc_dept.PACCROWS) {
            var currentrow = u_pacc_dept.PACCROWS[key];
            var no_valid_items = 0;
            for (var item of u_pacc_dept.PACCROWS) {
                if (!DSON.oseaX(item.cbs)) {
                    if (item.cbs == currentrow.cbs && item.unidad != currentrow.unidad) {
                        item.not_valid = true;
                        no_valid_items++
                    } else {
                        item.not_valid = false;
                    }
                }
            }
            return no_valid_items <= 0;
        }
    }
    u_pacc_dept.get_form_069 = async function () {
        u_pacc_dept.form_069_data = [];
        var pacc_dept_header = await BASEAPI.listp('vw_pacc_departamental_detail', {
            limit: 0,
            where: [
                {
                    field: "pacc_departamento",
                    value: u_pacc_dept.id
                },
                {
                    field: "deleted",
                    value: 0
                }
            ]
        });
        if (pacc_dept_header.data) {
            var header = {};
            var count = 0;
            u_pacc_dept.full_cant = pacc_dept_header.data.length;
            for (var i of u_pacc_dept.periodopoas) {
                header = {};
                header[`periodo`] = i;
                u_pacc_dept.form_069_data[count] = {
                    header: header,
                    body: pacc_dept_header.data.filter(d => {
                        return d[`periodo_${i}`] != null;
                    })
                }
                count++
            }
        }
        u_pacc_dept.unidad_medida_list = await BASEAPI.listp('unidad_medida', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: u_pacc_dept.us.compania_id
                },
                {
                    field: "active",
                    value: 1
                },
                {
                    "field": "institucion",
                    "operator": "=",
                    "value": u_pacc_dept.us.institucion_id ? u_pacc_dept.us.institucion_id : "null"
                },
            ],
            orderby: "id",
            order: "asc"
        });
        if (u_pacc_dept.unidad_medida_list) {
            for (var i of u_pacc_dept.form_069_data) {
                for (var j of i.body) {
                    j.costo_total = LAN.money(j.costo_total).format(false);
                    for (var k of u_pacc_dept.unidad_medida_list.data) {
                        if (j.unidad == k.id) {
                            j.unidad = k.nombre;
                        }
                    }
                }
            }
        }

        var pacc_dept_pres = await BASEAPI.firstp('vw_presupuesto_pacc_dept', {
            where: [
                {
                    field: "departamento",
                    value: u_pacc_dept.dept_data.departamento
                }
            ]
        });
        if (pacc_dept_pres) {
            u_pacc_dept.full_press = LAN.money(pacc_dept_pres.presupuesto).format(true);
        }
        u_pacc_dept.fecha_aprobacion_069 = LAN.datetime(u_pacc_dept.fecha_aprobacion);
    };
    u_pacc_dept.exportPDF = function () {

        $("#form_069pdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    u_pacc_dept.open_export = async function () {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        await u_pacc_dept.get_form_069();
        u_pacc_dept.modal.modalView("u_pacc_dept/form_069", {
            width: 'modal-full',
            header: {
                title: `Vista Previa Formulario 069`,
                icon: "ICON.classes.icon-file-presentation"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                show: {
                    end: function () {
                        SWEETALERT.stop();
                    }
                }
            }
        });
    }

});
