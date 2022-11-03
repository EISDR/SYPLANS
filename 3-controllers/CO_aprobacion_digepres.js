app.controller("aprobacion_digepres", function ($scope, $http, $compile) {
    aprobacion_digepres = this;
    //aprobacion_digepres.fixFilters = [];
    //aprobacion_digepres.singular = "singular";
    //aprobacion_digepres.plural = "plural";
    aprobacion_digepres.headertitle = "Aprobación DIGEPRES";
    aprobacion_digepres.destroyForm = false;
    aprobacion_digepres.lan = LAN;
    //aprobacion_digepres.permissionTable = "tabletopermission";
    aprobacion_digepres.session = new SESSION().current();
    aprobacion_digepres.monitoreo_nombre = aprobacion_digepres.session.monitoreo_nombre;
    aprobacion_digepres.monitoreo_nombre = "Trimestre";
    aprobacion_digepres.periodopoa = aprobacion_digepres.session.cantidad;
    aprobacion_digepres.periodopoa = 4;
    aprobacion_digepres.periodopoas = [];
    for (var i = 1; i <= aprobacion_digepres.periodopoa; i++) {
        aprobacion_digepres.periodopoas.push(i);
    }
    RUNCONTROLLER("aprobacion_digepres", aprobacion_digepres, $scope, $http, $compile);
    RUN_B("aprobacion_digepres", aprobacion_digepres, $scope, $http, $compile);
    if (typeof aprobacion_mae !== 'undefined') {
        if (typeof aprobacion_mae !== 'not defined') {
            if (aprobacion_mae) {
                aprobacion_mae = null;
            }
        }
    }
    if (typeof aprobacion_dgcp !== 'undefined') {
        if (typeof aprobacion_dgcp !== 'not defined') {
            if (aprobacion_dgcp) {
                aprobacion_dgcp = null;
            }
        }
    }
    $scope.$watch("aprobacion_digepres.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(aprobacion_digepres, 'comentario', rules);
    });
    aprobacion_digepres.formulary = function (data, mode, defaultData) {
        if (aprobacion_digepres !== undefined) {
            aprobacion_digepres.form.modalWidth = ENUM.modal.width.full;
            aprobacion_digepres.form.readonly = {};
            aprobacion_digepres.createForm(data, mode, defaultData);
        }
    };
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
    aprobacion_digepres.get_paccData = async function () {
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
                    value: aprobacion_digepres.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": aprobacion_digepres.session.institucion_id ? "=" : "is",
                    "value":  aprobacion_digepres.session.institucion_id ?  aprobacion_digepres.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData){
            aprobacion_digepres.id = paccData.id;
            aprobacion_digepres.nombre = paccData.nombre;
            aprobacion_digepres.empresa = aprobacion_digepres.session.compania;
            aprobacion_digepres.descripcion = paccData.descripcion;
            aprobacion_digepres.capitulo = paccData.capitulo;
            aprobacion_digepres.sub_capitulo = paccData.subcapitulo;
            aprobacion_digepres.unidad = paccData.unidad;
            aprobacion_digepres.unidad_compra = paccData.unidad_compra;
            aprobacion_digepres.sigla = paccData.codigo;
            aprobacion_digepres.ano_planificacion_view = paccData.año;
            aprobacion_digepres.fecha_revision = paccData.fecha_revision;
            aprobacion_digepres.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            aprobacion_digepres.fecha_aprobacion = paccData.fecha_aprobacion;
            aprobacion_digepres.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            aprobacion_digepres.codigo_plan = paccData.codigo_plan;
            aprobacion_digepres.cantidad = paccData.cantidad;
            aprobacion_digepres.version = paccData.version;
            aprobacion_digepres.estatus = paccData.estatus_nombre;
            aprobacion_digepres.estatus_id = paccData.estatus;
            aprobacion_digepres.fecha_presentacion = paccData.fecha_presentacion;
            aprobacion_digepres.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            aprobacion_digepres.active = paccData.active;
            aprobacion_digepres.compania = paccData.compania;
            aprobacion_digepres.condicion = paccData.condicion;
        }
        await get_pacc_status(aprobacion_digepres, aprobacion_digepres.estatus_id);
        var poaData = await BASEAPI.firstp('poa',{
            order: "desc",
            where: [
                {
                    field: "id",
                    value: aprobacion_digepres.session.poa_id
                }
            ]
        });
        var deptData = await BASEAPI.listp('vw_presupuesto_pacc_dept',{
            limit: 0,
            order: "desc",
            where: [
                {
                    field: "pacc",
                    value: aprobacion_digepres.id
                }
            ]
        });
        if (deptData){
            aprobacion_digepres.presupuesto_departamento = [];
            aprobacion_digepres.presupuesto_total = 0;
            var temp_obj ={};
            for(var i in deptData.data){
                temp_obj ={};
                temp_obj.id = deptData.data[i].id;
                temp_obj.departamento = deptData.data[i].departamento;
                temp_obj.nombre = deptData.data[i].departamento_nombre;
                temp_obj.codigo = deptData.data[i].codigo;
                temp_obj.cantidadtotal = deptData.data[i].cantidadtotal;
                temp_obj.version = deptData.data[i].version;
                temp_obj.presupuesto = LAN.money(deptData.data[i].presupuesto).format(true);
                aprobacion_digepres.presupuesto_departamento.push(temp_obj);
                aprobacion_digepres.presupuesto_total += deptData.data[i].presupuesto;
            }
            aprobacion_digepres.presupuesto_total = LAN.money(aprobacion_digepres.presupuesto_total).format(true);
        }
        aprobacion_digepres.refreshAngular();
    }
    aprobacion_digepres.get_paccData();
    aprobacion_digepres.calculateEqualize = function(){
        setTimeout(function () {
            equlizer('dept')
        },100);
    };
    aprobacion_digepres.show_comment = async function (departamento){
        if (departamento) {
            aprobacion_digepres.pacc_departamento = await BASEAPI.listp('pacc_departamental',{
                limit: 0,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_digepres.id
                    },
                    {
                        field: "departamento",
                        value: departamento
                    }
                ]
            });
            aprobacion_digepres.lista_pacc_d = [];
            for(var i of aprobacion_digepres.pacc_departamento.data) {
                aprobacion_digepres.lista_pacc_d.push(i.id);
            }
            vw_comentarios.headertitle = "Comentarios";
        }else {
            delete aprobacion_digepres.lista_pacc_d;
        }
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
        CRUD_vw_comentarios.table.columns.value2 = {
            sortable: false,
            label: "Estatus",
            format: function (row) {
                switch (row.value2) {
                    case 1: {
                        return "G-AA (Aperturado)";
                    }
                    case 2: {
                        return "G-CD (Etapa de UNIFICACIÓN)";
                    }
                    case 3: {
                        return "G-C1 (Unificación)";
                    }
                    case 4: {
                        return "G-CP (En proceso de Aprobación)";
                    }
                    case 6: {
                        return "G-AP (Autorización de Presupuesto)";
                    }
                    case 7: {
                        return "G-AU (Autorizado por DIGEPRES)";
                    }
                    default : {
                        return "";
                    }
                }
            }
        }
        vw_comentarios.refresh();
    }
    aprobacion_digepres.show_details = async function (departamento,departamento_nombre) {
        if (departamento) {
            aprobacion_digepres.pacc_departamento_c = await BASEAPI.listp('pacc_departamental',{
                limit: 1,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_digepres.id
                    },
                    {
                        field: "departamento",
                        value: departamento
                    }
                ]
            });
            aprobacion_digepres.lista_pacc_c = [];
            for(var i of aprobacion_digepres.pacc_departamento_c.data) {
                aprobacion_digepres.lista_pacc_c.push(i.id);
                aprobacion_digepres.pacc_d_version = i.version;
                aprobacion_digepres.pacc_d_fecha = moment(i.fecha_modificacion).format("DD/MM/YYYY");
            }
            aprobacion_digepres.current_departamento_nombre = departamento_nombre || "";
            aprobacion_digepres.modal.modalView("aprobacion_digepres/formulario_053", {
                width: ENUM.modal.width.full,
                header: {
                    title: "Detalle PACC Departamental",
                    icon: "table"
                },
                footer: {
                    cancelButton: false
                },
                content: {
                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                    sameController: true
                },
            });
        }else {
            console.log(aprobacion_digepres.id);
            aprobacion_digepres.pacc_departamento_c = await BASEAPI.listp('pacc_departamental',{
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_digepres.id
                    }
                ]
            });
            aprobacion_digepres.lista_pacc_c = [];
            for(var i of aprobacion_digepres.pacc_departamento_c.data) {
                aprobacion_digepres.lista_pacc_c.push(i.id);
                aprobacion_digepres.pacc_d_version = i.version;
                aprobacion_digepres.pacc_d_fecha = moment(i.fecha_modificacion).format("DD/MM/YYYY");
            }
            aprobacion_digepres.current_departamento_nombre = aprobacion_digepres.session.institucion || aprobacion_digepres.session.compania;
            aprobacion_digepres.modal.modalView("aprobacion_digepres/formulario_053", {
                width: ENUM.modal.width.full,
                header: {
                    title: "Detalle PACC General",
                    icon: "table"
                },
                footer: {
                    cancelButton: false
                },
                content: {
                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                    sameController: true
                },
            });
        }
    }
    aprobacion_digepres.save_comment = async function(estatus, fromwhere) {
        // console.log(estatus);
        VALIDATION.save(aprobacion_digepres, async function () {
            if (fromwhere === 'before'){
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea devolver el PACC a su estapa de revisión?",
                    confirm: async function () {
                        titulo = `El PACC ha sido devuelto a revisión`;
                        cuerpo = `El PACC ha sido devuelto por la DIGEPRES. Proceder a leer las observacones y tomar las acciones de lugar.`
                        function_send_email_custom_group(titulo,cuerpo,titulo,cuerpo, aprobacion_digepres.session.compania_id, aprobacion_digepres.session.institucion_id, 13, [4,12]);
                        BASEAPI.insert('comentarios', {
                            "comentario": aprobacion_digepres.comentario,
                            "type": 15,
                            "created_by": aprobacion_digepres.session.usuario_id,
                            "value": aprobacion_digepres.id,
                            "value2": estatus
                        }, function () {});
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            fecha_aprobacion: "$null",
                            where: [
                                {
                                    field: "id",
                                    value: aprobacion_digepres.id
                                }
                            ]
                        }, function (result) {
                            location.reload();
                        });
                    }
                });
            }else if (fromwhere === 'next' ) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea Autorizar el PACC?",
                    confirm: async function () {
                        titulo = `El PACC ha sido APROBADO por la DIGEPRES.`;
                        cuerpo = `El PACC ha sido APROBADO por la DIGEPRES`
                        function_send_email_custom_group(titulo,cuerpo,titulo,cuerpo, aprobacion_digepres.session.compania_id, aprobacion_digepres.session.institucion_id, 15, [4,12,15]);
                        BASEAPI.insert('comentarios', {
                            "comentario": aprobacion_digepres.comentario,
                            "type": 15,
                            "created_by": aprobacion_digepres.session.usuario_id,
                            "value": aprobacion_digepres.id,
                            "value2": estatus
                        }, function () {});
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            fecha_aprobacion: "$now()",
                            where: [
                                {
                                    field: "id",
                                    value: aprobacion_digepres.id
                                }
                            ]
                        }, function (result) {
                            location.reload();
                        });
                    }
                });
            }
        }, ["comentario"]);
    };
    aprobacion_digepres.get_form_069 = async function(pacc_dept){
        aprobacion_digepres.form_069_data = [];
        if (pacc_dept){
            var pacc_dept_header = await BASEAPI.listp('vw_pacc_departamental_detail',{
                limit:0,
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
            var pacc_dept_pres = await BASEAPI.listp('vw_presupuesto_pacc_dept',{
                where: [
                    {
                        field: "id",
                        value: pacc_dept
                    }
                ]
            });
        }else{
            var pacc_dept_header = await BASEAPI.listp('vw_pacc_departamental_detail',{
                limit:0,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_digepres.id
                    },
                    {
                        field: "deleted",
                        value: 0
                    }
                ]
            });
            var pacc_dept_pres = await BASEAPI.listp('vw_presupuesto_pacc_dept',{
                where: [
                    {
                        field: "pacc",
                        value:  aprobacion_digepres.id
                    }
                ]
            });
        }
        if (pacc_dept_header.data){
            var header = {};
            var count = 0;
            aprobacion_digepres.full_cant = pacc_dept_header.data.length;
            for(var i of aprobacion_digepres.periodopoas){
                header = {};
                header[`periodo`] = i;
                aprobacion_digepres.form_069_data[count] = {
                    header:  header,
                    body: pacc_dept_header.data.filter(d => {
                        return d[`periodo_${i}`] != null;
                    })
                }
                count++
            }
        }
        aprobacion_digepres.unidad_medida_list = await BASEAPI.listp('unidad_medida', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value:  aprobacion_digepres.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  "=",
                    "value":  aprobacion_digepres.session.institucion_id ?  aprobacion_digepres.session.institucion_id : "null"
                },
            ],
            orderby: "id",
            order: "asc"
        });
        if (aprobacion_digepres.unidad_medida_list ){
            for (var i of aprobacion_digepres.form_069_data){
                for (var j of i.body){
                    j.costo_total = LAN.money(j.costo_total).format(false);
                    for (var k of aprobacion_digepres.unidad_medida_list.data ){
                        if (j.unidad == k.id){
                            j.unidad = k.nombre;
                        }
                    }
                }
            }
        }
        if (pacc_dept_pres){
            aprobacion_digepres.full_press = 0;
            for (var i of pacc_dept_pres.data){
                aprobacion_digepres.full_press += i.presupuesto;
            }
            aprobacion_digepres.full_press = LAN.money(aprobacion_digepres.full_press).format(true)
        }
        aprobacion_digepres.fecha_aprobacion_069 = LAN.datetime(aprobacion_digepres.fecha_aprobacion);
    };
    aprobacion_digepres.exportPDF = function () {
        $("#form_069pdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    aprobacion_digepres.open_export = async function (PaccDept){
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        if (PaccDept){
            aprobacion_digepres.current_PDept = PaccDept.id;
            aprobacion_digepres.name_PDept = PaccDept.nombre;
            aprobacion_digepres.code_PDept = PaccDept.codigo;
            aprobacion_digepres.cant_PDept = PaccDept.cantidadtotal + "";
            aprobacion_digepres.ver_PDept = PaccDept.version;
        }else{
            aprobacion_digepres.current_PDept = null;
            aprobacion_digepres.name_PDept = null;
            aprobacion_digepres.code_PDept = null;
            aprobacion_digepres.cant_PDept = null;
            aprobacion_digepres.ver_PDept = null;
        }
        await aprobacion_digepres.get_form_069(aprobacion_digepres.current_PDept);
        aprobacion_digepres.modal.modalView("aprobacion_digepres/form_069", {
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
                    end: function() {
                        SWEETALERT.stop();
                    }
                }
            }
        });
    };
});
