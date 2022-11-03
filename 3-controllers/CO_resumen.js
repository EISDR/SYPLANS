app.controller("resumen", function ($scope, $http, $compile) {
    resumen = this;
    var user = new SESSION().current();
    resumen.session = user;
    resumen.actualizacion = moment().format('DD/MM/YYYY h:mm');
    resumen.headertitle = `Plan Estratégico ${user.periodo_desde}-${user.periodo_hasta}`;
    RUNCONTROLLER("resumen", resumen, $scope, $http, $compile);
    RUN_B("resumen", resumen, $scope, $http, $compile);
    resumen.peiActivo = user.estatus ? user.pei_id : 0;
    var pei = [
        {
            "field": "pei",
            "value": resumen.peiActivo
        }
    ];
    var pei_id = [
        {
            "field": "pei_id",
            "value": resumen.peiActivo
        }
    ];
    var empty = [
        {
            "field": "id",
            "value": "-1"
        }
    ];
    resumen.selectQueries['mision'] = pei;
    resumen.selectQueries['vision'] = pei;
    resumen.selectQueries['eje_estrategico'] = pei;
    resumen.selectQueries['clientes'] = pei;
    resumen.selectQueries['indicadores_impacto'] = empty;
    resumen.selectQueries['objetivos'] = empty;
    resumen.selectQueries['valores'] = empty;
    resumen.selectQueries['drp_estrategia'] = pei_id;
    resumen.selectQueries['resultados'] = pei;

    resumen.refreshPart = function () {
        BASEAPI.listp('eje_estrategico', {where: pei}).then(function (result) {
            var ejes = [];
            for (var item of result.data) {
                ejes.push(item.id.toString());
            }
            resumen.selectQueries['indicadores_impacto'] = [
                {
                    "field": "id_eje_estrategico",
                    "value": ejes
                }
            ];
            resumen.selectQueries['objetivos'] = [
                {
                    "field": "eje_estrategico",
                    "value": ejes
                }
            ];

            resumen.form.loadDropDown('indicadores_impacto', false);
            resumen.form.loadDropDown('objetivos', false);

            BASEAPI.listp('drp_estrategia', {
                where: pei_id
            }).then(function (estrategias) {
                var ests = [];
                for (var item of estrategias.data) {
                    ests.push(item.id.toString());
                }
            });


        });
        BASEAPI.firstp('marco_estrategico', {where: pei}).then(function (result) {
            if (result !== null) {
                resumen.selectQueries['valores'] = [
                    {
                        "field": "marco_estrategico",
                        "value": result.id
                    }
                ];
                resumen.form.loadDropDown('valores', false);
            }
        });
    };

    resumen.refreshPart();

    resumen.refreshPanels = function () {
        resumen.form.loadDropDown('mision', false);
        resumen.form.loadDropDown('vision', false);
        resumen.form.loadDropDown('eje_estrategico', false);
        resumen.form.loadDropDown('clientes', false);
        resumen.refreshPart();
    }

    resumen.custom_window = async function (id, from_window){
        console.log(id);
        await estrategia.relateditems(id);
        if (from_window == 'foda'){
            if (estrategia.dataValuesIDs.length > 0) {
                resumen.modal.modalView("estrategia/vFodaxEstrategia", {
                    width: 'modal-full',
                    header: {
                        title: "Lista de FODA",
                        icon: "puzzle3"
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading'),
                        sameController: true
                    },
                });
            }
        }
        if(from_window == 'pesta'){
            if (estrategia.pestaDvaluesIDs.length > 0) {
                resumen.modal.modalView("estrategia/vpestaxEstrategia", {
                    width: 'modal-full',
                    header: {
                        title: "Lista de PESTA",
                        icon: "briefcase"
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading'),
                        sameController: true
                    },
                });
            }
        }
    }

});