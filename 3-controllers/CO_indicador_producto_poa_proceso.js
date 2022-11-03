app.controller("indicador_producto_poa_proceso", function ($scope, $http, $compile) {
        indicador_producto_poa_proceso = this;
        indicador_producto_poa_proceso.destroyForm = false;
        indicador_producto_poa_proceso.textModal = '';
        indicador_producto_poa_proceso.asbierto = CONFIG.seguridadindicadores === "abierta";
        var user = new SESSION().current();
        indicador_producto_poa_proceso.usuario_id = user.usuario_id;
        indicador_producto_poa_proceso.conditionPoa = {estado: user.estado, poa_id: user.poa_id};
        indicador_producto_poa_proceso.estatus = ENUM_2.presupuesto_estatus.Completo;
        indicador_producto_poa_proceso.estado = ENUM_2.poa_estatus.Inactivo;
        indicador_producto_poa_proceso.group_permitir = user.groups[0] ? user.groups[0].caracteristica : "";
        indicador_producto_poa_proceso.session = user;
        RUNCONTROLLER("indicador_producto_poa_proceso", indicador_producto_poa_proceso, $scope, $http, $compile);
        indicador_producto_poa_proceso.multiplo = 0;
        indicador_producto_poa_proceso.arrays = [];
        var r = 0;
        indicador_producto_poa_proceso.get_month = moment(new Date).month() + 1;
        indicador_producto_poa_proceso.get_month = moment(new Date).month() + 1;
        indicador_producto_poa_proceso.get_year = moment(new Date).month() + 1;

        var http = new HTTP();
        indicador_producto_poa_proceso.queries = http.hrefToObj();

        if (indicador_producto_poa_proceso.queries.id) {
            indicador_producto_poa_proceso.indicador_poa = indicador_producto_poa_proceso.queries.id;
        }
        if (typeof vw_dashboard_productosgrid_proceso !== "undefined")
            if (location.href.indexOf('indicador_producto_poa_proceso') === -1)
                if (vw_dashboard_productosgrid_proceso.selectedPEI) {
                    indicador_producto_poa_proceso.queries.id = vw_dashboard_productosgrid_proceso.selectedPEI;
                    indicador_producto_poa_proceso.indicador_poa = vw_dashboard_productosgrid_proceso.selectedPEI;
                    indicador_producto_poa_proceso.forUseData = vw_dashboard_productosgrid_proceso.forUseData;
                }

        for (var i = 1; user.cantidad; i++) {
            r = i * user.cantidad;
            if (r == 12) {
                indicador_producto_poa_proceso.multiplo = i;
                break;
            }
        }
        var c = 0;
        var d = 0;
        for (var i = 1; i <= user.cantidad; i++) {
            indicador_producto_poa_proceso.arrays['periodo' + i] = [];
            for (var l = 1 + c; l <= indicador_producto_poa_proceso.multiplo + c; l++) {
                indicador_producto_poa_proceso.arrays['periodo' + i].push(l);
                d++;
            }
            c = d;
        }

        indicador_producto_poa_proceso.filesme = [];
        indicador_producto_poa_proceso.validate_permissions = function (v1, desde) {


            if (user.periodo_poa < moment(new Date).year()) {
                if (indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1])
                    if (eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1].id}`))
                        if (
                            eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1].id}`) == "0" ||
                            eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1].id}`) == "0.00" ||
                            eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1].id}`) === "" ||
                            eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1].id}`) === null) {
                            eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[v1 - 1].id}.disabled = false`);
                            return false;
                        }
            }


            if (indicador_producto_poa_proceso.ver_estado == indicador_producto_poa_proceso.estatus && user.periodo_poa == moment(new Date).year()) {
                if ((indicador_producto_poa_proceso.arrays['periodo' + v1].indexOf(indicador_producto_poa_proceso.get_month) > -1) && (user.estado == ENUM_2.poa_estatus.Activo)) {


                    if (CONFIG.seguridadindicadores !== "abierta") {
                        for (var i = v1 - 1; i >= 0; i--) {
                            if (indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i])
                                if (eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i].id}`)) {
                                    if (
                                        eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i].id}`) == "0" ||
                                        eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i].id}`) == "0.00" ||
                                        eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i].id}`) === "" ||
                                        eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i].id}`) === null) {
                                        eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[i].id}.disabled = false`);
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

        RUN_B("indicador_producto_poa_proceso", indicador_producto_poa_proceso, $scope, $http, $compile);
        getPOAstatus(indicador_producto_poa_proceso, user.poa_id);
        indicador_producto_poa_proceso.headertitle = "Evaluación y carga de evidencia";
        var animation = new ANIMATION();


        indicador_producto_poa_proceso.selectQueries['producto'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];

        indicador_producto_poa_proceso.selectQueries['actividad'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];


        indicador_producto_poa_proceso.selectQueries['indicador_poa'] = [
            {
                field: 'compania',
                operator: '=',
                value: user.compania_id
            }
        ];
        if ((ENUM_2.Grupos.director_departamental == indicador_producto_poa_proceso.group_permitir) || (ENUM_2.Grupos.analista_departamental == indicador_producto_poa_proceso.group_permitir)) {
            indicador_producto_poa_proceso.selectQueries['producto'] = [
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

            indicador_producto_poa_proceso.selectQueries['actividad'] = [
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

            indicador_producto_poa_proceso.selectQueries['indicador_poa'] = [
                {
                    field: 'compania',
                    operator: '=',
                    value: user.compania_id
                }
            ];
        }

        indicador_producto_poa_proceso.list_tipo_meta = [];

        indicador_producto_poa_proceso.list_direccion_meta = [];

        BASEAPI.list('tipoMeta', {}, function (result) {
            indicador_producto_poa_proceso.list_tipo_meta = result.data;
        });

        BASEAPI.list('direccionMeta', {}, function (result) {
            indicador_producto_poa_proceso.list_direccion_meta = result.data;
        });

        indicador_producto_poa_proceso.selectQueries['producto'] = [
            {
                field: 'poa',
                operator: '=',
                value: user.poa_id
            }
        ];
        indicador_producto_poa_proceso.selectQueries['indicador_poa'] = [
            {
                field: 'compania',
                operator: '=',
                value: user.compania_id
            }
        ];
        if ((ENUM_2.Grupos.director_departamental == indicador_producto_poa_proceso.group_permitir) || (ENUM_2.Grupos.analista_departamental == indicador_producto_poa_proceso.group_permitir)) {
            indicador_producto_poa_proceso.selectQueries['producto'] = [
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
            indicador_producto_poa_proceso.selectQueries['indicador_poa'] = [
                {
                    field: 'compania',
                    operator: '=',
                    value: user.compania_id
                }
            ];
        }

        indicador_producto_poa_proceso.colors = COLOR.secundary;
        indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = [];
        indicador_producto_poa_proceso.meta_alcanzada = [];
        indicador_producto_poa_proceso.meta = [];
        indicador_producto_poa_proceso.meta_total = 0;
        indicador_producto_poa_proceso.validar_tipo = function () {
            if (indicador_producto_poa_proceso.tipo_meta == 6 || indicador_producto_poa_proceso.tipo_meta == 2 || indicador_producto_poa_proceso.tipo_meta == 3) {
                return 1;
            } else return 0;
        };

        // indicador_producto_poa_proceso.format = function (n, sep, decimals) {
        //     sep = sep || "."; // Default to period as decimal separator
        //     decimals = decimals || 2; // Default to 2 decimals
        //
        //     return n.toLocaleString().split(sep)[0]
        //         + sep
        //         + n.toFixed(decimals).split(sep)[1];
        // };
        indicador_producto_poa_proceso.currencyFormat = function (num) {
            return LAN.money(num).format(true);
        };
        indicador_producto_poa_proceso.formatear = function (a) {
            var c = LAN.money(a).value;
            if (indicador_producto_poa_proceso.tipo_meta == 1) {
                return c + '%';
            } else if (indicador_producto_poa_proceso.tipo_meta == 4) {
                return LAN.money(c).format(false);
            } else if (indicador_producto_poa_proceso.tipo_meta == 5) {
                return LAN.money(c).format(true);
            } else if (indicador_producto_poa_proceso.tipo_meta == 3) {
                return c < 0 ? c : c;
            } else {
                return c;
            }
        };
        indicador_producto_poa_proceso.restar = function (a, b) {
            a = eval(`indicador_producto_poa_proceso.meta${a}`) ? eval(`indicador_producto_poa_proceso.meta${a}`) : 0;
            var c = LAN.money(a).value - LAN.money(b).value;
            if (indicador_producto_poa_proceso.tipo_meta == 1) {
                return c + '%';
            } else if (indicador_producto_poa_proceso.tipo_meta == 4) {
                return LAN.money(c).format(false);
            } else if (indicador_producto_poa_proceso.tipo_meta == 5) {
                return LAN.money(c).format(true);
            } else if (indicador_producto_poa_proceso.tipo_meta == 3) {
                return c;
            } else {
                return c;
            }

            // if (a == null || a == "") {
            //     if (indicador_producto_poa_proceso.validar_tipo()) {
            //         return 0 - parseInt(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
            //     } else {
            //         return 0 - parseFloat(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
            //     }
            // }
            // if (b == null || b == "") {
            //     if (indicador_producto_poa_proceso.validar_tipo()) {
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
            // if (indicador_producto_poa_proceso.tipo_meta == 6 || indicador_producto_poa_proceso.tipo_meta == 2) {
            //     a = parseInt(a);
            //     b = parseInt(b);
            //     return a - b;
            // } else {
            //     a = parseFloat(a);
            //     b = parseFloat(b);
            //     var c = a - b;
            //     if (indicador_producto_poa_proceso.tipo_meta == 1) {
            //         return c.toFixed(2) + '%';
            //     } else if (indicador_producto_poa_proceso.tipo_meta == 4) {
            //         return indicador_producto_poa_proceso.currencyFormat(c);
            //     } else if (indicador_producto_poa_proceso.tipo_meta == 5) {
            //         return  indicador_producto_poa_proceso.currencyFormat(c);
            //     } else if (indicador_producto_poa_proceso.tipo_meta == 3) {
            //         return c < 0 ? c * -1 : c;
            //     } else {
            //         return c;
            //     }
            // }
        };

        indicador_producto_poa_proceso.getTotalVariacion = function () {
            if (indicador_producto_poa_proceso.meta_alcanzada.length > 0) {
                var i = 0;
                var meta = 0;
                for (var l = 0; l < indicador_producto_poa_proceso.list_indicador_producto_poa_proceso.length; l++) {
                    meta = eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[l].id}`) ? eval(`indicador_producto_poa_proceso.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[l].id}`) : 0;

                    if (meta.toString() != "") {

                        var d = meta.toString().replace(/,/g, '').replace('%', '').replace('$', '');

                        if (indicador_producto_poa_proceso.validar_tipo()) {
                            d = parseInt(d);
                        } else {
                            d = parseFloat(d);
                        }

                        if (indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[l].periodo <= indicador_producto_poa_proceso.periodomaximo || user.periodo_poa < moment(new Date).year()) {
                            i += d;
                        }
                    }

                }
                indicador_producto_poa_proceso.meta_total_alca = i;
                indicador_producto_poa_proceso.meta_total_desc = DSON.OSO(indicador_producto_poa_proceso.meta_total);
                var result = i - indicador_producto_poa_proceso.meta_total;

                var vari = result;
                var icon = "";
                var color = "";
                if (indicador_producto_poa_proceso.direccion_meta == 1) {

                    icon = "icon-arrow-up7";
                    if ((vari || 0) == 0) {
                        color += "gray";
                    } else if (vari > 0) {
                        color += "green";
                    } else {
                        color += "red";
                    }


                } else if (indicador_producto_poa_proceso.direccion_meta == 2) {
                    icon = "icon-arrow-down7";
                    if ((vari || 0) == 0) {
                        color += "gray";
                    }
                    if (vari < 0) {
                        color += "green";
                    } else {
                        color += "red";
                    }
                } else if (indicador_producto_poa_proceso.direccion_meta == 3) {
                    icon = "icon-minus3";
                    if ((vari || 0) == 0) {
                        color += "green";
                    } else {
                        color += "red";
                    }
                }
                indicador_producto_poa_proceso.iconfinal = `${icon} text-${color}`;

                if (indicador_producto_poa_proceso.tipo_meta == 1) {
                    result = indicador_producto_poa_proceso.currencyFormat(result) + '%';
                    indicador_producto_poa_proceso.meta_total_alca = indicador_producto_poa_proceso.currencyFormat(indicador_producto_poa_proceso.meta_total_alca) + '%';
                    indicador_producto_poa_proceso.meta_total_desc = indicador_producto_poa_proceso.currencyFormat(indicador_producto_poa_proceso.meta_total_desc) + '%';
                } else if (indicador_producto_poa_proceso.tipo_meta == 4) {
                    result = indicador_producto_poa_proceso.currencyFormat(result);
                    indicador_producto_poa_proceso.meta_total_alca = indicador_producto_poa_proceso.currencyFormat(indicador_producto_poa_proceso.meta_total_alca);
                    indicador_producto_poa_proceso.meta_total_desc = indicador_producto_poa_proceso.currencyFormat(indicador_producto_poa_proceso.meta_total_desc);
                } else if (indicador_producto_poa_proceso.tipo_meta == 5) {
                    result = indicador_producto_poa_proceso.currencyFormat(result);
                    indicador_producto_poa_proceso.meta_total_alca = '$' + indicador_producto_poa_proceso.currencyFormat(indicador_producto_poa_proceso.meta_total_alca);
                    indicador_producto_poa_proceso.meta_total_desc = '$' + indicador_producto_poa_proceso.currencyFormat(indicador_producto_poa_proceso.meta_total_desc);
                } else if (indicador_producto_poa_proceso.tipo_meta == 3) {
                    result = result < 0 ? result : result;
                }


                return result;

            } else
                return 0;
        };

        indicador_producto_poa_proceso.permission = function (indicador, periodo) {
            var exist = indicador_producto_poa_proceso.permissions.filter(d => d.indicador == indicador && d.periodo == periodo);
            if (exist.length === 0) {
                return {
                    allow: 0,
                    debug: "Este año del PEI aún no contiene POA"
                };
            } else {
                return exist[0];
            }
        };

        indicador_producto_poa_proceso.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
            send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_proceso_periodo', periodo, callback);
        };
        indicador_producto_poa_proceso.notificar = function (peri) {
            SWEETALERT.confirm({
                message: `Está seguro que desea notificar al área de Planificación?`,
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                    indicador_producto_poa_proceso.send_email_indicador(false, 'indicador poa', 'indicador_poa', indicador_producto_poa_proceso.indicador_poa
                        , indicador_producto_poa_proceso.indicador_poa_object.Nombre, indicador_producto_poa_proceso.indicador_poa_object.departamento
                        , "#indicador_producto_poa_proceso", peri, async function () {

                        });
                    indicador_producto_poa_proceso.refreshAngular();
                    SWEETALERT.stop();
                }
            });
        };

        indicador_producto_poa_proceso.applyMasksy = function (key, ids) {
            var names = "indicador_producto_poa_proceso_meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id;
            indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].allow = indicador_producto_poa_proceso.permission(indicador_producto_poa_proceso.indicador_poa, indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].periodo);
            indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].message = indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].allow.debug;
            disabled = indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].allow.allow === 1 ? false : true;

            if (indicador_producto_poa_proceso.queries.id) disabled = true;

            if (!disabled) {
                $(`[name=${names}]`).focus();
            }
            ids.push(indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id);
            $(`[name=${names}]`).addClass("meta_alcanzada");

            if (CONFIG.seguridadindicadores !== "abierta")
                eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id}.disabled = disabled`);
            else {
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].allow.allow = 1;
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].message = "";
                eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id}.disabled = false`);
            }

            if (indicador_producto_poa_proceso.queries.id) {
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].allow.allow = 0;
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].message = "No puede modificar este registro";
                eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id}.disabled = true`);
            }

            if (indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].valor_alcanzado === "" || indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].valor_alcanzado === undefined || indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].valor_alcanzado === null) {
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].allow.allow = 1;
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].message = "";
                eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id}.disabled = false`);
            }
            if (indicador_producto_poa_proceso.queries.id) {
                eval(`indicador_producto_poa_proceso.form.options.meta${indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id}.disabled = true`);
            }
        };
        indicador_producto_poa_proceso.applyMasks = async function () {
            indicador_producto_poa_proceso.permissions = await BASEAPI.listp('vw_permission_proceso', {
                limit: 0,
                orderby: "$ compania",
                order: "asc",
                where: [{
                    field: "compania",
                    value: user.compania_id
                }]
            });
            indicador_producto_poa_proceso.permissions = indicador_producto_poa_proceso.permissions.data;
            var names = '';
            var disabled = false;
            var ids = [];
            indicador_producto_poa_proceso.filesme = [];
            indicador_producto_poa_proceso.permissionOf = [];
            switch (indicador_producto_poa_proceso.tipo_meta) {
                case 1: {
                    //percentage
                    for (var key in indicador_producto_poa_proceso.list_indicador_producto_poa_proceso) {
                        await indicador_producto_poa_proceso.control.percentage(".subcontainer" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, "meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, {maxlength: 3}, false, '', " ", false);
                        indicador_producto_poa_proceso.applyMasksy(key, ids);
                    }
                    break;
                }
                case 2: {
                    //Indice
                    for (var key in indicador_producto_poa_proceso.list_indicador_producto_poa_proceso) {
                        await indicador_producto_poa_proceso.control.indice(".subcontainer" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, "meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, {
                            maxlength: 1,
                        }, false, '', " ", false);
                        indicador_producto_poa_proceso.applyMasksy(key, ids);
                    }
                    break;
                }
                case 3: {
                    //valor_absoluto
                    for (var key in indicador_producto_poa_proceso.list_indicador_producto_poa_proceso) {
                        await indicador_producto_poa_proceso.control.valor_absoluto(".subcontainer" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, "meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, {maxlength: 11}, false, '', " ", false);
                        indicador_producto_poa_proceso.applyMasksy(key, ids);
                    }
                    break;
                }
                case 4: {
                    //decimal
                    for (var key in indicador_producto_poa_proceso.list_indicador_producto_poa_proceso) {
                        await indicador_producto_poa_proceso.control.decimal(".subcontainer" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, "meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, {maxlength: 22}, false, '', " ", false);
                        indicador_producto_poa_proceso.applyMasksy(key, ids);
                    }
                    break;
                }
                case 5: {
                    ////Dinero
                    for (var key in indicador_producto_poa_proceso.list_indicador_producto_poa_proceso) {
                        await indicador_producto_poa_proceso.control.money(".subcontainer" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, "meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, {maxlength: 22}, false, '', " ", false);
                        indicador_producto_poa_proceso.applyMasksy(key, ids);
                    }
                    break;
                }
                case 6: {
                    //integer
                    for (var key in indicador_producto_poa_proceso.list_indicador_producto_poa_proceso) {
                        await indicador_producto_poa_proceso.control.integer(".subcontainer" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, "meta" + indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].id, {maxlength: 11}, false, '', ' ', false);
                        indicador_producto_poa_proceso.applyMasksy(key, ids);
                    }
                    break;
                }

                default: {
                }

            }
            indicador_producto_poa_proceso.idssss = ids;
            setTimeout(function () {
                for (var i = 0; i < indicador_producto_poa_proceso.idssss.length; i++) {
                    eval(`
                        if (typeof ShowCountIndicadorPOA${indicador_producto_poa_proceso.idssss[i]} !== 'undefined')
                            ShowCountIndicadorPOA${indicador_producto_poa_proceso.idssss[i]}(true);
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
            }, 1000);


            $('.modificarActividad').on('click', function () {
                if ($(this).hasClass('permitido') && indicador_producto_poa_proceso.condicion_poa == 1) {
                    indicador_producto_poa_proceso.setPermission('file.upload', true);
                    indicador_producto_poa_proceso.setPermission('file.download', true);
                    indicador_producto_poa_proceso.setPermission('file.remove', true);
                } else {
                    if (!indicador_producto_poa_proceso.asbierto) {
                        indicador_producto_poa_proceso.setPermission('file.upload', false);
                        indicador_producto_poa_proceso.setPermission('file.download', false);
                        indicador_producto_poa_proceso.setPermission('file.remove', false);
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
        indicador_producto_poa_proceso.$scope.$watch('indicador_producto_poa_proceso.comentario', function (value) {
            var rules = [];
            rules.push(VALIDATION.yariel.maliciousCode(value));
            VALIDATION.validate(indicador_producto_poa_proceso, "comentario", rules);
        });
        indicador_producto_poa_proceso.$scope.$watch('indicador_producto_poa_proceso.producto', function (value) {
            indicador_producto_poa_proceso.descripcion = null;
            indicador_producto_poa_proceso.fuente = null;
            indicador_producto_poa_proceso.medio_verificacion = null;
            indicador_producto_poa_proceso.tipo_meta_nombre = null;
            indicador_producto_poa_proceso.direccion_meta_nombre = null;
            indicador_producto_poa_proceso.linea_base = null;
            indicador_producto_poa_proceso.ano_linea_base = null;
            indicador_producto_poa_proceso.metodo_calculo = null;
            indicador_producto_poa_proceso.indicador_poa_r = null;


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

            if (indicador_producto_poa_proceso.form.selected('producto') !== null) {
                indicador_producto_poa_proceso.actividad = "[NULL]";
                indicador_producto_poa_proceso.form.loadDropDown('actividad');
                indicador_producto_poa_proceso.form.producto_id = indicador_producto_poa_proceso.form.selected('producto').id;
                indicador_producto_poa_proceso.departamento_nombre = indicador_producto_poa_proceso.form.selected('producto').departamento_name;
                indicador_producto_poa_proceso.ver_estado = indicador_producto_poa_proceso.form.selected('producto').estatus;
            } else {
                indicador_producto_poa_proceso.departamento_nombre = null;
                indicador_producto_poa_proceso.range_date = null;
            }

            if (indicador_producto_poa_proceso.form.selected('actividad') !== null) {
                indicador_producto_poa_proceso.producto = "[NULL]";
                indicador_producto_poa_proceso.form.loadDropDown('producto');
                indicador_producto_poa_proceso.form.producto_id = indicador_producto_poa_proceso.form.selected('actividad').producto;
                indicador_producto_poa_proceso.departamento_nombre = indicador_producto_poa_proceso.form.selected('actividad').departamento_nombre_2;
                indicador_producto_poa_proceso.ver_estado = indicador_producto_poa_proceso.form.selected('actividad').estatus;
            }

        });

        indicador_producto_poa_proceso.$scope.$watch('indicador_producto_poa_proceso.actividad', function (value) {


            indicador_producto_poa_proceso.descripcion = null;
            indicador_producto_poa_proceso.fuente = null;
            indicador_producto_poa_proceso.medio_verificacion = null;
            indicador_producto_poa_proceso.tipo_meta_nombre = null;
            indicador_producto_poa_proceso.direccion_meta_nombre = null;
            indicador_producto_poa_proceso.linea_base = null;
            indicador_producto_poa_proceso.ano_linea_base = null;
            indicador_producto_poa_proceso.metodo_calculo = null;
            indicador_producto_poa_proceso.indicador_poa_r = null;


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

            if (indicador_producto_poa_proceso.form.selected('actividad') !== null) {
                indicador_producto_poa_proceso.producto = "[NULL]";
                indicador_producto_poa_proceso.form.loadDropDown('producto');
                indicador_producto_poa_proceso.form.producto_id = indicador_producto_poa_proceso.form.selected('actividad').producto;
                indicador_producto_poa_proceso.departamento_nombre = indicador_producto_poa_proceso.form.selected('actividad').departamento_nombre_2;
                indicador_producto_poa_proceso.ver_estado = indicador_producto_poa_proceso.form.selected('actividad').estatus;
            } else {
                indicador_producto_poa_proceso.departamento_nombre = null;
                indicador_producto_poa_proceso.range_date = null;
            }


            if (indicador_producto_poa_proceso.form.selected('producto') !== null) {
                indicador_producto_poa_proceso.actividad = "[NULL]";
                indicador_producto_poa_proceso.form.loadDropDown('actividad');
                indicador_producto_poa_proceso.form.producto_id = indicador_producto_poa_proceso.form.selected('producto').id;
                indicador_producto_poa_proceso.departamento_nombre = indicador_producto_poa_proceso.form.selected('producto').departamento_nombre;
                indicador_producto_poa_proceso.ver_estado = indicador_producto_poa_proceso.form.selected('producto').estatus;
            }

        });

        indicador_producto_poa_proceso.refreshComments = function () {
            if (!indicador_producto_poa_proceso.indicador_poa)
                return;
            BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_proceso', {
                limit: 0,
                page: 1,
                orderby: "periodo",
                order: "asc",
                where: [{
                    field: "indicador_poa",
                    value: indicador_producto_poa_proceso.indicador_poa
                }]
            }).then(function (result) {

                for (var data of result.data) {
                    indicador_producto_poa_proceso.list_indicador_producto_poa_proceso.map(d => {
                        if (d.id == data.id) {
                            d.count_comment = data.count_comment;
                            d.comment = data.comment;
                        }
                    });
                }
                indicador_producto_poa_proceso.refreshAngular();
            });
        };
        indicador_producto_poa_proceso.$scope.$watch('indicador_producto_poa_proceso.indicador_poa', function (value) {
            if (value != '$NULL' || value != '') {
                animation.loading(`#tb-custom2`, "", ``, '30');
                indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = [];
                indicador_producto_poa_proceso.meta_alcanzada = [];
                indicador_producto_poa_proceso.meta = [];
                indicador_producto_poa_proceso.meta_total = 0;
                BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_proceso', {
                    limit: 0,
                    page: 1,
                    orderby: "periodo",
                    order: "asc",
                    where: [{
                        field: "indicador_poa",
                        value: value === "[NULL]" ? 0 : value
                    }]
                }).then(function (result) {

                    indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = result.data;

                    indicador_producto_poa_proceso.periodomaximo = Math.ceil((new Date().getMonth() + 1) / (12 / indicador_producto_poa_proceso.list_indicador_producto_poa_proceso.length));
                    for (var key in result.data) {

                        eval(`indicador_producto_poa_proceso.meta${result.data[key].id} = result.data[key].valor_alcanzado`);

                        indicador_producto_poa_proceso.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                        if (indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[key].periodo <= indicador_producto_poa_proceso.periodomaximo || user.periodo_poa < moment(new Date).year()) {
                            if (indicador_producto_poa_proceso.validar_tipo()) {
                                indicador_producto_poa_proceso.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                            } else {
                                indicador_producto_poa_proceso.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                            }
                        }
                    }

                    if (indicador_producto_poa_proceso.indicador_poa_object != null) {

                        if (indicador_producto_poa_proceso.form.selected('indicador_poa') !== null) {

                            indicador_producto_poa_proceso.descripcion = indicador_producto_poa_proceso.form.selected('indicador_poa').descripcion_indicador;
                            indicador_producto_poa_proceso.fuente = indicador_producto_poa_proceso.form.selected('indicador_poa').fuente;
                            indicador_producto_poa_proceso.medio_verificacion = indicador_producto_poa_proceso.form.selected('indicador_poa').medio_verificacion;
                            indicador_producto_poa_proceso.linea_base = indicador_producto_poa_proceso.form.selected('indicador_poa').linea;
                            indicador_producto_poa_proceso.ano_linea_base = indicador_producto_poa_proceso.form.selected('indicador_poa').ano_linea_base;
                            indicador_producto_poa_proceso.metodo_calculo = indicador_producto_poa_proceso.form.selected('indicador_poa').metodo;
                            indicador_producto_poa_proceso.ver_estado = indicador_producto_poa_proceso.form.selected('indicador_poa').estatus;
                            indicador_producto_poa_proceso.indicador_poa_r = indicador_producto_poa_proceso.form.selected('indicador_poa').indicador_poa_r;

                            if (indicador_producto_poa_proceso.list_tipo_meta.length > 0) {
                                var selected1 = indicador_producto_poa_proceso.list_tipo_meta.filter(information => {
                                    if (information.id == indicador_producto_poa_proceso.form.selected('indicador_poa').tipo_meta) {
                                        return true;
                                    }
                                });


                                indicador_producto_poa_proceso.tipo_meta = selected1[0].id;
                                indicador_producto_poa_proceso.tipo_meta_nombre = selected1[0].nombre;
                            }

                            if (indicador_producto_poa_proceso.list_direccion_meta.length > 0) {
                                var selected2 = indicador_producto_poa_proceso.list_direccion_meta.filter(information => {
                                    if (information.id == indicador_producto_poa_proceso.form.selected('indicador_poa').direccion_meta) {
                                        return true;
                                    }
                                });


                                indicador_producto_poa_proceso.direccion_meta = selected2[0].id;
                                indicador_producto_poa_proceso.direccion_meta_nombre = selected2[0].nombre;
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

                    indicador_producto_poa_proceso.refreshAngular();
                    setTimeout(() => {
                        if (value) {
                            indicador_producto_poa_proceso.applyMasks();
                        }
                    }, 600);
                    animation.stoploading(`#tb-custom2`);

                });
            }
        });

        indicador_producto_poa_proceso.save_pei_ano = function (indicado, limpi) {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for (var item of buttons) {
                item.disabled = true;
            }
            var updates = false;
            $('.meta_alcanzada').each(function () {
                var id = $(this).attr('name').replace("indicador_producto_poa_proceso_meta", "");
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
                    var titulo_push = MESSAGE.ieval('planificacion.actializar_indicador_proceso_email_titulo_meta_no_cumplida', {field1: indicador_producto_poa_proceso.indicador_poa_object.Nombre});
                    var cuerpo_push = "EL resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                    var titulo_email = MESSAGE.ieval('planificacion.actializar_indicador_proceso_email_titulo_meta_no_cumplida', {field1: indicador_producto_poa_proceso.indicador_poa_object.Nombre});
                    var cuerpo_email = "EL resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                    var correo = indicador_producto_poa_proceso.form.selected('indicador_poa').correo;
                    switch (indicador_producto_poa_proceso.direccion_meta) {
                        case 1: {
                            if (LAN.money(indicador_producto_poa_proceso.meta_total).value > LAN.money(indicador_producto_poa_proceso.meta_total_alca).value) {

                                function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_producto_poa_proceso.indicador_poa_object.departamento, {
                                    direccion_meta: indicador_producto_poa_proceso.direccion_meta_nombre,
                                    meta_proyectada_total: indicador_producto_poa_proceso.meta_total_desc,
                                    meta_alcanzada_total: indicador_producto_poa_proceso.meta_total_alca
                                }, null, user.institucion_id)
                            }
                            break;
                        }
                        case 2: {
                            if (LAN.money(indicador_producto_poa_proceso.meta_total).value < LAN.money(indicador_producto_poa_proceso.meta_total_alca).value) {

                                function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_producto_poa_proceso.indicador_poa_object.departamento, {
                                    direccion_meta: indicador_producto_poa_proceso.direccion_meta_nombre,
                                    meta_proyectada_total: indicador_producto_poa_proceso.meta_total_desc,
                                    meta_alcanzada_total: indicador_producto_poa_proceso.meta_total_alca
                                }, null, user.institucion_id)
                            }
                            break;
                        }
                        case 3: {
                            if (LAN.money(indicador_producto_poa_proceso.meta_total).value != LAN.money(indicador_producto_poa_proceso.meta_total_alca).value) {

                                function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_producto_poa_proceso.indicador_poa_object.departamento, {
                                    direccion_meta: indicador_producto_poa_proceso.direccion_meta_nombre,
                                    meta_proyectada_total: indicador_producto_poa_proceso.meta_total_desc,
                                    meta_alcanzada_total: indicador_producto_poa_proceso.meta_total_alca
                                }, null, user.institucion_id)
                            }
                            break;
                        }
                        default: {
                        }
                    }
                    if (indicador_producto_poa_proceso.meta_alcanzada.length > 0) {
                        var cc = 0;
                        var alcanzados = [];
                        var permitidos = [];
                        $('.meta_alcanzada').each(function () {
                            var id = $(this).attr('name').replace("indicador_producto_poa_proceso_meta", "");
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
                            updates = !indicador_producto_poa_proceso.permissionOf[indicador_producto_poa_proceso.list_indicador_producto_poa_proceso[cc].periodo - 1];

                            if (permitidos.indexOf(id) !== -1) {
                                if (updates || CONFIG.seguridadindicadores === "abierta") {
                                    await BASEAPI.updateallp('indicador_proceso_periodo', {
                                        "valor_alcanzado": valor === '' || valor === null || valor === undefined ? '' : valor.toString(),
                                        // "comentario": comment,
                                        "updated_at": new date().now(),
                                        'updated_by': indicador_producto_poa_proceso.usuario_id,
                                        where: [{
                                            "field": "id",
                                            "value": id
                                        }]
                                    });
                                    await HISTORY.save('indicador_producto_poa_proceso', {
                                        cambio: valor.toString(),
                                        id: id
                                    });
                                    await AUDIT.LOGCUSTOM("Trabajar Indicador Proceso", 'vw_indicador_poa_proceso',
                                        {
                                            indicador: id,
                                            producto: indicador_producto_poa_proceso.form.producto_id,
                                            valor_alcanzado: valor.toString(),
                                            actualizado_en: new date().now(),
                                            actualizado_por: indicador_producto_poa_proceso.usuario_id
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
                        indicador_producto_poa_proceso.descripcion =
                            indicador_producto_poa_proceso.fuente =
                                indicador_producto_poa_proceso.medio_verificacion =
                                    indicador_producto_poa_proceso.linea_base =
                                        indicador_producto_poa_proceso.ano_linea_base =
                                            indicador_producto_poa_proceso.metodo_calculo =
                                                indicador_producto_poa_proceso.ver_estado =
                                                    indicador_producto_poa_proceso.indicador_poa_r =
                                                        indicador_producto_poa_proceso.tipo_meta =
                                                            indicador_producto_poa_proceso.tipo_meta_nombre =
                                                                indicador_producto_poa_proceso.direccion_meta =
                                                                    indicador_producto_poa_proceso.direccion_meta_nombre = "";

                        indicador_producto_poa_proceso.producto = "[NULL]";
                        indicador_producto_poa_proceso.form.loadDropDown('producto');

                        indicador_producto_poa_proceso.indicador_poa = "[NULL]";
                        indicador_producto_poa_proceso.form.loadDropDown('indicador_poa');
                    }
                    var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                }
            });
        };
        indicador_producto_poa_proceso.cancel_pei_ano = function () {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for (var item of buttons) {
                item.disabled = true;
            }
            SWEETALERT.confirm({
                message: 'Desea cancelar los cambios realizados ?',
                confirm: function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = [];
                    indicador_producto_poa_proceso.meta_alcanzada = [];
                    animation.loading(`#tb-custom2`, "", ``, '30');
                    BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_proceso', {
                        limit: 0,
                        page: 1,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_poa",
                            value: indicador_producto_poa_proceso.indicador_poa
                        }]
                    }).then(function (result) {

                        indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = result.data;
                        for (var key in result.data) {
                            eval(`indicador_producto_poa_proceso.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                            indicador_producto_poa_proceso.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                            if (indicador_producto_poa_proceso.validar_tipo()) {
                                indicador_producto_poa_proceso.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                            } else {
                                indicador_producto_poa_proceso.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                            }
                        }

                        indicador_producto_poa_proceso.descripcion =
                            indicador_producto_poa_proceso.fuente =
                                indicador_producto_poa_proceso.medio_verificacion =
                                    indicador_producto_poa_proceso.linea_base =
                                        indicador_producto_poa_proceso.ano_linea_base =
                                            indicador_producto_poa_proceso.metodo_calculo =
                                                indicador_producto_poa_proceso.ver_estado =
                                                    indicador_producto_poa_proceso.indicador_poa_r =
                                                        indicador_producto_poa_proceso.tipo_meta =
                                                            indicador_producto_poa_proceso.tipo_meta_nombre =
                                                                indicador_producto_poa_proceso.direccion_meta =
                                                                    indicador_producto_poa_proceso.direccion_meta_nombre = "";

                        indicador_producto_poa_proceso.producto = "[NULL]";
                        indicador_producto_poa_proceso.form.loadDropDown('producto');

                        indicador_producto_poa_proceso.indicador_poa = "[NULL]";
                        indicador_producto_poa_proceso.form.loadDropDown('indicador_poa');
                        indicador_producto_poa_proceso.applyMasks();
                        indicador_producto_poa_proceso.refreshAngular();
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


        indicador_producto_poa_proceso.add_comentario = (data) => new Promise((resolve, reject) => {
            if (indicador_producto_poa_proceso.comentario == "") {
                SWEETALERT.show({message: `Debe agregar un comentario.`});
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                resolve(false);
            } else {
                BASEAPI.insertp('comentarios',
                    {
                        "comentario": indicador_producto_poa_proceso.comentario,
                        "type": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_proceso,
                        "created_by": user.usuario_id,
                        "value": indicador_producto_poa_proceso.ids,
                        "value2": indicador_producto_poa_proceso.indicador_poa
                    }).then(function (rs) {
                    vw_comentarios.refresh();
                    indicador_producto_poa_proceso.comentario = "";
                    indicador_producto_poa_proceso.refreshAngular();

                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    // indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = [];
                    // indicador_producto_poa_proceso.meta_alcanzada = [];
                    animation.loading(`#tb-custom2`, "", ``, '30');
                    BASEAPI.listp('vw_actualizacion_indicador_poa_periodo_proceso', {
                        limit: 0,
                        page: 1,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_poa",
                            value: indicador_producto_poa_proceso.indicador_poa
                        }]
                    }).then(function (result) {

                        // indicador_producto_poa_proceso.list_indicador_producto_poa_proceso = result.data;
                        // for (var key in result.data) {
                        //     eval(`indicador_producto_poa_proceso.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                        //     indicador_producto_poa_proceso.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;
                        //
                        //     if (indicador_producto_poa_proceso.validar_tipo()) {
                        //         indicador_producto_poa_proceso.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        //
                        //     } else {
                        //         indicador_producto_poa_proceso.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        //     }
                        // }
                        //indicador_producto_poa_proceso.applyMasks();
                        indicador_producto_poa_proceso.refreshAngular();
                        animation.stoploading(`#tb-custom2`);
                        SWEETALERT.stop();
                        SWEETALERT.show({
                            message: "Ha sido guardado su comentario",
                            confirm: function () {
                                MODAL.closeAll();
                            }
                        });
                        //MODAL.close(indicador_producto_poa_proceso);
                        indicador_producto_poa_proceso.refreshComments();
                        resolve(true);

                    });
                });
            }
            resolve(true);
        });
        indicador_producto_poa_proceso.openmodalField = function (edit, id, value2) {
            // indicador_producto_poa_proceso.commentName = 'metacomment' + name;
            // indicador_producto_poa_proceso.commentValue = $(`[name=${indicador_producto_poa_proceso.commentName}]`).val();
            indicador_producto_poa_proceso.edit = edit;
            indicador_producto_poa_proceso.ids = id;
            indicador_producto_poa_proceso.value2 = value2;
            indicador_producto_poa_proceso.comentario = "";
            indicador_producto_poa_proceso.modal.modalView("indicador_producto_poa_proceso/addcomment", {
                width: 'modal-full',
                header: {
                    title: indicador_producto_poa_proceso.edit ? `Agregar comentario` : `Ver comentario`,
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
                    //         if(indicador_producto_poa_proceso.edit){
                    //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                    //                 '                <i class="position-right"></i>\n' +
                    //                 '                </span>\n' +
                    //                 '            <button\n' +
                    //                 '                   id="btnC"  onclick="MODAL.close(indicador_producto_poa_proceso)"  dragonlanguage="" title="MESSAGE.ic(\'mono.cancel\')"\n' +
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
                    //                 '                   id="btnC"  onclick="MODAL.close(indicador_producto_poa_proceso)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
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
                        //     if($(`[name=${indicador_producto_poa_proceso.commentName}]`).val().length >= 85){
                        //         $(`.${indicador_producto_poa_proceso.commentName}`).show();
                        //     }else{
                        //         $(`.${indicador_producto_poa_proceso.commentName}`).hide();
                        //     }
                        // },
                        end: function (data) {
                            indicador_producto_poa_proceso.ids = 0;
                        }
                    }
                },
            });
        }
    }
);
