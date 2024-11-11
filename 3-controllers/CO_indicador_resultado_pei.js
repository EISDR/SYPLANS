app.controller("indicador_resultado_pei", function ($scope, $http, $compile) {
    indicador_resultado_pei = this;
    indicador_resultado_pei.plural = "Indicador Resultado PEI";
    indicador_resultado_pei.destroyForm = false;
    var user = new SESSION().current();
    indicador_resultado_pei.group_permitir = user.groups[0] ? user.groups[0].caracteristica : "";
    RUNCONTROLLER("indicador_resultado_pei", indicador_resultado_pei, $scope, $http, $compile);
    RUN_B("indicador_resultado_pei", indicador_resultado_pei, $scope, $http, $compile);
    var animation = new ANIMATION();

    var http = new HTTP();
    indicador_resultado_pei.queries = http.hrefToObj();

    if (indicador_resultado_pei.queries.id) {
        indicador_resultado_pei.indicador_pei = indicador_resultado_pei.queries.id;
    }
    if (typeof vw_dashboard_productosgrid_pei !== "undefined")
        if (vw_dashboard_productosgrid_pei.selectedPEI) {
            indicador_resultado_pei.queries.id = vw_dashboard_productosgrid_pei.selectedPEI;
            indicador_resultado_pei.indicador_pei = vw_dashboard_productosgrid_pei.selectedPEI;
        }
    indicador_resultado_pei.asbierto = CONFIGCOMPANY.carga_evidencia_abierta;
    indicador_resultado_pei.textModal = '';

    var user = new SESSION().current();
    indicador_resultado_pei.userVar = user;
    indicador_resultado_pei.userInfo = user;
    indicador_resultado_pei.usuario_id = user.usuario_id;

    indicador_resultado_pei.currentYear = new Date().getFullYear();

    indicador_resultado_pei.conditionPei = {estatus: user.estatus, pei_id: user.pei_id};

    indicador_resultado_pei.estado = ENUM_2.pei_estatus.Inactivo;

    indicador_resultado_pei.estatus = ENUM_2.pei_estatus.Pendiente_a_autorizar;

    if (user.poa_id) {
        indicador_resultado_pei.headertitle = "Actualización de datos / " + MESSAGE.i('planificacion.title_indicador_resultados_pei') + " / " + user.periodo_pei_msj + " / " + user.periodo_poa_msj;
    } else if (user.pei_id) {
        indicador_resultado_pei.headertitle = "Actualización de datos / " + MESSAGE.i('planificacion.title_indicador_resultados_pei') + " / " + user.periodo_pei_msj;
    } else {
        indicador_resultado_pei.headertitle = "Actualización de datos / " + MESSAGE.i('planificacion.title_indicador_resultados_pei') + " / PEI ";
    }

    getPEIstatus(indicador_resultado_pei, user.pei_id);

    indicador_resultado_pei.getYear = function getYear() {
        return user.periodo_poa;
    };

    indicador_resultado_pei.list_tipo_meta = [];

    indicador_resultado_pei.list_direccion_meta = [];

    BASEAPI.list('tipoMeta', {}, function (result) {
        indicador_resultado_pei.list_tipo_meta = result.data;
    });

    BASEAPI.list('direccionMeta', {}, function (result) {
        indicador_resultado_pei.list_direccion_meta = result.data;
    });


    indicador_resultado_pei.colors = COLOR.secundary;
    indicador_resultado_pei.list_indicador_resultado_pei = [];
    indicador_resultado_pei.meta_alcanzada = [];
    indicador_resultado_pei.meta = [];
    indicador_resultado_pei.meta_total = 0;

    if (!new SESSION().current().intersectorial) {
        indicador_resultado_pei.selectQueries["indicador_pei"] = [
            {
                "field": "compania",
                "value": user.compania_id
            }
        ];
    }
    if (!new SESSION().current().interinstitucional && new SESSION().current().institucion_id) {
        indicador_resultado_pei.selectQueries["indicador_pei"] = [
            {
                "field": "institucion",
                "value": user.institucion_id
            }
        ];
    }

    indicador_resultado_pei.validar_tipo = function () {
        if (indicador_resultado_pei.tipo_meta == 6 || indicador_resultado_pei.tipo_meta == 2 || indicador_resultado_pei.tipo_meta == 3) {
            return 1;
        } else return 0;
    };

    // indicador_resultado_pei.format = function(n, sep, decimals) {
    //     sep = sep || "."; // Default to period as decimal separator
    //     decimals = decimals || 2; // Default to 2 decimals
    //
    //     return n.toLocaleString().split(sep)[0]
    //         + sep
    //         + n.toFixed(decimals).split(sep)[1];
    // };
    indicador_resultado_pei.currencyFormat = function (num) {
        return LAN.money(num).format(true);
    };

    indicador_resultado_pei.formatear = function (a) {
        var c = LAN.money(a).value;
        if (indicador_resultado_pei.tipo_meta == 1) {
            return c + '%';
        } else if (indicador_resultado_pei.tipo_meta == 4) {
            return LAN.money(c).format(false);
        } else if (indicador_resultado_pei.tipo_meta == 5) {
            return LAN.money(c).format(true);
        } else if (indicador_resultado_pei.tipo_meta == 3) {
            return c < 0 ? c : c;
        } else {
            return c;
        }
    };
    indicador_resultado_pei.restar = function (a, b) {
        a = eval(`indicador_resultado_pei.meta${a}`) ? eval(`indicador_resultado_pei.meta${a}`) : 0;

        var c = LAN.money(a).value - LAN.money(b).value;
        if (indicador_resultado_pei.tipo_meta == 1) {
            return c + '%';
        } else if (indicador_resultado_pei.tipo_meta == 4) {
            return LAN.money(c).format(false);
        } else if (indicador_resultado_pei.tipo_meta == 5) {
            return LAN.money(c).format(true);
        } else if (indicador_resultado_pei.tipo_meta == 3) {
            return c;
        } else {
            return c;
        }

        // if(a == null || a == ""){
        //     if(indicador_resultado_pei.validar_tipo()){
        //         return 0 - parseInt(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
        //     }else
        //     {
        //         return 0 - parseFloat(b.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
        //     }
        // }
        // if(b==null || b ==""){
        //     if(indicador_resultado_pei.validar_tipo()){
        //         return 0 - parseInt(a.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
        //     }else
        //     {
        //         return 0 - parseFloat(a.toString().replace(/,/g, '').replace('%', '').replace('$', ''));
        //     }
        // }

        // a =  a.toString().replace(/,/g, '').replace('%', '').replace('$', '');
        // b = b.toString().replace(/,/g, '').replace('%', '').replace('$', '');


        // if(indicador_resultado_pei.tipo_meta == 6 || indicador_resultado_pei.tipo_meta == 2){
        //     a = parseInt(a);
        //     b = parseInt(b);
        //     return  a - b ;
        // }else
        // {
        //     a = parseFloat(a);
        //     b = parseFloat(b);
        //     var c  =  a - b;
        //     if(indicador_resultado_pei.tipo_meta == 1){
        //         return   c.toFixed(2) + '%';
        //     }else if(indicador_resultado_pei.tipo_meta == 4){
        //         return   indicador_resultado_pei.currencyFormat(c);
        //     }
        //     else if(indicador_resultado_pei.tipo_meta == 5) {
        //         return  indicador_resultado_pei.currencyFormat(c);
        //     }else if(indicador_resultado_pei.tipo_meta == 3){
        //         return c < 0 ? c * -1 : c ;
        //     }else {
        //         return c ;
        //     }
        // }
    };


    indicador_resultado_pei.getTotalVariacion = function () {
        if (indicador_resultado_pei.meta_alcanzada.length > 0) {
            var i = 0;
            var meta = 0;
            for (var l = 0; l < indicador_resultado_pei.list_indicador_resultado_pei.length; l++) {
                meta = eval(`indicador_resultado_pei.meta${indicador_resultado_pei.list_indicador_resultado_pei[l].id}`) ? eval(`indicador_resultado_pei.meta${indicador_resultado_pei.list_indicador_resultado_pei[l].id}`) : 0;
                if (meta.toString() != "") {

                    var d = meta.toString().replace(/,/g, '').replace('%', '').replace('$', '');

                    if (indicador_resultado_pei.validar_tipo()) {
                        d = parseInt(d);
                    } else {
                        d = parseFloat(d);
                    }
                    if (indicador_resultado_pei.list_indicador_resultado_pei[l].ano <= new Date().getFullYear()) {

                        i += d;
                        console.log(i);
                    }
                }
            }
            indicador_resultado_pei.meta_total_alca = i;
            indicador_resultado_pei.meta_total_desc = DSON.OSO(indicador_resultado_pei.meta_total);
            var result = i - indicador_resultado_pei.meta_total;

            var vari = result;
            var icon = "";
            var color = "";
            if (indicador_resultado_pei.direccion_meta == 1) {

                icon = "icon-arrow-up7";
                if ((vari || 0) == 0) {
                    color += "gray";
                } else if (vari > 0) {
                    color += "green";
                } else {
                    color += "red";
                }


            } else if (indicador_resultado_pei.direccion_meta == 2) {
                icon = "icon-arrow-down7";
                if ((vari || 0) == 0) {
                    color += "gray";
                }
                if (vari < 0) {
                    color += "green";
                } else {
                    color += "red";
                }
            } else if (indicador_resultado_pei.direccion_meta == 3) {
                icon = "icon-minus3";
                if ((vari || 0) == 0) {
                    color += "green";
                } else {
                    color += "red";
                }
            }
            indicador_resultado_pei.iconfinal = `${icon} text-${color}`;
            if (indicador_resultado_pei.tipo_meta == 1) {
                result = indicador_resultado_pei.currencyFormat(result) + '%';
                indicador_resultado_pei.meta_total_alca = indicador_resultado_pei.currencyFormat(indicador_resultado_pei.meta_total_alca) + '%';
                indicador_resultado_pei.meta_total_desc = indicador_resultado_pei.currencyFormat(indicador_resultado_pei.meta_total_desc) + '%';
            } else if (indicador_resultado_pei.tipo_meta == 4) {
                result = indicador_resultado_pei.currencyFormat(result);
                indicador_resultado_pei.meta_total_alca = indicador_resultado_pei.currencyFormat(indicador_resultado_pei.meta_total_alca);
                indicador_resultado_pei.meta_total_desc = indicador_resultado_pei.currencyFormat(indicador_resultado_pei.meta_total_desc);

            } else if (indicador_resultado_pei.tipo_meta == 5) {
                result = indicador_resultado_pei.currencyFormat(result);
                indicador_resultado_pei.meta_total_alca = '$' + indicador_resultado_pei.currencyFormat(indicador_resultado_pei.meta_total_alca);
                indicador_resultado_pei.meta_total_desc = '$' + indicador_resultado_pei.currencyFormat(indicador_resultado_pei.meta_total_desc);

            } else if (indicador_resultado_pei.tipo_meta == 3) {
                result = result < 0 ? result : result;
            }


            return result;

        } else
            return 0;
    };

    indicador_resultado_pei.permission = function (indicador, periodo) {
        // if (indicador_resultado_pei.indicador_pei_object)
        //     if (indicador_resultado_pei.indicador_pei_object.estatus_pei != ENUM_2.pei_estatus.Autorizado) {
        //         return {
        //             allow: 0,
        //             debug: "El PEI de este indicador aún no está autorizado"
        //         };
        //     }
        var exist = indicador_resultado_pei.permissions.filter(d => d.indicador == indicador && d.periodo == periodo);
        if (exist.length === 0) {
            return {
                allow: 1,
                debug: ""
            };
        } else {
            return exist[0];
        }
    };

    indicador_resultado_pei.send_email_indicador = function (sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, periodo, callback) {
        send_email_indicador(sastifactoria, tipo_indicador, table_indicador, indicador, nombre_indicador, departamento, hash_url, 'indicador_pei_ano', periodo, callback);
    };
    indicador_resultado_pei.notificar = function (peri) {
        SWEETALERT.confirm({
            message: `Está seguro que desea notificar al área de Planificación?`,
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('actions.loading') + "..."});

                indicador_resultado_pei.send_email_indicador(false, 'indicador pei', 'indicador_pei', indicador_resultado_pei.indicador_pei
                    , indicador_resultado_pei.indicador_pei_object.nombre, 1
                    , "#indicador_resultado_pei", peri, async function () {

                    });
                indicador_resultado_pei.refreshAngular();
                SWEETALERT.stop();
            }
        });
    };

    indicador_resultado_pei.applyMasksy = function (key, ids) {
        var names = "indicador_resultado_pei_meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id;
        indicador_resultado_pei.list_indicador_resultado_pei[key].allow = indicador_resultado_pei.permission(indicador_resultado_pei.indicador_pei, indicador_resultado_pei.list_indicador_resultado_pei[key].ano);
        indicador_resultado_pei.list_indicador_resultado_pei[key].message = indicador_resultado_pei.list_indicador_resultado_pei[key].allow.debug;
        disabled = indicador_resultado_pei.list_indicador_resultado_pei[key].allow.allow === 1 ? false : true;

        if (indicador_resultado_pei.queries.id) disabled = true;
        if (indicador_resultado_pei.relacionados.length > 0) disabled = true;

        if (!disabled) {
            $(`[name=${names}]`).focus();
        }
        ids.push(indicador_resultado_pei.list_indicador_resultado_pei[key].id);
        $(`[name=${names}]`).addClass("meta_alcanzada");

        if (!CONFIGCOMPANY.carga_evidencia_abierta) {
            eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = disabled`);
        } else {
            indicador_resultado_pei.list_indicador_resultado_pei[key].allow.allow = 1;
            indicador_resultado_pei.list_indicador_resultado_pei[key].message = "";
            eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = false`);
        }
        if (indicador_resultado_pei.relacionados.length > 0) {
            if (indicador_resultado_pei.list_indicador_resultado_pei[key].allow)
                if (indicador_resultado_pei.list_indicador_resultado_pei[key].allow.allow === 1)
                    indicador_resultado_pei.list_indicador_resultado_pei[key].message = "No puede modificar debido a que este registro tiene indicadores relacionados";
            eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = true`);
        }
        if (indicador_resultado_pei.queries.id) {
            indicador_resultado_pei.list_indicador_resultado_pei[key].allow.allow = 0;
            indicador_resultado_pei.list_indicador_resultado_pei[key].message = "No puede modificar este registro";
            eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = true`);
        }


        if (indicador_resultado_pei.relacionados.length === 0)
            if (indicador_resultado_pei.list_indicador_resultado_pei[key].ano < new Date().getFullYear()) {
                if (
                    eval(`indicador_resultado_pei.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}`) == null ||
                    eval(`indicador_resultado_pei.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}`) === "") {
                    eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = false`);
                }
            }

        if (indicador_resultado_pei.list_indicador_resultado_pei[key].allow.sinllegar == 0)
            if (indicador_resultado_pei.list_indicador_resultado_pei[key].valor_alcanzado === "" || indicador_resultado_pei.list_indicador_resultado_pei[key].valor_alcanzado === undefined || indicador_resultado_pei.list_indicador_resultado_pei[key].valor_alcanzado === null) {
                indicador_resultado_pei.list_indicador_resultado_pei[key].allow.allow = 1;
                indicador_resultado_pei.list_indicador_resultado_pei[key].message = "";
                eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = false`);
            }

        if (indicador_resultado_pei.queries.id) {
            eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = true`);
        }
        if (indicador_resultado_pei.evaluacion_abierta){
            eval(`indicador_resultado_pei.form.options.meta${indicador_resultado_pei.list_indicador_resultado_pei[key].id}.disabled = false`);
            indicador_resultado_pei.list_indicador_resultado_pei[key].allow.allow = 1;
        }
    };
    indicador_resultado_pei.applyMasks = async function () {
        indicador_resultado_pei.permissions = await BASEAPI.listp('vw_permission_pei', {
            limit: 0,
            orderby: "$ compania",
            order: "asc",
            where: [{
                field: "compania",
                value: user.compania_id
            }]
        });
        indicador_resultado_pei.permissions = indicador_resultado_pei.permissions.data;
        var disabled = false;
        var ids = [];
        switch (indicador_resultado_pei.tipo_meta) {
            case 1: {
                //percentage
                for (var key in indicador_resultado_pei.list_indicador_resultado_pei) {
                    disabled = false;
                    await indicador_resultado_pei.control.percentage(".subcontainer" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, "meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, {}, false, '', " ", false);
                    indicador_resultado_pei.applyMasksy(key, ids);
                }
                break;
            }
            case 2: {
                //Indice
                for (var key in indicador_resultado_pei.list_indicador_resultado_pei) {
                    disabled = false;
                    await indicador_resultado_pei.control.indice(".subcontainer" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, "meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, {
                        maxlength: 1,
                    }, false, '', " ", false);
                    indicador_resultado_pei.applyMasksy(key, ids);
                }
                break;
            }
            case 3: {
                //valor_absoluto
                for (var key in indicador_resultado_pei.list_indicador_resultado_pei) {
                    disabled = false;
                    await indicador_resultado_pei.control.valor_absoluto(".subcontainer" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, "meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, {maxlength: 11}, false, '', " ", false);
                    indicador_resultado_pei.applyMasksy(key, ids);
                }
                break;
            }
            case 4: {
                //decimal
                for (var key in indicador_resultado_pei.list_indicador_resultado_pei) {
                    disabled = false;
                    await indicador_resultado_pei.control.decimal(".subcontainer" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, "meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, {maxlength: 22}, false, '', " ", false);

                    indicador_resultado_pei.applyMasksy(key, ids);
                }
                break;
            }
            case 5: {
                ////Dinero
                for (var key in indicador_resultado_pei.list_indicador_resultado_pei) {
                    disabled = false;
                    await indicador_resultado_pei.control.money(".subcontainer" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, "meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, {maxlength: 22}, false, '', " ", false);

                    indicador_resultado_pei.applyMasksy(key, ids);
                }
                break;
            }
            case 6: {
                //integer
                for (var key in indicador_resultado_pei.list_indicador_resultado_pei) {
                    disabled = false;
                    await indicador_resultado_pei.control.integer(".subcontainer" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, "meta" + indicador_resultado_pei.list_indicador_resultado_pei[key].id, {maxlength: 11}, false, '', " ", false);
                    indicador_resultado_pei.applyMasksy(key, ids);
                }
                break;
            }

            default: {

            }

        }

        indicador_resultado_pei.idss = ids;
        for (var j = 1; j <= 5; j++)
            setTimeout(function () {
                for (var i = 0; i < indicador_resultado_pei.idss.length; i++) {
                    eval(`
            if(typeof ShowCountIndicadorPEI${indicador_resultado_pei.idss[i]}  !== 'undefined')
                ShowCountIndicadorPEI${indicador_resultado_pei.idss[i]}(true);
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


        $('.modificar').on('click', function () {
            if ($(this).hasClass('permitido') && (indicador_resultado_pei.condicion_pei == 1)) {
                indicador_resultado_pei.setPermission('file.upload', true);
                indicador_resultado_pei.setPermission('file.download', true);
                indicador_resultado_pei.setPermission('file.remove', true);
            } else {
                indicador_resultado_pei.setPermission('file.upload', false);
                indicador_resultado_pei.setPermission('file.download', false);
                if (indicador_resultado_pei.group_permitir !== ENUM_2.Grupos.director_general) {
                    indicador_resultado_pei.setPermission("file.remove", false);
                } else {
                    indicador_resultado_pei.setPermission("file.remove", true);
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
        indicador_resultado_pei.loaded = true;
    };

    indicador_resultado_pei.$scope.$watch('indicador_resultado_pei.resultado', function (value) {
        indicador_resultado_pei.descripcion = null;
        indicador_resultado_pei.medio_verificacion = null;
        indicador_resultado_pei.tipo_meta = null;
        indicador_resultado_pei.direccion_meta = null;
        indicador_resultado_pei.tipo_meta_nombre = null;
        indicador_resultado_pei.direccion_meta_nombre = null;
        indicador_resultado_pei.metodo_calculo = null;
        indicador_resultado_pei.fuente = null;
        indicador_resultado_pei.linea_base = null;

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

        if (indicador_resultado_pei.form.selected('resultado') !== null) {
            indicador_resultado_pei.resultado_id = indicador_resultado_pei.form.selected('resultado').id;
            indicador_resultado_pei.estrategia_resultado = indicador_resultado_pei.form.selected('resultado').nombre_estrategia;
            setTimeout(function () {
                indicador_resultado_pei.form.options.estrategia_resultado.resizeme();
            }, 100);
        } else {
            indicador_resultado_pei.resultado_estrategia = "";
            indicador_resultado_pei.estrategia_resultado = "";
            setTimeout(function () {
                indicador_resultado_pei.form.options.estrategia_resultado.resizeme();
            }, 100);
        }
    });
    indicador_resultado_pei.$scope.$watch('indicador_resultado_pei.comentario', function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(indicador_resultado_pei, "comentario", rules);
    });

    indicador_resultado_pei.refreshComments = function () {
        if (!indicador_resultado_pei.indicador_pei)
            return;
        BASEAPI.listp('vw_actualizacion_indicador_pei_ano', {
            limit: 0,
            page: 1,
            orderby: "ano",
            order: "asc",
            where: [{
                field: "indicador_pei",
                value: indicador_resultado_pei.indicador_pei
            }]
        }).then(function (result) {

            for (var data of result.data) {
                indicador_resultado_pei.list_indicador_resultado_pei.map(d => {
                    if (d.id == data.id) {
                        d.count_comment = data.count_comment;
                        d.comment = data.comment;
                    }
                });
            }
            indicador_resultado_pei.refreshAngular();
        });
    };

    indicador_resultado_pei.$scope.$watch('indicador_resultado_pei.indicador_pei', function (value) {
        indicador_resultado_pei.loaded = false;

        if (value != '$NULL' || value != '') {
            indicador_resultado_pei.loading = true;
            indicador_resultado_pei.list_indicador_resultado_pei = [];
            indicador_resultado_pei.meta_alcanzada = [];
            indicador_resultado_pei.meta = [];
            indicador_resultado_pei.meta_total = 0;


            BASEAPI.listp('vw_actualizacion_indicador_pei_ano', {
                limit: 0,
                page: 1,
                orderby: "ano",
                order: "asc",
                where: [{
                    field: "indicador_pei",
                    value: value
                }]
            }).then(async function (result) {

                indicador_resultado_pei.cumplidor = await aacontroldemandofalso.cumplimiento(
                    "vw_report_indicadores_pei",
                    baseController.session,
                    "indicador_pei",
                    value);
                indicador_resultado_pei.list_indicador_resultado_pei = result.data;


                for (var key in result.data) {

                    eval(`indicador_resultado_pei.meta${result.data[key].id} = result.data[key].valor_alcanzado`);

                    indicador_resultado_pei.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;

                    if (indicador_resultado_pei.list_indicador_resultado_pei[key].ano <= new Date().getFullYear()) {
                        if (indicador_resultado_pei.validar_tipo()) {

                            indicador_resultado_pei.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                        } else {
                            indicador_resultado_pei.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        }
                    }
                }

                if (indicador_resultado_pei.indicador_pei_object != null) {

                    if (indicador_resultado_pei.form.selected('indicador_pei') !== null) {
                        indicador_resultado_pei.descripcion = indicador_resultado_pei.form.selected('indicador_pei').descripcion;
                        indicador_resultado_pei.fuente = indicador_resultado_pei.form.selected('indicador_pei').fuente;
                        indicador_resultado_pei.ano_linea_base = indicador_resultado_pei.form.selected('indicador_pei').ano_linea_base;
                        indicador_resultado_pei.linea_base = indicador_resultado_pei.form.selected('indicador_pei').linea;
                        indicador_resultado_pei.periodicidad = "Anual";
                        indicador_resultado_pei.metodo_calculo = indicador_resultado_pei.form.selected('indicador_pei').metodo;
                        indicador_resultado_pei.medio_verificacion = indicador_resultado_pei.form.selected('indicador_pei').medio;
                        indicador_resultado_pei.relacionados = [];


                        BASEAPI.list("indicador_poa", {
                            where: [{
                                field: 'indicador_pei',
                                value: indicador_resultado_pei.form.selected('indicador_pei').id
                            }]
                        }, function (data) {
                            if (data)
                                if (data.data) {
                                    indicador_resultado_pei.relacionados = data.data;
                                    indicador_resultado_pei.refreshAngular();
                                }

                        });

                        BASEAPI.first("eje_estrategico", {where: [{value: indicador_resultado_pei.form.selected('indicador_pei').eje_estrategico}]}, function (r) {
                            indicador_resultado_pei.eje_estrategico = r.nombre;
                        });
                        BASEAPI.first("objetivo_estrategico", {where: [{value: indicador_resultado_pei.form.selected('indicador_pei').objetivo_estrategico}]}, function (r) {
                            indicador_resultado_pei.objetivo_estrategico = r.nombre;
                        });
                        BASEAPI.first("estrategia", {where: [{value: indicador_resultado_pei.form.selected('indicador_pei').estrategia}]}, function (r) {
                            indicador_resultado_pei.estrategia = r.nombre;
                        });

                        if (indicador_resultado_pei.list_tipo_meta.length > 0) {
                            var selected1 = indicador_resultado_pei.list_tipo_meta.filter(information => {
                                if (information.id == indicador_resultado_pei.form.selected('indicador_pei').tipo_meta) {
                                    return true;
                                }
                            });

                            indicador_resultado_pei.tipo_meta = selected1[0].id;
                            indicador_resultado_pei.tipo_meta_nombre = selected1[0].nombre;
                        }

                        if (indicador_resultado_pei.list_direccion_meta.length > 0) {
                            var selected2 = indicador_resultado_pei.list_direccion_meta.filter(information => {
                                if (information.id == indicador_resultado_pei.form.selected('indicador_pei').direccion_meta) {
                                    return true;
                                }
                            });

                            indicador_resultado_pei.direccion_meta = selected2[0].id;
                            indicador_resultado_pei.direccion_meta_nombre = selected2[0].nombre;
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
                        indicador_resultado_pei.relacionados = [];
                        indicador_resultado_pei.descripcion = "";
                        indicador_resultado_pei.fuente = "";
                        indicador_resultado_pei.linea_base = "";
                        indicador_resultado_pei.metodo_calculo = "";
                        indicador_resultado_pei.medio_verificacion = "";
                        indicador_resultado_pei.eje_estrategico = "";
                        indicador_resultado_pei.objetivo_estrategico = "";
                        indicador_resultado_pei.estrategia = "";
                        indicador_resultado_pei.tipo_meta = "";
                        indicador_resultado_pei.tipo_meta_nombre = "";
                        indicador_resultado_pei.direccion_meta = "";
                        indicador_resultado_pei.direccion_meta_nombre = "";
                    }
                } else {
                    indicador_resultado_pei.relacionados = [];
                    indicador_resultado_pei.descripcion = "";
                    indicador_resultado_pei.fuente = "";
                    indicador_resultado_pei.linea_base = "";
                    indicador_resultado_pei.metodo_calculo = "";
                    indicador_resultado_pei.medio_verificacion = "";
                    indicador_resultado_pei.eje_estrategico = "";
                    indicador_resultado_pei.objetivo_estrategico = "";
                    indicador_resultado_pei.estrategia = "";
                    indicador_resultado_pei.tipo_meta = "";
                    indicador_resultado_pei.tipo_meta_nombre = "";
                    indicador_resultado_pei.direccion_meta = "";
                    indicador_resultado_pei.direccion_meta_nombre = "";
                }

                indicador_resultado_pei.refreshAngular();
                setTimeout(() => {
                    if (value) {
                        indicador_resultado_pei.applyMasks();
                    }
                }, 300);
                animation.stoploading(`#tb-custom`);

            });
        }
    });

    indicador_resultado_pei.formulary = function (data, mode, defaultData) {
        if (indicador_resultado_pei !== undefined) {

            indicador_resultado_pei.form.schemas.insert = {};
            indicador_resultado_pei.form.schemas.select = {};
            indicador_resultado_pei.form.readonly = {};
            indicador_resultado_pei.createForm(data, mode, defaultData);
        }
    };

    indicador_resultado_pei.save_pei_ano = function (indicado, limpi) {
        var updates = false;
        $('.meta_alcanzada').each(function () {
            var id = $(this).attr('name').replace("indicador_resultado_pei_meta", "");
            if (indicado) {
                if (id == indicado) {
                    if (limpi) {
                        $(this).val("");
                    }
                }
            }
        });
        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
        for (var item of buttons) {
            item.disabled = true;
        }
        if (limpi) {
            return;
        }
        SWEETALERT.confirm({

            message: 'Desea guardar los cambios realizados ?',
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                var titulo_push = MESSAGE.ieval('planificacion.actializar_indicador_pei_email_titulo_meta_no_cumplida', {field1: indicador_resultado_pei.indicador_pei_object.nombre});
                var cuerpo_push = "EL resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                var titulo_email = MESSAGE.ieval('planificacion.actializar_indicador_pei_email_titulo_meta_no_cumplida', {field1: indicador_resultado_pei.indicador_pei_object.nombre});
                var cuerpo_email = "EL resultado de las metas alcanzadas no cumple con el resultado de las metas proyectadas.";
                switch (indicador_resultado_pei.direccion_meta) {
                    case 1: {
                        if (LAN.money(indicador_resultado_pei.meta_total).value > LAN.money(indicador_resultado_pei.meta_total_alca).value) {

                            function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, "", {
                                direccion_meta: indicador_resultado_pei.direccion_meta_nombre,
                                meta_proyectada_total: indicador_resultado_pei.meta_total_desc,
                                meta_alcanzada_total: indicador_resultado_pei.meta_total_alca
                            }, null, user.institucion_id)
                        }
                        break;
                    }
                    case 2: {
                        if (LAN.money(indicador_resultado_pei.meta_total).value < LAN.money(indicador_resultado_pei.meta_total_alca).value) {

                            function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, "", {
                                direccion_meta: indicador_resultado_pei.direccion_meta_nombre,
                                meta_proyectada_total: indicador_resultado_pei.meta_total_desc,
                                meta_alcanzada_total: indicador_resultado_pei.meta_total_alca
                            }, null, user.institucion_id)
                        }
                        break;
                    }
                    case 3: {
                        if (LAN.money(indicador_resultado_pei.meta_total).value != LAN.money(indicador_resultado_pei.meta_total_alca).value) {

                            function_send_email_group_indicadores(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, "", {
                                direccion_meta: indicador_resultado_pei.direccion_meta_nombre,
                                meta_proyectada_total: indicador_resultado_pei.meta_total_desc,
                                meta_alcanzada_total: indicador_resultado_pei.meta_total_alca
                            }, null, user.institucion_id)
                        }
                        break;
                    }
                    default: {
                    }
                }
                if (indicador_resultado_pei.meta_alcanzada.length > 0) {
                    var cc = 0;
                    var alcanzados = [];
                    var permitidos = [];
                    $('.meta_alcanzada').each(function () {

                        var names = $(this).attr('name');
                        var id = $(this).attr('name').replace("indicador_resultado_pei_meta", "");
                        var valor = $(this).val();
                        valor = valor.replace('$', '');
                        console.log(id, indicado);
                        if (indicado) {
                            if (id == indicado) {
                                permitidos.push(id);
                            }

                        } else {
                            permitidos.push(id);

                        }
                        alcanzados.push({id: id, valor: valor});

                        // eval(`
                        // 	 var comment = $('[name="metacomment${cc}"]').val();
                        // `);

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
                        updates = !((indicador_resultado_pei.list_indicador_resultado_pei[cc].ano != indicador_resultado_pei.getYear()) || ((user.estatus == indicador_resultado_pei.estado) || (user.est_pei === indicador_resultado_pei.estatus)));

                        if (permitidos.indexOf(id) !== -1) {
                            if (true) {
                                await BASEAPI.updateallp('indicador_pei_ano', {
                                    "valor_alcanzado": valor === '' || valor === null || valor === undefined ? '' : valor.toString(),
                                    // "comentario": comment,
                                    "updated_at": new date().now(),
                                    'updated_by': indicador_resultado_pei.usuario_id,
                                    where: [{
                                        "field": "id",
                                        "value": id
                                    }]
                                });
                                await HISTORY.save('indicador_resultado_pei', {cambio: valor.toString(), id: id});
                                await AUDIT.LOGCUSTOM("Trabajar Indicador PEI", 'vw_indicador_pei',
                                    {
                                        indicador: id,
                                        resultado_esperado: indicador_resultado_pei.resultado_id,
                                        valor_alcanzado: valor.toString(),
                                        actualizado_en: new date().now(),
                                        actualizado_por: indicador_resultado_pei.usuario_id
                                    });
                            }
                        }
                        cc++;
                    }

                }
                if (!indicado) {
                    indicador_resultado_pei.eje_estrategico = "";
                    indicador_resultado_pei.objetivo_estrategico = "";
                    indicador_resultado_pei.estrategia = "";
                    indicador_resultado_pei.resultado = "[NULL]";
                    indicador_resultado_pei.descripcion = "";
                    indicador_resultado_pei.fuente = "";
                    indicador_resultado_pei.linea_base = "";
                    indicador_resultado_pei.metodo_calculo = "";
                    indicador_resultado_pei.medio_verificacion = "";
                    indicador_resultado_pei.relacionados = [];

                    indicador_resultado_pei.form.loadDropDown('resultado');
                }
                SWEETALERT.stop();
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for (var item of buttons) {
                    item.disabled = false;
                }
                SWEETALERT.show({message: `Registro Guardado Satisfactoriamente`});
                if (!indicado) {
                    location.href = location.href + '?a=' + new Date().getTime();
                }
            }
        });
    };
    indicador_resultado_pei.cancel_pei_ano = function () {
        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
        for (var item of buttons) {
            item.disabled = true;
        }
        SWEETALERT.confirm({
            message: 'Desea cancelar los cambios realizados ?',
            confirm: function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                indicador_resultado_pei.list_indicador_resultado_pei = [];
                indicador_resultado_pei.meta_alcanzada = [];
                animation.loading(`#tb-custom`, "", ``, '30');
                BASEAPI.listp('vw_actualizacion_indicador_pei_ano', {
                    limit: 0,
                    page: 1,
                    orderby: "ano",
                    order: "asc",
                    where: [{
                        field: "indicador_pei",
                        value: indicador_resultado_pei.indicador_pei
                    }]
                }).then(function (result) {
                    indicador_resultado_pei.list_indicador_resultado_pei = result.data;
                    for (var key in result.data) {
                        eval(`indicador_resultado_pei.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                        indicador_resultado_pei.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;
                        if (indicador_resultado_pei.validar_tipo()) {

                            indicador_resultado_pei.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;

                        } else {
                            indicador_resultado_pei.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                        }
                    }


                    indicador_resultado_pei.eje_estrategico = "";
                    indicador_resultado_pei.objetivo_estrategico = "";
                    indicador_resultado_pei.estrategia = "";
                    indicador_resultado_pei.resultado = "[NULL]";
                    indicador_resultado_pei.descripcion = "";
                    indicador_resultado_pei.fuente = "";
                    indicador_resultado_pei.linea_base = "";
                    indicador_resultado_pei.metodo_calculo = "";
                    indicador_resultado_pei.medio_verificacion = "";
                    indicador_resultado_pei.relacionados = [];
                    var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    indicador_resultado_pei.form.loadDropDown('resultado');
                    indicador_resultado_pei.applyMasks();
                    indicador_resultado_pei.refreshAngular();
                    animation.stoploading(`#tb-custom`);
                    SWEETALERT.stop();

                });
            }
        });
    };

    indicador_resultado_pei.add_comentario = (data) => new Promise((resolve, reject) => {
        if (indicador_resultado_pei.comentario == "") {
            SWEETALERT.show({message: `Debe agregar un comentario.`});
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        } else {
            BASEAPI.insertp('comentarios',
                {
                    "comentario": indicador_resultado_pei.comentario,
                    "type": ENUM_2.tipo_comentario.Actualizacion_indicadores_pei,
                    "created_by": user.usuario_id,
                    "value": indicador_resultado_pei.ids,
                    "value2": indicador_resultado_pei.indicador_pei
                }).then(function (rs) {
                vw_comentarios.refresh();
                indicador_resultado_pei.comentario = "";
                indicador_resultado_pei.refreshAngular();

                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                // indicador_resultado_pei.list_indicador_resultado_pei = [];
                // indicador_resultado_pei.meta_alcanzada = [];
                animation.loading(`#tb-custom`, "", ``, '30');
                BASEAPI.listp('vw_actualizacion_indicador_pei_ano', {
                    limit: 0,
                    page: 1,
                    orderby: "ano",
                    order: "asc",
                    where: [{
                        field: "indicador_pei",
                        value: indicador_resultado_pei.indicador_pei
                    }]
                }).then(function (result) {
                    vw_comentarios.refresh();
                    // indicador_resultado_pei.list_indicador_resultado_pei = result.data;
                    // for (var key in result.data) {
                    //     eval(`indicador_resultado_pei.meta${result.data[key].id} = result.data[key].valor_alcanzado`);
                    //     indicador_resultado_pei.meta_alcanzada[key] = result.data[key].valor_alcanzado ? result.data[key].valor_alcanzado : 0;
                    //     if (indicador_resultado_pei.validar_tipo()) {
                    //
                    //         indicador_resultado_pei.meta_total += result.data[key].valor ? parseInt(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                    //
                    //     } else {
                    //         indicador_resultado_pei.meta_total += result.data[key].valor ? parseFloat(result.data[key].valor.replace(/,/g, '').replace('%', '').replace('$', '')) : 0;
                    //     }
                    // }
                    //indicador_resultado_pei.applyMasks();
                    indicador_resultado_pei.refreshComments();
                    indicador_resultado_pei.refreshAngular();
                    animation.stoploading(`#tb-custom`);
                    SWEETALERT.stop();
                    SWEETALERT.show({
                        message: "Ha sido guardado su comentario",
                        confirm: function () {
                            MODAL.closeAll();
                        }
                    });
                    //MODAL.close(indicador_resultado_pei);
                    resolve(true);

                });
            });
        }
        resolve(true);
    });
    indicador_resultado_pei.openmodalField = function (edit, id, value2) {
        // indicador_resultado_pei.commentName = 'metacomment' + name;
        // indicador_resultado_pei.commentValue = $(`[name=${indicador_resultado_pei.commentName}]`).val();
        indicador_resultado_pei.edit = edit;
        indicador_resultado_pei.ids = id;
        indicador_resultado_pei.value2 = value2;
        indicador_resultado_pei.comentario = "";
        indicador_resultado_pei.refreshAngular();
        indicador_resultado_pei.modal.modalView("indicador_resultado_pei/addcomment", {
            width: 'modal-full',
            header: {
                title: indicador_resultado_pei.edit ? `Agregar comentario` : `Ver comentarios`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                // show: {
                //     begin: function (data) {
                //
                //     },
                //     end: function (data) {
                //         if(indicador_resultado_pei.edit){
                //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                //                 '                <i class="position-right"></i>\n' +
                //                 '                </span>\n' +
                //                 '            <button\n' +
                //                 '                   id="btnC"  onclick="MODAL.close(indicador_resultado_pei)" dragonlanguage="" title="MESSAGE.ic(\'mono.cancel\')"\n' +
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
                //                 '                   id="btnC" onclick="MODAL.close(indicador_resultado_pei)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
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
                    //     if($(`[name=${indicador_resultado_pei.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_resultado_pei.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_resultado_pei.commentName}`).hide();
                    //     }
                    // },
                    end: function (data) {
                        indicador_resultado_pei.ids = 0;
                    }
                }
            },
        });
    }


});
