app.controller("mega_indicadores_pei", function ($scope, $http, $compile) {
    //
    mega_indicadores_pei = this;
    mega_indicadores_pei.LAN = LAN;
    mega_indicadores_pei.destroyForm = false;
    mega_indicadores_pei.set_title = function (column) {
        switch(column) {
            case "P":
                return "Proyectado";
                break;
            case "A":
                return "Alcanzado";
                break;
            case "D":
                return "Diferencia";
                break;
        }
    };

    mega_indicadores_pei.list_comment = [];
    mega_indicadores_pei.nameC= "";
    BASEAPI.list('tipoMeta', {
    }, function (rsm) {
        mega_indicadores_pei.list_tipo_meta = rsm.data;
    });
    BASEAPI.list('direccionMeta', {
    }, function (rsd) {
        mega_indicadores_pei.list_direccion_meta = rsd.data;
    });

    mega_indicadores_pei.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "0"
        }
    ];
    mega_indicadores_pei.filter_mega_indicadores_pei = () => new Promise( async (resolve, reject)=> {
        mega_indicadores_pei.fixFilters = [];
        mega_indicadores_pei.fixFilters = [
            {
                field: 'pei',
                operator: "=",
                value: filtros_pei.pei
            }
        ];
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_indicadores_pei.fixFilters.push(
                {
                    field: 'id_eje_estrategico',
                    operator: '=',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_indicadores_pei.fixFilters.push(
                {
                    field: 'id_objetivo_estrategico',
                    operator: '=',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_indicadores_pei.fixFilters.push(
                {
                    field: 'id_estrategia',
                    operator: '=',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            mega_indicadores_pei.fixFilters.push(
                {
                    field: 'id_resultado',
                    operator: '=',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (parseInt(filtros_poa.departamento) > 0) {
            var id_mega_indicadores_pei_departamento = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_departamento",
                    operator: "=",
                    value: filtros_poa.departamento
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    id_mega_indicadores_pei_departamento.push(res.data[i].id_resultado);
                }
            });
            if(id_mega_indicadores_pei_departamento.length > 0){
                mega_indicadores_pei.fixFilters.push(
                    {
                        field: 'id_resultado',
                        value: id_mega_indicadores_pei_departamento
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            var vw_mega_indicadores_pei = await BASEAPI.firstp("vw_productos_poa_detalles_mega", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.productos_poa
                }]
            });
            if(vw_mega_indicadores_pei){
                mega_indicadores_pei.fixFilters.push(
                    {
                        field: 'id_resultado',
                        operator: '=',
                        value: vw_mega_indicadores_pei.id_resultado
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_indicadores_pei = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if(vw_mega_indicadores_pei){
                mega_indicadores_pei.fixFilters.push(
                    {
                        field: 'id_resultado',
                        operator: '=',
                        value: vw_mega_indicadores_pei.id_resultado
                    }
                );
            }
        }
        resolve (1);
    });

    RUNCONTROLLER("mega_indicadores_pei", mega_indicadores_pei, $scope, $http, $compile);
    mega_indicadores_pei.setPermission("export", true);
    mega_indicadores_pei.triggers.table.after.load = async function (records) {
        $('.has-colspan').attr('rowspan',3);
        $('.has-colspan').css('vertical-align','middle');
        BASEAPI.listp('vw_indicador_pei_ano', {
            limit: 0,
            where: [{
                field: "pei",
                value: mega_indicadores_pei.user ? mega_indicadores_pei.user.pei_id: -1
            }]
        }).then(function (rs) {
            if(rs){
                if(rs.data.length >0) {
                    mega_indicadores_pei.pei_periodo = rs.data;
                    for(var c = mega_indicadores_pei.user.periodo_desde; c <= mega_indicadores_pei.user.periodo_hasta; c++) {
                        for (var l = 0; l < mega_indicadores_pei.records.data.length; l++) {
                            selected = mega_indicadores_pei.pei_periodo.filter(information => {
                                if (information.indicador_pei == mega_indicadores_pei.records.data[l].id && information.ano == c) {
                                    return true;
                                }
                            });
                            eval(`
                                if( typeof mega_indicadores_pei.records.data[${l}].ano == 'undefined'){
                                    mega_indicadores_pei.records.data[${l}].ano = [];
                                }
                            `);
                            if(selected.length > 0){
                                eval(`mega_indicadores_pei.records.data[${l}].ano.push("${selected[0].valor}")`);
                                eval(`mega_indicadores_pei.records.data[${l}].ano.push("${selected[0].valor_alcanzado}")`);
                                eval(`mega_indicadores_pei.records.data[${l}].ano.push("${selected[0].varianzas}")`);
                            }else{
                                eval(`mega_indicadores_pei.records.data[${l}].ano.push("")`);
                                eval(`mega_indicadores_pei.records.data[${l}].ano.push("")`);
                                eval(`mega_indicadores_pei.records.data[${l}].ano.push("")`);
                            }

                        }
                    }
                    mega_indicadores_pei.refreshAngular();
                }
            }
        });
    };

    RUN_B("mega_indicadores_pei", mega_indicadores_pei, $scope, $http, $compile);
    mega_indicadores_pei.textModal = '';
    mega_indicadores_pei.singular = MESSAGE.i('planificacion.title_mega_indicadores_pei');
    mega_indicadores_pei.plural = MESSAGE.i('planificacion.title_mega_indicadores_pei');
    mega_indicadores_pei.headertitle = MESSAGE.i('planificacion.title_mega_indicadores_pei');
    mega_indicadores_pei.formulary = function (data, mode, defaultData) {
        if (mega_indicadores_pei !== undefined) {
            RUN_B("mega_indicadores_pei", mega_indicadores_pei, $scope, $http, $compile);
            mega_indicadores_pei.createForm(data, mode, defaultData);
        }
    };

    mega_indicadores_pei.countUpload = async function(ids){
        var animation = new ANIMATION();
        animation.loading(`#PeiComment`, "Por favor espere ", ``, '300');
        for (var i = 0; i < ids.length; i++){
            await mega_indicadores_pei.control.file(".container" + ids[i] ,'IndicadorPEI' + ids[i], {label:'Ver Evidencias', maxfiles: 50,
                columns: 4,
                folder:"indicador_resultado_pei/META" + ids[i],
                truetext:'Ver Evidencias',
                alone:true
            }, false, '', " ", false);
            eval(`
                if(typeof ShowCountIndicadorPEI${ids[i]} != 'undefined'){
                    ShowCountIndicadorPEI${ids[i]}(true);
                }
           
            `);
        }
        animation.stoploading(`#PeiComment`, ``);
    };

    mega_indicadores_pei.openmodalField = async function (value, value2) {
        mega_indicadores_pei.list_comment = [];
        mega_indicadores_pei.ids = [];
        mega_indicadores_pei.nameC= value2;
        mega_indicadores_pei.list_comment = await  BASEAPI.listp("vw_mega_indicador_pei_ano", {
            where: [
                {
                    field: "indicador_pei",
                    operator: "=",
                    value: value
                }
            ]
        });
        mega_indicadores_pei.list_comment = mega_indicadores_pei.list_comment.data;

        mega_indicadores_pei.list_comment.forEach((row) =>{
            mega_indicadores_pei.ids.push(row.id);
        });
        var animationCRUD = new ANIMATION();
        animationCRUD.stoploading(`#mega_indicadores_peiTablePanel`,  ``);
        mega_indicadores_pei.modal.modalView("mega_indicadores_pei/comment", {
            width: 'modal-full',
            header: {
                title: `Comentarios: ${mega_indicadores_pei.nameC}` ,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }

    mega_indicadores_pei.openCommentModal = function (id, periodo) {
        mega_indicadores_pei.ids2 = id;
        mega_indicadores_pei.periodo = periodo;
        mega_indicadores_pei.modal.modalView("mega_indicadores_pei/show_commen", {
            width: 'modal-full',
            header: {
                title: `Ver comentarios`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                show: {
                    // end: function (data) {
                        // $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                        //     '                <i class="position-right"></i>\n' +
                        //     '                </span>\n' +
                        //     '            <button\n' +
                        //     '                   id="btnCM" onclick="MODAL.close(mega_indicadores_pei)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
                        //     '                    type="button" class="btn bg-secundary btn-labeled btn-xs pull-right"\n' +
                        //     '                    >\n' +
                        //     '                <b><i class="icon-cross2"></i></b>\n' +
                        //     '                <language>MESSAGE.ic(\'mono.close\')</language>\n' +
                        //     '            </button>');
                    // }
                },
                hide: {
                    end: function (data) {
                        mega_indicadores_pei.ids2 = 0;
                        mega_indicadores_pei.periodo = 0;
                    }
                }
            },
        });
    }
});