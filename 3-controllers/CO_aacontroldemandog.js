app.controller("aacontroldemandog", function ($scope, $http, $compile) {
    aacontroldemandog = this;
    RUNCONTROLLER("aacontroldemandog", aacontroldemandog, $scope, $http, $compile);
    aacontroldemandog.session = new SESSION().current();
    aacontroldemandog.DPTO = new SESSION().definitivo();
    aacontroldemandog.modolista = location.href.indexOf('modolista') !== -1;
    if (location.href.split('?').length > 1)
        if (location.href.split('?')[1].split('-').length > 1)
            if (location.href.split('?')[1].split('-')[1])
                aacontroldemandog.unicomenu = location.href.split('?')[1].split('-')[1];
    aacontroldemandog.filtrosSoloCompania = [
        {
            field: "compania",
            value: aacontroldemandog.session.compania_id
        }
    ];
    aacontroldemandog.filtrosCompania = [
        {
            field: "compania",
            value: aacontroldemandog.session.compania_id
        },
        {
            open: "(",
            field: "poa",
            operator: "=",
            value: `$${aacontroldemandog.session.poa_id} OR poa=0)`
        },
    ];
    aacontroldemandog.builded = false;
    aacontroldemandog.abierto = true;
    aacontroldemandog.donfocusnah = true;

    if (aacontroldemandog.DPTO)
        aacontroldemandog.filtrosCompania.push({
            field: "departamento_id",
            value: aacontroldemandog.DPTO
        });

    if (aacontroldemandog.session.institucion_id)
        aacontroldemandog.filtrosCompania.push({
            field: "institucion",
            value: aacontroldemandog.session.institucion_id
        })
    else
        aacontroldemandog.filtrosCompania.push(
            {
                field: "institucion",
                operator: "IS",
                value: "$NULL"
            })
    aacontroldemandog.REPORTING = undefined;
    aacontroldemandog.FICHA = {
        datos_relacionados: [
            {label: "Eje Estrategico", value: "El valor"},
            {label: "Objetivo Estrategico", value: "El valor"},
            {label: "Estrategia", value: "El valor"},
            {label: "Resultado Esperado", value: "El valor"},
            {label: "Departamento", value: "El valor"},
            {label: "Producto", value: "El valor"},
            {label: "Actividad", value: "El valor"}
        ],
        periodicidad: "Trimestres",
        grafico: {
            porcentaje: 50,
            color: "#27E344",
            titulo_ponderacion: "Ningun Avance",
        },
        datos_indicador: [
            {label: "Indicador PEI", value: "El valor"},
            {label: "Descripción del indicador", value: "El valor"},
            {label: "Fuente", value: "El valor"},
            {label: "Método de Cálculo", value: "El valor"},
            {label: "Año Línea Base", value: "El valor"},
            {label: "Línea base", value: "El valor"},
            {label: "Medio de Verificación", value: "El valor"}
        ],
        leyenda: "Este indicador trabaja con porcentajes y debe tender a ascender",
        periodos: [
            {indice: 1, meta: "100%", meta_alcanzada: "100%", diferencia: "0%", enable: true},
            {indice: 2, meta: "100%", meta_alcanzada: "100%", diferencia: "0%", enable: true},
            {indice: 3, meta: "100%", meta_alcanzada: "100%", diferencia: "0%", enable: true},
            {indice: 4, meta: "100%", meta_alcanzada: "", diferencia: "", enable: false},
            {indice: "Total", meta: "100%", meta_alcanzada: "100%", diferencia: "0%", enable: true}
        ]
    };
    aacontroldemandog.dibujaGracfico = (div, value, color, width, height, arcstart, arcend) => {
        if (aacontroldemandog.modolista)
            return;
        let knob = pureknob.createKnob(width || 300, height || 300);
        knob.setProperty('angleStart', arcstart || (-0.50 * Math.PI));
        knob.setProperty('angleEnd', arcend || (0.50 * Math.PI));
        knob.setProperty('colorFG', color);
        knob.setProperty('colorBG', "#ccc");
        knob.setProperty('textScale', 0.8);
        knob.setProperty('trackWidth', 0.4);
        knob.setProperty('readonly', true);
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 100);
        knob.setProperty('fnValueToString', (value) => {
            if (value === "")
                return "-";
            return `${value}%`;
        });
        knob.setValue(value);
        const listener = function (knob, value) {
            console.log(value);
        };
        knob.addListener(listener);
        const node = knob.node();
        const elem = document.getElementById(div);
        if (elem)
            elem.appendChild(node);
    }
    aacontroldemandog.api = {
        ponderaciones: undefined,
        formulas: undefined,
        entidades: undefined,
        indicadores: undefined,
        tiposMeta: aacontroldemandog.session.tipoMenta,
        direccionesMeta: aacontroldemandog.session.direccionMeta,
        periodicidad: baseController.poa_monitorieo
    };
    aacontroldemandog.HISTORY = [];
    aacontroldemandog.ui = {
        backup: () => {
            if (aacontroldemandog.REPORTING) {
                aacontroldemandog.HISTORY.push(JSON.parse(JSON.stringify(aacontroldemandog.REPORTING)));
            }
        },
        restore: (home) => {
            if (home) {
                aacontroldemandog.REPORTING = JSON.parse(JSON.stringify(home));
                aacontroldemandog.HISTORY = [];
                MODAL.closeAll();
                aacontroldemandog.openModal(aacontroldemandog.REPORTING.titulo);
            } else {
                if (aacontroldemandog.HISTORY.length) {
                    aacontroldemandog.REPORTING = JSON.parse(JSON.stringify(aacontroldemandog.HISTORY[aacontroldemandog.HISTORY.length - 1]));
                    aacontroldemandog.HISTORY.splice(aacontroldemandog.HISTORY.length - 1, 1);
                    MODAL.closeAll();
                    aacontroldemandog.openModal(aacontroldemandog.REPORTING.titulo);
                } else {
                    MODAL.closeAll();
                    aacontroldemandog.REPORTING = undefined;
                }
            }
        },
        goHome: () => {
            MODAL.closeAll();
            aacontroldemandog.REPORTING = undefined;
        }
    };
    aacontroldemandog.existx = (arrayx, label, value) => {
        if (value)
            arrayx.push({label: label, value: value})
    };
    aacontroldemandog.calcs = {
        ficha: (list, field, id, pei) => {
            let indicador = aacontroldemandog.calcs.indicador(aacontroldemandog.api[list].filter(d => d[field] === id), pei);
            let main = indicador[0];
            let fichaFinal = {};
            fichaFinal.datos_relacionados = [];
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Eje Estrategico", main.eje);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Objetivo Estrategico", main.objetivo);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Estrategia", main.estrategia);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Resultado Esperado", main.resultado);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Departamento", main.departamento);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Producto", main.producto);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Actividad", main.actividad);

            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Denominación - Plan Nacional Plurianual del Sector Público", main.pnpsp);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Meta - Objetivos de Desarrollo Sostenible", main.mods);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Línea de Acción - Estrategia Nacional de Desarrollo", main.linea_accion);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Resultado Esperado Sectorial", main.resultado_sectorial);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Programa Sectoriale", main.programa_sectorial);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Evento", main.evento);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Proceso", main.proceso);
            aacontroldemandog.existx(fichaFinal.datos_relacionados, "Proyecto Especial", main.proyecto);
            if (!main.indicador_pei)
                aacontroldemandog.existx(fichaFinal.datos_relacionados, "Año a Evaluar", main.ano);
            fichaFinal.periodicidad = main.periodicidad.nombre_mostrar;
            fichaFinal.grafico = {
                porcentaje: Number(main.sumas.cumplimiento).toFixed(2),
                color: main.sumas.ponderacion.color,
                titulo_ponderacion: main.sumas.ponderacion.titulo
            };
            fichaFinal.datos_indicador = [];
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Indicador PEI", main.indicador_pei);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Indicador", main.indicador_generico);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Indicador Actividad", main.indicador_actividad);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Descripción del indicador", main.descripcion);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Fuente", main.fuente);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Método de Cálculo", main.metodo_calculo);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Año Línea Base", main.ano_linea_base);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Línea base", main.linea_base);
            aacontroldemandog.existx(fichaFinal.datos_indicador, "Medio de Verificación", main.medio_verificacion);
            fichaFinal.leyenda = `Este indicador trabaja con <b>${main.tipoMeta[0].nombre}</b> y debe tender a ser <b>${main.direccionMeta[0].nombre}</b>`;
            fichaFinal.periodos = [];
            indicador.forEach(d => {
                fichaFinal.periodos.push(
                    {
                        indice: d.periodo,
                        periodoValid: d.props.periodoValid,
                        current: d.props.current,
                        sinMeta: d.props.sinMeta,
                        meta: d.props.formatedMeta,
                        meta_alcanzada: d.props.formatedAlcanzada,
                        diferencia: d.props.formatedVarianza,
                        enable: d.props.valid
                    }
                );
            });
            fichaFinal.periodos.sort(GetSortOrder("indice"));
            fichaFinal.periodos.push({
                indice: "Total",
                meta: main.sumas.formatedSumMeta,
                meta_alcanzada: main.sumas.formatedSumAlcanzada,
                diferencia: main.sumas.formatedSumVarianza,
                enable: true,
                periodoValid: true,
                sinMeta: false
            });
            aacontroldemandog.FICHA = fichaFinal;
            aacontroldemandog.openFicha(main.indicador_pei || main.indicador_generico || main.indicador_actividad);
        },
        sumArray: (arrayx) => {
            return arrayx.reduce((accumulator, current) => accumulator + current, 0);
        },
        elementPonderado: (lists, field, name) => {
            let ponderadoSums = [];
            for (const list of lists) {
                if (list[0]) {
                    let distinctField = "indicador_generico_id";
                    let preValues = list.filter(d => d[field] === name && d.props.valid).filter(d => d.sumas).filter(d => d.sumas.cumplimiento >= 0);
                    let listreal = [];
                    let cacheIndi = [];
                    preValues.forEach(d => {
                        if (cacheIndi.indexOf(d[distinctField]) === -1) {
                            listreal.push(d);
                            cacheIndi.push(d[distinctField]);
                        }
                    });
                    let values = listreal.filter(d => d[field] === name && d.props.valid).filter(d => d.sumas).filter(d => d.sumas.cumplimiento >= 0).map(d => d.sumas.cumplimiento);
                    let sum = (aacontroldemandog.calcs.sumArray(values) / values.length) || 0;
                    if (values.length)
                        ponderadoSums.push(sum);
                }
            }
            if (!ponderadoSums.length)
                return undefined;
            return (aacontroldemandog.calcs.sumArray(ponderadoSums) / ponderadoSums.length) || 0;
        },
        general: () => {
            let ponderadoSums = [];
            for (const list of [aacontroldemandog.api.indicadores]) {
                let values = list.filter(d => d.props.valid).filter(d => d.sumas).filter(d => d.sumas.cumplimiento >= 0).map(d => d.sumas.cumplimiento);
                let sum = (aacontroldemandog.calcs.sumArray(values) / values.length) || 0;
                if (values.length)
                    ponderadoSums.push(sum);
            }
            return (aacontroldemandog.calcs.sumArray(ponderadoSums) / ponderadoSums.length) || 0;
        },
        add: (entidad, title, generalPonderation, list, field, filter, parent, lists, boton, listCount, fieldCount, boton2, listCount2, fieldCount2, boton3) => {
            aacontroldemandog.ui.backup();
            let ponderaciones = aacontroldemandog.api.ponderaciones.sort(GetSortOrder("orden"));
            // if (generalPonderation)
            //     ponderaciones = ponderaciones.filter(d => d.tipo_meta === 0);
            let finalPonderaciones = [];
            let distinctPonderations = [...new Set(aacontroldemandog.api.ponderaciones.map(d => d.tipo_meta))];
            for (const tipo_meta_index of distinctPonderations) {
                // if (generalPonderation && tipo_meta_index !== 0)
                //     continue;
                let nombre = (aacontroldemandog.api.tiposMeta.filter(d => d.id === tipo_meta_index)[0] || {nombre: "General"}).nombre;
                let liston = ponderaciones.filter(d => d.tipo_meta === tipo_meta_index).map(d => {
                    return {color: d.color, nombre: d.titulo, titulo: `Progreso de ${d.from} a ${d.to}`}
                });
                finalPonderaciones.push({
                    nombre: nombre,
                    list: liston
                });
            }
            let table_ = aacontroldemandog.api[list].filter(d => d[filter || field])[0];
            if (!table_) {
                aacontroldemandog.aunnoexiste = "Aun no existen indicadores evaluados que pertenezcan a: " + entidad;
                if (!aacontroldemandog.unicomenu) {
                    SWEETALERT.show({
                        type: "info",
                        title: "Información",
                        message: "Aun no existen indicadores evaluados que pertenezcan a: " + entidad
                    });
                } else if (aacontroldemandog.unicomenu === 'proceso') {
                    if (aacontroldemandog.api.currentMapa) {
                        aacontroldemandog.aunnoexiste = `Aun no existen indicadores evaluados que pertenezcan al Mapa de Procesos: ${aacontroldemandog.api.currentMapa.nombre}`;
                    } else {
                        aacontroldemandog.aunnoexiste = `Aun no existen un Mapa de Procesos por lo tanto no existen indicadores para mostrar.`;
                    }
                }
                aacontroldemandog.refreshAngular();
                return;
            }
            aacontroldemandog.aunnoexiste = "";
            table_ = table_.table_;
            let listDistinct = [...new Set(aacontroldemandog.api[list].filter(d => ((d[filter] || parent) === parent) && d.table_ === table_).map(d => d[field]))];

            let finalList = [];
            let index = 0;
            let ids = new Date().getTime();
            for (const d of listDistinct) {
                let detallex = aacontroldemandog.api[list].filter(e => e[field] === d)[0];
                let idlogico = detallex[field + "_id"];
                let elemento = {
                    nombre: d,
                    id: idlogico,
                    estrategico: detallex.tipo_resultado
                };
                let elponderisto = aacontroldemandog.calcs.elementPonderado(lists, field, d);
                elemento.porcentaje = elponderisto === undefined ? "" : Number(aacontroldemandog.calcs.elementPonderado(lists, field, d)).toFixed(2);
                let ponderacion = elponderisto === undefined ? {
                    color: "#eee",
                    titulo: "Pendiente a ser evaluado"
                } : (aacontroldemandog.calcs.ponderacion(elemento.porcentaje, boton3 ? detallex.tipo_meta : undefined) || {
                    color: "#ccc",
                    titulo: "Sin Configurar"
                });
                if (listCount && fieldCount) {
                    let countN = [...new Set(aacontroldemandog.api[listCount].filter(e => e[field] === d).map(e => e[fieldCount]))];
                    elemento.boton = `${boton} (${countN.length})`;
                    elemento.link = aacontroldemandog.getFunction(fieldCount, ` de ${d}`, field, d);
                }
                if (listCount2 && fieldCount2) {
                    let countN = [...new Set(aacontroldemandog.api[listCount2].filter(e => e[field] === d).map(e => e[fieldCount2]))];
                    elemento.boton2 = `${boton2} (${countN.length})`;
                    elemento.link2 = aacontroldemandog.getFunction(fieldCount2, ` de ${d}`, field, d);
                }
                if (boton3) {
                    elemento.boton3 = {
                        list: list,
                        field: field + "_id",
                        id: idlogico,
                        pei: list === "pei"
                    };
                }
                elemento.color = ponderacion.color;
                elemento.titulo_ponderacion = ponderacion.titulo;


                elemento.divID = `grafico_${++index}_${ids}`;
                finalList.push(elemento);
            }
            if (aacontroldemandog.unicomenu && !filter) {
                aacontroldemandog.unicomenuTilte = title;
            }
            let reporting = {
                entidad: entidad,
                titulo: title,
                ponderaciones: finalPonderaciones,
                elementos: finalList
            };
            aacontroldemandog.REPORTING = reporting;
            MODAL.closeAll();
            aacontroldemandog.openModal(aacontroldemandog.REPORTING.titulo);
        },
        one: async (view, session, indicadorField, indicadorID, espei) => {
            let result = await aacontroldemandog.listp(view,
                [
                    {
                        field: "compania",
                        value: session.compania_id
                    },
                    {
                        field: indicadorField + "_id",
                        value: indicadorID
                    },
                    {
                        open: "(",
                        field: "poa",
                        operator: "=",
                        value: `$${session.poa_id} OR poa=0)`
                    }
                ]);
            let periodos = result.filter(d => {
                return d[indicadorField + "_id"] == indicadorID
            });
            let obj = aacontroldemandog.calcs.indicador(periodos, espei);
            return {
                cumplimiento: obj[0].sumas.cumplimiento,
                ponderacion: obj[0].sumas.ponderacion
            }
        },
        buildAll: () => {
            for (const d of aacontroldemandog.api.indicadores) {
                aacontroldemandog.calcs.build(d.indicador_generico_id, "indicadores", "indicador_generico_id");
            }

        },
        build: (id, property, field, pei) => {
            let periodos = aacontroldemandog.api[property].filter(d => {
                return d[field] == id
            });
            return aacontroldemandog.calcs.indicador(periodos, pei);
        },
        indicador: (periodos, pei) => {
            if (periodos)
                if (periodos.length) {
                    let periodicidad = aacontroldemandog.calcs.periodicidad(pei ? [] : periodos);
                    let tipo_meta = periodos[0].tipo_meta;
                    let direccion_meta = periodos[0].direccion_meta;
                    let formula = aacontroldemandog.calcs.formula(tipo_meta, direccion_meta);
                    let periodosValidos = aacontroldemandog.calcs.processPeriodos(periodos, formula, pei);
                    return periodosValidos;
                }
            return [];
        },
        processPeriodos: (periodos, formula, pei) => {
            var mes = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            if (periodos)
                if (periodos.length) {
                    let periodicidad = aacontroldemandog.calcs.periodicidad(pei ? [] : periodos);
                    var actual = Math.ceil((mes / (12 / periodicidad.cantidad)));
                    let tipo_meta = aacontroldemandog.api.tiposMeta.filter(d => d.id === formula.tipo_meta);
                    let direccion_meta = aacontroldemandog.api.direccionesMeta.filter(d => d.id === formula.direccion_meta);
                    periodos.forEach(d => {
                        d.periodicidad = periodicidad;
                        d.tipoMeta = tipo_meta;
                        d.direccionMeta = direccion_meta;
                        d.props = {};
                        d.periodo = pei ? d.ano : d.periodo;
                        d.props.sinMeta = d.valor_alcanzado === null || d.valor_alcanzado === undefined || d.valor_alcanzado === "undefined" || d.valor_alcanzado === "";
                        d.props.valid = pei ? (d.ano <= year) : (((parseInt(d.periodo) || 0) <= actual && (parseInt(d.ano) || 1900) <= year) || (parseInt(d.ano) || 1900) < year);
                        d.props.current = pei ? (d.ano == year) : (((parseInt(d.periodo) || 0) == actual && (parseInt(d.ano) || 1900) == year) || (parseInt(d.ano) || 1900) < year);
                        d.props.periodoValid = pei ? (d.ano <= year) : (((parseInt(d.periodo) || 0) <= actual && (parseInt(d.ano) || 1900) <= year) || (parseInt(d.ano) || 1900) < year);
                        if (aacontroldemandog.abierto === false && d.props.current)
                            d.props.valid = false;
                        if (d.props.sinMeta)
                            d.props.valid = false;

                        d.props.rawMeta = aacontroldemandog.calcs.rawValue(d.valor, formula);
                        d.props.rawAlcanzada = aacontroldemandog.calcs.rawValue(d.valor_alcanzado, formula);
                        d.props.rawVarianza = aacontroldemandog.calcs.rawVarianza(d.props.rawMeta, d.props.rawAlcanzada, formula);

                        d.props.formatedMeta = aacontroldemandog.calcs.format(d.props.rawMeta, "formato", formula);
                        d.props.formatedAlcanzada = aacontroldemandog.calcs.format(d.props.rawAlcanzada, "formato", formula);
                        d.props.formatedVarianza = aacontroldemandog.calcs.format(d.props.rawVarianza, "varianzaformato", formula);
                    });
                    let sumas = {};
                    let rawSumMeta = aacontroldemandog.calcs.rawSum(periodos, "rawMeta", formula);
                    let rawSumAlcanzada = aacontroldemandog.calcs.rawSum(periodos, "rawAlcanzada", formula);
                    let rawSumVarianza = aacontroldemandog.calcs.rawSum(periodos, "rawVarianza", formula);
                    let formatedSumMeta = aacontroldemandog.calcs.format(rawSumMeta, "sumformato", formula);
                    let formatedSumAlcanzada = aacontroldemandog.calcs.format(rawSumAlcanzada, "sumformato", formula);
                    let formatedSumVarianza = aacontroldemandog.calcs.format(rawSumVarianza, "sumformato", formula);
                    sumas = {
                        rawSumMeta: rawSumMeta,
                        rawSumAlcanzada: rawSumAlcanzada,
                        tomar: periodos.filter(d => d.props.valid).length,
                        rawSumVarianza: rawSumVarianza,
                        formatedSumMeta: formatedSumMeta,
                        formatedSumAlcanzada: formatedSumAlcanzada,
                        formatedSumVarianza: formatedSumVarianza,
                        cumplimiento: aacontroldemandog.calcs.percentage(rawSumMeta, rawSumAlcanzada, rawSumVarianza, formula, periodos.filter(d => d.props.valid).length)
                    };
                    sumas.ponderacion = aacontroldemandog.calcs.ponderacion(sumas.cumplimiento, formula.tipo_meta);
                    periodos.forEach(d => {
                        d.sumas = sumas;
                    });

                    return periodos;
                }
            return [];
        },
        periodicidad: (periodos) => {
            return aacontroldemandog.api.periodicidad.filter(d => {
                return d.cantidad === (periodos || []).length;
            })[0] || {
                cantidad: 1,
                descripcion: "Cada año",
                id: 2,
                nombre: "Anual",
                nombre_mostrar: "Año",
            }
        },
        format: (valor, sum, formula) => {
            if (valor === "")
                return valor;
            let $RESULT = valor;
            return eval(formula[sum]);
        },
        rawValue: (valor, formula) => {
            let $META = valor;
            let realRaw = eval(formula.formula);
            if (realRaw === null || realRaw === undefined)
                return "";
            realRaw += "";
            if (realRaw.indexOf(".") !== -1)
                return parseFloat(realRaw.replaceAll(",", "").trim());
            return parseInt(realRaw);
        },
        rawVarianza: (valor, valor2, formula) => {
            let $META = valor;
            let $ALCANZADO = valor2;
            let rawVarianzaVar = eval(formula.varianzaformula);
            if (rawVarianzaVar === undefined || rawVarianzaVar === null)
                return "";
            return rawVarianzaVar;
        },
        rawSum: (periodos, variable, formula) => {
            let $SUM = 0;
            let validperiods = periodos.filter(d => d.props.valid);
            let $CANTIDAD = validperiods.length;
            validperiods.forEach(d => {
                if (d.props[variable])
                    $SUM += d.props[variable];
            });
            let realRaw = $CANTIDAD === 0 ? 0 : eval(formula.sumformula);
            return realRaw;
        },
        formula: (tipo_meta, direccion_meta) => {
            return aacontroldemandog.api.formulas.filter(d => {
                return d.tipo_meta === tipo_meta && d.direccion_meta === direccion_meta;
            })[0] || {
                formula: "$META",
                formato: "`${LAN.money($RESULT).format(false)}`",
                estilos: "",
                sumformula: "$SUM",
                sumformato: "`${$RESULT}`",
                varianzaformula: "(Math.abs($META-$ALCANZADO))",
                varianzaformato: "`${LAN.money($RESULT).format(false)}`",
                porcentaje: "($RESULTALCANZADA/$RESULTMETA)*100"
            };
        },
        ponderacion: (valor, tipo_meta) => {
            let finalFilter = tipo_meta || 0;
            return aacontroldemandog.api.ponderaciones.filter(d => {
                return d.tipo_meta === finalFilter && (Math.floor(valor) >= d.from && Math.floor(valor) <= d.to);
            })[0] || {
                tipo_meta: "1",
                titulo: "Ponderación Sin Configurar",
                color: "#ccc",
                from: 0,
                to: 0,
                orden: 1,
                compania: aacontroldemandog.session.compania_id
            };
        },
        percentage: (meta, alcanzada, varianza, formula, tomar) => {
            if (tomar === 0)
                return 0;
            let $RESULTMETA = meta;
            let $RESULTALCANZADA = alcanzada;
            let $RESULTVARIANZA = varianza;
            let realRaw = eval(formula.porcentaje);
            if (realRaw < 0)
                return 0;
            if (realRaw > 100)
                return 100;
            return realRaw || 0;
        }
    };
    aacontroldemandog.filtrar = async (accion) => {
        aacontroldemandog.abierto = accion === "abrir" ? false : true;
        aacontroldemandog.refresh();
    };
    aacontroldemandog.refresh = async () => {
        SWEETALERT.loading({message: "Estructurando Reporte Completo"});

        aacontroldemandog.api.currentMapa = await aacontroldemandog.listp("mapa_proceso", [
            {
                field: "compania",
                value: aacontroldemandog.session.compania_id
            },
            {
                field: "estatus",
                operator: "!=",
                value: 4
            }
        ]);
        aacontroldemandog.api.currentMapa = aacontroldemandog.api.currentMapa[0];
        if (!aacontroldemandog.api.ponderaciones)
            aacontroldemandog.api.ponderaciones = await aacontroldemandog.listp("reporte_indicador_config", aacontroldemandog.filtrosSoloCompania);
        if (!aacontroldemandog.api.formulas)
            aacontroldemandog.api.formulas = await aacontroldemandog.listp("reporte_tipometa_formula");
        if (!aacontroldemandog.api.entidades) {
            aacontroldemandog.api.entidades = await aacontroldemandog.listp("indicador_generico_entidad");

            aacontroldemandog.api.entidades = aacontroldemandog.api.entidades.sort(GetSortOrder('orden'));
            let indexito = 0;
            aacontroldemandog.api.entidades.forEach(entidad => {
                if (entidad.dashboard && entidad.variable) {
                    if (aacontroldemandog.mainMenu[indexito].row.length > 3) {
                        aacontroldemandog.mainMenu.push({
                            row: []
                        });
                        indexito++;
                    }
                    aacontroldemandog.templateFunctions[entidad.variable] = entidad.dashboard;
                    aacontroldemandog.mainMenu[indexito].row.push({
                        title: entidad.name,
                        link: aacontroldemandog.getFunction(entidad.variable)
                    });
                }
            });
        }

        aacontroldemandog.api.indicadores = await aacontroldemandog.listp("vw_report_indicadores_generico", aacontroldemandog.filtrosCompania);
        aacontroldemandog.calcs.buildAll();

        setTimeout(() => {
            $("#graficoGeneral").html("");
            let general = aacontroldemandog.calcs.general();
            aacontroldemandog.generalPonderacion = aacontroldemandog.calcs.ponderacion(general);
            aacontroldemandog.dibujaGracfico("graficoGeneral", Number(general).toFixed(2), aacontroldemandog.generalPonderacion.color, 300, 200);
            SWEETALERT.stop();
            aacontroldemandog.refreshAngular();
            if (aacontroldemandog.unicomenu) {
                aacontroldemandog.execute(aacontroldemandog.getFunction(aacontroldemandog.unicomenu));
            }
        }, 200);

    };
    aacontroldemandog.listp = async (api, where) => {
        let data = undefined;
        if (where)
            data = await BASEAPI.listp(api, {
                limit: 0,
                orderby: "id",
                order: "asc",
                where: where
            });
        else
            data = await BASEAPI.listp(api, {
                limit: 0,
                orderby: "id",
                order: "asc",
            });
        return data.data;
    };
    aacontroldemandog.openModal = (title, icon) => {
        aacontroldemandog.modal.modalView("aacontroldemando/reporte", {
            header: {
                title: "",
                icon: "chart"
            },
            footer: {
                cancelButton: false,
                closeButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: true
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {


                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                }
            },
        });
    };
    aacontroldemandog.openFicha = (title, icon) => {
        aacontroldemandog.modal.modalView("aacontroldemando/fichaindicador", {
            header: {
                title: title || "Sin título",
                icon: icon || "user"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: true
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {
                    }
                }
            },
        });
    };
    aacontroldemandog.OpenPonderaciones = (title, icon) => {
        aacontroldemandog.modal.modalView("aacontroldemando/ponderacion", {
            header: {
                title: "Ponderaciones",
                icon: "list"
            },
            footer: {
                cancelButton: false,
                closeButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: true
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {


                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                }
            },
        });
    };
    aacontroldemandog.execute = (code) => {
        eval(code);
    };
    aacontroldemandog.getFunction = (entity, SUBTITLE, FILTER, VALUE) => {
        return aacontroldemandog.templateFunctions[entity].replace("$SUBTITLE", SUBTITLE || "").replace("$FILTER", FILTER || "").replace("$VALUE", VALUE || "");
    };
    aacontroldemandog.templateFunctions = {
        indicador_generico: `aacontroldemandog.calcs.add(
        "Indicador",
                "Cumplimiento de los Indicadores $SUBTITLE",
                false,
                "indicadores", "indicador_generico", "$FILTER", "$VALUE",
                [  aacontroldemandog.api.indicadores],
                "","","","","","",true)`
    };

    aacontroldemandog.mainMenu = [
        {
            row: []
        }
    ];
    aacontroldemandog.refresh();
});
