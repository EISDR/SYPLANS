app.controller("vw_correctiva", function ($scope, $http, $compile) {
    auditoria_programa_plan = {
        documento: {
            id: 0
        }
    };
    vw_correctiva = this;
    //vw_correctiva.fixFilters = [];
    vw_correctiva.singular = "Acciones Preventivas y Correctivas";
    vw_correctiva.plural = "Acciones Preventivas y Correctivas";
    vw_correctiva.esriesgo = window.location.href.split('?')[1] === 'riesgo';
    vw_correctiva.session = new SESSION().current();
    vw_correctiva.fileSI = [];
    //vw_correctiva.headertitle = "Hola Title";
    vw_correctiva.destroyForm = false;
    vw_correctiva.accionesname = "Acciones";
    vw_correctiva.showtable = false;
    //vw_correctiva.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_correctiva", vw_correctiva, $scope, $http, $compile);
    RUN_B("vw_correctiva", vw_correctiva, $scope, $http, $compile);
    var animation = new ANIMATION();
    $scope.$watch("vw_correctiva.plan", async function (value) {
        var rules = [];
        //rules here
        $("#showtble").hide();
        $("#showInfo").hide();
        SWEETALERT.loading({message: "Listando Acciones Correctivas"});
        if (vw_correctiva.omitir_registros) {
            vw_correctiva.fixFilters = [
                {
                    field: 'plan_id',
                    value: vw_correctiva.plan,
                },
                {
                    field: 'omitido',
                    operator: "is",
                    value: "$null"
                }
            ];
        }else{
            vw_correctiva.fixFilters = [
                {
                    field: 'plan_id',
                    value: vw_correctiva.plan,
                }
            ];
        }
        vw_correctiva.refresh(async () => {
            vw_correctiva.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: vw_correctiva.session.groups[0].id
                }
            ];
            SWEETALERT.stop();
            if (vw_correctiva.plan_object) {
                vw_correctiva.programa_auditoria = vw_correctiva.plan_object.programa_nombre;
                vw_correctiva.programa_documentos = vw_correctiva.plan_object.documentos;
                vw_correctiva.programa_acciones = vw_correctiva.plan_object.acciones;
                vw_correctiva.auditoria_nombre = vw_correctiva.plan_object.plan_nombre_show;
                vw_correctiva.auditoria_range_date = LAN.date(vw_correctiva.plan_object.plan_fecha_inicio) + " - " + LAN.date(vw_correctiva.plan_object.plan_fecha_fin);
                vw_correctiva.auditoria_objetivo = vw_correctiva.plan_object.plan_objetivo;
                vw_correctiva.auditoria_alcance = vw_correctiva.plan_object.plan_alcance;
                vw_correctiva.estatus = vw_correctiva.plan_object.estatus_plan_accion + "";
                vw_correctiva.form.loadDropDown('estatus');
                vw_correctiva.auditoria_auditores = await BASEAPI.listp('vw_auditoria_programa_plan_equipotrabajo', {
                    limit: 0,
                    where: [
                        {
                            field: "programa_plan",
                            value: vw_correctiva.plan_object.id
                        }
                    ]
                });
                vw_correctiva.auditoria_auditores.data = vw_correctiva.auditoria_auditores.data.filter((value, index, self) => self.map(x => x.usuario).indexOf(value.usuario) == index)
                vw_correctiva.auditoria_participantes = await BASEAPI.listp('vw_auditoria_programa_plan_participantes', {
                    limit: 0,
                    where: [
                        {
                            field: "programa_plan",
                            value: vw_correctiva.plan_object.id
                        }
                    ]
                });
                vw_correctiva.auditoria_tipo_inconformidad = await BASEAPI.listp('vw_tipo_inconformidad', {
                    limit: 0,
                    where: [
                        {
                            field: "programa_plan",
                            value: vw_correctiva.plan_object.id
                        }
                    ]
                });
                $("#showtble").show();
                $("#showInfo").show();
                vw_correctiva.refreshAngular();
            }
        });
        VALIDATION.validate(vw_correctiva, 'programa_id', rules);
    });
    $scope.$watch('vw_correctiva.comentario', function (value) {
        var rules = [];
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(vw_correctiva, "comentario", rules);
    });
    $scope.$watch('vw_correctiva.omitir_registros', async function (value) {
        if (value){
            vw_correctiva.fixFilters = [
                {
                    field: 'plan_id',
                    value: vw_correctiva.plan,
                },
                {
                    field: 'omitido',
                    operator: "is",
                    value: "$null"
                }
            ];
            vw_correctiva.refresh();
        }else{
            vw_correctiva.fixFilters = [
                {
                    field: 'plan_id',
                    value: vw_correctiva.plan,
                }
            ];
            vw_correctiva.refresh();
        }
    });
    vw_correctiva.formulary = function (data, mode, defaultData) {
        if (vw_correctiva !== undefined) {
            RUN_B("vw_correctiva", vw_correctiva, $scope, $http, $compile);
            vw_correctiva.form.modalWidth = ENUM.modal.width.full;
            vw_correctiva.form.readonly = {};
            vw_correctiva.createForm(data, mode, defaultData);
            $scope.$watch("vw_correctiva.programa_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'programa_id', rules);
            });
            $scope.$watch("vw_correctiva.programa_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'programa_nombre', rules);
            });
            $scope.$watch("vw_correctiva.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'descripcion', rules);
            });
            $scope.$watch("vw_correctiva.observaciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'observaciones', rules);
            });
            $scope.$watch("vw_correctiva.plan_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'plan_id', rules);
            });
            $scope.$watch("vw_correctiva.plan_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'plan_nombre', rules);
            });
            $scope.$watch("vw_correctiva.doc_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'doc_id', rules);
            });
            $scope.$watch("vw_correctiva.doc_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_correctiva, 'doc_nombre', rules);
            });
        }
    };
    vw_correctiva.triggers.table.after.load = async function (records) {
        vw_correctiva.fileSI = [];
        for (var items of records.data) {
            vw_correctiva.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        vw_correctiva.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await vw_correctiva.files();
            vw_correctiva.refreshAngular();
        }
        vw_correctiva.auditoria_lista_verificacion = await BASEAPI.listp('vw_lista_preventiva_correctiva', {
            limit: 0,
            where: [
                {
                    field: 'programa_plan',
                    value: vw_correctiva.plan,
                }
            ]
        });
        vw_correctiva.auditoria_lista_verificacion_completadas = vw_correctiva.auditoria_lista_verificacion.data.filter(d => {
            return d.estatus_id === 4;
        });
        if (vw_correctiva.auditoria_lista_verificacion.data.length > 0 && vw_correctiva.auditoria_lista_verificacion_completadas.length == vw_correctiva.auditoria_lista_verificacion.data.length) {
            BASEAPI.updateall('auditoria_programa_plan', {
                estatus_plan_accion: 2,
                where: [
                    {
                        field: "id",
                        value: vw_correctiva.plan
                    }
                ]
            }, function (result) {
                vw_correctiva.estatus = "2";
                vw_correctiva.form.loadDropDown('estatus');
                vw_correctiva.refreshAngular();
            });
        } else {
            BASEAPI.updateall('auditoria_programa_plan', {
                estatus_plan_accion: 1,
                where: [
                    {
                        field: "id",
                        value: vw_correctiva.plan
                    }
                ]
            }, function (result) {
                vw_correctiva.estatus = "1";
                vw_correctiva.form.loadDropDown('estatus');
                vw_correctiva.refreshAngular();
            });
        }
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
    vw_correctiva.verFile = function (key, value, row) {
        if (key != "archivo")
            return;

        vw_correctiva.setPermission("file.upload", false);
        vw_correctiva.setPermission("file.remove", false);
        // if (row.estatus_actividad == ENUM_2.actividad_poa_estatus.Completada || row.estatus_actividad == ENUM_2.actividad_poa_estatus.Cancelada) {
        //     actividades_poa_monitoreo.setPermission("file.upload", false);
        //     actividades_poa_monitoreo.setPermission("file.remove", false);
        // } else {
        //     actividades_poa_monitoreo.setPermission("file.upload", true);
        //     actividades_poa_monitoreo.setPermission("file.remove", true);
        // }
        if (typeof vw_correctiva !== 'null') {
            if (vw_correctiva) {
                var info = vw_correctiva.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/auditoria_programa_plan_documentos_asociados_listaverificacion/listaverificacionfile/" + row.id, row);
                    vw_correctiva.showfiletypes = function () {
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
                                        action: function () {
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
                                    begin: function (data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if (typeof data.permitted_files[j] == "undefined") {
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
                        vw_correctiva.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_correctiva.modal.modalView("templates/components/gallery", {
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
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
    vw_correctiva.allow_estatus = function (estatus){
        let permitidos = [5,8];
        return permitidos.includes(estatus);
    }
    vw_correctiva.add_comentario = (data) => new Promise((resolve, reject) => {
        if (vw_correctiva.comentario == "") {
            SWEETALERT.show({message: `Debe agregar un comentario.`});
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        } else {
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            for (var item of buttons) {
                item.disabled = true;
            }
            BASEAPI.insertp('comentarios',
                {
                    "comentario": vw_correctiva.comentario,
                    "type": ENUM_2.tipo_comentario.trabajar_puntos_de_verificación,
                    "created_by": vw_correctiva.session.usuario_id,
                    "value": vw_correctiva.ids
                }).then(function (rs) {
                vw_comentarios.refresh();
                vw_correctiva.comentario = "";
                vw_correctiva.refreshAngular();
                animation.loading(`#tb-custom2`, "", ``, '30');
                animation.stoploading(`#tb-custom2`);
                SWEETALERT.stop();
                SWEETALERT.show({
                    message: "Ha sido guardado su comentario",
                    confirm: function () {
                        var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                        for (var item of buttons) {
                            item.disabled = false;
                        }
                        MODAL.closeAll();
                    }
                });
                resolve(true);
            });
        }
        resolve(true);
    });
    vw_correctiva.openmodalField = function (edit, id) {
        // indicador_producto_poa.commentName = 'metacomment' + name;
        // indicador_producto_poa.commentValue = $(`[name=${indicador_producto_poa.commentName}]`).val();
        vw_correctiva.edit = edit;
        vw_correctiva.ids = id;
        vw_correctiva.comentario = "";
        vw_correctiva.modal.modalView("vw_correctiva/addcomment", {
            width: 'modal-full',
            header: {
                title: vw_correctiva.edit ? `Agregar comentario` : `Ver comentario`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                // show: {
                //     end: function (data) {
                //         if(indicador_producto_poa.edit){
                //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                //                 '                <i class="position-right"></i>\n' +
                //                 '                </span>\n' +
                //                 '            <button\n' +
                //                 '                   id="btnC"  onclick="MODAL.close(indicador_producto_poa)"  dragonlanguage="" title="MESSAGE.ic(\'mono.cancel\')"\n' +
                //                 '                    type="button" class="btn bg-warning btn-labeled btn-xs pull-right"\n' +
                //                 '                    >\n' +
                //                 '                <b><i class="icon-cross2"></i></b>\n' +
                //                 '                <language>MESSAGE.ic(\'mono.cancel\')</language>\n' +
                //                 '            </button>');
                //
                //             $('.modal-content .modal-footer').append('<button\n' +
                //                 '                 id="btnS"   dragonlanguage="" title="MESSAGE.ic(\'mono.save\')"\n' +
                //                 '                    type="button" role="button" class=" btn bg-success-800 btn-labeled btn-xs pull-right"\n' +
                //                 '                   >\n' +
                //                 '                <b><i class="icon-floppy-disk"></i></b>\n' +
                //                 '                <language>MESSAGE.ic(\'mono.save\')</language>\n' +
                //                 '            </button>');
                //         }else{
                //             $('.modal-content .modal-footer').html('<span class="label label-white text-<%= TAG.table %>-300 label-rounded label-icon">\n' +
                //                 '                <i class="position-right"></i>\n' +
                //                 '                </span>\n' +
                //                 '            <button\n' +
                //                 '                   id="btnC"  onclick="MODAL.close(indicador_producto_poa)"  dragonlanguage="" title="MESSAGE.ic(\'mono.close\')"\n' +
                //                 '                    type="button" class="btn bg-secundary btn-labeled btn-xs pull-right"\n' +
                //                 '                    >\n' +
                //                 '                <b><i class="icon-cross2"></i></b>\n' +
                //                 '                <language>MESSAGE.ic(\'mono.close\')</language>\n' +
                //                 '            </button>');
                //         }
                //     }
                // },
                hide: {
                    // begin: function (data) {
                    //     if($(`[name=${indicador_producto_poa.commentName}]`).val().length >= 85){
                    //         $(`.${indicador_producto_poa.commentName}`).show();
                    //     }else{
                    //         $(`.${indicador_producto_poa.commentName}`).hide();
                    //     }
                    // },
                    end: function (data) {
                        vw_correctiva.refresh();
                        vw_correctiva.ids = 0;
                    }
                }
            },
        });
    }
});
