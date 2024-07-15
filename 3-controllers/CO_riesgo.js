app.controller("riesgo", function ($scope, $http, $compile) {
    if (typeof riesgo !== "undefined")
        delete riesgo;
    riesgo = this;
    var user = new SESSION().current();
    riesgo.session = new SESSION().current();
    riesgo.domeOnce = false;
    riesgo.domeOnce_entidad = false;
    riesgo.esplan = false;
    riesgo.show_diagram = true;
    if (window.location.href.split('?').length > 3)
        riesgo.agrega_acciones = window.location.href.split('?')[4] === "create" ? true : window.location.href.split('?')[3] === "create" ? true : false;
    if (window.location.href.split('?').length > 2)
        riesgo.esplan = window.location.href.split('?')[2] === "plan";


    if (window.location.href.indexOf('mamfe') !== -1)
        riesgo.soyamfe = true;

    if (!riesgo.session.institucion_id) {
        riesgo.fixFilters = [
            {
                field: "compania",
                value: riesgo.session.compania_id
            },
            {
                field: "historico_estatus",
                operator: "!=",
                value: "4"
            }
        ];
    } else {
        riesgo.fixFilters = [
            {
                field: "institucion",
                value: riesgo.session.institucion_id
            },
            {
                field: "historico_estatus",
                operator: "!=",
                value: "4"
            }
        ];
    }
    if (riesgo.esplan) {
        riesgo.fixFilters.push({
            field: "ocurrencia",
            value: 1
        });
    }
    riesgo.selected = true;
    riesgo.getRiesgo = async function (elhistorico) {

        if (elhistorico){
            var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
                order: "desc",
                where: [
                    {
                        field: "id",
                        value: elhistorico
                    }
                ]
            });
        }else{
            var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
                order: "desc",
                where: [
                    {
                        field: "compania",
                        value: riesgo.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": riesgo.session.institucion_id ? "=" : "is",
                        "value": riesgo.session.institucion_id ? riesgo.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus",
                        operator: "!=",
                        value: 4
                    }
                ]
            });
        }
        if (riesgoData) {
            riesgo.historico_id = riesgoData.id;
            riesgo.nombre_historico = riesgoData.nombre;
            riesgo.descripcion_historico = riesgoData.descripcion;
            riesgo.ano_historico = riesgoData.ano + '';
            riesgo.estatus_historico = riesgoData.estatus_nombre;

        } else {
            riesgo.fixFilters = [
                {
                    field: "id",
                    value: -1
                },
            ];
        }
        riesgo.refreshAngular();
        riesgo.riesgo_entidad = window.location.href.split('?')[1].replaceAll('RF', '');
        riesgo.form.loadDropDown('riesgo_entidad');
    };
    riesgo.getRiesgo();
    if (riesgo.soyamfe) {
        riesgo.fixFilters.push(
            {
                field: "mamfe",
                value: 1
            },
            {
                field: "riesgo_historico",
                value: riesgo.historico_id ? riesgo.historico_id : -1
            }
        );
        CRUD_riesgo = {};
        DSON.keepmerge(CRUD_riesgo, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo, {
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
                    },
                    registro: {
                        label: "Registro",
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
                        },
                        visible: !riesgo.esplan,
                        visibleDetail: !riesgo.esplan,
                        export: !riesgo.esplan,
                        exportExample: !riesgo.esplan,
                        dead: riesgo.esplan
                    },
                    condition: {
                        label: function () {
                            return "Condición"
                        },
                        export: true,
                        format: function (row) {
                            var nom = row.condition;
                            $(`.Enejecucion`).css('background', '#F59042');
                            $(`.Trabajado`).css('background', '#4388ba');
                            $(`.Finalizado`).css('background', '#548235');
                            $(`.Pendiente`).css('background', '#CECECE');
                            return `<div title="${row.condition}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        },
                        visible: riesgo.esplan,
                        visibleDetail: riesgo.esplan,
                        export: riesgo.esplan,
                        exportExample: riesgo.esplan,
                        dead: !riesgo.esplan
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
                        },
                        visible: !riesgo.esplan,
                        visibleDetail: !riesgo.esplan,
                        export: !riesgo.esplan,
                        exportExample: !riesgo.esplan,
                        dead: riesgo.esplan
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
                                        "value": riesgo.session ? riesgo.session.compania_id : -1
                                    },
                                    {
                                        "field": "institucion",
                                        "operator": riesgo.session.institucion_id ? "=" : "is",
                                        "value": riesgo.session ? riesgo.session.institucion_id ? riesgo.session.institucion_id : "$null" : -1
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
                                    riesgo.riesgo_historico_drp = data.row.riesgo_historico + '';
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
                        title: (data) => {
                            return "Trabajar  ";
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return (riesgo.esplan && !riesgo.agrega_acciones ) && data.row.condition != "Finalizado";
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';

                            baseController.modal.modalView("riesgo_a/plan_accion_mamfe", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
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
                        title: (data) => {
                            return "Crear Acciones correctivas";
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return (riesgo.esplan && riesgo.agrega_acciones) && data.row.condition != "Finalizado";
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';

                            baseController.modal.modalView("riesgo_a/neo_plan_accion_mamfe", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
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
                        title: (data) => {
                            return "Ver.";
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return (data.row.estado_plan_accion_nombre == "Completado" && !riesgo.esplan)
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            Ocurrencia = data.row.ocurrencia;
                            baseController.modal.modalView("riesgo_a/view_plan_accion_mamfe", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Ver Riesgo: "' + data.row.nombre + '"',
                                    icon: "eye"
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
                        title: (data) => {
                            return "Ver.";
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return (data.row.condition == "Finalizado" && riesgo.esplan)
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            Ocurrencia = data.row.ocurrencia;
                            baseController.modal.modalView("riesgo_a/view_plan_accion_mamfe", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Ver Riesgo: "' + data.row.nombre + '"',
                                    icon: "eye"
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
                    }
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
        riesgo.fixFilters.push(
            {
                field: "mamfe",
                operator: "IS",
                value: "$NULL"
            },
            {
                field: "riesgo_historico",
                value: riesgo.historico_id ? riesgo.historico_id : -1
            }
        );
        CRUD_riesgo = {};
        DSON.keepmerge(CRUD_riesgo, CRUDDEFAULTS);
        DSON.keepmerge(CRUD_riesgo, {
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
                    registro: {
                        label: "Registro",
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
                        visible: !riesgo.esplan,
                        visibleDetail: !riesgo.esplan,
                        export: !riesgo.esplan,
                        exportExample: !riesgo.esplan,
                        dead: riesgo.esplan
                    },
                    condition: {
                        label: function () {
                            return "Condición"
                        },
                        export: true,
                        format: function (row) {
                            var nom = row.condition;
                            $(`.Enejecucion`).css('background', '#F59042');
                            $(`.Trabajado`).css('background', '#4388ba');
                            $(`.Finalizado`).css('background', '#548235');
                            $(`.Pendiente`).css('background', '#CECECE');
                            return `<div title="${row.condition}" class='${nom.replaceAll(' ', '').replaceAll('ó', 'o')} shape_element'> </div>`;
                        },
                        visible: riesgo.esplan,
                        visibleDetail: riesgo.esplan,
                        export: riesgo.esplan,
                        exportExample: riesgo.esplan,
                        dead: !riesgo.esplan
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
                        visible: !riesgo.esplan,
                        visibleDetail: !riesgo.esplan,
                        export: !riesgo.esplan,
                        exportExample: !riesgo.esplan,
                        dead: riesgo.esplan
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
                                        "value": riesgo.session ? riesgo.session.compania_id : -1
                                    },
                                    {
                                        "field": "institucion",
                                        "operator": riesgo.session.institucion_id ? "=" : "is",
                                        "value": riesgo.session ? riesgo.session.institucion_id ? riesgo.session.institucion_id : "$null" : -1
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
                                    riesgo.riesgo_historico_drp = data.row.riesgo_historico + '';
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
                        title: (data) => {
                            return "Trabajar    ";
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return  (riesgo.esplan && !riesgo.agrega_acciones)  && data.row.condicion != 1;
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';

                            baseController.modal.modalView("riesgo_a/plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
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
                        title: (data) => {
                            return "Crear Acciones Correctivas";
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        show: function (data) {
                            return  (riesgo.esplan && riesgo.agrega_acciones) && data.row.condicion != 1;
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';

                            baseController.modal.modalView("riesgo_a/neo_plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
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
                        title: (data) => {
                            return "Ver";
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
                        show: function (data) {
                            return riesgo.esplan && data.row.condicion == 1;
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            From_where = 'plan_accion';

                            baseController.modal.modalView("riesgo_a/view_neo_plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Plan de Acción del Riesgo: "' + data.row.nombre + '"',
                                    icon: "eye"
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
                                            setTimeout(async function () {
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
                            }, async function (result) {
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
                        title: (data) => {
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
                        show: function (data) {
                            return data.row.estado_plan_accion_nombre == "Completado" && !riesgo.esplan
                        },
                        click: function (data) {
                            Row_id = data.row.riesgo_a_id;
                            Matriz_id = data.row.id;
                            Ocurrencia = data.row.ocurrencia;
                            baseController.modal.modalView("riesgo_a/view_plan_accion", {
                                width: ENUM.modal.width.full,
                                header: {
                                    title: 'Ver Riesgo: "' + data.row.nombre + '"',
                                    icon: "eye"
                                },
                                footer: {
                                    cancelButton: false
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: 'riesgo_a'
                                },
                            });
                            BASEAPI.list('riesgo', {
                                limit: 1
                            }, function (result) {
                                data.$scope.refresh();
                                riesgo_a.getFromView(data.row);
                            });
                            return false;
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


    riesgo.drp_entidad = "pei_poa";
    //riesgo.singular = "singular";
    //riesgo.plural = "plural";
    riesgo.headertitle = "Riesgo";
    riesgo.destroyForm = false;
    riesgo.entidad = window.location.href.split('?')[1].replaceAll('RF', '');

    if (riesgo.entidad == "vw_procesos") {
        riesgo.drp_entidad = "proceso";
    }
    //riesgo.permissionTable = "tabletopermission";
    RUNCONTROLLER("riesgo", riesgo, $scope, $http, $compile);
    RUN_B("riesgo", riesgo, $scope, $http, $compile);
    if (riesgo.soyamfe) {
        riesgo.plural = "Modo de Riesgo " + riesgo.entidad;
        riesgo.singular = "Modo de Riesgo " + riesgo.entidad;
        riesgo.headertitle = "Modo de Riesgo " + riesgo.entidad;
    }
    if(riesgo.esplan){
        riesgo.$scope.$watch("riesgo.riesgo_historico_index", function (value) {
            var rules = [];
            //rules here
            //rules.push(VALIDATION.general.required(value));
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(riesgo, 'riesgo_historico_index', rules);
        });
    }
    riesgo.setPermission("export", false);
    riesgo.formulary = async function (data, mode, defaultData) {
        riesgo.perspectivas = await BASEAPI.listp('perspectiva', {
            limit: 0,
            orderby: "$ id",
            order: "asc"
        });
        riesgo.procesos = await BASEAPI.listp('vw_procesos', {
            limit: 0,
            orderby: "$ id",
            order: "asc",
            where: [
                {
                    "field": "compania",
                    "value": riesgo.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": riesgo.session.institucion_id ? "=" : "is",
                    "value": riesgo.session.institucion_id ? riesgo.session.institucion_id : "$null"
                }
            ],
        });
        if (riesgo !== undefined) {
            //RUN_B("riesgo", riesgo, $scope, $http, $compile);
            riesgo.form.modalWidth = ENUM.modal.width.full;
            if (riesgo.soyamfe) {
                riesgo.form.titles = {
                    new: "Nuevo Riesgo - " + riesgo.entidadobj.name,
                    edit: "Editar Riesgo - " + riesgo.entidadobj.name,
                    view: "Ver Riesgo - " + riesgo.entidadobj.name
                };
            } else {
                riesgo.form.titles = {
                    new: "Nuevo Riesgo - " + riesgo.entidadobj.name,
                    edit: "Editar Riesgo - " + riesgo.entidadobj.name,
                    view: "Ver Riesgo - " + riesgo.entidadobj.name
                };
            }


            riesgo.form.readonly = {
                table_: riesgo.entidadobj.id,
                compania: riesgo.session.compania_id,
                institucion: riesgo.session.institucion_id,
            };
            if (riesgo.soyamfe) {
                riesgo.form.readonly.mamfe = 1;
            }

            var www = riesgo.session.institucion_id && !riesgo.session.interinstitucional ?
                [
                    {
                        field: "institucion",
                        operator: "=",
                        value: riesgo.session.institucion_id
                    },
                    {
                        field: "poa_id",
                        operator: "=",
                        value: riesgo.session.poa_id
                    },
                ] :
                [
                    {
                        field: "compania",
                        operator: "=",
                        value: riesgo.session.compania_id
                    },
                    {
                        field: "institucion",
                        operator: "is",
                        value: "$ null"
                    }
                ];

            if (riesgo.entidadobj) {
                riesgo.selectQueries["registro"] = eval(riesgo.entidadobj.where);
            }

            riesgo.createForm(data, mode, defaultData, riesgo.soyamfe ? "form_mamfe" : undefined);

            $scope.$watch('riesgo.registro', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, "registro", rules)
            });

            if (riesgo.soyamfe) {
                $scope.$watch('riesgo.mamfe_elemento', function (value) {
                    var rules = [];
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(riesgo, "mamfe_elemento", rules)
                });
            }

            $scope.$watch("riesgo.riesgo_a", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                if (riesgo.form)
                    if (riesgo.form.options)
                        if (riesgo.form.options.riesgo_a) {
                            var riesgote = riesgo.form.options.riesgo_a.data.filter(d => {
                                return d.id == value
                            });
                            if (riesgo_control)
                                riesgo_control.fixFilters = [{field: 'riesgo', value: value}];
                            if (riesgote[0]) {
                                riesgote = riesgote[0];
                                riesgo.nombre = riesgote.nombre;
                                riesgo.causa_debilidad = riesgote.causa_debilidad;
                                riesgo.consecuencia = riesgote.consecuencia;
                                riesgo.descripcion = riesgote.descripcion;
                                riesgo.supuestos = riesgote.supuestos;
                                riesgo.factor_riesgo = riesgote.factor_riesgo + "";
                                var perspectiva = riesgo.perspectivas.data.filter(d => {
                                    return d.id == riesgote.factor_riesgo
                                });
                                if (perspectiva.length) {
                                    riesgo.factor_riesgotext = perspectiva[0].nombre;
                                }
                                var proceso = riesgo.procesos.data.filter(d => {
                                    return d.id == riesgote.proceso
                                });
                                if (proceso.length) {
                                    riesgo.procesotext = proceso[0].nombre_drp;
                                }
                                riesgo.impacto = riesgote.impacto + "";
                                riesgo.institucion = riesgote.institucion;
                                riesgo.compania = riesgote.compania;
                                riesgo.probabilidad = riesgote.probabilidad + "";

                                riesgo.mamfe_efecto = riesgote.mamfe_efecto;
                                riesgo.mamfe_causa = riesgote.mamfe_causa;
                                riesgo.mamfe_deteccion = riesgote.mamfe_deteccion;
                                riesgo.mamfe_gravedad = riesgote.mamfe_gravedad;
                                riesgo.mamfe_ocurrencia = riesgote.mamfe_ocurrencia;
                                riesgo.mamfe_deteccion_current = riesgote.mamfe_deteccion_current;
                                riesgo.mamfe_gravedad_current = riesgote.mamfe_gravedad_current;
                                riesgo.mamfe_ocurrencia_current = riesgote.mamfe_ocurrencia_current;
                                riesgo.mamfe = riesgote.mamfe;

                                riesgo.form.loadDropDown("factor_riesgo");
                                riesgo.form.loadDropDown("probabilidad");
                                riesgo.form.loadDropDown("impacto");
                                riesgo.refreshAngular();
                                riesgo_control.refresh();
                            }
                        }
                VALIDATION.validate(riesgo, 'entidad', rules);
            });
            $scope.$watch("riesgo.riesgo_historico", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'riesgo_historico', rules);
            });
            $scope.$watch("riesgo.entidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'entidad', rules);
            });
            $scope.$watch("riesgo.supuestos", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'supuestos', rules);
            });
            $scope.$watch("riesgo.nombre", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'nombre', rules);
            });
            $scope.$watch("riesgo.causa_debilidad", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'causa_debilidad', rules);
            });
            $scope.$watch("riesgo.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'descripcion', rules);
            });
            $scope.$watch("riesgo.probabilidad", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'probabilidad', rules);
            });
            $scope.$watch("riesgo.impacto", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'impacto', rules);
            });
            $scope.$watch("riesgo.factor_riesgo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'factor_riesgo', rules);
            });
            $scope.$watch("riesgo.consecuencia", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'consecuencia', rules);
            });
            $scope.$watch("riesgo.riesgo_entidad", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'riesgo_entidad', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("riesgo.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo, 'institucion', rules);
            });
        }
    };
    riesgo.eltipo = false;
    riesgo.changeIndicador = function (table) {
        if (riesgo.agrega_acciones){
            location.href = location.href.split('?')[0] + '?' + table + (riesgo.esplan ? '?plan?create' : "");
        }else{
            location.href = location.href.split('?')[0] + '?' + table + (riesgo.esplan ? '?plan' : "");
        }
       
    };
    riesgo.triggers.table.after.load = async function (records) {
        if (!riesgo.eltipo) {
            riesgo.entidadobj = await BASEAPI.firstp('riesgo_entidad', {
                where: [{
                    field: "table_",
                    value: riesgo.entidad
                }]
            });
            if (!riesgo.session.institucion_id) {
                if (!riesgo.esplan){
                    riesgo.fixFilters = [
                        {
                            field: "compania",
                            value: riesgo.session.compania_id
                        },
                        {
                            field: "historico_estatus",
                            operator: "!=",
                            value: "4"
                        }
                    ];
                }else{
                    riesgo.fixFilters = [
                        {
                            field: "compania",
                            value: riesgo.session.compania_id
                        }
                    ]
                }
            } else {
                if (!riesgo.esplan) {
                    riesgo.fixFilters = [
                        {
                            field: "institucion",
                            value: riesgo.session.institucion_id
                        },
                        {
                            field: "historico_estatus",
                            operator: "!=",
                            value: "4"
                        }
                    ];
                }else{
                    riesgo.fixFilters = [
                        {
                            field: "institucion",
                            value: riesgo.session.institucion_id
                        },
                    ]
                }
            }
            riesgo.fixFilters.push(
                {
                    "field": "table_",
                    "value": riesgo.entidadobj.id
                }
            );
            if (riesgo.esplan) {
                riesgo.selected = false;
                $('.icon-plus-circle2 ').parent().hide();
                if (STORAGE.exist('historico')) {
                    riesgo.riesgo_historico_index = STORAGE.get('historico');
                    riesgo.form.loadDropDown('riesgo_historico_index');
                    riesgo.getRiesgo(riesgo.riesgo_historico_index);
                    riesgo.selected = true;
                }
                riesgo.fixFilters.push({
                    field: "ocurrencia",
                    value: 1
                });
            }
            if (riesgo.soyamfe) {
                riesgo.fixFilters.push(
                    {
                        field: "mamfe",
                        value: 1
                    },
                    {
                        field: "riesgo_historico",
                        value: riesgo.esplan ? riesgo.riesgo_historico_index ? riesgo.riesgo_historico_index : -1 : riesgo.historico_id ? riesgo.historico_id : -1
                    }
                );
            } else {
                riesgo.fixFilters.push(
                    {
                        field: "mamfe",
                        operator: "IS",
                        value: "$NULL"
                    },
                    {
                        field: "riesgo_historico",
                        value: riesgo.esplan ? riesgo.riesgo_historico_index ? riesgo.riesgo_historico_index : -1 : riesgo.historico_id ? riesgo.historico_id : -1
                    }
                );
            }
            riesgo.riesgo_entidad = riesgo.entidadobj.table_;
            riesgo.refresh();
            riesgo.eltipo = true;
        } else {
            if (!riesgo.entidadobj)
                return;
            riesgo.tipos = await BASEAPI.listp('riesgo_entidad', {limit: 0});
            riesgo.tipos = riesgo.tipos.data;

            if (!riesgo.soyamfe) {
                riesgo.plural = riesgo.entidadobj.name + (riesgo.esplan ? ` (Plan de Acción)` : ` (Riesgos)`);
                riesgo.singular = riesgo.entidadobj.name + (riesgo.esplan ? ` (Plan de Acción)` : ` (Riesgos)`);
                riesgo.headertitle = riesgo.entidadobj.name + (riesgo.esplan ? ` (Plan de Acción)` : ` (Riesgos)`);
            } else {
                riesgo.plural = riesgo.esplan ? `Acciones de Mejora` : "Matriz de Riesgo";
                riesgo.singular = riesgo.esplan ? `Acción de Mejora` : "Matriz de Riesgo";
                riesgo.headertitle = riesgo.esplan ? `Acciones de Mejora` : "Matriz de Riesgo";
            }
            //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);

            if (CRUD_riesgo.table.columns.registro)
                CRUD_riesgo.table.columns.registro.label = function () {
                    if (riesgo.entidadobj)
                        return riesgo.entidadobj.name;
                };
            CRUD_riesgo.table.filters.columns[0].label = riesgo.entidadobj.name;
            CRUD_riesgo.table.filters.columns[0].table = riesgo.entidadobj.table_;
            CRUD_riesgo.table.filters.columns[0].text = `item.${riesgo.entidadobj.label}`;
            CRUD_riesgo.table.filters.columns[0].query.where = eval(riesgo.entidadobj.where);
            riesgo.runMagicColum('registro', riesgo.entidadobj.table_, "id", riesgo.entidadobj.label);
            riesgo.runMagicOneToMany('riesgo_control', 'riesgo_control', 'riesgo', 'nombre', 'riesgo_a_id');
            riesgo.runMagicColum('factor_riesgo', 'perspectiva', "id", "nombre");
            riesgo.runMagicColum('proceso', 'proceso', "id", "nombre");
        }
        riesgo.refreshAngular();
    };
    riesgo.downloadDiagram = () => {
        let image = riesgo.myDiagram.makeImage({
            scale: 1
        });
        var a = document.createElement("a"); //Create <a>
        a.href = image.src; //Image Base64 Goes here
        a.download = "Flujo de Trabajo - Prevención y Control de Riesgo.png";
        a.click();
    };
    riesgo.diagram = () => {
        riesgo.modal.modalView("riesgo/diagram", {
            width: 'modal-full',
            header: {
                title: "Vista del Flujo de Trabajo",
                icon: "icon-repo-forked"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'riesgo',
            },
            event: {
                show: {
                    end: async function (data) {
                        SWEETALERT.loading({message: "Cargando Diagrama"});
                        riesgo.statusList = await BASEAPI.listp('vw_modulo_estatus', {
                            limit: 0,
                            orderby: "entidad",
                            order: "asc",
                            where: [
                                {
                                    "field": "entidad",
                                    "value": "Respuesta al Riesgo (VAR y AMFE)"
                                }
                            ]
                        });
                        riesgo.statusList = riesgo.statusList.data;
                        setTimeout(async function () {
                            const $$$ = go.GraphObject.make;
                            let statusList = riesgo.statusList;
                            let thejson = {
                                class: "go.GraphLinksModel",
                                "nodeKeyProperty": "id",
                                "nodeDataArray": [],
                                "linkDataArray": []
                            };

                            statusList.forEach((d) => {
                                let item = {
                                    "id": d.id,
                                    "text": d.nombre
                                };
                                thejson.nodeDataArray.push(item);
                            });

                            statusList?.forEach((d) => {
                                let uniq = a => [...new Set(a)];
                                let posteriores = uniq(eval(d.estatus_posterior));

                                posteriores?.forEach((e) => {
                                    let posterior = statusList.filter(f => f.id === e)[0];
                                    if (posterior) {
                                        let isprogress = true;
                                        let item = {
                                            "from": d.id,
                                            "to": e,
                                            "progress": isprogress,
                                            "text": posterior.action
                                        };
                                        thejson.linkDataArray.push(item);
                                    }
                                });
                            });

                            riesgo.myDiagram = new go.Diagram(
                                'myDiagramDiv', // must name or refer to the DIV HTML element
                                {
                                    'animationManager.initialAnimationStyle': go.AnimationStyle.None,
                                    InitialAnimationStarting: (e) => {
                                        var animation = e.subject.defaultAnimation;
                                        animation.easing = go.Animation.EaseOutExpo;
                                        animation.duration = 800;
                                        animation.add(e.diagram, 'scale', 0.3, 1);
                                        animation.add(e.diagram, 'opacity', 0, 1);
                                    },

                                    // have mouse wheel events zoom in and out instead of scroll up and down
                                    'toolManager.mouseWheelBehavior': go.WheelMode.Zoom,
                                    // support double-click in background creating a new node
                                    'clickCreatingTool.archetypeNodeData': {text: 'new node'},
                                    // enable undo & redo
                                    'undoManager.isEnabled': true,
                                    layout: new go.LayeredDigraphLayout({
                                        layerSpacing: 100,
                                        columnSpacing: 100,
                                        direction: 90,
                                        setsPortSpot: false,
                                        setsChildPortSpot: false,
                                        arrangement: go.TreeArrangement.Horizontal,
                                    }),
                                }
                            );
                            const colors = {
                                pink: '#facbcb',
                                blue: '#b7d8f7',
                                green: '#b9e1c8',
                                yellow: '#faeb98',
                                background: '#e8e8e8',
                            };
                            riesgo.myDiagram.div.style.backgroundColor = colors.background;
                            riesgo.myDiagram.nodeTemplate = new go.Node('Auto', {
                                isShadowed: true,
                                shadowBlur: 0,
                                shadowOffset: new go.Point(5, 5),
                                shadowColor: 'black',
                            }).bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify).add(
                                new go.Shape('RoundedRectangle', {
                                    strokeWidth: 1.5,
                                    fill: colors.blue,
                                }).bind('fill', 'type', (type) => {
                                    if (type === 'Start') return colors.green;
                                    if (type === 'End') return colors.pink;
                                    return colors.blue;
                                }).bind('figure', 'type', (type) => {
                                    return 'RoundedRectangle';
                                }),
                                new go.TextBlock({
                                    shadowVisible: false,
                                    margin: 8,
                                    font: 'bold 14px sans-serif',
                                    stroke: '#333',
                                }).bind('text')
                            );

                            // replace the default Link template in the linkTemplateMap
                            riesgo.myDiagram.linkTemplate = new go.Link(
                                {
                                    isShadowed: true,
                                    shadowBlur: 0,
                                    shadowColor: 'black',
                                    shadowOffset: new go.Point(2.5, 2.5),
                                    curve: go.Curve.Bezier,
                                    curviness: 40,
                                    adjusting: go.LinkAdjusting.Stretch,
                                    reshapable: true,
                                    relinkableFrom: true,
                                    relinkableTo: true,
                                    fromShortLength: 8,
                                    toShortLength: 10,
                                }).bindTwoWay('points').bind('curviness').add(
                                new go.Shape({strokeWidth: 2, shadowVisible: false, stroke: 'black'})
                                    .bind('strokeDashArray', 'progress', (progress) => (progress ? [] : [5, 6]))
                                    .bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5)),
                                new go.Shape({
                                    fromArrow: 'circle',
                                    strokeWidth: 1.5,
                                    fill: 'white'
                                }).bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5)),
                                new go.Shape({
                                    toArrow: 'standard',
                                    stroke: null,
                                    scale: 1.5,
                                    fill: 'black'
                                }).bind('opacity', 'progress', (progress) => (progress ? 1 : 0.5))
                            );


                            // read in the JSON data from the "mySavedModel" element
                            riesgo.myDiagram.model = go.Model.fromJson(JSON.stringify(thejson));
                            SWEETALERT.stop();
                        }, 1000)
                    }
                }
            }
        });
    }
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    riesgo.triggers.table.after.open = async function (data) {
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
        }
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    riesgo.triggers.table.after.close = function (data) {
        riesgo.getRiesgo();
        riesgo.domeOnce = false;
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
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
    riesgo.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        data.inserting.riesgo_historico_index = undefined;
        data.inserting.descripcion_historico = undefined;
        var validatett = await BASEAPI.firstp("riesgo", {
            where: [
                {
                    field: "table_",
                    operator: "=",
                    value: riesgo.entidadobj.id
                },
                {
                    field: "registro",
                    operator: "=",
                    value: riesgo.registro
                },
                {
                    field: "riesgo_a",
                    operator: "=",
                    value: riesgo.riesgo_a
                },
                {
                    field: "departamento",
                    operator: "=",
                    value: riesgo.departamento
                },
                {
                    field: "riesgo_historico",
                    value: riesgo.historico_id
                }
            ]
        });
        if (validatett) {
            if (riesgo.soyamfe) {
                SWEETALERT.show({
                    type: "error",
                    title: "",
                    message: `No se puede crear un registro de riesgo para la misma relación de: "Elemento del Proceso + Fallo + Departamento"`
                });
            } else {
                SWEETALERT.show({
                    type: "error",
                    title: "",
                    message: `No se puede crear un registro de riesgo para la misma relación de: "Entidad + Riesgo + Departamento"`
                });
            }
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.tabfle.after.update ${$scope.modelName}`);
    // };
    riesgo.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        data.updating.riesgo_historico_index = undefined;
        data.updating.descripcion_historico = undefined;
        var validatett = await BASEAPI.firstp("riesgo", {
            where: [
                {
                    field: "table_",
                    operator: "=",
                    value: riesgo.entidadobj.id
                },
                {
                    field: "registro",
                    operator: "=",
                    value: riesgo.registro
                },
                {
                    field: "riesgo_a",
                    operator: "=",
                    value: riesgo.riesgo_a
                },
                {
                    field: "departamento",
                    operator: "=",
                    value: riesgo.departamento
                },
                {
                    field: "id",
                    operator: "!=",
                    value: riesgo.id
                },
                {
                    field: "riesgo_historico",
                    value: riesgo.historico_id
                }
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un matriz de riesgo creada para este departamento"
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for (var item of buttons) {
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    //
    riesgo.triggers.table.after.control = function (data) {
        if (data == 'riesgo_a') {
            var perspectiva = riesgo.perspectivas.data.filter(d => {
                return d.id == riesgo.factor_riesgo
            });
            var proceso = riesgo.procesos.data.filter(d => {
                return d.id == riesgo.proceso
            });
            if (perspectiva.length) {
                riesgo.factor_riesgotext = perspectiva[0].nombre;
            }
            if (proceso.length) {
                riesgo.procesotext = proceso[0].nombre_drp;
            }
            riesgo_control.fixFilters = [{field: 'riesgo', value: riesgo.riesgo_a}];
            riesgo_control.refresh();
            riesgo.refreshAngular();
        }
        if (data == 'registro') {
            riesgo.form.options.registro.label = riesgo.entidadobj.name;
            riesgo.refreshAngular();
        }
        if (data == 'riesgo_historico'){
            if (!riesgo.domeOnce)
            if (riesgo.form.mode == 'edit'){
                if (riesgo.riesgo_historico_drp){
                    riesgo.riesgo_historico = riesgo.riesgo_historico_drp;
                    riesgo.form.loadDropDown('riesgo_historico');
                    riesgo.domeOnce = true;
                }
            }
        }
        if (data == 'riesgo_entidad'){
            setTimeout(function(){
                if (!riesgo.domeOnce_entidad){
                    riesgo.form.loadDropDown('riesgo_entidad')
                    riesgo.domeOnce_entidad = true;
                }
            },100)
        }
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
    riesgo.todasaccionescorrectivas = () => {
        if (riesgo.list_acciones_correctivas) {
            if (riesgo.list_acciones_correctivas.length) {
                return riesgo.list_acciones_correctivas.filter(d => {
                    return d.estatus == 4
                }).length === riesgo.list_acciones_correctivas.length;
            }
        }
        return false;
    }
    riesgo.show_plan = function(elhistorico) {
        VALIDATION.save(riesgo, async function () {
            riesgo.selected = true;
            riesgo.getRiesgo(elhistorico);
            STORAGE.add('historico', elhistorico);
            if (!riesgo.session.institucion_id) {
                riesgo.fixFilters = [
                    {
                        field: "compania",
                        value: riesgo.session.compania_id
                    }
                ];
            } else {
                riesgo.fixFilters = [
                    {
                        field: "institucion",
                        value: riesgo.session.institucion_id
                    }
                ];
            }
            riesgo.fixFilters.push(
                {
                    "field": "table_",
                    "value": riesgo.entidadobj.id
                }
            );
            if (riesgo.esplan) {
                riesgo.fixFilters.push({
                    field: "ocurrencia",
                    value: 1
                });
            }
            if (riesgo.soyamfe) {
                riesgo.fixFilters.push(
                    {
                        field: "mamfe",
                        value: 1
                    },
                    {
                        field: "riesgo_historico",
                        value: elhistorico
                    }
                );
            } else {
                riesgo.fixFilters.push(
                    {
                        field: "mamfe",
                        operator: "IS",
                        value: "$NULL"
                    },
                    {
                        field: "riesgo_historico",
                        value: elhistorico
                    }
                );
            }
            riesgo.refresh();
        },["riesgo_historico_index"]);
    }
    riesgo.go_back = async function() {
        riesgo.riesgo_historico = "[NULL]"
        riesgo.form.loadDropDown('riesgo_historico');
        riesgo.selected = false;
    }
});
