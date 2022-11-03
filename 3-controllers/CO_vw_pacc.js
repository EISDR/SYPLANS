app.controller("vw_pacc", function ($scope, $http, $compile) {
    vw_pacc = this;
    //vw_pacc.fixFilters = [];
    //vw_pacc.singular = "singular";
    //vw_pacc.plural = "plural";
    vw_pacc.session = new SESSION().current();
    vw_pacc.pacc_departamento_list = [];
    vw_pacc.referencia = "SNCC.F.053";
    vw_pacc.destroyForm = false;
    vw_pacc.EP = 0;
    vw_pacc.EP = 0;
    //vw_pacc.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_pacc", vw_pacc, $scope, $http, $compile);
    RUN_B("vw_pacc", vw_pacc, $scope, $http, $compile);
    if (typeof consolidacion !== 'undefined') {
        if (typeof consolidacion !== 'not defined') {
            if (consolidacion) {
                consolidacion = null;
            }
        }
    }
    vw_pacc.evaluated = false;
    $scope.$watch("vw_pacc.comentario_pacc_dept", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_pacc, 'comentario_pacc_dept', rules);
    });
    $scope.$watch("vw_pacc.pacc_departamento_estatus", function (value) {
        var rules = [];
        //rules here
        // rules.push(VALIDATION.general.required(value));
        if (vw_pacc.form)
        if (vw_pacc.form.selected('pacc_departamento_estatus')) {
            vw_pacc.pacc_departamento_show_estatus = vw_pacc.form.selected('pacc_departamento_estatus').nombre;
            vw_pacc.refreshAngular();
        }
        VALIDATION.validate(vw_pacc, 'pacc_departamento_estatus', rules);
    });
    vw_pacc.get_pacc_dept = async function () {
        if (vw_pacc.id){
            var pacc_departamentales = await BASEAPI.listp('vw_pacc_departamental', {
                limit:0,
                where: [
                    {
                        field: "pacc",
                        value: vw_pacc.id
                    },
                    {
                        field: "estatus",
                        value: 3
                    }
                ]
            });
            vw_pacc.pacc_departamento_list = pacc_departamentales.data;
        }
    }
    vw_pacc.getOpenpacc = async function () {
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
                    value: vw_pacc.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": vw_pacc.session.institucion_id ? "=" : "is",
                    "value":  vw_pacc.session.institucion_id ?  vw_pacc.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData){
            vw_pacc.id = paccData.id;
            vw_pacc.nombre = paccData.nombre;
            vw_pacc.empresa = vw_pacc.session.compania;
            vw_pacc.descripcion = paccData.descripcion;
            vw_pacc.capitulo = paccData.capitulo;
            vw_pacc.sub_capitulo = paccData.subcapitulo;
            vw_pacc.unidad = paccData.unidad;
            vw_pacc.sigla = paccData.codigo;
            vw_pacc.ano_planificacion_view = paccData.año;
            vw_pacc.fecha_revision = paccData.fecha_revision;
            vw_pacc.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            vw_pacc.fecha_aprobacion = paccData.fecha_aprobacion;
            vw_pacc.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            vw_pacc.codigo_plan = paccData.codigo_plan;
            vw_pacc.cantidad = paccData.cantidad;
            vw_pacc.version = paccData.version;
            vw_pacc.estatus = paccData.estatus_nombre;
            vw_pacc.fecha_presentacion = paccData.fecha_presentacion;
            vw_pacc.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            vw_pacc.active = paccData.active;
            vw_pacc.compania = paccData.compania;
            if (typeof pacc_departamental !== 'undefined') {
                if (typeof pacc_departamental !== 'not defined') {
                    if (pacc_departamental) {
                        pacc_departamental.pacc_id = vw_pacc.id;
                        pacc_departamental.refresh();
                    }
                }
            }
        }
        await vw_pacc.get_pacc_dept();
        vw_pacc.refreshAngular();
    }
    vw_pacc.getOpenpacc();
    vw_pacc.filterDept = function(DeptID, paccID){
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
    vw_pacc.back = async function(){
        vw_pacc.show_next_tab = false;
        vw_pacc.comentario_pacc_dept = "";
        $('.ng-scope').removeClass('active');
        $('#todos_tab').addClass('active');
        await pacc_departamental.refresh();
        vw_pacc.refreshAngular();
    };
    vw_pacc.formulary = function (data, mode, defaultData) {
        if (vw_pacc !== undefined) {

            vw_pacc.form.modalWidth = ENUM.modal.width.full;
            vw_pacc.form.readonly = {};
            vw_pacc.createForm(data, mode, defaultData);
            $scope.$watch("vw_pacc.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'nombre', rules);
            });
            $scope.$watch("vw_pacc.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'descripcion', rules);
            });
            $scope.$watch("vw_pacc.capitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'capitulo', rules);
            });
            $scope.$watch("vw_pacc.subcapitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'subcapitulo', rules);
            });
            $scope.$watch("vw_pacc.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'unidad', rules);
            });
            $scope.$watch("vw_pacc.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'codigo', rules);
            });
            $scope.$watch("vw_pacc.año", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'año', rules);
            });
            $scope.$watch("vw_pacc.fecha_revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'fecha_revision', rules);
            });
            $scope.$watch("vw_pacc.fecha_aprobacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'fecha_aprobacion', rules);
            });
            $scope.$watch("vw_pacc.codigo_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'codigo_plan', rules);
            });
            $scope.$watch("vw_pacc.cantidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'cantidad', rules);
            });
            $scope.$watch("vw_pacc.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'version', rules);
            });
            $scope.$watch("vw_pacc.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'estatus', rules);
            });
            $scope.$watch("vw_pacc.estatus_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'estatus_nombre', rules);
            });
            $scope.$watch("vw_pacc.fecha_presentacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'fecha_presentacion', rules);
            });
            $scope.$watch("vw_pacc.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'active', rules);
            });
            $scope.$watch("vw_pacc.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_pacc, 'compania', rules);
            });
        }
    };
    vw_pacc.link_function = function (){
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

    }
    vw_pacc.show_paccDetail = async function (data){
        vw_pacc.pacc_dept_id = data.id;
        vw_pacc.show_next_tab = true;
        vw_pacc.departamento = data.departamento_nombre;
        vw_pacc.codigo_dept = data.codigo;
        vw_pacc.estatus_pacc_departamento = data.estatus;
        vw_pacc.evaluated = false;
        if (data.estatus)
            vw_pacc.pacc_departamento_estatus = vw_pacc.estatus_pacc_departamento + "";
        await get_pacc_dept_status(vw_pacc, vw_pacc.pacc_departamento_estatus);
        vw_pacc.form.loadDropDown('pacc_departamento_estatus');
        vw_pacc.refreshAngular();
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
                            if (typeof vw_pacc != "undefined") {
                                if (vw_pacc) {
                                    if (typeof vw_pacc !== 'not defined') {
                                        vw_pacc.selectQueries['pacc_departamento_estatus'] = [
                                            {
                                                "field": "id",
                                                "operator": "!=",
                                                "value": 4
                                            },
                                        ];
                                    } else {
                                        vw_pacc.selectQueries['pacc_departamento_estatus'] = [];
                                    }
                                    vw_pacc.form.loadDropDown('pacc_departamento_estatus');
                                }
                            }
                        }
                    });
                    vw_pacc_departamental_detail.refresh();
                }
            }
        }
        vw_pacc_departamental_detail.refreshAngular();
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
    vw_pacc.updateData = function () {
        VALIDATION.save(vw_pacc, async function () {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            if (vw_pacc.id){
                BASEAPI.updateall('pacc',{
                    nombre: vw_pacc.nombre,
                    where: [
                        {
                            field: "id",
                            value: vw_pacc.id
                        }
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
    vw_pacc.cancelar = function() {
        location.reload();
    }
    vw_pacc.go_back = async function() {
        vw_pacc.show_next_tab = false;
        vw_pacc.comentario_pacc_dept = "";
        $('.ng-scope').removeClass('active');
        $('#todos_tab').addClass('active');
        await pacc_departamental.refresh();
        vw_pacc.refreshAngular();
    }
    vw_pacc.save_comment = async function(estatus, fromWhere) {
        var current_data = await BASEAPI.listp('vw_pacc_departamental_detail', {
            limit: 0,
            where: [
                {
                    field: "pacc_departamento",
                    value: vw_pacc.pacc_dept_id
                },
                {
                    field: "revision",
                    operator: ">",
                    value: 0
                },
                {
                    field: "deleted",
                    value: 0
                }
            ]
        });
        if (current_data.data.length > 0) {
            vw_pacc.dont_send = true;
        }else{
            vw_pacc.dont_send = false;
        }
        if (vw_pacc.dont_send) {
            if (fromWhere === 'next') {
                SWEETALERT.show({
                    type: "error",
                    message: `PACC-D no puede ser enviado a Consolidación. Debe trabajar los registros que están con Estado igual a "Trabajado" o "Revisión".`
                });
            } else {
                VALIDATION.save(vw_pacc, async function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    var rs = await BASEAPI.insertIDp('comentarios', {
                        "comentario": vw_pacc.comentario_pacc_dept,
                        "type": ENUM_2.tipo_comentario.Pacc_departamental,
                        "created_by": vw_pacc.session.usuario_id,
                        "value": vw_pacc.pacc_dept_id,
                        "value2": estatus
                    }, '', '');
                    if (rs.data) {
                        if (rs.data.data) {
                            if (rs.data.data[0]) {
                                if (rs.data.data[0].id) {
                                    vw_pacc.comentario_pacc_dept = "";
                                    titulo = `El PACC ha sido devuelto a revisión`;
                                    cuerpo = `El PACC ha sido devuelto. Proceder a leer las observacones y tomar las acciones de lugar.`
                                    function_send_email_custom_group(titulo, cuerpo, titulo, cuerpo, vw_pacc.session.compania_id, vw_pacc.session.institucion_id, [6, 7], 4);
                                    await BASEAPI.updateallp('pacc_departamental', {
                                        estatus: estatus,
                                        condicion: 1,
                                        where: [
                                            {
                                                field: "id",
                                                value: vw_pacc.pacc_dept_id
                                            }
                                        ]
                                    });
                                    if (LAN.money(vw_pacc.estatus_pacc_departamento).value !== LAN.money(estatus).value) {
                                        SWEETALERT.stop();
                                        SWEETALERT.show({
                                            message: `El PACC para el departamento: "${vw_pacc.departamento}", fue devuelto con exito`,
                                            confirm: function () {
                                                vw_pacc.go_back()
                                                pacc_departamental.refresh();
                                                vw_pacc.refreshAngular();
                                            }
                                        });
                                    } else {
                                        SWEETALERT.show({
                                            message: `El PACC para el departamento: "${vw_pacc.departamento}", fue devuelto con exito`,
                                            confirm: function () {
                                                vw_pacc.go_back()
                                                pacc_departamental.refresh();
                                                vw_pacc.refreshAngular();
                                            }
                                        });
                                    }
                                    vw_pacc.evaluated = true;
                                    vw_pacc_departamental_detail.refreshAngular();
                                    vw_pacc.refreshAngular();
                                    vw_pacc.get_pacc_dept();
                                }
                            }
                        }
                    }
                },['comentario_pacc_dept'], "Debe completar el COMENTARIO antes de enviar al próximo paso" );
            }
        }else{
            VALIDATION.save(vw_pacc, async function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    if (fromWhere == 'before') {
                        SWEETALERT.confirm({
                            type: "error",
                            message: "<p>Está a punto de devolver el PACC-D a su Etapa de Preparación sin existir ningún registro en REVISION.</p> ¿Desea devolver el PACC-D?",
                            confirm: async function () {
                                titulo = `El PACC ha sido devuelto a revisión`;
                                cuerpo = `El PACC ha sido devuelto. Proceder a leer las observacones y tomar las acciones de lugar.`
                                function_send_email_custom_group(titulo,cuerpo,titulo,cuerpo, vw_pacc.session.compania_id, vw_pacc.session.institucion_id,[6,7], 4);
                                var rs = await BASEAPI.insertIDp('comentarios', {
                                    "comentario": vw_pacc.comentario_pacc_dept,
                                    "type": ENUM_2.tipo_comentario.Pacc_departamental,
                                    "created_by": vw_pacc.session.usuario_id,
                                    "value": vw_pacc.pacc_dept_id,
                                    "value2": estatus
                                }, '', '');
                                if (rs.data) {
                                    if (rs.data.data)
                                        if (rs.data.data[0])
                                            if (rs.data.data[0].id) {
                                                vw_pacc.comentario_pacc_dept = "";

                                                await BASEAPI.updateallp('pacc_departamental',{
                                                    estatus: estatus,
                                                    where: [
                                                        {
                                                            field: "id",
                                                            value: vw_pacc.pacc_dept_id
                                                        }
                                                    ]
                                                });
                                                if (LAN.money(vw_pacc.estatus_pacc_departamento).value !== LAN.money(estatus).value){
                                                    SWEETALERT.stop();
                                                    SWEETALERT.show({
                                                        message: `El PACC para el departamento: "${vw_pacc.departamento}", fue devuelto con exito`,
                                                        confirm: function() {
                                                            vw_pacc.go_back()
                                                            pacc_departamental.refresh();
                                                            vw_pacc.refreshAngular();
                                                        }
                                                    });
                                                }else{
                                                    SWEETALERT.show({
                                                        message: `El PACC para el departamento: "${vw_pacc.departamento}", fue devuelto con exito`,
                                                        confirm: function() {
                                                            vw_pacc.go_back()
                                                            pacc_departamental.refresh();
                                                            vw_pacc.refreshAngular();
                                                        }
                                                    });
                                                }
                                                vw_pacc.evaluated = true;
                                                vw_pacc_departamental_detail.refreshAngular();
                                                vw_pacc.go_back()
                                                vw_pacc.refreshAngular();
                                                vw_pacc.get_pacc_dept();
                                                pacc_departamental.refresh();
                                            }
                                }
                            }
                        });
                    }else {
                        var rs = await BASEAPI.insertIDp('comentarios', {
                            "comentario": vw_pacc.comentario_pacc_dept,
                            "type": ENUM_2.tipo_comentario.Pacc_departamental,
                            "created_by": vw_pacc.session.usuario_id,
                            "value": vw_pacc.pacc_dept_id,
                            "value2": estatus
                        }, '', '');
                        if (rs.data) {
                            if (rs.data.data)
                                if (rs.data.data[0])
                                    if (rs.data.data[0].id) {
                                        vw_pacc.comentario_pacc_dept = "";
                                        await BASEAPI.updateallp('pacc_departamental',{
                                            estatus: estatus,
                                            where: [
                                                {
                                                    field: "id",
                                                    value: vw_pacc.pacc_dept_id
                                                }
                                            ]
                                        });
                                        if (LAN.money(vw_pacc.estatus_pacc_departamento).value !== LAN.money(estatus).value){
                                            SWEETALERT.stop();
                                            SWEETALERT.show({
                                                message: "PACC Departamental ha sido evaluado",
                                                confirm: function() {
                                                    vw_pacc.go_back()
                                                    pacc_departamental.refresh();
                                                    vw_pacc.refreshAngular();
                                                }
                                            });
                                        }else{
                                            SWEETALERT.show({
                                                message: "PACC Departamental ha sido trabajado",
                                                confirm: function() {
                                                    pacc_departamental.refresh();
                                                    vw_pacc.refreshAngular();
                                                }
                                            });
                                        }
                                        vw_pacc.evaluated = true;
                                        vw_pacc_departamental_detail.refreshAngular();
                                        vw_pacc.refreshAngular();
                                        vw_pacc.get_pacc_dept();
                                    }
                        }
                    }
                }, ["comentario_pacc_dept", "pacc_departamento_estatus"], "Debe completar el COMENTARIO antes de enviar al próximo paso");
        }
    }
});