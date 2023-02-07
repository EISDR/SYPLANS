app.controller("mapa_proceso", function ($scope, $http, $compile) {
    mapa_proceso = this;
    mapa_proceso.session = new SESSION().current();
    mapa_proceso.fixFilters = [
        {
            field: "estatus",
            value: "4"
        },
        {
            field: "compania",
            value:  mapa_proceso.session.compania_id
        },
        {
            "field": "institucion",
            "operator":  mapa_proceso.session.institucion_id ? "=" : "is",
            "value":  mapa_proceso.session.institucion_id ?  mapa_proceso.session.institucion_id : "$null"
        }
    ];
    //mapa_proceso.singular = "singular";
    //mapa_proceso.plural = "plural";
    mapa_proceso.headertitle = "Mapas de procesos Anteriores";
    //mapa_proceso.destroyForm = false;
    //mapa_proceso.permissionTable = "tabletopermission";
    var do_me_once = false;
    RUNCONTROLLER("mapa_proceso", mapa_proceso, $scope, $http, $compile);
    RUN_B("mapa_proceso", mapa_proceso, $scope, $http, $compile);
    mapa_proceso.getMapa = async function () {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  mapa_proceso.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  mapa_proceso.session.institucion_id ? "=" : "is",
                    "value":  mapa_proceso.session.institucion_id ?  mapa_proceso.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            mapa_proceso.created = true;
            mapa_proceso.id = mapaData.id;
            mapa_proceso.nombre = mapaData.nombre;
            mapa_proceso.descripcion = mapaData.descripcion;
            mapa_proceso.fecha_inicio = mapaData.fecha_inicio;
            mapa_proceso.fecha_fin = mapaData.fecha_fin;
            mapa_proceso.range_date = mapaData.fecha_inicio ? LAN.date(mapaData.fecha_inicio) + " - " + LAN.date(mapaData.fecha_fin) : "";
            mapa_proceso.estatus = mapaData.estatus + '';
            mapa_proceso.current_estatus = mapaData.estatus;
            mapa_proceso.estatus_nombre = mapaData.estatus_nombre;
            mapa_proceso.compania = mapaData.compania;
            mapa_proceso.institucion = mapaData.institucion;
            if (mapa_proceso.estatus == 3){
                mapa_proceso.form.options.fecha_fin.disabled =true;
                mapa_proceso.form.options.fecha_inicio.disabled =true;
                mapa_proceso.refreshAngular();
            }
            mapa_proceso.form.loadDropDown('estatus')
        }else{
            mapa_proceso.created = false;
            mapa_proceso.estatus_nombre = "Abierto";
            mapa_proceso.current_estatus = 1;
        }
        mapa_proceso.refreshAngular();
    };
    mapa_proceso.getMapa();
    mapa_proceso.selectQueries['estatus'] = [
        {
            field: 'rol',
            operator: '=',
            value: mapa_proceso.session.groups[0].id
        }
    ];
    $scope.$watch("mapa_proceso.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'nombre', rules);
    });
    $scope.$watch("mapa_proceso.range_date", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'range_date', rules);
    });
    $scope.$watch("mapa_proceso.estatus", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'estatus', rules);
    });
    $scope.$watch("mapa_proceso.descripcion", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(mapa_proceso, 'descripcion', rules);
    });
    mapa_proceso.formulary = function (data, mode, defaultData) {
        if (mapa_proceso !== undefined) {
            RUN_B("mapa_proceso", mapa_proceso, $scope, $http, $compile);
            mapa_proceso.form.modalWidth = ENUM.modal.width.full;
            mapa_proceso.form.readonly = {compania: mapa_proceso.session.compania_id};
            mapa_proceso.form.titles = {
                new: `Transferir ${mapa_proceso.nombre} a un nuevo mapa de proceso`,
                edit: "Editar XXX",
                view: "Ver XXXX"
            };
            mapa_proceso.createForm(data, mode, defaultData);

        }
    };
    mapa_proceso.cleanFields = function (){
        mapa_proceso.nombre = "";
        mapa_proceso.descripcion = "";
        mapa_proceso.fecha_inicio = "";
        mapa_proceso.fecha_fin = "";
        mapa_proceso.range_date = "";
        mapa_proceso.refresh();
        mapa_proceso.refreshAngular();
    }
    mapa_proceso.saveData = function () {
        if (mapa_proceso.created){
            VALIDATION.save(mapa_proceso, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                BASEAPI.updateall('mapa_proceso', {
                    nombre: mapa_proceso.nombre ? mapa_proceso.nombre : "$null",
                    descripcion: mapa_proceso.descripcion ? mapa_proceso.descripcion : "$null",
                    fecha_inicio: mapa_proceso.fecha_inicio ? moment(mapa_proceso.fecha_inicio).format("YYYY-MM-DD") : "$null",
                    fecha_fin: mapa_proceso.fecha_fin ? moment(mapa_proceso.fecha_fin).format("YYYY-MM-DD") : "$null",
                    estatus: mapa_proceso.estatus ? mapa_proceso.estatus : 1,
                    compania: mapa_proceso.session.compania_id ? mapa_proceso.session.compania_id : "$null",
                    institucion: mapa_proceso.session.institucion_id ? mapa_proceso.session.institucion_id : "$null",
                    where: [
                        {
                            field: "id",
                            value: mapa_proceso.id
                        }
                    ]
                }, function (result) {
                    mapa_proceso.current_estatus = mapa_proceso.estatus;
                    mapa_proceso.last_estatus = mapa_proceso.estatus;
                    if (mapa_proceso.firsttime ){
                        SWEETALERT.show({
                            message: "Mapa de Proceso ha sido Creado",
                            confirm: function(){
                                if (mapa_proceso.last_estatus == 4){
                                    location.reload();
                                }
                            }
                        });
                        mapa_proceso.firsttime = false;
                    }else {
                        SWEETALERT.show({
                            message: "Mapa de Proceso ha sido modificado",
                            confirm: function(){
                                if (mapa_proceso.last_estatus == 4){
                                    location.reload();
                                }
                            }
                        });
                    }
                    if (mapa_proceso.estatus == 2){
                        titulo_push = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado.`;
                        cuerpo_push = `Se ha Elaborado el Mapa de Proceso "${mapa_proceso.nombre}"`;
                        titulo = `El Mapa de Proceso "${mapa_proceso.nombre}" ha sido Elaborado`
                        cuerpo = `Se ha elaborado el mapa de proceso  "${ mapa_proceso.nombre }".
                            
Los Supervisores y Anlistas de Calidad deben proceder a definir los planes de auditoría.
                            
Gracias.`;
                        function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, mapa_proceso.session.compania_id, mapa_proceso.session.institucion_id, [18,17], 4);
                    }
                    mapa_proceso.cleanFields();
                    mapa_proceso.getMapa()
                });
            },["nombre", "fecha_inicio", 'estatus', "range_date"]);
        }else {
            VALIDATION.save(mapa_proceso, async function () {
                BASEAPI.insertID('mapa_proceso', {
                    nombre: mapa_proceso.nombre,
                    descripcion: mapa_proceso.descripcion ? mapa_proceso.descripcion : "$null",
                    fecha_inicio: mapa_proceso.fecha_inicio ? moment(mapa_proceso.fecha_inicio).format("YYYY-MM-DD") : "$null",
                    fecha_fin: mapa_proceso.fecha_fin ? moment(mapa_proceso.fecha_fin).format("YYYY-MM-DD") : "$null",
                    estatus: 1,
                    compania: mapa_proceso.session.compania_id ? mapa_proceso.session.compania_id : "$null",
                    institucion: mapa_proceso.session.institucion_id ? mapa_proceso.session.institucion_id : "$null",
                }, '','',async function (result) {
                    if (result.data.data.length > 0) {
                        SWEETALERT.stop();
                        mapa_proceso.firsttime = true;
                        mapa_proceso.estatus = "1";
                        mapa_proceso.form.loadDropDown('estatus');
                        mapa_proceso.refreshAngular();
                        var auditoriaData = await BASEAPI.firstp('vw_mapa_proceso', {
                            order: "desc",
                            where: [
                                {
                                    field: "compania",
                                    value: mapa_proceso.session.compania_id
                                },
                                {
                                    "field": "institucion",
                                    "operator":  mapa_proceso.session.institucion_id ? "=" : "is",
                                    "value":  mapa_proceso.session.institucion_id ?  mapa_proceso.session.institucion_id : "$null"
                                },
                                {
                                    field: "estatus",
                                    operator: "!=",
                                    value: 4
                                }
                            ]
                        });
                        if (auditoriaData) {
                            mapa_proceso.created = true;
                            mapa_proceso.id = auditoriaData.id;
                            mapa_proceso.nombre = auditoriaData.nombre;
                            mapa_proceso.descripcion = auditoriaData.descripcion;
                            mapa_proceso.fecha_inicio = auditoriaData.fecha_inicio;
                            mapa_proceso.fecha_fin = auditoriaData.fecha_fin;
                            mapa_proceso.range_date = auditoriaData.fecha_inicio ? LAN.date(auditoriaData.fecha_inicio) + " - " + LAN.date(auditoriaData.fecha_fin) : "";
                            mapa_proceso.estatus = auditoriaData.estatus + '';
                            mapa_proceso.current_estatus = auditoriaData.estatus;
                            mapa_proceso.estatus_nombre = auditoriaData.estatus_nombre;
                            mapa_proceso.compania = auditoriaData.compania;
                            mapa_proceso.institucion = auditoriaData.institucion;
                            if (auditoriaData.estatus ==3){
                                mapa_proceso.form.options.fecha_fin.disabled =true;
                                mapa_proceso.form.options.fecha_inicio.disabled =true;
                                mapa_proceso.refreshAngular();
                            }
                            SWEETALERT.show({message: "Mapa de Proceso ha sido Creado"});
                            mapa_proceso.getMapa()
                            mapa_proceso.form.loadDropDown('estatus')
                        }else{
                            mapa_proceso.created = false;
                            mapa_proceso.estatus_nombre = "En elaboración";
                            mapa_proceso.current_estatus = 1;
                        }
                        SWEETALERT.show({message: "Mapa de Proceso ha sido Creado"});
                        mapa_proceso.refreshAngular();
                    }
                });
            },["nombre", "fecha_inicio", 'estatus', "range_date"]);
        }
    }
    mapa_proceso.cancelar = function (){
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
    mapa_proceso.triggers.table.after.insert = function (data) {
        //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        let queryTopas = `insert into procesos_categoria(nombre, descripcion,compania,institucion,mapa_proceso,herencia)

select nombre,descripcion,compania,institucion,(select max(r.id) from mapa_proceso r),id from procesos_categoria where compania=${mapa_proceso.session.compania_id} and mapa_proceso=${mapa_proceso.id};
update mapa_proceso set estatus = 4 where id = ${mapa_proceso.id};
insert into procesos(nombre, descripcion,procesos_categoria,objetivo,alcance,responsable,recursos,active,estatus,mapa_proceso,herencia)

select nombre, descripcion, (select id from procesos_categoria where herencia=procesos.procesos_categoria limit 1), objetivo,alcance,responsable,recursos,1,1,${mapa_proceso.id},id from procesos where mapa_proceso=${mapa_proceso.id} and estatus not int (4,5);

insert into documentos_asociados(codigo,nombre, descripcion,proceso, procesos_categoria, observacion, tipo_documento, estatus, active, objetivo, alcance, marco_legal, resultado_esperado, trabaja_marco_legal)

select codigo, nombre, descripcion,  (select id from procesos where herencia=documentos_asociados.proceso limit 1), (select id from procesos_categoria where herencia=documentos_asociados.procesos_categoria limit 1), observacion,tipo_documento,1,1,objetivo,alcance,marco_legal,resultado_esperado,trabaja_marco_legal from documentos_asociados where proceso in (select id from procesos where mapa_proceso=${mapa_proceso.id}) and estatus not in (4,5);

insert into procesos_elemento(nombre, descripcion,proceso, funcion)

select nombre, descripcion, (select id from procesos where herencia=procesos_elemento.proceso limit 1), funcion from procesos_elemento where proceso in (select id from procesos where mapa_proceso=${mapa_proceso.id});

`;


        SERVICE.base_db.directQuery({query: queryTopas}, (data) => {
            return true;
        });
        return true;
    };
    mapa_proceso.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        data.inserting.estatus = 1;
        resolve(true);
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
    mapa_proceso.triggers.table.after.close = function (data) {
        location.reload();
    };
    mapa_proceso.triggers.table.after.control = function (data) {
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        if (data == 'range_date') {
            mapa_proceso.range_date = "";
            var rango_minimo = moment().format("YYYY-MM-DD");
            mapa_proceso.range_date_min(rango_minimo);
            mapa_proceso.refreshAngular();
        }
        if (data == 'estatus'){
            if (!mapa_proceso.created){
                if (!do_me_once) {
                    mapa_proceso.estatus = "1";
                    mapa_proceso.form.loadDropDown('estatus')
                    do_me_once = true;
                }
            }
        }
    };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});