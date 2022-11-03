app.controller("aprobacion_mae", function ($scope, $http, $compile) {
    aprobacion_mae = this;
    //aprobacion_mae.fixFilters = [];
    //aprobacion_mae.singular = "singular";
    //aprobacion_mae.plural = "plural";
    aprobacion_mae.headertitle = "Aprobación MAE";
    aprobacion_mae.destroyForm = false;
    aprobacion_mae.lan = LAN;
    //aprobacion_mae.permissionTable = "tabletopermission";
    aprobacion_mae.session = new SESSION().current();
    aprobacion_mae.monitoreo_nombre = aprobacion_mae.session.monitoreo_nombre;
    aprobacion_mae.monitoreo_nombre = "Trimestre";
    aprobacion_mae.periodopoa = aprobacion_mae.session.cantidad;
    aprobacion_mae.periodopoa = 4;
    aprobacion_mae.periodopoas = [];
    for (var i = 1; i <= aprobacion_mae.periodopoa; i++) {
        aprobacion_mae.periodopoas.push(i);
    }
    RUNCONTROLLER("aprobacion_mae", aprobacion_mae, $scope, $http, $compile);
    RUN_B("aprobacion_mae", aprobacion_mae, $scope, $http, $compile);
    if (typeof aprobacion_digepres !== 'undefined') {
        if (typeof aprobacion_digepres !== 'not defined') {
            if (aprobacion_digepres) {
               aprobacion_digepres = null;
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
    $scope.$watch("aprobacion_mae.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.yariel.maliciousCode(value));
        VALIDATION.validate(aprobacion_mae, 'comentario', rules);
    });
    aprobacion_mae.formulary = function (data, mode, defaultData) {
        if (aprobacion_mae !== undefined) {
            aprobacion_mae.form.modalWidth = ENUM.modal.width.full;
            aprobacion_mae.form.readonly = {};
            aprobacion_mae.createForm(data, mode, defaultData);

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
    aprobacion_mae.get_paccData = async function () {
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
                    value: aprobacion_mae.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": aprobacion_mae.session.institucion_id ? "=" : "is",
                    "value":  aprobacion_mae.session.institucion_id ?  aprobacion_mae.session.institucion_id : "$null"
                }
            ]
        });
        if (paccData){
            aprobacion_mae.id = paccData.id;
            aprobacion_mae.nombre = paccData.nombre;
            aprobacion_mae.empresa = aprobacion_mae.session.compania;
            aprobacion_mae.descripcion = paccData.descripcion;
            aprobacion_mae.capitulo = paccData.capitulo;
            aprobacion_mae.sub_capitulo = paccData.subcapitulo;
            aprobacion_mae.unidad = paccData.unidad;
            aprobacion_mae.unidad_compra = paccData.unidad_compra;
            aprobacion_mae.sigla = paccData.codigo;
            aprobacion_mae.ano_planificacion_view = paccData.año;
            aprobacion_mae.fecha_revision = paccData.fecha_revision;
            aprobacion_mae.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            aprobacion_mae.fecha_aprobacion = paccData.fecha_aprobacion;
            aprobacion_mae.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            aprobacion_mae.codigo_plan = paccData.codigo_plan;
            aprobacion_mae.cantidad = paccData.cantidad;
            aprobacion_mae.version = paccData.version;
            aprobacion_mae.estatus = paccData.estatus_nombre;
            aprobacion_mae.estatus_id = paccData.estatus;
            aprobacion_mae.fecha_presentacion = paccData.fecha_presentacion;
            aprobacion_mae.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            aprobacion_mae.active = paccData.active;
            aprobacion_mae.compania = paccData.compania;
            aprobacion_mae.condicion = paccData.condicion;
        }
        await get_pacc_status(aprobacion_mae, aprobacion_mae.estatus_id);
        var poaData = await BASEAPI.firstp('poa',{
            order: "desc",
            where: [
                {
                    field: "id",
                    value: aprobacion_mae.session.poa_id
                }
            ]
        });
        var deptData = await BASEAPI.listp('vw_presupuesto_pacc_dept',{
            limit: 0,
            order: "desc",
            where: [
                {
                    field: "pacc",
                    value: aprobacion_mae.id
                }
            ]
        });
        if (deptData){
            aprobacion_mae.presupuesto_departamento = [];
            aprobacion_mae.presupuesto_total = 0;
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
                    aprobacion_mae.presupuesto_departamento.push(temp_obj);
                    aprobacion_mae.presupuesto_total += deptData.data[i].presupuesto;
                }
            aprobacion_mae.presupuesto_total = LAN.money(aprobacion_mae.presupuesto_total).format(true);
        }
        aprobacion_mae.refreshAngular();
    }
    aprobacion_mae.get_paccData();
    aprobacion_mae.calculateEqualize = function(){
        setTimeout(function () {
            equlizer('dept')
        },100);
    };
    aprobacion_mae.show_comment = async function (departamento){
        if (departamento) {
            aprobacion_mae.pacc_departamento = await BASEAPI.listp('pacc_departamental',{
                limit: 0,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_mae.id
                    },
                    {
                        field: "departamento",
                        value: departamento
                    }
                ]
            });
            aprobacion_mae.lista_pacc_d = [];
            for(var i of aprobacion_mae.pacc_departamento.data) {
                aprobacion_mae.lista_pacc_d.push(i.id);
            }
            vw_comentarios.headertitle = "Comentarios";
        }else {
            delete aprobacion_mae.lista_pacc_d;
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
    };
    aprobacion_mae.show_details = async function (departamento,departamento_nombre) {
        if (departamento) {
            aprobacion_mae.pacc_departamento_c = await BASEAPI.listp('pacc_departamental',{
                limit: 1,
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_mae.id
                    },
                    {
                        field: "departamento",
                        value: departamento
                    }
                ]
            });
            aprobacion_mae.lista_pacc_c = [];
            for(var i of aprobacion_mae.pacc_departamento_c.data) {
                aprobacion_mae.lista_pacc_c.push(i.id);
                aprobacion_mae.pacc_d_version = i.version;
                aprobacion_mae.pacc_d_fecha = moment(i.fecha_modificacion).format("DD/MM/YYYY");
            }
            aprobacion_mae.current_departamento_nombre = departamento_nombre || "";
            aprobacion_mae.modal.modalView("aprobacion_mae/formulario_053", {
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
            aprobacion_mae.pacc_departamento_c = await BASEAPI.listp('pacc_departamental',{
                where: [
                    {
                        field: "pacc",
                        value: aprobacion_mae.id
                    }
                ]
            });
            aprobacion_mae.lista_pacc_c = [];
            for(var i of aprobacion_mae.pacc_departamento_c.data) {
                aprobacion_mae.lista_pacc_c.push(i.id);
                aprobacion_mae.pacc_d_version = i.version;
                aprobacion_mae.pacc_d_fecha = moment(i.fecha_modificacion).format("DD/MM/YYYY");
            }
            aprobacion_mae.current_departamento_nombre = aprobacion_mae.session.institucion || aprobacion_mae.session.compania;
            aprobacion_mae.modal.modalView("aprobacion_mae/formulario_053", {
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
    };
    aprobacion_mae.save_comment = async function(estatus, fromWhere) {
        VALIDATION.save(aprobacion_mae, async function () {
            if (fromWhere === 'before'){
                SWEETALERT.confirm({
                    type: "warning",
                    message: "¿Desea devolver el PACC a su estapa de revisión?",
                    confirm: async function () {
                        titulo = `El PACC ha sido devuelto por el MAE.`;
                        cuerpo = `El PACC ha sido devuelto por el MAE. Proceder a leer las observacones y tomar las acciones de lugar.`
                        function_send_email_custom_group(titulo,cuerpo,titulo,cuerpo, aprobacion_mae.session.compania_id, aprobacion_mae.session.institucion_id, [4,12]);
                        BASEAPI.insert('comentarios', {
                            "comentario": aprobacion_mae.comentario,
                            "type": 15,
                            "created_by": aprobacion_mae.session.usuario_id,
                            "value": aprobacion_mae.id,
                            "value2": estatus
                        }, function () {});
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            fecha_presentacion: "$null",
                            where: [
                                {
                                    field: "id",
                                    value: aprobacion_mae.id
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
                    message: "¿Desea Autorizar el PACC?",
                    confirm: async function () {
                        titulo = `El PACC ha sido APROBADO por el MAE.`;
                        cuerpo = ` El PACC ha sido APROBADO por el MAE.`
                        function_send_email_custom_group(titulo,cuerpo,titulo,cuerpo, aprobacion_mae.session.compania_id, aprobacion_mae.session.institucion_id, 14, [4,12]);
                        BASEAPI.insert('comentarios', {
                            "comentario": aprobacion_mae.comentario,
                            "type": 15,
                            "created_by": aprobacion_mae.session.usuario_id,
                            "value": aprobacion_mae.id,
                            "value2": estatus
                        }, function () {});
                        BASEAPI.updateall('pacc', {
                            estatus: estatus,
                            fecha_presentacion: "$now()",
                            where: [
                                {
                                    field: "id",
                                    value: aprobacion_mae.id
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
    aprobacion_mae.get_form_069 = async function(pacc_dept){
        aprobacion_mae.form_069_data = [];
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
                        value: aprobacion_mae.id
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
                        value:  aprobacion_mae.id
                    }
                ]
            });
        }
        if (pacc_dept_header.data){
            var header = {};
            var count = 0;
            aprobacion_mae.full_cant = pacc_dept_header.data.length;
            for(var i of aprobacion_mae.periodopoas){
                header = {};
                header[`periodo`] = i;
                aprobacion_mae.form_069_data[count] = {
                    header:  header,
                    body: pacc_dept_header.data.filter(d => {
                        return d[`periodo_${i}`] != null;
                    })
                }
                count++
            }
        }
        aprobacion_mae.unidad_medida_list = await BASEAPI.listp('unidad_medida', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value:  aprobacion_mae.session.compania_id
                },
                {
                  field: "active",
                  value: 1
                },
                {
                    "field": "institucion",
                    "operator":  "=",
                    "value":  aprobacion_mae.session.institucion_id ?  aprobacion_mae.session.institucion_id : "null"
                },
            ],
            orderby: "id",
            order: "asc"
        });
        if (aprobacion_mae.unidad_medida_list ){
            for (var i of aprobacion_mae.form_069_data){
                for (var j of i.body){
                    j.costo_total = LAN.money(j.costo_total).format(false);
                    for (var k of aprobacion_mae.unidad_medida_list.data ){
                        if (j.unidad == k.id){
                            j.unidad = k.nombre;
                        }
                    }
                }
            }
        }


        if (pacc_dept_pres){
            aprobacion_mae.full_press = 0;
            for (var i of pacc_dept_pres.data){
                aprobacion_mae.full_press += i.presupuesto;
            }
            aprobacion_mae.full_press = LAN.money(aprobacion_mae.full_press).format(true)
        }
        aprobacion_mae.fecha_aprobacion_069 = LAN.datetime(aprobacion_mae.fecha_aprobacion);
    };
    aprobacion_mae.exportPDF = function () {
        $("#form_069pdf").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node="+new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };
    aprobacion_mae.open_export = async function (PaccDept){
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        if (PaccDept){
            aprobacion_mae.current_PDept = PaccDept.id;
            aprobacion_mae.name_PDept = PaccDept.nombre;
            aprobacion_mae.code_PDept = PaccDept.codigo;
            aprobacion_mae.cant_PDept = PaccDept.cantidadtotal + "";
            aprobacion_mae.ver_PDept = PaccDept.version;
        }else{
            aprobacion_mae.current_PDept = null;
            aprobacion_mae.name_PDept = null;
            aprobacion_mae.code_PDept = null;
            aprobacion_mae.cant_PDept = null;
            aprobacion_mae.ver_PDept = null;
        }
        await aprobacion_mae.get_form_069(aprobacion_mae.current_PDept);
        aprobacion_mae.modal.modalView("aprobacion_mae/form_069", {
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
