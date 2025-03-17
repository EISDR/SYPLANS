app.controller("vw_mega_indicadores_actividad", function ($scope, $http, $compile) {
    vw_mega_indicadores_actividad = this;
    vw_mega_indicadores_actividad.destroyForm = false;
    vw_mega_indicadores_actividad.LAN = LAN;

    vw_mega_indicadores_actividad.set_title = function (column) {
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

    vw_mega_indicadores_actividad.list_comment = [];
    vw_mega_indicadores_actividad.nameC= "";
    vw_mega_indicadores_actividad.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "0"
        }
    ];

    // if (typeof mega_producto != 'undefined') {
    //     if (typeof mega_producto != 'not defined') {
    //         if (mega_producto) {
    //             vw_mega_indicadores_actividad.fixFilters = [
    //                 {
    //                     "field": "producto_id",
    //                     "value": mega_producto.id_producto
    //                 }
    //             ];
    //         }
    //     }
    // }


    vw_mega_indicadores_actividad.filter_vw_mega_indicadores_actividad = () => new Promise ( async (resolve, reject) => {
        vw_mega_indicadores_actividad.fixFilters = [];
        vw_mega_indicadores_actividad.fixFilters.push({
            "field": "poa",
            "value": filtros_poa.poa
        });
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            vw_mega_indicadores_actividad.fixFilters.push(
                {
                    field: 'id_eje_estrategico',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            vw_mega_indicadores_actividad.fixFilters.push(
                {
                    field: 'id_objetivo_estrategico',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            vw_mega_indicadores_actividad.fixFilters.push(
                {
                    field: 'id_estrategia',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            vw_mega_indicadores_actividad.fixFilters.push(
                {
                    field: 'id_resultado_esperado',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            vw_mega_indicadores_actividad.fixFilters.push(
                {
                    field: 'departamento_id',
                    operator: '=',
                    value: filtros_poa.departamento
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            vw_mega_indicadores_actividad.fixFilters.push(
                {
                    field: 'id_producto',
                    operator: '=',
                    value: filtros_poa.productos_poa
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_vw_mega_indicadores_actividad = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if(vw_vw_mega_indicadores_actividad){
                vw_mega_indicadores_actividad.fixFilters.push(
                    {
                        field: 'departamento_id',
                        operator: '=',
                        value: vw_vw_mega_indicadores_actividad.departamento
                    }
                );
            }
        }
        resolve(1);
    });



    RUNCONTROLLER("vw_mega_indicadores_actividad", vw_mega_indicadores_actividad, $scope, $http, $compile);
    RUN_B("vw_mega_indicadores_actividad", vw_mega_indicadores_actividad, $scope, $http, $compile);
    vw_mega_indicadores_actividad.textModal = '';
    vw_mega_indicadores_actividad.headertitle = "Indicadores de Actividades";
    vw_mega_indicadores_actividad.plural = "Indicadores de Actividades";
    vw_mega_indicadores_actividad.singular = "Indicadores de Actividades";
    vw_mega_indicadores_actividad.triggers.table.after.load = async function (records) {
        vw_mega_indicadores_actividad.runMagicColum('tipo_meta', 'tipoMeta',"id","nombre");
        vw_mega_indicadores_actividad.runMagicColum('direccion_meta', 'direccionMeta',"id","nombre");
        $('.has-colspan').attr('rowspan',3);
        $('.has-colspan').css('vertical-align','middle');
        BASEAPI.listp('vw_indicador_actividad_periodo', {
            limit: 0,
            where: [{
                field: "poa",
                value: vw_mega_indicadores_actividad.user ? vw_mega_indicadores_actividad.user.poa_id : -1
            }]
        }).then(function (rs) {
            if (rs){
                console.log(rs, "a ver que viene");
                if(rs.data.length > 0) {
                    vw_mega_indicadores_actividad.pei_ano = rs.data;
                    for(var c = 1; c <= vw_mega_indicadores_actividad.user.cantidad; c++) {
                        console.log(c, "el primer for");
                        for (var l = 0; l < vw_mega_indicadores_actividad.records.data.length; l++) {
                            console.log(l, vw_mega_indicadores_actividad.pei_ano, "el segundo for");
                            selected = vw_mega_indicadores_actividad.pei_ano.filter(information => {
                                if (information.indicador_actividad == vw_mega_indicadores_actividad.records.data[l].id && information.periodo == c) {
                                    return true;
                                }
                            });
                            console.log(selected, "la data filtrada");
                            eval(`
                                if( typeof vw_mega_indicadores_actividad.records.data[${l}].periodo == 'undefined'){
                                    vw_mega_indicadores_actividad.records.data[${l}].periodo = [];
                                }
                            `);
                            if(selected.length > 0){
                                eval(`vw_mega_indicadores_actividad.records.data[${l}].periodo.push("${selected[0].valor}")`);
                                eval(`vw_mega_indicadores_actividad.records.data[${l}].periodo.push("${selected[0].valor_alcanzado}")`);
                                eval(`vw_mega_indicadores_actividad.records.data[${l}].periodo.push("${selected[0].varianzas}")`);
                            }else{
                                eval(`vw_mega_indicadores_actividad.records.data[${l}].periodo.push("")`);
                                eval(`vw_mega_indicadores_actividad.records.data[${l}].periodo.push("")`);
                                eval(`vw_mega_indicadores_actividad.records.data[${l}].periodo.push("")`);
                            }
                            console.log(selected, "al final de todo");

                        }
                    }
                    vw_mega_indicadores_actividad.refreshAngular();
                }
            }
        });
    };

    vw_mega_indicadores_actividad.countUpload = async function(ids){
        var animation2 = new ANIMATION();
        animation2.loading(`#PoaComment`, "Por favor espere", ``, '300');
        for (var i = 0; i < ids.length; i++){
            await vw_mega_indicadores_actividad.control.file(".container" + ids[i] ,'IndicadorActividad' + ids[i], {label:'Ver Evidencias', maxfiles: 50,
                columns: 4,
                folder:"indicador_producto_poa_actividad/META" + ids[i],
                truetext:'Ver Evidencias',
                alone:true
            }, false, '', " ", false);
            eval(`

            if(typeof ShowCountIndicadorActividad${ids[i]} != 'undefined')
                ShowCountIndicadorActividad${ids[i]}(true);
            `);
        }
        animation2.stoploading(`#PoaComment`, ``);
    };

    vw_mega_indicadores_actividad.openmodalField = async  function (value, value2) {
        vw_mega_indicadores_actividad.list_comment = [];
        vw_mega_indicadores_actividad.nameC= value2;
        vw_mega_indicadores_actividad.ids = [];
        vw_mega_indicadores_actividad.list_comment = await  BASEAPI.listp("vw_mega_indicador_poa_actividad_periodo", {
            order: 'asc',
            orderby: 'periodo',
            where: [
                {
                    field: "indicador_actividad",
                    operator: "=",
                    value: value
                }
            ]
        });

        vw_mega_indicadores_actividad.list_comment = vw_mega_indicadores_actividad.list_comment.data;

        vw_mega_indicadores_actividad.list_comment.forEach((row) =>{
            vw_mega_indicadores_actividad.ids.push(row.id);
        });
        var animationCRUD = new ANIMATION();
        animationCRUD.stoploading(`#vw_mega_indicadores_actividadTablePanel`, ``);
        vw_mega_indicadores_actividad.modal.modalView("vw_mega_indicadores_actividad/comment", {
            width: 'modal-full',
            header: {
                title: `Comentarios: ${vw_mega_indicadores_actividad.nameC}`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };

    vw_mega_indicadores_actividad.openCommentModal = function (id, periodo) {
        vw_mega_indicadores_actividad.ids2 = id;
        vw_mega_indicadores_actividad.periodo = periodo;
        vw_mega_indicadores_actividad.modal.modalView("vw_mega_indicadores_actividad/show_commen", {
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
                    // begin: function (data) {
                    //
                    // },
                    // end: function (data) {
                    // $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                    //     '                <i class="position-right"></i>\n' +
                    //     '                </span>\n' +
                    //     '            <button\n' +
                    //     '                   id="btnCM" onclick="MODAL.close(vw_mega_indicadores_actividad)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
                    //     '                    type="button" class="btn bg-secundary btn-labeled btn-xs pull-right"\n' +
                    //     '                    >\n' +
                    //     '                <b><i class="icon-cross2"></i></b>\n' +
                    //     '                <language>MESSAGE.ic(\'mono.close\')</language>\n' +
                    //     '            </button>');
                    // }
                },
                hide: {
                    end: function (data) {
                        vw_mega_indicadores_actividad.ids2 = 0;
                        vw_mega_indicadores_actividad.periodo = 0;
                    }
                }
            },
        });
    };

    vw_mega_indicadores_actividad.formulary = function (data, mode, defaultData) {
        if (vw_mega_indicadores_actividad !== undefined) {
            RUN_B("departamento", departamento, $scope, $http, $compile);
            vw_mega_indicadores_actividad.form.titles = {
                new: MESSAGE.i('planificacion.titlevw_mega_indicadores_actividad'),
                edit: "Editar - " + vw_mega_indicadores_actividad.singular,
                view: "Ver ALL - " + vw_mega_indicadores_actividad.singular
            };
            vw_mega_indicadores_actividad.form.readonly = {};
            vw_mega_indicadores_actividad.createForm(data, mode, defaultData);
            vw_mega_indicadores_actividad.$scope.$watch('vw_mega_indicadores_actividad.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_mega_indicadores_actividad, "nombre", rules)
            });
        }
    };

});
