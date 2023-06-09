app.controller("vw_proyecto_item_actividad2", function ($scope, $http, $compile) {
    vw_proyecto_item_actividad2 = this;
    vw_proyecto_item_actividad2.destroyForm = false;
    vw_proyecto_item_actividad2.myfirsttime = 0;
    RUNCONTROLLER("vw_proyecto_item_actividad2", vw_proyecto_item_actividad2, $scope, $http, $compile);
    RUN_B("vw_proyecto_item_actividad2", vw_proyecto_item_actividad2, $scope, $http, $compile);
    if (vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
        if (vw_proyecto_item_actividad.session.departamento) {
            vw_proyecto_item_actividad.fixFilters.push({
                "field": "departamento",
                "value": vw_proyecto_item_actividad.session.departamento
            });
        }
        vw_proyecto_item_actividad.dont_show_money = true;
        if (vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            vw_proyecto_item_actividad.fixFilters.push({
                "field": "responsable_id",
                "value": vw_proyecto_item_actividad.session.id
            });
        }
    } else {
        vw_proyecto_item_actividad.dont_show_money = false;
        vw_proyecto_item_actividad2.departamentoPre = "0";
    }
    vw_proyecto_item_actividad2.$scope.$watch('vw_proyecto_item_actividad2.departamentoPre', function (value) {
        if (vw_proyecto_item_actividad2.myfirsttime > 1) {
            if (vw_proyecto_item_actividad2.form.selected('departamentoPre') !== null) {
                if (vw_proyecto_item_actividad2.form.selected('departamentoPre').id == 0) {
                    STORAGE.add('depaP', vw_proyecto_item_actividad2.departamentoPre);
                    vw_proyecto_item_actividad.fixFilters = [
                        {
                            field: "proyecto_item_estatus",
                            operator: ">",
                            value: 1
                        },
                        {
                            field: "compania",
                            value: vw_proyecto_item_actividad.session.compania_id
                        },
                    ];
                    if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        vw_proyecto_item_actividad.fixFilters.push({
                            "field": "responsable_id",
                            "value": vw_proyecto_item_actividad.session.id
                        });
                    }
                } else {
                    STORAGE.add('depaP', vw_proyecto_item_actividad2.departamentoPre);
                    vw_proyecto_item_actividad.fixFilters = [
                        {
                            field: "proyecto_item_estatus",
                            operator: ">",
                            value: 1
                        },
                        {
                            field: "compania",
                            value: vw_proyecto_item_actividad.session.compania_id
                        },
                        {
                            "field": "departamento_id",
                            "value": value
                        }
                    ];
                    if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                        vw_proyecto_item_actividad.fixFilters.push({
                            "field": "responsable_id",
                            "value": vw_proyecto_item_actividad.session.id
                        });
                    }
                }
                vw_proyecto_item_actividad.refresh();
            } else {
                debugger
                if (STORAGE.exist('depaP')) {
                    vw_proyecto_item_actividad2.departamentoPre = STORAGE.get('depaP');
                }else {
                    vw_proyecto_item_actividad2.departamentoPre = "0";
                }
                vw_proyecto_item_actividad.fixFilters = [
                    {
                        field: "proyecto_item_estatus",
                        operator: ">",
                        value: 1
                    },
                    {
                        field: "compania",
                        value: vw_proyecto_item_actividad.session.compania_id
                    },
                ];
                if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                    vw_proyecto_item_actividad.fixFilters.push({
                        "field": "responsable_id",
                        "value": vw_proyecto_item_actividad.session.id
                    });
                }
                vw_proyecto_item_actividad.refresh();
            }
        }
        vw_proyecto_item_actividad2.myfirsttime++;
    });
    vw_proyecto_item_actividad2.triggers.table.after.control = function (data) {
        if (data == 'departamentoPre') {
            if (vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.director_departamental || vw_proyecto_item_actividad.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                vw_proyecto_item_actividad2.departamentoPre = vw_proyecto_item_actividad.session.departamento + "";
                vw_proyecto_item_actividad2.form.options.departamentoPre.disabled = true;
            } else {
                if (vw_proyecto_item_actividad.cargar) {
                    if (STORAGE.exist('depaP')) {
                        vw_proyecto_item_actividad.departamentoPre = STORAGE.get('depaP');
                        vw_proyecto_item_actividad.cargar = false;
                        vw_proyecto_item_actividad.form.loadDropDown('departamentoPre');
                    } else {
                        vw_proyecto_item_actividad2.departamentoPre = vw_proyecto_item_actividad.session.departamento + "";
                        vw_proyecto_item_actividad.cargar = false;
                        vw_proyecto_item_actividad2.form.loadDropDown('departamentoPre');
                    }
                    if (vw_proyecto_item_actividad2.form.selected('departamentoPre') !== null) {
                        if (vw_proyecto_item_actividad.form.selected('departamentoPre').id == 0) {
                            vw_proyecto_item_actividad.fixFilters = [
                                {
                                    field: "proyecto_item_estatus",
                                    operator: ">",
                                    value: 1
                                },
                                {
                                    field: "compania",
                                    value: vw_proyecto_item_actividad.session.compania_id
                                }
                            ];
                            if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                                vw_proyecto_item_actividad.fixFilters.push({
                                    "field": "responsable_id",
                                    "value": vw_proyecto_item_actividad.session.id
                                });
                            }
                        } else {
                            STORAGE.add('depaP', vw_proyecto_item_actividad.departamentoPre);
                            vw_proyecto_item_actividad.fixFilters = [
                                {
                                    field: "proyecto_item_estatus",
                                    operator: ">",
                                    value: 1
                                },
                                {
                                    field: "compania",
                                    value: vw_proyecto_item_actividad.session.compania_id
                                },
                                {
                                    "field": "departamento_id",
                                    "value": vw_proyecto_item_actividad2.form.selected('departamentoPre').id
                                }
                            ];
                            if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                                vw_proyecto_item_actividad.fixFilters.push({
                                    "field": "responsable_id",
                                    "value": vw_proyecto_item_actividad.session.id
                                });
                            }
                        }
                    } else {
                        if (STORAGE.exist('depaP')) {
                            vw_proyecto_item_actividad2.departamentoPre = STORAGE.get('depaP');
                        } else {
                            vw_proyecto_item_actividad2.departamentoPre = "0";
                        }
                        vw_proyecto_item_actividad.fixFilters = [
                            {
                                field: "proyecto_item_estatus",
                                operator: ">",
                                value: 1
                            },
                            {
                                field: "compania",
                                value: vw_proyecto_item_actividad.session.compania_id
                            },
                        ];
                        if (vw_proyecto_item_actividad.session.groups[0].caracteristica == ENUM_2.Grupos.analista_departamental) {
                            vw_proyecto_item_actividad.fixFilters.push({
                                "field": "responsable_id",
                                "value": vw_proyecto_item_actividad.session.id
                            });
                        }
                        vw_proyecto_item_actividad.refresh();
                    }
                }
            }
            if (!vw_proyecto_item_actividad.do_me_once){
                vw_proyecto_item_actividad2.form.loadDropDown('departamentoPre');
                vw_proyecto_item_actividad.do_me_once = true;
            }
        }
    };
});
