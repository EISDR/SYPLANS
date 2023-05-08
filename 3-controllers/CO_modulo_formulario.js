app.controller("modulo_formulario", function ($scope, $http, $compile) {
    ready = async () => {
        modulo_formulario = this;
        //modulo_formulario.fixFilters = [];
        modulo_formulario.session = new SESSION().current();
        modulo_formulario.fixFilters = [{
            field: "compania",
            value: modulo_formulario.session.compania_id
        }];
        modulo_formulario.tamanos = [
            {nombre: "Muy Pequeño", value: 2},
            {nombre: "Pequeño", value: 4},
            {nombre: "Mitad", value: 6},
            {nombre: "Grande", value: 8},
            {nombre: "Muy Grande", value: 10},
            {nombre: "Línea Completa", value: 12}
        ];
        modulo_formulario.singular = "Formulario";
        modulo_formulario.plural = "Formularios";
        modulo_formulario.registros = await BASEAPI.listp('modulo_formulario_registro', {limit: 0});
        modulo_formulario.registros = modulo_formulario.registros.data;
        //modulo_formulario.headertitle = "Hola Title";
        //modulo_formulario.destroyForm = false;
        //modulo_formulario.permissionTable = "tabletopermission";
        RUNCONTROLLER("modulo_formulario", modulo_formulario, $scope, $http, $compile);
        modulo_formulario.field_types = ["alfanumérico", "numérico", "booleano", "fecha", "fecha y hora", "desición", "check", "lista", "lista múltiple"];
        modulo_formulario.deleteField = (ix, obj) => {
            let final = obj || modulo_formulario.config.fields
            if (final)
                final.splice(ix, 1);
        }
        modulo_formulario.movecode = (ix, array) => {
            if (array[ix - 1]) {
                let temp = array[ix - 1];
                array[ix - 1] = array[ix];
                array[ix] = temp;
            } else if (ix !== (array.length - 1)) {
                let temp = array[array.length - 1];
                array[array.length - 1] = array[ix];
                array[ix] = temp;
            }
        }
        modulo_formulario.addField = (obj) => {
            if (modulo_formulario.config) {
                let final = obj || modulo_formulario.config.fields
                if (final)
                    final.push({
                        id: new Date().getTime(),
                        field: "Campo " + (modulo_formulario.config.fields.length + 1),
                        tipo: "alfanumérico",
                        config: {},
                        col: 3
                    });
                else
                    modulo_formulario.config = {fields: [], indicadores: []};
            } else
                modulo_formulario.config = {fields: [], indicadores: []};
        }
        modulo_formulario.addIndicador = (obj) => {
            if (modulo_formulario.config) {
                let final = obj || modulo_formulario.config.indicadores
                if (final)
                    final.push({
                        id: new Date().getTime(),
                        nombre: "Indicador " + (final.length + 1),
                        desde: 0,
                        hasta: 10,
                        color: "#FF0000"
                    });
                else
                    modulo_formulario.config = {fields: [], indicadores: []};
            } else
                modulo_formulario.config = {fields: [], indicadores: []};
        }
        modulo_formulario.formulary = function (data, mode, defaultData) {
            if (modulo_formulario !== undefined) {
                RUN_B("modulo_formulario", modulo_formulario, $scope, $http, $compile);
                modulo_formulario.form.modalWidth = ENUM.modal.width.full;
                modulo_formulario.form.readonly = {compania: modulo_formulario.session.compania_id};
                modulo_formulario.form.titles = {
                    new: "Agregar Formulario",
                    edit: "Editar Formulario",
                    view: "Ver Formulario"
                };
                modulo_formulario.createForm(data, mode, defaultData, undefined, (data) => {
                    try {
                        if (mode === "new") {
                            modulo_formulario.config = {fields: [], indicadores: []};
                        } else {
                            let parse = (modulo_formulario.config || "{fields: [],indicadores:[]}");
                            modulo_formulario.config = JSON.parse(parse);
                            if (!modulo_formulario.config.indicadores)
                                modulo_formulario.config.indicadores = [];
                        }
                    } catch (e) {
                        console.log(e);
                        modulo_formulario.config = {fields: [], indicadores: []};
                    }
                });
                $scope.$watch("modulo_formulario.nombre", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    if (modulo_formulario.form.mode === "new") {
                        $(".modal-title").html(`<h6 class="modal-title"><i class="icon-pencil7"></i> Crear Notificación: ${value || ""}</h6>`);
                    } else
                        $(".modal-title").html(`<h6 class="modal-title"><i class="icon-pencil7"></i> Editar Notificación: ${value || ""}</h6>`);
                    VALIDATION.validate(modulo_formulario, 'nombre', rules);
                });
                $scope.$watch("modulo_formulario.descripcion", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(modulo_formulario, 'descripcion', rules);
                });
                $scope.$watch("modulo_formulario.config", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(modulo_formulario, 'config', rules);
                });
            }
        };
        modulo_formulario.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            data.inserting.config = JSON.stringify(modulo_formulario.config);

            resolve(true);
        });
        modulo_formulario.triggers.table.after.insert = function (data) {
            location.reload();
            return true;
        };
        modulo_formulario.triggers.table.after.delete = function (data) {
            location.reload();
            return true;
        };
        modulo_formulario.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            data.updating.config = JSON.stringify(modulo_formulario.config);
            resolve(true);
        });
        modulo_formulario.afterDelete = async function (data) {
            location.reload();
        }
        RUNTABLE('modulo_formulario');
        modulo_formulario.refreshAngular();
    }
    ready();
});