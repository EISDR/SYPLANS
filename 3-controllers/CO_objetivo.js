app.controller("objetivo", function ($scope, $http, $compile) {
    objetivo = this;
    objetivo.id_end = [];
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
    // objetivo.refresh();
    // if(!result.data.length > 0){
    // } else {
    //     for(var value of result.data){
    //         objetivo.id_end.push(value.id);
    //     }
    // }
    // });
    // objetivo.fixFilters = [
    //     {
    //         "field": "end",
    //         "value": objetivo.id_end
    //     }
    // ];
    // objetivo.destroyForm = false;
    objetivo.session = new SESSION().current();
    RUNCONTROLLER("objetivo", objetivo, $scope, $http, $compile);
    RUN_B("objetivo", objetivo, $scope, $http, $compile);
    objetivo.triggers.table.after.load = () => new Promise((resolve, reject) => {
        console.log()
        for (var i in objetivo.records.data) {
            objetivo.records.data[i].edt = end.edt + (objetivo.records.data[i].edt ? `.${objetivo.records.data[i].edt}` : '');
        }
        setTimeout(function () {
            MESSAGE.run();
            resolve(true);
        }, 500);

        objetivo_especifico.filters.fields = [
            {
                key: 'id',
                label: 'ID',
                type: FILTER.types.integer,
                placeholder: 'ID'
            },
            {
                key: 'nombre',
                label: 'Nombre',
                type: FILTER.types.string,
                placeholder: 'Nombre'
            }
            ,
            {
                key: 'descripcion',
                label: 'Descripción',
                type: FILTER.types.string,
                placeholder: 'Descripción'
            },
            {
                key: 'objetivo',
                label: 'Objetivo',
                type: FILTER.types.relation,
                table: 'vw_objetivo_general',
                value: "id",
                text: "item.edt_nombre",
                query: {
                    limit: 0,
                    page: 1,
                    where: [{
                        field: "end",
                        value: end.id
                    }],
                    orderby: "id",
                    order: "asc",
                    distinct: false
                },
            },
        ];
        linea_accion.filters.fields = [
            {
                key: 'id',
                label: 'ID',
                type: FILTER.types.integer,
                placeholder: 'ID'
            },
            {
                key: 'nombre',
                label: 'Nombre',
                type: FILTER.types.string,
                placeholder: 'Nombre'
            }
            ,
            {
                key: 'descripcion',
                label: 'Descripción',
                type: FILTER.types.string,
                placeholder: 'Descripción'
            },
            {
                key: 'objetivo',
                label: 'Objetivo General',
                type: FILTER.types.relation,
                table: 'vw_objetivo_general',
                value: "id",
                text: "item.edt_nombre",
                query: {
                    limit: 0,
                    page: 1,
                    where: [{
                        field: "end",
                        value: end.id
                    }],
                    orderby: "id",
                    order: "asc",
                    distinct: false
                },
            },
            {
                key: 'objetivo_especifico',
                label: 'Objetivo Específico',
                type: FILTER.types.relation,
                table: 'vw_objetivo_especifico',
                value: "id",
                text: "item.edt_nombre",
                query: {
                    limit: 0,
                    page: 1,
                    where: [{
                        field: "end",
                        value: end.id
                    }],
                    orderby: "id",
                    order: "asc",
                    distinct: false
                },
            }
        ];
    });
    objetivo.headertitle = "Objetivos Generales";
    objetivo.formulary = function (data, mode, defaultData) {
        if (objetivo !== undefined) {
            RUN_B("objetivo", objetivo, $scope, $http, $compile);

            objetivo.form.titles = {
                new: "Agregar Objetivo General al END: " + end.nombre,
                edit: "Editar Objetivo General del END: " + end.nombre,
                view: "Ver Objetivo General del END: " + end.nombre
            };
            objetivo.form.readonly = {};
            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                objetivo.form.getfilter = {
                    field: RELATIONS.anonymous[$scope.modelName].fieldKey
                };
            }
            objetivo.createForm(data, mode, defaultData);
            objetivo.$scope.$watch('objetivo.edt', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 99999));
                VALIDATION.validate(objetivo, "edt", rules);
            });
            objetivo.$scope.$watch('objetivo.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(objetivo, "nombre", rules)
            });
            objetivo.$scope.$watch('objetivo.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(objetivo, "descripcion", rules);
            });
        }
    };

    objetivo.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("objetivo", {
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
                    value: `end${end.form.options.objetivo.tempId}`
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para esta Estrategia de Desarrollo Nacional existe un objetivo general con el No. Secuencia: " + data.inserting.edt
            });
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    objetivo.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        var validatett = await BASEAPI.firstp("objetivo", {
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
                    value: `end${end.form.options.objetivo.tempId}`
                },
                {
                    field: "id",
                    operator: "!=",
                    value: objetivo.id
                },
            ]
        });
        if (validatett) {
            SWEETALERT.show({
                type: "error",
                title: "",
                message: "Para esta Estrategia de Desarrollo Nacional existe un objetivo general con el No. Secuencia: " + data.updating.edt
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
