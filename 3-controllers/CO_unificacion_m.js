app.controller("unificacion_m", function ($scope, $http, $compile) {
    unificacion_m = this;
    //unificacion_m.fixFilters = [];
    //unificacion_m.singular = "singular";
    //unificacion_m.plural = "plural";
    unificacion_m.session = new SESSION().current();
    unificacion_m.pacc_departamento_list = [];
    unificacion_m.referencia = "SNCC.F.053";
    unificacion_m.show_estatus = false;
    unificacion_m.done_eval = false;
    unificacion_m.readonly = window.location.href.indexOf("readonly") !== -1;
    unificacion_m.myProfile = unificacion_m.session.groups[0].id;
    unificacion_m.monitoreo_nombre = unificacion_m.session.monitoreo_nombre;
    unificacion_m.monitoreo_nombre = "Trimestre";
    unificacion_m.lan = LAN;
    // unificacion_m.destroyForm = false;
    unificacion_m.EP = 0;
    unificacion_m.EP = 0;
    unificacion_m.periodopoa = unificacion_m.session.cantidad;
    unificacion_m.periodopoa = 4;
    unificacion_m.periodopoas = [];
    for (var i = 1; i <= unificacion_m.periodopoa; i++) {
        unificacion_m.periodopoas.push(i);
    }
    //unificacion_m.permissionTable = "tabletopermission";
    RUNCONTROLLER("unificacion_m", unificacion_m, $scope, $http, $compile);
    RUN_B("unificacion_m", unificacion_m, $scope, $http, $compile);

    unificacion_m.filterDept = async function (DeptID, paccID, PaccDept) {

        if (PaccDept) {
            unificacion_m.current_PDept = PaccDept.id;
            unificacion_m.name_PDept = PaccDept.nombre;
            unificacion_m.code_PDept = PaccDept.codigo;
            unificacion_m.cant_PDept = PaccDept.cantidadtotal + "";
            unificacion_m.ver_PDept = PaccDept.version;
        } else {
            unificacion_m.current_PDept = null;
            unificacion_m.name_PDept = null;
            unificacion_m.code_PDept = null;
            unificacion_m.cant_PDept = null;
            unificacion_m.ver_PDept = null;
        }

        if (typeof u_pacc_dept !== 'undefined') {
            if (typeof u_pacc_dept !== 'not defined') {
                if (u_pacc_dept) {
                    if (DeptID) {
                        u_pacc_dept.tab = DeptID;
                        PAGINATOR.makeoffline(u_pacc_dept, u_pacc_dept.PACCROWS.filter(d => {
                            return d.departamento == u_pacc_dept.tab
                        }));
                    } else {
                        u_pacc_dept.tab = undefined;
                        await u_pacc_dept.get_pacc_detail(paccID);
                    }
                    u_pacc_dept.refreshAngular();
                }
            }
        }
    };
    unificacion_m.filterDept(false, unificacion_m.id);
    get_pacc_status(unificacion_m, unificacion_m.rawestatus);
    $scope.$watch("unificacion_m.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(unificacion_m, 'comentario', rules);
    });
    $scope.$watch("unificacion_m.pacc_departamento_estatus", function (value) {
        var rules = [];
        //rules here
        // rules.push(VALIDATION.general.required(value));
        if (unificacion_m.form.selected('pacc_departamento_estatus')) {
            unificacion_m.pacc_departamento_show_estatus = unificacion_m.form.selected('pacc_departamento_estatus').nombre;
            unificacion_m.refreshAngular();
        }
        VALIDATION.validate(unificacion_m, 'pacc_departamento_estatus', rules);
    });
    unificacion_m.get_pacc_dept = async function () {
        var pacc_departamentales = await BASEAPI.listp('vw_pacc_departamental', {
            where: [
                {
                    field: "pacc",
                    value: unificacion_m.id
                },
                {
                    field: "estatus",
                    value: 6
                },
                {
                    field: "compania",
                    value: unificacion_m.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": unificacion_m.session.institucion_id ? "=" : "is",
                    "value": unificacion_m.session.institucion_id ? unificacion_m.session.institucion_id : "$null"
                }
            ]
        });
        unificacion_m.pacc_departamento_list = pacc_departamentales.data;
    }
    unificacion_m.getOpenpacc = async function () {
        var paccData = await BASEAPI.firstp('vw_pacc', {
            order: "desc",
            where: [
                {
                    field: "estatus",
                    operator: "=",
                    value: 8
                },
                {
                    field: "compania",
                    value: unificacion_m.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": unificacion_m.session.institucion_id ? "=" : "is",
                    "value": unificacion_m.session.institucion_id ? unificacion_m.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData) {
            unificacion_m.id = paccData.id;
            unificacion_m.nombre = paccData.nombre;
            unificacion_m.empresa = unificacion_m.session.compania;
            unificacion_m.descripcion = paccData.descripcion;
            unificacion_m.capitulo = paccData.capitulo;
            unificacion_m.sub_capitulo = paccData.subcapitulo;
            unificacion_m.unidad = paccData.unidad;
            unificacion_m.unidad_compra = paccData.unidad_compra;
            unificacion_m.sigla = paccData.codigo;
            unificacion_m.ano_planificacion_view = paccData.año;
            unificacion_m.fecha_revision = paccData.fecha_revision;
            unificacion_m.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            unificacion_m.fecha_aprobacion = paccData.fecha_aprobacion;
            unificacion_m.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            unificacion_m.codigo_plan = paccData.codigo_plan;
            unificacion_m.cantidad = paccData.cantidad;
            unificacion_m.version = paccData.version;
            unificacion_m.rawestatus = paccData.estatus;
            unificacion_m.estatus = paccData.estatus_nombre;
            unificacion_m.fecha_presentacion = paccData.fecha_presentacion;
            unificacion_m.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            unificacion_m.active = paccData.active;
            unificacion_m.compania = paccData.compania;
            unificacion_m.lastprofile = paccData.lastprofile;
            if (unificacion_m.lastprofile == unificacion_m.myProfile) {
                unificacion_m.done_eval = true;
            } else {
                unificacion_m.done_eval = false;
            }
            if (typeof pacc_departamental !== 'undefined') {
                if (typeof pacc_departamental !== 'not defined') {
                    if (pacc_departamental) {
                        pacc_departamental.pacc_id = unificacion_m.id;
                        pacc_departamental.refresh();
                    }
                }
            }
            get_pacc_status(unificacion_m, unificacion_m.rawestatus);
        }
        await unificacion_m.get_pacc_dept();
        unificacion_m.refreshAngular();
    }
    unificacion_m.getOpenpacc();
    unificacion_m.back = function () {
        unificacion_m.show_next_tab = false;
    };
    unificacion_m.formulary = function (data, mode, defaultData) {
        if (unificacion_m !== undefined) {

            unificacion_m.form.modalWidth = ENUM.modal.width.full;
            unificacion_m.form.readonly = {};
            unificacion_m.createForm(data, mode, defaultData);
            $scope.$watch("unificacion_m.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'nombre', rules);
            });
            $scope.$watch("unificacion_m.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'descripcion', rules);
            });
            $scope.$watch("unificacion_m.capitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'capitulo', rules);
            });
            $scope.$watch("unificacion_m.subcapitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'subcapitulo', rules);
            });
            $scope.$watch("unificacion_m.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'unidad', rules);
            });
            $scope.$watch("unificacion_m.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'codigo', rules);
            });
            $scope.$watch("unificacion_m.año", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'año', rules);
            });
            $scope.$watch("unificacion_m.fecha_revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'fecha_revision', rules);
            });
            $scope.$watch("unificacion_m.fecha_aprobacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'fecha_aprobacion', rules);
            });
            $scope.$watch("unificacion_m.codigo_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'codigo_plan', rules);
            });
            $scope.$watch("unificacion_m.cantidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'cantidad', rules);
            });
            $scope.$watch("unificacion_m.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'version', rules);
            });
            $scope.$watch("unificacion_m.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'estatus', rules);
            });
            $scope.$watch("unificacion_m.estatus_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'estatus_nombre', rules);
            });
            $scope.$watch("unificacion_m.fecha_presentacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'fecha_presentacion', rules);
            });
            $scope.$watch("unificacion_m.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'active', rules);
            });
            $scope.$watch("unificacion_m.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion_m, 'compania', rules);
            });
        }
    };
    unificacion_m.link_function = function () {
        baseController.modal.modalView("vw_comentarios", {
            width: ENUM.modal.width.full,
            header: {
                title: "Comentarios",
                icon: "comment"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'vw_comentarios'
            },
        });
    }
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
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
    unificacion_m.updateData = function () {
        VALIDATION.save(unificacion_m, async function () {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            if (unificacion_m.id) {
                BASEAPI.updateall('pacc', {
                    nombre: unificacion_m.nombre,
                    where: [
                        {
                            field: "id",
                            value: unificacion_m.id
                        }
                    ]
                }, function (result) {
                    SWEETALERT.stop();
                    SWEETALERT.show({message: "PACC ha sido actualizado"});
                });
            } else {
                SWEETALERT.show({type: 'warning', message: "No existe un PACC creado"});
            }
        }, ["nombre"]);
    }
    unificacion_m.cancelar = function () {
        location.reload();
    }
    unificacion_m.go_back = function () {
        unificacion_m.show_next_tab = false;
        unificacion_m.comentario_pacc_dept = "";
        pacc_departamental.refresh();
    }
    unificacion_m.allow_estatus = async function () {
        var id_departamentos = [];
        var id_pacc_d = [];
        if (unificacion_m.session.insitucion_id) {
            var lista_departamento = await BASEAPI.listp('departamento', {
                where: [
                    {
                        field: "institucion",
                        value: unificacion_m.session.institucion_id
                    }
                ]
            });
        } else {
            var lista_departamento = await BASEAPI.listp('departamento', {
                where: [
                    {
                        field: "compania",
                        value: unificacion_m.session.compania_id
                    },
                    {
                        field: "institucion",
                        operator: "is",
                        value: '$null'
                    }
                ]
            });
        }
        for (var i of lista_departamento.data) {
            id_departamentos.push(i.id);
        }
        var lista_pacc_d = await BASEAPI.listp('vw_pacc_departamental', {
            where: [
                {
                    field: "pacc",
                    value: unificacion_m.id
                },
                {
                    field: "departamento",
                    value: id_departamentos
                },
                {
                    field: "estatus",
                    value: 6
                },
                {
                    field: "revision",
                    value: 0
                }
            ]
        })
        for (var i of lista_pacc_d.data) {
            id_pacc_d.push(i.id);
        }
        if (id_pacc_d.length > 0 && id_departamentos.length > 0) {
            if (id_pacc_d.length == id_departamentos.length) {
                unificacion_m.show_estatus = true;
                unificacion_m.refreshAngular();
            } else {
                unificacion_m.show_estatus = false;
                unificacion_m.refreshAngular();
            }
        } else {
            unificacion_m.show_estatus = false;
            unificacion_m.refreshAngular();
        }
    }
    unificacion_m.allow_estatus();
    unificacion_m.todosvalidos = function () {
        if (typeof u_pacc_dept !== 'undefined') {
            if (typeof u_pacc_dept !== 'not defined') {
                if (u_pacc_dept) {
                    unificacion_m.refreshAngular()
                    u_pacc_dept.todosvalidos();
                }
            }
        }
    }
    unificacion_m.save_comment = async function (estatus) {
        var titulo_push = "";
        var cuerpo_push = "";
        var titulo = "";
        var cuerpo = "";
        var lista_dept = [];
        VALIDATION.save(unificacion_m, async function () {
            if (estatus === 1) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea devolver el PACC a revisión?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": unificacion_m.comentario,
                            "type": 15,
                            "created_by": unificacion_m.session.usuario_id,
                            "value": unificacion_m.id,
                            "value2": estatus
                        }, function () {
                        });
                        for (var i of unificacion_m.pacc_departamento_list) {
                            lista_dept.push(i.departamento_nombre)
                        }
                        titulo_push = `El PACC ha sido devuelto a REVISIÓN`;
                        cuerpo_push = `El PACC ha sido devuelto a REVISIÓN, Revisar las observaciones y proceder a corregir.`
                        titulo = `El PACC ha sido devuelto a revisión`;
                        cuerpo = `El PACC del(os) Dpto(s): ${lista_dept}  ha(n) sido devuelto(s) a REVISIÓN. Revisar las observaciones  y proceder con las sugerencias o cambios.`
                        function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, unificacion_m.session.compania_id, unificacion_m.session.institucion_id, [4, 5]);
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            lastprofile: '$null',
                            fecha_revision: "$null",
                            where: [
                                {
                                    field: "id",
                                    value: unificacion_m.id
                                }
                            ]
                        }, function (result) {
                            BASEAPI.updateall('pacc_departamental', {
                                estatus: 3,
                                where: [
                                    {
                                        field: "pacc",
                                        value: unificacion_m.id
                                    }
                                ]
                            }, function (result) {
                                location.reload();
                            });
                        });
                    }
                });
            } else if (estatus === 2) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea avanzar con el proceso de unificación de PACC?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": unificacion_m.comentario,
                            "type": 15,
                            "created_by": unificacion_m.session.usuario_id,
                            "value": unificacion_m.id,
                            "value2": estatus
                        }, function () {
                        });
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            lastprofile: unificacion_m.myProfile,
                            where: [
                                {
                                    field: "id",
                                    value: unificacion_m.id
                                }
                            ]
                        }, function (result) {
                            location.reload();
                        });
                    }
                });
            } else if (estatus === 4) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea enviar al PACC al proceso de aprobación?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": unificacion_m.comentario,
                            "type": 15,
                            "created_by": unificacion_m.session.usuario_id,
                            "value": unificacion_m.id,
                            "value2": estatus
                        }, function () {
                        });
                        titulo_push = `El PACC ha sido enviado al proceso de aprobación`;
                        cuerpo_push = `El PACC ha sido enviado al proceso de aprobación, favor proceder con las acciones necesarias.`
                        titulo = `El PACC ha sido enviado al proceso de aprobación`;
                        cuerpo = `El PACC ha sido enviado al proceso de aprobación, favor proceder con la revisión y posterior autorización.`
                        function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, unificacion_m.session.compania_id, unificacion_m.session.institucion_id, 13, [4, 5, 12]);
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            lastprofile: "$null",
                            fecha_revision: '$now()',
                            where: [
                                {
                                    field: "id",
                                    value: unificacion_m.id
                                }
                            ]
                        }, function (result) {
                            location.reload();
                        });
                    }
                });
            }
        }, ["comentario"]);
    }
    unificacion_m.get_form_069 = async function (pacc_dept) {
        unificacion_m.form_069_data = [];
        if (pacc_dept) {
            var pacc_dept_header = await BASEAPI.listp('vw_pacc_departamental_detail', {
                limit: 0,
                where: [
                    {
                        field: "pacc_departamento",
                        value: pacc_dept
                    },
                    {
                        field: "deleted",
                        value: 0
                    }
                ]
            });
            var pacc_dept_pres = await BASEAPI.listp('vw_presupuesto_pacc_dept', {
                where: [
                    {
                        field: "id",
                        value: pacc_dept
                    }
                ]
            });
        } else {
            var pacc_dept_header = await BASEAPI.listp('vw_pacc_departamental_detail', {
                limit: 0,
                where: [
                    {
                        field: "pacc",
                        value: unificacion_m.id
                    },
                    {
                        field: "deleted",
                        value: 0
                    }
                ]
            });
            var pacc_dept_pres = await BASEAPI.listp('vw_presupuesto_pacc_dept', {
                where: [
                    {
                        field: "pacc",
                        value: unificacion_m.id
                    }
                ]
            });
        }
        if (pacc_dept_header.data) {
            var header = {};
            var count = 0;
            unificacion_m.full_cant = pacc_dept_header.data.length;
            for (var i of unificacion_m.periodopoas) {
                header = {};
                header[`periodo`] = i;
                unificacion_m.form_069_data[count] = {
                    header: header,
                    body: pacc_dept_header.data.filter(d => {
                        return d[`periodo_${i}`] != null;
                    })
                }
                count++
            }
        }
        unificacion_m.unidad_medida_list = await BASEAPI.listp('unidad_medida', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: unificacion_m.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": "=",
                    "value":  unificacion_m.session.institucion_id ?  unificacion_m.session.institucion_id : "null"
                },
            ],
            orderby: "id",
            order: "asc"
        });
        if (unificacion_m.unidad_medida_list) {
            for (var i of unificacion_m.form_069_data) {
                for (var j of i.body) {
                    j.costo_total = LAN.money(j.costo_total).format(false);
                    for (var k of unificacion_m.unidad_medida_list.data) {
                        if (j.unidad == k.id) {
                            j.unidad = k.nombre;
                        }
                    }
                }
            }
        }


        if (pacc_dept_pres) {
            unificacion_m.full_press = 0;
            for (var i of pacc_dept_pres.data) {
                unificacion_m.full_press += i.presupuesto;
            }
            unificacion_m.full_press = LAN.money(unificacion_m.full_press).format(true)
        }
        unificacion_m.fecha_aprobacion_069 = LAN.datetime(unificacion_m.fecha_aprobacion);
    };
    unificacion_m.exportPDF = function () {

        $("#form_069pdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    unificacion_m.open_export = async function () {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        await unificacion_m.get_form_069(unificacion_m.current_PDept);
        unificacion_m.modal.modalView("unificacion_m/form_069", {
            width: 'modal-full',
            header: {
                title: `Vista Previa Formulario 069`,
                icon: "ICON.classes.icon-file-presentation"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                show: {
                    end: function () {
                        SWEETALERT.stop();
                    }
                },
                hide: {
                    end: function () {
                        RUNCONTROLLER("unificacion_m", unificacion_m, $scope, $http, $compile);
                        RUN_B("unificacion_m", unificacion_m, $scope, $http, $compile);
                        unificacion_m.getOpenpacc();
                    }
                }
            }
        });
    };
    setTimeout(function () {
        unificacion_m.filterDept(false, unificacion_m.id)
    }, 500);
});
