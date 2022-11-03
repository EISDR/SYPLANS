app.controller("vw_comentarios_indicadores", function ($scope, $http, $compile) {
    vw_comentarios_indicadores = this;
    vw_comentarios_indicadores.singular = "singular";
    vw_comentarios_indicadores.plural = "plural";
    //vw_comentarios_indicadores.destroyForm = false;
    //vw_comentarios_indicadores.permissionTable = "tabletopermission";
    vw_comentarios_indicadores.fixFilters = [
        {
            field: "id",
            value: -1
        }
    ];
    vw_comentarios_indicadores.session = new SESSION().current();
    RUNCONTROLLER("vw_comentarios_indicadores", vw_comentarios_indicadores, $scope, $http, $compile);
    RUN_B("vw_comentarios_indicadores", vw_comentarios_indicadores, $scope, $http, $compile);
    $scope.$watch("vw_comentarios_indicadores.comentario", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_comentarios_indicadores, 'comentario', rules);
    });
    vw_comentarios_indicadores.formulary = function (data, mode, defaultData) {
        if (vw_comentarios_indicadores !== undefined) {
            vw_comentarios_indicadores.form.modalWidth = ENUM.modal.width.full;
            vw_comentarios_indicadores.form.readonly = {};
            vw_comentarios_indicadores.createForm(data, mode, defaultData);

            $scope.$watch("vw_comentarios_indicadores.type", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_indicadores, 'type', rules);
            });
            $scope.$watch("vw_comentarios_indicadores.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_indicadores, 'value', rules);
            });
            $scope.$watch("vw_comentarios_indicadores.value2", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_comentarios_indicadores, 'value2', rules);
            });
        }
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
    vw_comentarios_indicadores.set_comment_info = async function (type, indicador, allow_comment, periodo) {
        if (type == "indicador generico") {
            await BASEAPI.firstp('indicador_generico', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.tipo_indicador = 19;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: periodo ? 23 : ["19"]
                    }
                ];
                var periodo_info = await BASEAPI.listp('indicador_generico_periodo', {
                    where: [
                        {
                            field: "indicador_generico",
                            value: indicador
                        }
                    ]
                });
                delete CRUD_vw_comentarios_indicadores.table.columns.value2
                CRUD_vw_comentarios_indicadores.table.columns.value = {
                    sortable: false,
                    label: "Periodo",
                    format: function (row) {
                        var ano = periodo_info.data.filter(d => {
                            return d.ano === row.value;
                        });
                        return ano[0].periodo;
                    }
                };
                if (periodo) {
                    console.log(periodo);
                    vw_comentarios_indicadores.fixFilters.push({
                        field: "periodo",
                        value: periodo
                    });
                    vw_comentarios_indicadores.tipo_indicador = 23;
                }
                vw_comentarios_indicadores.refresh();
            });
        } else if (type == "indicador pei") {
            await BASEAPI.firstp('indicador_pei', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.tipo_indicador = 16;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: periodo ? 9 : ["9", "16"]
                    }
                ];
                var periodo_info = await BASEAPI.listp('indicador_pei_ano', {
                    where: [
                        {
                            field: "indicador_pei",
                            value: indicador
                        }
                    ]
                });
                delete CRUD_vw_comentarios_indicadores.table.columns.value2
                CRUD_vw_comentarios_indicadores.table.columns.value = {
                    sortable: false,
                    label: "Año",
                    format: function (row) {
                        var ano = periodo_info.data.filter(d => {
                            return d.ano === row.value;
                        });
                        return ano[0].ano;
                    }
                };
                if (periodo) {
                    console.log(periodo);
                    vw_comentarios_indicadores.fixFilters.push({
                        field: "periodo",
                        value: periodo
                    });
                    vw_comentarios_indicadores.tipo_indicador = 9;
                }
                vw_comentarios_indicadores.refresh();
            });
        } else if (type == "indicador poa") {
            await BASEAPI.firstp('indicador_poa', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.tipo_indicador = 17;
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: periodo ? 10 : ["10", "17"]
                    }
                ];
                var periodo_info = await BASEAPI.listp('indicador_poa_periodo', {
                    where: [
                        {
                            field: "indicador_poa",
                            value: indicador
                        }
                    ]
                });
                if (periodo) {
                    vw_comentarios_indicadores.fixFilters.push({
                        field: "periodo",
                        value: periodo
                    });
                    vw_comentarios_indicadores.tipo_indicador = 10;
                }
                delete CRUD_vw_comentarios_indicadores.table.columns.value2
                CRUD_vw_comentarios_indicadores.table.columns.value = {
                    sortable: false,
                    label: "Periodo",
                    format: function (row) {
                        var ano = periodo_info.data.filter(d => {
                            return d.periodo === row.value;
                        });
                        return `Periodo ${ano[0].periodo}`;
                    }
                };
                vw_comentarios_indicadores.refresh();
            });
        } else if (type == "indicador actividad") {
            await BASEAPI.firstp('indicador_actividad', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.tipo_indicador = 18;
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: periodo ? 12 : ["12", "17"]
                    }
                ];
                var periodo_info = await BASEAPI.listp('indicador_actividad_periodo', {
                    where: [
                        {
                            field: "indicador_actividad",
                            value: indicador
                        }
                    ]
                });
                delete CRUD_vw_comentarios_indicadores.table.columns.value2
                CRUD_vw_comentarios_indicadores.table.columns.value = {
                    sortable: false,
                    label: "Periodo",
                    format: function (row) {
                        var ano = periodo_info.data.filter(d => {
                            return d.periodo === row.value;
                        });
                        return `Periodo ${ano[0].periodo}`;
                    }
                };
                if (periodo) {
                    vw_comentarios_indicadores.fixFilters.push({
                        field: "periodo",
                        value: periodo
                    });
                    vw_comentarios_indicadores.tipo_indicador = 12;
                }
                vw_comentarios_indicadores.refresh();
            });
        } else if (type == "productos poa") {
            await BASEAPI.firstp('productos_poa', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.tipo_indicador = 6;
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: ["4", "6"]
                    }
                ];
                var estatus_info = await BASEAPI.listp('productos_poa_status', {});
                delete CRUD_vw_comentarios_indicadores.table.columns.value;
                CRUD_vw_comentarios_indicadores.table.columns.value2 = {
                    sortable: false,
                    label: "Estatus",
                    format: function (row) {
                        var estatus = estatus_info.data.filter(d => {
                            return d.id == row.value;
                        });
                        console.log(estatus_info.data);
                        return `${estatus[0].nombre}`;
                    }
                };
                vw_comentarios_indicadores.refresh();
            });
        } else if (type == "actividades poa") {
            await BASEAPI.firstp('actividades_poa', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.tipo_indicador = 8;
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: ["8"]
                    }
                ];
                var estatus_info = await BASEAPI.listp('actividades_poa_estatus', {});
                delete CRUD_vw_comentarios_indicadores.table.columns.value2
                CRUD_vw_comentarios_indicadores.table.columns.value = {
                    sortable: false,
                    label: "Estatus",
                    format: function (row) {
                        var estatus = estatus_info.data.filter(d => {
                            return d.id === row.value;
                        });
                        return `${estatus[0].nombre}`;
                    }
                };
                vw_comentarios_indicadores.refresh();
            });
        } else if (type == "proceso") {
            await BASEAPI.firstp('actividades_poa', {
                where: [
                    {
                        field: "id",
                        value: indicador
                    }
                ]
            }).then(async function (result) {
                vw_comentarios_indicadores.indicador = result;
                var modal_text = $('.modal-title').text();
                $('.modal-title').html(modal_text + ' ( ' + vw_comentarios_indicadores.indicador.nombre + ' )');
                vw_comentarios_indicadores.tipo_indicador = 8;
                vw_comentarios_indicadores.indicador.periodo = periodo;
                vw_comentarios_indicadores.allow_comment = allow_comment;
                vw_comentarios_indicadores.fixFilters = [
                    {
                        field: "value2",
                        value: vw_comentarios_indicadores.indicador.id
                    },
                    {
                        field: "type",
                        value: ["8"]
                    }
                ];
                var estatus_info = await BASEAPI.listp('actividades_poa_estatus', {});
                delete CRUD_vw_comentarios_indicadores.table.columns.value2
                CRUD_vw_comentarios_indicadores.table.columns.value = {
                    sortable: false,
                    label: "Estatus",
                    format: function (row) {
                        var estatus = estatus_info.data.filter(d => {
                            return d.id === row.value;
                        });
                        return `${estatus[0].nombre}`;
                    }
                };
                vw_comentarios_indicadores.refresh();
            });
        }
        vw_comentarios_indicadores.refresh();
    };
    vw_comentarios_indicadores.save_comment = async function () {
        VALIDATION.save(vw_comentarios_indicadores, async function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
            BASEAPI.insert('comentarios', {
                comentario: vw_comentarios_indicadores.comentario,
                type: vw_comentarios_indicadores.tipo_indicador,
                created_by: vw_comentarios_indicadores.session.usuario_id,
                value2: vw_comentarios_indicadores.indicador.id,
                value: vw_comentarios_indicadores.indicador.periodo || undefined
            }, function (res) {
                vw_comentarios_indicadores.comentario = "";
                vw_comentarios_indicadores.refreshAngular();
                vw_comentarios_indicadores.refresh();
                SWEETALERT.stop();
                SWEETALERT.show({
                    message: "Ha sido guardado su comentario",
                    confirm: function () {
                        MODAL.closeAll();
                    }
                });
            });
        }, ["comentario"]);
    }
});
