app.controller("evento_riesgo_generico", function ($scope, $http, $compile) {
    evento_riesgo_generico = this;
    evento_riesgo_generico.fixFilters = [
        {
            field: "id",
            value: -1
        }
    ];
    evento_riesgo_generico.session = new SESSION().current();
    evento_riesgo_generico.destroyForm = false;
    evento_riesgo_generico.eltipo = false;
    //evento_riesgo_generico.fixFilters = [{
    //    field: "compania",
    //    value: evento_riesgo_generico.session.compania_id
    //}];
    //evento_riesgo_generico.singular = "singular";
    //evento_riesgo_generico.plural = "plural";
    evento_riesgo_generico.headertitle = "Plan de Acción de Eventos";
    //evento_riesgo_generico.destroyForm = false;
    //evento_riesgo_generico.permissionTable = "tabletopermission";
    RUNCONTROLLER("evento_riesgo_generico", evento_riesgo_generico, $scope, $http, $compile);
    RUN_B("evento_riesgo_generico", evento_riesgo_generico, $scope, $http, $compile);
    evento_riesgo_generico.formulary = function (data, mode, defaultData) {
        if (evento_riesgo_generico !== undefined) {
            evento_riesgo_generico.form.modalWidth = ENUM.modal.width.full;
            if (evento_riesgo_generico2.evento_indicador.includes('r') ){
                evento_riesgo_generico.form.readonly = {
                    compania: evento_riesgo_generico.session.compania_id,
                    institucion: evento_riesgo_generico.session.institucion_id,
                    evento: evento_riesgo_generico2.evento_indicador.replaceAll('r', ''),
                    related: 1
                };
                evento_riesgo_generico.form.titles = {
                    new: "Agregar plan de acción al evento: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    edit: "Editar plan de acción al evento: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    view: "Ver plan de acción al evento: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre
                };
            }else if (evento_riesgo_generico2.evento_indicador.includes('s') ){
                evento_riesgo_generico.form.readonly = {
                    compania: evento_riesgo_generico.session.compania_id,
                    institucion: evento_riesgo_generico.session.institucion_id,
                    evento: evento_riesgo_generico2.evento_indicador.replaceAll('s', ''),
                    related: 2
                };
                evento_riesgo_generico.form.titles = {
                    new: "Agregar plan de acción a la salida no conforme: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    edit: "Editar plan de acción a la salida no conforme: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    view: "Ver plan de acción a la salida no conforme: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre
                };
            }else if (evento_riesgo_generico2.evento_indicador.includes('i') ){
                evento_riesgo_generico.form.readonly = {
                    compania: evento_riesgo_generico.session.compania_id,
                    institucion: evento_riesgo_generico.session.institucion_id,
                    evento: evento_riesgo_generico2.evento_indicador.replaceAll('i', ''),
                    related: 3
                };
                evento_riesgo_generico.form.titles = {
                    new: "Agregar plan de acción al indicador: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    edit: "Editar plan de acción al indicador: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    view: "Ver plan de acción al indicador: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre
                };
            }else{
                evento_riesgo_generico.form.readonly = {
                    compania: evento_riesgo_generico.session.compania_id,
                    institucion: evento_riesgo_generico.session.institucion_id,
                    evento: evento_riesgo_generico2.evento_indicador,
                    related: 0
                };
                evento_riesgo_generico.form.titles = {
                    new: "Agregar plan de acción al evento: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    edit: "Editar plan de acción al evento: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre,
                    view: "Ver Aplan de acción al evento: " + evento_riesgo_generico2.form.selected('evento_indicador').nombre
                };
            }
            evento_riesgo_generico.createForm(data, mode, defaultData);
            $scope.$watch("evento_riesgo_generico.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_riesgo_generico, 'nombre', rules);
            });
            $scope.$watch("evento_riesgo_generico.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_riesgo_generico, 'descripcion', rules);
            });
            $scope.$watch("evento_riesgo_generico.evento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(evento_riesgo_generico, 'evento', rules);
            });
        }
    };
    evento_riesgo_generico.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        evento_riesgo_generico.runMagicColum('evento', "vw_evento_indicador", "id", "nombre");
        evento_riesgo_generico.runMagicOneToMany('acciones_correctivas', 'auditoria_lista_correctiva', 'evento_riesgo', 'nombre', 'id');
        evento_riesgo_generico.runMagicOneToMany('acciones_preventivas', 'auditoria_lista_preventiva', 'evento_riesgo', 'nombre', 'id');
        if (!evento_riesgo_generico.eltipo) {
            if (STORAGE.exist('evento2')) {
                evento_riesgo_generico2.evento_indicador = STORAGE.get('evento2');
                evento_riesgo_generico2.form.loadDropDown('evento_indicador');
                if (evento_riesgo_generico2.evento_indicador.includes('r')) {
                    evento_riesgo_generico.fixFilters = [
                        {
                            "field": "evento",
                            "value": evento_riesgo_generico2.evento_indicador.replaceAll('r', '')
                        },
                        {
                            "field": "related",
                            "value": 1
                        },
                        {
                            "field": "compania",
                            "value": evento_riesgo_generico.session.compania_id
                        }
                    ];
                } else if (evento_riesgo_generico2.evento_indicador.includes('s')) {
                    evento_riesgo_generico.fixFilters = [
                        {
                            "field": "evento",
                            "value": evento_riesgo_generico2.evento_indicador.replaceAll('s', '')
                        },
                        {
                            "field": "related",
                            "value": 2
                        },
                        {
                            "field": "compania",
                            "value": evento_riesgo_generico.session.compania_id
                        }
                    ];
                } else if (evento_riesgo_generico2.evento_indicador.includes('i')) {
                    evento_riesgo_generico.fixFilters = [
                        {
                            "field": "evento",
                            "value": evento_riesgo_generico2.evento_indicador.replaceAll('i', '')
                        },
                        {
                            "field": "related",
                            "value": 3
                        },
                        {
                            "field": "compania",
                            "value": evento_riesgo_generico.session.compania_id
                        }
                    ];
                } else {
                    evento_riesgo_generico.fixFilters = [
                        {
                            "field": "evento",
                            "value": evento_riesgo_generico2.evento_indicador
                        },
                        {
                            "field": "related",
                            "value": 0
                        },
                        {
                            "field": "compania",
                            "value": evento_riesgo_generico.session.compania_id
                        }
                    ];
                }
            }
            evento_riesgo_generico.refresh();
            evento_riesgo_generico.eltipo = true;
        }
    };
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