CRUD_mega_indicadores_poa = {};
DSON.keepmerge(CRUD_mega_indicadores_poa , CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_indicadores_poa, {
    table: {
        engine: 'my',
        width: '4000px',
        view:"vw_mega_indicadores_poa",
        method: "indicador_poa",
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
            no_eje: {
                label: "No.",
                sorttype: "numeric",
                class: "text-left"
            },
            eje_estrategico:{
                label: function(){
                    return "Eje Estratégico"
                },
                shorttext: 370
            },
            no_objetivo: {
                label: function () {
                    return "No.";
                },
                class: "text-left",
            },
            objetivo_estrategico:{
                label: function(){
                    return "Objetivo Estratégico"
                },
                shorttext: 370
            },
            no_estrategia: {
                label: "No.",
                class: "text-left"
            },
            estrategia:{
                label: "Estrategia",
                shorttext: 370
            },
            no_resultado: {
                label: "No.",
                class: "text-left"
            },
            resultado_esperado:{
                label: function(){
                    return "Resultados Esperados"
                },
                shorttext: 370
            },
            no_producto: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "No. Proyecto/Producto" : "No. Proyecto";
                },
                class: "text-left"
            },
            producto:{
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
            },
            no_indicador: {
                label: "No.",
                class: "text-left"
            },
            nombre_indicador:{
                label: "Indicador"
            },
            descripcion:{
                label: function() { return "Descripción" },
            },
            fuente:{
                label: "Fuente del Indicador"
            },
            metodo:{
                label: "Método Cálculo",
            },
            desagregacion_demografica_geografia: {
                label: function() {
                    return "Desagregación Demográfica Geográfica";
                },
                shorttext: 370
            },
            tipo_meta:{
                label: "Tipo Meta",
            },
            direccion_meta:{
                label: "Dirección Meta",
            },
            ano_linea_base: {
                label: function (row) {
                    return "Año Línea Base"
                }
            },
            linea: {
                label: function (row) {
                    return "Línea Base"
                }
            },
            observacion: {
                label: "Observación",
                shorttext: 370
            }
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
                    return MESSAGE.i('actions.Eye');
                },
                title: (data) => {
                    return MESSAGE.i('actions.Eye');
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return ['eye','comment'];
                },
                show:(data)=>{
                    return true;
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    mega_indicadores_poa.list_indicador_poa_periodo = [];
                    mega_indicadores_poa.detalleapd = [];
                    var contador = 1;
                    BASEAPI.listp('vw_indicador_poa_periodo', {
                        limit: 0,
                        orderby: "periodo",
                        order: "asc",
                        where: [{
                            field: "indicador_poa",
                            value: data.row.id
                        }]
                    }).then(function (result) {
                        mega_indicadores_poa.list_indicador_poa_periodo = result.data;
                        for (var key of mega_indicadores_poa.list_indicador_poa_periodo) {
                            mega_indicadores_poa.detalleapd.push({column: 'Proyectado ' + periodo + ' ' + contador , row: key.valor });
                            mega_indicadores_poa.detalleapd.push({column: 'Alcanzado ' +  periodo + ' ' + contador, row: key.valor_alcanzado });
                            mega_indicadores_poa.detalleapd.push({column: 'Diferencia ' + periodo + ' ' + contador, row: key.varianzas });
                            contador++;
                        }
                        if (!DSON.oseaX(data.row)) {
                            data.$scope.dataForView = data.row;
                            data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                header: {
                                    title: mega_indicadores_poa.plural = MESSAGE.i('planificacion.title_mega_indicadores_poa') + " - "+data.row.nombre_indicador,
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
                    animationCRUD.loading(`#mega_indicadores_poaTablePanel`, "Por favor espere", ``, '300');
                    mega_indicadores_poa.openmodalField(data.row.id, data.row.nombre_indicador);
                    return false;
                }
            },
        ]
    }
});