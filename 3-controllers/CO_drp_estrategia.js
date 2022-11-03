app.controller("drp_estrategia", function ($scope, $http, $compile) {
    drp_estrategia = this;
    drp_estrategia.session = new SESSION().current();
    drp_estrategia.auditModel = "vw_estrategia";
    var paso = true;
    drp_estrategia.fixFilters = [
        {
            "field": "pei_id",
            "value": new SESSION().current().estatus ? new SESSION().current().pei_id : 0
        }
    ];
    drp_estrategia.headertitle = "Estrategias";
    RUNCONTROLLER("drp_estrategia", drp_estrategia, $scope, $http, $compile);
    getPEIstatus(drp_estrategia, drp_estrategia.session.pei_id);
    drp_estrategia.plural = MESSAGE.i('planificacion.drp_estrategias');
    drp_estrategia.triggers.table.after.load = function (){
        if (drp_estrategia.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            drp_estrategia.setPermission("add",false);
        }
        check_PEI("drp_estrategia", drp_estrategia.session.pei_id);
    };
    drp_estrategia.triggers.table.after.open = function (data) {
        console.log('sii abri');
    };
    drp_estrategia.triggers.table.after.close = function (data) {
        // $('#btnformfooter').each(function () {
        //     console.log("sii cerre ",$( this ));
            $('#btnformfooter').remove();
            $('#btnformfooter').remove();
            $('#btnformfooter').remove();
        // });
    };
    drp_estrategia.formulary = function (data, mode, defaultData) {
        if (drp_estrategia !== undefined) {
            RUN_B("drp_estrategia", drp_estrategia, $scope, $http, $compile);
            drp_estrategia.form.titles = {
                new: MESSAGE.i('planificacion.titleEstrategia'),
                edit: "Editar - "+` ${MESSAGE.i('planificacion.titleEstrategia')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleEstrategia')}`
            };
            drp_estrategia.selectQueries["eje_estrategico"] = [
                // {
                //     field: "compania",
                //     operator: "=",
                //     value: new SESSION().current().estatus ? new SESSION().current().compania_id : 0
                // },
                {
                    field: "pei",
                    operator: "=",
                    value: new SESSION().current().estatus ? new SESSION().current().pei_id : 0
                }
            ];
            drp_estrategia.form.readonly = {};
            drp_estrategia.createForm(data, mode, defaultData);
            drp_estrategia.$scope.$watch('drp_estrategia.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_estrategia, "nombre", rules);
            });


            drp_estrategia.$scope.$watch('drp_estrategia.eje_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_estrategia, "eje_estrategico", rules);
            });


            drp_estrategia.$scope.$watch('drp_estrategia.objetivo_estrategico', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_estrategia, "objetivo_estrategico", rules);
            });
        }
    };

    drp_estrategia.relateditems = async function(id) {
        drp_estrategia.dataValuesIDs = [];
        drp_estrategia.pestaDvaluesIDs = [];
        drp_estrategia.dataValues =  await getRelationData('estrategia_foda', "estrategia", id);
        drp_estrategia.pestaDvalues = await getRelationData('estrategia_pesta', 'estrategia', id);
        for (var i of drp_estrategia.dataValues) {
            drp_estrategia.dataValuesIDs.push(i.foda);
        }
        for (var i of drp_estrategia.pestaDvalues) {
            drp_estrategia.pestaDvaluesIDs.push(i.pesta);
        }
    };
});