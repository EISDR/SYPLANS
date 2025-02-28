CRUD_mega_indicadores_pei = {};
DSON.keepmerge(CRUD_mega_indicadores_pei, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_indicadores_pei, {
    table: {
        engine: ['my', 'st'],
        width: "width:2300px;",
        view: "vw_indicador_pei_2",
        sort: "id",
        order: "desc",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            no_eje: {
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico: {
                shorttext: 370
            },
            no_objetivo: {
                class: "text-left",
            },
            objetivo_estrategico: {
                shorttext: 370
            },
            no_estrategia: {
                class: "text-left"
            },
            estrategias: {
                shorttext: 370,
                // visible: false,
                // visibleDetail: true,
            },
            no_resultado: {
                shorttext: 370,
            },
            resultados: {
                shorttext: 370,
            },
            no_indicador: {
                label: "No. indicador",
                shorttext: 370,

            },
            nombre: {
                label: function () { return MESSAGE.i('planificacion.titleTablaIndicadorPEI')},
                shorttext: 370,
            },
            descripcion: {
                label: 'Descripción',
                shorttext: 370,
                visible: false,
                visibleDetail: true,
            },
            fuente: {
                label: "Fuente",
                shorttext: 370,
                visible: false,
                visibleDetail: true,
            },
            metodo: {
                label: "Método Cálculo",
                shorttext: 370,
                visible: false,
                visibleDetail: true,
            },
            desagregacion_demografica_geografia: {
                label: function() {
                    return "Desagregación Demográfica Geográfica";
                },
                shorttext: 370
            },
            tipo_meta: {
                label: "Tipo Meta",
                visible: false,
                visibleDetail: true,
                format: function (row) {
                    mega_indicadores_pei.selected = mega_indicadores_pei.list_tipo_meta.filter(information => {
                        return row.tipo_meta == information.id;
                    });
                    return mega_indicadores_pei.selected[0].nombre;
                },
            },
            direccion_meta:{
                label: "Dirección Meta",
                visible: false,
                visibleDetail: true,
                format: function(row){
                    mega_indicadores_pei.selected = mega_indicadores_pei.list_direccion_meta.filter(information => {
                        return row.direccion_meta == information.id ;
                    });
                    return  mega_indicadores_pei.selected[0].nombre;
                },
            },
            ano_linea_base: {
                label: function (row) {
                    return "Año Línea Base"
                },
                visible: false,
                visibleDetail: true,
            },
            linea: {
                label: function (row) {
                    return "Línea Base"
                },
                visible: false,
                visibleDetail: true,
            },
            medio: {
                label: "Medio Verificación",
                shorttext: 370,
                visible: false,
                visibleDetail: true,
            },
            unidad_ejecutora_nombre: {
                label: function(){
                    return "Unidad Ejecutora";
                },
                shorttext: 370
            },
            observacion: {
                label: "Observación",
                shorttext: 370
            },
            created_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                sorttype: "datetime",
                formattype:"datetime"
            },
            updated_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                sorttype: "datetime",
                formattype:"datetime"
            }
        },
        allow: {
            menu: false,
            add: false,
            edit: false,
            view: true,
            remove: false,
            active: false,
            filter: true,
            import: true,
            copy: false,
            export: {
                Clipboard: false,
                PDF: false,
                CSV: false,
                XLS: false,
                DOC: false
            },
            actions: false,
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    return MESSAGE.i('actions.Edit') + ", " +
                        MESSAGE.i('actions.View') + ", " +
                        MESSAGE.i('actions.Remove');
                },
                icon: (data) => {
                    return "cog2";
                },
                show: function(){
                    return false;
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [

                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Remove');
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function(){
                            return false;
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: async function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        }
                    },

                ]
            },
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    return MESSAGE.i('actions.View')
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return ['view'];
                },
                characterist: (data) => {
                    return '';
                },
                click: function (data) {
                    mega_indicadores_pei.list_indicador_pei_ano_view = [];
                    mega_indicadores_pei.detalleapd = [];
                    BASEAPI.listp('vw_indicador_pei_ano', {
                        limit: 0,
                        orderby: "ano",
                        order: "asc",
                        where: [{
                            field: "indicador_pei",
                            value: data.row.id
                        }]
                    }).then(function (result) {
                        mega_indicadores_pei.list_indicador_pei_ano_view = result.data;
                        for (var key of mega_indicadores_pei.list_indicador_pei_ano_view) {
                            mega_indicadores_pei.detalleapd.push({column: 'Proyectado ' + key.ano, row: key.valor });
                            mega_indicadores_pei.detalleapd.push({column: 'Alcanzado ' +  key.ano, row: key.valor_alcanzado });
                            mega_indicadores_pei.detalleapd.push({column: 'Diferencia ' + key.ano, row: key.varianzas });
                        }
                        if (!DSON.oseaX(data.row)) {
                            data.$scope.dataForView = data.row;
                            data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                header: {
                                    title: mega_indicadores_pei.plural = MESSAGE.i('planificacion.title_mega_indicadores_pei') + " - "+data.row.resultados,
                                    icon: "user"
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: true
                                },
                            });
                        }

                    });

                },
            },
            {
                text: (data) => {
                    return MESSAGE.i('actions.Comment');
                },
                title: (data) => {
                    return MESSAGE.i('actions.Comment');
                },
                icon: (data) => {
                    return "comment";
                },
                permission: (data) => {
                    return 'comment';
                },
                show:(data)=>{
                    return true;
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    var animationCRUD = new ANIMATION();
                    animationCRUD.loading(`#mega_indicadores_peiTablePanel`, "Por favor espere", ``, '300');
                    mega_indicadores_pei.openmodalField(data.row.id,data.row.nombre);
                    return false;
                }
            },

        ]
    }
});