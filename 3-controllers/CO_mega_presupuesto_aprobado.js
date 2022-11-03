app.controller("mega_presupuesto_aprobado", function ($scope, $http, $compile) {
    mega_presupuesto_aprobado = this;
    var session = new SESSION().current();
    mega_presupuesto_aprobado.headertitle = 'Presupuesto';
    mega_presupuesto_aprobado.singular = 'Presupuesto Aprobado';
    mega_presupuesto_aprobado.plural = 'Presupuesto Aprobado';
    mega_presupuesto_aprobado.titulo = '';
    mega_presupuesto_aprobado.id_Presupuesto = '';
    mega_presupuesto_aprobado.estatus_departamento_inicial = '';
    mega_presupuesto_aprobado.session = session;
    mega_presupuesto_aprobado.director_general = ENUM_2.Grupos.director_general;
    mega_presupuesto_aprobado.permitir = session.groups[0] ? session.groups[0].caracteristica : '';

    RUNCONTROLLER("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
    // diomedes begin actualizacion del codigo para poner funcional desde otro controlador
    if (typeof presupuesto_aprobado != 'undefined') {
        if (typeof presupuesto_aprobado != 'not define'){
            if (presupuesto_aprobado){
                mega_presupuesto_aprobado.VALUES = {
                    idDepto: "" + presupuesto_aprobado.idDepto,
                    idStatus: "" + presupuesto_aprobado.idStatus,
                    idPresupuesto: presupuesto_aprobado.idPresupuesto,
                    nombreDepto: presupuesto_aprobado.departamento
                };
                mega_presupuesto_aprobado.estatus_departamento = mega_presupuesto_aprobado.VALUES.idStatus;
                mega_presupuesto_aprobado.id_Presupuesto = mega_presupuesto_aprobado.VALUES.idPresupuesto;
                mega_presupuesto_aprobado.departamento = {};
                mega_presupuesto_aprobado.departamento = {};
                mega_presupuesto_aprobado.departamento = {
                    id: presupuesto_aprobado.idDepto,
                    nombre: presupuesto_aprobado.departamento,
                }
                mega_presupuesto_aprobado.titulo = mega_presupuesto_aprobado.departamento.nombre;
                mega_presupuesto_aprobado.formulary = function (data, mode, defaultData) {
                    if (typeof mega_presupuesto_aprobado !== 'undefined'){
                        RUN_B("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
                        mega_presupuesto_aprobado.form.titles = {
                            new: `<i class="icon-design"></i>`  + ' Presupuestos'
                        };
                        mega_presupuesto_aprobado.form.modalIcon = {
                            icon: 'design'
                        };
                        mega_presupuesto_aprobado.form.readonly = {};
                        mega_presupuesto_aprobado.createForm(data, mode, defaultData);
                    }

                };
            }
        } else {
            RUN_B("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
        }
    } else {
        RUN_B("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
    }
    //
    if (typeof departamento_poa != 'undefined') {
        if (typeof departamento_poa != 'not define'){
            if (departamento_poa){
                mega_presupuesto_aprobado.VALUES = {
                    idDepto: "" + departamento_poa.idDepto,
                    idStatus: "" + departamento_poa.idStatus,
                    idPresupuesto: departamento_poa.idPresupuesto,
                    nombreDepto: departamento_poa.departamento
                };
                mega_presupuesto_aprobado.estatus_departamento = mega_presupuesto_aprobado.VALUES.idStatus;
                mega_presupuesto_aprobado.id_Presupuesto = mega_presupuesto_aprobado.VALUES.idPresupuesto;
                mega_presupuesto_aprobado.departamento = {};
                mega_presupuesto_aprobado.departamento = {
                    id: departamento_poa.idDepto,
                    nombre: departamento_poa.departamento
                }
                mega_presupuesto_aprobado.titulo = mega_presupuesto_aprobado.departamento.nombre;
                mega_presupuesto_aprobado.formulary = function (data, mode, defaultData) {
                    if (typeof mega_presupuesto_aprobado !== 'undefined'){
                        RUN_B("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
                        mega_presupuesto_aprobado.form.titles = {
                            new: `<i class="icon-design"></i>`  + ' Presupuestos'
                        };
                        mega_presupuesto_aprobado.form.modalIcon = {
                            icon: 'design'
                        };
                        mega_presupuesto_aprobado.form.readonly = {};
                        mega_presupuesto_aprobado.createForm(data, mode, defaultData);
                    }

                };
            }
        } else {
            RUN_B("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
        }
    } else {
        RUN_B("mega_presupuesto_aprobado", mega_presupuesto_aprobado, $scope, $http, $compile);
    }
    // end
    mega_presupuesto_aprobado.triggers.table.after.load = function (records) {
        CRUD_productos_poa.table.options = [{
            text: (data) => { return ''; },
            title: (data) => { return ''; },
            icon: (data) => { return ''; },
            show: (data) => { return true; },
            permission: (data) => { return false; },
            characterist: (data) => { return false; },
            menus:[]
        }];
        CRUD_vw_actividades_poa.table.options = [{
            text: (data) => { return ''; },
            title: (data) => { return ''; },
            icon: (data) => { return ''; },
            show: (data) => { return true; },
            permission: (data) => { return false; },
            characterist: (data) => { return false; },
            menus:[]
        }];
        $('#productos_poa .icon-plus-circle2 ').parent().hide();
        $('#actividades_poa .icon-plus-circle2 ').parent().hide();
    };
    mega_presupuesto_aprobado.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "0"
        }
    ];
    mega_presupuesto_aprobado.oneTime = false;
    mega_presupuesto_aprobado.triggers.table.after.control = function (data) {
        if (data === 'estatus_departamento') {
            if (!mega_presupuesto_aprobado.oneTime) {
                mega_presupuesto_aprobado.estatus_departamento = mega_presupuesto_aprobado.VALUES.idStatus;
                mega_presupuesto_aprobado.estatus_departamento_inicial = mega_presupuesto_aprobado.VALUES.idStatus;

                mega_presupuesto_aprobado.form.loadDropDown('estatus_departamento');
                mega_presupuesto_aprobado.oneTime = true;
                // if (["3", "1"].indexOf(mega_presupuesto_aprobado.VALUES.idStatus.toString()) !== -1) {
                //     mega_presupuesto_aprobado.form.options.estatus_departamento.disabled = true;
                // }
                mega_presupuesto_aprobado.poa_activo();
            }
        }
    };
    mega_presupuesto_aprobado.filter_mega_presupuesto_aprobado = () => new Promise(async (resolve, reject) => {
        mega_presupuesto_aprobado.fixFilters = [];
        mega_presupuesto_aprobado.fixFilters.push({
            "field": "poa",
            "operator": "=",
            "value": filtros_poa.poa
        });
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            var id_presupuesto_ejes = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_eje_estrategico",
                    operator: "=",
                    value: filtros_pei.eje_estrategico_pei
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    console.log(res.data[i].id_departamento);
                    id_presupuesto_ejes.push(res.data[i].id_departamento);
                }
            });
            mega_presupuesto_aprobado.fixFilters.push(
                {
                    field: 'departamento_id',
                    value: id_presupuesto_ejes
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            var id_presupuesto_objetivos = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_objetivo_estrategico",
                    operator: "=",
                    value: filtros_pei.objetivo_estrategico_pei
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    console.log(res.data[i].id_departamento);
                    id_presupuesto_objetivos.push(res.data[i].id_departamento);
                }
            });
            mega_presupuesto_aprobado.fixFilters.push(
                {
                    field: 'departamento_id',
                    value: id_presupuesto_objetivos
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            var id_presupuesto_estrategia = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_estrategia",
                    operator: "=",
                    value: filtros_pei.estrategia_pei
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    console.log(res.data[i].id_departamento);
                    id_presupuesto_estrategia.push(res.data[i].id_departamento);
                }
            });
            mega_presupuesto_aprobado.fixFilters.push(
                {
                    field: 'departamento_id',
                    value: id_presupuesto_estrategia
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            var id_presupuesto_resultado = [];
            await BASEAPI.listp("vw_productos_poa_detalles_mega", {
                where:[{
                    field:"id_resultado",
                    operator: "=",
                    value: filtros_pei.resultado_pei
                }]
            }).then( function (res) {
                for (var i in res.data ){
                    console.log(res.data[i].id_departamento);
                    id_presupuesto_resultado.push(res.data[i].id_departamento);
                }
            });
            mega_presupuesto_aprobado.fixFilters.push(
                {
                    field: 'departamento_id',
                    value: id_presupuesto_resultado
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            mega_presupuesto_aprobado.fixFilters.push(
                {
                    field: 'departamento_id',
                    operator: '=',
                    value: filtros_poa.departamento
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            var vw_mega_presupuesto_aprobado = await BASEAPI.firstp("productos_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.productos_poa
                }]
            });
            if (vw_mega_presupuesto_aprobado) {
                mega_presupuesto_aprobado.fixFilters.push(
                    {
                        field: 'departamento_id',
                        operator: '=',
                        value: vw_mega_presupuesto_aprobado.departamento
                    }
                );
            }
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            var vw_mega_actividades_poa = await BASEAPI.firstp("vw_actividades_poa", {
                where: [{
                    field: "id",
                    operator: "=",
                    value: filtros_poa.actividades_poa
                }]
            });
            if (vw_mega_actividades_poa) {
                mega_presupuesto_aprobado.fixFilters.push(
                    {
                        field: 'departamento_id',
                        operator: '=',
                        value: vw_mega_actividades_poa.departamento
                    }
                );
            }
        }
        resolve(1);
    });
    mega_presupuesto_aprobado.open_modal = async function (idDepto, idStatus, idPresupuesto) {
        mega_presupuesto_aprobado.VALUES = {
            idDepto: "" + idDepto,
            idStatus: "" + idStatus,
            idPresupuesto: idPresupuesto
        };


        mega_presupuesto_aprobado.estatus_departamento = mega_presupuesto_aprobado.VALUES.idStatus;
        mega_presupuesto_aprobado.estatus_departamento_inicial = mega_presupuesto_aprobado.VALUES.idStatus;
        mega_presupuesto_aprobado.id_Presupuesto = mega_presupuesto_aprobado.VALUES.idPresupuesto;
        mega_presupuesto_aprobado.oneTime = false;

        var res = await BASEAPI.listp('departamento', {
            where: [
                {
                    "field": "id",
                    "operator": "=",
                    "value": idDepto
                },
            ]
        });
        if (res.data.length > 0) {
            mega_presupuesto_aprobado.titulo = res.data[0].nombre;
            mega_presupuesto_aprobado.departamento = res.data[0];
        }
        mega_presupuesto_aprobado.modal.modalView(String.format("mega_presupuesto_aprobado/form"), {
            width: 'modal-full',
            header: {
                title: `Presupuestos `,
                icon: "design"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: true
            },
            event: {
                show: {
                    begin: function (data) {
                        mega_presupuesto_aprobado.estatus_departamento = "" + idStatus;
                    },
                    end: function (data) {
                        mega_presupuesto_aprobado.estatus_departamento = "" + idStatus;
                    }
                },
                hide: {
                    begin: function (data) {
                    },
                    end: function (data) {

                    }
                }
            }
        });
    };
    mega_presupuesto_aprobado.guardar_comentario_clicks = function () {
        if (mega_presupuesto_aprobado.Comentario == '') {
            SWEETALERT.show({
                type: "warning",
                title: "Favor colocar comentario",
                message: " "
            });
            return 0;
        } else if (maliciousCode(mega_presupuesto_aprobado.Comentario)){
            SWEETALERT.show({
                type: "warning",
                title: "Código malicioso",
                message: " "
            });
            return 0;
        }
        SWEETALERT.confirm({
            type: "warning",
            title: "Desea guardar el comentario?",
            message: " ",
            confirm: function () {
                BASEAPI.insert('comentarios', {
                    comentario: mega_presupuesto_aprobado.Comentario,
                    type: ENUM_2.tipo_comentario.POA_Presupuesto,
                    created_at: date(),
                    created_by: session.usuario_id,
                    value: mega_presupuesto_aprobado.id_Presupuesto,
                    value2: mega_presupuesto_aprobado.estatus_departamento,
                }, function (res) {
                });
                mega_presupuesto_aprobado.Comentario = "";
                mega_presupuesto_aprobado.refreshAngular();
                mega_comentario_presupuesto_poa.refresh();
            }
        })
    };
    mega_presupuesto_aprobado.guardarEstatus = function () {
        if (mega_presupuesto_aprobado.estatus_departamento == mega_presupuesto_aprobado.estatus_departamento_inicial) {
            SWEETALERT.show({
                type: "warning",
                title: "Favor cambiar estatus",
                message: " "
            });
            return 0;
        }  else if (maliciousCode(mega_presupuesto_aprobado.Comentario)){
            SWEETALERT.show({
                type: "warning",
                title: "Código malicioso",
                message: " "
            });
            return 0;
        }
        SWEETALERT.confirm({
            type: "warning",
            title: "Atención",
            message: "¿Desea cambiar el estatus del presupuesto de este departamento?",
            confirm: async function () {
                await BASEAPI.updateallp('presupuesto_aprobado', {
                    'estatus': mega_presupuesto_aprobado.estatus_departamento,
                    where: [{
                        'field': 'id',
                        'operator': '=',
                        'value': mega_presupuesto_aprobado.id_Presupuesto
                    }]
                });
                NOTIFY.success(`Estatus del presupuesto para el departamento ${mega_presupuesto_aprobado.departamento.nombre} fue cambiado`);
                MODAL.close(mega_presupuesto_aprobado);
                if (mega_presupuesto_aprobado)
                    mega_presupuesto_aprobado.refresh();
            }
        });
    }
    mega_presupuesto_aprobado.ver_lista_productos_click = function () {

        mega_presupuesto_aprobado.modal.modalView(String.format("mega_producto"), {
            width: 'modal-full',
            header: {
                title: `Proyecto/Producto del Departamento ${mega_presupuesto_aprobado.departamento.nombre}`,
                icon: "design"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'mega_producto'
            },
        });
    }
    // by diomedes verificacion de poa activo y si tengo permisos
    mega_presupuesto_aprobado.poa_activo = function (){
        if ( (mega_presupuesto_aprobado.director_general != mega_presupuesto_aprobado.permitir)){
            mega_presupuesto_aprobado.form.options.estatus_departamento.disabled = true;
            mega_presupuesto_aprobado.refreshAngular();
        }

        if (session.estado != ENUM_2.poa_estatus.Activo){
            mega_presupuesto_aprobado.form.options.estatus_departamento.disabled = true;
            mega_presupuesto_aprobado.refreshAngular();
        }
        return session.estado == ENUM_2.poa_estatus.Activo;
    };
});
