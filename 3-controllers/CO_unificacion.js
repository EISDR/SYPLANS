app.controller("unificacion", function ($scope, $http, $compile) {
    unificacion = this;
    //unificacion.fixFilters = [];
    //unificacion.singular = "singular";
    //unificacion.plural = "plural";
    unificacion.session = new SESSION().current();
    unificacion.pacc_departamento_list = [];
    unificacion.referencia = "SNCC.F.053";
    unificacion.show_estatus = false;
    unificacion.done_eval = false;
    unificacion.readonly = window.location.href.indexOf("readonly") !== -1;
    unificacion.myProfile = unificacion.session.groups[0].id;
    unificacion.monitoreo_nombre = unificacion.session.monitoreo_nombre;
    unificacion.monitoreo_nombre = "Trimestre";
    unificacion.lan = LAN;
    // unificacion.destroyForm = false;
    unificacion.EP = 0;
    unificacion.EP = 0;
    unificacion.periodopoa = unificacion.session.cantidad;
    unificacion.periodopoa = 4;
    unificacion.periodopoas = [];
    for (var i = 1; i <= unificacion.periodopoa; i++) {
        unificacion.periodopoas.push(i);
    }
    //unificacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("unificacion", unificacion, $scope, $http, $compile);
    RUN_B("unificacion", unificacion, $scope, $http, $compile);
    consolidacion = undefined;
    unificacion.filterDept = async function (DeptID, paccID, PaccDept) {

        if (PaccDept) {
            unificacion.current_PDept = PaccDept.id;
            unificacion.name_PDept = PaccDept.nombre;
            unificacion.code_PDept = PaccDept.codigo;
            unificacion.cant_PDept = PaccDept.cantidadtotal + "";
            unificacion.ver_PDept = PaccDept.version;
        } else {
            unificacion.current_PDept = null;
            unificacion.name_PDept = null;
            unificacion.code_PDept = null;
            unificacion.cant_PDept = null;
            unificacion.ver_PDept = null;
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
    unificacion.filterDept(false, unificacion.id);
    get_pacc_status(unificacion, unificacion.rawestatus);
    $scope.$watch("unificacion.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(unificacion, 'comentario', rules);
    });
    $scope.$watch("unificacion.pacc_departamento_estatus", function (value) {
        var rules = [];
        //rules here
        // rules.push(VALIDATION.general.required(value));
        if (unificacion.form.selected('pacc_departamento_estatus')) {
            unificacion.pacc_departamento_show_estatus = unificacion.form.selected('pacc_departamento_estatus').nombre;
            unificacion.refreshAngular();
        }
        VALIDATION.validate(unificacion, 'pacc_departamento_estatus', rules);
    });
    unificacion.get_pacc_dept = async function () {
        var pacc_departamentales = await BASEAPI.listp('vw_pacc_departamental', {
            where: [
                {
                    field: "pacc",
                    value: unificacion.id
                },
                {
                    field: "estatus",
                    value: 6
                },
                {
                    field: "compania",
                    value: unificacion.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": unificacion.session.institucion_id ? "=" : "is",
                    "value": unificacion.session.institucion_id ? unificacion.session.institucion_id : "$null"
                }
            ]
        });
        unificacion.pacc_departamento_list = pacc_departamentales.data;
    }
    unificacion.getOpenpacc = async function () {
        var paccData = await BASEAPI.firstp('vw_pacc', {
            order: "desc",
            where: [
                {
                    field: "estatus",
                    operator: "<=",
                    value: 7
                },
                {
                    field: "compania",
                    value: unificacion.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": unificacion.session.institucion_id ? "=" : "is",
                    "value": unificacion.session.institucion_id ? unificacion.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData) {
            unificacion.id = paccData.id;
            unificacion.nombre = paccData.nombre;
            unificacion.empresa = unificacion.session.compania;
            unificacion.descripcion = paccData.descripcion;
            unificacion.capitulo = paccData.capitulo;
            unificacion.sub_capitulo = paccData.subcapitulo;
            unificacion.unidad = paccData.unidad;
            unificacion.unidad_compra = paccData.unidad_compra;
            unificacion.sigla = paccData.codigo;
            unificacion.ano_planificacion_view = paccData.año;
            unificacion.fecha_revision = paccData.fecha_revision;
            unificacion.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            unificacion.fecha_aprobacion = paccData.fecha_aprobacion;
            unificacion.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            unificacion.codigo_plan = paccData.codigo_plan;
            unificacion.cantidad = paccData.cantidad;
            unificacion.version = paccData.version;
            unificacion.rawestatus = paccData.estatus;
            unificacion.estatus = paccData.estatus_nombre;
            unificacion.fecha_presentacion = paccData.fecha_presentacion;
            unificacion.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            unificacion.active = paccData.active;
            unificacion.compania = paccData.compania;
            unificacion.lastprofile = paccData.lastprofile;
            if (unificacion.lastprofile == unificacion.myProfile) {
                unificacion.done_eval = true;
            } else {
                unificacion.done_eval = false;
            }
            if (typeof pacc_departamental !== 'undefined') {
                if (typeof pacc_departamental !== 'not defined') {
                    if (pacc_departamental) {
                        pacc_departamental.pacc_id = unificacion.id;
                        pacc_departamental.refresh();
                    }
                }
            }
            get_pacc_status(unificacion, unificacion.rawestatus);
            unificacion.allow_estatus();
        }
        await unificacion.get_pacc_dept();
        unificacion.refreshAngular();
    }
    unificacion.getOpenpacc();
    unificacion.back = function () {
        unificacion.show_next_tab = false;
    };
    unificacion.formulary = function (data, mode, defaultData) {
        if (unificacion !== undefined) {

            unificacion.form.modalWidth = ENUM.modal.width.full;
            unificacion.form.readonly = {};
            unificacion.createForm(data, mode, defaultData);
            $scope.$watch("unificacion.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'nombre', rules);
            });
            $scope.$watch("unificacion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'descripcion', rules);
            });
            $scope.$watch("unificacion.capitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'capitulo', rules);
            });
            $scope.$watch("unificacion.subcapitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'subcapitulo', rules);
            });
            $scope.$watch("unificacion.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'unidad', rules);
            });
            $scope.$watch("unificacion.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'codigo', rules);
            });
            $scope.$watch("unificacion.año", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'año', rules);
            });
            $scope.$watch("unificacion.fecha_revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'fecha_revision', rules);
            });
            $scope.$watch("unificacion.fecha_aprobacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'fecha_aprobacion', rules);
            });
            $scope.$watch("unificacion.codigo_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'codigo_plan', rules);
            });
            $scope.$watch("unificacion.cantidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'cantidad', rules);
            });
            $scope.$watch("unificacion.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'version', rules);
            });
            $scope.$watch("unificacion.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'estatus', rules);
            });
            $scope.$watch("unificacion.estatus_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'estatus_nombre', rules);
            });
            $scope.$watch("unificacion.fecha_presentacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'fecha_presentacion', rules);
            });
            $scope.$watch("unificacion.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'active', rules);
            });
            $scope.$watch("unificacion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(unificacion, 'compania', rules);
            });
        }
    };
    unificacion.link_function = function () {
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
    unificacion.updateData = function () {
        VALIDATION.save(unificacion, async function () {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            if (unificacion.id) {
                BASEAPI.updateall('pacc', {
                    nombre: unificacion.nombre,
                    where: [
                        {
                            field: "id",
                            value: unificacion.id
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
    unificacion.cancelar = function () {
        location.reload();
    }
    unificacion.go_back = function () {
        unificacion.show_next_tab = false;
        unificacion.comentario_pacc_dept = "";
        pacc_departamental.refresh();
    }
    unificacion.allow_estatus = async function () {
        var id_departamentos = [];
        var id_pacc_d = [];
        if (unificacion.session.insitucion_id) {
            var lista_departamento = await BASEAPI.listp('departamento', {
                where: [
                    {
                        field: "institucion",
                        value: unificacion.session.institucion_id
                    }
                ]
            });
        } else {
            var lista_departamento = await BASEAPI.listp('departamento', {
                where: [
                    {
                        field: "compania",
                        value: unificacion.session.compania_id
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
                    value: unificacion.id
                },
                {
                    field: "departamento",
                    value: id_departamentos
                },
                {
                    field: "estatus",
                    value: 6
                }
            ]
        })
        for (var i of lista_pacc_d.data) {
            id_pacc_d.push(i.id);
        }

        console.log(id_pacc_d, id_departamentos);
        if (id_pacc_d.length > 0 && id_departamentos.length > 0) {
            if (id_pacc_d.length == id_departamentos.length) {
                unificacion.show_estatus = true;
                unificacion.refreshAngular();
            } else {
                unificacion.show_estatus = false;
                unificacion.refreshAngular();
            }
        } else {
            unificacion.show_estatus = false;
            unificacion.refreshAngular();
        }
    }
    unificacion.allow_estatus();
    unificacion.todosvalidos = function () {
        if (typeof u_pacc_dept !== 'undefined') {
            if (typeof u_pacc_dept !== 'not defined') {
                if (u_pacc_dept) {
                    unificacion.refreshAngular()
                    u_pacc_dept.todosvalidos();
                }
            }
        }
    }
    unificacion.save_comment = async function (estatus, fromWhere) {
        var titulo_push = "";
        var cuerpo_push = "";
        var titulo = "";
        var cuerpo = "";
        var lista_dept = [];
        VALIDATION.save(unificacion, async function () {
            if (fromWhere === 'before') {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "<p>Al devolver un PACC DEPARTAMENTAL todos los otros PACC DEPARTAMENTALES serán devueltos a la opción de REVISIÓN</p>¿Desea devolver el PACC a revisión?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": unificacion.comentario,
                            "type": 15,
                            "created_by": unificacion.session.usuario_id,
                            "value": unificacion.id,
                            "value2": estatus
                        }, function () {
                        });
                        for (var i of unificacion.pacc_departamento_list) {
                            lista_dept.push(i.departamento_nombre)
                        }
                        titulo_push = `El PACC ha sido devuelto a REVISIÓN`;
                        cuerpo_push = `El PACC ha sido devuelto a REVISIÓN, Revisar las observaciones y proceder a corregir.`
                        titulo = `El PACC ha sido devuelto a revisión`;
                        cuerpo = `El PACC del(os) Dpto(s): ${lista_dept}  ha(n) sido devuelto(s) a REVISIÓN. Revisar las observaciones  y proceder con las sugerencias o cambios.`
                        function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, unificacion.session.compania_id, unificacion.session.institucion_id, [4, 5]);
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            lastprofile: '$null',
                            fecha_revision: "$null",
                            where: [
                                {
                                    field: "id",
                                    value: unificacion.id
                                }
                            ]
                        }, function (result) {
                            BASEAPI.updateall('pacc_departamental', {
                                estatus: 3,
                                where: [
                                    {
                                        field: "pacc",
                                        value: unificacion.id
                                    }
                                ]
                            }, function (result) {
                                location.reload();
                            });
                        });
                    }
                });
            } else if (fromWhere === 'next' && !unificacion.lastprofile) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea avanzar con el proceso de unificación de PACC?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": unificacion.comentario,
                            "type": 15,
                            "created_by": unificacion.session.usuario_id,
                            "value": unificacion.id,
                            "value2": estatus
                        }, function () {
                        });
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            lastprofile: unificacion.myProfile,
                            where: [
                                {
                                    field: "id",
                                    value: unificacion.id
                                }
                            ]
                        }, function (result) {
                            SWEETALERT.show({
                                message: "Primer proceso de unificación terminado. A la espera de que el segundo cargo responsable proceda a terminar la unificación",
                                confirm: function () {
                                    location.reload();
                                }
                            });
                        });
                    }
                });
            } else if (fromWhere === 'next' && unificacion.lastprofile) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea enviar al PACC al proceso de aprobación?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": unificacion.comentario,
                            "type": 15,
                            "created_by": unificacion.session.usuario_id,
                            "value": unificacion.id,
                            "value2": estatus
                        }, function () {
                        });
                        titulo_push = `El PACC ha sido enviado al proceso de aprobación`;
                        cuerpo_push = `El PACC ha sido enviado al proceso de aprobación, favor proceder con las acciones necesarias.`
                        titulo = `El PACC ha sido enviado al proceso de aprobación`;
                        cuerpo = `El PACC ha sido enviado al proceso de aprobación, favor proceder con la revisión y posterior autorización.`
                        function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, unificacion.session.compania_id, unificacion.session.institucion_id, 13, [4, 5, 12]);
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            lastprofile: "$null",
                            fecha_revision: '$now()',
                            where: [
                                {
                                    field: "id",
                                    value: unificacion.id
                                }
                            ]
                        }, function (result) {
                            location.reload();
                        });
                    }
                });
            }
        }, ["comentario"], "Debe completar el COMENTARIO antes de enviar al próximo paso");
    }
    unificacion.get_form_069 = async function (pacc_dept) {
        unificacion.form_069_data = [];
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
                        value: unificacion.id
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
                        value: unificacion.id
                    }
                ]
            });
        }
        if (pacc_dept_header.data) {
            var header = {};
            var count = 0;
            unificacion.full_cant = pacc_dept_header.data.length;
            for (var i of unificacion.periodopoas) {
                header = {};
                header[`periodo`] = i;
                unificacion.form_069_data[count] = {
                    header: header,
                    body: pacc_dept_header.data.filter(d => {
                        return d[`periodo_${i}`] != null;
                    })
                }
                count++
            }
        }
        unificacion.unidad_medida_list = await BASEAPI.listp('unidad_medida', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: unificacion.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  "=",
                    "value":  unificacion.session.institucion_id ?  unificacion.session.institucion_id : "null"
                },
            ],
            orderby: "id",
            order: "asc"
        });
        if (unificacion.unidad_medida_list) {
            for (var i of unificacion.form_069_data) {
                for (var j of i.body) {
                    j.costo_total = LAN.money(j.costo_total).format(false);
                    for (var k of unificacion.unidad_medida_list.data) {
                        if (j.unidad == k.id) {
                            j.unidad = k.nombre;
                        }
                    }
                }
            }
        }


        if (pacc_dept_pres) {
            unificacion.full_press = 0;
            for (var i of pacc_dept_pres.data) {
                unificacion.full_press += i.presupuesto;
            }
            unificacion.full_press = LAN.money(unificacion.full_press).format(true);
        }
        unificacion.fecha_aprobacion_069 = LAN.datetime(unificacion.fecha_aprobacion);
    };
    unificacion.exportPDF = function () {

        $("#form_069pdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    unificacion.open_export = async function () {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        await unificacion.get_form_069(unificacion.current_PDept);
        unificacion.modal.modalView("unificacion/form_069", {
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
                        RUNCONTROLLER("unificacion", unificacion, $scope, $http, $compile);
                        RUN_B("unificacion", unificacion, $scope, $http, $compile);
                        unificacion.getOpenpacc();
                    }
                }
            }
        });
    };
});
