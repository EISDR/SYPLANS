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
        modulo_formulario.operators = {
            "alfanumérico": ['Los registros que contengan', 'Los registros que no contengan', 'Los registros iguales a', 'Los registros diferentes a', 'Registros en blanco-', 'Registros con valor-'],
            "numérico": ['Igual a', 'Diferente a', 'Es Nulo-', 'Menor que', 'Menor o igual', 'Mayor que', 'Mayor o igual'],
            "fecha": ['Fecha Exacta', 'Antes de', 'Después de', 'Fecha Exacta o Antes', 'Fecha Exacta o Después'],
            "fecha y hora": ['Fecha Exacta', 'Antes de', 'Después de', 'Fecha Exacta o Antes', 'Fecha Exacta o Después'],
            "booleano": ['Verdadero-', 'Falso-'],
            "check": ['Marcado-', 'Sin Marcar-'],
            "desición": ['Igual a'],
            "lista": ['Agrupado Por selección-', 'Cantidad de selección con', 'Cantidad de selección diferente a', 'Sin Selección'],
            "lista múltiple": ['Contiene', 'No Contiene']
        };
        modulo_formulario.tipoDeReportes = ["Lista", "Pastel", "Barra", "Línea"];
        modulo_formulario.singular = "Formulario";
        modulo_formulario.plural = "Formularios";
        modulo_formulario.registros = await BASEAPI.listp('modulo_formulario_registro', {limit: 0});
        modulo_formulario.registros = modulo_formulario.registros.data;
        //modulo_formulario.headertitle = "Hola Title";
        //modulo_formulario.destroyForm = false;
        //modulo_formulario.permissionTable = "tabletopermission";
        RUNCONTROLLER("modulo_formulario", modulo_formulario, $scope, $http, $compile);
        modulo_formulario.field_types = ["alfanumérico", "numérico", "booleano", "fecha", "fecha y hora", "check", "desición", "lista", "lista múltiple"];
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
                if (final && !obj)
                    final.push({
                        id: new Date().getTime(),
                        field: "Campo " + (modulo_formulario.config.fields.length + 1),
                        tipo: "alfanumérico",
                        config: {},
                        col: 3
                    });
                else if (obj) {
                    final.push({
                        id: new Date().getTime(),
                        union: "Y"
                    });
                } else
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
        modulo_formulario.getField = (fieldid) => {
            return (modulo_formulario?.config?.fields || []).filter(d => d.id === fieldid)[0] || {};
        }
        modulo_formulario.getOperator = (fieldid) => {
            let field = modulo_formulario.getField(fieldid);
            return modulo_formulario.operators[field.tipo];
        }
        modulo_formulario.cacheOptions = {};
        modulo_formulario.getOpciones = (fieldid) => {
            let field = modulo_formulario.getField(fieldid);
            if (!modulo_formulario.cacheOptions[fieldid])
                modulo_formulario.cacheOptions[fieldid] = [];

            if (field.tipo === "desición") {
                if (JSON.stringify([field.config.goodoption, field.config.badoption]) !== JSON.stringify(modulo_formulario.cacheOptions[fieldid]))
                    modulo_formulario.cacheOptions[fieldid] = [field.config.goodoption, field.config.badoption];
            }
            if (field.config.options)
                if (JSON.stringify(field.config.options.split(",")) !== JSON.stringify(modulo_formulario.cacheOptions[fieldid]))
                    modulo_formulario.cacheOptions[fieldid] = field.config.options.split(",");
            return modulo_formulario.cacheOptions[fieldid];
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
                modulo_formulario.createForm(data, mode, defaultData, undefined, async (data) => {
                    try {
                        if (mode === "new") {
                            modulo_formulario.config = {fields: [], filters: [], indicadores: []};
                        } else {
                            let parse = (modulo_formulario.config || "{fields: [],indicadores:[]}");
                            modulo_formulario.config = JSON.parse(parse);
                            if (!modulo_formulario.config.indicadores)
                                modulo_formulario.config.indicadores = [];
                            if (modulo_formulario.config.filters) {
                                if (modulo_formulario.config.filters.length) {
                                    for (const d of modulo_formulario.config.filters) {
                                        if (modulo_formulario.getField(d.field).tipo === "fecha") {
                                            d.value = new Date(d.value);
                                        }
                                        if (modulo_formulario.getField(d.field).tipo === "fecha y hora") {
                                            d.value = new Date(d.value);
                                        }
                                    }
                                }
                            }
                        }
                        await modulo_formulario.refresh_resuestas();
                    } catch (e) {
                        console.log(e);
                        modulo_formulario.config = {fields: [], filters: [], indicadores: []};
                    }
                    if (modulo_formulario.config.filters === undefined)
                        modulo_formulario.config.filters = [];
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
        modulo_formulario.calculate = (row, configuration, records) => {
            return "Programando";
        };
        modulo_formulario.refresh_resuestas = async function () {
            new ANIMATION().loading(
                "#respuestas",
                MESSAGE.ic('mono.refresing'),
                ".loadingButton", 140
            );
            modulo_formulario.usuarios_list = await BASEAPI.listp('vw_usuario', {
                limit: 0,
                where: [
                    {
                        "field": "compania",
                        "value": modulo_formulario.session ? modulo_formulario.session.compania_id : -1
                    },
                    {
                        "field": "institucion",
                        "operator": modulo_formulario.session.institucion_id ? "=" : "is",
                        "value": modulo_formulario.session ? modulo_formulario.session.institucion_id ? modulo_formulario.session.institucion_id : "$null" : -1
                    }
                ]
            });
            modulo_formulario.usuarios_list = modulo_formulario.usuarios_list.data;
            modulo_formulario.respuestas_cabeza = (await BASEAPI.listp('modulo_formulario_registro', {
                limit: 0,
                where: [
                    {
                        field: "modulo_formulario",
                        value: modulo_formulario.id
                    }
                ]
            })).data;

            if (modulo_formulario.respuestas_cabeza && modulo_formulario.respuestas_cabeza.length > 0) {
                modulo_formulario.respuestas_data = modulo_formulario.respuestas_cabeza.map(i => JSON.parse(i.respuestas));

                if (modulo_formulario.respuestas_data.length > 0) {
                    let allKeys = modulo_formulario.respuestas_data.reduce((acc, obj) => {
                        Object.keys(obj).forEach(key => {
                            if (!acc.includes(key)) {
                                acc.push(key);
                            }
                        });
                        return acc;
                    }, []);
                    modulo_formulario.respuestas_data_head = allKeys.filter(item => item !== '$$hashKey');
                }
            }
            new ANIMATION().stoploading(
                "#respuestas",
                ".loadingButton"
            );
        }
        modulo_formulario.exportXLS = function () {
            var url = $("#dataexport").excelexportjs({
                containerid: "dataexport",
                datatype: 'table',
                worksheetName: `Respuestas del Formulario: ${modulo_formulario.nombre}`,
                returnUri: true
            });
            DOWNLOAD.excel(`Respuestas del Formulario  ${modulo_formulario.nombre}`, url);
        };

        modulo_formulario.exportPDF = function () {
            $("#datashow").printThis({
                importCSS: false,                // import parent page css
                loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
                printDelay: 333,
            });
        }
        modulo_formulario.format_date = function (value) {
            return LAN.datetime(value);
        }
        modulo_formulario.return_userName = function (value) {
            if (modulo_formulario.usuarios_list && modulo_formulario.usuarios_list.length > 0) {
                let usuario = modulo_formulario.usuarios_list.filter(d => {
                    return d.id === value
                })[0];
                return usuario ? usuario.completo : 'Anonimo';
            }
            return '';
        }
        modulo_formulario.get_head_value = (head_key, value) => {
            if (modulo_formulario.respuestas_data && modulo_formulario.respuestas_data.length > 0) {
                const rawValue = modulo_formulario.respuestas_data[head_key][value];
                if (Array.isArray(rawValue)) {
                    return rawValue.join(', ');
                } else if (moment(rawValue, moment.ISO_8601, true).isValid()) {
                    // Si es una fecha en formato ISO 8601, devolverla formateada
                    return moment(rawValue).format('DD/MM/YYYY');
                } else if (typeof rawValue === 'number') {
                    // Formatear número como valor monetario (ej. $123.45)
                    return `$${rawValue.toFixed(2)}`;
                } else if (typeof rawValue === 'boolean') {
                    // Devolver 'Sí' o 'No' para valores booleanos
                    return rawValue ? 'Sí' : 'No';
                } else if (Number.isInteger(rawValue)) {
                    // Devolver número entero sin cambios
                    return rawValue.toString();
                } else {
                    return rawValue;
                }
            } else {
                return '';
            }
        };
    }
    ready();
});