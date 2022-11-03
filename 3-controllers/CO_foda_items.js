app.controller("foda_items", function ($scope, $http, $compile) {
    foda_items = this;
    RUNCONTROLLER("foda_items", foda_items, $scope, $http, $compile);
    var user = new SESSION().current();
    foda_items.pei_id = user.pei_id === null ? 0 : user.pei_id;
    foda_items.compania_id = user.compania_id;
    foda_items.types = 1;
    foda_items.foda_id = 0;
    foda_items.not_exists_pie = 0;
    foda_items.list_foda_items = [];
    foda_items.showTable = true;
    var paso = true;

    foda_items.triggers.table.before.load = () => new Promise((resolve, reject) => {
        if (user.pei_id) {
            foda_items.pei_id = user.pei_id;
            foda_items.not_exists_pie = 1;
            BASEAPI.first('foda', {
                where: [{
                    "field": "pei",
                    "value": user.pei_id
                }]
            }, function (result) {
                if (result) {
                    foda_items.foda_id = result.id;
                } else {
                    BASEAPI.insertID(
                        'foda',
                        {
                            "pei": foda_items.pei_id,
                            "created_at": new date().now(),
                            "created_by": user.usuario_id
                        },'','',function (result) {
                            foda_items.foda_id = result.data.data[0].id;
                            console.log(result);
                    });
                }
            });
        } else {
            foda_items.not_exists_pie = 0;
        }
        foda_items.fixFilters = [
            {
                "field": "pei",
                "value": foda_items.pei_id
            },
            {
                "field": "type",
                "value": foda_items.types
            }
        ];
        foda_items.refreshAngular();
        resolve(true);
    });
    foda_items.triggers.table.after.load = function (record) {
        check_active_PEI(user.pei_id);
    };
    RUN_B("foda_items", foda_items, $scope, $http, $compile);
    foda_items.plural = MESSAGE.i('planificacion.titleFoda');
    foda_items.titlePop = MESSAGE.i('planificacion.titleFodaFortalezas');

    title_header_table_pei(foda_items,MESSAGE.i('planificacion.titleFoda'));
    // foda_items.triggers.table.after.audit = () => new Promise(async (resolve, reject) => {
    //     if (dragon_audit.storageModel == "vw_foda_items") {
    //         if (dragon_audit.dataForView.action == "insert") {
    //             dragon_audit.dataForView.dataJson.type =
    //                 await foda_items.runMagicColumAudit('foda_type',
    //                     dragon_audit.dataForView.dataJson.type,
    //                     'id', 'nombre');
    //
    //             dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
    //                 ["id", "type","description"]);
    //         }
    //
    //         if (dragon_audit.dataForView.action == "update") {
    //             dragon_audit.dataForView.dataJson.type =
    //                 await foda_items.runMagicColumAudit('foda_type',
    //                     dragon_audit.dataForView.dataJson.type,
    //                     'id', 'nombre');
    //
    //             dragon_audit.dataForView.updatedJson.type =
    //                 await foda_items.runMagicColumAudit('foda_type',
    //                     dragon_audit.dataForView.updatedJson.type,
    //                     'id', 'nombre');
    //
    //             dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
    //                 ["id", "type","description"]);
    //
    //             dragon_audit.dataForView.updatedJson = DSON.removeOther(dragon_audit.dataForView.updatedJson,
    //                 ["id", "type","description"]);
    //         }
    //
    //         if (dragon_audit.dataForView.action == "delete") {
    //             dragon_audit.dataForView.dataJson.type =
    //                 await foda_items.runMagicColumAudit('foda_type',
    //                     dragon_audit.dataForView.dataJson.type,
    //                     'id', 'nombre');
    //
    //             dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson,
    //                 ["id", "type","descripcion"]);
    //         }
    //     }
    //     resolve(true);
    // });

    foda_items.formulary = function (data, mode, defaultData) {
        if (foda_items !== undefined) {
            RUN_B("foda_items", foda_items, $scope, $http, $compile);
            foda_items.form.titles = {
                new: foda_items.titlePop,
                edit: "Editar - "+` ${foda_items.titlePop}`,
                view: "Ver ALL - "+`${foda_items.titlePop}`
            };
            // foda_items.form.before.insert = function (data) {
            //     if (foda_items.foda_id === 0 && foda_items.not_exists_pie === 1) {
            //         BASEAPI.insertID(
            //             'foda',
            //             {
            //                 "pei": foda_items.pei_id,
            //                 "created_at": new date().now(),
            //                 "created_by": user.usuario_id
            //             }, '', '', function (result) {
            //                 if (result) {
            //                     foda_items.foda_id = result.data.data[0].id;
            //
            //                     BASEAPI.insert('foda_items', [
            //                         {
            //                             "foda": result.data.data[0].id,
            //                             "type": foda_items.types,
            //                             "description": data.inserting.description,
            //                             "num": 1
            //                         },
            //                     ], function (result) {
            //                         foda_items.form.mode = FORM.modes.edit;
            //                         foda_items.pages.form.close();
            //                         SWEETALERT.stop();
            //                     });
            //                 }
            //             });
            //         return true;
            //     } else if (foda_items.not_exists_pie === 0) {
            //         SWEETALERT.show({message: "No existe un PEI activo"});
            //         return true;
            //     }
            //     return false;
            // };
            foda_items.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                if (foda_items.not_exists_pie === 0) {
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
            foda_items.form.readonly = {foda: foda_items.foda_id, type: foda_items.types};
            foda_items.createForm(data, mode, defaultData);
            foda_items.$scope.$watch('foda_items.description', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(foda_items, "description", rules)
            });
        }
    };
    foda_items.showTab = function(title,type,name){
        foda_items.titlePop = MESSAGE.i(title);
        foda_items.types = type;
        foda_items.refresh();
        foda_items.showTable = true;
        $('.tab-content ul li.active a.ng-binding ').html('<i class="icon-lifebuoy position-left"></i>'+name);
    };

    foda_items.fodas = async function () {
        foda_items.showTable = false;
        console.log("entre");
        BASEAPI.listp('vw_foda_items', {
            limit: 0,
            orderby:'num',
            where: [{
                field: "foda",
                value: foda_items.foda_id
            }]
        }).then(function(rs) {
            if(rs.data.length > 0){
                foda_items.list_foda_items = [];
                for (var value of rs.data) {
                    foda_items.list_foda_items.push({
                        "id": value.id,
                        "type": value.type,
                        "descripcion": value.descripcion,
                        "cantidad": value.cantidad
                    });
                }
            }
            if (paso) {
                $('.tab-content ul li.active a.ng-binding ').html('<i class="icon-lifebuoy position-left"></i> Fortalezas');
                paso = false;
            }
            foda_items.refreshAngular();
        });
    };
    foda_items.fodasFromEstrategia = async function (id) {
        await BASEAPI.listp('vw_foda_items', {
            limit: 0,
            orderby:'num',
            where: [{
                field: "id",
                value: id
            }]
        }).then(function(rs) {
            foda_items.itemsFromEstrategia = rs.data;
            foda_items.refreshAngular();
        });
    };
    foda_items.relateditems = async function(id) {
           foda_items.dataValues =  await getRelationData('estrategia_foda', "foda", id);
            foda_items.dataValuesIDs = [];
           for (var i of foda_items.dataValues) {
               foda_items.dataValuesIDs.push(i.estrategia);
           }
           foda_items.modalAction('vw_estrategia_foda', 'Lista de estrategias', 'icon-clipboard3', 'list', {});
        };
    foda_items.calculateEqualize = async function(){
        equlizer('pesupuesto');
    };
});