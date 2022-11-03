app.controller("objetivo_especifico", function ($scope, $http, $compile) {
    objetivo_especifico = this;
    objetivo_especifico.id_objetivo = [];
    // BASEAPI.list('end',{
    //     limit: 0,
    //     page: 1,
    //     orderby: "id",
    //     order: "asc",
    //     where: [{
    //         "field": "compania",
    //         "value": new SESSION().current().compania_id
    //     }]
    // },function (result) {
    // objetivo_especifico.refresh();
    // if(!result.data.length > 0){
    // } else {
    //     for(var value of result.data){
    //         objetivo_especifico.id_end.push(value.id);
    //     }
    // }
    // });
    // objetivo_especifico.fixFilters = [
    //     {
    //         "field": "end",
    //         "value": objetivo_especifico.id_end
    //     }
    // ];
    // objetivo_especifico.destroyForm = false;
    objetivo_especifico.session = new SESSION().current();
    RUNCONTROLLER("objetivo_especifico", objetivo_especifico, $scope, $http, $compile);
    RUN_B("objetivo_especifico", objetivo_especifico, $scope, $http, $compile);
    objetivo_especifico.triggers.table.after.load = () => new Promise((resolve, reject) => {
        console.log()
        for (var i in objetivo_especifico.records.data) {
            objetivo_especifico.records.data[i].edt = end.edt + "." + objetivo_especifico.records.data[i].objetivo_edt + (objetivo_especifico.records.data[i].edt ? `.${objetivo_especifico.records.data[i].edt}` : '');
        }
        setTimeout(function () {
            MESSAGE.run();
            resolve(true);
        }, 500);
    });
    objetivo_especifico.headertitle = "Objetivos Específicos";
    objetivo_especifico.formulary = function (data, mode, defaultData) {
        if (objetivo_especifico !== undefined) {
            RUN_B("objetivo_especifico", objetivo_especifico, $scope, $http, $compile);

            objetivo_especifico.form.titles = {
                new: "Agregar Objetivo Específico al END: " + end.nombre,
                edit: "Editar Objetivo Específico del END: " + end.nombre,
                view: "Ver Objetivo Específico del END: " + end.nombre
            };
            objetivo_especifico.form.readonly = {};
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                objetivo_especifico.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }
            objetivo_especifico.createForm(data, mode, defaultData);
            objetivo_especifico.$scope.$watch('objetivo_especifico.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(objetivo_especifico, "edt", rules)
            });

            objetivo_especifico.$scope.$watch('objetivo_especifico.objetivo', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(objetivo_especifico, "objetivo", rules)
            });

            objetivo_especifico.$scope.$watch('objetivo_especifico.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(objetivo_especifico, "nombre", rules)
            });
            objetivo_especifico.$scope.$watch('objetivo_especifico.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(objetivo_especifico, "descripcion", rules);
            });
        }
    };

    objetivo_especifico.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        delete data.inserting.poa;
        var validatett = await BASEAPI.firstp("objetivo_especifico", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.inserting.edt
                },
                {
                    open: "(",
                    field: "end",
                    operator: "=",
                    value: end.id ? end.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `end${end.form.options.objetivo_especifico.tempId}`
                },
                {
                    field: "objetivo",
                    value: objetivo_especifico.objetivo
                }
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este objetivo general existe un objetivo especifico con el No. Secuencia: " + data.inserting.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    objetivo_especifico.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        if (objetivo_especifico.edt)
            data.updating.edt = objetivo_especifico.edt;
        delete data.updating.poa;
        var validatett = await BASEAPI.firstp("objetivo_especifico", {
            where: [
                {
                    field: "edt",
                    operator: "=",
                    value: data.updating.edt
                },
                {
                    open: "(",
                    field: "end",
                    operator: "=",
                    value: end.id ? end.id : "$null",
                    connector: "OR"
                },
                {
                    close: ")",
                    field: "tempid",
                    operator: "=",
                    value: `end${end.form.options.objetivo_especifico.tempId}`
                },
                {
                    field: "objetivo",
                    value: objetivo_especifico.objetivo
                },
                {
                    field: "id",
                    operator: "!=",
                    value: objetivo_especifico.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para este objetivo general existe un objetivo especifico con el No. Secuencia: " + data.updating.edt
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
