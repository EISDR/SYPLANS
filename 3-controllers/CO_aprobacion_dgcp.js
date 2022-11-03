app.controller("aprobacion_dgcp", function ($scope, $http, $compile) {
    aprobacion_dgcp = this;
    //aprobacion_dgcp.fixFilters = [];
    //aprobacion_dgcp.singular = "singular";
    //aprobacion_dgcp.plural = "plural";
    aprobacion_dgcp.headertitle = "Aprobación DGCP";
    aprobacion_dgcp.destroyForm = false;
    aprobacion_dgcp.lan = LAN;
    //aprobacion_dgcp.permissionTable = "tabletopermission";
    aprobacion_dgcp.session = new SESSION().current();
    aprobacion_dgcp.monitoreo_nombre = aprobacion_dgcp.session.monitoreo_nombre;
    aprobacion_dgcp.monitoreo_nombre = "Trimestre";
    aprobacion_dgcp.periodopoa = aprobacion_dgcp.session.cantidad;
    aprobacion_dgcp.periodopoa = 4;
    aprobacion_dgcp.periodopoas = [];
    for (var i = 1; i <= aprobacion_dgcp.periodopoa; i++) {
        aprobacion_dgcp.periodopoas.push(i);
    }
    RUNCONTROLLER("aprobacion_dgcp", aprobacion_dgcp, $scope, $http, $compile);
    RUN_B("aprobacion_dgcp", aprobacion_dgcp, $scope, $http, $compile);
    if (typeof aprobacion_mae !== 'undefined') {
        if (typeof aprobacion_mae !== 'not defined') {
            if (aprobacion_mae) {
                aprobacion_mae = null;
            }
        }
    }
    if (typeof aprobacion_digepres !== 'undefined') {
        if (typeof aprobacion_digepres !== 'not defined') {
            if (aprobacion_digepres) {
                aprobacion_digepres = null;
            }
        }
    }
    $scope.$watch("aprobacion_dgcp.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(aprobacion_dgcp, 'comentario', rules);
    });
    aprobacion_dgcp.formulary = function (data, mode, defaultData) {
        if (aprobacion_dgcp !== undefined) {
            aprobacion_dgcp.form.modalWidth = ENUM.modal.width.full;
            aprobacion_dgcp.form.readonly = {};
            aprobacion_dgcp.createForm(data, mode, defaultData);
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
    aprobacion_dgcp.get_paccData = async function () {
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
                    value: aprobacion_dgcp.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": aprobacion_dgcp.session.institucion_id ? "=" : "is",
                    "value":  aprobacion_dgcp.session.institucion_id ?  aprobacion_dgcp.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData){
            aprobacion_dgcp.id = paccData.id;
            aprobacion_dgcp.nombre = paccData.nombre;
            aprobacion_dgcp.empresa = aprobacion_dgcp.session.compania;
            aprobacion_dgcp.descripcion = paccData.descripcion;
            aprobacion_dgcp.capitulo = paccData.capitulo;
            aprobacion_dgcp.sub_capitulo = paccData.subcapitulo;
            aprobacion_dgcp.unidad = paccData.unidad;
            aprobacion_dgcp.unidad_compra = paccData.unidad_compra;
            aprobacion_dgcp.sigla = paccData.codigo;
            aprobacion_dgcp.ano_planificacion_view = paccData.año;
            aprobacion_dgcp.fecha_revision = paccData.fecha_revision;
            aprobacion_dgcp.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            aprobacion_dgcp.fecha_aprobacion = paccData.fecha_aprobacion;
            aprobacion_dgcp.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            aprobacion_dgcp.codigo_plan = paccData.codigo_plan;
            aprobacion_dgcp.cantidad = paccData.cantidad;
            aprobacion_dgcp.version = paccData.version;
            aprobacion_dgcp.estatus = paccData.estatus_nombre;
            aprobacion_dgcp.estatus_id = paccData.estatus;
            aprobacion_dgcp.fecha_presentacion = paccData.fecha_presentacion;
            aprobacion_dgcp.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            aprobacion_dgcp.active = paccData.active;
            aprobacion_dgcp.compania = paccData.compania;
            aprobacion_dgcp.condicion = paccData.condicion;
        }
        await get_pacc_status(aprobacion_dgcp, aprobacion_dgcp.estatus_id);
        var poaData = await BASEAPI.firstp('poa',{
            order: "desc",
            where: [
                {
                    field: "id",
                    value: aprobacion_dgcp.session.poa_id
                }
            ]
        });
        var deptData = await BASEAPI.listp('vw_presupuesto_pacc_dept',{
            limit: 0,
            order: "desc",
            where: [
                {
                    field: "pacc",
                    value: aprobacion_dgcp.id
                }
            ]
        });
        if (deptData){
            aprobacion_dgcp.presupuesto_departamento = [];
            aprobacion_dgcp.presupuesto_total = 0;
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
                aprobacion_dgcp.presupuesto_departamento.push(temp_obj);
                aprobacion_dgcp.presupuesto_total += deptData.data[i].presupuesto;
            }
            aprobacion_dgcp.presupuesto_total = LAN.money(aprobacion_dgcp.presupuesto_total).format(true);
        }
        aprobacion_dgcp.refreshAngular();
    }
    aprobacion_dgcp.get_paccData();
    aprobacion_dgcp.calculateEqualize = function(){
        setTimeout(function () {
            equlizer('dept')
        },100);
    };
    aprobacion_dgcp.show_comment = async function (departamento){
        if (departamento) {
            aprobacion_dgcp.pacc_departamento = await BASEAPI.listp('pacc_departamental',{
                limit: 0,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_dgcp.id
                    },
                    {
                        field: "departamento",
                        value: departamento
                    }
                ]
            });
            aprobacion_dgcp.lista_pacc_d = [];
            for(var i of aprobacion_dgcp.pacc_departamento.data) {
                aprobacion_dgcp.lista_pacc_d.push(i.id);
            }
            vw_comentarios.headertitle = "Comentarios";
        }else {
            delete aprobacion_dgcp.lista_pacc_d;
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
    aprobacion_dgcp.show_details = async function (departamento,departamento_nombre) {
        if (departamento) {
            aprobacion_dgcp.pacc_departamento_c = await BASEAPI.listp('pacc_departamental',{
                limit: 1,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_dgcp.id
                    },
                    {
                        field: "departamento",
                        value: departamento
                    }
                ]
            });
            aprobacion_dgcp.lista_pacc_c = [];
            for(var i of aprobacion_dgcp.pacc_departamento_c.data) {
                aprobacion_dgcp.lista_pacc_c.push(i.id);
                aprobacion_dgcp.pacc_d_version = i.version;
                aprobacion_dgcp.pacc_d_fecha = moment(i.fecha_modificacion).format("DD/MM/YYYY");
            }
            aprobacion_dgcp.current_departamento_nombre = departamento_nombre || "";
            aprobacion_dgcp.modal.modalView("aprobacion_dgcp/formulario_053", {
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
            aprobacion_dgcp.pacc_departamento_c = await BASEAPI.listp('pacc_departamental',{
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_dgcp.id
                    }
                ]
            });
            aprobacion_dgcp.lista_pacc_c = [];
            for(var i of aprobacion_dgcp.pacc_departamento_c.data) {
                aprobacion_dgcp.lista_pacc_c.push(i.id);
                aprobacion_dgcp.pacc_d_version = i.version;
                aprobacion_dgcp.pacc_d_fecha = moment(i.fecha_modificacion).format("DD/MM/YYYY");
            }
            aprobacion_dgcp.current_departamento_nombre = aprobacion_dgcp.session.institucion || aprobacion_dgcp.session.compania;
            aprobacion_dgcp.modal.modalView("aprobacion_dgcp/formulario_053", {
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
    aprobacion_dgcp.save_comment = async function(estatus, fromWhere) {
        VALIDATION.save(aprobacion_dgcp, async function () {
            if (fromWhere === 'before'){
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea devolver el PACC a su estapa de revisión?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": aprobacion_dgcp.comentario,
                            "type": 15,
                            "created_by": aprobacion_dgcp.session.usuario_id,
                            "value": aprobacion_dgcp.id,
                            "value2": estatus
                        }, function () {});
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            where: [
                                {
                                    field: "id",
                                    value: aprobacion_dgcp.id
                                }
                            ]
                        }, function (result) {
                            location.reload();
                        });
                    }
                });
            }else if (fromWhere === 'next' ) {
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea enviar el PACC a seguimiento?",
                    confirm: async function () {
                        BASEAPI.insert('comentarios', {
                            "comentario": aprobacion_dgcp.comentario,
                            "type": 15,
                            "created_by": aprobacion_dgcp.session.usuario_id,
                            "value": aprobacion_dgcp.id,
                            "value2": estatus
                        }, function () {});
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            where: [
                                {
                                    field: "id",
                                    value: aprobacion_dgcp.id
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
    aprobacion_dgcp.get_form_069 = async function(pacc_dept){
        aprobacion_dgcp.form_069_data = [];
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
                        value: aprobacion_dgcp.id
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
                        value:  aprobacion_dgcp.id
                    }
                ]
            });
        }
        if (pacc_dept_header.data){
            var header = {};
            var count = 0;
            aprobacion_dgcp.full_cant = pacc_dept_header.data.length;
            for(var i of aprobacion_dgcp.periodopoas){
                header = {};
                header[`periodo`] = i;
                aprobacion_dgcp.form_069_data[count] = {
                    header:  header,
                    body: pacc_dept_header.data.filter(d => {
                        return d[`periodo_${i}`] != null;
                    })
                }
                count++
            }
        }
        aprobacion_dgcp.unidad_medida_list = await BASEAPI.listp('unidad_medida', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value:  aprobacion_dgcp.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  "=",
                    "value":  aprobacion_dgcp.session.institucion_id ?  aprobacion_dgcp.session.institucion_id : "null"
                },
            ],
            orderby: "id",
            order: "asc"
        });
        if (aprobacion_dgcp.unidad_medida_list ){
            for (var i of aprobacion_dgcp.form_069_data){
                for (var j of i.body){
                    j.costo_total = LAN.money(j.costo_total).format(false);
                    for (var k of aprobacion_dgcp.unidad_medida_list.data ){
                        if (j.unidad == k.id){
                            j.unidad = k.nombre;
                        }
                    }
                }
            }
        }
        if (pacc_dept_pres){
            aprobacion_dgcp.full_press = 0;
            for (var i of pacc_dept_pres.data){
                aprobacion_dgcp.full_press += i.presupuesto;
            }
            aprobacion_dgcp.full_press = LAN.money(aprobacion_dgcp.full_press).format(true)
        }
        aprobacion_dgcp.fecha_aprobacion_069 = LAN.datetime(aprobacion_dgcp.fecha_aprobacion);
    };
    aprobacion_dgcp.exportPDF = function () {
        $("#form_069pdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    aprobacion_dgcp.open_export = async function (PaccDept){
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        if (PaccDept){
            aprobacion_dgcp.current_PDept = PaccDept.id;
            aprobacion_dgcp.name_PDept = PaccDept.nombre;
            aprobacion_dgcp.code_PDept = PaccDept.codigo;
            aprobacion_dgcp.cant_PDept = PaccDept.cantidadtotal + "";
            aprobacion_dgcp.ver_PDept = PaccDept.version;
        }else{
            aprobacion_dgcp.current_PDept = null;
            aprobacion_dgcp.name_PDept = null;
            aprobacion_dgcp.code_PDept = null;
            aprobacion_dgcp.cant_PDept = null;
            aprobacion_dgcp.ver_PDept = null;
        }
        await aprobacion_dgcp.get_form_069(aprobacion_dgcp.current_PDept);
        aprobacion_dgcp.modal.modalView("aprobacion_dgcp/form_069", {
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
