app.controller("consolidacion", function ($scope, $http, $compile) {
    consolidacion = this;
    //consolidacion.fixFilters = [];
    //consolidacion.singular = "singular";
    //consolidacion.plural = "plural";
    consolidacion.session = new SESSION().current();
    consolidacion.pacc_departamento_list = [];
    consolidacion.referencia = "SNCC.F.053";
    consolidacion.show_estatus = false;
    consolidacion.destroyForm = false;
    consolidacion.EP = 0;
    consolidacion.EP = 0;
    //consolidacion.permissionTable = "tabletopermission";
    RUNCONTROLLER("consolidacion", consolidacion, $scope, $http, $compile);
    RUN_B("consolidacion", consolidacion, $scope, $http, $compile);
    consolidacion.evaluated = false;
    if (typeof vw_pacc !== 'undefined') {
        if (typeof vw_pacc !== 'not defined') {
            if (vw_pacc) {
                vw_pacc = null;
            }
        }
    }
    $scope.$watch("consolidacion.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(consolidacion, 'comentario', rules);
    });
    $scope.$watch("consolidacion.pacc_departamento_estatus", function (value) {
        var rules = [];
        //rules here
        // rules.push(VALIDATION.general.required(value));
        if (consolidacion.form.selected('pacc_departamento_estatus')) {
            consolidacion.pacc_departamento_show_estatus = consolidacion.form.selected('pacc_departamento_estatus').nombre;
            consolidacion.refreshAngular();
        }
        VALIDATION.validate(consolidacion, 'pacc_departamento_estatus', rules);
    });
    $scope.$watch("consolidacion.comentario_pacc_dept", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(consolidacion, 'comentario_pacc_dept', rules);
    });
    consolidacion.get_pacc_dept = async function () {
        var pacc_departamentales = await BASEAPI.listp('vw_pacc_departamental', {
            where: [
                {
                    field: "pacc",
                    value: consolidacion.id || 0
                },
                {
                    field: "estatus",
                    value: 5
                }
            ]
        });
        consolidacion.pacc_departamento_list = pacc_departamentales.data;
    }
    consolidacion.getOpenpacc = async function () {
        var paccData = await BASEAPI.firstp('vw_pacc', {
            order: "desc",
            where: [
                {
                    field: "estatus",
                    operator: "!=",
                    value: 7
                },
                {
                    field: "compania",
                    value: consolidacion.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  consolidacion.session.institucion_id ? "=" : "is",
                    "value":  consolidacion.session.institucion_id ?  consolidacion.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData){
            consolidacion.id = paccData.id;
            consolidacion.nombre = paccData.nombre;
            consolidacion.empresa = consolidacion.session.compania;
            consolidacion.descripcion = paccData.descripcion;
            consolidacion.capitulo = paccData.capitulo;
            consolidacion.sub_capitulo = paccData.subcapitulo;
            consolidacion.unidad = paccData.unidad;
            consolidacion.sigla = paccData.codigo;
            consolidacion.ano_planificacion_view = paccData.año;
            consolidacion.fecha_revision = paccData.fecha_revision;
            consolidacion.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            consolidacion.fecha_aprobacion = paccData.fecha_aprobacion;
            consolidacion.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            consolidacion.codigo_plan = paccData.codigo_plan;
            consolidacion.cantidad = paccData.cantidad;
            consolidacion.version = paccData.version;
            consolidacion.rawestatus = paccData.estatus;
            consolidacion.estatus = paccData.estatus_nombre;
            consolidacion.fecha_presentacion = paccData.fecha_presentacion;
            consolidacion.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            consolidacion.active = paccData.active;
            consolidacion.compania = paccData.compania;
            if (typeof pacc_departamental !== 'undefined') {
                if (typeof pacc_departamental !== 'not defined') {
                    if (pacc_departamental) {
                        pacc_departamental.pacc_id = consolidacion.id;
                        pacc_departamental.refresh();
                    }
                }
            }
            get_pacc_status(consolidacion, consolidacion.rawestatus);
        }
        await consolidacion.get_pacc_dept();
        consolidacion.refreshAngular();
    }

    consolidacion.get_pacc_dept_status = async function (estatus) {
        consolidacion.pacc_dept_next_status = await BASEAPI.listp('vw_pacc_departamento_status_next', {
            limit: 0,
            where: [
                {
                    field: "pacc_departamento_status",
                    value: estatus
                }
            ]
        });

        consolidacion.pacc_dept_before_status = await BASEAPI.listp('vw_pacc_departamento_status_before', {
            limit: 0,
            where: [
                {
                    field: "pacc_departamento_status",
                    value: estatus
                }
            ]
        });
        consolidacion.refreshAngular();
    }
    consolidacion.getOpenpacc();
    consolidacion.filterDept = function(DeptID, paccID){
        if (typeof pacc_departamental !== 'undefined') {
            if (typeof pacc_departamental !== 'not defined') {
                if (pacc_departamental) {
                    pacc_departamental.pacc_id_dept = DeptID;
                    pacc_departamental.pacc_id = paccID;
                    pacc_departamental.refresh();
                }
            }
        }
    };
    consolidacion.back = async function(){
        consolidacion.show_next_tab = false;
        consolidacion.comentario_pacc_dept = "";
        $('.ng-scope').removeClass('active');
        $('#todos_tab').addClass('active');
        await pacc_departamental.refresh();
        consolidacion.refreshAngular();
    };
    consolidacion.formulary = function (data, mode, defaultData) {
        if (consolidacion !== undefined) {

            consolidacion.form.modalWidth = ENUM.modal.width.full;
            consolidacion.form.readonly = {};
            consolidacion.createForm(data, mode, defaultData);
            $scope.$watch("consolidacion.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'nombre', rules);
            });
            $scope.$watch("consolidacion.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'descripcion', rules);
            });
            $scope.$watch("consolidacion.capitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'capitulo', rules);
            });
            $scope.$watch("consolidacion.subcapitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'subcapitulo', rules);
            });
            $scope.$watch("consolidacion.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'unidad', rules);
            });
            $scope.$watch("consolidacion.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'codigo', rules);
            });
            $scope.$watch("consolidacion.año", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'año', rules);
            });
            $scope.$watch("consolidacion.fecha_revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'fecha_revision', rules);
            });
            $scope.$watch("consolidacion.fecha_aprobacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'fecha_aprobacion', rules);
            });
            $scope.$watch("consolidacion.codigo_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'codigo_plan', rules);
            });
            $scope.$watch("consolidacion.cantidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'cantidad', rules);
            });
            $scope.$watch("consolidacion.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'version', rules);
            });
            $scope.$watch("consolidacion.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'estatus', rules);
            });
            $scope.$watch("consolidacion.estatus_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'estatus_nombre', rules);
            });
            $scope.$watch("consolidacion.fecha_presentacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'fecha_presentacion', rules);
            });
            $scope.$watch("consolidacion.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'active', rules);
            });
            $scope.$watch("consolidacion.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(consolidacion, 'compania', rules);
            });
        }
    };
    consolidacion.link_function = function (){
        if (consolidacion.show_next_tab){
            baseController.modal.modalView("pacc_departamental_detail/comentario_dept", {
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
                    sameController: 'pacc_departamental_detail'
                }
            });
        }else {
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
    }
    consolidacion.show_paccDetail = async function (data){
        consolidacion.pacc_dept_id = data.id;
        consolidacion.show_next_tab = true;
        consolidacion.departamento = data.departamento_nombre;
        consolidacion.codigo_dept = data.codigo;
        consolidacion.estatus_pacc_departamento = data.estatus
        consolidacion.show_estatus_pacc_dept = data.estatus_nombre;
        consolidacion.cantidad_total_dept = data.cantidadtotal;
        consolidacion.evaluated = false;
        if (data.estatus)
            consolidacion.pacc_departamento_estatus = consolidacion.estatus_pacc_departamento + "";
        consolidacion.get_pacc_dept_status(consolidacion.estatus_pacc_departamento);
        consolidacion.form.loadDropDown('pacc_departamento_estatus');
        consolidacion.refreshAngular();
        if (typeof vw_pacc_departamental_detail != "undefined") {
            if (vw_pacc_departamental_detail) {
                if (typeof vw_pacc_departamental_detail !== 'not defined') {
                    vw_pacc_departamental_detail.fixFilters = [
                        {
                            "field": "pacc_departamento",
                            "value": data.id
                        },
                    ];
                    BASEAPI.list('vw_pacc_departamental_detail',{
                        where: [
                            {
                                field: "pacc_departamento",
                                value: data.id
                            },
                            {
                                field: "revision",
                                operator: ">",
                                value: 0
                            }
                        ]
                    }, function(data){
                        if(data.data.length > 0) {
                            if (typeof consolidacion != "undefined") {
                                if (consolidacion) {
                                    if (typeof consolidacion !== 'not defined') {
                                        consolidacion.selectQueries['pacc_departamento_estatus'] = [
                                            {
                                                "field": "id",
                                                "operator": "!=",
                                                "value": 4
                                            },
                                        ];
                                    } else {
                                        consolidacion.selectQueries['pacc_departamento_estatus'] = [];
                                    }
                                    consolidacion.form.loadDropDown('pacc_departamento_estatus');
                                }
                            }
                        }
                    });
                    vw_pacc_departamental_detail.refresh();
                }
            }
        }
        vw_pacc_departamental_detail.refreshAngular();
        consolidacion.refreshAngular();
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
    consolidacion.updateData = function () {
        VALIDATION.save(consolidacion, async function () {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            if (consolidacion.id){
                BASEAPI.updateall('pacc',{
                    nombre: consolidacion.nombre,
                    where: [
                        {
                            field: "id",
                            value: consolidacion.id
                        },
                    ]
                }, function (result){
                    SWEETALERT.stop();
                    SWEETALERT.show({message: "PACC ha sido actualizado"});
                });
            }else {
                SWEETALERT.show({type: 'warning', message: "No existe un PACC creado"});
            }
        },["nombre"]);
    }
    consolidacion.cancelar = function() {
        location.reload();
    }
    consolidacion.go_back = function() {
        consolidacion.show_next_tab = false;
        consolidacion.comentario_pacc_dept = "";
        pacc_departamental.refresh();
    }
    consolidacion.allow_estatus = async function () {
        var id_departamentos = [];
        var id_pacc_d = [];
        if(consolidacion.session.insitucion_id){
            var lista_departamento = await BASEAPI.listp('departamento', {
                where: [
                    {
                        field: "institucion",
                        value: consolidacion.session.institucion_id
                    }
                ]
            });
        }else {
            var lista_departamento = await BASEAPI.listp('departamento', {
                where: [
                    {
                        field: "compania",
                        value: consolidacion.session.compania_id
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
                    value: consolidacion.id
                },
                {
                    field: "departamento",
                    value: id_departamentos
                },
                {
                    field: "estatus",
                    value: 5
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
                consolidacion.show_estatus = true;
                consolidacion.form.options.comentario.disabled = false;
                consolidacion.refreshAngular();
            }else {
                consolidacion.show_estatus = false;
            }
        }else {
            consolidacion.show_estatus = false;
        }
    }
    consolidacion.allow_estatus();
    consolidacion.save_comment = async function(estatus) {
        VALIDATION.save(consolidacion, async function () {
            SWEETALERT.confirm({
                type: "warning",
                message: "¿Desea envíar el PACC a unificación?",
                confirm: async function () {
                    titulo = `El PACC ha sido enviado al proceso de UNIFICACIÓN`;
                    cuerpo = `El PACC ha sido enviado al proceso de UNIFICACIÓN, favor proceder con las acciones necesarias.`
                    function_send_email_custom_group(titulo,cuerpo,titulo,cuerpo, consolidacion.session.compania_id, consolidacion.session.institucion_id,[4,5,12]);
                    BASEAPI.insert('comentarios', {
                        "comentario": consolidacion.comentario,
                        "type": 15,
                        "created_by": consolidacion.session.usuario_id,
                        "value": consolidacion.id,
                        "value2": estatus
                    }, function () {});
                    BASEAPI.updateall('pacc', {
                        estatus: estatus,
                        where: [
                            {
                                field: "id",
                                value: consolidacion.id
                            }
                        ]
                    }, function (result) {
                        location.reload();
                    });
                    BASEAPI.updateall('pacc_departamental', {
                        estatus: 6,
                        where: [
                            {
                                field: "pacc",
                                value: consolidacion.id
                            }
                        ]
                    }, function (result) {
                        location.reload();
                    });
                }
            });
        }, ["comentario"], "Debe completar el COMENTARIO antes de enviar al próximo paso");
    }
    consolidacion.save_dept_comment = async function(estatus){
        VALIDATION.save(consolidacion, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
            var rs = await BASEAPI.insertIDp('comentarios', {
                "comentario": consolidacion.comentario_pacc_dept,
                "type": ENUM_2.tipo_comentario.Pacc_departamental,
                "created_by": consolidacion.session.usuario_id,
                "value": consolidacion.pacc_dept_id,
                "value2": estatus
            }, '', '');
            if (rs.data) {
                if (rs.data.data) {
                    if (rs.data.data[0]) {
                        if (rs.data.data[0].id) {
                            consolidacion.comentario_pacc_dept = "";
                            titulo = `El PACC ha sido devuelto a revisión`;
                            cuerpo = `El PACC ha sido devuelto. Proceder a leer las observacones y tomar las acciones de lugar.`
                            function_send_email_custom_group(titulo, cuerpo, titulo, cuerpo, consolidacion.session.compania_id, consolidacion.session.institucion_id, [6, 7], 4);
                            await BASEAPI.updateallp('pacc_departamental', {
                                estatus: estatus,
                                condicion: 1,
                                where: [
                                    {
                                        field: "id",
                                        value: consolidacion.pacc_dept_id
                                    }
                                ]
                            });
                            if (LAN.money(consolidacion.estatus_pacc_departamento).value !== LAN.money(estatus).value) {
                                SWEETALERT.stop();
                                SWEETALERT.show({
                                    message: `El PACC para el departamento: "${consolidacion.departamento}", fue devuelto con exito`,
                                    confirm: async function () {
                                        await consolidacion.allow_estatus();
                                        consolidacion.go_back()
                                        pacc_departamental.refresh();
                                        consolidacion.refreshAngular();
                                    }
                                });
                            } else {
                                SWEETALERT.show({
                                    message: `El PACC para el departamento: "${consolidacion.departamento}", fue devuelto con exito`,
                                    confirm: async function () {
                                        await consolidacion.allow_estatus();
                                        consolidacion.go_back()
                                        pacc_departamental.refresh();
                                        consolidacion.refreshAngular();
                                    }
                                });
                            }
                            consolidacion.evaluated = true;
                            vw_pacc_departamental_detail.refreshAngular();
                            consolidacion.refreshAngular();
                            consolidacion.get_pacc_dept();
                        }
                    }
                }
            }
        },['comentario_pacc_dept'], "Debe completar el COMENTARIO antes de enviar al próximo paso");
    }
});
