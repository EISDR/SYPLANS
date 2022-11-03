app.controller("filtros_poa", function ($scope, $http, $compile) {
    filtros_poa = this;
    filtros_poa.session = new SESSION().current();
    filtros_poa.group_caracteristica = filtros_poa.session.groups[0].caracteristica;
    filtros_poa.director_general = "DG";
    filtros_poa.LAN = LAN;
    filtros_poa.director_departamental = "DP";
    filtros_poa.analista_de_planificacion = "AP";
    filtros_poa.analista_departamental  = "AD";
    filtros_poa.solo_lectura = "SL";
    filtros_poa.isItComplete = false;
    var paso = true;
    BASEAPI.list('presupuesto_aprobado',{
        where: [
            {
                "field": "poa",
                "operator": "=",
                "value": filtros_poa.session.poa_id
            },
        ]
    },function (res) {
        if (res)
        BASEAPI.list('presupuesto_aprobado',{
            where: [
                {
                    "field": "poa",
                    "operator": "=",
                    "value": filtros_poa.session.poa_id
                },
                {
                    "field":"estatus",
                    "operator":"=",
                    "value":3
                }
            ]
        },function (res2) {
            if (res2 && res.data)
            filtros_poa.isItComplete = (res.data.length == res2.data.length);
        });
    });

    RUNCONTROLLER("filtros_poa", filtros_poa, $scope, $http, $compile);
    TRIGGER.run(filtros_poa);
    RUN_B("filtros_poa", filtros_poa, $scope, $http, $compile);
    BASEAPI.firstp('poa',{where: [{field: 'id', value: new SESSION().current().poa_id}]}).then(function (res) {
        if (res) {
            filtros_poa.estado_poa = '' + res.estado;
            filtros_poa.filtros_poa_inicial = filtros_poa.estado_poa;
        }
    });
    //Esta parte llenará el dropdown dependiendo la información del usuario logueado, si este.
    filtros_poa.triggers.table.after.control = function (data){
        if (paso) {
            if (filtros_poa.group_caracteristica == filtros_poa.analista_departamental || filtros_poa.group_caracteristica == filtros_poa.director_departamental) {
                filtros_poa.departamento = filtros_poa.session.departamento.toString();
                filtros_poa.form.loadDropDown('departamento');
                paso = false;
                filtros_poa.form.options.departamento.disabled = true;
                filtros_poa.refreshAngular();
            }
            else{
                filtros_poa.departamento = "0";
                filtros_poa.form.loadDropDown('departamento');
                paso = false;
            }
        }
        if (data == "poa") {
            if (typeof mega_presupuesto_aprobado != "undefined") {
                if (mega_presupuesto_aprobado) {
                    if (typeof mega_presupuesto_aprobado !== 'not defined') {
                        mega_presupuesto_aprobado.current_poa = filtros_poa.form.selected('poa');
                    }
                }
            }
        }
    };
    //Aquí termina el código
    filtros_poa.$scope.$watch('filtros_poa.poa', function (value) {
        var rules = [];
        filtros_poa.selectQueries["departamento"] = [
            {
                field: 'compania',
                operator: "=",
                value: new SESSION().current().compania_id,
                connector:'OR'
            },
            {
                "field": "compania",
                "operator":'=',
                "value": 0
            }
        ];
        filtros_poa.selectQueries["productos_poa"] = [
            {
                field: 'poa',
                operator: "=",
                value: parseInt(filtros_poa.poa ? filtros_poa.poa : "")
            }
        ];
        filtros_poa.selectQueries["actividades_poa"] = [
                {
                    field: 'poa',
                    operator: "=",
                    value: parseInt(filtros_poa.poa?filtros_poa.poa :"")
                }
            ];
        filtros_poa.form.loadDropDown("departamento");
        filtros_poa.form.loadDropDown("productos_poa");
        filtros_poa.form.loadDropDown("actividades_poa");
        if (typeof mega_presupuesto_aprobado != "undefined") {
            if (mega_presupuesto_aprobado) {
                if (typeof mega_presupuesto_aprobado !== 'not defined') {
                    mega_presupuesto_aprobado.current_poa = filtros_poa.form.selected('poa');
                }
            }
        }
        VALIDATION.validate(filtros_poa, "poa", rules);
        if (typeof mega_comentarios_poa != "undefined") {
            if (mega_comentarios_poa) {
                if (typeof mega_comentarios_poa !== 'not defined') {
                    mega_comentarios_poa.selectQueries["departamento"] = [
                        {
                            field: 'poa',
                            operator: "=",
                            value: parseInt(filtros_poa.poa?filtros_poa.poa :"")
                        }
                    ];
                    mega_comentarios_poa.departamento = filtros_poa.session.departamento.toString();
                    mega_comentarios_poa.form.loadDropDown("departamento");
                    mega_comentarios_poa.refresh();
                }
            }
        }
    });

    filtros_poa.Guardar_click = function () {
        /*if(filtros_poa.estado_poa == filtros_poa.filtros_poa_inicial){
            SWEETALERT.show({
                type:"warning",
                title:"Favor cambiar estado",
                message: " "
            });
            return 0;
        }*/
        SWEETALERT.confirm({
            type: "warning",
            title: "Seguro desea autorizar este presupuesto POA?",
            message:" ",
            confirm: async function () {
                await BASEAPI.updateallp('poa',{
                    'estado' : ENUM_2.poa_estatus.Autorizado,//filtros_poa.estado_poa,
                    where:[{
                        'field':'id',
                        'operator':'=',
                        'value': new SESSION().current().poa_id
                    }]
                });
                filtros_poa.estado_poa = ENUM_2.poa_estatus.Autorizado + "";
                filtros_poa.form.loadDropDown('estado_poa');
            }
        });
    };

    filtros_poa.search_click = function () {
        filtros_pei.cancel_click();
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
    };

    filtros_poa.cancel_click = function() {
        if (filtros_poa.group_caracteristica != filtros_poa.analista_departamental && filtros_poa.group_caracteristica != filtros_poa.director_departamental) {
            filtros_poa.departamento = "0";
            filtros_poa.form.loadDropDown("departamento");
        }
        filtros_poa.productos_poa = "[NULL]";
        filtros_poa.form.loadDropDown("productos_poa");
        filtros_poa.actividades_poa = "[NULL]";
        filtros_poa.form.loadDropDown("actividades_poa");
    };
});