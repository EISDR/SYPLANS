app.controller("wizard", function ($scope, $http, $compile) {
    wizard = this;
    wizard.headertitle = "Wizard";
    // COMPILE.run(baseController, $scope, $compile);
    // MODAL.run(baseController,$compile);

    wizard.company = new SESSION().current().compania_id;

    BASEAPI.list('wizard', {
        limit: 0,
        page: 1,
        orderby: "id",
        order: "asc"
    }, function (result) {
        WIZARD = result;
        wizard.refreshAngular();
    });

    wizard.fixFilters = [
        {
            "field": "company_name",
            "value": wizard.company
        }
    ];


    wizard.state_of_wizard = true;

    RUNCONTROLLER("wizard", wizard, $scope, $http, $compile);
    wizard.triggers.table.after.load = async function (records) {
        wizard.runMagicColum('parent_entity', 'wizard', 'id', 'name');
    };


    wizard.triggers.table.after.update = async function (data) {

        // console.log(data.updating);
        // console.log(data.updating.name);
        // console.log(data.updating.count);
        // console.log(data.updating.complete);
        // console.log(data.updating.cant_records_require);


        if (data.updating.count >= data.updating.cant_records_require) {
            await BASEAPI.updateallp('wizard', {
                "complete": "true",
                where: [
                    {
                    "field": "name",
                    "operator": "=",
                    "value": data.updating.name
                    },
                    {
                        "field": "company_name",
                        "operator": "=",
                        "value": wizard.company,
                    }
                ]
            });
        } else{
            await BASEAPI.updateallp('wizard', {
                "complete": "false",
                where: [
                    {
                        "field": "name",
                        "operator": "=",
                        "value": data.updating.name
                    },
                    {
                        "field": "company_name",
                        "operator": "=",
                        "value": wizard.company,
                    }
                ]
            });
        }

    };

    wizard.start_wizard = function(enity) {

        //Fucion que iguala storage con base de datos
        BASEAPI.list('wizard', {}, async function(result){
            let model_name = "";
            for(let j = 0; j < result.data.length; j++) {
                model_name = result.data[j].name;

                //let count = await BASEAPI.firstp(model_name,{columns:["$count(0) as count"]});

                let count = await BASEAPI.firstp(model_name,{
                    columns:[
                        "$count(0) as count"
                    ],
                    where: [{"field": "compania", "operator": "=", "value": 13}]
                });


                console.log(count);

                await BASEAPI.updateallp('wizard', {
                    "count": count.count,
                    where: [
                        {
                        "field": "name",
                        "operator": "=",
                        "value": model_name
                        },
                        {
                            "field": "company_name",
                            "operator": "=",
                            "value": wizard.company,
                        }
                    ]
                });

            }
        });



        setTimeout(function() {
            //$('.rem').remove();
            var entityList = BASEAPI.list('wizard', {}, async function(result){

                for (let i = 0; i < result.data.length; i++) {
                    if(result.data[i].complete == "false") {
                        wizard.state_of_wizard = false;
                    }
                }

                console.log("Estate of wizard: " + wizard.state_of_wizard);

                // console.log(result);
                // /*---------------------------------------------------------------------*/

                if (wizard.state_of_wizard == true) {

                    wizard.wizard_steps = [];

                    let sup = 1;
                    wizard.wizard_steps.push([]);
                    let limit = CONFIG.wizardlimit;
                    let index = 1;
                    for (let item of result.data) {
                        // console.log(item);
                        if (item.complete == "false") {

                            if (item.count >= item.cant_records_require) {
                                wizard.percentage = 100;
                                await BASEAPI.updateallp('wizard', {
                                    "complete": "true",
                                    where: [
                                        {
                                        "field": "name",
                                        "operator": "=",
                                        "value": item.name
                                        },
                                        {
                                            "field": "company_name",
                                            "operator": "=",
                                            "value": wizard.company,
                                        }
                                    ]
                                });

                            } else {
                                wizard.percentage = Math.round((item.count / item.cant_records_require) * 100);
                            }
                        } else {
                            if (item.count < item.cant_records_require) {
                                await BASEAPI.updateallp('wizard', {
                                    "complete": "false",
                                    where: [
                                        {
                                        "field": "name",
                                        "operator": "=",
                                        "value": item.name
                                        },
                                        {
                                            "field": "company_name",
                                            "operator": "=",
                                            "value": wizard.company,
                                        }
                                    ]
                                });
                            }
                        }

                        ARRAY.last(wizard.wizard_steps).push({
                            name: item.name,
                            index: index,
                            complete: item.complete,
                            label: MESSAGE.ic("columns." + item.name),
                            cant_records_require: item.cant_records_require,
                            percentage: wizard.percentage
                        });
                        index++;
                        if ((sup % limit) === 0)
                            wizard.wizard_steps.push([]);
                        sup++;
                    }


                    setTimeout(function () {
                        $("[id$='circle']").percircle();
                    }, 100);

                    wizard.htmlStepsPer = `<ul class="remtop" ng-repeat="(key,row) in wizard.wizard_steps">
                                    <li  class="pointer ponterextra" style="text-align: center;" ng-repeat="(inx, value) in row" ng-class="value.name == wizard.controller ? 'current' : ''" repeatEnd=" $('[id$='circle']').percircle();">             
                                        <center>
                                        <a class="center-custom" ng-if="value.complete == 'true'" href="#" title="{{value.name}}">
                                            <span id="greencircle" data-percent="100" class="small green"></span>
                                        </a>
                                        <a class="center-custom" ng-if="value.complete == 'false'" href="#" title="{{value.name}}">
                                            <span id="greencircle" data-percent="{{value.percentage}}" class="small red"></span>
                                        </a>
                                        <label style="float: left;width: 100%;text-align: center">{{value.label}}</label>
                                        </center>
                                    </li>
                                </ul>`;

                    setTimeout(function () {
                        if (wizard.wizard_steps.length !== 0) {
                            $('.modal-body').prepend(wizard.returnBuild(wizard.htmlStepsPer));
                            wizard.refreshAngular();
                            $("[id$='circle']").percircle();

                        }

                    }, 100);

                    console.log('compeleto');
                }else {

                    wizard.wizard_steps = [];

                    let sup = 1;
                    wizard.wizard_steps.push([]);
                    let limit = CONFIG.wizardlimit;
                    let index = 1;
                    for (let item of result.data) {
                        // console.log(item);
                        if (item.complete == "false") {

                            if (item.count >= item.cant_records_require) {
                                wizard.percentage = 100;
                                await BASEAPI.updateallp('wizard', {
                                    "complete": "true",
                                    where: [
                                        {
                                        "field": "name",
                                        "operator": "=",
                                        "value": item.name
                                        },
                                        {
                                            "field": "company_name",
                                            "operator": "=",
                                            "value": wizard.company,
                                        }
                                    ]
                                });

                            } else {
                                wizard.percentage = Math.round((item.count / item.cant_records_require) * 100);
                            }
                        } else {
                            if (item.count < item.cant_records_require) {
                                await BASEAPI.updateallp('wizard', {
                                    "complete": "false",
                                    where: [
                                        {
                                        "field": "name",
                                        "operator": "=",
                                        "value": item.name
                                        },
                                        {
                                            "field": "company_name",
                                            "operator": "=",
                                            "value": wizard.company,
                                        }
                                    ]
                                });
                            }
                        }

                        ARRAY.last(wizard.wizard_steps).push({
                            name: item.name,
                            index: index,
                            complete: item.complete,
                            label: MESSAGE.ic("columns." + item.name),
                            cant_records_require: item.cant_records_require,
                            percentage: wizard.percentage
                        });
                        index++;
                        if ((sup % limit) === 0)
                            wizard.wizard_steps.push([]);
                        sup++;
                    }


                    setTimeout(function () {
                        $("[id$='circle']").percircle();
                    }, 100);


                    for (let i = 0; i < result.data.length; i++) {
                        //console.log(result.data[i]);
                        if (result.data[i].complete == "false") {
                            //if (result.data[i].cant_records_require > result.data[i].count) {
                            //console.log("Alo");
                            wizard.controller = result.data[i].name;
                            wizard.cant_records_require = result.data[i].cant_records_require;
                            wizard.count = result.data[i].count;
                            wizard.controller_id = result.data[i].id;
                            wizard.require_data = result.data[i].require;
                            break;
                        }

                    }

                    console.log(wizard.require_data);
                    if (wizard.require_data == 0) {
                        console.log("Igual a 0");
                    }

                    if (enity != undefined) {
                        wizard.controller = enity;
                    }

                    let modal = {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("columns." + wizard.controller),
                            icon: ''
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
                            sameController: wizard.controller
                        },
                        event: {
                            show: {
                                begin: function (data) {


                                },
                                end: function (data) {
                                    $('.remtop').remove();
                                    $('.cancelmodal').css('display', 'none');
                                    $('.take-off').remove();

                                    wizard.htmlButon = '<button dragonlanguage="" title="Siguiente" type="button" role="button" class=" btn bg-success-800 btn-labeled btn-xs pull-right rem" ng-click="wizard.nextC()"><b><i class="icon-arrow-right7"></i></b><language>Siguiente</language></button>';

                                    wizard.htmlButonNoRequire = '<button dragonlanguage="" title="Siguiente" type="button" role="button" class=" btn bg-success-800 btn-labeled btn-xs pull-right rem" ng-click="wizard.nextR(wizard.controller)"><b><i class="icon-arrow-right7"></i></b><language>Siguiente</language></button>';

                                    wizard.htmlButonComplete = '<button dragonlanguage="" title="Finalizar" type="button" role="button" class=" btn bg-success-800 btn-labeled btn-xs pull-right rem" ng-click="wizard.modelComplete()"><b><i class="icon-checkmark"></i></b><language>Finalizar</language></button>';

                                    wizard.htmlView = '<button dragonlanguage="" title="Ver resumen" type="button" role="button" class=" btn bg-success-800 btn-labeled btn-xs pull-right remtop" ng-click="wizard.viewAllEntity(wizard.controller)"><b><i class="icon-arrow-right7"></i></b><language>Ver resumen</language></button>';

                                    wizard.cancelButon = '<button dragonlanguage="" title="Omitir modo asistido" type="button" role="button" class="remtop btn bg-info btn-labeled btn-xs pull-right" ng-click="wizard.closeSet()"><b><i class="icon-arrow-up-right2"></i></b><language>Omitir modo asistido</language></button>';

                                    wizard.exitButton = '<button dragonlanguage="" title="Omitir modo asistido" type="button" role="button" class="remtop btn bg-warning btn-labeled btn-xs pull-right" ng-click="wizard.exitLogoff()"><b><i class="icon-cross2"></i></b><language>Salir de configuración asitida</language></button>';

                                    $('.modal-footer').prepend(wizard.returnBuild(wizard.cancelButon));
                                    $('.modal-footer').prepend(wizard.returnBuild(wizard.exitButton));

                                    wizard.htmlSteps = `<ul class="remtop" ng-repeat="(key,row) in wizard.wizard_steps">
                                    <li  class="pointer ponterextra" ng-repeat="(inx, element) in row" ng-class="element.name == wizard.controller ? 'current' : ''">
                                    <a ng-click="wizard.start_wizard(element.name)">
                                    <span class="number" ng-class="element.complete == 'true' ? 'complete': ''">{{element.index}} </span>
                                    {{element.label}}
                                    </a>
                                    </li>
                                    </ul>`;


                                    wizard.htmlStepsPer = `<ul class="remtop" ng-repeat="(key,row) in wizard.wizard_steps">
                                    <li  class="pointer ponterextra" style="text-align: center;" ng-repeat="(inx, value) in row" ng-class="value.name == wizard.controller ? 'current' : ''" repeatEnd=" $('[id$='circle']').percircle();">             
                                        <center>
                                        <a class="center-custom" ng-if="value.complete == 'true'" href="#" title="{{value.name}}" ng-click="wizard.start_wizard(value.name)">
                                            <span id="greencircle" data-percent="100" class="small green"></span>
                                        </a>
                                        <a class="center-custom" ng-if="value.complete == 'false'" href="#" title="{{value.name}}" ng-click="wizard.start_wizard(value.name)">
                                            <span id="greencircle" data-percent="{{value.percentage}}" class="small red"></span>
                                        </a>
                                        <label style="float: left;width: 100%;text-align: center">{{value.label}}</label>
                                        </center>
                                    </li>
                                </ul>`;


                                    if (wizard.controller == 'workflow') {
                                        console.log('remove some');
                                    }

                                    setTimeout(function () {
                                        if (wizard.wizard_steps.length !== 0) {
                                            // $('.modal-body').prepend(wizard.returnBuild(wizard.htmlSteps));
                                            $('.modal-body').prepend(wizard.returnBuild(wizard.htmlStepsPer));
                                            wizard.refreshAngular();
                                            $("[id$='circle']").percircle();
                                            //$(".modal-body").prepend(wizard.returnBuild(wizard.htmlView));
                                        }

                                        if (wizard.require_data == 0 || wizard.require_data == "0") {
                                            $('.rem').remove();
                                            $('.modal-footer').prepend(wizard.returnBuild(wizard.htmlButonNoRequire));
                                        }
                                    }, 100);


                                    BASEAPI.list('wizard', {}, function (result) {

                                        setTimeout(async function () {

                                            var requre = await BASEAPI.firstp('wizard', {
                                                "where": [
                                                    {
                                                        "field": "name",
                                                        "operator": "=",
                                                        "value": wizard.controller
                                                    },
                                                    {
                                                        "field": "company_name",
                                                        "operator": "=",
                                                        "value": wizard.company,
                                                    }
                                                ]
                                            });

                                            var lastentity2 = await BASEAPI.firstp('wizard', {
                                                orderby: 'id',
                                                order: 'desc'
                                            });

                                            eval(`${wizard.controller}.triggers.table.after.insert = async function (data) {
                                                                                                   
                                    await BASEAPI.updateallp('wizard', {
                                        "count": ${wizard.controller}.records.totalCount + 1,
                                         where: [
                                            {
                                                "field": "id",
                                                "operator": "=",
                                                "value": ${wizard.controller_id}
                                            },
                                            {
                                                "field": "company_name",
                                                "operator": "=",
                                                "value": ${wizard.company},
                                            }
                                         ]
                                    })
                                    
                                    //console.log(${wizard.controller}.records.totalCount);
                                    
                                    var countnumber = await BASEAPI.firstp('wizard', {
                                        "where": [
                                            {
                                                "field": "name",
                                                "operator": "=",
                                                "value": "${wizard.controller}"
                                            },
                                            {
                                                "field": "company_name",
                                                "operator": "=",
                                                "value": ${wizard.company},
                                            }
                                        ]
                                    });
                                   
                                    
                                    var lastentity = await BASEAPI.firstp('wizard', {orderby: 'id', order: 'desc'});
                                           
                                    // console.log(countnumber.name);
                                     //console.log(lastentity.name);
                                     console.log(countnumber.require);
                                                                                                            
                                         if (countnumber.count >= countnumber.cant_records_require){
                                           
                                            await BASEAPI.updateallp('wizard', {
                                                "complete": "true",
                                                 where: [
                                                    {
                                                        "field": "id",
                                                        "operator": "=",
                                                        "value": ${wizard.controller_id}
                                                     },
                                                     {
                                                        "field": "company_name",
                                                        "operator": "=",
                                                        "value": ${wizard.company},
                                                    }
                                                     
                                                 ]
                                            })
                                            
                                            if (countnumber.name == lastentity.name) {
                                                //$('.rem').remove(); 
                                                   $('.remtop').remove();
                                                $('.modal-footer').prepend(wizard.returnBuild(wizard.htmlButonComplete));
                                            } else {
                                           
                                                $('.rem').remove();    
                                                $('.modal-footer').prepend(wizard.returnBuild(wizard.htmlButon));
                                               
                                            }
                                            
                                            
                                         
                                                                                   
                                   }
                               
                                }
                                
                                ${wizard.controller}.triggers.table.after.load = async function (records) {
                                    //console.log('delete');
                                        await BASEAPI.updateallp('wizard', {
                                            "count": ${wizard.controller}.records.totalCount,
                                             where: [
                                                {
                                                    "field": "id",
                                                    "operator": "=",
                                                    "value": ${wizard.controller_id}
                                                 },
                                                 {
                                                    "field": "company_name",
                                                    "operator": "=",
                                                    "value": ${wizard.company},
                                                }
                                             ]
                                        })
                                        
                                        var countnumber = await BASEAPI.firstp('wizard', {
                                        "where": [
                                            {
                                                "field": "name",
                                                "operator": "=",
                                                "value": "${wizard.controller}"
                                            },
                                            {
                                                "field": "company_name",
                                                "operator": "=",
                                                "value": ${wizard.company},
                                            }
                                        ]
                                    });
                                        
                                        if (countnumber.count < countnumber.cant_records_require){
                                            //console.log('Boton 2');
                                            await BASEAPI.updateallp('wizard', {
                                                "complete": "false",
                                                 where: [
                                                 {
                                                    "field": "id",
                                                    "operator": "=",
                                                    "value": ${wizard.controller_id}
                                                 },
                                                 {
                                                    "field": "company_name",
                                                    "operator": "=",
                                                    "value": ${wizard.company},
                                                }
                                                 ]
                                            })
                                            
                                           // $('.rem').remove();    
                                        }
                                }
                                
                                `);

                                        }, 1000);

                                    });
                                }
                            }
                        }
                    };
                    baseController.modal.modalView(wizard.controller, modal);
                }

            });
        }, 1000);


    };

    wizard.nextC = function() {
        MODAL.closeAll();
        wizard.start_wizard();
    };


    wizard.nextR = async function(controller) {
         MODAL.closeAll();

        console.log(controller);

        await BASEAPI.updateallp('wizard', {
                "complete": "true",
                    where: [
                        {
                            "field": "name",
                            "operator": "=",
                            "value": controller
                        },
                        {
                            "field": "company_name",
                            "operator": "=",
                            "value": wizard.company,
                        }
                ]
        });

        wizard.start_wizard();
    };

    wizard.modelComplete = function () {
        MODAL.closeAll();
    };

    wizard.viewAllEntity = function (controller) {
        // console.log(controller);

        // wizard.savecontroller.push({controller: "contract_type"});

        let test = controller;

        //$('.rem').remove();
        let modal = {
            width: 'modal-full',
            header: {
                title: 'Resumen',
                icon: ''
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: true
            },
            event: {
                show: {
                    begin: function (data) {
                        // wizard.controller_back = controller;
                        // $('.rem').remove();
                        console.log(controller);
                        wizard.controllerSave = "";
                        $('.remtop').remove();
                        BASEAPI.list('wizard', {}, function(result) {
                            // console.log(result);
                            wizard.allEntities = [];
                            wizard.controllerSave = test;
                            for (let i = 0; i < result.data.length; i++) {

                                if(result.data[i].complete == "false") {
                                    wizard.percentage = Math.round((result.data[i].count / result.data[i].cant_records_require) * 100);
                                }

                                wizard.allEntities.push({
                                    name: result.data[i].name,
                                    label: MESSAGE.ic("columns." + result.data[i].name),
                                    complete: result.data[i].complete,
                                    cant_records_require: result.data[i].cant_records_require,
                                    count: result.data[i].count,
                                    percentage: wizard.percentage
                                })


                            }

                            setTimeout(function () {
                                $("[id$='circle']").percircle();
                            }, 100);


                           // console.log(wizard.allEntities);
                            wizard.refreshAngular();
                        });


                        $("[id$='circle']").percircle();
                    },
                    end: function(data) {
                        $("[id$='circle']").percircle();
                        $('.cancelmodal').css('display', 'none');
                    }
                }
            }
        };
        baseController.modal.modalView("wizard/wizard", modal);
    };

    wizard.backToWizard = function (controller) {
        console.log(controller);

    };


    wizard.excecuteW = function (data) {
        MODAL.closeAll();
        MENUMODAL = true;
        MODAL.baseRawModal("Wizard", "wizard/start",'icon-menu', '', 'wizard');
    };

    wizard.closeSet = function () {
      //MODAL.closeAll();
        SWEETALERT.confirm({
            title: MESSAGE.ic('alerts.attention'),
            message: MESSAGE.ic('alerts.skip'),
            confirm: async function () {
                await BASEAPI.updateallp("wizard", {complete:"true",where: [{field:"id",operator: ">",value: "0"}]});

                MODAL.closeAll();
                location.reload();
            }
        });
    };

    wizard.exitLogoff = function () {
        MODAL.closeAll();
        new SESSION().logoff();
    };

    wizard.formulary = function (data, mode, defaultData) {
        if (wizard !== undefined) {
            RUN_B("wizard", wizard, $scope, $http, $compile);




            wizard.form.titles = {
                new: MESSAGE.i('columnsnew') + " " + MESSAGE.i('columnstitlewizard'),
                edit: MESSAGE.i('columnsedit') + " " + MESSAGE.i('columnstitlewizard'),
                view: MESSAGE.i('columnsviewall') + " " + MESSAGE.i('columnstitlewizard'),
            };
            wizard.form.readonly = {count:0, complete: false, company_name: wizard.company};
            wizard.createForm(data, mode, defaultData);


            wizard.$scope.$watch('wizard.name',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(wizard, "name", rules)
            });
        }
    };
});
