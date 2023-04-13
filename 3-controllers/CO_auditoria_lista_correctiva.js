app.controller("auditoria_lista_correctiva", function ($scope, $http, $compile) {
    auditoria_lista_correctiva = this;
    auditoria_lista_correctiva.session = new SESSION().current();
    auditoria_lista_correctiva.singular = "Asignar acciones de Mejora";
    auditoria_lista_correctiva.plural = "Asignar acciones de Mejora";
    auditoria_lista_correctiva.headertitle = "Asignar acciones de Mejora";
    auditoria_lista_correctiva.group_caracteristica = auditoria_lista_correctiva.session.groups[0] ? auditoria_lista_correctiva.session.groups[0].caracteristica : "";
    auditoria_lista_correctiva.Checked = false;
    auditoria_lista_correctiva.check_responsables = function () {
        if (typeof riesgo != "undefined") {
            if (riesgo) {
                if (typeof riesgo !== 'not defined') {
                    if (auditoria_lista_correctiva.group_caracteristica != ENUM_2.Grupos.director_general && auditoria_lista_correctiva.group_caracteristica != ENUM_2.Grupos.analista_de_calidad && auditoria_lista_correctiva.group_caracteristica != ENUM_2.Grupos.supervisor_de_calidad) {
                        BASEAPI.list('vw_auditoria_lista_correctiva_riesgo', {
                            limit: 0,
                            join: [
                                {
                                    "table": "auditoria_lista_correctiva_responsable",
                                    "base": "id",
                                    "field": "auditoria_lista_correctiva",
                                    "columns": ["id", "responsable"]
                                },
                            ],
                            where: [
                                {
                                    field: "riesgo",
                                    value: riesgo_a.id
                                },
                                {
                                    field: "auditoria_lista_correctiva_responsable.responsable",
                                    value: auditoria_lista_correctiva.session.id
                                }
                            ]
                        }, function (result) {
                            if (result.data.length > 0) {
                                let lista_correctiva_id = [];
                                for (var i of result.data) {
                                    lista_correctiva_id.push(i.id)
                                }
                                ;
                                auditoria_lista_correctiva.fixFilters = [
                                    {
                                        field: 'riesgo',
                                        value: riesgo_a.id,
                                    },
                                    {
                                        "field": "id",
                                        "value": lista_correctiva_id
                                    }
                                ];
                                setTimeout(function () {
                                    auditoria_lista_correctiva.refresh();
                                }, 100)
                            } else {
                                auditoria_lista_correctiva.fixFilters = [
                                    {
                                        field: 'id',
                                        value: -1,
                                    }
                                ];
                                setTimeout(function () {
                                    auditoria_lista_correctiva.refresh();
                                }, 100)
                            }
                        });
                    }
                }
            }
        }
    }
    //auditoria_lista_correctiva.destroyForm = false;
    //auditoria_lista_correctiva.permissionTable = "tabletopermission";
    RUNCONTROLLER("auditoria_lista_correctiva", auditoria_lista_correctiva, $scope, $http, $compile);
    auditoria_lista_correctiva.formulary = async function (data, mode, defaultData, view) {
        if (auditoria_lista_correctiva !== undefined) {
            delete auditoria_lista_correctiva.causa;
            RUN_B("auditoria_lista_correctiva", auditoria_lista_correctiva, $scope, $http, $compile);
            auditoria_lista_correctiva.form.modalWidth = ENUM.modal.width.full;
            auditoria_lista_correctiva.form.readonly = {};
            auditoria_lista_correctiva.firststatus = await BASEAPI.firstp('auditoria_lista_status', {
                order: "asc",
                where: [
                    {
                        field: "id",
                        value: 1
                    }
                ]
            });
            auditoria_lista_correctiva.createForm(data, mode, defaultData, view, () => {
                setTimeout(() => {

                    let larealdata = false;
                    try {
                        larealdata = JSON.parse(auditoria_lista_correctiva.causa);
                    } catch (e) {

                    }
                    auditoria_lista_correctiva.mind = new MindElixir({
                        el: '#map',
                        direction: MindElixir.LEFT,
                        // or set as data that is return from `.getAllData()`
                        // data: larealdata,
                        draggable: true, // default true
                        contextMenu: true, // default true
                        toolBar: true, // default true
                        nodeMenu: true, // default true
                        keypress: true, // default true
                    });
                    if (larealdata)
                        auditoria_lista_correctiva.mind.init(larealdata);
                    else
                        auditoria_lista_correctiva.mind.init(MindElixir.new('Raíz'));
                }, 1000);
            });

            auditoria_lista_correctiva.selectQueries['estatus_id'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: auditoria_lista_correctiva.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "auditoria_lista_correctiva"
                }
            ];
            auditoria_lista_correctiva.form.titles = {
                new: "Agregar Nueva Acción Correctiva",
                edit: "Editar Nueva Acción Correctiva"
            };
            if (typeof vw_correctiva != "undefined") {
                if (vw_correctiva) {
                    if (typeof vw_correctiva != "not defined") {
                        auditoria_lista_correctiva.form.titles = {
                            new: `Agregar nueva Acción de Mejora a la NO Conformidad "${auditoria_programa_plan_documentos_asociados_listaverificacion.descripcion}" de la auditoria "${vw_correctiva.auditoria_nombre}"`,
                            edit: `Editar nueva Acción de Mejora a la NO Conformidad "${auditoria_programa_plan_documentos_asociados_listaverificacion.descripcion}" de la auditoria "${vw_correctiva.auditoria_nombre}"`
                        };
                    }
                }
            }
            $scope.$watch("auditoria_lista_correctiva.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'nombre', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.presupuesto", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                // rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'presupuesto', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.descripcion", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'descripcion', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.elemento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'elemento', rules);
            });
            if (typeof vw_correctiva != "undefined") {
                if (vw_correctiva) {
                    if (typeof vw_correctiva != "not defined") {
                        $scope.$watch("auditoria_lista_correctiva.range_date", function (value) {
                            var rules = [];
                            //rules here
                            rules.push(VALIDATION.general.required(value));
                            VALIDATION.validate(auditoria_lista_correctiva, 'range_date', rules);
                        });
                        $scope.$watch("auditoria_lista_correctiva.fecha_inicio", function (value) {
                            var rules = [];
                            //rules here
                            rules.push(VALIDATION.general.required(value));
                            VALIDATION.validate(auditoria_lista_correctiva, 'fecha_inicio', rules);
                        });
                    }
                }
            }
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_lista_correctiva.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                if (auditoria_lista_correctiva.departamento) {
                    if (auditoria_lista_correctiva.departamento.length > 0) {
                        auditoria_lista_correctiva.selectQueries["responsable"] = [];
                    } else {
                        auditoria_lista_correctiva.responsable = [
                            {
                                field: "departamento",
                                value: -1
                            }
                        ];
                    }
                }
                auditoria_lista_correctiva.form.loadDropDown('responsable');
                VALIDATION.validate(auditoria_lista_correctiva, 'departamento', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("auditoria_lista_correctiva.responsable", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(auditoria_lista_correctiva, 'responsable', rules);
            });
            $scope.$watch("auditoria_lista_correctiva.comment", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(auditoria_lista_correctiva, 'comment', rules);
            });
        }
    };
    auditoria_lista_correctiva.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        auditoria_lista_correctiva.runMagicManyToMany('departamento_list', 'departamento',
            'auditoria_lista_correctiva', 'id', 'nombre', 'auditoria_lista_correctiva_departamento',
            'departamento', 'id');
        auditoria_lista_correctiva.runMagicManyToMany('responsable_list', 'vw_usuario',
            'auditoria_lista_correctiva', 'id', 'completo', 'auditoria_lista_correctiva_responsable',
            'responsable', 'id');
        auditoria_lista_correctiva.fileSI = [];
        if (typeof riesgo_a !== "undefined") {
            if (typeof riesgo_a !== "not defined") {
                if (riesgo_a) {
                    setTimeout(() => {
                        riesgo_a.refreshAngular();
                    }, 500);
                }
            }
        }
        if (typeof riesgo !== "undefined") {
            if (typeof riesgo !== "not defined") {
                if (riesgo) {
                    if (riesgo.esplan) {
                        riesgo.list_acciones_correctivas = await BASEAPI.listp('auditoria_lista_correctiva', {
                            limit: 0,
                            order: "desc",
                            where: [
                                {
                                    field: "riesgo",
                                    value: Matriz_id
                                }
                            ]
                        });
                        riesgo.list_acciones_correctivas = riesgo.list_acciones_correctivas.data;
                        riesgo_a.list_acciones_correctivas = riesgo.list_acciones_correctivas;

                    }
                    if (riesgo.todasaccionescorrectivas() && !riesgo.agrega_acciones) {
                        if (MODAL.current())
                            if (MODAL.current().id.indexOf("_view_") !== -1)
                                return;
                        if (riesgo.soyamfe) {
                            SWEETALERT.show({
                                type: 'warning',
                                message: "Para cerrar esta acción de mejora debe actualizar los valores de Gravedad (G), Ocurrencia (O) y Detección (D), en el entendido que con las acciones implementadas dichos valores hayan sufrido cambios",
                                confirm: function () {
                                    auditoria_lista_correctiva.refreshAngular();
                                    riesgo.refreshAngular();
                                }
                            });
                        } else {
                            SWEETALERT.show({
                                type: 'warning',
                                message: "Para cerrar esta acción de mejora debe actualizar los valores de Probabilidad e Impacto, en el entendido que con las acciones implementadas dichos valores hayan sufrido cambios",
                                confirm: function () {
                                    riesgo_a.fin_plan_accion = true;
                                    auditoria_lista_correctiva.refreshAngular();
                                    riesgo.refreshAngular();
                                }
                            });
                        }

                    }
                    setTimeout(() => {
                        riesgo.refreshAngular();
                    }, 500);
                }
            }
        }

        for (var items of records.data) {
            auditoria_lista_correctiva.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/auditoria_lista_correctiva/correctivafile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        auditoria_lista_correctiva.fileSI.push({id: items.id});
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
            await auditoria_lista_correctiva.files();
            auditoria_lista_correctiva.refreshAngular();
        }
        if (!auditoria_lista_correctiva.Checked) {
            auditoria_lista_correctiva.check_responsables();
            auditoria_lista_correctiva.Checked = true;
        }

    };
    auditoria_lista_correctiva.saveAccionCorrectiva = function () {
        VALIDATION.save(auditoria_lista_correctiva, async function () {
            var auditVar = auditoria_lista_correctiva.form.getAudit();
            var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
            // if (drp_actividades_apoyo.estatus == ENUM_2.actividad_apoyo_estatus.Cancelada) {
            //     if (LAN.money(drp_actividades_apoyo.presupuesto_consumido).value > 0) {
            //         SWEETALERT.show({
            //             type: 'error',
            //             message: "La actividad de apoyo no puede ser cancelada puesto que tiene presupuesto consumido. Favor Revisar"
            //         });
            //         var buttons = document.getElementsByClassName("btn btn-labeled");
            //         for (var item of buttons) {
            //             item.disabled = false;
            //         }
            //         return;
            //     }
            // }
            for (var item of buttons) {
                item.disabled = true;
            }
            SWEETALERT.loading({message: MESSAGE.i('mono.procesing')});
            BASEAPI.updateall('auditoria_lista_correctiva', {
                estatus: auditoria_lista_correctiva.estatus_id,
                where: [{
                    field: "id",
                    value: auditoria_lista_correctiva.id
                }]
            }, async function (result) {
                var rs = await BASEAPI.insertIDp('comentarios', {
                    "comentario": auditoria_lista_correctiva.comment,
                    "type": 27,
                    "created_by": auditoria_lista_correctiva.session.usuario_id,
                    "value": auditoria_lista_correctiva.estatus_id,
                    "value2": auditoria_lista_correctiva.id
                }, '', '');

                var alllista = await BASEAPI.listf("auditoria_lista_correctiva", [
                    {field: "riesgo", value: riesgo_a.id},
                    {field: "estatus", operator: "!=", value: 4}
                ]);
                console.log(alllista, 'ay all lista');
                if (alllista) {
                    if (alllista.length === 0) {
                        BASEAPI.updateallp('auditoria_lista_correctiva', {
                            ejecucion: "$now()",
                            where: [{field: "riesgo", value: riesgo_a.id}]
                        });
                    }
                }

                if (rs.data)
                    if (rs.data.data)
                        if (rs.data.data[0])
                            if (rs.data.data[0].id) {
                                auditoria_lista_correctiva.comment = "";
                                auditoria_lista_correctiva.refreshAngular();
                                await BASEAPI.ajax.postp(new HTTP().path(["files", "api", "copy"]), {
                                    moves: [{
                                        from: `${FOLDERS.files}/auditoria_lista_correctiva/correctivafile/${auditoria_lista_correctiva.id}`,
                                        to: `${FOLDERS.files}/comentarios_acciones_correctivas/correctivafile/${rs.data.data[0].id}`
                                    }]
                                });
                            }
                var buttons = document.getElementsByClassName("btn btn-labeled pull-right");
                for (var item of buttons) {
                    item.disabled = false;
                }
                NOTIFY.success("Comentario agregado");
                MODAL.close();
                await AUDIT.LOG(AUDIT.ACTIONS.update, 'vw_auditoria_lista_correctiva', auditVar, auditoria_lista_correctiva.form.oldData);
                auditoria_lista_correctiva.refresh();
                riesgo_a.refreshAngular();
                SWEETALERT.stop();
            });

        }, ["estatus_id", "comment"]);
    };
    auditoria_lista_correctiva.verFile = function (key, value, row) {
        auditoria_lista_correctiva.setPermission("file.upload", false);
        auditoria_lista_correctiva.setPermission("file.download", true);
        if (auditoria_lista_correctiva.group_caracteristica !== ENUM_2.Grupos.director_general) {
            auditoria_lista_correctiva.setPermission("file.remove", false);
        } else {
            auditoria_lista_correctiva.setPermission("file.remove", true);
        }
        if (typeof auditoria_lista_correctiva !== 'null') {
            if (auditoria_lista_correctiva) {
                var info = auditoria_lista_correctiva.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/auditoria_lista_correctiva/correctivafile/" + row.id, row);
                    auditoria_lista_correctiva.showfiletypes = function () {
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
                        auditoria_lista_correctiva.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'auditoria_lista_correctiva',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    auditoria_lista_correctiva.modal.modalView("templates/components/gallery", {
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
    auditoria_lista_correctiva.triggers.table.before.open = () => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
        if (auditoria_lista_correctiva.form.mode === "new")
            auditoria_lista_correctiva.id = undefined;
        resolve(true);
    });
    //
    auditoria_lista_correctiva.triggers.table.after.close = function (data) {
        auditoria_lista_correctiva.Checked = false;
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    auditoria_lista_correctiva.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        if (typeof vw_correctiva !== "undefined")
            vw_correctiva.refresh();
        if (typeof riesgo !== "undefined") {
            riesgo_a.refreshAngular();
            riesgo.refresh();
        }
        return true;
    };
    auditoria_lista_correctiva.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);

        if (auditoria_lista_correctiva.mind)
            data.inserting.causa = JSON.stringify(auditoria_lista_correctiva.mind.getAllData());

        if (auditoria_lista_correctiva.presupuesto === "") {
            data.inserting.presupuesto = 0;
        }
        if (auditoria_lista_correctiva.responsable == '[NULL]' || auditoria_lista_correctiva.responsable.length === 0) {
            SWEETALERT.show({
                type: 'error',
                message: `Debe de agregar al menos un responsable`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        data.inserting.estatus = 1;
        resolve(true);
    });
    //
    auditoria_lista_correctiva.triggers.table.after.update = function (data) {
        //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        if (typeof vw_correctiva !== "undefined")
            vw_correctiva.refresh();
        if (typeof riesgo !== "undefined") {
            riesgo_a.refreshAngular();
            riesgo.refresh();
        }
    };
    auditoria_lista_correctiva.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);

        if (auditoria_lista_correctiva.mind)
            data.updating.causa = JSON.stringify(auditoria_lista_correctiva.mind.getAllData());

        if (auditoria_lista_correctiva.responsable == '[NULL]' || auditoria_lista_correctiva.responsable.length === 0) {
            SWEETALERT.show({
                type: 'error',
                message: `Debe de agregar al menos un responsable`,
            });
            let buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        if (auditoria_lista_correctiva.estatus == 4) {
            data.updating.ejecucion = moment().format('YYYY-MM-DD hh:mm:ss');
        }
        resolve(true);
    });
    //
    auditoria_lista_correctiva.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == "range_date") {
            if (typeof riesgo != "undefined") {
                if (riesgo) {
                    if (typeof riesgo !== 'not defined') {
                        var rango_minimo = moment("01-01-" + riesgo.ano_historico).format("YYYY-MM-DD");
                        var rango_maximo = moment(("01-01-" + moment("01-01-" + riesgo.ano_historico).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
                        auditoria_lista_correctiva.range_date_min(rango_minimo);
                        auditoria_lista_correctiva.range_date_max(rango_maximo);
                        //cambio placebo
                        if (moment().format("YYYY") != moment(rango_maximo).format("YYYY")) {
                            auditoria_lista_correctiva.range_date_start(rango_minimo);
                            auditoria_lista_correctiva.range_date_end(rango_minimo);
                        }
                        auditoria_lista_correctiva.refreshAngular();
                    }
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
    auditoria_lista_correctiva.afterDelete = async function (data) {
        if (typeof riesgo !== "undefined") {
            if (typeof riesgo !== "not defined") {
                if (riesgo) {
                    if (riesgo.esplan) {
                        riesgo.list_acciones_correctivas = await BASEAPI.listp('auditoria_lista_correctiva', {
                            limit: 0,
                            order: "desc",
                            where: [
                                {
                                    field: "riesgo",
                                    value: Matriz_id
                                }
                            ]
                        });
                        riesgo.list_acciones_correctivas = riesgo.list_acciones_correctivas.data;
                        riesgo_a.list_acciones_correctivas = riesgo.list_acciones_correctivas;
                        riesgo_a.refreshAngular();
                    }
                }
            }
        }
    };
});
