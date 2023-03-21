app.controller("vw_proyecto_actividad_apoyo", function ($scope, $http, $compile) {
    vw_proyecto_actividad_apoyo = this;
    vw_proyecto_actividad_apoyo.plural = "Actividades de Apoyo";
    vw_proyecto_actividad_apoyo.headertitle = "Actividades de Apoyo";
    vw_proyecto_actividad_apoyo.singular = "Actividades de Apoyo";
    //vw_proyecto_actividad_apoyo.destroyForm = false;
    //vw_proyecto_actividad_apoyo.permissionTable = "tabletopermission";
    vw_proyecto_actividad_apoyo.session = new SESSION().current();
    vw_proyecto_actividad_apoyo.permitir = vw_proyecto_actividad_apoyo.session.groups[0] ? vw_proyecto_actividad_apoyo.session.groups[0].caracteristica : '';
    var load_me_once = false;
    var paso = false;
    vw_proyecto_actividad_apoyo.get_departamento = async function () {
        vw_proyecto_actividad_apoyo.get_data_depto = await BASEAPI.listp('usuario_departamento', {
            where: [{
                field: "usuario",
                value: vw_proyecto_actividad_apoyo.session.usuario_id
            }]
        });
        vw_proyecto_actividad_apoyo.base = [
            {
                field: "compania",
                value: vw_proyecto_actividad_apoyo.session.compania_id
            },
            {
                field: "proyecto_item_estatus",
                operator: ">",
                value: 1
            },
            {
                field: "departamento",
                value: vw_proyecto_actividad_apoyo.session.departamento
            }
        ];
        vw_proyecto_actividad_apoyo.template = [
            {
                open: "(",
                field: "id",
                value: '',
                close: ")"
            }
        ];
        if (vw_proyecto_actividad_apoyo.get_data_depto.data.length > 0) {
            vw_proyecto_actividad_apoyo.get_data_depto.data.forEach(item => {
                var where = DSON.OSO(vw_proyecto_actividad_apoyo.template);
                where[0].value = item.departamento;
                where[0].connector = "OR";

                vw_proyecto_actividad_apoyo.base.push(where[0]);
                console.log(item.departamento);
            });
            vw_proyecto_actividad_apoyo.base[vw_proyecto_actividad_apoyo.base.length - 1].connector = undefined;
        }
    };
    vw_proyecto_actividad_apoyo.get_departamento();
    vw_proyecto_actividad_apoyo.fixFilters = [
        {
            field: "responsable_id",
            value: vw_proyecto_actividad_apoyo.session.usuario_id
        },
        {
            field: "proyecto_item_estatus",
            operator: ">",
            value: 1
        },
        {
            field: "compania",
            value: vw_proyecto_actividad_apoyo.session.compania_id
        }
    ];
    RUNCONTROLLER("vw_proyecto_actividad_apoyo", vw_proyecto_actividad_apoyo, $scope, $http, $compile);
    vw_proyecto_actividad_apoyo.formulary = function (data, mode, defaultData) {
        if (vw_proyecto_actividad_apoyo !== undefined) {
            RUN_B("vw_proyecto_actividad_apoyo", vw_proyecto_actividad_apoyo, $scope, $http, $compile);
            vw_proyecto_actividad_apoyo.form.modalWidth = ENUM.modal.width.full;
            vw_proyecto_actividad_apoyo.form.readonly = {};
            vw_proyecto_actividad_apoyo.createForm(data, mode, defaultData);
            vw_proyecto_actividad_apoyo.selectQueries['estatus_id'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: vw_proyecto_actividad_apoyo.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "proyecto_actividad_apoyo"
                }
            ];
            vw_proyecto_actividad_apoyo.form.titles = {
                new: MESSAGE.i('planificacion.titleTrabajar'),
                edit: "Trabajar - Actividad de Apoyo",
                view: "Ver - Actividad de Apoyo"
            };


            $scope.$watch("vw_proyecto_actividad_apoyo.proyecto_item", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'proyecto_item', rules);
            });
            //ms_product.selectQueries['proyecto_actividad'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_proyecto_actividad_apoyo.proyecto_actividad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'proyecto_actividad', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'nombre', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'descripcion', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'departamento', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.responsable", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'responsable', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'presupuesto', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.fecha_inicio", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'fecha_inicio', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.fecha_fin", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'fecha_fin', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.razon", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'razon', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'estatus_id', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.responsable_id", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'responsable_id', rules);
            });
            $scope.$watch("vw_proyecto_actividad_apoyo.comentario", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_proyecto_actividad_apoyo, 'comentario', rules);
            });
        }
    };
    vw_proyecto_actividad_apoyo.change_filters_toMines = function () {
        vw_proyecto_actividad_apoyo.allowtoWork = true;
        vw_proyecto_actividad_apoyo.fixFilters = [
            {
                field: "responsable_id",
                value: vw_proyecto_actividad_apoyo.session.usuario_id
            },
            {
                field: "proyecto_item_estatus",
                operator: ">",
                value: 1
            },
            {
                field: "compania",
                value: vw_proyecto_actividad_apoyo.session.compania_id
            }
        ];
        vw_proyecto_actividad_apoyo.refresh();
    };
    vw_proyecto_actividad_apoyo.change_filters_toOurs = function () {
        vw_proyecto_actividad_apoyo.allowtoWork = false;
        if (vw_proyecto_actividad_apoyo.permitir) {
            if (vw_proyecto_actividad_apoyo.permitir == ENUM_2.Grupos.analista_departamental) {
                vw_proyecto_actividad_apoyo.fixFilters = [
                    {
                        field: "responsable_id",
                        value: vw_proyecto_actividad_apoyo.session.usuario_id
                    },
                    {
                        field: "proyecto_item_estatus",
                        operator: ">",
                        value: 1
                    },
                    {
                        field: "compania",
                        value: vw_proyecto_actividad_apoyo.session.compania_id
                    }
                ];
            } else if (vw_proyecto_actividad_apoyo.permitir ==  ENUM_2.Grupos.analista_de_planificacion || vw_proyecto_actividad_apoyo.permitir ==  ENUM_2.Grupos.director_general) {
                vw_proyecto_actividad_apoyo.fixFilters = [
                    {
                        field: "proyecto_item_estatus",
                        operator: ">",
                        value: 1
                    },
                    {
                        field: "compania",
                        value: vw_proyecto_actividad_apoyo.session.compania_id
                    }
                ];
            }  if (vw_proyecto_actividad_apoyo.permitir == vw_proyecto_actividad_apoyo.director_departamental) {
                vw_proyecto_actividad_apoyo.fixFilters = vw_proyecto_actividad_apoyo.base;
            }
        } else {
            vw_proyecto_actividad_apoyo.fixFilters = [];
        }
        vw_proyecto_actividad_apoyo.refresh();
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    vw_proyecto_actividad_apoyo.saveActividadApoyo = function () {
        VALIDATION.save(vw_proyecto_actividad_apoyo, async function () {
            var auditVar = vw_proyecto_actividad_apoyo.form.getAudit();
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");

            for(var item of buttons){
                item.disabled = true;
            }
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            BASEAPI.updateall('proyecto_actividad_apoyo', {
                estatus: vw_proyecto_actividad_apoyo.estatus_id,
                razon: !DSON.oseaX(vw_proyecto_actividad_apoyo.razon) ? vw_proyecto_actividad_apoyo.razon : "$NULL",
                responsable: !DSON.oseaX(vw_proyecto_actividad_apoyo.responsable_edit) ? vw_proyecto_actividad_apoyo.responsable_edit : "$null",
                where: [{
                    field: "id",
                    value: vw_proyecto_actividad_apoyo.id
                }]
            }, async function (result) {
                if (vw_proyecto_actividad_apoyo.estatus_id == ENUM_2.actividad_apoyo_proyecto_estatus.Ejecucion && vw_proyecto_actividad_apoyo.proyecto_actividad_estatus < 3){
                    BASEAPI.updateall('proyecto_item_actividad', {
                        estatus: ENUM_2.actividad_proyecto_estatus.Ejecucion,
                        where: [{
                            field: "id",
                            value: vw_proyecto_actividad_apoyo.proyecto_actividad
                        }]
                    }, async function (result) {
                        if (vw_proyecto_actividad_apoyo.proyecto_item_estatus == 1) {
                            BASEAPI.updateall('proyecto_item', {
                                estatus: 2,
                                where: [{
                                    field: "id",
                                    value: vw_proyecto_actividad_apoyo.proyecto_item_id
                                }]
                            }, async function (result) {

                            });
                        }
                    });
                }
                var rs = await BASEAPI.insertIDp('comentarios', {
                    "comentario": vw_proyecto_actividad_apoyo.comentario,
                    "type": 25,
                    "created_by": vw_proyecto_actividad_apoyo.session.usuario_id,
                    "value": vw_proyecto_actividad_apoyo.estatus_id,
                    "value2": vw_proyecto_actividad_apoyo.id
                }, '', '');
                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                vw_proyecto_actividad_apoyo.comentario = "";
                                vw_proyecto_actividad_apoyo.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/vw_proyecto_actividad_apoyo/actividad_apoyofile_comment/${vw_proyecto_actividad_apoyo.id}`,
                                        to: `${FOLDERS.files}/comentarios_p_actividad_apoyo/actividad_apoyofile_comment/${rs.data.data[0].id}`
                                    }]
                                });
                            }
                // await AUDIT.LOG(AUDIT.ACTIONS.update, drp_actividades_apoyo.auditModel,
                //     {
                //         id: drp_actividades_apoyo.id,
                //         nombre: drp_actividades_apoyo.nombre,
                //         estado: drp_actividades_apoyo.form.selected('estatus').nombre,
                //         presupuesto: drp_actividades_apoyo.act_apoyo_presupuesto
                //     },
                //     {
                //         id: drp_actividades_apoyo.id,
                //         nombre: drp_actividades_apoyo.nombre,
                //         estado: drp_actividades_apoyo.estado_antiguo,
                //         presupuesto: drp_actividades_apoyo.view_presupuesto
                //     }
                // );
                // if (drp_actividades_apoyo.estado_antiguo != drp_actividades_apoyo.estatus){
                //     if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Completa){
                //         titulo_push = `Se ha completado la Actividad de Apoyo: "${drp_actividades_apoyo.nombre}"`;
                //         cuerpo_push = `${drp_actividades_apoyo.form.selected('responsable').nombre + ' ' + drp_actividades_apoyo.form.selected('responsable').apellido} se ha completado la actividad de apoyo: "${drp_actividades_apoyo.nombre}" asignada a usted.`;
                //
                //         titulo = `Se ha completado la Actividad de Apoyo: "${drp_actividades_apoyo.nombre}"`;
                //         cuerpo = `Se ha completado la actividad de apoyo: "${drp_actividades_apoyo.nombre}". Proceder a tomar las acciones que considre pertinente.`;
                //         drp_actividades_apoyo.push_json = {
                //             title: titulo_push,
                //             content: cuerpo_push,
                //             user: [drp_actividades_apoyo.form.selected('responsable').id],
                //             url: 'drp_actividades_apoyo'
                //         };
                //         send_notification.send.send(drp_actividades_apoyo.push_json);
                //         function_send_email_group(titulo, cuerpo, titulo, cuerpo, session.compania_id, drp_actividades_apoyo.departamento, drp_actividades_apoyo.form.selected('responsable').correo, session.institucion_id);
                //     }else if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada){
                //         titulo_push = `Actividad de Apoyo: "${drp_actividades_apoyo.nombre}" ha sido cancelada.`;
                //         cuerpo_push = `Se ha cancelado la actividad de apoyo: "${drp_actividades_apoyo.nombre}" asignada a usted.`;
                //
                //         titulo = `Actividad de Apoyo:  "${drp_actividades_apoyo.nombre}" ha sido cancelada.`;
                //         cuerpo = `Se ha cancelado la actividad de apoyo: "${drp_actividades_apoyo.nombre}". Proceder a tomar las acciones que considre pertinente.`;
                //         drp_actividades_apoyo.push_json = {
                //             title: titulo_push,
                //             content: cuerpo_push,
                //             user: [drp_actividades_apoyo.form.selected('responsable').id],
                //             url: 'drp_actividades_apoyo'
                //         };
                //         send_notification.send.send(drp_actividades_apoyo.push_json);
                //         function_send_email_group(titulo, cuerpo, titulo, cuerpo, session.compania_id, drp_actividades_apoyo.departamento, drp_actividades_apoyo.form.selected('responsable').correo, session.institucion_id);
                //     }
                // }
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for(var item of buttons){
                    item.disabled = false;
                }
                NOTIFY.success("Comentario agregado");
                await AUDIT.LOG(AUDIT.ACTIONS.update, 'vw_proyecto_actividad_apoyo', auditVar,vw_proyecto_actividad_apoyo.form.oldData);
                MODAL.close();
                vw_proyecto_actividad_apoyo.refresh();
                SWEETALERT.stop();
            });

        }, ["estatus_id", "comentario"]);
    };
    vw_proyecto_actividad_apoyo.triggers.table.after.open = function (data) {
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
        setTimeout(function () {
            if (vw_proyecto_actividad_apoyo.ver) {
                vw_proyecto_actividad_apoyo.form.options.actividad_apoyofile_comment.truetext = "Ver Evidencias";
                vw_proyecto_actividad_apoyo.form.options.actividad_apoyofile_comment.title = "Ver Evidencias";
                vw_proyecto_actividad_apoyo.setPermission("file.upload", false);
                if (vw_proyecto_actividad_apoyo.permitir !== ENUM_2.Grupos.director_general){
                    vw_proyecto_actividad_apoyo.setPermission("file.remove", false);
                }else{
                    vw_proyecto_actividad_apoyo.setPermission("file.remove", true);
                }
                vw_proyecto_actividad_apoyo.refreshAngular();
            } else {
                vw_proyecto_actividad_apoyo.form.options.actividad_apoyofile_comment.truetext = "Subir Evidencias";
                vw_proyecto_actividad_apoyo.form.options.actividad_apoyofile_comment.title = "Subir Evidencias";
                vw_proyecto_actividad_apoyo.setPermission("file.upload", true);
                vw_proyecto_actividad_apoyo.setPermission("file.remove", true);
                vw_proyecto_actividad_apoyo.refreshAngular();
            }
        }, 4000);
    };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    vw_proyecto_actividad_apoyo.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        paso = false;
        vw_proyecto_actividad_apoyo.refresh();
        // drp_actividades_apoyo.ver = false;
    };
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
    vw_proyecto_actividad_apoyo.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data === 'proyecto_actividad_info') {
            if (vw_proyecto_actividad_apoyo.form.selected('proyecto_actividad_info') !== null) {
                vw_proyecto_actividad_apoyo.departamento_actividad = vw_proyecto_actividad_apoyo.form.selected('proyecto_actividad_info').departamento + "";
                vw_proyecto_actividad_apoyo.producto_actividad = vw_proyecto_actividad_apoyo.form.selected('proyecto_actividad_info').proyecto_item_nombre + "";
                vw_proyecto_actividad_apoyo.responsable_actividad = vw_proyecto_actividad_apoyo.form.selected('proyecto_actividad_info').responsable;
                vw_proyecto_actividad_apoyo.presupuesto_actividad = LAN.money(vw_proyecto_actividad_apoyo.form.selected('proyecto_actividad_info').presupuesto).format(true);
                vw_proyecto_actividad_apoyo.estatus_nombre_actividad = vw_proyecto_actividad_apoyo.form.selected('proyecto_actividad_info').estatus;
                vw_proyecto_actividad_apoyo.refreshAngular();
            }
        }
        if (data == 'responsable_edit') {
            vw_proyecto_actividad_apoyo.responsable_edit = vw_proyecto_actividad_apoyo.responsable_id + "";
            if (vw_proyecto_actividad_apoyo.permitir == ENUM_2.Grupos.director_departamental && vw_proyecto_actividad_apoyo.condition !== "Vencida") {
                vw_proyecto_actividad_apoyo.selectQueries['responsable_edit'] = [
                    {
                        field: 'departamento',
                        operator: '=',
                        value: vw_proyecto_actividad_apoyo.session.departamento
                    }
                ];
                if (!load_me_once) {
                    vw_proyecto_actividad_apoyo.form.loadDropDown('responsable_edit')
                    load_me_once = true;
                }
                vw_proyecto_actividad_apoyo.show_drp = true;
            }else if (vw_proyecto_actividad_apoyo.permitir == ENUM_2.Grupos.director_general){
                vw_proyecto_actividad_apoyo.selectQueries['responsable_edit'] = [
                    {
                        field: 'departamento',
                        operator: '=',
                        value: vw_proyecto_actividad_apoyo.departamento_id
                    }
                ];
                if (!load_me_once) {
                    vw_proyecto_actividad_apoyo.form.loadDropDown('responsable_edit')
                    load_me_once = true;
                }
                vw_proyecto_actividad_apoyo.show_drp = true;
                vw_proyecto_actividad_apoyo.refreshAngular();
            }
        }
    };
    vw_proyecto_actividad_apoyo.triggers.table.after.load = async function (records) {
        vw_proyecto_actividad_apoyo.fileSI = [];
        if (records.data) {
            if (records.data.length > 0) {
                for (var items of records.data) {
                    vw_proyecto_actividad_apoyo.files = () => new Promise(async (resolve, reject) => {
                        BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/vw_proyecto_actividad_apoyo/actividad_apoyofile_comment/' + items.id}, function (result) {
                            if (result.data.count > 0) {
                                vw_proyecto_actividad_apoyo.fileSI.push({id: items.id});
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
                    await vw_proyecto_actividad_apoyo.files();
                    vw_proyecto_actividad_apoyo.refreshAngular();
                }
            }
        }
    };
    vw_proyecto_actividad_apoyo.verFile = function (key, value, row) {
        vw_proyecto_actividad_apoyo.setPermission("file.upload", false);
        if (vw_proyecto_actividad_apoyo.permitir !== ENUM_2.Grupos.director_general){
            vw_proyecto_actividad_apoyo.setPermission("file.remove", false);
        }else{
            vw_proyecto_actividad_apoyo.setPermission("file.remove", true);
        }
        if (typeof vw_proyecto_actividad_apoyo !== 'null') {
            if (vw_proyecto_actividad_apoyo) {
                var info = vw_proyecto_actividad_apoyo.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/vw_proyecto_actividad_apoyo/actividad_apoyofile_comment/" + row.id, row);
                    vw_proyecto_actividad_apoyo.showfiletypes = function () {
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
                        vw_proyecto_actividad_apoyo.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'vw_proyecto_actividad_apoyo',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_proyecto_actividad_apoyo.modal.modalView("templates/components/gallery", {
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
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});