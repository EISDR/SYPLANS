app.controller("pnpsp", function ($scope, $http, $compile) {
    pnpsp = this;
    // pnpsp.fixFilters = [
    //     {
    //         "field": "compania",
    //         "value": new SESSION().current().compania_id
    //     }
    // ];
    RUNCONTROLLER("pnpsp", pnpsp, $scope, $http, $compile);
    pnpsp.plural = MESSAGE.i('planificacion.titlePNPSP');
    pnpsp.singular = "PNPSP";
    pnpsp.formulary = function (data, mode, defaultData) {
        if (pnpsp !== undefined) {
            RUN_B("pnpsp", pnpsp, $scope, $http, $compile);
            pnpsp.form.titles = {
                new: MESSAGE.i('planificacion.titlePNPSP'),
                edit: "Editar - " + `${MESSAGE.i('planificacion.titlePNPSP')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlePNPSP')}`
            };

            pnpsp.form.schemas.insert = {};
            pnpsp.form.schemas.select = {};
            pnpsp.form.readonly = {};
            pnpsp.createForm(data, mode, defaultData);
            pnpsp.$scope.$watch('pnpsp.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(pnpsp, "edt", rules);
            });
            pnpsp.$scope.$watch('pnpsp.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pnpsp, "nombre", rules);
            });
            pnpsp.$scope.$watch('pnpsp.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(pnpsp, "descripcion", rules);
            });
        }
    };
    pnpsp.triggers.table.after.load = function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
        pnpsp.runMagicOneToMany('denominacion_pnpsp', 'vw_denominacion_pnpsp', 'pnpsp', 'nombre_sec', 'id');
    };
    pnpsp.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("pnpsp", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.inserting.edt
                },
                {
                    field: "compania",
                    value: new SESSION().current() ? (CONFIGCOMPANY.sectorial|| new SESSION().current().compania_id) : -1
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.inserting.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    pnpsp.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (pnpsp.edt)
            data.updating.edt = pnpsp.edt;
        var validatett = await BASEAPI.firstp("pnpsp", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.updating.edt
                },
                {
                    field: "compania",
                    value: new SESSION().current() ? (CONFIGCOMPANY.sectorial|| new SESSION().current().compania_id) : -1
                },
                {
                    field: "id",
                    operator: "!=",
                    value: pnpsp.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Ya existe un registro con el No. Secuencia: " + data.updating.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
});
