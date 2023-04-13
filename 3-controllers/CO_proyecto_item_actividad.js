app.controller("proyecto_item_actividad", function ($scope, $http, $compile) {
    proyecto_item_actividad = this;
    //proyecto_item_actividad.fixFilters = [];
    proyecto_item_actividad.singular = "Actividad";
    proyecto_item_actividad.plural = "Actividades";
    proyecto_item_actividad.headertitle = "Actividades";
    proyecto_item_actividad.session = new SESSION().current();
    //proyecto_item_actividad.destroyForm = false;
    //proyecto_item_actividad.permissionTable = "tabletopermission";
    proyecto_item_actividad.currentdate = moment().format("YYYY-MM-DD");
    proyecto_item_actividad.paso = false;
    if (MODAL.history.length > 0) {
        if (typeof vw_dashboard_proyecto != "undefined") {
            if (vw_dashboard_proyecto) {
                if (typeof vw_dashboard_proyecto !== 'not defined') {
                    if (!proyecto_item_actividad.paso) {
                        proyecto_item_actividad.fixFilters = [];
                        if (vw_dashboard_proyecto.Mactividades == "sin información") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": -1
                                }
                            ];
                        }
                        if (vw_dashboard_proyecto.Mactividades == " ") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id,
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento,
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "planificados") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id,
                                },
                                {
                                    "field": "from",
                                    "operator": ">",
                                    "value": proyecto_item_actividad.currentdate
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (1)`
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "pendientes" || vw_dashboard_proyecto.Mactividades == "pendientes a ejecución") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "from",
                                    "operator": "<=",
                                    "value": proyecto_item_actividad.currentdate
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (1, 2)`
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "ejecucion"  || vw_dashboard_proyecto.Mactividades == "en ejecución") {
                            proyecto_item_actividad.fixFilters = [
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
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "vencidos") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "to",
                                    "operator": "<",
                                    "value": proyecto_item_actividad.currentdate
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (1, 2)`
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "cancelados" || vw_dashboard_proyecto.Mactividades == "canceladas") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (5)`
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "finalizados") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "estatus_id",
                                    "operator": "",
                                    "value": `$ IN (6)`
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "ejecutado") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "presupuesto_consumido",
                                    "operator": ">",
                                    "value": 0
                                },
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        if (vw_dashboard_proyecto.Mactividades == "no ejecutado") {
                            proyecto_item_actividad.fixFilters = [
                                {
                                    "field": "pei",
                                    "value": vw_dashboard_proyecto.session.pei_id
                                },
                                {
                                    "field": "presupuesto_consumido",
                                    "operator": "=",
                                    "value": 0,
                                }
                            ];
                            if (vw_dashboard_proyecto.departamento > 0)
                                proyecto_item_actividad.fixFilters.push({
                                    "field": "departamento_id",
                                    "value": vw_dashboard_proyecto.departamento
                                });
                        }
                        proyecto_item_actividad.paso = true;
                    }
                }
            }
        }
    }
    RUNCONTROLLER("proyecto_item_actividad", proyecto_item_actividad, $scope, $http, $compile);
    proyecto_item_actividad.formulary = async function (data, mode, defaultData) {
        if (proyecto_item_actividad !== undefined) {
            RUN_B("proyecto_item_actividad", proyecto_item_actividad, $scope, $http, $compile);
            proyecto_item_actividad.form.modalWidth = ENUM.modal.width.full;
            proyecto_item_actividad.form.readonly = {};
            proyecto_item_actividad.createForm(data, mode, defaultData);
            proyecto_item_actividad.do_once = false;
            proyecto_item_actividad.presupuesto = '';
            if (typeof proyecto_item != "undefined"){
                if (proyecto_item){
                    if (typeof proyecto_item != "not defined"){
                        await proyecto_item.get_presupuesto_restante();
                        proyecto_item_actividad.selectQueries['mods'] = [
                            {
                                field: 'ods',
                                value: proyecto_item.ods
                            },
                        ];
                        proyecto_item_actividad.form.loadDropDown('mods');
                    }
                }
            }
            if (mode === 'new'){
                proyecto_item_actividad.presupuesto_anterior = 0;
                proyecto_item_actividad.id = undefined;
            }
            proyecto_item_actividad.form.titles = {
                new: "Nueva Actividad",
                edit: "Editar - Actividad",
                view: "Ver Actividad"
            };
            //ms_product.selectQueries['proyecto_item'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item_actividad.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item_actividad, 'nombre', rules);
            });
            //ms_product.selectQueries['departamento'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item_actividad.departamento", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item_actividad, 'departamento', rules);
            });
            //ms_product.selectQueries['responsable'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("proyecto_item_actividad.responsable", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item_actividad, 'responsable', rules);
            });
            $scope.$watch("proyecto_item_actividad.estatus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item_actividad, 'estatus', rules);
            });
            $scope.$watch("proyecto_item_actividad.range_date", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item_actividad, "from", rules);
                VALIDATION.validate(proyecto_item_actividad, "range_date", rules);
            });
            $scope.$watch("proyecto_item_actividad.to", function (value) {
                var rules = [];
                //rules here
                // rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(proyecto_item_actividad, 'to', rules);
            });
            if (proyecto_item_actividad.paso) {
                $scope.$watch("proyecto_item_actividad.proyecto_item", async function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    if (proyecto_item_actividad.form.selected('proyecto_item')) {
                        var rango_minimo = moment(proyecto_item_actividad.form.selected('proyecto_item').from).format("YYYY-MM-DD");
                        var rango_maximo = moment(proyecto_item_actividad.form.selected('proyecto_item').to).format("YYYY-MM-DD");

                        proyecto_item_actividad.range_date_min(rango_minimo);
                        proyecto_item_actividad.range_date_max(rango_maximo);
                        proyecto_item_actividad.refreshAngular();
                        await proyecto_item_actividad.get_presupuesto_restante();
                    }
                    proyecto_item_actividad.presupuesto_disponible = proyecto_item_actividad.presupuesto_restante_calculate();
                    proyecto_item_actividad.refreshAngular();
                    VALIDATION.validate(proyecto_item_actividad, 'proyecto_item', rules);
                });
            }
            $scope.$watch("proyecto_item_actividad.presupuesto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));

                if (typeof vw_dashboard_proyecto != "undefined") {
                    if (vw_dashboard_proyecto) {
                        if (typeof vw_dashboard_proyecto != "not defined") {
                            proyecto_item_actividad.presupuesto_validate  = LAN.money(proyecto_item_actividad.proyecto_item_presupuesto_restante).value + LAN.money(proyecto_item_actividad.presupuesto_anterior).value;
                            rules.push(VALIDATION.yariel.greaterThanAct(LAN.money(proyecto_item_actividad.presupuesto).value, proyecto_item_actividad.presupuesto_validate, "El monto de la actividad", "Presupuesto disponible del producto"));
                            proyecto_item_actividad.presupuesto_disponible = proyecto_item_actividad.presupuesto_restante_calculate();
                            proyecto_item_actividad.refreshAngular();
                            VALIDATION.validate(proyecto_item_actividad, 'presupuesto', rules);
                            return
                        }
                    }
                }
                if (typeof proyecto_item != "undefined") {
                    if (proyecto_item) {
                        if (typeof proyecto_item != "not defined") {
                            proyecto_item_actividad.presupuesto_validate = LAN.money(proyecto_item.presupuesto_restante).value + LAN.money(proyecto_item_actividad.presupuesto_anterior).value;
                            rules.push(VALIDATION.yariel.greaterThanAct(LAN.money(proyecto_item_actividad.presupuesto).value, proyecto_item_actividad.presupuesto_validate, "El monto de la actividad", "Presupuesto disponible del producto"));
                            proyecto_item_actividad.presupuesto_disponible = proyecto_item_actividad.presupuesto_restante_calculate();
                            proyecto_item_actividad.refreshAngular();
                            VALIDATION.validate(proyecto_item_actividad, 'presupuesto', rules);
                        }
                    }
                }
            });
            proyecto_item_actividad.triggers.table.after.control = async function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
                if (data == 'estatus' && mode == 'new'){
                    if (!proyecto_item_actividad.do_once) {
                        proyecto_item_actividad.estatus = '1';
                        proyecto_item_actividad.form.loadDropDown('estatus');
                        proyecto_item_actividad.do_once = true;
                    }
                }
                if (data == 'proyecto_item'){
                    if (proyecto_item_actividad.form.selected('proyecto_item')) {
                        debugger
                        var rango_minimo = moment(proyecto_item_actividad.form.selected('proyecto_item').from).format("YYYY-MM-DD");
                        var rango_maximo = moment(proyecto_item_actividad.form.selected('proyecto_item').to).format("YYYY-MM-DD");

                        proyecto_item_actividad.range_date_min(rango_minimo);
                        proyecto_item_actividad.range_date_max(rango_maximo);
                        proyecto_item_actividad.refreshAngular();
                        await proyecto_item_actividad.get_presupuesto_restante();
                        proyecto_item_actividad.presupuesto_disponible = proyecto_item_actividad.presupuesto_restante_calculate();
                    }
                }
                if (data == 'range_date') {
                    if (typeof vw_dashboard_proyecto != "undefined") {
                        if (vw_dashboard_proyecto) {
                            if (typeof vw_dashboard_proyecto != "not defined") {
                                if (proyecto_item_actividad.form.selected('proyecto_item')) {
                                    var rango_minimo = moment(proyecto_item_actividad.form.selected('proyecto_item').from).format("YYYY-MM-DD");
                                    var rango_maximo = moment(proyecto_item_actividad.form.selected('proyecto_item').to).format("YYYY-MM-DD");

                                    proyecto_item_actividad.range_date_min(rango_minimo);
                                    proyecto_item_actividad.range_date_max(rango_maximo);
                                    proyecto_item_actividad.refreshAngular();
                                }
                                return
                            }
                        }
                    }
                    if (typeof proyecto_item != "undefined") {
                        if (proyecto_item) {
                            if (typeof proyecto_item != "not defined") {
                                var rango_minimo = moment(proyecto_item.from).format("YYYY-MM-DD");
                                var rango_maximo = moment(proyecto_item.to).format("YYYY-MM-DD");

                                proyecto_item_actividad.range_date_min(rango_minimo);
                                proyecto_item_actividad.range_date_max(rango_maximo);
                                proyecto_item_actividad.refreshAngular();
                            }
                        }
                    }
                }
                if (data == 'presupuesto'){
                    if (typeof vw_dashboard_proyecto != "undefined") {
                        if (vw_dashboard_proyecto) {
                            if (typeof vw_dashboard_proyecto != "not defined") {
                                proyecto_item_actividad.presupuesto_restante = LAN.money(proyecto_item_actividad.presupuesto).value +  proyecto_item_actividad.proyecto_item_presupuesto_restante;
                                return;
                            }
                        }
                    }
                    if (typeof proyecto_item != "undefined") {
                        if (proyecto_item) {
                            if (typeof proyecto_item != "not defined") {
                                proyecto_item_actividad.presupuesto_restante = LAN.money(proyecto_item_actividad.presupuesto).value + proyecto_item.presupuesto_restante;
                            }
                        }
                    }
                }
            };
        }
    };
    proyecto_item_actividad.presupuesto_restante_calculate = function () {
        if (typeof vw_dashboard_proyecto != "undefined") {
            if (vw_dashboard_proyecto) {
                if (typeof vw_dashboard_proyecto != "not defined") {
                    if (proyecto_item_actividad.form.selected('proyecto_item')) {
                        if (proyecto_item_actividad.form.selected('proyecto_item').presupuesto > 0) {
                            var PY_PR = LAN.money(proyecto_item_actividad.proyecto_item_presupuesto_restante).value;
                            var PA_PR = LAN.money(proyecto_item_actividad.presupuesto).value;
                            var PA_PRA = LAN.money(proyecto_item_actividad.presupuesto_anterior).value;

                            var RESTANTE = proyecto_item_actividad.form.mode === 'new' ?
                                (PY_PR - PA_PR) :
                                (PY_PR + PA_PRA) - PA_PR;
                            proyecto_item_actividad.presupuesto_validate = LAN.money(proyecto_item_actividad.proyecto_item_presupuesto_restante).value + LAN.money(proyecto_item_actividad.presupuesto_anterior).value;
                            return LAN.money(RESTANTE).format(false);
                        }
                        return 0;
                    }
                }
            }
        }
        if (typeof proyecto_item != "undefined") {
            if (proyecto_item) {
                if (typeof proyecto_item != "not defined") {
                    if (proyecto_item.presupuesto_DragonClean > 0) {
                        var PY_PR = LAN.money(proyecto_item.presupuesto_restante).value;
                        var PA_PR = LAN.money(proyecto_item_actividad.presupuesto).value;
                        var PA_PRA = LAN.money(proyecto_item_actividad.presupuesto_anterior).value;

                        var RESTANTE = proyecto_item_actividad.form.mode === 'new' ?
                            (PY_PR - PA_PR) :
                            (PY_PR + PA_PRA) - PA_PR;
                        return LAN.money(RESTANTE).format(false);
                    }
                }
            }
        }
    };
    proyecto_item_actividad.triggers.table.after.load = async function (records) {
        await proyecto_item_actividad.runMagicManyToMany('mods', "mods", "proyecto_actividad", "id", 'nombre', "proyecto_actividad_mods", "mods", "id");
        await proyecto_item_actividad.runMagicOneToMany('actividades_apoyo_table', 'proyecto_actividad_apoyo', 'proyecto_actividad', 'nombre', 'id');
        if (typeof proyecto_item != "undefined"){
            if (proyecto_item){
                if (typeof proyecto_item != "not defined"){
                    await proyecto_item.get_presupuesto_restante();
                }
            }
        }
        proyecto_item_actividad.fileSI = [];
        if (records.data) {
            for (var items of records.data) {
                proyecto_item_actividad.files = () => new Promise(async (resolve, reject) => {
                    BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/vw_proyecto_item_actividad/actividadfile/' + items.id}, function (result) {
                        if (result.data.count > 0) {
                            proyecto_item_actividad.fileSI.push({id: items.id});
                            resolve(true);
                        } else {
                            var buttons = document.getElementsByClassName("btn btn-labeled");
                            for (var item of buttons) {
                                item.disabled = false;
                            }
                            resolve(false);
                        }
                    }, $('#invisible'));
                });
                await proyecto_item_actividad.files();
                proyecto_item_actividad.refreshAngular();
            }
        }
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    };
    proyecto_item_actividad.get_presupuesto_restante = async function() {
        proyecto_item_actividad.proyecto_item_lista_actividades = await BASEAPI.listp('vw_proyecto_item_actividad',{
            limit: 0,
            where: [
                {
                    field: "proyecto_item",
                    operator: "=",
                    value: proyecto_item_actividad.form.selected('proyecto_item').id,
                }
            ]
        });
        proyecto_item_actividad.proyecto_item_lista_actividades = proyecto_item_actividad.proyecto_item_lista_actividades.data;
        proyecto_item_actividad.proyecto_item_presupuesto_consumido = 0;
        proyecto_item_actividad.proyecto_item_presupuesto_restante = 0;
        for(var i of proyecto_item_actividad.proyecto_item_lista_actividades){
            proyecto_item_actividad.proyecto_item_presupuesto_consumido += LAN.money(i.presupuesto).value;
        }
        proyecto_item_actividad.proyecto_item_presupuesto_restante = LAN.money(proyecto_item_actividad.form.selected('proyecto_item').presupuesto).value - proyecto_item_actividad.proyecto_item_presupuesto_consumido;
    }
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
    proyecto_item_actividad.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        if(DSON.oseaX(proyecto_item_actividad.presupuesto)) {
            data.inserting.presupuesto  = "$null"
        }
        resolve(true)
    });
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    proyecto_item_actividad.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        if(DSON.oseaX(proyecto_item_actividad.presupuesto)){
            data.updating.presupuesto = "$null"
        }
        resolve(true)
    });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
    proyecto_item_actividad.verFile = function (key, value, row) {
        proyecto_item_actividad.setPermission("file.upload", false);
        if (proyecto_item_actividad.group_caracteristica !== ENUM_2.Grupos.director_general){
            proyecto_item_actividad.setPermission("file.remove", false);
        }else{
            proyecto_item_actividad.setPermission("file.remove", true);
        }
        if (typeof proyecto_item_actividad !== 'null') {
            if (proyecto_item_actividad) {
                var info = proyecto_item_actividad.fileSI.filter(data2 => {
                    return data2.id == row.id;
                });
                if (info.length) {
                    var root = DSON.template("/vw_proyecto_item_actividad/actividadfile/" + row.id, row);
                    proyecto_item_actividad.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver tipos de archivos permitidos a ser cargados",
                                icon: "file-eye"
                            },
                            footer: {
                                cancelButton: false,
                                buttons: [
                                    {
                                        color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                        title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                        action: function () {
                                            MODAL.close();
                                        }
                                    }
                                ]
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading')
                            },
                            event: {
                                show: {
                                    begin: function (data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if (typeof data.permitted_files[j] == "undefined") {
                                                    data.permitted_files[j] = {};
                                                }
                                                data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                            }
                                        }
                                    }
                                },
                                hide: {
                                    begin: function (data) {

                                    }
                                }
                            }
                        };
                        proyecto_item_actividad.modal.modalView("templates/components/filetype", modal);
                    }
                    baseController.viewData = {
                        root: root,
                        scope: 'proyecto_item_actividad',
                        maxsize: 10,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    proyecto_item_actividad.modal.modalView("templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    });
                }
            }
        }
    };
});
