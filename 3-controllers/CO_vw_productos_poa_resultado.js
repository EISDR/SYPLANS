app.controller("vw_productos_poa_resultado", function ($scope, $http, $compile) {
    vw_productos_poa_resultado = this;
    vw_productos_poa_resultado.pei = 0;
    vw_productos_poa_resultado.poa = 0;
    vw_productos_poa_resultado.auditModel = "vw_productos_poa_detalles";

    vw_productos_poa_resultado.session = new SESSION().current();
    var session = new SESSION().current();
    vw_productos_poa_resultado.group_caracteristica = session.groups[0] ? session.groups[0].caracteristica : "";
    vw_productos_poa_resultado.director_general = "DG";
    vw_productos_poa_resultado.director_departamental = "DP";
    vw_productos_poa_resultado.analista_de_planificacion = "AP";
    vw_productos_poa_resultado.analista_departamental  = "AD";
    vw_productos_poa_resultado.solo_lectura = "SL";
    vw_productos_poa_resultado.validar_departamento = true;
    vw_productos_poa_resultado.insert_readonly = {};

    // if(vw_productos_poa_resultado.group_caracteristica == vw_productos_poa_resultado.director_departamental || vw_productos_poa_resultado.group_caracteristica == vw_productos_poa_resultado.analista_departamental ){
    //     vw_productos_poa_resultado.departamento =  session.departamento;
    //     vw_productos_poa_resultado.validar_departamento = false ;
    //     // vw_productos_poa_resultado.insert_readonly = {poa: session.poa_id, departamento: vw_productos_poa_resultado.departamento};
    //     vw_productos_poa_resultado.insert_readonly = {poa: session.poa_id, departamento: session.departamento};
    //     vw_productos_poa_resultado.fixFilters = [
    //         {
    //             "field": "poa_id",
    //             "value": session.estado ? session.poa_id : 0
    //         },
    //         {
    //             "field": "departamento_id",
    //             "value": vw_productos_poa_resultado.departamento
    //         }
    //     ];
    // }else{
    //     // vw_productos_poa_resultado.insert_readonly = {poa: session.poa_id};
    //     vw_productos_poa_resultado.insert_readonly = {poa: session.poa_id, departamento: session.departamento};
    //     vw_productos_poa_resultado.fixFilters = [{
    //         "field": "poa_id",
    //         "value": session.estado ? session.poa_id : 0
    //     }];
    // }
    if (typeof actividades_poa !== 'undefined'){
        if (typeof actividades_poa !== 'not define'){
            if (actividades_poa) {
                vw_productos_poa_resultado.insert_readonly = {poa: session.poa_id, departamento: actividades_poa.form.selected('departamento') != null ? actividades_poa.form.selected('departamento').id.toString() : null};
                vw_productos_poa_resultado.fixFilters = [
                    {
                        "field": "departamento_id",
                        "value": actividades_poa.form.selected('departamento') != null ? actividades_poa.form.selected('departamento').id.toString() :-1
                    }
                ];
            }
        }
    }

    TRIGGER.run(vw_productos_poa_resultado);
    vw_productos_poa_resultado.getPOAstatus = async function() {
        vw_productos_poa_resultado.poa_ = await BASEAPI.listp("poa", {
            where: [{
                field: 'id',
                operator: "=",
                value: session.poa_id
            }]
        });
        if (vw_productos_poa_resultado.poa_.data){
            vw_productos_poa_resultado.estatus_poa = vw_productos_poa_resultado.poa_.data[0].estado;
            vw_productos_poa_resultado.condicion_poa = vw_productos_poa_resultado.poa_.data[0].activo;
        }
    };
    vw_productos_poa_resultado.getPOAstatus();
    vw_productos_poa_resultado.triggers.table.after.load = function (record){
        if (vw_productos_poa_resultado.GROUPS == "2" || vw_productos_poa_resultado.GROUPS == "7"){

        }
        if (vw_productos_poa_resultado.condicion_poa == ENUM_2.poa_estatus.Inactivo) {
            vw_productos_poa_resultado.setPermission("add",false);
        }
    };

    RUNCONTROLLER("vw_productos_poa_resultado", vw_productos_poa_resultado, $scope, $http, $compile);
    vw_productos_poa_resultado.singular = " "+MESSAGE.i('planificacion.titleProducto');
    vw_productos_poa_resultado.plural = " "+ MESSAGE.i('planificacion.titleProductos');
    vw_productos_poa_resultado.anadirComentario = (data) => new Promise((resolve, reject) => {
        if( vw_productos_poa_resultado.comentario == ""){
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }else{
            BASEAPI.insertp('comentarios',
                {
                    "comentario": vw_productos_poa_resultado.comentario,
                    "type": 6,
                    "created_by": session.usuario_id,
                    "value": vw_productos_poa_resultado.id,
                    "value2": vw_productos_poa_resultado.estado
                }).then(function (rs) {
                comentarios_productos_poa.refresh();
                vw_productos_poa_resultado.comentario = "";
                vw_productos_poa_resultado.refreshAngular();
                resolve(true);
            });
        }
    });
    vw_productos_poa_resultado.formulary = function (data, mode, defaultData) {
        if (vw_productos_poa_resultado !== undefined) {
            RUN_B("vw_productos_poa_resultado", vw_productos_poa_resultado, $scope, $http, $compile);
            vw_productos_poa_resultado.form.titles = {
                new: MESSAGE.i('planificacion.titleProductoPOA'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleProductoPOA')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleProductoPOA')}`
            };
            vw_productos_poa_resultado.no_repetir = true;
            vw_productos_poa_resultado.selectQueries["resultado"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: session.estatus ?  session.pei_id : 0
                }
            ];

            vw_productos_poa_resultado.form.schemas.insert.comentario = FORM.schemasType.calculated;
            vw_productos_poa_resultado.form.readonly = vw_productos_poa_resultado.insert_readonly;

            vw_productos_poa_resultado.presupuesto_departamento = [];
            BASEAPI.listp('presupuesto_aprobado', {
                "where": [
                    {
                        "field": "poa",
                        "value": session.estado ? session.poa_id : 0
                    },
                    {
                        "field": "deleted_at",
                        "operator": "",
                        "value": "$Is Null"
                    },
                    {
                        "field": "valor",
                        "operator": "!=",
                        "value": "0"
                    }
                ]
            }).then( function (results) {

                for(var pd of results.data){
                    vw_productos_poa_resultado.presupuesto_departamento.push(pd.departamento);
                }

                vw_productos_poa_resultado.selectQueries["departamento"] = [
                    {
                        "field": "compania",
                        "value": session.compania_id
                    },
                    {
                        "field": "id",
                        "value": vw_productos_poa_resultado.presupuesto_departamento
                    }
                ];

                vw_productos_poa_resultado.form.loadDropDown('departamento');

            });
            vw_productos_poa_resultado.createForm(data, mode, defaultData);
            vw_productos_poa_resultado.old_estado = 0;
            vw_productos_poa_resultado.siNo = 0;
            vw_productos_poa_resultado.triggers.table.after.control = function (data) {
                if (mode !== 'new' && data === 'nombre')
                    vw_productos_poa_resultado.isActivComplete();

                if(mode !== 'new' && data == 'estado'){
                    vw_productos_poa_resultado.old_estado = vw_productos_poa_resultado.estado;
                    if (vw_productos_poa_resultado.no_repetir){
                        if(vw_productos_poa_resultado.old_estado == ENUM_2.productos_estatus.Detenido.toString()){
                            vw_productos_poa_resultado.selectQueries["estado"] = [
                                {
                                    "field": "id",
                                    "value": [ENUM_2.productos_estatus.Abierto,ENUM_2.productos_estatus.Detenido]
                                }
                            ];
                            vw_productos_poa_resultado.no_repetir = false;
                            vw_productos_poa_resultado.form.loadDropDown('estado');
                        } else if (vw_productos_poa_resultado.old_estado == ENUM_2.productos_estatus.Abierto.toString() && vw_productos_poa_resultado.siNo == 0 ){
                            vw_productos_poa_resultado.selectQueries["estado"] = [
                                {
                                    "field": "id",
                                    "value": [ENUM_2.productos_estatus.Abierto,ENUM_2.productos_estatus.Detenido]
                                }
                            ];
                            vw_productos_poa_resultado.no_repetir = false;
                            vw_productos_poa_resultado.form.loadDropDown('estado');
                        }else{
                            vw_productos_poa_resultado.form.options.nombre.disabled = true;
                            vw_productos_poa_resultado.form.options.resultado.disabled = true;
                            vw_productos_poa_resultado.form.options.nombre.disabled = true;
                            vw_productos_poa_resultado.form.options.estado.disabled = true;
                            vw_productos_poa_resultado.no_repetir = false;
                            vw_productos_poa_resultado.form.loadDropDown('estado');
                        }
                    }
                }

                if (mode === 'new' && data == 'range_date') {
                    vw_productos_poa_resultado.range_date = "";
                    vw_productos_poa_resultado.refreshAngular();
                }
                if(mode === 'new' && data === 'estado'){
                    vw_productos_poa_resultado.estado = '' + ENUM_2.productos_estatus.Abierto;
                    vw_productos_poa_resultado.form.options.estado.disabled = true;
                    vw_productos_poa_resultado.refreshAngular();
                }
            };
            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.nombre',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_productos_poa_resultado, "nombre", rules)
            });
            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(vw_productos_poa_resultado, "descripcion", rules);
            });
            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.fecha_inicio',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_productos_poa_resultado, "fecha_inicio", rules)
            });
            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.fecha_fin',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_productos_poa_resultado, "fecha_fin", rules)
            });
            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.range_date',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_productos_poa_resultado, "fecha_inicio", rules);
                VALIDATION.validate(vw_productos_poa_resultado, "range_date", rules);
            });

            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.resultado',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_productos_poa_resultado, "resultado", rules)
            });

            vw_productos_poa_resultado.$scope.$watch('vw_productos_poa_resultado.estado',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_productos_poa_resultado, "estado", rules)
            });

            vw_productos_poa_resultado.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                if(actividades_poa.form.selected('departamento') == null){
                    SWEETALERT.show({message: `Necesitas seleccionar un departamento`});
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                }
                BASEAPI.first('presupuesto_aprobado', {
                    "where": [
                        {
                            "field": "poa",
                            "value": session.poa_id
                        },
                        {
                            "field": "departamento",
                            "value": data.inserting.departamento
                        },
                        {
                            "field": "deleted_at",
                            "operator": "",
                            "value": "$Is Null"
                        }
                    ]
                }, function (result) {
                    if(result == undefined){
                        SWEETALERT.show({message: `Este departamento no tiene un presupuesto asignado`});
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }else{
                        if (result.valor > 0) {
                            resolve(true);
                        }
                        else {
                            SWEETALERT.show({message: `Este departamento no tiene un presupuesto asignado`});
                            var buttons = document.getElementsByClassName("btn btn-labeled");
                            for(var item of buttons){
                                item.disabled = false;
                            }
                            resolve(false);
                        }
                    }

                });
            });
            vw_productos_poa_resultado.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                if(actividades_poa.form.selected('producto') != null){
                    if (actividades_poa.form.selected('producto').departamento_id != 0){
                        SWEETALERT.show({message: `Necesitas seleccionar un departamento`});
                        vw_productos_poa_resultado.res = false;
                    }
                }
                if(vw_productos_poa_resultado.old_estado.toString() !== vw_productos_poa_resultado.estado && vw_productos_poa_resultado.estado !== '3' ){
                    vw_productos_poa_resultado.anadirComentario ().then(function (rs_c) {
                        if (rs_c){
                            resolve(true);
                        }else
                        {
                            SWEETALERT.show({message: `Debe añadir un comentario`});
                        }
                    });
                }else{
                    resolve(true);
                }
            });

            vw_productos_poa_resultado.triggers.table.after.update = function (data) {
                if(vw_productos_poa_resultado.estado == ENUM_2.productos_estatus.Detenido.toString()){
                    BASEAPI.updateall('actividades_poa',{
                        "estatus":ENUM_2.actividad_poa_estatus.Detenida,
                        where:[
                            {
                                "field": "producto",
                                "value": vw_productos_poa_resultado.id
                            },
                            {
                                "field": "estatus",
                                "value": ENUM_2.actividad_poa_estatus.Abierta
                            }

                        ]
                    },function(result){

                    });
                }else if(vw_productos_poa_resultado.estado == ENUM_2.productos_estatus.Abierto.toString()){
                    BASEAPI.updateall('actividades_poa',{
                        "estatus":ENUM_2.actividad_poa_estatus.Abierta,
                        where:[
                            {
                                "field": "producto",
                                "value": vw_productos_poa_resultado.id
                            },
                            {
                                "field": "estatus",
                                "value": ENUM_2.actividad_poa_estatus.Detenida
                            }

                        ]
                    },function(result){

                    });
                }
            };

        }
    };
    vw_productos_poa_resultado.isActivComplete = function () {
        BASEAPI.first('vw_get_cant_activ_prod',{
            where: [{
                field: "id",
                value: vw_productos_poa_resultado.id
            }]
        },function(result){
            if (result){vw_productos_poa_resultado.siNo = 1;}else {vw_productos_poa_resultado.siNo = 0;}
        });
    };

});