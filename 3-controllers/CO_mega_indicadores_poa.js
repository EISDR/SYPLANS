app.controller("mega_indicadores_poa", function ($scope, $http, $compile) {
    //
    mega_indicadores_poa = this;
    mega_indicadores_poa.session = new SESSION().current();
    mega_indicadores_poa.destroyForm = false;
    mega_indicadores_poa.LAN = LAN;
    mega_indicadores_poa.set_title = function (column) {
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

    mega_indicadores_poa.list_comment = [];
    mega_indicadores_poa.nameC= "";
    mega_indicadores_poa.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "0"
        }
    ];

    if (typeof mega_producto != 'undefined') {
        if (typeof mega_producto != 'not defined') {
            if (mega_producto) {
                mega_indicadores_poa.fixFilters = [
                    {
                        "field": "producto_id",
                        "value": mega_producto.id_producto
                    }
                ];
            }
        }
    }


    mega_indicadores_poa.filter_mega_indicadores_poa = () => new Promise ( async (resolve, reject) => {
        mega_indicadores_poa.fixFilters = [];
        mega_indicadores_poa.fixFilters.push({
            "field": "poa",
            "value": filtros_poa.poa
        });
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_indicadores_poa.fixFilters.push(
                {
                    field: 'id_eje_estrategico',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_indicadores_poa.fixFilters.push(
                {
                    field: 'id_objetivo_estrategico',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_indicadores_poa.fixFilters.push(
                {
                    field: 'id_estrategia',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            mega_indicadores_poa.fixFilters.push(
                {
                    field: 'id_resultado_esperado',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            mega_indicadores_poa.fixFilters.push(
                {
                    field: 'departamento_id',
                    operator: '=',
                    value: filtros_poa.departamento
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            mega_indicadores_poa.fixFilters.push(
                {
                    field: 'producto_id',
                    operator: '=',
                    value: filtros_poa.productos_poa
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_indicadores_poa = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if(vw_mega_indicadores_poa){
                mega_indicadores_poa.fixFilters.push(
                    {
                        field: 'departamento_id',
                        operator: '=',
                        value: vw_mega_indicadores_poa.departamento
                    }
                );
            }
        }
        resolve(1);
    });


    RUNCONTROLLER("mega_indicadores_poa", mega_indicadores_poa, $scope, $http, $compile);
    RUN_B("mega_indicadores_poa", mega_indicadores_poa, $scope, $http, $compile);
    mega_indicadores_poa.textModal = '';
    mega_indicadores_poa.headertitle = mega_indicadores_poa.session.tipo_institucion === 1 ? "Indicadores de Proyecto/Producto" : "Indicadores de Proyecto/Plan de Acción";
    mega_indicadores_poa.plural = "Indicadores de Proyecto/Producto";
    mega_indicadores_poa.singular = "Indicadores de Proyecto/Producto";
    mega_indicadores_poa.setPermission("export", true);
    mega_indicadores_poa.triggers.table.after.load = async function (records) {
        mega_indicadores_poa.runMagicColum('tipo_meta', 'tipoMeta',"id","nombre");
        mega_indicadores_poa.runMagicColum('direccion_meta', 'direccionMeta',"id","nombre");
        $('.has-colspan').attr('rowspan',3);
        $('.has-colspan').css('vertical-align','middle');
        BASEAPI.listp('vw_indicador_poa_periodo', {
            limit: 0,
            where: [{
                field: "poa",
                value: mega_indicadores_poa.user ? mega_indicadores_poa.user.poa_id : -1
            }]
        }).then(function (rs) {
            if (rs){
                if(rs.data.length > 0) {
                    mega_indicadores_poa.pei_ano = rs.data;
                    for(var c = 1; c <= mega_indicadores_poa.user.cantidad; c++) {
                        for (var l = 0; l < mega_indicadores_poa.records.data.length; l++) {
                            selected = mega_indicadores_poa.pei_ano.filter(information => {
                                if (information.indicador_poa == mega_indicadores_poa.records.data[l].id && information.periodo == c) {
                                    return true;
                                }
                            });
                            eval(`
                                if( typeof mega_indicadores_poa.records.data[${l}].periodo == 'undefined'){
                                    mega_indicadores_poa.records.data[${l}].periodo = [];
                                }
                            `);
                            if(selected.length > 0){
                                eval(`mega_indicadores_poa.records.data[${l}].periodo.push("${selected[0].valor}")`);
                                eval(`mega_indicadores_poa.records.data[${l}].periodo.push("${selected[0].valor_alcanzado}")`);
                                eval(`mega_indicadores_poa.records.data[${l}].periodo.push("${selected[0].varianzas}")`);
                            }else{
                                eval(`mega_indicadores_poa.records.data[${l}].periodo.push("")`);
                                eval(`mega_indicadores_poa.records.data[${l}].periodo.push("")`);
                                eval(`mega_indicadores_poa.records.data[${l}].periodo.push("")`);
                            }

                        }
                    }
                    mega_indicadores_poa.refreshAngular();
                }
            }
        });
    };

    mega_indicadores_poa.countUpload = async function(ids){
        var animation2 = new ANIMATION();
        animation2.loading(`#PoaComment`, "Por favor espere", ``, '300');
        for (var i = 0; i < ids.length; i++){
             await mega_indicadores_poa.control.file(".container" + ids[i] ,'IndicadorPOA' + ids[i], {
                label:'Ver Evidencias',
                maxfiles: 50,
                columns: 4,
                folder:"indicador_producto_poa/META" + ids[i],
                truetext:'Ver Evidencias',
                alone:true
            }, false, '', " ", false);
            eval(`
            
            if(typeof ShowCountIndicadorPOA${ids[i]} != 'undefined')
                ShowCountIndicadorPOA${ids[i]}(true);
            `);
        }
        animation2.stoploading(`#PoaComment`, ``);
    };

    mega_indicadores_poa.openmodalField = async  function (value, value2) {
        mega_indicadores_poa.list_comment = [];
        mega_indicadores_poa.nameC= value2;
        mega_indicadores_poa.ids = [];
        mega_indicadores_poa.list_comment = await  BASEAPI.listp("vw_mega_indicador_poa_periodo", {
            order: 'asc',
            orderby: 'periodo',
            where: [
                {
                field: "indicador_poa",
                operator: "=",
                value: value
                }
            ]
        });

        mega_indicadores_poa.list_comment = mega_indicadores_poa.list_comment.data;

        mega_indicadores_poa.list_comment.forEach((row) =>{
            mega_indicadores_poa.ids.push(row.id);
        });
        var animationCRUD = new ANIMATION();
        animationCRUD.stoploading(`#mega_indicadores_poaTablePanel`, ``);
        mega_indicadores_poa.modal.modalView("mega_indicadores_poa/comment", {
            width: 'modal-full',
            header: {
                title: `Comentarios: ${mega_indicadores_poa.nameC}`,
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

    mega_indicadores_poa.openCommentModal = function (id, periodo) {
        mega_indicadores_poa.ids2 = id;
        mega_indicadores_poa.periodo = periodo;
        mega_indicadores_poa.modal.modalView("mega_indicadores_poa/show_commen", {
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
                        //     '                   id="btnCM" onclick="MODAL.close(mega_indicadores_poa)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
                        //     '                    type="button" class="btn bg-secundary btn-labeled btn-xs pull-right"\n' +
                        //     '                    >\n' +
                        //     '                <b><i class="icon-cross2"></i></b>\n' +
                        //     '                <language>MESSAGE.ic(\'mono.close\')</language>\n' +
                        //     '            </button>');
                    // }
                },
                hide: {
                    end: function (data) {
                        mega_indicadores_poa.ids2 = 0;
                        mega_indicadores_poa.periodo = 0;
                    }
                }
            },
        });
    }

    mega_indicadores_poa.formulary = function (data, mode, defaultData) {
        if (mega_indicadores_poa !== undefined) {
            RUN_B("departamento", departamento, $scope, $http, $compile);
             mega_indicadores_poa.form.titles = {
                new: MESSAGE.i('planificacion.titlemega_indicadores_poa'),
                edit: "Editar - " + mega_indicadores_poa.singular,
                view: "Ver ALL - " + mega_indicadores_poa.singular
            };
            mega_indicadores_poa.form.readonly = {};
            mega_indicadores_poa.createForm(data, mode, defaultData);
            mega_indicadores_poa.$scope.$watch('mega_indicadores_poa.nombre',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(mega_indicadores_poa, "nombre", rules)
            });
        }
    };

});