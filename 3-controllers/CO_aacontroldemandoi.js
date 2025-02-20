app.controller("aacontroldemando", function ($scope, $http, $compile) {
    aacontroldemando = this;
    RUNCONTROLLER("aacontroldemando", aacontroldemando, $scope, $http, $compile);
    aacontroldemando.session = new SESSION().current();
    aacontroldemando.DPTO = new SESSION().definitivo();
    aacontroldemando.miPOA = (baseController?.poaFirt || baseController?.poaFirt[0] || {});
    aacontroldemando.monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    aacontroldemando.elpoa = baseController.poaList.filter(d => d.id === baseController.poaActual)[0];
    aacontroldemando.elmonitoreo = baseController.poa_monitorieo.filter(d => d.id === aacontroldemando?.elpoa?.monitoreo)[0];

    aacontroldemando.incrementar = (12 / aacontroldemando.elmonitoreo.cantidad);
    aacontroldemando.filters = [];
    aacontroldemando.perix = 1;

    for (i = 1; i <= 12; i += aacontroldemando.incrementar) {
        if (aacontroldemando.incrementar > 1) {
            aacontroldemando.filters.push({
                id: aacontroldemando.perix,
                name: `${aacontroldemando.monthNames[i - 1]} - ${aacontroldemando.monthNames[(i - 1) + (aacontroldemando.incrementar - 1)]}`
            });
        } else {
            aacontroldemando.filters.push({
                id: aacontroldemando.perix,
                name: `${aacontroldemando.monthNames[i - 1]}`
            });
        }
        aacontroldemando.perix++;
    }
    aacontroldemando.filtrofecha = STORAGE.get("cumplifilterpoa") || aacontroldemando.filters.map(d => d.id);

    if (aacontroldemando.miPOA.periodo_dinamico && typeof aacontroldemando_pei === "undefined") {
        aacontroldemando.filtrofechames = STORAGE.get("filtrofechames") || "Diciembre";
    }
    aacontroldemando.setFiltro = () => {
        SWEETALERT.loading({message: "Filtrando Cumplimiento"});
        if (aacontroldemando.filtrofechames) {
            STORAGE.add("filtrofechames", aacontroldemando.filtrofechames);
        } else
            STORAGE.add("cumplifilterpoa", aacontroldemando.filtrofecha);
        location.reload();
    }

    aacontroldemando.modolista = location.href.indexOf('modolista') !== -1;
    aacontroldemando.filtrosSoloCompania = [
        {
            field: "compania",
            value: aacontroldemando.session.compania_id
        }
    ];
    aacontroldemando.filtrosCompania = [
        {
            field: "compania",
            value: aacontroldemando.session.compania_id
        },
        {
            open: "(",
            field: "poa",
            operator: "=",
            value: `$${aacontroldemando.session.poa_id} OR poa=0)`
        },
    ];

    if (aacontroldemando.miPOA.periodo_dinamico) {
        if (aacontroldemando.filtrofechames) {
            let elme = aacontroldemando.monthNames.indexOf(aacontroldemando.filtrofechames) + 1;
            let lafe = `${aacontroldemando.elpoa.periodo_poa}-${elme}-01`;
            let lafefinal = moment(lafe).add(1, 'month').add(-1, 'day').format("YYYY-MM-DD");

            aacontroldemando.filtrosCompania.push(
                {
                    field: "from_date",
                    operator: "<=",
                    value: lafefinal
                }
            );

        } else if (aacontroldemando.filtrofecha) {
            aacontroldemando.filtrosCompania.push({
                field: "from_date",
                operator: "in",
                value: aacontroldemando.filtrofecha
            });
        }
    }

    aacontroldemando.builded = false;
    aacontroldemando.abierto = true;
    aacontroldemando.donfocusnah = true;

    if (aacontroldemando.DPTO)
        aacontroldemando.filtrosCompania.push({
            field: "departamento_id",
            value: aacontroldemando.DPTO
        });
    if (aacontroldemando.session.institucion_id)
        aacontroldemando.filtrosCompania.push({
            field: "institucion",
            value: aacontroldemando.session.institucion_id
        })
    else
        aacontroldemando.filtrosCompania.push(
            {
                field: "institucion",
                operator: "IS",
                value: "$NULL"
            })
    aacontroldemando.REPORTING = undefined;
    aacontroldemando.FICHA = {
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
    aacontroldemando.dibujaGracfico = (div, value, color, width, height, arcstart, arcend) => {
        if (aacontroldemando.modolista)
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
    aacontroldemando.api = {
        ponderaciones: undefined,
        formulas: undefined,
        pei: undefined,
        productos: undefined,
        actividades: undefined,
        tiposMeta: aacontroldemando.session.tipoMenta,
        direccionesMeta: aacontroldemando.session.direccionMeta,
        periodicidad: baseController.poa_monitorieo
    };
    aacontroldemando.HISTORY = [];
    aacontroldemando.ui = {
        backup: () => {
            if (aacontroldemando.REPORTING) {
                aacontroldemando.HISTORY.push(JSON.parse(JSON.stringify(aacontroldemando.REPORTING)));
            }
        },
        restore: (home) => {
            if (home) {
                aacontroldemando.REPORTING = JSON.parse(JSON.stringify(home));
                aacontroldemando.HISTORY = [];
                MODAL.closeAll();
                aacontroldemando.openModal(aacontroldemando.REPORTING.titulo);
            } else {
                if (aacontroldemando.HISTORY.length) {
                    aacontroldemando.REPORTING = JSON.parse(JSON.stringify(aacontroldemando.HISTORY[aacontroldemando.HISTORY.length - 1]));
                    aacontroldemando.HISTORY.splice(aacontroldemando.HISTORY.length - 1, 1);
                    MODAL.closeAll();
                    aacontroldemando.openModal(aacontroldemando.REPORTING.titulo);
                } else {
                    MODAL.closeAll();
                    aacontroldemando.REPORTING = undefined;
                }
            }
        },
        goHome: () => {
            MODAL.closeAll();
            aacontroldemando.REPORTING = undefined;
        }
    };
    aacontroldemando.existx = (arrayx, label, value) => {
        if (value)
            arrayx.push({label: label, value: value})
    };
    aacontroldemando.calcs = {
        ficha: (list, field, id, pei) => {
            let indicador = aacontroldemando.calcs.indicador(aacontroldemando.api[list].filter(d => d[field] === id), pei);
            let main = indicador[0];
            let fichaFinal = {};
            fichaFinal.datos_relacionados = [];
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Eje Estrategico", main.eje);
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Objetivo Estrategico", main.objetivo);
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Estrategia", main.estrategia);
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Resultado Esperado", main.resultado);
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Departamento", main.departamento);
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Producto", main.producto);
            aacontroldemando.existx(fichaFinal.datos_relacionados, "Actividad", main.actividad);
            if (!main.indicador_pei)
                aacontroldemando.existx(fichaFinal.datos_relacionados, "Año del POA", main.ano);
            fichaFinal.periodicidad = main.periodicidad.nombre_mostrar;
            fichaFinal.grafico = {
                porcentaje: Number(main.sumas.cumplimiento).toFixed(2),
                color: main.sumas.ponderacion.color,
                titulo_ponderacion: main.sumas.ponderacion.titulo
            };
            fichaFinal.datos_indicador = [];
            aacontroldemando.existx(fichaFinal.datos_indicador, "Indicador PEI", main.indicador_pei);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Indicador POA", main.indicador_producto);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Indicador Actividad", main.indicador_actividad);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Descripción del indicador", main.descripcion);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Fuente", main.fuente);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Método de Cálculo", main.metodo_calculo);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Año Línea Base", main.ano_linea_base);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Línea base", main.linea_base);
            aacontroldemando.existx(fichaFinal.datos_indicador, "Medio de Verificación", main.medio_verificacion);
            fichaFinal.leyenda = `Este indicador trabaja con <b>${main.tipoMeta[0].nombre}</b> y debe tender a ser <b>${main.direccionMeta[0].nombre}</b>`;
            fichaFinal.periodos = [];
            if (indicador) {
                indicador = indicador.sort(GetSortOrder("periodo"));
            }
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
            aacontroldemando.FICHA = fichaFinal;
            aacontroldemando.openFicha(main.indicador_pei || main.indicador_producto || main.indicador_actividad);
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
                    let sum = (aacontroldemando.calcs.sumArray(values) / values.length) || 0;
                    if (values.length)
                        ponderadoSums.push(sum);
                }
            }
            if (!ponderadoSums.length)
                return undefined;
            return (aacontroldemando.calcs.sumArray(ponderadoSums) / ponderadoSums.length) || 0;
        },
        general: () => {
            let ponderadoSums = [];
            for (const list of [aacontroldemando.api.pei, aacontroldemando.api.productos, aacontroldemando.api.actividades]) {
                let values = list.filter(d => d.props.valid).filter(d => d.sumas).filter(d => d.sumas.cumplimiento >= 0).map(d => d.sumas.cumplimiento);
                let sum = (aacontroldemando.calcs.sumArray(values) / values.length) || 0;
                if (values.length)
                    ponderadoSums.push(sum);
            }
            return (aacontroldemando.calcs.sumArray(ponderadoSums) / ponderadoSums.length) || 0;
        },
        add: (entidad, title, generalPonderation, list, field, filter, parent, lists, boton, listCount, fieldCount, boton2, listCount2, fieldCount2, boton3) => {
            aacontroldemando.ui.backup();
            let ponderaciones = aacontroldemando.api.ponderaciones.sort(GetSortOrder("orden"));
            // if (generalPonderation)
            //     ponderaciones = ponderaciones.filter(d => d.tipo_meta === 0);
            let finalPonderaciones = [];
            let distinctPonderations = [...new Set(aacontroldemando.api.ponderaciones.map(d => d.tipo_meta))];
            for (const tipo_meta_index of distinctPonderations) {
                // if (generalPonderation && tipo_meta_index !== 0)
                //     continue;
                let nombre = (aacontroldemando.api.tiposMeta.filter(d => d.id === tipo_meta_index)[0] || {nombre: "General"}).nombre;
                let liston = ponderaciones.filter(d => d.tipo_meta === tipo_meta_index).map(d => {
                    return {color: d.color, nombre: d.titulo, titulo: `Progreso de ${d.from} a ${d.to}`}
                });
                finalPonderaciones.push({
                    nombre: nombre,
                    list: liston
                });
            }
            let listDistinct = [...new Set(aacontroldemando.api[list].filter(d => (d[filter] || parent) === parent).map(d => d[field]))];
            let finalList = [];
            let index = 0;
            let ids = new Date().getTime();
            for (const d of listDistinct) {
                let detallex = aacontroldemando.api[list].filter(e => e[field] === d)[0];
                let idlogico = detallex[field + "_id"];
                let elemento = {
                    nombre: d,
                    id: idlogico,
                    estrategico: detallex.tipo_resultado
                };
                let elponderisto = aacontroldemando.calcs.elementPonderado(lists, field, d);
                elemento.porcentaje = elponderisto === undefined ? "" : Number(aacontroldemando.calcs.elementPonderado(lists, field, d)).toFixed(2);
                let ponderacion = elponderisto === undefined ? {
                    color: "#eee",
                    titulo: "Pendiente a ser evaluado"
                } : (aacontroldemando.calcs.ponderacion(elemento.porcentaje, boton3 ? detallex.tipo_meta : undefined) || {
                    color: "#ccc",
                    titulo: "Sin Configurar"
                });
                if (listCount && fieldCount) {
                    let countN = [...new Set(aacontroldemando.api[listCount].filter(e => e[field] === d).map(e => e[fieldCount]))];
                    elemento.boton = `${boton} (${countN.length})`;
                    elemento.link = aacontroldemando.getFunction(fieldCount, ` de ${d}`, field, d);
                }
                if (listCount2 && fieldCount2) {
                    let countN = [...new Set(aacontroldemando.api[listCount2].filter(e => e[field] === d).map(e => e[fieldCount2]))];
                    elemento.boton2 = `${boton2} (${countN.length})`;
                    elemento.link2 = aacontroldemando.getFunction(fieldCount2, ` de ${d}`, field, d);
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
            aacontroldemando.REPORTING = reporting;
            MODAL.closeAll();
            aacontroldemando.openModal(aacontroldemando.REPORTING.titulo);
        },
        one: async (view, session, indicadorField, indicadorID, espei) => {
            let result = await aacontroldemando.listp(view,
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
            let obj = aacontroldemando.calcs.indicador(periodos, espei);
            return {
                cumplimiento: obj[0].sumas.cumplimiento,
                ponderacion: obj[0].sumas.ponderacion
            }
        },
        buildAll: () => {
            for (const d of aacontroldemando.api.productos) {
                aacontroldemando.calcs.build(d.indicador_producto_id, "productos", "indicador_producto_id");
            }
            for (const d of aacontroldemando.api.actividades) {
                aacontroldemando.calcs.build(d.indicador_actividad_id, "actividades", "indicador_actividad_id");
            }
            for (const d of aacontroldemando.api.pei) {
                aacontroldemando.calcs.build(d.indicador_pei_id, "pei", "indicador_pei_id", true);
            }
        },
        build: (id, property, field, pei) => {
            let periodos = aacontroldemando.api[property].filter(d => {
                return d[field] == id
            });
            return aacontroldemando.calcs.indicador(periodos, pei);
        },
        indicador: (periodos, pei) => {
            if (periodos)
                if (periodos.length) {
                    let periodicidad = aacontroldemando.calcs.periodicidad(pei ? [] : periodos[0].monitoreo_cantidad);
                    let tipo_meta = periodos[0].tipo_meta;
                    let direccion_meta = periodos[0].direccion_meta;
                    let formula = aacontroldemando.calcs.formula(tipo_meta, direccion_meta);
                    let periodosValidos = aacontroldemando.calcs.processPeriodos(periodos, formula, pei);
                    return periodosValidos;
                }
            return [];
        },
        processPeriodos: (periodos, formula, pei) => {
            var mes = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            if (periodos)
                if (periodos.length) {
                    let periodicidad = aacontroldemando.calcs.periodicidad(pei ? [] : periodos[0].monitoreo_cantidad);
                    var actual = Math.ceil((mes / (12 / periodicidad.cantidad)));
                    let tipo_meta = aacontroldemando.api.tiposMeta.filter(d => d.id === formula.tipo_meta);
                    let direccion_meta = aacontroldemando.api.direccionesMeta.filter(d => d.id === formula.direccion_meta);
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
                        if (aacontroldemando.abierto === false && d.props.current)
                            d.props.valid = false;
                        if (d.props.sinMeta)
                            d.props.valid = false;

                        d.props.rawMeta = aacontroldemando.calcs.rawValue(d.valor, formula);
                        d.props.rawAlcanzada = aacontroldemando.calcs.rawValue(d.valor_alcanzado, formula);
                        d.props.rawVarianza = aacontroldemando.calcs.rawVarianza(d.props.rawMeta, d.props.rawAlcanzada, formula);

                        d.props.formatedMeta = aacontroldemando.calcs.format(d.props.rawMeta, "formato", formula);
                        d.props.formatedAlcanzada = aacontroldemando.calcs.format(d.props.rawAlcanzada, "formato", formula);
                        d.props.formatedVarianza = aacontroldemando.calcs.format(d.props.rawVarianza, "varianzaformato", formula);
                    });
                    let sumas = {};
                    let rawSumMeta = aacontroldemando.calcs.rawSum(periodos, "rawMeta", formula);
                    let rawSumAlcanzada = aacontroldemando.calcs.rawSum(periodos, "rawAlcanzada", formula);
                    let rawSumVarianza = aacontroldemando.calcs.rawSum(periodos, "rawVarianza", formula);
                    let formatedSumMeta = aacontroldemando.calcs.format(rawSumMeta, "sumformato", formula);
                    let formatedSumAlcanzada = aacontroldemando.calcs.format(rawSumAlcanzada, "sumformato", formula);
                    let formatedSumVarianza = aacontroldemando.calcs.format(rawSumVarianza, "sumformato", formula);
                    sumas = {
                        rawSumMeta: rawSumMeta,
                        rawSumAlcanzada: rawSumAlcanzada,
                        tomar: periodos.filter(d => d.props.valid).length,
                        rawSumVarianza: rawSumVarianza,
                        formatedSumMeta: formatedSumMeta,
                        formatedSumAlcanzada: formatedSumAlcanzada,
                        formatedSumVarianza: formatedSumVarianza,
                        cumplimiento: aacontroldemando.calcs.percentage(rawSumMeta, rawSumAlcanzada, rawSumVarianza, formula, periodos.filter(d => d.props.valid).length)
                    };
                    sumas.ponderacion = aacontroldemando.calcs.ponderacion(sumas.cumplimiento, formula.tipo_meta);
                    periodos.forEach(d => {
                        d.sumas = sumas;
                    });

                    return periodos;
                }
            return [];
        },
        periodicidad: (periodos) => {
            return aacontroldemando.api.periodicidad.filter(d => {
                return d.cantidad === (periodos || 1);
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
            return aacontroldemando.api.formulas.filter(d => {
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
            return aacontroldemando.api.ponderaciones.filter(d => {
                return d.tipo_meta === finalFilter && (Math.floor(valor) >= d.from && Math.floor(valor) <= d.to);
            })[0] || {
                tipo_meta: "1",
                titulo: "Ponderación Sin Configurar",
                color: "#ccc",
                from: 0,
                to: 0,
                orden: 1,
                compania: aacontroldemando.session.compania_id
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
    aacontroldemando.filtrar = async (accion) => {
        aacontroldemando.abierto = accion === "abrir" ? false : true;
        aacontroldemando.refresh();
    };
    aacontroldemando.refresh = async () => {
        if (new SESSION().current()) {
            SWEETALERT.loading({message: "Estructurando Reporte Completo"});
            console.log("aacontroldemando.refresh");
            if (!aacontroldemando.api.ponderaciones)
                aacontroldemando.api.ponderaciones = await aacontroldemando.listp("reporte_indicador_config", aacontroldemando.filtrosSoloCompania);
            if (!aacontroldemando.api.formulas)
                aacontroldemando.api.formulas = await aacontroldemando.listp("reporte_tipometa_formula");

            aacontroldemando.api.pei = [];
            aacontroldemando.api.productos = await aacontroldemando.listp("vw_report_indicadores_producto", aacontroldemando.filtrosCompania);
            aacontroldemando.api.actividades = await aacontroldemando.listp("vw_report_indicadores_actividad", aacontroldemando.filtrosCompania);
            aacontroldemando.calcs.buildAll();
            setTimeout(() => {
                $("#graficoGeneral").html("");
                let general = aacontroldemando.calcs.general();
                aacontroldemando.generalPonderacion = aacontroldemando.calcs.ponderacion(general);
                aacontroldemando.dibujaGracfico("graficoGeneral", Number(general).toFixed(2), aacontroldemando.generalPonderacion.color, 300, 200);

                SWEETALERT.stop();
                aacontroldemando.refreshAngular();
            }, 200);
        }
    };
    aacontroldemando.listp = async (api, where) => {
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
    aacontroldemando.openModal = (title, icon) => {
        aacontroldemando.modal.modalView("aacontroldemando/reporte", {
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
    aacontroldemando.openFicha = (title, icon) => {
        aacontroldemando.modal.modalView("aacontroldemando/fichaindicador", {
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
    aacontroldemando.OpenPonderaciones = (title, icon) => {
        aacontroldemando.modal.modalView("aacontroldemando/ponderacion", {
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
    aacontroldemando.execute = (code) => {
        eval(code);
    };
    aacontroldemando.getFunction = (entity, SUBTITLE, FILTER, VALUE) => {
        return aacontroldemando.templateFunctions[entity].replace("$SUBTITLE", SUBTITLE || "").replace("$FILTER", FILTER || "").replace("$VALUE", VALUE || "");
    };
    aacontroldemando.templateFunctions = {
        eje: `aacontroldemando.calcs.add("Eje Estratégico","Cumplimiento de los Ejes Estratégicos$SUBTITLE",
              true, "productos", "eje", "$FILTER", "$VALUE",
              [aacontroldemando.api.pei, aacontroldemando.api.productos, aacontroldemando.api.actividades],
              "Ver Objetivos Estratégicos ","productos","objetivo")`,
        objetivo: `aacontroldemando.calcs.add(
        "Objetivo Estratégico",
                "Cumplimiento de los Objetivos Estratégicos$SUBTITLE",
                true,
                "productos", "objetivo", "$FILTER", "$VALUE",
                [aacontroldemando.api.pei, aacontroldemando.api.productos, aacontroldemando.api.actividades],
                "Ver Estrategias ","productos","estrategia")`,
        estrategia: `aacontroldemando.calcs.add(
        "Estrategia",
                "Cumplimiento de las Estrategias$SUBTITLE",
                true,
                "productos", "estrategia", "$FILTER", "$VALUE",
                [aacontroldemando.api.pei, aacontroldemando.api.productos, aacontroldemando.api.actividades],
                "Ver Resultados Esperados ","productos","resultado")`,
        resultado: `aacontroldemando.calcs.add(
        "Resultado Esperado",
                "Cumplimiento de los Resultados$SUBTITLE",
                true,
                "productos", "resultado", "$FILTER", "$VALUE",
                [aacontroldemando.api.pei, aacontroldemando.api.productos, aacontroldemando.api.actividades],
                "Ver Productos ","productos","producto")`,
        producto: `aacontroldemando.calcs.add(
        "Producto",
                "Cumplimiento de los Productos$SUBTITLE",
                true,
                "productos", "producto", "$FILTER", "$VALUE",
                [  aacontroldemando.api.productos, aacontroldemando.api.actividades],
                "Ver Actividades ","actividades","actividad","Ver Indicadores de Productos","productos","indicador_producto")`,
        departamento: `aacontroldemando.calcs.add(
        "Departamento",
                "Cumplimiento de los Departamentos$SUBTITLE",
                true,
                "productos", "departamento", "$FILTER", "$VALUE",
                [ aacontroldemando.api.productos, aacontroldemando.api.actividades],
                "Ver Productos ","productos","producto")`,
        actividad: `aacontroldemando.calcs.add(
        "Actividad",
                "Cumplimiento de los Actividades$SUBTITLE",
                true,
                "actividades", "actividad", "$FILTER", "$VALUE",
                [  aacontroldemando.api.actividades],
                "Ver Indicadores de Actividades ","actividades","indicador_actividad")`,
        responsable: `aacontroldemando.calcs.add(
        "Usuario",
                "Cumplimiento de los Usuarios$SUBTITLE",
                true,
                "actividades", "responsable", "$FILTER", "$VALUE",
                [  aacontroldemando.api.actividades],
                "Ver Actividades ","actividades","actividad")`,
        indicador_pei: `aacontroldemando.calcs.add(
        "Indicador PEI",
                "Cumplimiento de los Indicadores PEI$SUBTITLE",
                false,
                "pei", "indicador_pei", "$FILTER", "$VALUE",
                [  aacontroldemando.api.pei],
                "","","","","","",true)`,
        indicador_producto: `aacontroldemando.calcs.add(
        "Indicador de Producto",
                "Cumplimiento de los Indicadores POA$SUBTITLE",
                false,
                "productos", "indicador_producto", "$FILTER", "$VALUE",
                [  aacontroldemando.api.productos],
                "","","","","","",true)`,
        indicador_actividad: `aacontroldemando.calcs.add(
        "Indicador de Actividad",
                "Cumplimiento de los Indicadores Actividades$SUBTITLE",
                false,
                "actividades", "indicador_actividad", "$FILTER", "$VALUE",
                [  aacontroldemando.api.actividades],
                "","","","","","",true)`
    };
    aacontroldemando.mainMenu = [
        {
            row: [
                {
                    title: "Eje Estratégico",
                    link: aacontroldemando.getFunction("eje")
                },
                {
                    title: "Objetivos Estratégicos",
                    link: aacontroldemando.getFunction("objetivo")
                },
                {
                    title: "Estrategias",
                    link: aacontroldemando.getFunction("estrategia")
                },
                {
                    title: "Resultados Esperados",
                    link: aacontroldemando.getFunction("resultado")
                }
            ]
        },
        {
            row: [
                {
                    title: "Productos",
                    link: aacontroldemando.getFunction("producto")
                },
                {
                    title: "Departamentos",
                    link: aacontroldemando.getFunction("departamento")
                },
                {
                    title: "Actividades",
                    link: aacontroldemando.getFunction("actividad")
                },
                {
                    title: "Usuarios",
                    link: aacontroldemando.getFunction("responsable")
                }
            ]
        },
        {
            row: [
                {
                    title: "Indicadores Productos",
                    link: aacontroldemando.getFunction("indicador_producto"),
                },
                {
                    title: "Indicadores Actividades",
                    link: aacontroldemando.getFunction("indicador_actividad"),
                }
            ]
        }
    ];
    aacontroldemando.refresh();
});
