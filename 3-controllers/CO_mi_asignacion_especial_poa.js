app.controller("mi_asignacion_especial_poa", function ($scope, $http, $compile) {
    mi_asignacion_especial_poa = this;
    var session = new SESSION().current();
    mi_asignacion_especial_poa.poa_id = session.poa_id === null ? 0 : session.poa_id;
    mi_asignacion_especial_poa.compania_id = session.compania_id;
    mi_asignacion_especial_poa.not_exists_poa = 0;
    mi_asignacion_especial_poa.view_option_first = true;
    mi_asignacion_especial_poa.fileSI = [];
    mi_asignacion_especial_poa.currentdate = moment().format("YYYY-MM-DD");
    mi_asignacion_especial_poa.paso = false;
    mi_asignacion_especial_poa.destroyForm = false;

    mi_asignacion_especial_poa.insert_readonly = {};
    mi_asignacion_especial_poa.insert_readonly = {
        poa: session.poa_id,
        departamento_solicitante: session.departamento,
        estatus: 2
    };
    mi_asignacion_especial_poa.fixFilters = [
        {
            "field": "poa_id",
            "value": mi_asignacion_especial_poa.poa_id
        },
        {
            field: "responsableid",
            value: session.usuario_id
        }
    ];

    var carac = undefined;
    if (session.groups.length > 0)
        carac = session.groups[0]? session.groups[0].caracteristica: '';
    var mydepa = session.departamento;
    var myID = session.getID();
    var header = '';


    // if (carac === "DP") {
    //     mi_asignacion_especial_poa.fixFilters.push({field: 'depaid', value: mydepa});
    //     header='Mis Asignaciones'
    // } else if (carac === "AD") {
    //     mi_asignacion_especial_poa.fixFilters.push({field: 'responsableid', value: myID});
    //     header='Mis Asignaciones'
    // }else{
    //     header='Asignaciones Asignadas'
    // }

    RUNCONTROLLER("mi_asignacion_especial_poa", mi_asignacion_especial_poa, $scope, $http, $compile);

    mi_asignacion_especial_poa.singular = "Asignación Especial POA";
    mi_asignacion_especial_poa.plural = MESSAGE.i('planificacion.titleAsignacion');
    if (session.poa_id) {
        mi_asignacion_especial_poa.headertitle = header + " / " + session.periodo_pei_msj + " / " + session.periodo_poa_msj;
    } else if (session.pei_id) {
        mi_asignacion_especial_poa.headertitle = header + " / " + session.periodo_pei_msj;
    } else {
        mi_asignacion_especial_poa.headertitle = header + " / PEI ";
    }

    mi_asignacion_especial_poa.formulary = function (data, mode, defaultData) {
        if (mi_asignacion_especial_poa !== undefined) {
            RUN_B("mi_asignacion_especial_poa", mi_asignacion_especial_poa, $scope, $http, $compile);
            mi_asignacion_especial_poa.form.titles = {
                new: MESSAGE.i('planificacion.titleAsignacion'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titleAsignacion')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleAsignacion')}`
            };
            mi_asignacion_especial_poa.form.before.insert = function () {
                if (mi_asignacion_especial_poa.poa_id === 0) {
                    SWEETALERT.show({message: "No existe un POA activo"});
                    return true;
                }
                if (!session.departamento) {
                    SWEETALERT.show({message: "Necesitas tener un departamento asignado"});
                    return true;
                }
                return false;
            };
            // implementacion de las notificaciones al momento de crear o actualizar una asignacion begin
            mi_asignacion_especial_poa.form.after.insert = function (data) {
                mi_asignacion_especial_poa.data_json = {
                    title: MESSAGE.i('planificacion.titleAsignacion'),
                    content: MESSAGE.ieval('planificacion.asignacion_especial_send_notification',{
                        field: mi_asignacion_especial_poa.form.selected('responsable').nombre +' '+mi_asignacion_especial_poa.form.selected('responsable').apellido,
                        field2: data.inserted.nombre,
                        field3: mi_asignacion_especial_poa.fecha_fin
                    }),
                    user: [data.inserted.responsable],
                    url: 'mi_asignacion_especial_poa'
                };
                send_notification.send.send(mi_asignacion_especial_poa.data_json);
            };
            mi_asignacion_especial_poa.form.after.update = function (data) {
                if (data.updating.responsable != mi_asignacion_especial_poa.data_user.id){
                    mi_asignacion_especial_poa.data_json = {
                        title: MESSAGE.i('planificacion.titleAsignacion'),
                        content: MESSAGE.ieval('planificacion.asignacion_especial_send_notification',{
                            field: mi_asignacion_especial_poa.form.selected('responsable').nombre +' '+mi_asignacion_especial_poa.form.selected('responsable').apellido,
                            field2: data.updating.nombre,
                            field3: mi_asignacion_especial_poa.fecha_fin
                        }),
                        user: [data.updating.responsable],
                        url: 'mi_asignacion_especial_poa'
                    };
                    send_notification.send.send(mi_asignacion_especial_poa.data_json);
                    //
                    mi_asignacion_especial_poa.data_json2 = {
                        title: MESSAGE.i('planificacion.titleAsignacion'),
                        content: MESSAGE.ieval('planificacion.asignacion_especial_remove_send_notification',{
                            field: mi_asignacion_especial_poa.data_user.nombre +' '+mi_asignacion_especial_poa.data_user.apellido,
                            field2: data.updating.nombre
                        }),
                        user: [mi_asignacion_especial_poa.data_user.id],
                        url: 'mi_asignacion_especial_poa'
                    };
                    send_notification.send.send(mi_asignacion_especial_poa.data_json2);
                } else {
                    mi_asignacion_especial_poa.data_json = {
                        title: MESSAGE.i('planificacion.titleAsignacion'),
                        content: MESSAGE.ieval('planificacion.asignacion_especial_update_send_notification',{
                            field: mi_asignacion_especial_poa.form.selected('responsable').nombre +' '+mi_asignacion_especial_poa.form.selected('responsable').apellido,
                            field2: data.updating.nombre,
                            field3: mi_asignacion_especial_poa.fecha_fin
                        }),
                        user: [data.updating.responsable],
                        url: 'mi_asignacion_especial_poa'
                    };
                    send_notification.send.send(mi_asignacion_especial_poa.data_json);
                }
            };
            // end
            mi_asignacion_especial_poa.triggers.table.after.control = function (data) {
                if (mode === 'new' && data == 'range_date') {
                    mi_asignacion_especial_poa.range_date = "";
                    mi_asignacion_especial_poa.refreshAngular();
                }
                if (mode === 'edit' && data === 'responsable'){
                    mi_asignacion_especial_poa.data_user = mi_asignacion_especial_poa.form.selected('responsable');
                }
            };
            mi_asignacion_especial_poa.form.readonly = mi_asignacion_especial_poa.insert_readonly;
            mi_asignacion_especial_poa.createForm(data, mode, defaultData);

            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "nombre", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.departamento_solicitado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "departamento_solicitado", rules);
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.responsable', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "responsable", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.fecha_inicio', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "fecha_inicio", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.fecha_fin', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "fecha_fin", rules)
            });
            mi_asignacion_especial_poa.$scope.$watch('mi_asignacion_especial_poa.range_date', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(mi_asignacion_especial_poa, "fecha_inicio", rules);
                VALIDATION.validate(mi_asignacion_especial_poa, "range_date", rules);
            });
        }
    };

    mi_asignacion_especial_poa.triggers.table.after.load = async function (records) {
        mi_asignacion_especial_poa.fileSI = [];
        for (var items of records.data) {
            mi_asignacion_especial_poa.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/asignacion_especial_poa_monitoreo/asignacionfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        mi_asignacion_especial_poa.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
                // SWEETALERT.stop();
            });
            await mi_asignacion_especial_poa.files();
            mi_asignacion_especial_poa.refreshAngular();

        }
    };
    mi_asignacion_especial_poa.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        mi_asignacion_especial_poa.refresh();
    };
    mi_asignacion_especial_poa.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        mi_asignacion_especial_poa.setPermission("file.upload", false);
        mi_asignacion_especial_poa.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof mi_asignacion_especial_poa !== 'null') {
            if (mi_asignacion_especial_poa) {
                var info = mi_asignacion_especial_poa.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                console.log(row);
                if (info.length) {
                    var root = DSON.template("/asignacion_especial_poa_monitoreo/asignacionfile/" + row.id, row);
                    console.log(root);
                    mi_asignacion_especial_poa.showfiletypes = function () {
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
                        mi_asignacion_especial_poa.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'mi_asignacion_especial_poa',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    mi_asignacion_especial_poa.modal.modalView("templates/components/gallery", {
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