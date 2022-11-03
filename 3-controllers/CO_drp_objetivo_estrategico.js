app.controller("drp_objetivo_estrategico", function ($scope, $http, $compile) {
    drp_objetivo_estrategico = this;
    var validar = false;
    drp_objetivo_estrategico.session = new SESSION().current();
    drp_objetivo_estrategico.publica = ENUM_2.COMPANY_TYPE.publica;
    drp_objetivo_estrategico.auditModel = "vw_objetivo_estrategico";
    drp_objetivo_estrategico.fixFilters = [
        {
            field: 'pei_id',
            operator: "=",
            value: new SESSION().current().estatus ? new SESSION().current().pei_id : 0
        }
    ];
    RUNCONTROLLER("drp_objetivo_estrategico", drp_objetivo_estrategico, $scope, $http, $compile);
    drp_objetivo_estrategico.headertitle = MESSAGE.i('planificacion.titleObjetivoEstrategicos');
    getPEIstatus(drp_objetivo_estrategico, drp_objetivo_estrategico.session.pei_id);
    drp_objetivo_estrategico.triggers.table.after.load = function (){
        if (drp_objetivo_estrategico.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            drp_objetivo_estrategico.setPermission("add",false);
        }
        check_PEI("drp_objetivo_estrategico", drp_objetivo_estrategico.session.pei_id);
    };
    drp_objetivo_estrategico.plural = " "+MESSAGE.i('planificacion.titleObjetivoEstrategicos');
    drp_objetivo_estrategico.formulary = function (data, mode, defaultData) {
        if (drp_objetivo_estrategico !== undefined) {
            RUN_B("drp_objetivo_estrategico", drp_objetivo_estrategico, $scope, $http, $compile);
            drp_objetivo_estrategico.form.titles = {
                new: MESSAGE.i('planificacion.titleObjetivoEstrategico'),
                edit: "Editar - "+` ${MESSAGE.i('planificacion.titleObjetivoEstrategico')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleObjetivoEstrategico')}`
            };
            drp_objetivo_estrategico.form.schemas.insert['alineacionoe'] = FORM.schemasType.calculated;
            drp_objetivo_estrategico.form.readonly = {};
            drp_objetivo_estrategico.createForm(data, mode, defaultData);
            validar = false;
            drp_objetivo_estrategico.selectQueries["eje_estrategico"] = [
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().pei_id
                }

            ];

            drp_objetivo_estrategico.$scope.$watch('drp_objetivo_estrategico.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_objetivo_estrategico, "nombre", rules);
            });

            drp_objetivo_estrategico.$scope.$watch('drp_objetivo_estrategico.eje_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_objetivo_estrategico, "eje_estrategico", rules);

                if(drp_objetivo_estrategico.session.tipo_institucion === ENUM_2.COMPANY_TYPE.publica) {
                    if (validar === false && mode === "edit" && drp_objetivo_estrategico.id !== undefined){
                        validar = true;
                        drp_objetivo_estrategico.alineacionoe = [];
                        BASEAPI.list('objetivo_estrategico_oe_end',{
                            limit: 0,
                            orderby: 'objetivo',
                            order: "asc",
                            where: [{
                                "field": "eje_estrategico_id",
                                "value": drp_objetivo_estrategico.eje_estrategico
                            }]
                        },function (result) {
                            if(result){
                                for(var value of result.data){
                                    console.log(value.objetivo);
                                    drp_objetivo_estrategico.alineacionoe.push(value.objetivo);
                                }
                            }

                        });
                    }
                }

            });

            drp_objetivo_estrategico.$scope.$watch('drp_objetivo_estrategico.alineacionoe', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_objetivo_estrategico, "alineacionoe", rules);
            });
        }
    };
});