app.controller("indicador_producto_poa_actividad", function ($scope, $http, $compile) {
        indicador_producto_poa_actividad = this;
        indicador_producto_poa_actividad.destroyForm = false;
        indicador_producto_poa_actividad.textModal = '';
        indicador_producto_poa_actividad.asbierto = CONFIG.seguridadindicadores === "abierta";
        var user = new SESSION().current();
        indicador_producto_poa_actividad.usuario_id = user.usuario_id;
        indicador_producto_poa_actividad.conditionPoa = {estado: user.estado, poa_id: user.poa_id};
        indicador_producto_poa_actividad.estatus = ENUM_2.presupuesto_estatus.Completo;
        indicador_producto_poa_actividad.estado = ENUM_2.poa_estatus.Inactivo;
        indicador_producto_poa_actividad.group_permitir = user.groups[0] ? user.groups[0].caracteristica : "";
        indicador_producto_poa_actividad.session = user;
        RUNCONTROLLER("indicador_producto_poa_actividad", indicador_producto_poa_actividad, $scope, $http, $compile);
        indicador_producto_poa_actividad.multiplo = 0;
        indicador_producto_poa_actividad.arrays = [];
        var r = 0;
        indicador_producto_poa_actividad.get_month = moment(new Date).month() + 1;
        indicador_producto_poa_actividad.get_month = moment(new Date).month() + 1;
        indicador_producto_poa_actividad.get_year = moment(new Date).month() + 1;

        var http = new HTTP();
        indicador_producto_poa_actividad.queries = http.hrefToObj();

        if (indicador_producto_poa_actividad.queries.id) {
            indicador_producto_poa_actividad.indicador_poa = indicador_producto_poa_actividad.queries.id;
        }
        if (typeof vw_dashboard_productosgrid_actividades !== "undefined")
            if (vw_dashboard_productosgrid_actividades.selectedPEI) {
                indicador_producto_poa_actividad.queries.id = vw_dashboard_productosgrid_actividades.selectedPEI;
                indicador_producto_poa_actividad.indicador_poa = vw_dashboard_productosgrid_actividades.selectedPEI;
                indicador_producto_poa_actividad.forUseData = vw_dashboard_productosgrid_actividades.forUseData;
            }

        for (var i = 1; user.cantidad; i++) {
            r = i * user.cantidad;
            if (r == 12) {
                indicador_producto_poa_actividad.multiplo = i;
                break;
            }
        }
        var c = 0;
        var d = 0;
        for (var i = 1; i <= user.cantidad; i++) {
            indicador_producto_poa_actividad.arrays['periodo' + i] = [];
            for (var l = 1 + c; l <= indicador_producto_poa_actividad.multiplo + c; l++) {
                indicador_producto_poa_actividad.arrays['periodo' + i].push(l);
                d++;
            }
            c = d;
        }

        indicador_producto_poa_actividad.filesme = [];
        indicador_producto_poa_actividad.validate_permissions = function (v1, desde) {


            if (user.periodo_poa < moment(new Date).year()) {
                if (indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1])
                    if (eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1].id}`))
                        if (
                            eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1].id}`) == "0" ||
                            eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1].id}`) == "0.00" ||
                            eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1].id}`) === "" ||
                            eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1].id}`) === null) {
                            eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[v1 - 1].id}.disabled = false`);
                            return false;
                        }
            }


            if (indicador_producto_poa_actividad.ver_estado == indicador_producto_poa_actividad.estatus && user.periodo_poa == moment(new Date).year()) {
                if ((indicador_producto_poa_actividad.arrays['periodo' + v1].indexOf(indicador_producto_poa_actividad.get_month) > -1) && (user.estado == ENUM_2.poa_estatus.Activo)) {


                    if (CONFIG.seguridadindicadores !== "abierta") {
                        for (var i = v1 - 1; i >= 0; i--) {
                            if (indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i])
                                if (eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i].id}`)) {
                                    if (
                                        eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i].id}`) == "0" ||
                                        eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i].id}`) == "0.00" ||
                                        eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i].id}`) === "" ||
                                        eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i].id}`) === null) {
                                        eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[i].id}.disabled = false`);
                                    }
                                }
                        }
                    }

                    return false;
                } else {

                    return true;
                }
            } else return true;
        };

        RUN_B("indicador_producto_poa_actividad", indicador_producto_poa_actividad, $scope, $http, $compile);
        getPOAstatus(indicador_producto_poa_actividad, user.poa_id);
        if (user.poa_id) {
            indicador_producto_poa_actividad.headertitle = "Actualización de datos / " + "Indicadores Actividad" + " / " + user.periodo_pei_msj + " / " + user.periodo_poa_msj;
        } else if (user.pei_id) {
            indicador_producto_poa_actividad.headertitle = "Actualización de datos / " + "Indicadores Actividad" + " / " + user.periodo_pei_msj;
        } else {
            indicador_producto_poa_actividad.headertitle = "Actualización de datos / " + "Indicadores Actividad" + " / PEI ";
        }
        var animation = new ANIMATION();


        indicador_producto_poa_actividad.selectQueries['producto'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];

        indicador_producto_poa_actividad.selectQueries['actividad'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];


        indicador_producto_poa_actividad.selectQueries['indicador_poa'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];
        if ((ENUM_2.Grupos.director_departamental == indicador_producto_poa_actividad.group_permitir) || (ENUM_2.Grupos.analista_departamental == indicador_producto_poa_actividad.group_permitir)) {
            indicador_producto_poa_actividad.selectQueries['producto'] = [
                {
                    field: 'departamento',
                    operator: '=',
                    value: user.departamento
                },
                {
                    field: 'poa',
                    operator: '=',
                    value: user.poa_id
                }
            ];

            indicador_producto_poa_actividad.selectQueries['actividad'] = [
                {
                    field: 'departamento',
                    operator: '=',
                    value: user.departamento
                },
                {
                    field: 'poa',
                    operator: '=',
                    value: user.poa_id
                }
            ];

            indicador_producto_poa_actividad.selectQueries['indicador_poa'] = [
                {
                    field: 'departamento',
                    operator: '=',
                    value: user.departamento
                },
                {
                    field: 'poa',
                    operator: '=',
                    value: user.poa_id
                }
            ];
        }

        indicador_producto_poa_actividad.list_tipo_meta = [];

        indicador_producto_poa_actividad.list_direccion_meta = [];

        BASEAPI.list('tipoMeta', {}, function (result) {
            indicador_producto_poa_actividad.list_tipo_meta = result.data;
        });

        BASEAPI.list('direccionMeta', {}, function (result) {
            indicador_producto_poa_actividad.list_direccion_meta = result.data;
        });

        indicador_producto_poa_actividad.selectQueries['producto'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];
        indicador_producto_poa_actividad.selectQueries['indicador_poa'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];
        if ((ENUM_2.Grupos.director_departamental == indicador_producto_poa_actividad.group_permitir) || (ENUM_2.Grupos.analista_departamental == indicador_producto_poa_actividad.group_permitir)) {
            indicador_producto_poa_actividad.selectQueries['producto'] = [
                {
                    field: 'departamento',
                    operator: '=',
                    value: user.departamento
                },
                {
                    field: 'poa',
                    operator: '=',
                    value: user.poa_id
                }
            ];
            indicador_producto_poa_actividad.selectQueries['indicador_poa'] = [
                {
                    field: 'poa',
                    operator: '=',
                    value: user.poa_id
                },
                {
                    field: 'departamento',
                    operator: '=',
                    value: user.departamento
                }
            ];
        }

        indicador_producto_poa_actividad.colors = COLOR.secundary;
        indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = [];
        indicador_producto_poa_actividad.meta_alcanzada = [];
        indicador_producto_poa_actividad.meta = [];
        indicador_producto_poa_actividad.meta_total = 0;
        indicador_producto_poa_actividad.validar_tipo = function () {
            if (indicador_producto_poa_actividad.tipo_meta == 6 || indicador_producto_poa_actividad.tipo_meta == 2 || indicador_producto_poa_actividad.tipo_meta == 3) {
                return 1;
            } else return 0;
        };

        // indicador_producto_poa_actividad.format = function (n, sep, decimals) {
        //     sep = sep || "."; // Default to period as decimal separator
        //     decimals = decimals || 2; // Default to 2 decimals
        //
        //     return n.toLocaleString().split(sep)[0]
        //         + sep
        //         + n.toFixed(decimals).split(sep)[1];
        // };
        indicador_producto_poa_actividad.currencyFormat = function (num) {
            return LAN.money(num).format(true);
        };
        indicador_producto_poa_actividad.formatear = function (a) {
            var c = LAN.money(a).value;
            if (indicador_producto_poa_actividad.tipo_meta == 1) {
                return c + '%';
            } else if (indicador_producto_poa_actividad.tipo_meta == 4) {
                return LAN.money(c).format(false);
            } else if (indicador_producto_poa_actividad.tipo_meta == 5) {
                return LAN.money(c).format(true);
            } else if (indicador_producto_poa_actividad.tipo_meta == 3) {
                return c < 0 ? c : c;
            } else {
                return c;
            }
        };
        indicador_producto_poa_actividad.restar = function (a, b) {
            a = eval(`indicador_producto_poa_actividad.meta${a}`) ? eval(`indicador_producto_poa_actividad.meta${a}`) : 0;
            var c = LAN.money(a).value - LAN.money(b).value;
            if (indicador_producto_poa_actividad.tipo_meta == 1) {
                return c + '%';
            } else if (indicador_producto_poa_actividad.tipo_meta == 4) {
                return LAN.money(c).format(false);
            } else if (indicador_producto_poa_actividad.tipo_meta == 5) {
                return LAN.money(c).format(true);
            } else if (indicador_producto_poa_actividad.tipo_meta == 3) {
                return c;
            } else {
                return c;
            }

            // if (a == null || a == "") {
            //     if (indicador_producto_poa_actividad.validar_tipo()) {
            //         return 0 - parseInt(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
            //     } else {
            //         return 0 - parseFloat(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
            //     }
            // }
            // if (b == null || b == "") {
            //     if (indicador_producto_poa_actividad.validar_tipo()) {
            //         return 0 - parseInt(a.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
            //     } else {
            //         return 0 - parseFloat(a.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
            //     }
            // }
            //
            // a = a.toString().replace(/,/g, '').replace('%', '').replace('$', '');
            // b = b.toString().replace(/,/g, '').replace('%', '').replace('$', '');
            //
            //
            // if (indicador_producto_poa_actividad.tipo_meta == 6 || indicador_producto_poa_actividad.tipo_meta == 2) {
            //     a = parseInt(a);
            //     b = parseInt(b);
            //     return a - b;
            // } else {
            //     a = parseFloat(a);
            //     b = parseFloat(b);
            //     var c = a - b;
            //     if (indicador_producto_poa_actividad.tipo_meta == 1) {
            //         return c.toFixed(2) + '%';
            //     } else if (indicador_producto_poa_actividad.tipo_meta == 4) {
            //         return indicador_producto_poa_actividad.currencyFormat(c);
            //     } else if (indicador_producto_poa_actividad.tipo_meta == 5) {
            //         return  indicador_producto_poa_actividad.currencyFormat(c);
            //     } else if (indicador_producto_poa_actividad.tipo_meta == 3) {
            //         return c < 0 ? c * -1 : c;
            //     } else {
            //         return c;
            //     }
            // }
        };

        indicador_producto_poa_actividad.getTotalVariacion = function () {
            if (indicador_producto_poa_actividad.meta_alcanzada.length > 0) {
                var i = 0;
                var meta = 0;
                for (var l = 0; l < indicador_producto_poa_actividad.list_indicador_producto_poa_actividad.length; l++) {
                    meta = eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[l].id}`) ? eval(`indicador_producto_poa_actividad.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[l].id}`) : 0;

                    if (meta.toString() != "") {

                        var d = meta.toString().replace(/,/g, '').replace('%', '').replace('$', '');

                        if (indicador_producto_poa_actividad.validar_tipo()) {
                            d = parseInt(d);
                        } else {
                            d = parseFloat(d);
                        }

                        if (indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[l].periodo <= indicador_producto_poa_actividad.periodomaximo || user.periodo_poa < moment(new Date).year()) {
                            i += d;
                        }
                    }

                }
                indicador_producto_poa_actividad.meta_total_alca = i;
                indicador_producto_poa_actividad.meta_total_desc = DSON.OSO(indicador_producto_poa_actividad.meta_total);
                var result = i - indicador_producto_poa_actividad.meta_total;

                var vari = result;
                var icon = "";
                var color = "";
                if (indicador_producto_poa_actividad.direccion_meta == 1) {

                    icon = "icon-arrow-up7";
                    if ((vari || 0) == 0) {
                        color += "gray";
                    } else if (vari > 0) {
                        color += "green";
                    } else {
                        color += "red";
                    }


                } else if (indicador_producto_poa_actividad.direccion_meta == 2) {
                    icon = "icon-arrow-down7";
                    if ((vari || 0) == 0) {
                        color += "gray";
                    }
                    if (vari < 0) {
                        color += "green";
                    } else {
                        color += "red";
                    }
                } else if (indicador_producto_poa_actividad.direccion_meta == 3) {
                    icon = "icon-minus3";
                    if ((vari || 0) == 0) {
                        color += "green";
                    } else {
                        color += "red";
                    }
                }
                indicador_producto_poa_actividad.iconfinal = `${icon} text-${color}`;

                if (indicador_producto_poa_actividad.tipo_meta == 1) {
                    result = indicador_producto_poa_actividad.currencyFormat(result) + '%';
                    indicador_producto_poa_actividad.meta_total_alca = indicador_producto_poa_actividad.currencyFormat(indicador_producto_poa_actividad.meta_total_alca) + '%';
                    indicador_producto_poa_actividad.meta_total_desc = indicador_producto_poa_actividad.currencyFormat(indicador_producto_poa_actividad.meta_total_desc) + '%';
                } else if (indicador_producto_poa_actividad.tipo_meta == 4) {
                    result = indicador_producto_poa_actividad.currencyFormat(result);
                    indicador_producto_poa_actividad.meta_total_alca = indicador_producto_poa_actividad.currencyFormat(indicador_producto_poa_actividad.meta_total_alca);
                    indicador_producto_poa_actividad.meta_total_desc = indicador_producto_poa_actividad.currencyFormat(indicador_producto_poa_actividad.meta_total_desc);
                } else if (indicador_producto_poa_actividad.tipo_meta == 5) {
                    result = indicador_producto_poa_actividad.currencyFormat(result);
                    indicador_producto_poa_actividad.meta_total_alca = '$' + indicador_producto_poa_actividad.currencyFormat(indicador_producto_poa_actividad.meta_total_alca);
                    indicador_producto_poa_actividad.meta_total_desc = '$' + indicador_producto_poa_actividad.currencyFormat(indicador_producto_poa_actividad.meta_total_desc);
                } else if (indicador_producto_poa_actividad.tipo_meta == 3) {
                    result = result < 0 ? result : result;
                }


                return result;

            } else
                return 0;
        };

        indicador_producto_poa_actividad.permission = function (indicador, periodo) {
            var exist = indicador_producto_poa_actividad.permissions.filter(d => d.indicador == indicador && d.periodo == periodo);
            if (exist.length === 0) {
                return {
                    allow: 0,
                    debug: "Este año del PEI aún no contiene POA"
                };
            } else {
                return exist[0];
            }
        };

        indicador_producto_poa_actividad.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
            send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_actividad_periodo', periodo, callback);
        };
        indicador_producto_poa_actividad.notificar = function (peri) {
            SWEETALERT.confirm({
                message: `Está seguro que desea notificar al área de Planificación?`,
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                    indicador_producto_poa_actividad.send_email_indicador(false, 'indicador poa', 'indicador_poa', indicador_producto_poa_actividad.indicador_poa
                        , indicador_producto_poa_actividad.indicador_poa_object.Nombre, indicador_producto_poa_actividad.indicador_poa_object.departamento
                        , "#indicador_producto_poa_actividad", peri, async function () {

                        });
                    indicador_producto_poa_actividad.refreshAngular();
                    SWEETALERT.stop();
                }
            });
        };

        indicador_producto_poa_actividad.applyMasksy = function (key, ids) {
            var names = "indicador_producto_poa_actividad_meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id;
            indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow = indicador_producto_poa_actividad.permission(indicador_producto_poa_actividad.indicador_poa, indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].periodo);
            indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].message = indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow.debug;
            disabled = indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow.allow === 1 ? false : true;

            if (indicador_producto_poa_actividad.queries.id) disabled = true;

            if (!disabled) {
                $(`[name=${names}]`).focus();
            }
            ids.push(indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id);
            $(`[name=${names}]`).addClass("meta_alcanzada");

            if (CONFIG.seguridadindicadores !== "abierta")
                eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id}.disabled = disabled`);
            else {
                indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow.allow = 1;
                indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].message = "";
                eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id}.disabled = false`);
            }

            if (indicador_producto_poa_actividad.queries.id) {
                indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow.allow = 0;
                indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].message = "No puede modificar este registro";
                eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id}.disabled = true`);
            }

            if (indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow.sinllegar == 0)
                if (indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].valor_alcanzado === "" || indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].valor_alcanzado === undefined || indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].valor_alcanzado === null) {
                    indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].allow.allow = 1;
                    indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].message = "";
                    eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id}.disabled = false`);
                }

            if (indicador_producto_poa_actividad.queries.id) {
                eval(`indicador_producto_poa_actividad.form.options.meta${indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id}.disabled = true`);
            }
        };
        indicador_producto_poa_actividad.applyMasks = async function () {
            indicador_producto_poa_actividad.permissions = await BASEAPI.listp('vw_permission_actividad', {
                limit: 0,
                orderby: "$ compania",
                order: "asc",
                where: [{
                    field: "compania",
                    value: user.compania_id
                }]
            });
            indicador_producto_poa_actividad.permissions = indicador_producto_poa_actividad.permissions.data;
            var names = '';
            var disabled = false;
            var ids = [];
            indicador_producto_poa_actividad.filesme = [];
            indicador_producto_poa_actividad.permissionOf = [];
            switch (indicador_producto_poa_actividad.tipo_meta) {
                case 1: {
                    //percentage
                    for (var key in indicador_producto_poa_actividad.list_indicador_producto_poa_actividad) {
                        await indicador_producto_poa_actividad.control.percentage(".subcontainer" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, "meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, {maxlength: 3}, false, '', " ", false);
                        indicador_producto_poa_actividad.applyMasksy(key, ids);
                    }
                    break;
                }
                case 2: {
                    //Indice
                    for (var key in indicador_producto_poa_actividad.list_indicador_producto_poa_actividad) {
                        await indicador_producto_poa_actividad.control.indice(".subcontainer" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, "meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, {
                            maxlength: 1,
                        }, false, '', " ", false);
                        indicador_producto_poa_actividad.applyMasksy(key, ids);
                    }
                    break;
                }
                case 3: {
                    //valor_absoluto
                    for (var key in indicador_producto_poa_actividad.list_indicador_producto_poa_actividad) {
                        await indicador_producto_poa_actividad.control.valor_absoluto(".subcontainer" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, "meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, {maxlength: 11}, false, '', " ", false);
                        indicador_producto_poa_actividad.applyMasksy(key, ids);
                    }
                    break;
                }
                case 4: {
                    //decimal
                    for (var key in indicador_producto_poa_actividad.list_indicador_producto_poa_actividad) {
                        await indicador_producto_poa_actividad.control.decimal(".subcontainer" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, "meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, {maxlength: 22}, false, '', " ", false);
                        indicador_producto_poa_actividad.applyMasksy(key, ids);
                    }
                    break;
                }
                case 5: {
                    ////Dinero
                    for (var key in indicador_producto_poa_actividad.list_indicador_producto_poa_actividad) {
                        await indicador_producto_poa_actividad.control.money(".subcontainer" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, "meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, {maxlength: 22}, false, '', " ", false);
                        indicador_producto_poa_actividad.applyMasksy(key, ids);
                    }
                    break;
                }
                case 6: {
                    //integer
                    for (var key in indicador_producto_poa_actividad.list_indicador_producto_poa_actividad) {
                        await indicador_producto_poa_actividad.control.integer(".subcontainer" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, "meta" + indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].id, {maxlength: 11}, false, '', ' ', false);
                        indicador_producto_poa_actividad.applyMasksy(key, ids);
                    }
                    break;
                }

                default: {
                }

            }
            indicador_producto_poa_actividad.idssss = ids;
            for (var j = 1; j <= 5; j++)
                setTimeout(function () {
                    for (var i = 0; i < indicador_producto_poa_actividad.idssss.length; i++) {
                        eval(`
                            if (typeof ShowCountIndicadorPOA${indicador_producto_poa_actividad.idssss[i]} !== 'undefined')
                                ShowCountIndicadorPOA${indicador_producto_poa_actividad.idssss[i]}(true);
                        `);
                    }
                    MESSAGE.run();
                    $(".filedragon span").each(function () {
                        let title = $(this).parent().attr('title');
                        let count = $(this).parent().attr('count');
                        if (title.split(')').length > 1) {
                            let component = title.split(')');
                            title = component[1] + (count ? `(${count})` : '');
                        }
                        console.log($(this).html(title));
                    });
                }, 1000 * j);


            $('.modificarActividad').on('click', function () {
                if ($(this).hasClass('permitido') && indicador_producto_poa_actividad.condicion_poa == 1) {
                    indicador_producto_poa_actividad.setPermission('file.upload', true);
                    indicador_producto_poa_actividad.setPermission('file.download', true);
                    indicador_producto_poa_actividad.setPermission('file.remove', true);
                } else {
                    if (!indicador_producto_poa_actividad.asbierto) {
                        indicador_producto_poa_actividad.setPermission('file.upload', false);
                        indicador_producto_poa_actividad.setPermission('file.download', false);
                        if (indicador_producto_poa_actividad.group_permitir !== ENUM_2.Grupos.director_general) {
                            indicador_producto_poa_actividad.setPermission("file.remove", false);
                        } else {
                            indicador_producto_poa_actividad.setPermission("file.remove", true);
                        }
                    }
                }
            });

            $(".changeTextArea2").each(function () {
                if ($(this).val().length >= 85) {
                    $(`.${$(this).attr('name')}`).show();
                } else {
                    $(`.${$(this).attr('name')}`).hide();
                }
            });

            $('.changeTextArea2').on('keyup keydown oncut', function () {
                if ($(this).val().length >= 85) {
                    $(`.${$(this).attr('name')}`).show();
                } else
                    $(`.${$(this).attr('name')}`).hide();
            });
            MESSAGE.run();
            $(".filedragon span").each(function () {
                let title = $(this).parent().attr('title');
                let count = $(this).parent().attr('count');
                if (title.split(')').length > 1) {
                    let component = title.split(')');
                    title = component[1] + (count ? `(${count})` : '');
                }
                console.log($(this).html(title));
            });
        }
        ;
        indicador_producto_poa_actividad.$scope.$watch('indicador_producto_poa_actividad.comentario', function (value) {
            var rules = [];
            rules.push(VALIDATION.yariel.maliciousCode(value));
            VALIDATION.validate(indicador_producto_poa_actividad, "comentario", rules);
        });
        indicador_producto_poa_actividad.$scope.$watch('indicador_producto_poa_actividad.producto', function (value) {
            indicador_producto_poa_actividad.descripcion = null;
            indicador_producto_poa_actividad.fuente = null;
            indicador_producto_poa_actividad.medio_verificacion = null;
            indicador_producto_poa_actividad.tipo_meta_nombre = null;
            indicador_producto_poa_actividad.direccion_meta_nombre = null;
            indicador_producto_poa_actividad.linea_base = null;
            indicador_producto_poa_actividad.ano_linea_base = null;
            indicador_producto_poa_actividad.metodo_calculo = null;
            indicador_producto_poa_actividad.indicador_poa_r = null;


            autosize.destroy($('#descripcion'));
            autosize.destroy($('#fuente'));
            autosize.destroy($('#medio_verificacion'));
            autosize.destroy($('#metodo'));
            setTimeout(function () {
                autosize($('#descripcion'));
                autosize($('#fuente'));
                autosize($('#medio_verificacion'));
                autosize($('#metodo_calculo'));
            }, 100);

            if (indicador_producto_poa_actividad.form.selected('producto') !== null) {
                indicador_producto_poa_actividad.actividad = "[NULL]";
                indicador_producto_poa_actividad.form.loadDropDown('actividad');
                indicador_producto_poa_actividad.form.producto_id = indicador_producto_poa_actividad.form.selected('producto').id;
                indicador_producto_poa_actividad.departamento_nombre = indicador_producto_poa_actividad.form.selected('producto').departamento_name;
                indicador_producto_poa_actividad.ver_estado = indicador_producto_poa_actividad.form.selected('producto').estatus;
            } else {
                indicador_producto_poa_actividad.departamento_nombre = null;
                indicador_producto_poa_actividad.range_date = null;
            }

            if (indicador_producto_poa_actividad.form.selected('actividad') !== null) {
                indicador_producto_poa_actividad.producto = "[NULL]";
                indicador_producto_poa_actividad.form.loadDropDown('producto');
                indicador_producto_poa_actividad.form.producto_id = indicador_producto_poa_actividad.form.selected('actividad').producto;
                indicador_producto_poa_actividad.departamento_nombre = indicador_producto_poa_actividad.form.selected('actividad').departamento_nombre_2;
                indicador_producto_poa_actividad.ver_estado = indicador_producto_poa_actividad.form.selected('actividad').estatus;
            }

        });

        indicador_producto_poa_actividad.$scope.$watch('indicador_producto_poa_actividad.actividad', function (value) {


            indicador_producto_poa_actividad.descripcion = null;
            indicador_producto_poa_actividad.fuente = null;
            indicador_producto_poa_actividad.medio_verificacion = null;
            indicador_producto_poa_actividad.tipo_meta_nombre = null;
            indicador_producto_poa_actividad.direccion_meta_nombre = null;
            indicador_producto_poa_actividad.linea_base = null;
            indicador_producto_poa_actividad.ano_linea_base = null;
            indicador_producto_poa_actividad.metodo_calculo = null;
            indicador_producto_poa_actividad.indicador_poa_r = null;


            autosize.destroy($('#descripcion'));
            autosize.destroy($('#fuente'));
            autosize.destroy($('#medio_verificacion'));
            autosize.destroy($('#metodo'));
            setTimeout(function () {
                autosize($('#descripcion'));
                autosize($('#fuente'));
                autosize($('#medio_verificacion'));
                autosize($('#metodo_calculo'));
            }, 100);

            if (indicador_producto_poa_actividad.form.selected('actividad') !== null) {
                indicador_producto_poa_actividad.producto = "[NULL]";
                indicador_producto_poa_actividad.form.loadDropDown('producto');
                indicador_producto_poa_actividad.form.producto_id = indicador_producto_poa_actividad.form.selected('actividad').producto;
                indicador_producto_poa_actividad.departamento_nombre = indicador_producto_poa_actividad.form.selected('actividad').departamento_nombre_2;
                indicador_producto_poa_actividad.ver_estado = indicador_producto_poa_actividad.form.selected('actividad').estatus;
            } else {
                indicador_producto_poa_actividad.departamento_nombre = null;
                indicador_producto_poa_actividad.range_date = null;
            }


            if (indicador_producto_poa_actividad.form.selected('producto') !== null) {
                indicador_producto_poa_actividad.actividad = "[NULL]";
                indicador_producto_poa_actividad.form.loadDropDown('actividad');
                indicador_producto_poa_actividad.form.producto_id = indicador_producto_poa_actividad.form.selected('producto').id;
                indicador_producto_poa_actividad.departamento_nombre = indicador_producto_poa_actividad.form.selected('producto').departamento_nombre;
                indicador_producto_poa_actividad.ver_estado = indicador_producto_poa_actividad.form.selected('producto').estatus;
            }

        });

        indicador_producto_poa_actividad.refreshComments = function () {
            if (!indicador_producto_poa_actividad.indicador_poa)
                return;
            BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_actividad', {
                limit: 0,
                page: 1,
                orderby: "periodo",
                order: "asc",
                where: [{
                    field: "indicador_poa",
                    value: indicador_producto_poa_actividad.indicador_poa
                }]
            }).then(function (result) {

                for (var data of result.data) {
                    indicador_producto_poa_actividad.list_indicador_producto_poa_actividad.map(d => {
                        if (d.id == data.id) {
                            d.count_comment = data.count_comment;
                            d.comment = data.comment;
                        }
                    });
                }
                indicador_producto_poa_actividad.refreshAngular();
            });
        };
        indicador_producto_poa_actividad.$scope.$watch('indicador_producto_poa_actividad.indicador_poa', function (value) {
            if (value != '$NULL' || value != '') {
                indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = [];
                indicador_producto_poa_actividad.meta_alcanzada = [];
                indicador_producto_poa_actividad.meta = [];
                indicador_producto_poa_actividad.meta_total = 0;
                BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_actividad', {
                    limit: 0,
                    page: 1,
                    orderby: "periodo",
                    order: "asc",
                    where: [{
                        field: "indicador_poa",
                        value: value === "[NULL]" ? 0 : value
                    }]
                }).then(async function (result) {
                    indicador_producto_poa_actividad.cumplidor = await aacontroldemandofalso.cumplimiento(
                        "vw_report_indicadores_actividad",
                        baseController.session,
                        "indicador_actividad",
                        value);

                    indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = result.data;

                    indicador_producto_poa_actividad.periodomaximo = Math.ceil((new Date().getMonth() + 1) / (12 / indicador_producto_poa_actividad.list_indicador_producto_poa_actividad.length));
                    for (var key in result.data) {

                        eval(`indicador_producto_poa_actividad.meta${result.data[key].id} = result.data[key].valor_alcanzado`);

                        indicador_producto_poa_actividad.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                        if (indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[key].periodo <= indicador_producto_poa_actividad.periodomaximo || user.periodo_poa < moment(new Date).year()) {
                            if (indicador_producto_poa_actividad.validar_tipo()) {
                                indicador_producto_poa_actividad.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                            } else {
                                indicador_producto_poa_actividad.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                            }
                        }
                    }

                    if (indicador_producto_poa_actividad.indicador_poa_object != null) {

                        if (indicador_producto_poa_actividad.form.selected('indicador_poa') !== null) {

                            indicador_producto_poa_actividad.descripcion = indicador_producto_poa_actividad.form.selected('indicador_poa').descripcion_indicador;
                            indicador_producto_poa_actividad.fuente = indicador_producto_poa_actividad.form.selected('indicador_poa').fuente;
                            indicador_producto_poa_actividad.medio_verificacion = indicador_producto_poa_actividad.form.selected('indicador_poa').medio_verificacion;
                            indicador_producto_poa_actividad.linea_base = indicador_producto_poa_actividad.form.selected('indicador_poa').linea;
                            indicador_producto_poa_actividad.ano_linea_base = indicador_producto_poa_actividad.form.selected('indicador_poa').ano_linea_base;
                            indicador_producto_poa_actividad.metodo_calculo = indicador_producto_poa_actividad.form.selected('indicador_poa').metodo;
                            indicador_producto_poa_actividad.ver_estado = indicador_producto_poa_actividad.form.selected('indicador_poa').estatus;
                            indicador_producto_poa_actividad.periodicidad =
                                aacontroldemandofalso.periodicidadBy(indicador_producto_poa_actividad.poa.data[0].monitoreo).nombre;
                            indicador_producto_poa_actividad.indicador_poa_r = indicador_producto_poa_actividad.form.selected('indicador_poa').indicador_poa_r;

                            if (indicador_producto_poa_actividad.list_tipo_meta.length > 0) {
                                var selected1 = indicador_producto_poa_actividad.list_tipo_meta.filter(information => {
                                    if (information.id == indicador_producto_poa_actividad.form.selected('indicador_poa').tipo_meta) {
                                        return true;
                                    }
                                });


                                indicador_producto_poa_actividad.tipo_meta = selected1[0].id;
                                indicador_producto_poa_actividad.tipo_meta_nombre = selected1[0].nombre;
                            }

                            if (indicador_producto_poa_actividad.list_direccion_meta.length > 0) {
                                var selected2 = indicador_producto_poa_actividad.list_direccion_meta.filter(information => {
                                    if (information.id == indicador_producto_poa_actividad.form.selected('indicador_poa').direccion_meta) {
                                        return true;
                                    }
                                });


                                indicador_producto_poa_actividad.direccion_meta = selected2[0].id;
                                indicador_producto_poa_actividad.direccion_meta_nombre = selected2[0].nombre;
                            }
                            autosize.destroy($('#descripcion'));
                            autosize.destroy($('#fuente'));
                            autosize.destroy($('#medio_verificacion'));
                            autosize.destroy($('#metodo_calculo'));
                            setTimeout(function () {
                                autosize($('#descripcion'));
                                autosize($('#fuente'));
                                autosize($('#medio_verificacion'));
                                autosize($('#metodo_calculo'));
                            }, 100);
                        }
                    }

                    indicador_producto_poa_actividad.refreshAngular();
                    setTimeout(() => {
                        if (value) {
                            indicador_producto_poa_actividad.applyMasks();
                        }
                    }, 600);

                });
            }
        });

        indicador_producto_poa_actividad.save_pei_ano = function (indicado, limpi) {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for (var item of buttons) {
                item.disabled = true;
            }
            var updates = false;
            $('.meta_alcanzada').each(function () {
                var id = $(this).attr('name').replace("indicador_producto_poa_actividad_meta", "");
                if (indicado) {
                    if (id == indicado) {
                        if (limpi) {
                            $(this).val("");
                        }
                    }
                }
            });

            if (limpi) {
                return;
            }
            SWEETALERT.confirm({
                message: 'Desea guardar los cambios realizados ?',
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    var titulo_push = MESSAGE.ieval('planificacion.actializar_indicador_actividad_email_titulo_meta_no_cumplida', {field1: indicador_producto_poa_actividad.indicador_poa_object.Nombre});
                    var cuerpo_push = "EL resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                    var titulo_email = MESSAGE.ieval('planificacion.actializar_indicador_actividad_email_titulo_meta_no_cumplida', {field1: indicador_producto_poa_actividad.indicador_poa_object.Nombre});
                    var cuerpo_email = "EL resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                    var correo = indicador_producto_poa_actividad.form.selected('indicador_poa').correo;
                    switch (indicador_producto_poa_actividad.direccion_meta) {
                        case 1: {
                            if (LAN.money(indicador_producto_poa_actividad.meta_total).value > LAN.money(indicador_producto_poa_actividad.meta_total_alca).value) {

                                function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_producto_poa_actividad.indicador_poa_object.departamento, {
                                    direccion_meta: indicador_producto_poa_actividad.direccion_meta_nombre,
                                    meta_proyectada_total: indicador_producto_poa_actividad.meta_total_desc,
                                    meta_alcanzada_total: indicador_producto_poa_actividad.meta_total_alca
                                }, null, user.institucion_id)
                            }
                            break;
                        }
                        case 2: {
                            if (LAN.money(indicador_producto_poa_actividad.meta_total).value < LAN.money(indicador_producto_poa_actividad.meta_total_alca).value) {

                                function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_producto_poa_actividad.indicador_poa_object.departamento, {
                                    direccion_meta: indicador_producto_poa_actividad.direccion_meta_nombre,
                                    meta_proyectada_total: indicador_producto_poa_actividad.meta_total_desc,
                                    meta_alcanzada_total: indicador_producto_poa_actividad.meta_total_alca
                                }, null, user.institucion_id)
                            }
                            break;
                        }
                        case 3: {
                            if (LAN.money(indicador_producto_poa_actividad.meta_total).value != LAN.money(indicador_producto_poa_actividad.meta_total_alca).value) {

                                function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_producto_poa_actividad.indicador_poa_object.departamento, {
                                    direccion_meta: indicador_producto_poa_actividad.direccion_meta_nombre,
                                    meta_proyectada_total: indicador_producto_poa_actividad.meta_total_desc,
                                    meta_alcanzada_total: indicador_producto_poa_actividad.meta_total_alca
                                }, null, user.institucion_id)
                            }
                            break;
                        }
                        default: {
                        }
                    }
                    if (indicador_producto_poa_actividad.meta_alcanzada.length > 0) {
                        var cc = 0;
                        var alcanzados = [];
                        var permitidos = [];
                        $('.meta_alcanzada').each(function () {
                            var id = $(this).attr('name').replace("indicador_producto_poa_actividad_meta", "");
                            var valor = $(this).val();
                            valor = valor.replace('$', '');
                            if (indicado) {
                                if (id == indicado) {
                                    permitidos.push(id);
                                }
                            } else {
                                permitidos.push(id);
                            }
                            alcanzados.push({id: id, valor: valor});
                        });
                        for (var i in alcanzados) {
                            var id = alcanzados[i].id;
                            var valor = alcanzados[i].valor;
                            try {
                                valor = valor.trim();
                            } catch (e) {

                            }
                            // if (valor === "" || valor === " " || valor === null || valor === undefined) {
                            //     continue;
                            // }
                            updates = !indicador_producto_poa_actividad.permissionOf[indicador_producto_poa_actividad.list_indicador_producto_poa_actividad[cc].periodo - 1];

                            if (permitidos.indexOf(id) !== -1) {
                                if (updates || CONFIG.seguridadindicadores === "abierta") {
                                    await BASEAPI.updateallp('indicador_actividad_periodo', {
                                        "valor_alcanzado": valor === '' || valor === null || valor === undefined ? '' : valor.toString(),
                                        // "comentario": comment,
                                        "updated_at": new date().now(),
                                        'updated_by': indicador_producto_poa_actividad.usuario_id,
                                        where: [{
                                            "field": "id",
                                            "value": id
                                        }]
                                    });
                                    await HISTORY.save('indicador_producto_poa_actividad', {
                                        cambio: valor.toString(),
                                        id: id
                                    });
                                    await AUDIT.LOGCUSTOM("Trabajar Indicador Actividad", 'vw_indicador_poa_actividad',
                                        {
                                            indicador: id,
                                            producto: indicador_producto_poa_actividad.form.producto_id,
                                            valor_alcanzado: valor.toString(),
                                            actualizado_en: new date().now(),
                                            actualizado_por: indicador_producto_poa_actividad.usuario_id
                                        });
                                }
                            }
                            cc++;
                        }

                        SERVICE.planificacion_getData.sp_actualizacion({}, function (data) {
                            SWEETALERT.stop();
                            SWEETALERT.show({message: `Registro Guardado Satisfactoriamente`});
                            if (!indicado)
                                location.href = location.href + '?a=' + new Date().getTime();
                        });
                    }
                    if (!indicado) {
                        indicador_producto_poa_actividad.descripcion =
                            indicador_producto_poa_actividad.fuente =
                                indicador_producto_poa_actividad.medio_verificacion =
                                    indicador_producto_poa_actividad.linea_base =
                                        indicador_producto_poa_actividad.ano_linea_base =
                                            indicador_producto_poa_actividad.metodo_calculo =
                                                indicador_producto_poa_actividad.ver_estado =
                                                    indicador_producto_poa_actividad.indicador_poa_r =
                                                        indicador_producto_poa_actividad.tipo_meta =
                                                            indicador_producto_poa_actividad.tipo_meta_nombre =
                                                                indicador_producto_poa_actividad.direccion_meta =
                                                                    indicador_producto_poa_actividad.direccion_meta_nombre = "";

                        indicador_producto_poa_actividad.producto = "[NULL]";
                        indicador_producto_poa_actividad.form.loadDropDown('producto');

                        indicador_producto_poa_actividad.indicador_poa = "[NULL]";
                        indicador_producto_poa_actividad.form.loadDropDown('indicador_poa');
                    }
                    var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                }
            });
        };
        indicador_producto_poa_actividad.cancel_pei_ano = function () {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for (var item of buttons) {
                item.disabled = true;
            }
            SWEETALERT.confirm({
                message: 'Desea cancelar los cambios realizados ?',
                confirm: function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = [];
                    indicador_producto_poa_actividad.meta_alcanzada = [];
                    animation.loading(`#tb-custom2`, "", ``, '30');
                    BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_actividad', {
                        limit: 0,
                        page: 1,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_poa",
                            value: indicador_producto_poa_actividad.indicador_poa
                        }]
                    }).then(function (result) {

                        indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = result.data;
                        for (var key in result.data) {
                            eval(`indicador_producto_poa_actividad.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                            indicador_producto_poa_actividad.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                            if (indicador_producto_poa_actividad.validar_tipo()) {
                                indicador_producto_poa_actividad.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                            } else {
                                indicador_producto_poa_actividad.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                            }
                        }

                        indicador_producto_poa_actividad.descripcion =
                            indicador_producto_poa_actividad.fuente =
                                indicador_producto_poa_actividad.medio_verificacion =
                                    indicador_producto_poa_actividad.linea_base =
                                        indicador_producto_poa_actividad.ano_linea_base =
                                            indicador_producto_poa_actividad.metodo_calculo =
                                                indicador_producto_poa_actividad.ver_estado =
                                                    indicador_producto_poa_actividad.indicador_poa_r =
                                                        indicador_producto_poa_actividad.tipo_meta =
                                                            indicador_producto_poa_actividad.tipo_meta_nombre =
                                                                indicador_producto_poa_actividad.direccion_meta =
                                                                    indicador_producto_poa_actividad.direccion_meta_nombre = "";

                        indicador_producto_poa_actividad.producto = "[NULL]";
                        indicador_producto_poa_actividad.form.loadDropDown('producto');

                        indicador_producto_poa_actividad.indicador_poa = "[NULL]";
                        indicador_producto_poa_actividad.form.loadDropDown('indicador_poa');
                        indicador_producto_poa_actividad.applyMasks();
                        indicador_producto_poa_actividad.refreshAngular();
                        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        animation.stoploading(`#tb-custom2`);
                        SWEETALERT.stop();

                    });
                }
            });
        };


        indicador_producto_poa_actividad.add_comentario = (data) => new Promise((resolve, reject) => {
            if (indicador_producto_poa_actividad.comentario == "") {
                SWEETALERT.show({message: `Debe agregar un comentario.`});
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            } else {
                BASEAPI.insertp('comentarios',
                    {
                        "comentario": indicador_producto_poa_actividad.comentario,
                        "type": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_actividad,
                        "created_by": user.usuario_id,
                        "value": indicador_producto_poa_actividad.ids,
                        "value2": indicador_producto_poa_actividad.indicador_poa
                    }).then(function (rs) {
                    vw_comentarios.refresh();
                    indicador_producto_poa_actividad.comentario = "";
                    indicador_producto_poa_actividad.refreshAngular();

                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    // indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = [];
                    // indicador_producto_poa_actividad.meta_alcanzada = [];
                    animation.loading(`#tb-custom2`, "", ``, '30');
                    BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_actividad', {
                        limit: 0,
                        page: 1,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_poa",
                            value: indicador_producto_poa_actividad.indicador_poa
                        }]
                    }).then(function (result) {

                        // indicador_producto_poa_actividad.list_indicador_producto_poa_actividad = result.data;
                        // for (var key in result.data) {
                        //     eval(`indicador_producto_poa_actividad.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                        //     indicador_producto_poa_actividad.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;
                        //
                        //     if (indicador_producto_poa_actividad.validar_tipo()) {
                        //         indicador_producto_poa_actividad.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        //
                        //     } else {
                        //         indicador_producto_poa_actividad.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        //     }
                        // }
                        //indicador_producto_poa_actividad.applyMasks();
                        indicador_producto_poa_actividad.refreshAngular();
                        animation.stoploading(`#tb-custom2`);
                        SWEETALERT.stop();
                        SWEETALERT.show({
                            message: "Ha sido guardado su comentario",
                            confirm: function () {
                                MODAL.closeAll();
                            }
                        });
                        //MODAL.close(indicador_producto_poa_actividad);
                        indicador_producto_poa_actividad.refreshComments();
                        resolve(true);

                    });
                });
            }
            resolve(true);
        });
        indicador_producto_poa_actividad.openmodalField = function (edit, id, value2) {
            // indicador_producto_poa_actividad.commentName = 'metacomment' + name;
            // indicador_producto_poa_actividad.commentValue = $(`[name=${indicador_producto_poa_actividad.commentName}]`).val();
            indicador_producto_poa_actividad.edit = edit;
            indicador_producto_poa_actividad.ids = id;
            indicador_producto_poa_actividad.value2 = value2;
            indicador_producto_poa_actividad.comentario = "";
            indicador_producto_poa_actividad.modal.modalView("indicador_producto_poa_actividad/addcomment", {
                width: 'modal-full',
                header: {
                    title: indicador_producto_poa_actividad.edit ? `Agregar comentario` : `Ver comentario`,
                    icon: "ICON.classes.file_excel"
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading')
                },
                event: {
                    // show: {
                    //     end: function (data) {
                    //         if(indicador_producto_poa_actividad.edit){
                    //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                    //                 '                <i class="position-right"></i>\n' +
                    //                 '                </span>\n' +
                    //                 '            <button\n' +
                    //                 '                   id="btnC"  onclick="MODAL.close(indicador_producto_poa_actividad)"  dragonlanguage="" title="MESSAGE.ic(\'mono.cancel\')"\n' +
                    //                 '                    type="button" class="btn bg-warning btn-labeled btn-xs pull-right"\n' +
                    //                 '                    >\n' +
                    //                 '                <b><i class="icon-cross2"></i></b>\n' +
                    //                 '                <language>MESSAGE.ic(\'mono.cancel\')</language>\n' +
                    //                 '            </button>');
                    //
                    //             $('.modal-content .modal-footer').append('<button\n' +
                    //                 '                 id="btnS"   dragonlanguage="" title="MESSAGE.ic(\'mono.save\')"\n' +
                    //                 '                    type="button" role="button" class=" btn bg-success-800 btn-labeled btn-xs pull-right"\n' +
                    //                 '                   >\n' +
                    //                 '                <b><i class="icon-floppy-disk"></i></b>\n' +
                    //                 '                <language>MESSAGE.ic(\'mono.save\')</language>\n' +
                    //                 '            </button>');
                    //         }else{
                    //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                    //                 '                <i class="position-right"></i>\n' +
                    //                 '                </span>\n' +
                    //                 '            <button\n' +
                    //                 '                   id="btnC"  onclick="MODAL.close(indicador_producto_poa_actividad)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
                    //                 '                    type="button" class="btn bg-secundary btn-labeled btn-xs pull-right"\n' +
                    //                 '                    >\n' +
                    //                 '                <b><i class="icon-cross2"></i></b>\n' +
                    //                 '                <language>MESSAGE.ic(\'mono.close\')</language>\n' +
                    //                 '            </button>');
                    //         }
                    //     }
                    // },
                    hide: {
                        // begin: function (data) {
                        //     if($(`[name=${indicador_producto_poa_actividad.commentName}]`).val().length >= 85){
                        //         $(`.${indicador_producto_poa_actividad.commentName}`).show();
                        //     }else{
                        //         $(`.${indicador_producto_poa_actividad.commentName}`).hide();
                        //     }
                        // },
                        end: function (data) {
                            indicador_producto_poa_actividad.ids = 0;
                        }
                    }
                },
            });
        }
    }
);
