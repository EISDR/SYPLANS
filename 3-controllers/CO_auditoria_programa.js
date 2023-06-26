app.controller("auditoria_programa", function ($scope, $http, $compile) {
    ready = async () => {
        auditoria_programa = this;
        auditoria_programa.loaded = false;
        auditoria_programa.session = new SESSION().current();
        auditoria_programa.fixFilters = [
            {
                field: "compania",
                value: -1
            }
        ];
        auditoria_programa.singular = "Programa de Auditoria";
        auditoria_programa.plural = "Programa de Auditoria";
        auditoria_programa.headertitle = "Plan de Auditorías";
        auditoria_programa.destroyForm = false;
        auditoria_programa.created = false;
        auditoria_programa.group_caracteristica = auditoria_programa.session.groups[0] ? auditoria_programa.session.groups[0].caracteristica : "";
        RUNCONTROLLER("auditoria_programa", auditoria_programa, $scope, $http, $compile);
        RUN_B("auditoria_programa", auditoria_programa, $scope, $http, $compile);
        auditoria_programa.netausuarios = await BASEAPI.listp('vw_usuarios', {
            limit: 0,
            where: [
                {
                    field: "compania_id",
                    value: auditoria_programa.session.compania_id
                }
            ]
        });
        auditoria_programa.netausuarios = auditoria_programa.netausuarios.data;
        auditoria_programa.netacargos = await BASEAPI.listp('vw_cargo', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: auditoria_programa.session.compania_id
                }
            ]
        });
        auditoria_programa.netacargos = auditoria_programa.netacargos.data;
        auditoria_programa.netaprocesos = await BASEAPI.listp('vw_procesos', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: auditoria_programa.session.compania_id
                }
            ]
        });
        auditoria_programa.netaprocesos = auditoria_programa.netaprocesos.data;
        auditoria_programa.netadepartamentos = await BASEAPI.listp('departamento', {
            limit: 0,
            where: [
                {
                    field: "compania",
                    value: auditoria_programa.session.compania_id
                }
            ]
        });
        auditoria_programa.netadepartamentos = auditoria_programa.netadepartamentos.data;
        auditoria_programa.auditoriaData = undefined;
        auditoria_programa.getPrograma = async function () {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            auditoria_programa.auditoriaData = await BASEAPI.firstp('vw_auditoria_programa', {
                order: "desc",
                where: [
                    {
                        field: "estatus",
                        operator: "!=",
                        value: 5
                    },
                    {
                        field: "compania",
                        value: auditoria_programa.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator": auditoria_programa.session.institucion_id ? "=" : "is",
                        "value": auditoria_programa.session.institucion_id ? auditoria_programa.session.institucion_id : "$null"
                    },
                ]
            });
            var auditoriaData = auditoria_programa.auditoriaData;
            if (auditoriaData) {
                auditoria_programa.created = true;
                auditoria_programa.id = auditoriaData.id;
                auditoria_programa.nombre = auditoriaData.nombre;
                auditoria_programa.descripcion = auditoriaData.descripcion;
                auditoria_programa.metodo_auditoria = auditoriaData.metodo_auditoria;
                auditoria_programa.fecha_inicio = auditoriaData.fecha_inicio;
                auditoria_programa.fecha_fin = auditoriaData.fecha_fin;
                auditoria_programa.range_date = LAN.date(auditoriaData.fecha_inicio) + " - " + LAN.date(auditoriaData.fecha_fin);
                auditoria_programa.estatus = auditoriaData.estatus;
                auditoria_programa.poa = auditoriaData.poa + '';
                auditoria_programa.estatus_nombre = auditoriaData.estatus_nombre;
                auditoria_programa.compania = auditoriaData.compania;
                auditoria_programa.institucion = auditoriaData.institucion;
                if (typeof auditoria_programa_plan !== 'undefined') {
                    if (typeof auditoria_programa_plan !== 'not defined') {
                        if (auditoria_programa_plan) {
                            auditoria_programa_plan.auditoria_programa = auditoriaData.id;
                            if (auditoriaData.id) {
                                auditoria_programa_plan.fixFilters = [
                                    {
                                        field: "auditoria_programa",
                                        value: auditoriaData.id ? auditoriaData.id : "$null"
                                    }
                                ];
                            } else {
                                auditoria_programa_plan.fixFilters = [
                                    {
                                        field: "compania",
                                        value: auditoria_programa.session.compania_id
                                    },
                                    {
                                        "field": "institucion",
                                        "operator": auditoria_programa.session.institucion_id ? "=" : "is",
                                        "value": auditoria_programa.session.institucion_id ? auditoria_programa.session.institucion_id : "$null"
                                    }
                                ];
                            }
                            if (MODAL.history.length == 0) {
                                if (auditoria_programa.estatus == 5) {
                                    $('.icon-plus-circle2 ').parent().hide();
                                    auditoria_programa.refreshAngular();
                                } else {
                                    $('.icon-plus-circle2 ').parent().show();
                                    auditoria_programa.refreshAngular();
                                }
                            }
                            auditoria_programa_plan.refresh(() => {
                                auditoria_programa.loaded = true;
                                auditoria_programa.refreshAngular();
                            });
                        }
                    }
                }
                if (typeof vw_auditoria_programa != "undefined") {
                    if (vw_auditoria_programa) {
                        if (typeof vw_auditoria_programa !== 'not defined') {
                            if (vw_auditoria_programa.dataForView) {
                                $('.icon-plus-circle2 ').parent().hide();
                                auditoria_programa_plan.fixFilters = [{
                                    "field": "auditoria_programa",
                                    "value": vw_auditoria_programa.dataForView.id
                                }];
                            }
                        }
                    }
                }
            } else {
                auditoria_programa.created = false;
                auditoria_programa.estatus_nombre = "Abierto";
            }
            await auditoria_programa.get_auditorias();
            auditoria_programa.refreshAngular();
            SWEETALERT.stop();
        };
        auditoria_programa.calculate_auditoriaEqualize = async function () {
            equlizer_with_Style('auditorias');
        };
        auditoria_programa.$scope.$watch("auditoria_programa.nombre", function (value) {
            var rules = [];
            rules.push(VALIDATION.general.required(value));
            rules.push(VALIDATION.yariel.maliciousCode(value));
            VALIDATION.validate(auditoria_programa, 'nombre', rules);
        });
        auditoria_programa.$scope.$watch("auditoria_programa.descripcion", function (value) {
            var rules = [];
            rules.push(VALIDATION.yariel.maliciousCode(value));
            VALIDATION.validate(auditoria_programa, 'descripcion', rules);
        });
        auditoria_programa.$scope.$watch("auditoria_programa.metodo_auditoria", function (value) {
            var rules = [];
            VALIDATION.validate(auditoria_programa, 'metodo_auditoria', rules);
        });
        auditoria_programa.$scope.$watch('auditoria_programa.fecha_inicio', function (value) {
            var rules = [];
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(auditoria_programa, "fecha_inicio", rules)
        });
        auditoria_programa.$scope.$watch('auditoria_programa.range_date', function (value) {
            var rules = [];
            rules.push(VALIDATION.general.required(value));
            VALIDATION.validate(auditoria_programa, "fecha_inicio", rules);
            VALIDATION.validate(auditoria_programa, "range_date", rules);
        });
        auditoria_programa.formulary = function (data, mode, defaultData) {
            if (auditoria_programa !== undefined) {
                RUN_B("auditoria_programa", auditoria_programa, $scope, $http, $compile);
                auditoria_programa.form.modalWidth = ENUM.modal.width.full;
                auditoria_programa.form.readonly = {};
                auditoria_programa.createForm(data, mode, defaultData, "formperformance", (data) => {

                });
                $scope.$watch("auditoria_programa.nombre", function (value) {
                    var rules = [];
                    VALIDATION.validate(auditoria_programa, 'nombre', rules);
                });
                $scope.$watch("auditoria_programa.descripcion", function (value) {
                    var rules = [];
                    VALIDATION.validate(auditoria_programa, 'descripcion', rules);
                });
                $scope.$watch("auditoria_programa.compania", function (value) {
                    var rules = [];
                    VALIDATION.validate(auditoria_programa, 'compania', rules);
                });
                $scope.$watch("auditoria_programa.institucion", function (value) {
                    var rules = [];
                    VALIDATION.validate(auditoria_programa, 'institucion', rules);
                });
                $scope.$watch("auditoria_programa.estatus", function (value) {
                    var rules = [];
                    VALIDATION.validate(auditoria_programa, 'estatus', rules);
                });
            }
        };
        auditoria_programa.saveData = function () {
            VALIDATION.save(auditoria_programa, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                if (auditoria_programa.created) {
                    BASEAPI.updateall('auditoria_programa', {
                        nombre: auditoria_programa.nombre,
                        descripcion: auditoria_programa.descripcion ? auditoria_programa.descripcion : "$null",
                        fecha_inicio: auditoria_programa.fecha_inicio ? moment(auditoria_programa.fecha_inicio).format("YYYY-MM-DD HH:mm:ss") : "$null",
                        fecha_fin: auditoria_programa.fecha_fin ? moment(auditoria_programa.fecha_fin).format("YYYY-MM-DD HH:mm:ss") : "$null",
                        estatus: auditoria_programa.estatus ? auditoria_programa.estatus : 1,
                        compania: auditoria_programa.session.compania_id ? auditoria_programa.session.compania_id : "$null",
                        institucion: auditoria_programa.session.institucion_id ? auditoria_programa.session.institucion_id : "$null",
                        where: [
                            {
                                field: "id",
                                value: auditoria_programa.id
                            }
                        ]
                    }, function (result) {
                        SWEETALERT.show({message: "Programa de Auditoria ha sido modificado"});
                    });
                } else {
                    BASEAPI.insertID('auditoria_programa', {
                        nombre: auditoria_programa.nombre,
                        descripcion: auditoria_programa.descripcion ? auditoria_programa.descripcion : "$null",
                        fecha_inicio: auditoria_programa.fecha_inicio ? moment(auditoria_programa.fecha_inicio).format("YYYY-MM-DD HH:mm:ss") : "$null",
                        fecha_fin: auditoria_programa.fecha_fin ? moment(auditoria_programa.fecha_fin).format("YYYY-MM-DD HH:mm:ss") : "$null",
                        estatus: auditoria_programa.estatus ? auditoria_programa.estatus : 1,
                        compania: auditoria_programa.session.compania_id ? auditoria_programa.session.compania_id : "$null",
                        institucion: auditoria_programa.session.institucion_id ? auditoria_programa.session.institucion_id : "$null",
                    }, '', '', function (result) {
                        if (result.data.data.length > 0) {
                            SWEETALERT.stop()
                            auditoria_programa.created = true;
                            auditoria_programa.refreshAngular();
                            setTimeout(function () {
                                auditoria_programa.getPrograma();
                            }, 2000)
                        }
                    });
                }
            }, ["nombre", "fecha_inicio", "range_date"]);
        }
        auditoria_programa.get_auditorias = async function () {
            auditoria_programa.from_programa_auditorias = await BASEAPI.firstp('vw_gauge_auditoria', {
                limit: 0,
                where: [
                    {
                        field: "id",
                        value: auditoria_programa.id
                    }
                ]
            });
            setTimeout(function () {
                auditoria_programa.gauge_auditorias = (echarts.init(document.getElementById('gauge_auditorias'), 'infographic'));
                let total = 0;
                if (auditoria_programa.from_programa_auditorias) {
                    let finalizadas = auditoria_programa.from_programa_auditorias.finalizadas;
                    total = (finalizadas) || 0;
                } else {
                    total = 0;
                }
                let optiond = {
                    darkMode: 'auto',
                    graphics: {
                        elements: {
                            type: "group",
                            cursor: "pointer"
                        }
                    },
                    series: [{
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: auditoria_programa.from_programa_auditorias.cantidad,
                        splitNumber: 10,
                        axisLine: {
                            lineStyle: {
                                width: 6,
                                shadowBlur: 4,
                                color: [
                                    [0.20, '#db0d22'],
                                    [0.40, '#db630d'],
                                    [0.60, '#fff700'],
                                    [0.80, '#1cfc08'],
                                    [1, '#0c9900']
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '12%',
                            width: 30,
                            offsetCenter: [0, '-55%'],
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {
                            length: 12,
                            lineStyle: {
                                color: 'auto',
                                width: 2
                            }
                        },
                        splitLine: {
                            length: 20,
                            lineStyle: {
                                color: 'auto',
                                width: 5
                            }
                        },
                        axisLabel: {
                            color: 'black',
                            fontSize: 22,

                            distance: -75,
                            padding: [40, 15, 15, 20],
                            formatter: function (value) {
                                if (auditoria_programa.from_programa_auditorias.cantidad > 0) {
                                    if (value === 0) {
                                        return 0;
                                    } else if (value == auditoria_programa.from_programa_auditorias.cantidad) {
                                        return auditoria_programa.from_programa_auditorias.cantidad;
                                    }
                                }
                            }
                        },
                        title: {
                            offsetCenter: [0, '-20%'],
                            fontSize: 30
                        },
                        detail: {
                            fontSize: 16,
                            offsetCenter: [0, '0%'],
                            valueAnimation: true,
                            formatter: function (value) {
                                return "Finalizadas: " + auditoria_programa.from_programa_auditorias.finalizadas + '';
                            },
                            borderWidth: 1,
                            color: 'black'
                        },
                        center: ["50%", "55%"],
                        data: [{value: total}],
                        radius: "100%"
                    }]
                };
                auditoria_programa.gauge_auditorias.setOption(optiond, true);
                auditoria_programa.calculate_auditoriaEqualize();
            }, 200);
        }

        auditoria_programa.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            resolve(true);
        });
        auditoria_programa.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            resolve(true);
        });
        auditoria_programa.puedessalir = true;
        RUNTABLE('auditoria_programa');
        auditoria_programa.refreshAngular();
    }
    ready();
});
