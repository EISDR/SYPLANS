app.controller("drp_productos_poa", function ($scope, $http, $compile) {
    drp_productos_poa = this;
    drp_productos_poa.session = new SESSION().current();
    drp_productos_poa.group_caracteristica = drp_productos_poa.session.groups[0] ? drp_productos_poa.session.groups[0].caracteristica : "";
    drp_productos_poa.director_general = "DG";
    drp_productos_poa.director_departamental = "DP";
    drp_productos_poa.analista_de_planificacion = "AP";
    drp_productos_poa.analista_departamental  = "AD";
    drp_productos_poa.solo_lectura = "SL";
    drp_productos_poa.pei = 0;
    drp_productos_poa.poa = 0;
    drp_productos_poa.validar_departamento = true;
    drp_productos_poa.insert_readonly = {};//829 741 2614

    if(drp_productos_poa.group_caracteristica == drp_productos_poa.director_departamental || drp_productos_poa.group_caracteristica == drp_productos_poa.analista_departamental ){
        drp_productos_poa.departamento =  new SESSION().current().departamento;
        drp_productos_poa.validar_departamento = false ;
        // drp_productos_poa.insert_readonly = {poa: new SESSION().current().poa_id, departamento: new SESSION().current().departamento};
        drp_productos_poa.fixFilters = [
            {
                "field": "poa_id",
                "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
            },
            {
                "field": "id_departamento",
                "value": drp_productos_poa.departamento
            }
        ];
    }else{
        // drp_productos_poa.insert_readonly = {poa: new SESSION().current().poa_id, departamento: new SESSION().current().departamento};
        drp_productos_poa.fixFilters = [{
            "field": "poa_id",
            "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
        }];
    }

    if (typeof indicador_poa != 'undefined') {
        if (typeof indicador_poa != 'not defined') {
            if (indicador_poa) {
                if( indicador_poa.departamento != "0"){
                    drp_productos_poa.insert_readonly = {
                        poa: new SESSION().current().poa_id.toString(),
                        departamento: indicador_poa.departamento
                    };
                }
            }
        } else {
            drp_productos_poa.insert_readonly = {
                poa: new SESSION().current().poa_id.toString(),
                departamento: new SESSION().current().departamento.toString()
            };
        }
    } else {
        drp_productos_poa.insert_readonly = {
            poa: new SESSION().current().poa_id.toString(),
            departamento: new SESSION().current().departamento.toString()
        };
    }
    // if( indicador_poa.departamento != "0"){
        // drp_productos_poa.insert_readonly = {
        //     poa: new SESSION().current().poa_id.toString(),
        //     departamento: indicador_poa.departamento
        // };
        // console.log('1');
    // } else  {
    //     drp_productos_poa.insert_readonly = {
    //         poa: new SESSION().current().poa_id.toString(),
    //         departamento: new SESSION().current().departamento.toString()
    //     };
        // console.log('2');
    // }

    TRIGGER.run(drp_productos_poa);
    drp_productos_poa.getPOAstatus = async function() {
        drp_productos_poa.poa_ = await BASEAPI.listp("poa", {
            where: [{
                field: 'id',
                operator: "=",
                value: drp_productos_poa.session.poa_id
            }]
        });
        if (typeof drp_productos_poa.poa_.data !== 'undefined') {
            drp_productos_poa.estatus_poa = drp_productos_poa.poa_.data[0].estado;
            drp_productos_poa.condicion_poa = drp_productos_poa.poa_.data[0].activo;
        }
    };
    drp_productos_poa.getPOAstatus();
    drp_productos_poa.triggers.table.after.load = function (record){
        if (drp_productos_poa.GROUPS == "2" || drp_productos_poa.GROUPS == "7"){

        }
        if (drp_productos_poa.condicion_poa == ENUM_2.poa_estatus.Inactivo) {
            drp_productos_poa.setPermission("add",false);
        }
    };

    RUNCONTROLLER("drp_productos_poa", drp_productos_poa, $scope, $http, $compile);
    drp_productos_poa.singular = MESSAGE.i('planificacion.titleProducto');
    drp_productos_poa.plural = MESSAGE.i('planificacion.titleProductos');
    // drp_productos_poa.headertitle = ;
    drp_productos_poa.anadirComentario = (data) => new Promise((resolve, reject) => {
        if( drp_productos_poa.comentario == ""){
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }else{
            BASEAPI.insertp('comentarios',
                {
                    "comentario": drp_productos_poa.comentario,
                    "type": 6,
                    "created_by": drp_productos_poa.session.usuario_id,
                    "value": drp_productos_poa.id,
                    "value2": drp_productos_poa.estado
                }).then(function (rs) {
                comentarios_productos_poa.refresh();
                drp_productos_poa.comentario = "";
                drp_productos_poa.refreshAngular();
                resolve(true);
            });
        }
    });
    drp_productos_poa.formulary = function (data, mode, defaultData) {
        if (drp_productos_poa !== undefined) {
            RUN_B("drp_productos_poa", drp_productos_poa, $scope, $http, $compile);
            drp_productos_poa.form.titles = {
                new: MESSAGE.i('planificacion.titleProductoPOA'),
                edit: "Editar - "+` ${MESSAGE.i('planificacion.titleProductoPOA')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleProductoPOA')}`
            };
            drp_productos_poa.no_repetir = true;
            drp_productos_poa.selectQueries["resultado"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().estatus ?  new SESSION().current().pei_id : 0
                }
            ];

            drp_productos_poa.presupuesto_departamento = [];
            BASEAPI.listp('presupuesto_aprobado', {
                "where": [
                    {
                        "field": "poa",
                        "value": new SESSION().current().estado ? new SESSION().current().poa_id : 0
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
                    drp_productos_poa.presupuesto_departamento.push(pd.departamento);
                }

                drp_productos_poa.selectQueries["departamento"] = [
                    {
                        "field": "compania",
                        "value": new SESSION().current().compania_id
                    },
                    {
                        "field": "id",
                        "value": drp_productos_poa.presupuesto_departamento
                    }
                ];

                drp_productos_poa.form.loadDropDown('departamento');

            });
            drp_productos_poa.form.schemas.insert.comentario = FORM.schemasType.calculated;
            drp_productos_poa.form.readonly = drp_productos_poa.insert_readonly;
            drp_productos_poa.createForm(data, mode, defaultData);
            drp_productos_poa.old_estado = 0;
            drp_productos_poa.siNo = 0;
            drp_productos_poa.triggers.table.after.control = function (data) {
                if (mode !== 'new' && data === 'nombre')
                    drp_productos_poa.isActivComplete();

                if(mode !== 'new' && data == 'estado'){
                    drp_productos_poa.old_estado = drp_productos_poa.estado;
                    if (drp_productos_poa.no_repetir){
                        if(drp_productos_poa.old_estado == ENUM_2.productos_estatus.Detenido.toString()){
                            drp_productos_poa.selectQueries["estado"] = [
                                {
                                    "field": "id",
                                    "value": [ENUM_2.productos_estatus.Abierto,ENUM_2.productos_estatus.Detenido]
                                }
                            ];
                            drp_productos_poa.no_repetir = false;
                            drp_productos_poa.form.loadDropDown('estado');
                        } else if (drp_productos_poa.old_estado == ENUM_2.productos_estatus.Abierto.toString() && drp_productos_poa.siNo == 0 ){
                            drp_productos_poa.selectQueries["estado"] = [
                                {
                                    "field": "id",
                                    "value": [ENUM_2.productos_estatus.Abierto,ENUM_2.productos_estatus.Detenido]
                                }
                            ];
                            drp_productos_poa.no_repetir = false;
                            drp_productos_poa.form.loadDropDown('estado');
                        }else{
                            drp_productos_poa.form.options.nombre.disabled = true;
                            drp_productos_poa.form.options.resultado.disabled = true;
                            drp_productos_poa.form.options.nombre.disabled = true;
                            drp_productos_poa.form.options.estado.disabled = true;
                            drp_productos_poa.no_repetir = false;
                            drp_productos_poa.form.loadDropDown('estado');
                        }
                    }
                }

                if (mode === 'new' && data == 'range_date') {
                    drp_productos_poa.range_date = "";
                    drp_productos_poa.refreshAngular();
                }
                if(mode === 'new' && data === 'estado'){
                    drp_productos_poa.no_repetir_false = false;
                    drp_productos_poa.estado = ENUM_2.productos_estatus.Abierto.toString();
                    drp_productos_poa.form.options.estado.disabled = true;
                    drp_productos_poa.refreshAngular();
                }
            };


            drp_productos_poa.$scope.$watch('drp_productos_poa.nombre',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_productos_poa, "nombre", rules)
            });
            drp_productos_poa.$scope.$watch('drp_productos_poa.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_productos_poa, "descripcion", rules);
            });
            drp_productos_poa.$scope.$watch('drp_productos_poa.fecha_inicio',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_productos_poa, "fecha_inicio", rules);
            });
            drp_productos_poa.$scope.$watch('drp_productos_poa.fecha_fin',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_productos_poa, "fecha_fin", rules)
            });
            drp_productos_poa.$scope.$watch('drp_productos_poa.range_date',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_productos_poa, "fecha_inicio", rules);
                VALIDATION.validate(drp_productos_poa, "range_date", rules);
            });
            drp_productos_poa.$scope.$watch('drp_productos_poa.resultado',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_productos_poa, "resultado", rules)
            });
            drp_productos_poa.$scope.$watch('drp_productos_poa.estado',function (value){
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_productos_poa, "estado", rules)
            });

            drp_productos_poa.res = false ;
            drp_productos_poa.form.before.insert = function (data) {
                if(drp_productos_poa.res)
                    return false;
                drp_productos_poa.res =true;
                drp_productos_poa.respuesta = [];
                // if( indicador_poa.departamento != "0"){
                //     // SWEETALERT.show({message: `Necesitas seleccionar un departamento`});
                //     // data.inserting.departamento = indicador_poa.departamento;
                //
                //     drp_productos_poa.insert_readonly = {
                //         poa: new SESSION().current().poa_id.toString(),
                //         departamento: indicador_poa.departamento
                //     };
                //     console.log('1',data);
                // } else  {
                //     drp_productos_poa.insert_readonly = {
                //         poa: new SESSION().current().poa_id.toString(),
                //         departamento: new SESSION().current().departamento.toString()
                //     };
                //     // poa: new SESSION().current().poa_id, departamento: new SESSION().current().departamento
                //     // data.inserting.poa = new SESSION().current().poa_id.toString();
                //     // data.inserting.departamento = new SESSION().current().departamento.toString();
                //     console.log('2',data);
                // }
                BASEAPI.first('presupuesto_aprobado', {
                    "where": [
                        {
                            "field": "poa",
                            "value": new SESSION().current().poa_id
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
                        drp_productos_poa.res = false;
                    }else{
                        if (result.valor > 0) {
                            drp_productos_poa.form.saveAction();
                            SWEETALERT.stop();
                        }
                        else {
                            SWEETALERT.show({message: `Este departamento no tiene un presupuesto asignado`});
                            drp_productos_poa.res = false;
                        }
                    }
                });

                return true;
            };

            drp_productos_poa.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                // if(indicador_poa.departamento != "0"){
                //     // SWEETALERT.show({message: `Necesitas seleccionar un departamento`});
                //     // return true;
                //     drp_productos_poa.insert_readonly = {
                //         poa: new SESSION().current().poa_id.toString(),
                //         departamento: indicador_poa.departamento
                //     };
                //     console.log('3-',data);
                // } else  {
                //     console.log('4',data);
                //     drp_productos_poa.insert_readonly = {
                //         poa: new SESSION().current().poa_id.toString(),
                //         departamento: new SESSION().current().departamento.toString()
                //     };
                // }
                if(drp_productos_poa.old_estado.toString() !== drp_productos_poa.estado && drp_productos_poa.estado !== '3' ){
                    drp_productos_poa.anadirComentario ().then(function (rs_c) {
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

        drp_productos_poa.triggers.table.after.update = function (data) {
            if(drp_productos_poa.estado == ENUM_2.productos_estatus.Detenido.toString()){
                BASEAPI.updateall('actividades_poa',{
                    "estatus":ENUM_2.actividad_poa_estatus.Detenida,
                    where:[
                        {
                            "field": "producto",
                            "value": drp_productos_poa.id
                        },
                        {
                            "field": "estatus",
                            "value": ENUM_2.actividad_poa_estatus.Abierta
                        }

                    ]
                },function(result){

                });
            }else if(drp_productos_poa.estado == ENUM_2.productos_estatus.Abierto.toString()){
                BASEAPI.updateall('actividades_poa',{
                    "estatus":ENUM_2.actividad_poa_estatus.Abierta,
                    where:[
                        {
                            "field": "producto",
                            "value": drp_productos_poa.id
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

    drp_productos_poa.isActivComplete = function () {
        BASEAPI.first('vw_get_cant_activ_prod',{
            where: [{
                field: "id",
                value: drp_productos_poa.id
            }]
        },function(result){
            if (result){drp_productos_poa.siNo = 1;}else {drp_productos_poa.siNo = 0;}
        });
    };

});