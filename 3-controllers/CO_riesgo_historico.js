app.controller("riesgo_historico", function ($scope, $http, $compile) {
    riesgo_historico = this;
    //riesgo_historico.fixFilters = [];
    riesgo_historico.session = new SESSION().current();
    riesgo_historico.fixFilters = [
        {
            field: "estatus",
            value: 4
        },
        {
            field: "compania",
            value: riesgo_historico.session.compania_id
        },
        {
            "field": "institucion",
            "operator": riesgo_historico.session.institucion_id ? "=" : "is",
            "value": riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null"
        }
    ];
    //riesgo_historico.fixFilters = [{
    //    field: "compania",
    //    value: riesgo_historico.session.compania_id
    //}];
    //riesgo_historico.singular = "singular";
    //riesgo_historico.plural = "plural";
    riesgo_historico.headertitle = "Gestiones de Riesgo Pasadas";
    //riesgo_historico.destroyForm = false;
    //riesgo_historico.permissionTable = "tabletopermission";
    riesgo_historico.current_year = moment().format('YYYY');
    var do_me_once = false;
    RUNCONTROLLER("riesgo_historico", riesgo_historico, $scope, $http, $compile);
    RUN_B("riesgo_historico", riesgo_historico, $scope, $http, $compile);
    riesgo_historico.selectQueries['estatus'] = [
        {
            field: 'rol',
            operator: '=',
            value: riesgo_historico.session.groups[0].id
        }
    ];
    $scope.$watch("riesgo_historico.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'nombre', rules);
    });
    $scope.$watch("riesgo_historico.descripcion", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'descripcion', rules);
    });
    $scope.$watch("riesgo_historico.ano", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'ano', rules);
    });
    $scope.$watch("riesgo_historico.estatus", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(riesgo_historico, 'estatus', rules);
    });
    riesgo_historico.getRiesgo = async function () {
        var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value: riesgo_historico.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": riesgo_historico.session.institucion_id ? "=" : "is",
                    "value": riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (riesgoData) {
            riesgo_historico.created = true;
            riesgo_historico.id = riesgoData.id;
            riesgo_historico.nombre = riesgoData.nombre;
            riesgo_historico.descripcion = riesgoData.descripcion;
            riesgo_historico.ano = riesgoData.ano + '';
            riesgo_historico.ano_view = riesgoData.ano + '';
            riesgo_historico.estatus = riesgoData.estatus + '';
            riesgo_historico.current_estatus = riesgoData.estatus;
            riesgo_historico.estatus_nombre = riesgoData.estatus_nombre;
            riesgo_historico.compania = riesgoData.compania;
            riesgo_historico.institucion = riesgoData.institucion;
            riesgo_historico.form.loadDropDown('estatus')
        } else {
            riesgo_historico.created = false;
            riesgo_historico.ano = '[NULL]';
            riesgo_historico.estatus_nombre = "Abierto";
            riesgo_historico.current_estatus = 1;
        }
        riesgo_historico.refreshAngular();
    };
    riesgo_historico.getRiesgo();
    riesgo_historico.lista_ano = [];
    for (var a = 2018; a <= 3000; a++) {
        if (a >= riesgo_historico.current_year) {
            riesgo_historico.lista_ano.push(a);
        }
    }
    riesgo_historico.formulary = function (data, mode, defaultData) {
        if (riesgo_historico !== undefined) {
            RUN_B("riesgo_historico", riesgo_historico, $scope, $http, $compile);
            riesgo_historico.form.modalWidth = ENUM.modal.width.full;
            riesgo_historico.form.readonly = {compania: riesgo_historico.session.compania_id};
            riesgo_historico.form.titles = {
                new: `Transferir ${riesgo_historico.nombre} ${riesgo_historico.ano_view} a una nueva gestión de riesgo`,
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            riesgo_historico.ano = (parseInt(riesgo_historico.current_year) + 1) + "";
            riesgo_historico.createForm(data, mode, defaultData);


            $scope.$watch("riesgo_historico.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_historico, 'nombre', rules);
            });


        }
    };
    riesgo_historico.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == 'estatus') {
            if (!riesgo_historico.created) {
                if (!do_me_once) {
                    riesgo_historico.estatus = "1";
                    riesgo_historico.form.loadDropDown('estatus')
                    do_me_once = true;
                }
            }
        }
        if (data == 'ano') {
            console.log("coño pude entrar")
        }
    };
    riesgo_historico.saveData = function () {
        if (riesgo_historico.created) {
            VALIDATION.save(riesgo_historico, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.updateall('riesgo_historico', {
                    nombre: riesgo_historico.nombre ? riesgo_historico.nombre : "$null",
                    descripcion: riesgo_historico.descripcion ? riesgo_historico.descripcion : "$null",
                    ano: riesgo_historico.ano ? riesgo_historico.ano : "$null",
                    estatus: riesgo_historico.estatus ? riesgo_historico.estatus : 1,
                    compania: riesgo_historico.session.compania_id ? riesgo_historico.session.compania_id : "$null",
                    institucion: riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null",
                    where: [
                        {
                            field: "id",
                            value: riesgo_historico.id
                        }
                    ]
                }, function (result) {
                    riesgo_historico.current_estatus = riesgo_historico.estatus;
                    riesgo_historico.last_estatus = riesgo_historico.estatus;
                    if (riesgo_historico.firsttime) {
                        SWEETALERT.show({
                            message: "La gestión de riesgo ha sido Creada",
                            confirm: function(){
                                location.reload();
                            }
                        });
                        riesgo_historico.firsttime = false;
                    } else {
                        SWEETALERT.show({
                            message: "La gestión de riesgo ha sido Modificada",
                            confirm: function(){
                                location.reload();
                            }
                        });
                    }
//                     if (mapa_proceso.estatus == 2){
//                         titulo_push = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado.`;
//                         cuerpo_push = `Se ha Elaborado el Mapa de Proceso "${mapa_proceso.nombre}"`;
//                         titulo = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado`
//                         cuerpo = `Se ha elaborado el mapa de proceso  "${ mapa_proceso.nombre }".
//
// Los Supervisores y Anlistas de Calidad deben proceder a definir los planes de auditoría.
//
// Gracias.`;
//                         function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, mapa_proceso.session.compania_id, mapa_proceso.session.institucion_id, [18,17], 4);
//                     }
                    riesgo_historico.cleanFields();
                    riesgo_historico.getRiesgo()
                });
            }, ["nombre", "ano", 'estatus']);
        } else {
            VALIDATION.save(riesgo_historico, async function () {
                BASEAPI.insertID('riesgo_historico', {
                    nombre: riesgo_historico.nombre,
                    descripcion: riesgo_historico.descripcion ? riesgo_historico.descripcion : "$null",
                    ano: riesgo_historico.ano ? riesgo_historico.ano : "$null",
                    estatus: 1,
                    compania: riesgo_historico.session.compania_id ? riesgo_historico.session.compania_id : "$null",
                    institucion: riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null",
                }, '', '', async function (result) {
                    if (result.data.data.length > 0) {
                        SWEETALERT.stop();
                        riesgo_historico.firsttime = true;
                        riesgo_historico.estatus = "1";
                        riesgo_historico.form.loadDropDown('estatus');
                        riesgo_historico.refreshAngular();
                        var riesgoData = await BASEAPI.firstp('vw_riesgo_historico', {
                            order: "desc",
                            where: [
                                {
                                    field: "compania",
                                    value: riesgo_historico.session.compania_id
                                },
                                {
                                    "field": "institucion",
                                    "operator": riesgo_historico.session.institucion_id ? "=" : "is",
                                    "value": riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null"
                                },
                                {
                                    field: "estatus",
                                    operator: "!=",
                                    value: 4
                                }
                            ]
                        });
                        if (riesgoData) {
                            riesgo_historico.created = true;
                            riesgo_historico.id = riesgoData.id;
                            riesgo_historico.nombre = riesgoData.nombre;
                            riesgo_historico.descripcion = riesgoData.descripcion;
                            riesgo_historico.ano = riesgoData.ano;
                            riesgo_historico.estatus = riesgoData.estatus + '';
                            riesgo_historico.current_estatus = riesgoData.estatus;
                            riesgo_historico.estatus_nombre = riesgoData.estatus_nombre;
                            riesgo_historico.compania = riesgoData.compania;
                            riesgo_historico.institucion = riesgoData.institucion;
                            SWEETALERT.show({message: "La gestión de riesgo ha sido Creada"});
                            riesgo_historico.form.loadDropDown('estatus')
                        } else {
                            riesgo_historico.created = false;
                            riesgo_historico.estatus_nombre = "En elaboración";
                            riesgo_historico.current_estatus = 1;
                        }
                        SWEETALERT.show({message: "La gestión de riesgo ha sido Creada"});
                        riesgo_historico.refreshAngular();
                    }
                });
            }, ["nombre", "ano", 'estatus']);
        }
    }
    riesgo_historico.cancelar = function () {
        location.reload();
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
    riesgo_historico.triggers.table.after.close = function (data) {
        location.reload();
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
    riesgo_historico.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        data.inserting.ano = riesgo_historico.ano;
        data.inserting.estatus = 1;
        let engine = CONFIG.mysqlactive ? CONFIG.mysql : CONFIG.postgre;
        let queryTopas = `insert into riesgo(table_,nombre,descripcion,probabilidad,impacto,factor_riesgo,consecuencia,compania,institucion,registro,riesgo_entidad,riesgo_a,factor_riesgotext,causa_debilidad,estado,proceso,procesotext,estrategia,estado_plan_accion,observacion,ocurrencia,supuestos,mamfe_efecto,mamfe_causa,mamfe_deteccion,mamfe_gravedad,mamfe_ocurrencia,mamfe_deteccion_current,mamfe_gravedad_current,mamfe_ocurrencia_current,mamfe_elemento,mamfe,condicion,departamento,riesgo_historico,probabilidad_current,impacto_current,herencia)

select table_,nombre,descripcion,probabilidad,impacto,factor_riesgo,consecuencia,compania,institucion,registro,riesgo_entidad,riesgo_a,factor_riesgotext,causa_debilidad,1,proceso,procesotext,estrategia,1,observacion,NULL,supuestos,mamfe_efecto,mamfe_causa,mamfe_deteccion,mamfe_gravedad,mamfe_ocurrencia,mamfe_deteccion_current,mamfe_gravedad_current,mamfe_ocurrencia_current,mamfe_elemento,mamfe,condicion,departamento,(SELECT AUTO_INCREMENT
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = "${engine.database}"
AND TABLE_NAME = "riesgo_historico"),probabilidad_current,impacto_current,id from riesgo where compania=${riesgo_historico.session.compania_id} and riesgo_historico=${riesgo_historico.id} and mamfe=1;

insert into  riesgo_matriz_control(riesgo,nombre,descripcion,efectividad,responsable,fecha_desde,fecha_hasta,recursos_financieros,riesgo_control,mamfe_correctiva,mamfe_fechacumplimiento,mamfe_accion_implantada,mamfe_estatus,mamfe)

select (select id from riesgo  where herencia=riesgo_matriz_control.riesgo limit 1),nombre,descripcion,efectividad,responsable,fecha_desde,fecha_hasta,recursos_financieros,riesgo_control,mamfe_correctiva,mamfe_fechacumplimiento,mamfe_accion_implantada,1,mamfe from riesgo_matriz_control where riesgo in (select id from riesgo where compania=${riesgo_historico.session.compania_id} and riesgo_historico=${riesgo_historico.id} and mamfe=1);`;

        SERVICE.base_db.directQuery({query: queryTopas}, (data) => {
            resolve(true);
        });

    });
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
});