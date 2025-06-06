VALIDATION = DSON.merge(VALIDATION, {
    yariel: {
        mayorQue: function (value, value2, field, field2) {
            console.log("entre",value2, value, (value2 <= value))
            value = value || "";
            value2 = value2 || "";
            return {
                valid: (value2 <= value),
                message: MESSAGE.ieval('planificacion.mayorQue', {field: field, field2: field2}),
                type: VALIDATION.types.error
            };
        },
        menorQue: function (value, value2, field, field2) {
            value = value || "";
            value2 = value2 || "";
            return {
                valid: (value2 >= value),
                message: MESSAGE.ieval('planificacion.menorQue', {field: field, field2: field2}),
                type: VALIDATION.types.error
            };
        },
        meta_alcanzada_indicador: function (array, field, default_value, current_value, callback) {
            if (callback){
                let array_value = array.filter(d=> {
                    return d.valor_alcanzado
                }) || [];
                callback(current_value == default_value || array_value.length == 0)
                return {
                    valid: current_value == default_value || array_value.length == 0,
                    message: `${field} no se puede cambiar debido a que existen metas alcanzadas ya digitadas en el indicador `,
                    type: VALIDATION.types.error
                }
            }else{
                let array_value = array.filter(d=> {
                    return d.valor_alcanzado
                }) || [];
                return {
                    valid: current_value == default_value || array_value.length == 0,
                    message: `${field} no se puede cambiar debido a que existen metas alcanzadas ya digitadas en el indicador `,
                    type: VALIDATION.types.error
                }
            }

        },
        customValidation: function (value, value2, message) {
            value = value || "";
            value2 = value2 || "";
            return {
                valid: value === value2,
                message: message,
                type: VALIDATION.types.error
            };
        },
        greaterThan: function (value, value2, value3, field, field2) {
            value = value || "";
            value2 = value2 || "";
            value3 = value3 || "";
            return {
                valid: ((value2 >= value) && (value3 >= value)),
                message: MESSAGE.ieval('planificacion.greaterThan', {field: field, field2: field2}),
                type: VALIDATION.types.error
            };
        },
        greaterThanAct: function (value, value2, field, field2) {

            value = value || 0;
            value2 = value2 || 0;
            console.log(value, "El primer valor", value2, "el segundo valor");
            return {
                valid: (value2 >= value),
                message: MESSAGE.ieval('planificacion.greaterThan', {
                    field: field,
                    field2: field2
                }) + `. El presupuesto máximo que se puede asignar en este caso es de: ${LAN.money(value2).format(true)}`,
                type: VALIDATION.types.error
            };
        },
        lesserThanAct: function (value, value2, field, field2) {

            value = value || 0;
            value2 = value2 || 0;
            console.log(value, "El primer valor", value2, "el segundo valor");
            return {
                valid: (value2 <= value),
                message: MESSAGE.ieval('planificacion.lesserThan', {
                    field: field,
                    field2: field2
                }) + `. El presupuesto mínimo que se puede asignar en este caso es de: ${LAN.money(value2).format(true)}`,
                type: VALIDATION.types.error
            };
        },
        presupuesto_editar: function (value, value2, value3) {
            value = value || "";
            value2 = value2 || "";
            value3 = value3 || "";
            // console.log(value,value2,value3,'');
            return {
                valid: (((value - value2) + value3) >= 0),
                message: MESSAGE.ieval('planificacion.tieneQueMenor'),
                type: VALIDATION.types.error
            };
        },
        mayorCero: function (value, field) {

            value = LAN.money(value).value || "";
            return {
                valid: (value > 0 && value != ""),
                message: MESSAGE.ieval('planificacion.mayorCero', {field: field}),
                type: VALIDATION.types.error,
            };
        },
        mayorCeroMeta: function (value, field) {
            value = value || "";

            return {
                valid: (value != ""),
                message: MESSAGE.ieval('planificacion.mayorCeroMeta', {field: field}),
                type: VALIDATION.types.error,
            };
        },
        required: function (value, field) {
            value = value || "";

            return {
                valid: (value != "" || value != null),
                message: MESSAGE.ieval('planificacion.required', {field: field}),
                type: VALIDATION.types.error,
            };
        },
        equal: function (value, value2, field, field2) {
            value = value || "";
            value2 = value2 || "";
            return {
                valid: (value === value2),
                message: MESSAGE.ieval('planificacion.fieldPassword', {field: field, field2: field2}),
                type: VALIDATION.types.error
            };
        },
        duplicateEmail: function (value1, value2) {
            return {
                valid: (value1 !== value2) || value1 === "",
                message: "El correo ya existe",
                type: VALIDATION.types.error
            };
        },
        duplicateCode: function (value1, value2) {
            return {
                valid: (value1 !== value2) || value1 === "",
                message: "El Código ya existe",
                type: VALIDATION.types.error
            };
        },
        telefono7: function (value, field) {
            value = value || "";
            return {
                valid: (value.search('_') == -1),
                message: MESSAGE.ieval('planificacion.telefono7', {field: field}),
                type: VALIDATION.types.error
            };
        },
        valid_year: function (value) {
            value = value || '';
            return {
                valid: (value === moment().format('YYYY')),
                message: MESSAGE.ieval('planificacion.valid_year'),
                type: VALIDATION.types.error
            }
        },
        numberPositive: function (value, field) {
            value = value || "";
            return {
                valid: (value > -1),
                message: MESSAGE.ieval('planificacion.required', {field: field}),
                type: VALIDATION.types.error
            }
        },
        maliciousCode: function (value) {
            value = value || "";
            let positive = true;

            if (value.match(/<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2/)) {
                positive = false;
            } else if (value.match(/(([ trn]*)([a-zA-Z-]*)([.#]{1,1})([a-zA-Z-]*)([ trn]*)+)([{]{1,1})((([ trn]*)([a-zA-Z-]*)([:]{1,1})((([ trn]*)([a-zA-Z-0-9#]*))+)[;]{1})*)([ trn]*)([}]{1,1})([ trn]*)/)) {
                positive = false;
            } else if (value.match(/^<[^>]+>/)) {
                positive = false;
            } else if (value.match(/^(#|\.)?[^{]+{/)) {
                positive = false;
            } else if (value.match(/`/)) {
                positive = false;
            }

            return {
                valid: positive,
                message: MESSAGE.i('validations.malicious_code'),
                type: VALIDATION.types.error
            }
        },
        mayorOigualCero: function (value, field) {
            value = value || "";

            return {
                valid: (value >= 0),
                message: MESSAGE.ieval('planificacion.mayorCeroMeta', {field: field}),
                type: VALIDATION.types.error,
            };
        },
        noStatus: function (value, array, estatus) {
            debugger
            value = value || -1;
            let object = array.filter(d=> { return d.id == value})[0];
            return {
                valid: (object.estatus_id !== estatus),
                message: "El proyecto está finalizado y no puede ser seleccionado para este indicador",
                type: VALIDATION.types.error
            };
        },
        ValidHour: function (time){
            return {
                valid: moment(time, 'HH:mm', true).isValid(),
                message: "El valor de la hora no es correcto",
                type: VALIDATION.types.error
            };
        }
    }
});
