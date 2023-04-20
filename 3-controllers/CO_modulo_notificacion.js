app.controller("modulo_notificacion", function ($scope, $http, $compile) {
    ready = async () => {
        modulo_notificacion = this;
        //modulo_notificacion.fixFilters = [];
        modulo_notificacion.fields = await BASEAPI.listp('vw_mdnfields', {
            limit: 0,
        });
        modulo_notificacion.fields = modulo_notificacion.fields.data;
        modulo_notificacion.types = ["Cadena", "Numero", "Fecha", "Booleano", "Campo"]
        modulo_notificacion.operators = {
            Cadena: ['Contiene', 'No Contiene', 'Igual a', 'Diferente a', 'En Blanco-', 'Con Algún Valor-'],
            Numero: ['Igual a', 'Diferente a', 'Es Nulo-', 'Menor que', 'Menor o igual', 'Mayor que', 'Mayor o igual'],
            Fecha: ['Fecha Exacta', 'Antes de', 'Después de', 'Fecha Exacta o Antes', 'Fecha Exacta o Después'],
            Booleano: ['Verdadero-', 'Falso-'],
            Campo: ['Igual a', 'Diferente a', 'Contiene a', 'No Contiene a']
        };
        modulo_notificacion.FieldsByTable = () => {
            return modulo_notificacion.fields.filter(d => d.table_name === modulo_notificacion.view).map(d => ('@' + d.column_name + '@'));
        }
        modulo_notificacion.FieldsByTablePure = () => {
            return modulo_notificacion.fields.filter(d => d.table_name === modulo_notificacion.view);
        }
        modulo_notificacion.strFieldsByTable = () => {
            return modulo_notificacion.FieldsByTable().join(', ');
        }
        modulo_notificacion.addField = () => {
            modulo_notificacion.code.conditions.push(
                {
                    id: new Date().getTime(),
                    tipo: "Cadena",
                    conjucion: "Y"
                }
            );
        }
        modulo_notificacion.deleteField = (ix, obj) => {
            let final = obj || modulo_notificacion.code.conditions
            if (final)
                final.splice(ix, 1);
        }
        modulo_notificacion.session = new SESSION().current();
        modulo_notificacion.fixFilters = [{
            field: "compania",
            value: modulo_notificacion.session.compania_id
        }];
        modulo_notificacion.singular = "Notificación";
        modulo_notificacion.plural = "Notificaciones";
        // modulo_notificacion.headertitle = "Hola Title";
        //modulo_notificacion.destroyForm = false;
        //modulo_notificacion.permissionTable = "tabletopermission";
        RUNCONTROLLER("modulo_notificacion", modulo_notificacion, $scope, $http, $compile);
        modulo_notificacion.formulary = function (data, mode, defaultData) {
            if (modulo_notificacion !== undefined) {
                RUN_B("modulo_notificacion", modulo_notificacion, $scope, $http, $compile);
                modulo_notificacion.form.modalWidth = ENUM.modal.width.full;
                modulo_notificacion.form.readonly = {compania: modulo_notificacion.session.compania_id};
                modulo_notificacion.form.titles = {
                    new: "Agregar XXX",
                    edit: "Editar Notificación",
                    view: "Ver Notificación"
                };
                modulo_notificacion.createForm(data, mode, defaultData, undefined, (data) => {
                    try {
                        if (mode === "new") {
                            modulo_notificacion.code = {conditions: []};
                        } else {
                            let parse = (modulo_notificacion.code || "{conditions: []}");
                            modulo_notificacion.code = JSON.parse(parse);
                            if (modulo_notificacion.code.conditions) {
                                if (modulo_notificacion.code.conditions.length) {
                                    modulo_notificacion.code.conditions.forEach(d => {
                                        if (d.tipo === "Fecha") {
                                            d.valor = new Date(d.valor);
                                        }
                                    });
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e);
                        modulo_notificacion.code = {conditions: []};
                    }
                });
                $scope.$watch("modulo_notificacion.nombre", function (value) {
                    var rules = [];
                    //rules here
                    // rules.push(VALIDATION.general.required(value));
                    $(".modal-title").html(`<h6 class="modal-title"><i class="icon-pencil7"></i> Editar Notificación: ${value}</h6>`);
                    VALIDATION.validate(modulo_notificacion, 'nombre', rules);
                });
                $scope.$watch("modulo_notificacion.descripcion", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(modulo_notificacion, 'descripcion', rules);
                });
                $scope.$watch("modulo_notificacion.view", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(modulo_notificacion, 'view', rules);
                });
                $scope.$watch("modulo_notificacion.template", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(modulo_notificacion, 'template', rules);
                });
                $scope.$watch("modulo_notificacion.code", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(modulo_notificacion, 'code', rules);
                });
            }
        };
        modulo_notificacion.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            data.inserting.code = JSON.stringify(modulo_notificacion.code);
            data.inserting.campos = modulo_notificacion.strFieldsByTable();
            resolve(true);
        });
        modulo_notificacion.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            data.updating.code = JSON.stringify(modulo_notificacion.code);
            data.updating.campos = modulo_notificacion.strFieldsByTable();
            resolve(true);
        });
        RUNTABLE('modulo_notificacion');
        modulo_notificacion.refreshAngular();
    };
    ready();
});