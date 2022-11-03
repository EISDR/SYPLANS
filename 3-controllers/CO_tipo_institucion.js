app.controller("tipo_institucion", function ($scope, $http, $compile) {
    tipo_institucion = this;
    RUNCONTROLLER("tipo_institucion", tipo_institucion, $scope, $http, $compile);
    tipo_institucion.headertitle = MESSAGE.i('planificacion.titleTipoInstituciones');
    tipo_institucion.formulary = function (data, mode, defaultData) {
        if (tipo_institucion !== undefined) {
            RUN_B("tipo_institucion", tipo_institucion, $scope, $http, $compile);

            tipo_institucion.form.titles = {
                new: MESSAGE.i('planificacion.titleTipoInstitucion'),
                edit: "Editar - "+`${MESSAGE.i('planificacion.titleTipoInstitucion')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleTipoInstitucion')}`
            };
            tipo_institucion.form.readonly = {};
            tipo_institucion.createForm(data, mode, defaultData);
            tipo_institucion.$scope.$watch('tipo_institucion.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(tipo_institucion, "nombre", rules);
            });
            // tipo_institucion.form.rules = {
            //     name: function () {
            //         var rules = [];
            //         var value = tipo_institucion.nombre;
            //         rules.push(VALIDATION.general.required(value));
            //         //.push(VALIDATION.general.reglapropia(value));
            //         return VALIDATION.process(tipo_institucion, "nombre", rules)
            //     }
            // };
            // tipo_institucion.form.rulesGroup = {
            //     all: function () {
            //         return tipo_institucion.validation.stateIcon(tipo_institucion.form.fileds);
            //     },
            // };
        }
    };
});