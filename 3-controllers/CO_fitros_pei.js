app.controller("filtros_pei", function ($scope, $http, $compile) {
    filtros_pei = this;
    var session = new SESSION().current();
    filtros_pei.session = session;
    filtros_pei.group_caracteristica = filtros_pei.session.groups[0] ? filtros_pei.session.groups[0].caracteristica : "";
    filtros_pei.director_general = ENUM_2.Grupos.director_general;
    filtros_pei.LAN = LAN;
    TRIGGER.run(filtros_pei);
    RUNCONTROLLER("filtros_pei", filtros_pei, $scope, $http, $compile);

    filtros_pei.isItComplete = false;
    RUN_B("filtros_pei", filtros_pei, $scope, $http, $compile);

    filtros_pei.$scope.$watch('filtros_pei.pei', function (value) {
        var rules = [];
        if (value != "[NULL]") {
            if (typeof filtros_poa != "undefined") {
                if (filtros_poa) {
                    if (typeof filtros_poa !== 'not defined') {
                        filtros_poa.selectQueries ["poa"] = [
                            {
                                "field": "pei_id",
                                "value": value ? value : 0
                            }
                        ];
                        if(session.poa_id){
                            filtros_poa.poa = session.poa_id + "";
                        }else {
                            BASEAPI.firstp("vw_poa", {
                                order: "asc",
                                orderby: "periodo_poa",
                                where: [
                                    {
                                        field: "pei_id",
                                        value: filtros_pei.pei
                                    }
                                ]
                            }).then(function (res) {
                                filtros_poa.poa = res ? res.id + "" : "[NULL]";
                            });
                        }
                        filtros_poa.form.loadDropDown('poa');
                    }
                }
            }
        }
        filtros_pei.selectQueries["eje_estrategico_pei"] = [
            {
                field: 'pei',
                operator: "=",
                value: parseInt(filtros_pei.pei ? filtros_pei.pei : "")
            }
        ];
        filtros_pei.selectQueries["objetivo_estrategico_pei"] = [
            {
                field: 'pei_id',
                operator: "=",
                value: parseInt(filtros_pei.pei ? filtros_pei.pei : "")
            }
        ];
        filtros_pei.selectQueries["estrategia_pei"] = [
            {
                field: 'pei_id',
                operator: "=",
                value: parseInt(filtros_pei.pei ? filtros_pei.pei : "")
            }
        ];
        filtros_pei.selectQueries["resultado_pei"] = [
            {
                field: 'pei',
                operator: "=",
                value: parseInt(filtros_pei.pei ? filtros_pei.pei : "")
            }
        ];
        filtros_pei.form.loadDropDown("eje_estrategico_pei");
        filtros_pei.form.loadDropDown("objetivo_estrategico_pei");
        filtros_pei.form.loadDropDown("estrategia_pei");
        filtros_pei.form.loadDropDown("resultado_pei");
        VALIDATION.validate(filtros_pei, "pei", rules);
        if (typeof mega_comentarios_pei != "undefined") {
            if (mega_comentarios_pei) {
                if (typeof mega_comentarios_pei !== 'not defined') {
                    mega_comentarios_pei.fixFilters = [
                        {
                            "field": "type",
                            "value": 1
                        },
                        {
                            "field": "value2",
                            "value": parseInt(filtros_pei.pei ? filtros_pei.pei : "")
                        }
                    ];
                    mega_comentarios_pei.refresh();
                }
            }
        }
    });
    BASEAPI.firstp('pei', {where: [{field: 'id', value: new SESSION().current().pei_id}]}).then(function (res) {
        filtros_pei.estado_pei = '' + res.estatus;
        filtros_pei.filtros_pei_inicial = filtros_pei.estado_pei;
        filtros_pei.pei_activo = res.activo;
        filtros_pei.isItComplete = (filtros_pei.filtros_pei_inicial == ENUM_2.pei_estatus.Pendiente_a_autorizar);
    });
    //
    filtros_pei.mostrar = function(){
        return ((filtros_pei.estado_pei!=4) && megaconsulta.allow(['authorize_pei']));
    };
    filtros_pei.mostrar_desautorizar = function(){
        return ((filtros_pei.estado_pei==4) && megaconsulta.allow(['authorize_pei']));
    };
    filtros_pei.Guardar_click = function () {
        SWEETALERT.confirm({
            type: "warning",
            title: "Seguro desea autorizar el PEI actual?",
            message: " ",
            confirm: async function () {
                if (filtros_pei.pei_activo === ENUM_2.pei_estatus.Activo){
                    await BASEAPI.updateallp('pei', {
                        'estatus': ENUM_2.pei_estatus.Autorizado,//filtros_pei.estado_pei,
                        where: [{
                            'field': 'id',
                            'operator': '=',
                            'value': session.pei_id
                        }]
                    });
                    await BASEAPI.firstp("vw_pei", {
                        where: [{
                            'field': 'id',
                            'operator': '=',
                            'value': session.pei_id
                        }]
                    }).then(function(result){
                        filtros_pei.pei_nuevo = result;
                        delete filtros_pei.pei_nuevo['estatus_id'];
                        delete filtros_pei.pei_nuevo['haspoa'];
                        delete filtros_pei.pei_nuevo['activo'];
                        delete filtros_pei.pei_nuevo['compania'];
                        console.log(filtros_pei.pei_nuevo);
                    });
                    await AUDIT.LOGCUSTOM("Autorizar PEI", "vw_pei", filtros_pei.pei_nuevo);
                    await AUDIT.LOGCUSTOM("Autorizar PEI", "pei", filtros_pei.pei_nuevo);
                    filtros_pei.estado_pei = ENUM_2.pei_estatus.Autorizado + "";
                    filtros_pei.form.loadDropDown('estado_pei');

                    var titulo = `Se ha autorizado el PEI correspondiente al período "${session.periodo_pei_msj}"`;
                    var cuerpo =  `.Se ha autorizado el PEI correspondiente al período "${session.periodo_pei_msj}", puede proceder a trabajar con su planificación anual.`;
                    function_send_email_group(titulo,cuerpo,titulo,cuerpo,session.compania_id,null,null,session.institucion_id);
                } else {
                    SWEETALERT.show({message: "No existe un Plan Estrategico Institucional activo"});
                }
            }
        });
    };
    filtros_pei.Desautorizar_click = function () {
        SWEETALERT.confirm({
            type: "warning",
            title: "Seguro desea desautorizar el PEI actual?",
            message: " ",
            confirm: async function () {
                if (filtros_pei.pei_activo === ENUM_2.pei_estatus.Activo){
                    await BASEAPI.updateallp('pei', {
                        'estatus': ENUM_2.pei_estatus.Pendiente_a_autorizar,//filtros_pei.estado_pei,
                        where: [{
                            'field': 'id',
                            'operator': '=',
                            'value': session.pei_id
                        }]
                    });
                    await BASEAPI.firstp("vw_pei", {
                        where: [{
                            'field': 'id',
                            'operator': '=',
                            'value': session.pei_id
                        }]
                    }).then(function(result){
                        filtros_pei.pei_nuevo = result;
                        delete filtros_pei.pei_nuevo['estatus_id'];
                        delete filtros_pei.pei_nuevo['haspoa'];
                        delete filtros_pei.pei_nuevo['activo'];
                        delete filtros_pei.pei_nuevo['compania'];
                        console.log(filtros_pei.pei_nuevo);
                    });
                    await AUDIT.LOGCUSTOM("Desautorizar PEI", "vw_pei", filtros_pei.pei_nuevo);
                    await AUDIT.LOGCUSTOM("Desautorizar PEI", "pei", filtros_pei.pei_nuevo);
                    filtros_pei.estado_pei = ENUM_2.pei_estatus.Pendiente_a_autorizar + "";
                    filtros_pei.form.loadDropDown('estado_pei');

                    var titulo = `Se ha desautorizado el PEI correspondiente al período "${session.periodo_pei_msj}"`;
                    var cuerpo =  `.Se ha desautorizado el PEI correspondiente al período "${session.periodo_pei_msj}", puede volver a proceder a trabajar con su planificación institucional.`;
                    function_send_email_group(titulo,cuerpo,titulo,cuerpo,session.compania_id,null,null,session.institucion_id);
                } else {
                    SWEETALERT.show({message: "No existe un Plan Estrategico Institucional activo"});
                }
            }
        });
    };
    filtros_pei.search_click = function () {
        filtros_poa.cancel_click();
        mega_ejeestrategico.filter_ejeestrategico().then(function (res) {
            if (res == 1) {
                mega_ejeestrategico.refresh();
            }
        });
        mega_objetivoestrategico.filter_objetivoestrategico().then(function (res) {
            if (res == 1) {
                mega_objetivoestrategico.refresh();
            }
        });
        mega_estrategia.filter_estrategia().then(function (res) {
            if (res == 1) {
                mega_estrategia.refresh();
            }
        });
        mega_resultado_esperado.filter_resultado_esperado().then(function (res) {
            if (res == 1) {
                mega_resultado_esperado.refresh();
            }
        });
        mega_indicadores_pei.filter_mega_indicadores_pei().then(function (res) {
            if (res == 1) {
                mega_indicadores_pei.refresh();
            }
        });
        if (typeof mega_indicadores_pei != "undefined") {
            if (mega_indicadores_pei) {
                if (typeof mega_indicadores_pei !== 'not defined') {
                    mega_indicadores_pei.user = filtros_pei.form.selected('pei') ? filtros_pei.form.selected('pei') : new  SESSION().current();
                    mega_indicadores_pei.colspan = ((mega_indicadores_pei.user.periodo_hasta - mega_indicadores_pei.user.periodo_desde) + 1) * 3;
                    mega_indicadores_pei.anolist = [];
                    for (var a = mega_indicadores_pei.user.periodo_desde; a <= mega_indicadores_pei.user.periodo_hasta; a++){
                        mega_indicadores_pei.anolist.push({ano: a});
                    }
                    mega_indicadores_pei.colpad = [];
                    var rs_pad = mega_indicadores_pei.colspan, count_pda = 0,
                        arr_pad = ['P','A','D'];
                    for(var i=0; i < rs_pad; i++) {
                        mega_indicadores_pei.colpad.push(arr_pad[count_pda]);
                        count_pda += 1;
                        if (count_pda > 2) {
                            count_pda = 0;
                        }
                    }
                }
            }
        }
        if (typeof mega_indicadores_poa != "undefined") {
            if (mega_indicadores_poa) {
                if (typeof mega_indicadores_poa !== 'not defined') {
                    mega_indicadores_poa.user = filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa') : new  SESSION().current();
                    mega_indicadores_poa.colspan =  mega_indicadores_poa.user.cantidad * 3;
                    mega_indicadores_poa.periodolist = [];
                    for (var p = 1; p <= mega_indicadores_poa.user.cantidad; p++){
                        mega_indicadores_poa.periodolist.push({periodo: mega_indicadores_poa.user.monitoreo_nombre + ' ' + p});
                    }
                    mega_indicadores_poa.colpad = [];
                    var rs_pad = mega_indicadores_poa.colspan, count_pda = 0,
                        arr_pad = ['P','A','D'];
                    for(var i=0; i < rs_pad; i++) {
                        mega_indicadores_poa.colpad.push(arr_pad[count_pda]);
                        count_pda += 1;
                        if (count_pda > 2) {
                            count_pda = 0;
                        }
                    }
                }
            }
        }
        if (typeof vw_mega_indicadores_actividad != "undefined") {
            if (vw_mega_indicadores_actividad) {
                if (typeof vw_mega_indicadores_actividad !== 'not defined') {
                    vw_mega_indicadores_actividad.user = filtros_poa.form.selected('poa') ? filtros_poa.form.selected('poa') : new SESSION().current();
                    vw_mega_indicadores_actividad.colspan = vw_mega_indicadores_actividad.user.cantidad * 3;
                    vw_mega_indicadores_actividad.periodolist = [];
                    for (var p = 1; p <= vw_mega_indicadores_actividad.user.cantidad; p++) {
                        vw_mega_indicadores_actividad.periodolist.push({periodo: vw_mega_indicadores_actividad.user.monitoreo_nombre + ' ' + p});
                    }
                    vw_mega_indicadores_actividad.colpad = [];
                    var rs_pad = vw_mega_indicadores_actividad.colspan, count_pda = 0,
                        arr_pad = ['P', 'A', 'D'];
                    console.log(rs_pad, arr_pad, "a ver que diablos trae");
                    for (var i = 0; i < rs_pad; i++) {
                        vw_mega_indicadores_actividad.colpad.push(arr_pad[count_pda]);
                        count_pda += 1;
                        if (count_pda > 2) {
                            count_pda = 0;
                        }
                    }
                }
            }
        }

        mega_presupuesto_aprobado.filter_mega_presupuesto_aprobado().then(function (res) {
            if (res == 1) {
                mega_presupuesto_aprobado.refresh();
            }
        });
        mega_producto.filter_mega_producto().then(function(res){
            if(res == 1) {
                mega_producto.refresh();
            }
        });
        mega_actividades.filter_mega_actividades().then(function (res) {
            if (res == 1) {
                mega_actividades.refresh();
            }
        });
        mega_actividades_asociadas.filter_mega_actividades_asociadas().then(function (res) {
            if (res == 1) {
                mega_actividades_asociadas.refresh();
            }
        });
        mega_indicadores_poa.filter_mega_indicadores_poa().then(function (res) {
            if (res == 1) {
                mega_indicadores_poa.refresh();
            }
        });
        vw_mega_indicadores_actividad.filter_vw_mega_indicadores_actividad().then(function (res) {
            if (res == 1) {
                vw_mega_indicadores_actividad.refresh();
            }
        });
    };

    filtros_pei.cancel_click = function () {
        filtros_pei.eje_estrategico_pei = "[NULL]";
        filtros_pei.form.loadDropDown("eje_estrategico_pei");
        filtros_pei.objetivo_estrategico_pei = "[NULL]";
        filtros_pei.form.loadDropDown("objetivo_estrategico_pei");
        filtros_pei.estrategia_pei = "[NULL]";
        filtros_pei.form.loadDropDown("estrategia_pei");
        filtros_pei.resultado_pei = "[NULL]";
        filtros_pei.form.loadDropDown("resultado_pei");
    };

    filtros_pei.triggers.table.after.control = function (data) {
        if (data === "pei") {
            filtros_pei.pei  = filtros_pei.session.pei_id + "";
            filtros_pei.refreshAngular();
        }
        if (data === "estado_pei") {
            // if (filtros_pei.filtros_pei_inicial == "4") {
            filtros_pei.form.options.estado_pei.disabled = true;
            filtros_pei.refreshAngular();
            // }
        }
    };
});
