app.controller("proyecto_item", function ($scope, $http, $compile) {
    proyecto_item = this;
    proyecto_item.session = new SESSION().current();
    proyecto_item.paso = false;
    proyecto_item.currentdate = moment().format("YYYY-MM-DD");
    proyecto_item.fixFilters = [
        {
            field: "compania_id",
            value: proyecto_item.session.compania_id
        },
        {
            "field": "institucion",
            "operator": proyecto_item.session.institucion_id ? "=" : "is",
            "value": proyecto_item.session.institucion_id ? proyecto_item.session.institucion_id : "$null"
        }
    ];
    if (MODAL.history.length > 0) {
        if (typeof vw_dashboard_proyecto != "undefined") {
            if (vw_dashboard_proyecto) {
                if (typeof vw_dashboard_proyecto !== 'not defined') {
                    if (!proyecto_item.paso) {
                        proyecto_item.fixFilters = [];
                        if (vw_dashboard_proyecto.Mproductos == "sin información") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": -1
                                }
                            ];
                        }
                        if (vw_dashboard_proyecto.Mproductos == " ") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id,
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento,
                                });
                        }
                        if (vw_dashboard_proyecto.Mproductos == "planificados") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id,
                                },
                                {
                                    "field": "from",
                                    "operator": ">",
                                    "value": proyecto_item.currentdate
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (1)`
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mproductos == "iniciados") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "from",
                                    "operator": "<=",
                                    "value": proyecto_item.currentdate
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (1)`
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mproductos == "en proceso") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (2)`
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mproductos == "vencidos") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "to",
                                    "operator": "<",
                                    "value": proyecto_item.currentdate
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (1)`
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mproductos == "finalizados") {
                            proyecto_item.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (3)`
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        proyecto_item.paso = true;
                    }
                }
            }
        }
    }
    proyecto_item.singular = "Proyectos Especiales";
    proyecto_item.plural = "Proyectos Especiales";
    proyecto_item.headertitle = "Proyectos Especiales";
    //proyecto_item.destroyForm = false;
    //proyecto_item.permissionTable = "tabletopermission";
    RUNCONTROLLER("proyecto_item", proyecto_item, $scope, $http, $compile);
    proyecto_item.formulary = async function (data, mode, defaultData) {
        if (proyecto_item !== undefined) {
            RUN_B("proyecto_item", proyecto_item, $scope, $http, $compile);
            proyecto_item.form.modalWidth = ENUM.modal.width.full;
            proyecto_item.form.titles = {
                new: "Nuevo Proyecto/Producto",
                edit: "Editar - Proyecto/Producto",
                view: "Ver Proyecto/Producto"
            };
            proyecto_item.form.readonly = {
                compania: proyecto_item.session.compania_id,
                pei: proyecto_item.session.pei_id
            };
            proyecto_item.firststatus = await BASEAPI.firstp('proyecto_estatus', {
                order: "asc",
                where: [
                    {
                        field: "id",
                        value: 1
                    }
                ]
            });
            proyecto_item.selectQueries['estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: proyecto_item.session.groups[0].id
                },
                {
                    field: 'entidad',
                    operator: '=',
                    value: "proyecto_item"
                }
            ];
            proyecto_item.createForm(data, mode, defaultData);
            $scope.$watch("proyecto_item.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'nombre', rules);
            });
            $scope.$watch("proyecto_item.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item.presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                proyecto_item.presupuesto_total_restante =  proyecto_item.presupuesto_restante_calculate();
                VALIDATION.validate(proyecto_item, 'presupuesto', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item.departamento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'departamento', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item.resultado", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'resultado', rules);
            });
            $scope.$watch("proyecto_item.range_date", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, "from", rules);
                VALIDATION.validate(proyecto_item, "range_date", rules);
            });
            $scope.$watch("proyecto_item.to", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'to', rules);
            });
            $scope.$watch("proyecto_item.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'responsable', rules);
            });
            $scope.$watch("proyecto_item.estatus", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item, 'estatus', rules);
            });
        }
        // proyecto_item.triggers.table.after.control = async function (data) {
        //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        // };
    };
    proyecto_item.triggers.table.after.load = function (records) {
        proyecto_item.runMagicManyToMany('involucrado', "involucrados", "proyecto_item", "id", 'nombre_completo', "proyecto_item_involucrado", "involucrado", "id");
        proyecto_item.runMagicManyToMany('ods', "ods", "proyecto_item", "id", 'nombre', "proyecto_item_ods", "ods", "id");
        proyecto_item.runMagicOneToMany('actividades', 'proyecto_item_actividad', 'proyecto_item', 'nombre', 'id');
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    proyecto_item.triggers.table.after.open = function (data) {
        //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
        proyecto_item.get_presupuesto_restante();
    };
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
    proyecto_item.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (proyecto_item.estatus == 3) {
            if (proyecto_item.puede_completar == 'No') {
                SWEETALERT.show({
                    type: 'error',
                    message: "El estatus del proyecto no puede ser cambiado al estatus seleccionado, para hacer lo deseado debes COMPLETAR o CANCELAR sus Actividades. Favor Revisar"
                });
                var buttons = document.getElementsByClassName("btn btn-labeled");
                for (var item of buttons) {
                    item.disabled = false;
                }
                return;
            }
        }
        if (proyecto_item.presupuesto_consumido > data.inserting.presupuesto){
            SWEETALERT.show({
                type: 'error',
                message: `El presupuesto del producto no puede ser menor a la sumatoria de los presupuestos de las actividades que es: ` + LAN.money(proyecto_item.presupuesto_consumido).format(true),
            });
            resolve(false);
        }
        if(DSON.oseaX(proyecto_item.presupuesto)) {
            data.inserting.presupuesto  = "$null"
        }
        data.inserting.estatus = 1;
        if (!proyecto_item.session.insttitucion_id)
            delete data.inserting.institucion;
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    proyecto_item.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        if (!proyecto_item.allow_auth(proyecto_item.estatus)){
            console.log()
            SWEETALERT.show({
                type: 'error',
                message: `El proyecto no puede ser finalizado debido a que no todas sus actividades están completadas o canceladas`,
            });
            resolve(false);
        }
        if (proyecto_item.presupuesto_consumido > data.updating.presupuesto){
            SWEETALERT.show({
                type: 'error',
                message: `El presupuesto del producto no puede ser menor a la sumatoria de los presupuestos de las actividades que es: ` + LAN.money(proyecto_item.presupuesto_consumido).format(true),
            });
            resolve(false);
        }
        if(DSON.oseaX(proyecto_item.presupuesto)) {
            data.updating.presupuesto  = "$null"
        }
        if (!proyecto_item.session.insttitucion_id)
            delete data.updating.institucion;
        resolve(true);
    });
    proyecto_item.get_presupuesto_restante = async function() {
        proyecto_item.lista_actividades = await BASEAPI.listp('vw_proyecto_item_actividad',{
            limit: 0,
            where: [
                {
                    open: "(",
                    field: "proyecto_item",
                    operator: "=",
                    value: proyecto_item.id ? proyecto_item.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: proyecto_item.proyecto_item_actividad || -1
                },
            ]
        });
        proyecto_item.lista_actividades = proyecto_item.lista_actividades.data;
        proyecto_item.presupuesto_consumido = 0;
        proyecto_item.presupuesto_restante = 0;
        for(var i of proyecto_item.lista_actividades){
            proyecto_item.presupuesto_consumido += i.presupuesto;
        }
        proyecto_item.presupuesto_restante = proyecto_item.presupuesto_DragonClean - proyecto_item.presupuesto_consumido;
        proyecto_item.presupuesto_total_restante = proyecto_item.presupuesto_restante_calculate();
        proyecto_item.refreshAngular();
    }
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
    proyecto_item.presupuesto_restante_calculate = function () {
        if (proyecto_item.presupuesto_DragonClean > 0) {
            var PY_PR = LAN.money(proyecto_item.presupuesto).value;
            var PA_PR = LAN.money(proyecto_item.presupuesto_consumido).value;

            var RESTANTE = (PY_PR - PA_PR)
            return LAN.money(RESTANTE).format(false);
        }
    };
    proyecto_item.insert_products = async function () {
        var productos_estrategigos = await BASEAPI.listp('proyecto_item', {
            limit: 0,
            where: [
                {
                    field: "heredado",
                    operator: "is",
                    value: "$null"
                },
                {
                    field: "compania",
                    value: proyecto_item.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator": proyecto_item.session.institucion_id ? "=" : "is",
                    "value": proyecto_item.session.institucion_id ? proyecto_item.session.institucion_id : "$null"
                }
            ]
        });
        if (productos_estrategigos.data.length > 0) {
            var template = ` Los siguientes Productos Estratégicos formarán parte de los Productos Operativos <br> <div style="text-align: center;"> <ul style="display: inline-block;text-align: left;">`;
            for (var i of productos_estrategigos.data) {
                template += `<li> <strong> ${i.nombre}</strong></li>`;
            }
            template += `</ul> </div> <p>Una vez estos sean envíados no se podrá deshacer esta acción</p> <p>¿Desea Proceder de todos modos?</p>`;
            SWEETALERT.confirm({
                message: template,
                confirm: async function () {
                    SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                    SERVICE.base_db.importProductos({compania: proyecto_item.session.compania_id}, function (result) {
                        SWEETALERT.stop()
                        SWEETALERT.show({message: "Han sido transferidos los Proyectos/Productos Estratégicos de manera satisfactoria"});
                    });
                }
            });
        } else {
            SWEETALERT.show({
                type: "error",
                message: "No existen Proyectos/Productos Estratégicos disponibles para ser transferidos"
            })
        }

    };

    proyecto_item.allow_auth = function (estatus) {
        if (proyecto_item.lista_actividades.length > 0){
            if (proyecto_item.allowAction("Finalizar", "proyecto_item", estatus)) {
                var actividades_canceladas_completadas = proyecto_item.lista_actividades.filter(d => {
                    return d.estatus_id == 6 || d.estatus_id == 5;
                })
                if (proyecto_item.lista_actividades.length > 0) {
                    return actividades_canceladas_completadas.length === proyecto_item.lista_actividades.length;
                } else {
                    return false
                }
            } else {
                return true;
            }
        }else{
            return true;
        }
    }
});
