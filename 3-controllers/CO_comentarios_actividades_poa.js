app.controller("comentarios_actividades_poa", function ($scope, $http, $compile) {
    comentarios_actividades_poa = this;
    comentarios_actividades_poa.fileSI = [];
    if (typeof actividades_poa !== 'undefined') {
        if (typeof actividades_poa !== 'not defined') {
            if (actividades_poa) {
                comentarios_actividades_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Trabajar_actividad
                    },
                    {
                        "field": "value2",
                        "value": actividades_poa.id ? actividades_poa.id : actividades_poa.id_para_comentarios
                    }
                ];
            }
        }
    }
    if (typeof actividades_poa_monitoreo !== 'undefined') {
        if (typeof actividades_poa_monitoreo !== 'not defined') {
            if (actividades_poa_monitoreo) {
                comentarios_actividades_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Trabajar_actividad
                    },
                    {
                        "field": "value2",
                        "value": actividades_poa_monitoreo.id ? actividades_poa_monitoreo.id : actividades_poa_monitoreo.id_para_comentarios
                    },
                ];
            }
        }
    }
    if (typeof mega_actividades !== 'undefined') {
        if (typeof mega_actividades !== 'not defined') {
            if (mega_actividades) {
                comentarios_actividades_poa.fixFilters = [
                    {
                        "field": "type",
                        "value": ENUM_2.tipo_comentario.Trabajar_actividad
                    },
                    {
                        "field": "value2",
                        "value": mega_actividades.id ? mega_actividades.id : mega_actividades.id_para_comentarios
                    }
                ];
            }
        }
    }
    comentarios_actividades_poa.session = new SESSION().current();
    comentarios_actividades_poa.group_caracteristica = comentarios_actividades_poa.session.groups[0] ? comentarios_actividades_poa.session.groups[0].caracteristica : "";
    RUNCONTROLLER("comentarios_actividades_poa", comentarios_actividades_poa, $scope, $http, $compile);
    comentarios_actividades_poa.headertitle = "Comentarios";
    comentarios_actividades_poa.plural = "Comentarios";
    comentarios_actividades_poa.singular = "Comentario";
    comentarios_actividades_poa.singular = "Comentario";
    comentarios_actividades_poa.triggers.table.after.load = async function (records) {
        comentarios_actividades_poa.fileSI = [];
        for (var items of records.data) {
            comentarios_actividades_poa.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/comentarios_actividades_poa/actividadfile_comment/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        comentarios_actividades_poa.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await comentarios_actividades_poa.files();
            comentarios_actividades_poa.refreshAngular();
        }
    };
    comentarios_actividades_poa.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        comentarios_actividades_poa.refresh();
    };
    comentarios_actividades_poa.verFile = function (key, value, row) {
        if (key != "archivos")
            return;

        comentarios_actividades_poa.setPermission("file.upload", false);
        if (comentarios_actividades_poa.group_caracteristica !== ENUM_2.Grupos.director_general){
            comentarios_actividades_poa.setPermission("file.remove", false);
        }else{
            comentarios_actividades_poa.setPermission("file.remove", true);
        }
        comentarios_actividades_poa.setPermission("file.download", true);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //
        // } else {
        //     comentarios_actividades_poa.setPermission("file.upload", true);
        //     comentarios_actividades_poa.setPermission("file.remove", true);
        // }
        if (typeof comentarios_actividades_poa !== 'null') {
            if (comentarios_actividades_poa) {
                var info = comentarios_actividades_poa.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/comentarios_actividades_poa/actividadfile_comment/" + row.id, row);
                    comentarios_actividades_poa.showfiletypes = function () {
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
                        comentarios_actividades_poa.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'comentarios_actividades_poa',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                        upload: false
                    };

                    comentarios_actividades_poa.modal.modalView("templates/components/gallery", {
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
                    });
                }
            }
        }
    };
});
