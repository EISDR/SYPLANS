app.controller("pacc", function ($scope, $http, $compile) {
    pacc = this;
    //pacc.fixFilters = [];
    pacc.singular = "singular";
    pacc.plural = "plural";
    pacc.headertitle = "Plan Anual de Compras y Contrataciones";
    pacc.session = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo = "";
    var cuerpo = "";
    //pacc.destroyForm = false;
    //pacc.permissionTable = "tabletopermission";
    RUNCONTROLLER("pacc", pacc, $scope, $http, $compile);
    RUN_B("pacc", pacc, $scope, $http, $compile);
    pacc.getOpenpacc = async function () {
        var paccData = await BASEAPI.firstp('vw_pacc', {
            order: "desc",
            where: [
                {
                    field: "estatus",
                    operator: "!=",
                    value: 8
                },
                {
                    field: "compania",
                    value: pacc.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  pacc.session.institucion_id ? "=" : "is",
                    "value":  pacc.session.institucion_id ?  pacc.session.institucion_id : "$null"
                },
            ]
        });
        if (paccData) {
            pacc.show_edit = true;
            pacc.id = paccData.id;
            pacc.nombre = paccData.nombre;
            pacc.empresa = pacc.session.compania;
            pacc.descripcion = paccData.descripcion;
            pacc.capitulo = paccData.capitulo;
            pacc.sub_capitulo = paccData.subcapitulo;
            pacc.unidad = paccData.unidad;
            pacc.unidad_compra = paccData.unidad_compra;
            pacc.sigla = paccData.codigo;
            pacc.ano_planificacion_view = paccData.año;
            pacc.fecha_revision = paccData.fecha_revision;
            pacc.fecha_revision_label = paccData.fecha_revision ? moment(paccData.fecha_revision).format("DD/MM/YYYY") : "";
            pacc.fecha_aprobacion = paccData.fecha_aprobacion;
            pacc.fecha_aprobacion_label = paccData.fecha_aprobacion ? moment(paccData.fecha_aprobacion).format("DD/MM/YYYY") : "";
            pacc.codigo_plan = paccData.codigo_plan;
            pacc.cantidad = paccData.cantidad;
            pacc.version = paccData.version;
            pacc.estatus = paccData.estatus_nombre;
            pacc.fecha_presentacion = paccData.fecha_presentacion;
            pacc.fecha_presentacion_label = paccData.fecha_presentacion ? moment(paccData.fecha_presentacion).format("DD/MM/YYYY") : "";
            pacc.active = paccData.active;
            pacc.compania = paccData.compania;
        } else {
            pacc.show_edit = false;
        }
        pacc.refreshAngular();
    };
    pacc.getOpenpacc();

    pacc.formulary = function (data, mode, defaultData) {
        if (pacc !== undefined) {

            pacc.form.modalWidth = ENUM.modal.width.full;
            pacc.form.readonly = {};
            pacc.createForm(data, mode, defaultData);
            $scope.$watch("pacc.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'descripcion', rules);
            });
            $scope.$watch("pacc.capitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'capitulo', rules);
            });
            $scope.$watch("pacc.subcapitulo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'subcapitulo', rules);
            });
            $scope.$watch("pacc.unidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'unidad', rules);
            });
            $scope.$watch("pacc.unidad_compra", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'unidad_compra', rules);
            });
            $scope.$watch("pacc.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'codigo', rules);
            });
            $scope.$watch("pacc.año", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'año', rules);
            });
            $scope.$watch("pacc.fecha_revision", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'fecha_revision', rules);
            });
            $scope.$watch("pacc.fecha_aprobacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'fecha_aprobacion', rules);
            });
            $scope.$watch("pacc.codigo_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'codigo_plan', rules);
            });
            $scope.$watch("pacc.cantidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'cantidad', rules);
            });
            $scope.$watch("pacc.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'version', rules);
            });
            $scope.$watch("pacc.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'estatus', rules);
            });
            $scope.$watch("pacc.fecha_presentacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'fecha_presentacion', rules);
            });
            $scope.$watch("pacc.active", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(pacc, 'active', rules);
            });
        }
    };
    $scope.$watch("pacc.ano_planificacion", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc, 'ano_planificacion', rules);
    });
    $scope.$watch("pacc.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc, 'nombre', rules);
    });
    $scope.$watch("pacc.capitulo", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc, 'capitulo', rules);
    });
    $scope.$watch("pacc.sub_capitulo", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc, 'sub_capitulo', rules);
    });
    $scope.$watch("pacc.unidad", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc, 'unidad', rules);
    });
    $scope.$watch("pacc.unidad_compra", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(pacc, 'unidad_compra', rules);
    });
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
    pacc.createData = function (){
        //validation
        VALIDATION.save(pacc, async function () {
            pacc.pacclist = await BASEAPI.listp('pacc',{
                order: "desc",
                where: [
                    {
                        field: "compania",
                        value: pacc.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator":  pacc.session.institucion_id ? "=" : "is",
                        "value":  pacc.session.institucion_id ?  pacc.session.institucion_id : "$null"
                    },
                ]
            });
            pacc.createdpacc = [];
            pacc.createdpacc = pacc.pacclist.data.filter(d=>{
               return d.año == pacc.form.selected('ano_planificacion').periodo_poa;
            });
            pacc.lastpacc = pacc.pacclist.data[0];
            if (pacc.createdpacc.length > 0){
                SWEETALERT.show({message: `Ya existe un PACC creado con el año ${pacc.form.selected('ano_planificacion').periodo_poa}`});
            }else{
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.insertID('pacc',{
                    "año": pacc.form.selected('ano_planificacion').periodo_poa,
                    "estatus": 1,
                    "codigo_plan": getNueNumber(pacc.session.compania_id, pacc.session.sigla, pacc.form.selected('ano_planificacion').periodo_poa, pacc.lastpacc ? pacc.lastpacc.id + 1 : "1" ),
                    "codigo": pacc.session.sigla,
                    "compania": pacc.session.compania_id,
                    "institucion": pacc.session.institucion_id ? pacc.session.institucion_id : "$null"
                },'','',async function(data){
                    console.log(data);
                    pacc.from_save = true;
                    await pacc.getOpenpacc();
                    SWEETALERT.stop();
                });
            }
        },["ano_planificacion"]);
    }
    pacc.updateData = function () {
        VALIDATION.save(pacc, async function () {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            BASEAPI.updateall('pacc',{
                nombre: pacc.nombre,
                descripcion: pacc.descripcion ? pacc.descripcion : "$null",
                capitulo: pacc.capitulo,
                subcapitulo: pacc.sub_capitulo,
                fecha_revision: pacc.fecha_revision ? moment(pacc.fecha_revision).format("YYYY-MM-DD HH:mm:ss") : "$null",
                fecha_presentacion: pacc.fecha_presentacion ? moment(pacc.fecha_presentacion).format("YYYY-MM-DD HH:mm:ss") : "$null",
                fecha_aprobacion: pacc.fecha_aprobacion ? moment(pacc.fecha_aprobacion).format("YYYY-MM-DD HH:mm:ss") : "$null",
                unidad: pacc.unidad,
                unidad_compra: pacc.unidad_compra,
                where: [
                    {
                        field: "id",
                        value: pacc.id
                    }
                ]
            }, function (result){
                if (pacc.from_save) {
                    titulo_push = `PACC General ha sido aperturado`;
                    cuerpo_push = `Plan Anual de Compras y Contrataciones está formalmente Aperturado. Todos los Departamentos pueden proceder a trabajar sus PACC Departamentales`;

                    titulo = `PACC General ha sido aperturado`;
                    // correo = `${actividades_poa.form.selected('responsable').correo}`;
                    cuerpo = `Plan Anual de Compras y Contrataciones está formalmente Aperturado. Todos los Departamentos pueden proceder a trabajar sus PACC Departamentales`;
                    function_send_email_all_directors(titulo_push, cuerpo_push, titulo, cuerpo, pacc.session.compania_id, pacc.session.institucion_id);
                    SWEETALERT.stop();
                    SWEETALERT.show({
                        message: "<h5>Enviando notificaciones por correo</h5> <p>Notificaciones (correos) a todos los directores departamentales avisándole que el PACC está formalmente abierto de forma tal que procedan a trabajar con sus PACC Departamentales</p>",
                        confirm: function(){
                            location.reload();
                        }
                    })
                }else {
                    SWEETALERT.show({
                        message: "PACC ha sido modificado",
                        confirm: function(){
                            location.reload();
                        }
                    })
                }
            });
        },["nombre", "capitulo", "sub_capitulo", "unidad", "unidad_compra"]);
    }
    pacc.cancelar = function() {
        location.reload();
    }
});