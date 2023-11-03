app.controller("vw_riesgo_view", function ($scope, $http, $compile) {
    vw_riesgo_view = this;
    //vw_riesgo_view.fixFilters = [];
    vw_riesgo_view.session = new SESSION().current();
    //vw_riesgo_view.fixFilters = [{
    //    field: "compania",
    //    value: vw_riesgo_view.session.compania_id
    //}];
    //vw_riesgo_view.singular = "singular";
    //vw_riesgo_view.plural = "plural";
    vw_riesgo_view.headertitle = "Matriz de Riesgo";
    //vw_riesgo_view.destroyForm = false;
    //vw_riesgo_view.permissionTable = "tabletopermission";
    vw_riesgo_view.entidad = window.location.href.split('?')[1] || "amfe";
    if (vw_riesgo_view.entidad == "amfe") {
        CRUD_vw_riesgo_view = {};
        DSON.keepmerge(CRUD_vw_riesgo_view, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_vw_riesgo_view, {
            table: {
                width: "width:1600px;",
                view: 'vw_riesgo',
                //method: 'riesgo',
                //limits: [10, 50, 100, 0],
                //report: true,
                batch: false,
                //persist: false,
                //sortable: false,
                //dragrow: 'num',
                //rowStyle: function (row, $scope) {
                //    return "color:red;";
                //},
                //rowClass: function (row, $scope) {
                //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
                //},
                //activeColumn: "active",
                //key: 'id',
                //deletekeys: ['id'],
                columns: {
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    entidad: {
                        label: function (){
                            return "Entidad"
                        }
                    },
                    registro_nombre: {
                        label: function() {
                            return "Nombre"
                        }
                    },
                    elemento: {
                        shorttext: 360,
                        label: function () {
                            return "Elemento del Proceso"
                        },
                    },
                    riesgo_a: {
                        label: function () {
                            return "Fallo"
                        }
                    },
                    descripcion: {shorttext: 360},
                    mamfe_efecto: {
                        shorttext: 360,
                        label: function () {
                            return "Efecto"
                        },
                    },
                    mamfe_causa: {
                        shorttext: 360,
                        label: function () {
                            return "Causa"
                        },
                    },
                    departamento_nombre: {
                        label: function () {
                            return "Departamento"
                        }
                    },
                    riesgo_control: {
                        label: function () {
                            return "Controles Actuales del Riesgo"
                        },
                        export: false,
                        exportExample: false
                    },
                    mamfe_gravedad: {
                        label: function () {
                            return "Gravedad (G)"
                        }
                    },
                    mamfe_ocurrencia: {
                        label: function () {
                            return "Ocurrencia (O)"
                        }
                    },
                    mamfe_deteccion: {
                        label: function () {
                            return "Detección (D)"
                        }
                    },
                    indice: {
                        label: function () {
                            return "Índice de Prioridad de Riesgos (IPR=GxOxD)"
                        },
                        format: function (row) {
                            return (row.mamfe_gravedad || 0) * (row.mamfe_ocurrencia || 0) * (row.mamfe_deteccion || 0);
                        }
                    },
                    estado: {
                        label: function () {
                            return "Estatus"
                        },
                        export: true,
                        format: function (row) {
                            var nom = row.estado;
                            $(`.Monitoreado`).css('background', '#FF0000');
                            $(`.NoMonitoreado`).css('background', '#548235');
                            $(`.PendienteaTrabajar`).css('background', '#CECECE');
                            return `<div title="${row.estado}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        }
                    },
                    evaluacion: {
                        label: function () {
                            return "Observación Monitoreo del Riesgo"
                        }
                    },
                    ocurrencia_nombre: {
                        label: function () {
                            return "Ocurrencia del Riesgo"
                        },
                        export: true,
                        format: function (row) {
                            var nom = row.ocurrencia_nombre;
                            $(`.ConOcurrencia`).css('background', '#e32619');
                            $(`.SinOcurrencia`).css('background', '#548235');
                            return `<div title="${row.ocurrencia_nombre}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        }
                    },
                },
                filters: {
                    columns: [
                        {
                            key: 'registro',
                            label: 'Registro',
                            type: FILTER.types.relation,
                            table: 'pnpsp',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'nombre',
                            label: 'Nombre',
                            type: FILTER.types.string,
                            placeholder: 'Nombre'
                        },
                        {
                            key: 'descripcion',
                            label: 'Descripción',
                            type: FILTER.types.string,
                            placeholder: 'Descripción'
                        },
                        {
                            key: 'probabilidad',
                            label: 'Probabilidad',
                            type: FILTER.types.relation,
                            table: 'riesgo_probabilidad',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [{
                                    "field": new SESSION().current().institucion_id ? "institucion" : "compania",
                                    "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id : -1
                                }],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'impacto',
                            label: 'Impacto',
                            type: FILTER.types.relation,
                            table: 'riesgo_impacto',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [{
                                    "field": new SESSION().current().institucion_id ? "institucion" : "compania",
                                    "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id : -1
                                }],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'factor_riesgo',
                            label: 'Factor de Riesgo',
                            type: FILTER.types.decimal,
                            placeholder: 'Factor de Riesgo'
                        },
                        {
                            key: 'consecuencia',
                            label: function(){
                                return 'Efecto'
                            },
                            type: FILTER.types.string,
                            placeholder: function(){
                                return 'Efecto'
                            },
                        },
                        {
                            key: 'departamento',
                            label: 'Departamento',
                            type: FILTER.types.relation,
                            table: 'departamento',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [
                                    {
                                        "field": "compania",
                                        "value": vw_riesgo_view.session ? vw_riesgo_view.session.compania_id : -1
                                    },
                                    {
                                        "field": "institucion",
                                        "operator": vw_riesgo_view.session.institucion_id ? "=" : "is",
                                        "value": vw_riesgo_view.session ? vw_riesgo_view.session.institucion_id ? vw_riesgo_view.session.institucion_id : "$null" : -1
                                    }
                                ],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                    ]
                },
                options: [
                    {
                        text: (data) => {
                            return "";
                        },
                        title: (data) => {
                            if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                                if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                                    return MESSAGE.i('actions.Edit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Remove');
                                }
                            } else {
                                return MESSAGE.i('actions.Edit') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.Remove') + ", " +
                                    MESSAGE.i('actions.audit');
                            }
                        },
                        icon: (data) => {
                            return "cog2";
                        },
                        permission: (data) => {
                            return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
                        },
                        characterist: (data) => {
                            return '';
                        },
                        show: (data) => {
                            return data.row.estado == "Pendiente a Trabajar"
                        },
                        click: function (data) {
                            console.log(data.row.evaluacion && data.row.estado == "Pendiente a Trabajar");
                        },
                        menus: [
                            {
                                text: (data) => {
                                    return MESSAGE.i('actions.Edit');
                                },
                                icon: (data) => {
                                    return "pencil5";
                                },
                                permission: (data) => {
                                    return 'edit';
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                show: function (data) {
                                    return true;
                                },
                                click: function (data) {
                                    console.log(data.row);
                                    Row_id = '';
                                    data.$scope.formulary({
                                        where: [{
                                            field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                            value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                        }]
                                    }, FORM.modes.edit, {});
                                    return false;
                                }
                            },
                            {
                                text: (data) => {
                                    return MESSAGE.i('actions.View');
                                },
                                icon: (data) => {
                                    return "eye";
                                },
                                permission: (data) => {
                                    return 'view';
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
                                }
                            },
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
                            {
                                text: (data) => {
                                    return MESSAGE.i('actions.audit');
                                },
                                title: (data) => {
                                    return MESSAGE.i('actions.audit');
                                },
                                permission: (data) => {
                                    return 'audit';
                                },
                                icon: (data) => {
                                    return "stack-text";
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                show: (data) => {
                                    return false;
                                },
                                click: function (data) {
                                    if (!DSON.oseaX(data.row)) {
                                        data.$scope.dataForView = data.row;
                                        data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                            header: {
                                                title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
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
                        ]
                    },
                    {
                        title: (data) => {
                            return "Monitorear Riesgo"
                        },
                        text: (data) => {
                            return "Monitorear Riesgo"
                        },
                        icon: (data) => {
                            return "circles";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            console.log(!data.row.evaluacion)
                            return !data.row.evaluacion;
                        },
                        click: function (data) {
                            console.log(data.row);
                            Row_id = data.row.id;
                            baseController.modal.modalView("riesgo_a/evaluacion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Monitorear Riesgo: "' + data.row.nombre + '"',
                                    icon: "circles"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                            });
                            return false;
                        }
                    },
                    {
                        title: (data) => {
                            return "Trabajar Respuesta al Riesgo"
                        },
                        text: (data) => {
                            return "Trabajar Respuesta al Riesgo"
                        },
                        icon: (data) => {
                            return "check";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return data.row.evaluacion && data.row.estado == "Pendiente a Trabajar";
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'matriz_riesgo';
                            SWEETALERT.buttons(
                                {
                                    message: "<p style='margin-top: -15px'>¿Desea dar Respuesta al Riesgo?</p>",
                                },
                                [
                                    {
                                        text: "Si",
                                        color: "success",
                                        action: function () {
                                            swal.close();
                                            BASEAPI.list('riesgo_control', {
                                                limit: 0,
                                                where: [
                                                    {
                                                        field: "riesgo",
                                                        value: data.row.riesgo_a_id
                                                    }
                                                ]
                                            }, function (result) {
                                                if (result.data.length) {
                                                    result.data.forEach(item => {
                                                        Object.keys(item).forEach(field => {
                                                            if (item[field])
                                                                if (item[field].split)
                                                                    if (item[field].split('-').length > 2) {
                                                                        let isDate = item[field].split('T');
                                                                        if (isDate.length === 2) {
                                                                            item[field] = isDate[0];
                                                                        }
                                                                    }
                                                            if (item[field] === null)
                                                                delete item[field];

                                                            item.riesgo_control = data.row.id;
                                                            item.mamfe = 1;
                                                        });
                                                        delete item.id;
                                                    });
                                                }
                                                if (result.data.length > 0) {

                                                    BASEAPI.insert('riesgo_matriz_control', result.data, function (result2) {
                                                        baseController.modal.modalView("riesgo_a/plan_accion_mamfe", {
                                                            width: ENUM.modal.width.full,
                                                            header: {
                                                                title: 'Trabajar Respuesta al Riesgo: "' + data.row.nombre + '"',
                                                                icon: "check"
                                                            },
                                                            footer: {
                                                                cancelButton: false
                                                            },
                                                            content: {
                                                                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                                                sameController: 'riesgo_a'
                                                            },
                                                            event: {
                                                                show: {
                                                                    end: function () {
                                                                        setTimeout(function () {
                                                                            if (typeof riesgo_a !== 'undefined') {
                                                                                if (typeof riesgo_a !== 'not defined') {
                                                                                    if (riesgo_a) {
                                                                                        riesgo_a.getFromView(data.row);
                                                                                        riesgo_a.refreshAngular();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }, 1000)
                                                                    }
                                                                }
                                                            }
                                                        });
                                                        BASEAPI.updateall('riesgo', {
                                                            "estado": 1,
                                                            "estado_plan_accion": 1,
                                                            where: [
                                                                {
                                                                    field: "id",
                                                                    value: data.row.id
                                                                }
                                                            ]
                                                        }, function (result) {
                                                            data.$scope.refresh();
                                                            data.row.estado = 1;
                                                            data.row.estado_plan_accion_nombre = "Iniciado";
                                                            data.row.estado_plan_accion = 1;
                                                            setTimeout(function () {
                                                                if (typeof riesgo_a !== 'undefined') {
                                                                    if (typeof riesgo_a !== 'not defined') {
                                                                        if (riesgo_a) {
                                                                            riesgo_a.getFromView(data.row);
                                                                            riesgo_a.refreshAngular();
                                                                        }
                                                                    }
                                                                }
                                                            }, 1000)
                                                            // setTimeout(function (){
                                                            //     riesgo_a.getFromView(data.row);
                                                            //
                                                            // }, 1000)
                                                        });
                                                    })
                                                } else {
                                                    baseController.modal.modalView("riesgo_a/plan_accion_mamfe", {
                                                        width: ENUM.modal.width.full,
                                                        header: {
                                                            title: 'Trabajar Respuesta al Riesgo: "' + data.row.nombre + '"',
                                                            icon: "check"
                                                        },
                                                        footer: {
                                                            cancelButton: false
                                                        },
                                                        content: {
                                                            loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                                            sameController: 'riesgo_a'
                                                        },
                                                        event: {
                                                            show: {
                                                                end: function () {
                                                                    setTimeout(function () {
                                                                        if (typeof riesgo_a !== 'undefined') {
                                                                            if (typeof riesgo_a !== 'not defined') {
                                                                                if (riesgo_a) {
                                                                                    riesgo_a.getFromView(data.row);
                                                                                    riesgo_a.refreshAngular();
                                                                                }
                                                                            }
                                                                        }
                                                                    }, 1000)
                                                                }
                                                            }
                                                        }
                                                    });
                                                    BASEAPI.updateall('riesgo', {
                                                        "estado": 1,
                                                        "estado_plan_accion": 1,
                                                        where: [
                                                            {
                                                                field: "id",
                                                                value: data.row.id
                                                            }
                                                        ]
                                                    }, function (result) {
                                                        data.$scope.refresh();
                                                        data.row.estado = 1;
                                                        data.row.estado_plan_accion_nombre = "Iniciado";
                                                        data.row.estado_plan_accion = 1;
                                                        setTimeout(function () {
                                                            if (typeof riesgo_a !== 'undefined') {
                                                                if (typeof riesgo_a !== 'not defined') {
                                                                    if (riesgo_a) {
                                                                        riesgo_a.getFromView(data.row);
                                                                        riesgo_a.refreshAngular();
                                                                    }
                                                                }
                                                            }
                                                        }, 1000)
                                                        // setTimeout(function (){
                                                        //     riesgo_a.getFromView(data.row);
                                                        //
                                                        // }, 1000)
                                                    });
                                                }
                                            })
                                            return false;

                                        }
                                    },
                                    {
                                        text: "No",
                                        color: "warning",
                                        action: function () {
                                            BASEAPI.updateall('riesgo', {
                                                "estado": 2,
                                                where: [
                                                    {
                                                        field: "id",
                                                        value: data.row.id
                                                    }
                                                ]
                                            }, function (result) {
                                                swal.close();
                                                data.$scope.refresh();
                                            });

                                        }
                                    },
                                    {
                                        text: "Volver Atrás",
                                        color: "info",
                                        action: function () {
                                            swal.close()
                                        }
                                    }
                                ]
                            )
                            $('.swal2-animate-info-icon').css({'width': '70px', 'height': '70px'})
                            // Row_id = data.row.id;
                            // baseController.modal.modalView("riesgo_a/evaluacion", {
                            //     width: ENUM.modal.width.full,
                            //     header: {
                            //         title: 'Evaluación del Riesgo: "' + data.row.nombre + '"',
                            //         icon: "circles"
                            //     },
                            //     footer: {
                            //         cancelButton: false
                            //     },
                            //     content: {
                            //         loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            //         sameController: 'riesgo_a'
                            //     },
                            // });
                            return false;
                        }
                    },
                    {
                        title: (data) => {
                            return "Trabajar ";
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return data.row.estado_plan_accion_nombre == "Iniciado"
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';
                            baseController.modal.modalView("riesgo_a/plan_accion_mamfe", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Trabajar Respuesta al Riesgo: "' + data.row.nombre + '"',
                                    icon: "hammer-wrench"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                                event: {
                                    show: {
                                        end: function () {
                                            setTimeout(function () {
                                                if (typeof riesgo_a !== 'undefined') {
                                                    if (typeof riesgo_a !== 'not defined') {
                                                        if (riesgo_a) {
                                                            riesgo_a.getFromView(data.row);
                                                            riesgo_a.refreshAngular();
                                                        }
                                                    }
                                                }
                                            }, 1000)
                                        }
                                    }
                                }
                            });
                            BASEAPI.list('riesgo', {
                                limit: 1
                            }, function (result) {
                                data.$scope.refresh();
                                if (typeof riesgo_a !== 'undefined') {
                                    if (typeof riesgo_a !== 'not defined') {
                                        if (riesgo_a) {
                                            riesgo_a.getFromView(data.row);
                                        }
                                    }
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: 'Ver Proceso: "' + data.row.nombre + '"',
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
                ],
                single: [
                    {
                        "table": "departamento",
                        "base": "departamento",
                        "field": "id",
                        "columns": ["id", "nombre"]
                    },
                ]
            }
        });
    } else {
        CRUD_vw_riesgo_view = {};
        DSON.keepmerge(CRUD_vw_riesgo_view, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_vw_riesgo_view, {
            table: {
                width: "width:1600px;",
                view: 'vw_riesgo',
                //method: 'riesgo',
                //limits: [10, 50, 100, 0],
                //report: true,
                batch: false,
                //persist: false,
                //sortable: false,
                //dragrow: 'num',
                //rowStyle: function (row, $scope) {
                //    return "color:red;";
                //},
                //rowClass: function (row, $scope) {
                //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
                //},
                //activeColumn: "active",
                //key: 'id',
                //deletekeys: ['id'],
                columns: {
                    // dbcolumnname: {
                    //     visible: false,
                    //     visibleDetail: false,
                    //     export: false,
                    //     exportExample: false,
                    //     sortable: false,
                    //     shorttext: 360,
                    //     dead:true,
                    //     formattype: ENUM.FORMAT.numeric,
                    //     sorttype: ENUM.FORMATFILTER.numeric,
                    //     drag: true,
                    //     click: function (data) {
                    //         alert(data.row.id);
                    //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                    //     },
                    //     reference: "id",
                    //     format: function (row) {
                    //         return row.id + "*";
                    //     }
                    // },
                    id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    riesgo_a_id: {
                        visible: false,
                        visibleDetail: false,
                        export: false,
                        exportExample: false,
                        dead: true
                    },
                    riesgo_a: {
                        label: function () {
                            return "Riesgo"
                        }
                    },
                    entidad: {
                        label: function (){
                            return "Entidad"
                        }
                    },
                    registro_nombre: {
                        label: function() {
                            return "Nombre"
                        }
                    },
                    descripcion: {shorttext: 360},
                    probabilidad_nombre: {
                        label: function () {
                            return "Probalidad"
                        },
                        format: function (row) {
                            return row.probabilidad_nombre + " - " + parseInt(row.probabilidad_valor) + "%";
                        }
                    },
                    impacto_nombre: {
                        label: function () {
                            return "Impacto"
                        },
                        format: function (row) {
                            return row.impacto_nombre + " - " + parseInt(row.impacto_valor) + "";
                        }
                    },
                    nivel_riesgo_v: {
                        label: function () {
                            return "Nivel de Riesgo"
                        },
                        format: function (row) {
                            $(`.maring-bottom`).css('margin-bottom', '0');
                            return `<div class="${row.nivel_riesgo}"><p class="maring-bottom">${row.nivel_riesgo}</p>(${parseFloat(row.nivel_riesgo_v).toFixed(2)})</div>`
                        }
                    },
                    departamento_nombre: {
                        label: function () {
                            return "Departamento"
                        }
                    },
                    factor_riesgo: {
                        label: function () {
                            return "Factor de Riesgo"
                        }
                    },
                    causa_debilidad: {
                        label: function () {
                            return "Causa o Debilidad"
                        }
                    },
                    consecuencia: {
                        label: function () {
                            return "Efecto"
                        }
                    },
                    supuestos: {
                        label: function () {
                            return "Supuestos"
                        }
                    },
                    estado: {
                        label: function () {
                            return "Estatus"
                        },
                        export: true,
                        format: function (row) {
                            var nom = row.estado;
                            $(`.Monitoreado`).css('background', '#FF0000');
                            $(`.NoMonitoreado`).css('background', '#548235');
                            $(`.PendienteaTrabajar`).css('background', '#CECECE');
                            return `<div title="${row.estado}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        },
                    },
                    evaluacion: {
                        label: function () {
                            return "Observación Monitoreo del Riesgo"
                        }
                    },
                    riesgo_control: {
                        label: function () {
                            return "Controles de Riesgo"
                        },
                        export: false,
                        exportExample: false
                    },
                    riesgo_controls: {
                        label: function () {
                            return "Controles de Riesgo"
                        },
                        visible: false,
                        visibleDetail: false,
                        export: true,
                        exportExample: true,
                        checkExport: true,
                        dead: true
                    },
                    ocurrencia_nombre: {
                        label: function () {
                            return "Ocurrencia del Riesgo"
                        },
                        export: true,
                        format: function (row) {
                            var nom = row.ocurrencia_nombre;
                            $(`.ConOcurrencia`).css('background', '#e32619');
                            $(`.SinOcurrencia`).css('background', '#548235');
                            $(`.PendienteaTrabajarO`).css('background', 'none');
                            return `<div title="${row.ocurrencia_nombre}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        },
                    },
                },
                filters: {
                    columns: [
                        {
                            key: 'registro',
                            label: 'Registro',
                            type: FILTER.types.relation,
                            table: 'pnpsp',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'nombre',
                            label: 'Nombre',
                            type: FILTER.types.string,
                            placeholder: 'Nombre'
                        },
                        {
                            key: 'descripcion',
                            label: 'Descripción',
                            type: FILTER.types.string,
                            placeholder: 'Descripción'
                        },
                        {
                            key: 'probabilidad',
                            label: 'Probabilidad',
                            type: FILTER.types.relation,
                            table: 'riesgo_probabilidad',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [{
                                    "field": new SESSION().current().institucion_id ? "institucion" : "compania",
                                    "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id : -1
                                }],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'impacto',
                            label: 'Impacto',
                            type: FILTER.types.relation,
                            table: 'riesgo_impacto',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [{
                                    "field": new SESSION().current().institucion_id ? "institucion" : "compania",
                                    "value": new SESSION().current() ? new SESSION().current().institucion_id ? new SESSION().current().institucion_id : new SESSION().current().compania_id : -1
                                }],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                        {
                            key: 'factor_riesgo',
                            label: 'Factor de Riesgo',
                            type: FILTER.types.decimal,
                            placeholder: 'Factor de Riesgo'
                        },
                        {
                            key: 'consecuencia',
                            label: function(){
                                return 'Efecto'
                            },
                            type: FILTER.types.string,
                            placeholder: function(){
                                return 'Efecto'
                            },
                        },
                        {
                            key: 'departamento',
                            label: 'Departamento',
                            type: FILTER.types.relation,
                            table: 'departamento',
                            value: "id",
                            text: "item.nombre",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [
                                    {
                                        "field": "compania",
                                        "value": vw_riesgo_view.session ? vw_riesgo_view.session.compania_id : -1
                                    },
                                    {
                                        "field": "institucion",
                                        "operator": vw_riesgo_view.session.institucion_id ? "=" : "is",
                                        "value": vw_riesgo_view.session ? vw_riesgo_view.session.institucion_id ? vw_riesgo_view.session.institucion_id : "$null" : -1
                                    }
                                ],
                                orderby: "id",
                                order: "asc",
                                distinct: false
                            },
                        },
                    ]
                },
                options: [
                    {
                        text: (data) => {
                            return "";
                        },
                        title: (data) => {
                            if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined") {
                                if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit) {
                                    return MESSAGE.i('actions.Remove') + ", " +
                                        MESSAGE.i('actions.audit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.Edit') + ", " +
                                        MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.View') + ", " +
                                        MESSAGE.i('actions.Remove');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit) {
                                    return MESSAGE.i('actions.Edit');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view) {
                                    return MESSAGE.i('actions.View');
                                } else if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove) {
                                    return MESSAGE.i('actions.Remove');
                                }
                            } else {
                                return MESSAGE.i('actions.Edit') + ", " +
                                    MESSAGE.i('actions.View') + ", " +
                                    MESSAGE.i('actions.Remove') + ", " +
                                    MESSAGE.i('actions.audit');
                            }
                        },
                        icon: (data) => {
                            return "cog2";
                        },
                        permission: (data) => {
                            return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
                        },
                        characterist: (data) => {
                            return '';
                        },
                        click: function (data) {
                            console.log(data.row.evaluacion && data.row.estado == "Pendiente a Trabajar");
                        },
                        show: (data) => {
                            return data.row.estado == "Pendiente a Trabajar"
                        },
                        menus: [
                            {
                                text: (data) => {
                                    return MESSAGE.i('actions.Edit');
                                },
                                icon: (data) => {
                                    return "pencil5";
                                },
                                permission: (data) => {
                                    return 'edit';
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                show: function (data) {
                                    return true;
                                },
                                click: function (data) {
                                    Row_id = '';
                                    data.$scope.formulary({
                                        where: [{
                                            field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                            value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                        }]
                                    }, FORM.modes.edit, {});
                                    return false;
                                }
                            },
                            {
                                text: (data) => {
                                    return MESSAGE.i('actions.View');
                                },
                                icon: (data) => {
                                    return "eye";
                                },
                                permission: (data) => {
                                    return 'view';
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
                                }
                            },
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
                            {
                                text: (data) => {
                                    return MESSAGE.i('actions.audit');
                                },
                                title: (data) => {
                                    return MESSAGE.i('actions.audit');
                                },
                                permission: (data) => {
                                    return 'audit';
                                },
                                icon: (data) => {
                                    return "stack-text";
                                },
                                characterist: (data) => {
                                    return "";
                                },
                                show: (data) => {
                                    return false;
                                },
                                click: function (data) {
                                    if (!DSON.oseaX(data.row)) {
                                        data.$scope.dataForView = data.row;
                                        data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                            header: {
                                                title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
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
                        ]
                    },
                    {
                        title: (data) => {
                            return "Monitorear Riesgo"
                        },
                        text: (data) => {
                            return "Monitorear Riesgo"
                        },
                        icon: (data) => {
                            return "circles";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return !data.row.evaluacion;
                        },
                        click: function (data) {
                            console.log(data.row);
                            Row_id = data.row.id;
                            baseController.modal.modalView("riesgo_a/evaluacion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Monitorear Riesgo: "' + data.row.nombre + '"',
                                    icon: "circles"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                            });
                            return false;
                        }
                    },
                    {
                        title: (data) => {
                            return "Trabajar Respuesta al Riesgo"
                        },
                        text: (data) => {
                            return "Trabajar Respuesta al Riesgo"
                        },
                        icon: (data) => {
                            return "check";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return data.row.evaluacion && data.row.estado == "Pendiente a Trabajar";
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'matriz_riesgo';
                            SWEETALERT.buttons(
                                {
                                    message: "<p style='margin-top: -15px'>¿Desea dar Respuesta al Riesgo?</p>",
                                },
                                [
                                    {
                                        text: "Si",
                                        color: "success",
                                        action: function () {
                                            swal.close();
                                            BASEAPI.list('riesgo_control', {
                                                limit: 0,
                                                where: [
                                                    {
                                                        field: "riesgo",
                                                        value: data.row.riesgo_a_id
                                                    }
                                                ]
                                            }, function (result) {
                                                if (result.data.length) {
                                                    result.data.forEach(item => {
                                                        Object.keys(item).forEach(field => {
                                                            if (item[field])
                                                                if (item[field].split)
                                                                    if (item[field].split('-').length > 2) {
                                                                        let isDate = item[field].split('T');
                                                                        if (isDate.length === 2) {
                                                                            item[field] = isDate[0];
                                                                        }
                                                                    }
                                                            if (item[field] === null)
                                                                delete item[field];

                                                            item.riesgo_control = data.row.id;

                                                        });
                                                        delete item.id;
                                                    });
                                                }
                                                if (result.data.length > 0) {
                                                    BASEAPI.insert('riesgo_matriz_control', result.data, function (result2) {
                                                        baseController.modal.modalView("riesgo_a/plan_accion", {
                                                            width: ENUM.modal.width.full,
                                                            header: {
                                                                title: 'Trabajar Respuesta al Riesgo: "' + data.row.nombre + '"',
                                                                icon: "check"
                                                            },
                                                            footer: {
                                                                cancelButton: false
                                                            },
                                                            content: {
                                                                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                                                sameController: 'riesgo_a'
                                                            },
                                                            event: {
                                                                show: {
                                                                    end: function () {
                                                                        setTimeout(function () {
                                                                            if (typeof riesgo_a !== 'undefined') {
                                                                                if (typeof riesgo_a !== 'not defined') {
                                                                                    if (riesgo_a) {
                                                                                        riesgo_a.getFromView(data.row);
                                                                                        riesgo_a.refreshAngular();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }, 1000)
                                                                    }
                                                                }
                                                            }
                                                        });
                                                        BASEAPI.updateall('riesgo', {
                                                            "estado": 1,
                                                            "estado_plan_accion": 1,
                                                            where: [
                                                                {
                                                                    field: "id",
                                                                    value: data.row.id
                                                                }
                                                            ]
                                                        }, function (result) {
                                                            data.$scope.refresh();
                                                            data.row.estado = 1;
                                                            data.row.estado_plan_accion_nombre = "Iniciado";
                                                            data.row.estado_plan_accion = 1;
                                                            setTimeout(function () {
                                                                if (typeof riesgo_a !== 'undefined') {
                                                                    if (typeof riesgo_a !== 'not defined') {
                                                                        if (riesgo_a) {
                                                                            riesgo_a.getFromView(data.row);
                                                                            riesgo_a.refreshAngular();
                                                                        }
                                                                    }
                                                                }
                                                            }, 1000)
                                                            // setTimeout(function (){
                                                            //     riesgo_a.getFromView(data.row);
                                                            //
                                                            // }, 1000)
                                                        });
                                                    })
                                                } else {
                                                    baseController.modal.modalView("riesgo_a/plan_accion", {
                                                        width: ENUM.modal.width.full,
                                                        header: {
                                                            title: 'Trabajar Respuesta al Riesgo: "' + data.row.nombre + '"',
                                                            icon: "check"
                                                        },
                                                        footer: {
                                                            cancelButton: false
                                                        },
                                                        content: {
                                                            loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                                            sameController: 'riesgo_a'
                                                        },
                                                        event: {
                                                            show: {
                                                                end: function () {
                                                                    setTimeout(function () {
                                                                        if (typeof riesgo_a !== 'undefined') {
                                                                            if (typeof riesgo_a !== 'not defined') {
                                                                                if (riesgo_a) {
                                                                                    riesgo_a.getFromView(data.row);
                                                                                    riesgo_a.refreshAngular();
                                                                                }
                                                                            }
                                                                        }
                                                                    }, 1000)
                                                                }
                                                            }
                                                        }
                                                    });
                                                    BASEAPI.updateall('riesgo', {
                                                        "estado": 1,
                                                        "estado_plan_accion": 1,
                                                        where: [
                                                            {
                                                                field: "id",
                                                                value: data.row.id
                                                            }
                                                        ]
                                                    }, function (result) {
                                                        data.$scope.refresh();
                                                        data.row.estado = 1;
                                                        data.row.estado_plan_accion_nombre = "Iniciado";
                                                        data.row.estado_plan_accion = 1;
                                                        setTimeout(function () {
                                                            if (typeof riesgo_a !== 'undefined') {
                                                                if (typeof riesgo_a !== 'not defined') {
                                                                    if (riesgo_a) {
                                                                        riesgo_a.getFromView(data.row);
                                                                        riesgo_a.refreshAngular();
                                                                    }
                                                                }
                                                            }
                                                        }, 1000)
                                                        // setTimeout(function (){
                                                        //     riesgo_a.getFromView(data.row);
                                                        //
                                                        // }, 1000)
                                                    });
                                                }
                                            })
                                            return false;

                                        }
                                    },
                                    {
                                        text: "No",
                                        color: "warning",
                                        action: function () {
                                            BASEAPI.updateall('riesgo', {
                                                "estado": 2,
                                                where: [
                                                    {
                                                        field: "id",
                                                        value: data.row.id
                                                    }
                                                ]
                                            }, function (result) {
                                                swal.close();
                                                data.$scope.refresh();
                                            });

                                        }
                                    },
                                    {
                                        text: "Volver Atrás",
                                        color: "info",
                                        action: function () {
                                            swal.close()
                                        }
                                    }
                                ]
                            )
                            $('.swal2-animate-info-icon').css({'width': '70px', 'height': '70px'})
                            // Row_id = data.row.id;
                            // baseController.modal.modalView("riesgo_a/evaluacion", {
                            //     width: ENUM.modal.width.full,
                            //     header: {
                            //         title: 'Evaluación del Riesgo: "' + data.row.nombre + '"',
                            //         icon: "circles"
                            //     },
                            //     footer: {
                            //         cancelButton: false
                            //     },
                            //     content: {
                            //         loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                            //         sameController: 'riesgo_a'
                            //     },
                            // });
                            return false;
                        }
                    },
                    {
                        title: (data) => {
                            return "Trabajar   ";
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return data.row.estado_plan_accion_nombre == "Iniciado"
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';
                            baseController.modal.modalView("riesgo_a/plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Trabajar Respuesta al Riesgo: "' + data.row.nombre + '"',
                                    icon: "hammer-wrench"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                                event: {
                                    show: {
                                        end: function () {
                                            setTimeout(function () {
                                                if (typeof riesgo_a !== 'undefined') {
                                                    if (typeof riesgo_a !== 'not defined') {
                                                        if (riesgo_a) {
                                                            riesgo_a.getFromView(data.row);
                                                            riesgo_a.refreshAngular();
                                                        }
                                                    }
                                                }
                                            }, 1000)
                                        }
                                    }
                                }
                            });
                            BASEAPI.list('riesgo', {
                                limit: 1
                            }, function (result) {
                                data.$scope.refresh();
                                if (typeof riesgo_a !== 'undefined') {
                                    if (typeof riesgo_a !== 'not defined') {
                                        if (riesgo_a) {
                                            riesgo_a.getFromView(data.row);
                                        }
                                    }
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: 'Ver Proceso: "' + data.row.nombre + '"',
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
                ],
                single: [
                    {
                        "table": "departamento",
                        "base": "departamento",
                        "field": "id",
                        "columns": ["id", "nombre"]
                    },
                ]
            }
        });
    }
    RUNCONTROLLER("vw_riesgo_view", vw_riesgo_view, $scope, $http, $compile);
    RUN_B("vw_riesgo_view", vw_riesgo_view, $scope, $http, $compile);
    vw_riesgo_view.formulary = function (data, mode, defaultData) {
        if (vw_riesgo_view !== undefined) {
            vw_riesgo_view.form.modalWidth = ENUM.modal.width.full;
            vw_riesgo_view.form.readonly = {compania: vw_riesgo_view.session.compania_id};
            vw_riesgo_view.form.titles = {
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            vw_riesgo_view.createForm(data, mode, defaultData);
            $scope.$watch("vw_riesgo_view.table_", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'table_', rules);
            });
            $scope.$watch("vw_riesgo_view.entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'entidad', rules);
            });
            $scope.$watch("vw_riesgo_view.riesgo_a_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'riesgo_a_id', rules);
            });
            $scope.$watch("vw_riesgo_view.riesgo_a", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'riesgo_a', rules);
            });
            $scope.$watch("vw_riesgo_view.registro", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'registro', rules);
            });
            $scope.$watch("vw_riesgo_view.registro_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'registro_nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'descripcion', rules);
            });
            $scope.$watch("vw_riesgo_view.probabilidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'probabilidad', rules);
            });
            $scope.$watch("vw_riesgo_view.probabilidad_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'probabilidad_nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.probabilidad_valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'probabilidad_valor', rules);
            });
            $scope.$watch("vw_riesgo_view.impacto_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'impacto_nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.impacto_valor", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'impacto_valor', rules);
            });
            $scope.$watch("vw_riesgo_view.impacto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'impacto', rules);
            });
            $scope.$watch("vw_riesgo_view.supuestos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'supuestos', rules);
            });
            $scope.$watch("vw_riesgo_view.nivel_riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'nivel_riesgo', rules);
            });
            $scope.$watch("vw_riesgo_view.nivel_riesgo_v", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'nivel_riesgo_v', rules);
            });
            $scope.$watch("vw_riesgo_view.color", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'color', rules);
            });
            $scope.$watch("vw_riesgo_view.factor_riesgo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'factor_riesgo', rules);
            });
            $scope.$watch("vw_riesgo_view.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'proceso', rules);
            });
            $scope.$watch("vw_riesgo_view.condition", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'condition', rules);
            });
            $scope.$watch("vw_riesgo_view.proceso_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'proceso_id', rules);
            });
            $scope.$watch("vw_riesgo_view.causa_debilidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'causa_debilidad', rules);
            });
            $scope.$watch("vw_riesgo_view.consecuencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'consecuencia', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_view.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_view.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'institucion', rules);
            });
            $scope.$watch("vw_riesgo_view.estado", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'estado', rules);
            });
            $scope.$watch("vw_riesgo_view.evaluacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'evaluacion', rules);
            });
            $scope.$watch("vw_riesgo_view.riesgo_controls", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'riesgo_controls', rules);
            });
            $scope.$watch("vw_riesgo_view.estado_plan_accion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'estado_plan_accion', rules);
            });
            $scope.$watch("vw_riesgo_view.estado_plan_accion_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'estado_plan_accion_nombre', rules);
            });
            //ms_product.selectQueries['estrategia'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_view.estrategia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'estrategia', rules);
            });
            $scope.$watch("vw_riesgo_view.estrategia_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'estrategia_nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'observacion', rules);
            });
            $scope.$watch("vw_riesgo_view.ocurrencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'ocurrencia', rules);
            });
            $scope.$watch("vw_riesgo_view.ocurrencia_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'ocurrencia_nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.ocurrencia_view", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'ocurrencia_view', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_efecto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_efecto', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_causa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_causa', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_deteccion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_deteccion', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_gravedad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_gravedad', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_ocurrencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_ocurrencia', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_deteccion_current", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_deteccion_current', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_gravedad_current", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_gravedad_current', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_ocurrencia_current", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_ocurrencia_current', rules);
            });
            $scope.$watch("vw_riesgo_view.elemento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'elemento', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe_elemento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe_elemento', rules);
            });
            $scope.$watch("vw_riesgo_view.mamfe", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'mamfe', rules);
            });
            $scope.$watch("vw_riesgo_view.condicion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'condicion', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_view.departamento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'departamento', rules);
            });
            //ms_product.selectQueries['riesgo_historico'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_riesgo_view.riesgo_historico", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'riesgo_historico', rules);
            });
            $scope.$watch("vw_riesgo_view.riesgo_historico_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'riesgo_historico_nombre', rules);
            });
            $scope.$watch("vw_riesgo_view.riesgo_historico_ano", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'riesgo_historico_ano', rules);
            });
            $scope.$watch("vw_riesgo_view.probabilidad_current", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'probabilidad_current', rules);
            });
            $scope.$watch("vw_riesgo_view.impacto_current", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'impacto_current', rules);
            });
            $scope.$watch("vw_riesgo_view.historico_estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_riesgo_view, 'historico_estatus', rules);
            });
        }
    };
    vw_riesgo_view.triggers.table.after.load = async function (records) {
        vw_riesgo_view.runMagicOneToMany('riesgo_control', 'riesgo_control', 'riesgo', 'nombre', 'riesgo_a_id');
        vw_riesgo_view.runMagicColum('factor_riesgo', 'perspectiva', "id", "nombre");
        vw_riesgo_view.runMagicColum('proceso', 'proceso', "id", "nombre");
        vw_riesgo_view.refreshAngular();
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
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
});