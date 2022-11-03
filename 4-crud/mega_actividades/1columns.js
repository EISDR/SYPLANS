CRUD_mega_actividades = {};
DSON.keepmerge(CRUD_mega_actividades, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_actividades, {
    table: {
        engine: 'my',
        view: "vw_actividades_poa",
        width: "width:2450px;",
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
            no1: {
                label: "No.",
                shorttext: 370,
            },
            producto_nombre: {
                label: function () {
                    return new SESSION().current().tipo_institucion == 1 ? "Proyecto/Producto" : "Proyecto";
                },
                shorttext: 370,
            },
            no2: {
                label: "No.",
                shorttext: 370
            },
            actividad: {
                label: "Actividad",
                shorttext: 370
            },
            responsable: {
                label: "Responsable",
                shorttext: 370
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                shorttext: 370,
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                label: "Fecha Fin",
                shorttext: 370,
                sorttype: "date",
                formattype: "date",
            },
            presupuesto: {
                label: "Presupuesto",
                formattype: "money",
                exportExample: "[money]",
            },
            estatus: {},
            razon_nombre: {
                label: function(row){
                    return "Condición de Cierre"
                },
            },
            calificacion: {
                label: function(row){
                    return "Puntuación"
                },
            },
            archivo:{
                label: "Adjuntos",
                click: function (data) {
                    if(data.row.estatus == "Completado"){
                        mega_actividades.setPermission("file.upload",false);
                        mega_actividades.setPermission("file.remove",false);
                    }else{
                        mega_actividades.setPermission("file.upload",true);
                        mega_actividades.setPermission("file.remove",true);
                    }
                    var root = DSON.template( "/actividades_poa_monitoreo/actividadfile/"+data.row.id, data.row);
                    mega_actividades.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver tipos de archivos permitidos a ser cargados",
                                icon: "file-eye"
                            },
                            footer: {
                                cancelButton: false,
                                buttons: [
                                    {
                                        color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                        title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                        action: function(){
                                            MODAL.close();
                                        }
                                    }
                                ]
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading')
                            },
                            event: {
                                show: {
                                    begin: function(data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if(typeof data.permitted_files[j] == "undefined"){
                                                    data.permitted_files[j] = {};
                                                }
                                                data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                            }
                                        }
                                    }
                                },
                                hide: {
                                    begin: function (data) {

                                    }
                                }
                            }
                        };
                        mega_actividades.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    data.$scope.modal.modalView("templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    })

                },
                format: function(row){
                    if (typeof mega_actividades !== 'null'){
                        if (mega_actividades){
                            var info = mega_actividades.fileSI.filter(data => {
                                return data.id == row.id;
                            });
                            if(info.length){
                                return  "<a title='Ver imagen'><i class='icon-files-empty'></i></a>";

                            }else {
                                return '';
                            }
                        }

                    }
                }
            }
        },
        allow: {
            menu: false,
            add: false,
            edit: false,
            view: true,
            remove: false,
            active: false,
            filter: false,
            import: false,
            copy: false,
            export: {
                Clipboard: false,
                PDF: false,
                CSV: false,
                XLS: false,
                DOC: false
            },
            actions: true,
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
            },
            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    return "Ver actividades de apoyo"
                },
                icon: (data) => {
                    return "eye";
                },
                permission: (data) => {
                    return ['view','filter','eye'];
                },
                show:(data)=>{
                    if(data.row.act_apoyo > 0){
                        return true;
                    }else
                        return false;
                },
                characterist: (data) => {
                    return "";
                },
                click: function (data) {
                    if (!DSON.oseaX(data.row)) {
                        mega_actividades.id_actividad = data.row.id;
                        data.$scope.dataForView = data.row;
                        data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                            // id: data.row.id,
                            header: {
                                title: MESSAGE.i('planificacion.title_mega_actividad')+" - "+data.row.actividad,
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
                }
            },
            {
                text: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                title: (data) => {
                    return MESSAGE.i('planificacion.comentarios');
                },
                icon: (data) => {
                    return "comment";
                },
                permission: (data) => {
                    return 'comment_activities';
                },
                characterist: (data) => {
                    return "";
                },
                show: function (data) {
                    if (data.row.comentarios > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                click: function (data) {
                    mega_actividades.id_para_comentarios = data.row.id;
                    mega_actividades.modalAction('comentarios_actividades_poa', MESSAGE.i('planificacion.comentarios'), 'comment', 'list', {});
                    return false;
                }
            }

        ]
    }
});