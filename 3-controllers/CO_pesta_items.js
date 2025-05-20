app.controller("pesta_items", function ($scope, $http, $compile) {
    pesta_items = this;
    var user = new SESSION().current();
    pesta_items.compania_id = user.compania_id;
    pesta_items.pei_id = 0;
    pesta_items.type = 1;
    pesta_items.not_exists_pie = 0;
    pesta_items.pesta_id = 0;
    pesta_items.showTable = true;
    var paso = true;

    TRIGGER.run(pesta_items);
    pesta_items.triggers.table.before.load = () => new Promise((resolve,reject)=> {
        if (user.pei_id){
            pesta_items.pei_id = user.pei_id;
            pesta_items.not_exists_pie = 1;
            BASEAPI.first('pesta',{
                where: [{
                    "field": "pei",
                    "value": user.pei_id
                }]
            },function (result) {
                if(result) {
                    pesta_items.pesta_id = result.id;
                    BASEAPI.list('pesta_items',{
                            limit: 0,
                            orderby:'num',
                            where: [{
                                field: "pesta",
                                value: pesta_items.pesta_id
                            }]
                        },
                        function (result2) {
                            pesta_items.list_pesta_items = [];
                            for (var value of result2.data){
                                pesta_items.list_pesta_items.push({"type":value.pesta_type,"description":value.description});
                            }
                        });
                } else {
                    BASEAPI.insertID(
                        'pesta',
                        {
                            "pei": pesta_items.pei_id,
                            "created_at": new date().now(),
                            "created_by": user.usuario_id
                        },'','',function (result) {
                            pesta_items.pesta_id = result.data.data[0].id;
                            console.log(result);
                        });
                }
            });
        }  else {
            pesta_items.not_exists_pie = 0;
        }
        pesta_items.fixFilters = [
            {
                "field": "pei",
                "value": pesta_items.pei_id
            },
            {
                "field": "tipo_pesta_id",
                "value": pesta_items.type
            }
        ];
        pesta_items.refreshAngular();
        resolve(true);
    });
    pesta_items.triggers.table.after.load = function (record) {
        check_active_PEI(user.pei_id, pesta_items);
    };
    pesta_items.triggers.table.after.audit = () => new Promise(async (resolve, reject) => {
        if (dragon_audit.storageModel == "vw_pesta_items") {
            if (dragon_audit.dataForView.action == "insert") {
                dragon_audit.dataForView.dataJson.pesta_type =
                    await pesta_items.runMagicColumAudit('pesta_type',
                        dragon_audit.dataForView.dataJson.pesta_type,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "pesta_type","description"]);
            }

            if (dragon_audit.dataForView.action == "update") {
                dragon_audit.dataForView.dataJson.pesta_type =
                    await pesta_items.runMagicColumAudit('pesta_type',
                        dragon_audit.dataForView.dataJson.pesta_type,
                        'id', 'nombre');

                dragon_audit.dataForView.updatedJson.pesta_type =
                    await pesta_items.runMagicColumAudit('pesta_type',
                        dragon_audit.dataForView.updatedJson.pesta_type,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "pesta_type","description"]);

                dragon_audit.dataForView.updatedJson = DSON.removeOther(dragon_audit.dataForView.updatedJson,
                    ["id", "pesta_type","description"]);
            }

            if (dragon_audit.dataForView.action == "delete") {
                dragon_audit.dataForView.dataJson.type =
                    await pesta_items.runMagicColumAudit('pesta_type',
                        dragon_audit.dataForView.dataJson.type,
                        'id', 'nombre');

                dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
                    ["id", "type","descripcion"]);
            }
        }
        resolve(true);
    });
    RUNCONTROLLER("pesta_items", pesta_items, $scope, $http, $compile);
    pesta_items.titlePop = MESSAGE.i('planificacion.titlePestaPolitico');
    pesta_items.plural = MESSAGE.i('planificacion.titlePesta');

    title_header_table_pei(pesta_items,MESSAGE.i('planificacion.titlePesta'));

    pesta_items.formulary = function (data, mode, defaultData) {
        if (pesta_items !== undefined) {
            RUN_B("pesta_items", pesta_items, $scope, $http, $compile);
            pesta_items.form.titles = {
                new: pesta_items.titlePop,
                edit: "Editar - "+`${pesta_items.titlePop}`,
                view: "Ver ALL - "+`${pesta_items.titlePop}`
            };

            pesta_items.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                if (pesta_items.not_exists_pie === 0) {
                    SWEETALERT.show({message: "No existe un PEI activo"});
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for(var item of buttons){
                        item.disabled = false;
                    }
                    resolve(false);
                }else  {
                    resolve(true);
                }
            });

            // pesta_items.form.before.insert = function(data){
            //     var userForm = new SESSION().current();
            //     if(pesta_items.pesta_id === 0 && pesta_items.not_exists_pie === 1){
            //         BASEAPI.insertID(
            //             'pesta',
            //             {
            //                 "pei": pesta_items.pei_id,
            //                 "created_at": new date().now(),
            //                 "created_by": userForm.usuario_id
            //             },'','',function (result) {
            //
            //                 pesta_items.pesta_id = result.data.data[0].id;
            //
            //                 BASEAPI.insert('pesta_items',[
            //                     {
            //                         "pesta": result.data.data[0].id,
            //                         "pesta_type": pesta_items.type,
            //                         "description": data.inserting.description,
            //                         "num": 1
            //                     },
            //                 ],function (result) {
            //                     pesta_items.form.mode = FORM.modes.edit;
            //                     pesta_items.pages.form.close();
            //                     SWEETALERT.stop();
            //                 });
            //             });
            //
            //         return true;
            //     }  else if (pesta_items.not_exists_pie === 0) {
            //         SWEETALERT.show({message: "No existe un PEI activo"});
            //         return true;
            //     }
            //
            //     return false;
            // };

            pesta_items.form.readonly = {pesta: pesta_items.pesta_id, pesta_type: pesta_items.type};
            pesta_items.createForm(data, mode, defaultData);
            pesta_items.$scope.$watch('pesta_items.description',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pesta_items, "description", rules)
            });
        }
    };

    pesta_items.showTab = function(title,type,name){
        pesta_items.titlePop = MESSAGE.i(title);
        pesta_items.type = type;
        pesta_items.refresh();
        pesta_items.showTable = true;
        $('.tab-content ul li.active a.ng-binding ').html('<i class="icon-lifebuoy position-left"></i>'+name);
    };

    pesta_items.pestas = function () {
        pesta_items.showTable = false;
        BASEAPI.listp('vw_pesta_items',{
                limit: 0,
                orderby:'num',
                where: [{
                    field: "pesta_id",
                    value: pesta_items.pesta_id
                }]
            }).then (function (result2) {
                if(result2.data.length > 0 ){
                    pesta_items.list_pesta_items = [];
                    for (var value of result2.data){
                        pesta_items.list_pesta_items.push({
                            "id": value.id,
                            "type": value.tipo_pesta_id,
                            "descripcion": value.descripcion,
                            "cantidad": value.cantidad
                        });
                    }
                }
                if (paso) {
                    $('.tab-content ul li.active a.ng-binding ').html('<i class="icon-lifebuoy position-left"></i> Político');
                    paso = false;
                }
                pesta_items.refreshAngular();

            });
    };
    pesta_items.pestasFromEstrategia = async function (id) {
        await BASEAPI.listp('vw_pesta_items', {
            limit: 0,
            orderby:'num',
            where: [{
                field: "id",
                value: id
            }]
        }).then(function(rs) {
            pesta_items.itemsFromEstrategia = rs.data;
            pesta_items.refreshAngular();
        });
    };
    pesta_items.relateditems = async function(id) {
        pesta_items.dataValues =  await getRelationData('estrategia_pesta', "pesta", id);
        pesta_items.dataValuesIDs = [];
        for (var i of pesta_items.dataValues) {
            pesta_items.dataValuesIDs.push(i.estrategia);
        }
        pesta_items.modalAction('vw_estrategia_foda', 'Lista de estrategias', 'icon-clipboard3', 'list', {});
    };
    pesta_items.calculateEqualize = function(){
        setTimeout(function () {
            equlizer('pesupuesto')
        },100);
    };
});