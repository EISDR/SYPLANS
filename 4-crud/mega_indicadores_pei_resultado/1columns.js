CRUD_mega_indicadores_pei_resultado = {};
DSON.keepmerge(CRUD_mega_indicadores_pei_resultado , CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_indicadores_pei_resultado, {
    table: {
        engine: 'my',
        view:"indicador_pei",
        method: "indicador_pei",
        sort: "id",
        order: "desc",
        batch:true,
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            eje_estrategico_nombre:{
                visible: false,
                visibleDetail: true
            },
            objetivo_estrategico_nombre:{
                visible: false,
                visibleDetail: true
            },
            estrategia_nombre:{
                visible: false,
                visibleDetail: true
            },
            resultado_nombre:{
                visible: false,
                visibleDetail: true
            },
            nombre:{
            },
            descripcion:{
                visible: false,
                visibleDetail: true
            },
            fuente:{
                visible: false,
                visibleDetail: true
            },
            metodo_calculo:{
                visible: false,
                visibleDetail: true
            },
            tipo_meta:{
            },
            direccion_meta:{
            },
            linea_base:{
            }
        },options: [

            {
                text: (data) => {
                    return MESSAGE.i('actions.Eye');
                },
                title: (data) => {
                    return MESSAGE.i('actions.Eye')
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return ['eye','edit'];
                },
                show:(data)=>{
                    return true;
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    if (!DSON.oseaX(data.row)) {
                        data.$scope.dataForView = data.row;
                        data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                            header: {
                                title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
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
                },
            }
        ],
    }
});