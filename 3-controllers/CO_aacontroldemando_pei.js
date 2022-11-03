app.controller("aacontroldemando_pei", function ($scope, $http, $compile) {
    aacontroldemando_pei = this;
    RUNCONTROLLER("aacontroldemando_pei", aacontroldemando_pei, $scope, $http, $compile);
    aacontroldemando_pei.session = new SESSION().current();
    aacontroldemando_pei.modolista = location.href.indexOf('modolista') !== -1;
    aacontroldemando_pei.filtrosSoloCompania = [
        {
            field: "compania",
            value: aacontroldemando_pei.session.compania_id
        }
    ];
    aacontroldemando_pei.filtrosCompania = [
        {
            field: "compania",
            value: aacontroldemando_pei.session.compania_id
        },
        {
            open: "(",
            field: "poa",
            operator: "=",
            value: `$${aacontroldemando_pei.session.poa_id} OR poa=0)`
        },
    ];
    aacontroldemando_pei.builded = false;
    aacontroldemando_pei.abierto = true;
    aacontroldemando_pei.donfocusnah = true;
    if (aacontroldemando_pei.session.institucion_id)
        aacontroldemando_pei.filtrosCompania.push({
            field: "institucion",
            value: aacontroldemando_pei.session.institucion_id
        })
    else
        aacontroldemando_pei.filtrosCompania.push({
            field: "institucion",
            operator: "IS",
            value: "$NULL"
        })
    aacontroldemando_pei.REPORTING = undefined;
    aacontroldemando_pei.FICHA = {
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
    aacontroldemando_pei.dibujaGracfico = (div, value, color, width, height, arcstart, arcend) => {
        if (aacontroldemando_pei.modolista)
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
    aacontroldemando_pei.api = {
        ponderaciones: undefined,
        formulas: undefined,
        pei: undefined,
        productos: undefined,
        actividades: undefined,
        tiposMeta: aacontroldemando_pei.session.tipoMenta,
        direccionesMeta: aacontroldemando_pei.session.direccionMeta,
        periodicidad: baseController.poa_monitorieo
    };
    aacontroldemando_pei.HISTORY = [];
    aacontroldemando_pei.ui = {
        backup: () => {
            if (aacontroldemando_pei.REPORTING) {
                aacontroldemando_pei.HISTORY.push(JSON.parse(JSON.stringify(aacontroldemando_pei.REPORTING)));
            }
        },
        restore: (home) => {
            if (home) {
                aacontroldemando_pei.REPORTING = JSON.parse(JSON.stringify(home));
                aacontroldemando_pei.HISTORY = [];
                MODAL.closeAll();
                aacontroldemando_pei.openModal(aacontroldemando_pei.REPORTING.titulo);
            } else {
                if (aacontroldemando_pei.HISTORY.length) {
                    aacontroldemando_pei.REPORTING = JSON.parse(JSON.stringify(aacontroldemando_pei.HISTORY[aacontroldemando_pei.HISTORY.length - 1]));
                    aacontroldemando_pei.HISTORY.splice(aacontroldemando_pei.HISTORY.length - 1, 1);
                    MODAL.closeAll();
                    aacontroldemando_pei.openModal(aacontroldemando_pei.REPORTING.titulo);
                } else {
                    MODAL.closeAll();
                    aacontroldemando_pei.REPORTING = undefined;
                }
            }
        },
        goHome: () => {
            MODAL.closeAll();
            aacontroldemando_pei.REPORTING = undefined;
        }
    };
    aacontroldemando_pei.existx = (arrayx, label, value) => {
        if (value)
            arrayx.push({label: label, value: value})
    };
    aacontroldemando_pei.calcs = {
        ficha: (list, field, id, pei) => {
            let indicador = aacontroldemando_pei.calcs.indicador(aacontroldemando_pei.api[list].filter(d => d[field] === id), pei);
            let main = indicador[0];
            let fichaFinal = {};
            fichaFinal.datos_relacionados = [];
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Eje Estrategico", main.eje);
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Objetivo Estrategico", main.objetivo);
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Estrategia", main.estrategia);
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Resultado Esperado", main.resultado);
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Departamento", main.departamento);
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Producto", main.producto);
            aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Actividad", main.actividad);
            if (!main.indicador_pei)
                aacontroldemando_pei.existx(fichaFinal.datos_relacionados, "Año del POA", main.ano);
            fichaFinal.periodicidad = main.periodicidad.nombre_mostrar;
            fichaFinal.grafico = {
                porcentaje: Number(main.sumas.cumplimiento).toFixed(2),
                color: main.sumas.ponderacion.color,
                titulo_ponderacion: main.sumas.ponderacion.titulo
            };
            fichaFinal.datos_indicador = [];
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Indicador PEI", main.indicador_pei);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Indicador POA", main.indicador_producto);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Indicador Actividad", main.indicador_actividad);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Descripción del indicador", main.descripcion);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Fuente", main.fuente);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Método de Cálculo", main.metodo_calculo);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Año Línea Base", main.ano_linea_base);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Línea base", main.linea_base);
            aacontroldemando_pei.existx(fichaFinal.datos_indicador, "Medio de Verificación", main.medio_verificacion);
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
            fichaFinal.periodos.push({
                indice: "Total",
                meta: main.sumas.formatedSumMeta,
                meta_alcanzada: main.sumas.formatedSumAlcanzada,
                diferencia: main.sumas.formatedSumVarianza,
                enable: true,
                periodoValid: true,
                sinMeta: false
            });
            aacontroldemando_pei.FICHA = fichaFinal;
            aacontroldemando_pei.openFicha(main.indicador_pei || main.indicador_producto || main.indicador_actividad);
        },
        sumArray: (arrayx) => {
            return arrayx.reduce((accumulator, current) => accumulator + current, 0);
        },
        elementPonderado: (lists, field, name) => {
            let ponderadoSums = [];
            for (const list of lists) {
                if (list[0]) {
                    let distinctField = "indicador_producto_id";
                    ["indicador_pei_id", "indicador_producto_id", "indicador_actividad_id"].forEach(d => {
                        if (list[0][d])
                            distinctField = d;
                    });
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
                    let sum = (aacontroldemando_pei.calcs.sumArray(values) / values.length) || 0;
                    if (values.length)
                        ponderadoSums.push(sum);
                }
            }
            if (!ponderadoSums.length)
                return undefined;
            return (aacontroldemando_pei.calcs.sumArray(ponderadoSums) / ponderadoSums.length) || 0;
        },
        general: () => {
            let ponderadoSums = [];
            for (const list of [aacontroldemando_pei.api.pei]) {
                let values = list.filter(d => d.props.valid).filter(d => d.sumas).filter(d => d.sumas.cumplimiento >= 0).map(d => d.sumas.cumplimiento);
                let sum = (aacontroldemando_pei.calcs.sumArray(values) / values.length) || 0;
                if (values.length)
                    ponderadoSums.push(sum);
            }
            return (aacontroldemando_pei.calcs.sumArray(ponderadoSums) / ponderadoSums.length) || 0;
        },
        add: (entidad, title, generalPonderation, list, field, filter, parent, lists, boton, listCount, fieldCount, boton2, listCount2, fieldCount2, boton3) => {
            aacontroldemando_pei.ui.backup();
            let ponderaciones = aacontroldemando_pei.api.ponderaciones.sort(GetSortOrder("orden"));
            // if (generalPonderation)
            //     ponderaciones = ponderaciones.filter(d => d.tipo_meta === 0);
            let finalPonderaciones = [];
            let distinctPonderations = [...new Set(aacontroldemando_pei.api.ponderaciones.map(d => d.tipo_meta))];
            for (const tipo_meta_index of distinctPonderations) {
                // if (generalPonderation && tipo_meta_index !== 0)
                //     continue;
                let nombre = (aacontroldemando_pei.api.tiposMeta.filter(d => d.id === tipo_meta_index)[0] || {nombre: "General"}).nombre;
                let liston = ponderaciones.filter(d => d.tipo_meta === tipo_meta_index).map(d => {
                    return {color: d.color, nombre: d.titulo, titulo: `Progreso de ${d.from} a ${d.to}`}
                });
                finalPonderaciones.push({
                    nombre: nombre,
                    list: liston
                });
            }
            let listDistinct = [...new Set(aacontroldemando_pei.api[list].filter(d => (d[filter] || parent) === parent).map(d => d[field]))];
            let finalList = [];
            let index = 0;
            let ids = new Date().getTime();
            for (const d of listDistinct) {
                let detallex = aacontroldemando_pei.api[list].filter(e => e[field] === d)[0];
                let idlogico = detallex[field + "_id"];
                let elemento = {
                    nombre: d,
                    id: idlogico
                };
                let elponderisto = aacontroldemando_pei.calcs.elementPonderado(lists, field, d);
                elemento.porcentaje = elponderisto === undefined ? "" : Number(aacontroldemando_pei.calcs.elementPonderado(lists, field, d)).toFixed(2);
                let ponderacion = elponderisto === undefined ? {
                    color: "#eee",
                    titulo: "Pendiente a ser evaluado"
                } : (aacontroldemando_pei.calcs.ponderacion(elemento.porcentaje, boton3 ? detallex.tipo_meta : undefined) || {
                    color: "#ccc",
                    titulo: "Sin Configurar"
                });
                if (listCount && fieldCount) {
                    let countN = [...new Set(aacontroldemando_pei.api[listCount].filter(e => e[field] === d).map(e => e[fieldCount]))];
                    elemento.boton = `${boton} (${countN.length})`;
                    elemento.link = aacontroldemando_pei.getFunction(fieldCount, ` de ${d}`, field, d);
                }
                if (listCount2 && fieldCount2) {
                    let countN = [...new Set(aacontroldemando_pei.api[listCount2].filter(e => e[field] === d).map(e => e[fieldCount2]))];
                    elemento.boton2 = `${boton2} (${countN.length})`;
                    elemento.link2 = aacontroldemando_pei.getFunction(fieldCount2, ` de ${d}`, field, d);
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

            let reporting = {
                entidad: entidad,
                titulo: title,
                ponderaciones: finalPonderaciones,
                elementos: finalList
            };
            aacontroldemando_pei.REPORTING = reporting;
            MODAL.closeAll();
            aacontroldemando_pei.openModal(aacontroldemando_pei.REPORTING.titulo);
        },
        buildAll: () => {
            for (const d of aacontroldemando_pei.api.pei) {
                aacontroldemando_pei.calcs.build(d.indicador_pei_id, "pei", "indicador_pei_id", true);
            }
        },
        build: (id, property, field, pei) => {
            let periodos = aacontroldemando_pei.api[property].filter(d => {
                return d[field] == id
            });
            return aacontroldemando_pei.calcs.indicador(periodos, pei);
        },
        indicador: (periodos, pei) => {
            if (periodos)
                if (periodos.length) {
                    let periodicidad = aacontroldemando_pei.calcs.periodicidad(pei ? [] : periodos);
                    let tipo_meta = periodos[0].tipo_meta;
                    let direccion_meta = periodos[0].direccion_meta;
                    let formula = aacontroldemando_pei.calcs.formula(tipo_meta, direccion_meta);
                    let periodosValidos = aacontroldemando_pei.calcs.processPeriodos(periodos, formula, pei);
                    return periodosValidos;
                }
            return [];
        },
        processPeriodos: (periodos, formula, pei) => {
            var mes = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            if (periodos)
                if (periodos.length) {
                    let periodicidad = aacontroldemando_pei.calcs.periodicidad(pei ? [] : periodos);
                    var actual = Math.ceil((mes / (12 / periodicidad.cantidad)));
                    let tipo_meta = aacontroldemando_pei.api.tiposMeta.filter(d => d.id === formula.tipo_meta);
                    let direccion_meta = aacontroldemando_pei.api.direccionesMeta.filter(d => d.id === formula.direccion_meta);
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
                        if (aacontroldemando_pei.abierto === false && d.props.current)
                            d.props.valid = false;
                        if (d.props.sinMeta)
                            d.props.valid = false;

                        d.props.rawMeta = aacontroldemando_pei.calcs.rawValue(d.valor, formula);
                        d.props.rawAlcanzada = aacontroldemando_pei.calcs.rawValue(d.valor_alcanzado, formula);
                        d.props.rawVarianza = aacontroldemando_pei.calcs.rawVarianza(d.props.rawMeta, d.props.rawAlcanzada, formula);

                        d.props.formatedMeta = aacontroldemando_pei.calcs.format(d.props.rawMeta, "formato", formula);
                        d.props.formatedAlcanzada = aacontroldemando_pei.calcs.format(d.props.rawAlcanzada, "formato", formula);
                        d.props.formatedVarianza = aacontroldemando_pei.calcs.format(d.props.rawVarianza, "varianzaformato", formula);
                    });
                    let sumas = {};
                    let rawSumMeta = aacontroldemando_pei.calcs.rawSum(periodos, "rawMeta", formula);
                    let rawSumAlcanzada = aacontroldemando_pei.calcs.rawSum(periodos, "rawAlcanzada", formula);
                    let rawSumVarianza = aacontroldemando_pei.calcs.rawSum(periodos, "rawVarianza", formula);
                    let formatedSumMeta = aacontroldemando_pei.calcs.format(rawSumMeta, "sumformato", formula);
                    let formatedSumAlcanzada = aacontroldemando_pei.calcs.format(rawSumAlcanzada, "sumformato", formula);
                    let formatedSumVarianza = aacontroldemando_pei.calcs.format(rawSumVarianza, "sumformato", formula);
                    sumas = {
                        rawSumMeta: rawSumMeta,
                        rawSumAlcanzada: rawSumAlcanzada,
                        tomar: periodos.filter(d => d.props.valid).length,
                        rawSumVarianza: rawSumVarianza,
                        formatedSumMeta: formatedSumMeta,
                        formatedSumAlcanzada: formatedSumAlcanzada,
                        formatedSumVarianza: formatedSumVarianza,
                        cumplimiento: aacontroldemando_pei.calcs.percentage(rawSumMeta, rawSumAlcanzada, rawSumVarianza, formula, periodos.filter(d => d.props.valid).length)
                    };
                    sumas.ponderacion = aacontroldemando_pei.calcs.ponderacion(sumas.cumplimiento, formula.tipo_meta);
                    periodos.forEach(d => {
                        d.sumas = sumas;
                    });

                    return periodos;
                }
            return [];
        },
        periodicidad: (periodos) => {
            return aacontroldemando_pei.api.periodicidad.filter(d => {
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
            return aacontroldemando_pei.api.formulas.filter(d => {
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
            return aacontroldemando_pei.api.ponderaciones.filter(d => {
                return d.tipo_meta === finalFilter && (Math.floor(valor) >= d.from && Math.floor(valor) <= d.to);
            })[0] || {
                tipo_meta: "1",
                titulo: "Ponderación Sin Configurar",
                color: "#ccc",
                from: 0,
                to: 0,
                orden: 1,
                compania: aacontroldemando_pei.session.compania_id
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
    aacontroldemando_pei.filtrar = async (accion) => {
        aacontroldemando_pei.abierto = accion === "abrir" ? false : true;
        aacontroldemando_pei.refresh();
    };
    aacontroldemando_pei.refresh = async () => {
        SWEETALERT.loading({message: "Estructurando Reporte Completo"});

        if (!aacontroldemando_pei.api.ponderaciones)
            aacontroldemando_pei.api.ponderaciones = await aacontroldemando_pei.listp("reporte_indicador_config", aacontroldemando_pei.filtrosSoloCompania);
        if (!aacontroldemando_pei.api.formulas)
            aacontroldemando_pei.api.formulas = await aacontroldemando_pei.listp("reporte_tipometa_formula");

        aacontroldemando_pei.api.pei = await aacontroldemando_pei.listp("vw_report_indicadores_pei", aacontroldemando_pei.filtrosCompania);
        aacontroldemando_pei.calcs.buildAll();
        setTimeout(() => {
            $("#graficoGeneral").html("");
            let general = aacontroldemando_pei.calcs.general();
            aacontroldemando_pei.generalPonderacion = aacontroldemando_pei.calcs.ponderacion(general);
            aacontroldemando_pei.dibujaGracfico("graficoGeneral", Number(general).toFixed(2), aacontroldemando_pei.generalPonderacion.color, 300, 200);

            SWEETALERT.stop();
            aacontroldemando_pei.refreshAngular();
        }, 200);

    };
    aacontroldemando_pei.listp = async (api, where) => {
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
    aacontroldemando_pei.openModal = (title, icon) => {
        aacontroldemando_pei.modal.modalView("aacontroldemando/reporte", {
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
    aacontroldemando_pei.openFicha = (title, icon) => {
        aacontroldemando_pei.modal.modalView("aacontroldemando/fichaindicador", {
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
    aacontroldemando_pei.OpenPonderaciones = (title, icon) => {
        aacontroldemando_pei.modal.modalView("aacontroldemando/ponderacion", {
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
    aacontroldemando_pei.execute = (code) => {
        eval(code);
    };
    aacontroldemando_pei.getFunction = (entity, SUBTITLE, FILTER, VALUE) => {
        return aacontroldemando_pei.templateFunctions[entity].replace("$SUBTITLE", SUBTITLE || "").replace("$FILTER", FILTER || "").replace("$VALUE", VALUE || "");
    };
    aacontroldemando_pei.templateFunctions = {
        eje: `aacontroldemando_pei.calcs.add("Eje Estratégico","Cumplimiento de los Ejes Estratégicos$SUBTITLE",
              true,"pei", "eje", "$FILTER", "$VALUE",
              [aacontroldemando_pei.api.pei],
              "Ver Objetivos Estratégicos ","pei","objetivo")`,
        objetivo: `aacontroldemando_pei.calcs.add(
                "Objetivo Estratégico",  
                "Cumplimiento de los Objetivos Estratégicos$SUBTITLE",
                true,
                "pei", "objetivo", "$FILTER", "$VALUE",
                [aacontroldemando_pei.api.pei],
                "Ver Estrategias ","pei","estrategia")`,
        estrategia: `aacontroldemando_pei.calcs.add(
                "Estrategia",
                "Cumplimiento de las Estrategias$SUBTITLE",
                true,
                "pei", "estrategia", "$FILTER", "$VALUE",
                [aacontroldemando_pei.api.pei],
                "Ver Resultados Esperados ","pei","resultado")`,
        resultado: `aacontroldemando_pei.calcs.add(
                "Resultado Esperado",
                "Cumplimiento de los Resultados$SUBTITLE",
                true,
                "pei", "resultado", "$FILTER", "$VALUE",
                [aacontroldemando_pei.api.pei],
                "Ver Indicadores PEI ","pei","indicador_pei")`,
        indicador_pei: `aacontroldemando_pei.calcs.add(
                "Indicador PEI",
                "Cumplimiento de los Indicadores PEI$SUBTITLE",
                false,
                "pei", "indicador_pei", "$FILTER", "$VALUE",
                [  aacontroldemando_pei.api.pei],
                "","","","","","",true)`,
    };
    aacontroldemando_pei.mainMenu = [
        {
            row: [
                {
                    title: "Eje Estratégico",
                    link: aacontroldemando_pei.getFunction("eje")
                },
                {
                    title: "Objetivos Estratégicos",
                    link: aacontroldemando_pei.getFunction("objetivo")
                },
                {
                    title: "Estrategias",
                    link: aacontroldemando_pei.getFunction("estrategia")
                },
                {
                    title: "Resultados Esperados",
                    link: aacontroldemando_pei.getFunction("resultado")
                }
            ]
        },
        {
            row: [
                {
                    title: "Indicadores PEI",
                    link: aacontroldemando_pei.getFunction("indicador_pei"),
                },
            ]
        }
    ];
    aacontroldemando_pei.refresh();
});
