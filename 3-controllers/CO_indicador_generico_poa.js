app.controller("indicador_generico_poa", function ($scope, $http, $compile) {
    indicador_generico_poa = this;
    indicador_generico_poa.destroyForm = false;
    indicador_generico_poa.textModal = '';
    var user = new SESSION().current();
    indicador_generico_poa.usuario_id = user.usuario_id;
    indicador_generico_poa.session = user;
    indicador_generico_poa.entidadParams = window.location.href.split('?')[1] || "";
    indicador_generico_poa.entidad = window.location.href.split('?')[1] || "";
    indicador_generico_poa.conditionPoa = {estado: user.estado, poa_id: user.poa_id};
    indicador_generico_poa.estatus = ENUM_2.presupuesto_estatus.Completo;
    indicador_generico_poa.estado = ENUM_2.poa_estatus.Inactivo;
    indicador_generico_poa.from_dash_procesos = false;
    indicador_generico_poa.group_permitir = user.groups[0] ? user.groups[0].caracteristica : "";
    indicador_generico_poa.asbierto = CONFIG.seguridadindicadores === "abierta";

    RUNCONTROLLER("indicador_generico_poa", indicador_generico_poa, $scope, $http, $compile);
    indicador_generico_poa.multiplo = 0;
    indicador_generico_poa.arrays = [];

    var http = new HTTP();
    indicador_generico_poa.queries = http.hrefToObj();

    if (indicador_generico_poa.queries.id) {
        indicador_generico_poa.indicador_generico = indicador_generico_poa.queries.id;
    }
    if (typeof vw_dashboard_productosgrid !== "undefined")
        if (vw_dashboard_productosgrid) {
            if (vw_dashboard_productosgrid.selectedPEI) {
                indicador_generico_poa.queries.id = vw_dashboard_productosgrid.selectedPEI;
                indicador_generico_poa.indicador_generico = vw_dashboard_productosgrid.selectedPEI;
            }
        }
    if (typeof vw_dashboard_productosgrid_proceso !== "undefined")
        if (location.href.indexOf('indicador_producto_poa_proceso') === -1)
            if (vw_dashboard_productosgrid_proceso.selectedPEI) {
                indicador_generico_poa.entidad = 'vw_procesos';
                indicador_generico_poa.queries.id = vw_dashboard_productosgrid_proceso.selectedPEI;
                indicador_generico_poa.from_dash_procesos = true;
                indicador_generico_poa.indicador_generico = vw_dashboard_productosgrid_proceso.selectedPEI + '';
            }

    var r = 0;
    indicador_generico_poa.get_month = moment(new Date).month() + 1;
    indicador_generico_poa.get_year = new Date().getFullYear();
    for (var i = 1; user.cantidad; i++) {
        r = i * user.cantidad;
        if (r == 12) {
            indicador_generico_poa.multiplo = i;
            break;
        }
    }
    var c = 0;
    var d = 0;
    for (var i = 1; i <= user.cantidad; i++) {
        indicador_generico_poa.arrays['periodo' + i] = [];
        for (var l = 1 + c; l <= indicador_generico_poa.multiplo + c; l++) {
            indicador_generico_poa.arrays['periodo' + i].push(l);
            d++;
        }
        c = d;
    }
    indicador_generico_poa.validate_permissions = function (v1) {

        if (user.periodo_poa < moment(new Date).year()) {
            if (indicador_generico_poa.lista_indicador_actividades.length === 0) {
                if (indicador_generico_poa.list_indicador_generico_poa[v1 - 1])
                    if (eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[v1 - 1].id}`))
                        if (
                            eval(`indicador_generico_poa.meta${indicador_generico_poa.list_indicador_generico_poa[v1 - 1].id}`) === "" ||
                            eval(`indicador_generico_poa.meta${indicador_generico_poa.list_indicador_generico_poa[v1 - 1].id}`) === null) {
                            eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[v1 - 1].id}.disabled = false`);
                            return false;
                        }
            }
        }
        if (indicador_generico_poa.ver_estado == indicador_generico_poa.estatus && user.periodo_poa == moment(new Date).year()) {
            if ((indicador_generico_poa.arrays['periodo' + v1].indexOf(indicador_generico_poa.get_month) > -1) && (user.estado == ENUM_2.poa_estatus.Activo)) {
                console.log((indicador_generico_poa.arrays['periodo' + v1].indexOf(indicador_generico_poa.get_month)) && (user.estado == ENUM_2.poa_estatus.Activo));


                if (indicador_generico_poa.lista_indicador_actividades.length === 0) {
                    if (CONFIG.seguridadindicadores !== "abierta") {
                        for (var i = v1 - 1; i >= 0; i--) {
                            if (indicador_generico_poa.list_indicador_generico_poa[i])
                                if (eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[i].id}`)) {
                                    if (
                                        eval(`indicador_generico_poa.meta${indicador_generico_poa.list_indicador_generico_poa[i].id}`) === "" ||
                                        eval(`indicador_generico_poa.meta${indicador_generico_poa.list_indicador_generico_poa[i].id}`) === null) {
                                        eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[i].id}.disabled = false`);
                                    }
                                }
                        }
                    }
                }
                return false;
            } else {
                console.log(indicador_generico_poa.arrays['periodo' + v1].indexOf(indicador_generico_poa.get_month));

                return true;
            }
        } else return true
    };

    RUN_B("indicador_generico_poa", indicador_generico_poa, $scope, $http, $compile);
    getPOAstatus(indicador_generico_poa, user.poa_id);

    indicador_generico_poa.load = async function () {
        indicador_generico_poa.entidadobj = await BASEAPI.firstp('indicador_generico_entidad', {
            where: [{
                field: "table_",
                value: indicador_generico_poa.entidad
            }]
        });
        indicador_generico_poa.fixFilters = [
            {
                "field": "poa",
                "value": user.poa_id
            },
            {
                "field": "table_",
                "value": indicador_generico_poa.entidadobj.id
            },
        ];
        indicador_generico_poa.tipos = await BASEAPI.listp('indicador_generico_entidad', {limit: 0});
        indicador_generico_poa.tipos = indicador_generico_poa.tipos.data;
        indicador_generico_poa.plural = `` + indicador_generico_poa.entidadobj.name;
        indicador_generico_poa.singular = `` + indicador_generico_poa.entidadobj.name;
        indicador_generico_poa.headertitle = `` + indicador_generico_poa.entidadobj.name;
        indicador_generico_poa.refreshAngular();
    };
    var animation = new ANIMATION();


    if ((ENUM_2.Grupos.director_departamental == indicador_generico_poa.group_permitir) || (ENUM_2.Grupos.analista_departamental == indicador_generico_poa.group_permitir)) {
        indicador_generico_poa.selectQueries['producto'] = [
            {
                field: 'departamento',
                operator: '=',
                value: user.departamento
            }
        ];
        indicador_generico_poa.selectQueries['indicador_generico'] = [
            {
                field: 'departamento',
                operator: '=',
                value: user.departamento
            }
        ];
    }

    indicador_generico_poa.list_tipo_meta = [];

    indicador_generico_poa.list_direccion_meta = [];

    BASEAPI.list('tipoMeta', {}, function (result) {
        indicador_generico_poa.list_tipo_meta = result.data;
    });

    BASEAPI.list('direccionMeta', {}, function (result) {
        indicador_generico_poa.list_direccion_meta = result.data;
    });

    if ((ENUM_2.Grupos.director_departamental == indicador_generico_poa.group_permitir) || (ENUM_2.Grupos.analista_departamental == indicador_generico_poa.group_permitir)) {
        indicador_generico_poa.selectQueries['producto'] = [
            {
                field: 'departamento',
                operator: '=',
                value: user.departamento
            }
        ];
        indicador_generico_poa.selectQueries['indicador_generico'] = [
            {
                field: 'departamento',
                operator: '=',
                value: user.departamento
            }
        ];
    }

    indicador_generico_poa.colors = COLOR.secundary;
    indicador_generico_poa.list_indicador_generico_poa = [];
    indicador_generico_poa.meta_alcanzada = [];
    indicador_generico_poa.meta = [];
    indicador_generico_poa.meta_total = 0;
    indicador_generico_poa.validar_tipo = function () {
        if (indicador_generico_poa.tipo_meta == 6 || indicador_generico_poa.tipo_meta == 2 || indicador_generico_poa.tipo_meta == 3) {
            return 1;
        } else return 0;
    };
    indicador_generico_poa.currencyFormat = function (num) {
        return LAN.money(num).format(true);
    };
    indicador_generico_poa.formatear = function (a) {
        var c = LAN.money(a).value;
        if (indicador_generico_poa.tipo_meta == 1) {
            return c + '%';
        } else if (indicador_generico_poa.tipo_meta == 4) {
            return LAN.money(c).format(false);
        } else if (indicador_generico_poa.tipo_meta == 5) {
            return LAN.money(c).format(true);
        } else if (indicador_generico_poa.tipo_meta == 3) {
            return c < 0 ? c * -1 : c;
        } else {
            return c;
        }
    };
    indicador_generico_poa.restar = function (a, b) {
        a = eval(`indicador_generico_poa.meta${a}`) ? eval(`indicador_generico_poa.meta${a}`) : 0;
        var c = LAN.money(a).value - LAN.money(b).value;
        if (indicador_generico_poa.tipo_meta == 1) {
            return c + '%';
        } else if (indicador_generico_poa.tipo_meta == 4) {
            return LAN.money(c).format(false);
        } else if (indicador_generico_poa.tipo_meta == 5) {
            return LAN.money(c).format(true);
        } else if (indicador_generico_poa.tipo_meta == 3) {
            return c;
        } else {
            return c;
        }

        // if (a == null || a == "") {
        //     if (indicador_generico_poa.validar_tipo()) {
        //         return 0 - parseInt(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
        //     } else {
        //         return 0 - parseFloat(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
        //     }
        // }
        // if (b == null || b == "") {
        //     if (indicador_generico_poa.validar_tipo()) {
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
        // if (indicador_generico_poa.tipo_meta == 6 || indicador_generico_poa.tipo_meta == 2) {
        //     a = parseInt(a);
        //     b = parseInt(b);
        //     return a - b;
        // } else {
        //     a = parseFloat(a);
        //     b = parseFloat(b);
        //     var c = a - b;
        //     if (indicador_generico_poa.tipo_meta == 1) {
        //         return c.toFixed(2) + '%';
        //     } else if (indicador_generico_poa.tipo_meta == 4) {
        //         return indicador_generico_poa.currencyFormat(c);
        //     } else if (indicador_generico_poa.tipo_meta == 5) {
        //         return  indicador_generico_poa.currencyFormat(c);
        //     } else if (indicador_generico_poa.tipo_meta == 3) {
        //         return c < 0 ? c * -1 : c;
        //     } else {
        //         return c;
        //     }
        // }
    };

    indicador_generico_poa.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_generico_periodo', periodo, callback);
    };
    indicador_generico_poa.notificar = function (peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea notificar el indicador ${indicador_generico_poa.indicador_generico_object.nombre_indicador}?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});
                indicador_generico_poa.send_email_indicador(false, 'indicador poa', 'indicador_generico', indicador_generico_poa.indicador_generico
                    , indicador_generico_poa.indicador_generico_object.nombre_indicador, indicador_generico_poa.indicador_generico_object.departamento
                    , "#indicador_generico_poa", peri, async function () {

                    });
                indicador_generico_poa.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };

    indicador_generico_poa.getTotalVariacion = function () {
        if (indicador_generico_poa.meta_alcanzada.length > 0) {
            var i = 0;
            var meta = 0;
            for (var l = 0; l < indicador_generico_poa.list_indicador_generico_poa.length; l++) {
                meta = eval(`indicador_generico_poa.meta${indicador_generico_poa.list_indicador_generico_poa[l].id}`) ? eval(`indicador_generico_poa.meta${indicador_generico_poa.list_indicador_generico_poa[l].id}`) : 0;

                if (meta.toString() != "") {

                    var d = DSON.OSO(meta.toString().replace(/,/g, '').replace('%', '').replace('$', ''));

                    if (indicador_generico_poa.validar_tipo()) {
                        d = parseInt(d);
                    } else {
                        d = parseFloat(d);
                    }
                    if (indicador_generico_poa.list_indicador_generico_poa[l].periodo <= indicador_generico_poa.periodomaximo || user.periodo_poa < moment(new Date).year()) {
                        i += d;
                    }
                }

            }
            indicador_generico_poa.meta_total_alca = i;
            console.log("total", indicador_generico_poa.meta_total_alca);
            indicador_generico_poa.meta_total_desc = DSON.OSO(indicador_generico_poa.meta_total);
            var result = i - indicador_generico_poa.meta_total;

            var vari = result;
            var icon = "";
            var color = "";
            if (indicador_generico_poa.direccion_meta == 1) {

                icon = "icon-arrow-up7";
                if ((vari || 0) == 0) {
                    color += "gray";
                } else if (vari > 0) {
                    color += "green";
                } else {
                    color += "red";
                }


            } else if (indicador_generico_poa.direccion_meta == 2) {
                icon = "icon-arrow-down7";
                if ((vari || 0) == 0) {
                    color += "gray";
                }
                if (vari < 0) {
                    color += "green";
                } else {
                    color += "red";
                }
            } else if (indicador_generico_poa.direccion_meta == 3) {
                icon = "icon-minus3";
                if ((vari || 0) == 0) {
                    color += "green";
                } else {
                    color += "red";
                }
            }
            indicador_generico_poa.iconfinal = `${icon} text-${color}`;

            if (indicador_generico_poa.tipo_meta == 1) {
                result = indicador_generico_poa.currencyFormat(result) + '%';
                indicador_generico_poa.meta_total_alca = indicador_generico_poa.currencyFormat(indicador_generico_poa.meta_total_alca) + '%';
                indicador_generico_poa.meta_total_desc = indicador_generico_poa.currencyFormat(indicador_generico_poa.meta_total_desc) + '%';
            } else if (indicador_generico_poa.tipo_meta == 4) {
                result = indicador_generico_poa.currencyFormat(result);
                indicador_generico_poa.meta_total_alca = indicador_generico_poa.currencyFormat(indicador_generico_poa.meta_total_alca);
                indicador_generico_poa.meta_total_desc = indicador_generico_poa.currencyFormat(indicador_generico_poa.meta_total_desc);
            } else if (indicador_generico_poa.tipo_meta == 5) {
                result = indicador_generico_poa.currencyFormat(result);
                indicador_generico_poa.meta_total_alca = '$' + indicador_generico_poa.currencyFormat(indicador_generico_poa.meta_total_alca);
                indicador_generico_poa.meta_total_desc = '$' + indicador_generico_poa.currencyFormat(indicador_generico_poa.meta_total_desc);
            } else if (indicador_generico_poa.tipo_meta == 3) {
                result = result < 0 ? result : result;
            }


            return result;

        } else
            return 0;
    };

    indicador_generico_poa.permission = function (indicador, periodo) {
        var exist = indicador_generico_poa.permissions.filter(d => d.indicador == indicador && d.periodo == periodo);
        if (exist.length === 0) {
            return {
                allow: 0,
                debug: "Debido a errores, este período está dañado"
            };
        } else {
            return exist[0];
        }
    };

    indicador_generico_poa.applyMasksy = function (key, ids) {
        var names = "indicador_generico_poa_meta" + indicador_generico_poa.list_indicador_generico_poa[key].id;
        indicador_generico_poa.list_indicador_generico_poa[key].allow = indicador_generico_poa.permission(indicador_generico_poa.indicador_generico, indicador_generico_poa.list_indicador_generico_poa[key].periodo);
        indicador_generico_poa.list_indicador_generico_poa[key].message = indicador_generico_poa.list_indicador_generico_poa[key].allow.debug;
        disabled = indicador_generico_poa.list_indicador_generico_poa[key].allow.allow === 1 ? false : true;

        if (indicador_generico_poa.queries.id) disabled = true;


        if (!disabled) {
            $(`[name=${names}]`).focus();
        }
        ids.push(indicador_generico_poa.list_indicador_generico_poa[key].id);
        $(`[name=${names}]`).addClass("meta_alcanzada");

        if (CONFIG.seguridadindicadores !== "abierta")
            eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[key].id}.disabled = disabled`);
        else {
            indicador_generico_poa.list_indicador_generico_poa[key].allow.allow = 1;
            indicador_generico_poa.list_indicador_generico_poa[key].message = "";
            eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[key].id}.disabled = false`);
        }
        if (indicador_generico_poa.queries.id) {
            indicador_generico_poa.list_indicador_generico_poa[key].allow.allow = 0;
            indicador_generico_poa.list_indicador_generico_poa[key].message = "No puede modificar este registro";
            eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[key].id}.disabled = true`);
        }

        if (indicador_generico_poa.list_indicador_generico_poa[key].allow.sinllegar == 0)
            if (indicador_generico_poa.list_indicador_generico_poa[key].valor_alcanzado === "" || indicador_generico_poa.list_indicador_generico_poa[key].valor_alcanzado === undefined || indicador_generico_poa.list_indicador_generico_poa[key].valor_alcanzado === null) {
                indicador_generico_poa.list_indicador_generico_poa[key].allow.allow = 1;
                indicador_generico_poa.list_indicador_generico_poa[key].message = "";
                eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[key].id}.disabled = false`);
            }
        if (indicador_generico_poa.queries.id) {
            eval(`indicador_generico_poa.form.options.meta${indicador_generico_poa.list_indicador_generico_poa[key].id}.disabled = true`);
        }
    };

    indicador_generico_poa.applyMasks = async function () {
        indicador_generico_poa.loading = true;
        indicador_generico_poa.permissions = await BASEAPI.listp('vw_permission_generico', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        indicador_generico_poa.permissions = indicador_generico_poa.permissions.data;
        var names = '';
        var disabled = false;
        var ids = [];
        indicador_generico_poa.permissionOf = [];
        switch (indicador_generico_poa.tipo_meta) {
            case 1: {
                //percentage
                for (var key in indicador_generico_poa.list_indicador_generico_poa) {
                    await indicador_generico_poa.control.percentage(".subcontainer" + indicador_generico_poa.list_indicador_generico_poa[key].id, "meta" + indicador_generico_poa.list_indicador_generico_poa[key].id, {maxlength: 3}, false, '', " ", false);
                    indicador_generico_poa.applyMasksy(key, ids);
                }
                break;
            }
            case 2: {
                //Indice
                for (var key in indicador_generico_poa.list_indicador_generico_poa) {
                    await indicador_generico_poa.control.indice(".subcontainer" + indicador_generico_poa.list_indicador_generico_poa[key].id, "meta" + indicador_generico_poa.list_indicador_generico_poa[key].id, {
                        maxlength: 1,
                    }, false, '', " ", false);
                    indicador_generico_poa.applyMasksy(key, ids);
                }
                break;
            }
            case 3: {
                //valor_absoluto
                for (var key in indicador_generico_poa.list_indicador_generico_poa) {
                    await indicador_generico_poa.control.valor_absoluto(".subcontainer" + indicador_generico_poa.list_indicador_generico_poa[key].id, "meta" + indicador_generico_poa.list_indicador_generico_poa[key].id, {maxlength: 11}, false, '', " ", false);
                    indicador_generico_poa.applyMasksy(key, ids);
                }
                break;
            }
            case 4: {
                //decimal
                for (var key in indicador_generico_poa.list_indicador_generico_poa) {
                    await indicador_generico_poa.control.decimal(".subcontainer" + indicador_generico_poa.list_indicador_generico_poa[key].id, "meta" + indicador_generico_poa.list_indicador_generico_poa[key].id, {maxlength: 22}, false, '', " ", false);
                    indicador_generico_poa.applyMasksy(key, ids);
                }
                break;
            }
            case 5: {
                ////Dinero
                for (var key in indicador_generico_poa.list_indicador_generico_poa) {
                    await indicador_generico_poa.control.money(".subcontainer" + indicador_generico_poa.list_indicador_generico_poa[key].id, "meta" + indicador_generico_poa.list_indicador_generico_poa[key].id, {maxlength: 22}, false, '', " ", false);
                    indicador_generico_poa.applyMasksy(key, ids);
                }
                break;
            }
            case 6: {
                //integer
                for (var key in indicador_generico_poa.list_indicador_generico_poa) {
                    await indicador_generico_poa.control.integer(".subcontainer" + indicador_generico_poa.list_indicador_generico_poa[key].id, "meta" + indicador_generico_poa.list_indicador_generico_poa[key].id, {maxlength: 11}, false, '', ' ', false);
                    indicador_generico_poa.applyMasksy(key, ids);
                }
                break;
            }

            default: {
            }

        }
        setTimeout(function () {
            MESSAGE.run();
        }, 1000);
        for (var i = 0; i < ids.length; i++) {
            eval(`
            if(typeof ShowCountIndicadorPOA${ids[i]}  !== 'undefined')
                ShowCountIndicadorPOA${ids[i]}(true);
            `);
        }
        $('.modificar').on('click', function () {
            if ($(this).hasClass('permitido') && indicador_generico_poa.condicion_poa == 1) {

                indicador_generico_poa.setPermission('file.upload', true);
                indicador_generico_poa.setPermission('file.download', true);
                indicador_generico_poa.setPermission('file.remove', true);
            } else {
                if (!indicador_generico_poa.asbierto) {
                    indicador_generico_poa.setPermission('file.upload', false);
                    indicador_generico_poa.setPermission('file.download', false);
                    indicador_generico_poa.setPermission('file.remove', false);
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
        setTimeout(() => {
            indicador_generico_poa.loading = false;
            indicador_generico_poa.refreshAngular();
        }, 2000);


    };
    indicador_generico_poa.$scope.$watch('indicador_generico_poa.comentario', function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(indicador_generico_poa, "comentario", rules);
    });
    indicador_generico_poa.$scope.$watch('indicador_generico_poa.producto', function (value) {
        indicador_generico_poa.descripcion = null;
        indicador_generico_poa.departamento_nombre = null;
        indicador_generico_poa.fuente = null;
        indicador_generico_poa.medio_verificacion = null;
        indicador_generico_poa.tipo_meta_nombre = null;
        indicador_generico_poa.direccion_meta_nombre = null;
        indicador_generico_poa.linea_base = null;
        indicador_generico_poa.ano_linea_base = null;
        indicador_generico_poa.metodo_calculo = null;
        indicador_generico_poa.indicador_pei_nombre = null;


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

        if (indicador_generico_poa.form.selected('producto') !== null) {
            indicador_generico_poa.form.producto_id = indicador_generico_poa.form.selected('producto').id;
            indicador_generico_poa.departamento_nombre = indicador_generico_poa.form.selected('producto').departamento + "";
            indicador_generico_poa.range_date = LAN.date(indicador_generico_poa.form.selected('producto').fecha_inicio) + " - " + LAN.date(indicador_generico_poa.form.selected('producto').fecha_fin);
            indicador_generico_poa.ver_estado = indicador_generico_poa.form.selected('producto').estatus;
            indicador_generico_poa.ano = indicador_generico_poa.form.selected('producto').ano;
        } else {
            indicador_generico_poa.departamento_nombre = null;
            indicador_generico_poa.range_date = null;
        }
    });
    indicador_generico_poa.$scope.$watch('indicador_generico_poa.entidad', function (value) {
        indicador_generico_poa.descripcion = null;
        indicador_generico_poa.departamento_nombre = null;
        indicador_generico_poa.fuente = null;
        indicador_generico_poa.medio_verificacion = null;
        indicador_generico_poa.tipo_meta_nombre = null;
        indicador_generico_poa.direccion_meta_nombre = null;
        indicador_generico_poa.linea_base = null;
        indicador_generico_poa.ano_linea_base = null;
        indicador_generico_poa.metodo_calculo = null;
        indicador_generico_poa.indicador_pei_nombre = null;


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

        if (indicador_generico_poa.form.selected('producto') !== null) {
            indicador_generico_poa.form.producto_id = indicador_generico_poa.form.selected('producto').id;
            indicador_generico_poa.departamento_nombre = indicador_generico_poa.form.selected('producto').departamento + "";
            indicador_generico_poa.range_date = LAN.date(indicador_generico_poa.form.selected('producto').fecha_inicio) + " - " + LAN.date(indicador_generico_poa.form.selected('producto').fecha_fin);
            indicador_generico_poa.ver_estado = indicador_generico_poa.form.selected('producto').estatus;
        } else {
            indicador_generico_poa.departamento_nombre = null;
            indicador_generico_poa.range_date = null;
        }
        indicador_generico_poa.entidad = value;
        indicador_generico_poa.load();
    });

    indicador_generico_poa.changeIndicador = function (table) {
        location.href = location.href.split('?')[0] + '?' + table;
    };
    indicador_generico_poa.refreshComments = function () {
        if (!indicador_generico_poa.indicador_generico)
            return;
        BASEAPI.listp('vw_actualizacion_indicador_generico_periodo', {
            limit: 0,
            page: 1,
            orderby: "periodo",
            order: "asc",
            where: [{
                field: "indicador_generico",
                value: indicador_generico_poa.indicador_generico
            }]
        }).then(function (result) {

            for (var data of result.data) {
                indicador_generico_poa.list_indicador_generico_poa.map(d => {
                    if (d.id == data.id) {
                        d.count_comment = data.count_comment;
                        d.comment = data.comment;
                    }
                });
            }
            indicador_generico_poa.refreshAngular();
        });
    };


    indicador_generico_poa.$scope.$watch('indicador_generico_poa.indicador_generico', function (value) {
        if (value != '$NULL' || value != '') {
            // animation.loading(`#tb-custom2`, "", ``, '30');
            indicador_generico_poa.list_indicador_generico_poa = [];
            indicador_generico_poa.meta_alcanzada = [];
            indicador_generico_poa.meta = [];
            indicador_generico_poa.meta_total = 0;

            BASEAPI.listp('vw_actualizacion_indicador_generico_periodo', {
                limit: 0,
                page: 1,
                orderby: "periodo",
                order: "asc",
                where: [{
                    field: "indicador_generico",
                    value: value
                }]
            }).then(function (result) {
                indicador_generico_poa.list_indicador_generico_poa = result.data;
                indicador_generico_poa.periodomaximo = Math.ceil((new Date().getMonth() + 1) / (12 / indicador_generico_poa.list_indicador_generico_poa.length));
                for (var key in result.data) {

                    eval(`indicador_generico_poa.meta${result.data[key].id} = result.data[key].valor_alcanzado`);

                    indicador_generico_poa.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                    if (indicador_generico_poa.list_indicador_generico_poa[key].periodo <= indicador_generico_poa.periodomaximo || user.periodo_poa < moment(new Date).year()) {
                        if (indicador_generico_poa.validar_tipo()) {
                            indicador_generico_poa.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                        } else {
                            indicador_generico_poa.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        }
                    }
                }
                if (indicador_generico_poa.indicador_generico_object != null) {
                    if (indicador_generico_poa.form.selected('indicador_generico') !== null) {
                        indicador_generico_poa.ver_estado = indicador_generico_poa.form.selected('indicador_generico').estatus;
                        indicador_generico_poa.descripcion = indicador_generico_poa.form.selected('indicador_generico').descripcion;
                        indicador_generico_poa.departamento_nombre = indicador_generico_poa.form.selected('indicador_generico').departamento + "";
                        indicador_generico_poa.fuente = indicador_generico_poa.form.selected('indicador_generico').fuente;
                        indicador_generico_poa.medio_verificacion = indicador_generico_poa.form.selected('indicador_generico').medio_verificacion;
                        indicador_generico_poa.linea_base = indicador_generico_poa.form.selected('indicador_generico').linea_base;
                        indicador_generico_poa.ano = indicador_generico_poa.form.selected('indicador_generico').ano;
                        indicador_generico_poa.periodicidad = aacontroldemandofalso.periodicidadBy(indicador_generico_poa.form.selected('indicador_generico').poa_monitoreo).nombre;
                        indicador_generico_poa.ano_linea_base = indicador_generico_poa.form.selected('indicador_generico').ano_linea_base;
                        indicador_generico_poa.metodo_calculo = indicador_generico_poa.form.selected('indicador_generico').metodo_calculo;
                        indicador_generico_poa.indicador_pei_nombre = indicador_generico_poa.form.selected('indicador_generico').indicador_pei_nombre;
                        indicador_generico_poa.departamentoX = `${indicador_generico_poa.form.selected('indicador_generico').producto_name} - ${indicador_generico_poa.form.selected('indicador_generico').departamento_name}`;
                        indicador_generico_poa.form.loadDropDown('departamento_nombre');
                        if (indicador_generico_poa.list_tipo_meta.length > 0) {
                            var selected1 = indicador_generico_poa.list_tipo_meta.filter(information => {
                                if (information.id == indicador_generico_poa.form.selected('indicador_generico').tipo_meta) {
                                    return true;
                                }
                            });

                            indicador_generico_poa.tipo_meta = selected1[0].id;
                            indicador_generico_poa.tipo_meta_nombre = selected1[0].nombre;
                        }
                        if (indicador_generico_poa.list_direccion_meta.length > 0) {
                            var selected2 = indicador_generico_poa.list_direccion_meta.filter(information => {
                                if (information.id == indicador_generico_poa.form.selected('indicador_generico').direccion_meta) {
                                    return true;
                                }
                            });

                            indicador_generico_poa.direccion_meta = selected2[0].id;
                            indicador_generico_poa.direccion_meta_nombre = selected2[0].nombre;
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
                    } else {
                        indicador_generico_poa.departamentoX = "";
                        indicador_generico_poa.refreshAngular();
                    }
                } else {
                    indicador_generico_poa.departamentoX = "";
                    indicador_generico_poa.refreshAngular();
                }
                indicador_generico_poa.refreshAngular();
                setTimeout(() => {
                    if (value) {
                        indicador_generico_poa.applyMasks();
                    }
                }, 100);
                // animation.stoploading(`#tb-custom2`);

            });
        }
    });

    indicador_generico_poa.save_pei_ano = function (indicado, limpi) {
        var updates = false;
        $('.meta_alcanzada').each(function () {
            var id = $(this).attr('name').replace("indicador_generico_poa_meta", "");
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
                var titulo_push = MESSAGE.ieval('planificacion.actializar_indicador_producto_email_titulo_meta_no_cumplida', {field1: indicador_generico_poa.indicador_generico_object.nombre_indicador});
                var cuerpo_push = "El resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                var titulo_email = MESSAGE.ieval('planificacion.actializar_indicador_producto_email_titulo_meta_no_cumplida', {field1: indicador_generico_poa.indicador_generico_object.nombre_indicador});
                var cuerpo_email = "El resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                switch (indicador_generico_poa.direccion_meta) {
                    case 1: {
                        if (LAN.money(indicador_generico_poa.meta_total).value > LAN.money(indicador_generico_poa.meta_total_alca).value) {

                            function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_generico_poa.indicador_generico_object.departamento, {
                                direccion_meta: indicador_generico_poa.direccion_meta_nombre,
                                meta_proyectada_total: indicador_generico_poa.meta_total_desc,
                                meta_alcanzada_total: indicador_generico_poa.meta_total_alca
                            }, null, user.institucion_id)
                        }
                        break;
                    }
                    case 2: {
                        if (LAN.money(indicador_generico_poa.meta_total).value < LAN.money(indicador_generico_poa.meta_total_alca).value) {

                            function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_generico_poa.indicador_generico_object.departamento, {
                                direccion_meta: indicador_generico_poa.direccion_meta_nombre,
                                meta_proyectada_total: indicador_generico_poa.meta_total_desc,
                                meta_alcanzada_total: indicador_generico_poa.meta_total_alca
                            }, null, user.institucion_id)
                        }
                        break;
                    }
                    case 3: {
                        if (LAN.money(indicador_generico_poa.meta_total).value != LAN.money(indicador_generico_poa.meta_total_alca).value) {

                            function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, indicador_generico_poa.indicador_generico_object.departamento, {
                                direccion_meta: indicador_generico_poa.direccion_meta_nombre,
                                meta_proyectada_total: indicador_generico_poa.meta_total_desc,
                                meta_alcanzada_total: indicador_generico_poa.meta_total_alca
                            }, null, user.institucion_id)
                        }
                        break;
                    }
                    default: {
                    }
                }
                if (indicador_generico_poa.meta_alcanzada.length > 0) {
                    var cc = 0;
                    var alcanzados = [];
                    var permitidos = [];
                    $('.meta_alcanzada').each(async function () {
                        var id = $(this).attr('name').replace("indicador_generico_poa_meta", "");
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
                        // updates = !indicador_generico_poa.validate_permissions(indicador_generico_poa.list_indicador_generico_poa[cc].periodo);
                        updates = !indicador_generico_poa.permissionOf[indicador_generico_poa.list_indicador_generico_poa[cc].periodo - 1];

                        if (permitidos.indexOf(id) !== -1) {
                            if (updates || CONFIG.seguridadindicadores === "abierta") {
                                await BASEAPI.updateallp('indicador_generico_periodo', {
                                    "valor_alcanzado": valor === '' || valor === null || valor === undefined ? '' : valor.toString(),
                                    // "comentario": comment,
                                    "updated_at": new date().now(),
                                    'updated_by': indicador_generico_poa.usuario_id,
                                    where: [{
                                        "field": "id",
                                        "value": id
                                    }]
                                });
                                await HISTORY.save('indicador_generico_poa', {cambio: valor.toString(), id: id});
                                await AUDIT.LOGCUSTOM("Trabajar Indicador de producto", 'vw_indicador_generico',
                                    {
                                        indicador: id,
                                        producto: indicador_generico_poa.form.producto_id,
                                        valor_alcanzado: valor.toString(),
                                        actualizado_en: new date().now(),
                                        actualizado_por: indicador_generico_poa.usuario_id
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
                    indicador_generico_poa.producto = "[NULL]";
                    indicador_generico_poa.descripcion = "";
                    indicador_generico_poa.fuente = "";
                    indicador_generico_poa.medio_verificacion = "";
                    indicador_generico_poa.linea_base = "";
                    indicador_generico_poa.ano_linea_base = "";
                    indicador_generico_poa.metodo_calculo = "";
                    indicador_generico_poa.indicador_pei_nombre = "";

                    indicador_generico_poa.form.loadDropDown('producto');
                }

            }
        });
    };
    indicador_generico_poa.cancel_pei_ano = function () {
        SWEETALERT.confirm({
            message: 'Desea cancelar los cambios realizados ?',
            confirm: function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                indicador_generico_poa.list_indicador_generico_poa = [];
                indicador_generico_poa.meta_alcanzada = [];
                animation.loading(`#tb-custom2`, "", ``, '30');
                BASEAPI.listp('vw_actualizacion_indicador_generico_periodo', {
                    limit: 0,
                    page: 1,
                    orderby: "periodo",
                    order: "asc",
                    where: [{
                        field: "indicador_generico",
                        value: indicador_generico_poa.indicador_generico
                    }]
                }).then(function (result) {

                    indicador_generico_poa.list_indicador_generico_poa = result.data;
                    for (var key in result.data) {
                        eval(`indicador_generico_poa.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                        indicador_generico_poa.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                        if (indicador_generico_poa.validar_tipo()) {
                            indicador_generico_poa.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                        } else {
                            indicador_generico_poa.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        }
                    }
                    indicador_generico_poa.producto = "[NULL]";
                    indicador_generico_poa.descripcion = "";
                    indicador_generico_poa.fuente = "";
                    indicador_generico_poa.medio_verificacion = "";
                    indicador_generico_poa.linea_base = "";
                    indicador_generico_poa.ano_linea_base = "";
                    indicador_generico_poa.metodo_calculo = "";
                    indicador_generico_poa.indicador_pei_nombre = "";

                    indicador_generico_poa.form.loadDropDown('producto');
                    indicador_generico_poa.applyMasks();
                    indicador_generico_poa.refreshAngular();
                    animation.stoploading(`#tb-custom2`);
                    SWEETALERT.stop();
                });
            }
        });
    };


    indicador_generico_poa.add_comentario = (data) => new Promise((resolve, reject) => {
        if (indicador_generico_poa.comentario == "") {
            SWEETALERT.show({message: `Debe agregar un comentario.`});
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        } else {
            BASEAPI.insertp('comentarios',
                {
                    "comentario": indicador_generico_poa.comentario,
                    "type": ENUM_2.tipo_comentario.Actualizacion_indicadores_poa_generico,
                    "created_by": user.usuario_id,
                    "value": indicador_generico_poa.ids,
                    "value2": indicador_generico_poa.indicador_generico
                }).then(function (rs) {
                vw_comentarios.refresh();
                indicador_generico_poa.comentario = "";
                indicador_generico_poa.refreshAngular();

                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                // indicador_generico_poa.list_indicador_generico_poa = [];
                // indicador_generico_poa.meta_alcanzada = [];
                animation.loading(`#tb-custom2`, "", ``, '30');
                BASEAPI.listp('vw_actualizacion_indicador_generico_periodo', {
                    limit: 0,
                    page: 1,
                    orderby: "periodo",
                    order: "asc",
                    where: [{
                        field: "indicador_generico",
                        value: indicador_generico_poa.indicador_generico
                    }]
                }).then(function (result) {

                    // indicador_generico_poa.list_indicador_generico_poa = result.data;
                    // for (var key in result.data) {
                    //     eval(`indicador_generico_poa.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                    //     indicador_generico_poa.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;
                    //
                    //     if (indicador_generico_poa.validar_tipo()) {
                    //         indicador_generico_poa.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                    //
                    //     } else {
                    //         indicador_generico_poa.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                    //     }
                    // }
                    //indicador_generico_poa.applyMasks();
                    indicador_generico_poa.refreshAngular();
                    animation.stoploading(`#tb-custom2`);
                    SWEETALERT.stop();

                    //MODAL.close(indicador_generico_poa);
                    indicador_generico_poa.refreshComments();
                    resolve(true);

                });
            });
        }
        resolve(true);
    });
    indicador_generico_poa.openmodalField = function (edit, id) {
        // indicador_generico_poa.commentName = 'metacomment' + name;
        // indicador_generico_poa.commentValue = $(`[name=${indicador_generico_poa.commentName}]`).val();
        indicador_generico_poa.edit = edit;
        indicador_generico_poa.ids = id;
        indicador_generico_poa.comentario = "";
        indicador_generico_poa.modal.modalView("indicador_generico_poa/addcomment", {
            width: 'modal-full',
            header: {
                title: indicador_generico_poa.edit ? `Agregar comentario` : `Ver comentario`,
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
                //         if(indicador_generico_poa.edit){
                //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                //                 '                <i class="position-right"></i>\n' +
                //                 '                </span>\n' +
                //                 '            <button\n' +
                //                 '                   id="btnC"  onclick="MODAL.close(indicador_generico_poa)"  dragonlanguage="" title="MESSAGE.ic(\'mono.cancel\')"\n' +
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
                //                 '                   id="btnC"  onclick="MODAL.close(indicador_generico_poa)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
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
                    //     if($(`[name=${indicador_generico_poa.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_generico_poa.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_generico_poa.commentName}`).hide();
                    //     }
                    // },
                    end: function (data) {
                        indicador_generico_poa.ids = 0;
                    }
                }
            },
        });
    }
    if (indicador_generico_poa.entidadParams)
        indicador_generico_poa.load();
});
