app.controller("riesgo_historico", function ($scope, $http, $compile) {
    riesgo_historico = this;
    //riesgo_historico.fixFilters = [];
    riesgo_historico.session = new SESSION().current();
    riesgo_historico.fixFilters = [
        {
            field: "condicion",
            value: "Concluida"
        },
        {
            field: "compania",
            value:  riesgo_historico.session.compania_id
        },
        {
            "field": "institucion",
            "operator":  riesgo_historico.session.institucion_id ? "=" : "is",
            "value":  riesgo_historico.session.institucion_id ?  riesgo_historico.session.institucion_id : "$null"
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
                    value:  riesgo_historico.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  riesgo_historico.session.institucion_id ? "=" : "is",
                    "value":  riesgo_historico.session.institucion_id ?  riesgo_historico.session.institucion_id : "$null"
                },
                {
                    field: "condicion",
                    value: "Vigente"
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
        }else{
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
                new: "Agregar XXX",
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            riesgo_historico.createForm(data, mode, defaultData);


            $scope.$watch("riesgo_historico.fecha_inicio", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_historico, 'fecha_inicio', rules);
            });


            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_historico.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_historico, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("riesgo_historico.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(riesgo_historico, 'institucion', rules);
            });
        }
    };
    riesgo_historico.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == 'estatus'){
            if (!riesgo_historico.created){
                if (!do_me_once) {
                    riesgo_historico.estatus = "1";
                    riesgo_historico.form.loadDropDown('estatus')
                    do_me_once = true;
                }
            }
        }
        if (data == 'ano'){
            console.log("coño pude entrar")
        }
    };
    riesgo_historico.saveData = function () {
        if (riesgo_historico.created){
            VALIDATION.save(riesgo_historico, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.updateall('riesgo_historico', {
                    nombre: riesgo_historico.nombre ? riesgo_historico.nombre : "$null",
                    descripcion: riesgo_historico.descripcion ? riesgo_historico.descripcion : "$null",
                    ano: riesgo_historico.ano ? riesgo_historico.ano: "$null",
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
                    if (riesgo_historico.firsttime ){
                        SWEETALERT.show({message: "La gestión de riesgo ha sido Creada"});
                        riesgo_historico.firsttime = false;
                    }else {
                        SWEETALERT.show({message: "La gestión de riesgo ha sido Modificada"});
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
                    riesgo_historico.getRiesgo()
                });
            },["nombre", "ano", 'estatus']);
        }else {
            VALIDATION.save(riesgo_historico, async function () {
                BASEAPI.insertID('riesgo_historico', {
                    nombre: riesgo_historico.nombre,
                    descripcion: riesgo_historico.descripcion ? riesgo_historico.descripcion : "$null",
                    ano: riesgo_historico.ano ? riesgo_historico.ano  : "$null",
                    estatus: 1,
                    compania: riesgo_historico.session.compania_id ? riesgo_historico.session.compania_id : "$null",
                    institucion: riesgo_historico.session.institucion_id ? riesgo_historico.session.institucion_id : "$null",
                }, '','',async function (result) {
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
                                    "operator":  riesgo_historico.session.institucion_id ? "=" : "is",
                                    "value":  riesgo_historico.session.institucion_id ?  riesgo_historico.session.institucion_id : "$null"
                                },
                                {
                                    field: "condicion",
                                    value: "Vigente"
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
                        }else{
                            riesgo_historico.created = false;
                            riesgo_historico.estatus_nombre = "En elaboración";
                            riesgo_historico.current_estatus = 1;
                        }
                        SWEETALERT.show({message: "La gestión de riesgo ha sido Creada"});
                        riesgo_historico.refreshAngular();
                    }
                });
            },["nombre", "ano", 'estatus']);
        }
    }
    riesgo_historico.cancelar = function (){
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
});