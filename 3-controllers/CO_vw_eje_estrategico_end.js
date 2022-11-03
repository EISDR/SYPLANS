app.controller("vw_eje_estrategico_end", function ($scope, $http, $compile) {
    vw_eje_estrategico_end = this;
    vw_eje_estrategico_end.destroyForm = false;
    var user = new SESSION().current();
    //vw_eje_estrategico_end.fixFilters = [];
    //vw_eje_estrategico_end.singular = "singular";
    //vw_eje_estrategico_end.plural = "plural";
    //vw_eje_estrategico_end.headertitle = "Hola Title";
    //vw_eje_estrategico_end.destroyForm = false;
    //vw_eje_estrategico_end.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_eje_estrategico_end", vw_eje_estrategico_end, $scope, $http, $compile);
    RUN_B("vw_eje_estrategico_end", vw_eje_estrategico_end, $scope, $http, $compile);
    vw_eje_estrategico_end.colors = COLOR.secundary;
    vw_eje_estrategico_end.resumen_pei_list = [];
    vw_eje_estrategico_end.tipeExport = '';


    vw_eje_estrategico_end.height = 100;
    vw_eje_estrategico_end.lines = 52;
    vw_eje_estrategico_end.padding = function (alto, text) {
        var padding = (alto / 2);
        if (text)
            if (text.length > vw_eje_estrategico_end.lines)
                padding = ((alto) / 2) - ((text.length / vw_eje_estrategico_end.lines) * 10);
        padding = parseInt(padding);
        return `${padding}px`;
    };
    vw_eje_estrategico_end.altoresnum = function (ends, resultados) {
        var alto = 0;
        var objetivos = 0;
        for (var end of ends) {
            for (var genera of end.objetivos_generales) {
                for (var espe of genera.objetivos_especificos) {
                    for (var lin of espe.lineas) {
                        alto += vw_eje_estrategico_end.height;
                        objetivos++
                    }
                }
            }
        }
        alto = alto === 0 ? vw_eje_estrategico_end.height : alto;
        if (resultados.length > objetivos) {
            alto = resultados.length * vw_eje_estrategico_end.height;
        }
        return alto;
    };
    vw_eje_estrategico_end.altores = function (ends, resultados) {
        var alto = vw_eje_estrategico_end.altoresnum(ends, resultados);
        return `height: ${(alto / resultados.length)}px;`;
    };
    vw_eje_estrategico_end.altoendnum = function (end, ends, resultados) {
        var objetivos = 0;
        for (var ya of ends) {
            for (var genera of ya.objetivos_generales) {
                for (var espe of genera.objetivos_especificos) {
                    for (var lin of espe.lineas) {
                        objetivos++
                    }
                }
            }
        }

        var alto = 0;
        for (var genera of end.objetivos_generales) {
            for (var espe of genera.objetivos_especificos) {
                for (var lin of espe.lineas) {
                    alto += vw_eje_estrategico_end.height;
                }
            }
        }
        alto = alto === 0 ? vw_eje_estrategico_end.height : alto;
        if (resultados.length > objetivos) {
            alto = (resultados.length * vw_eje_estrategico_end.height) / ends.length;
        }
        return alto;
    };
    vw_eje_estrategico_end.altoend = function (end, ends, resultados) {
        var alto = vw_eje_estrategico_end.altoendnum(end, ends, resultados);
        return `height: ${(alto)}px;padding-left:5px;padding-top: ${vw_eje_estrategico_end.padding(alto, end.nombre)}`;
    };
    vw_eje_estrategico_end.altogennum = function (genera, generales, end, ends, resultados) {
        var objetivos = 0;
        for (var ya of ends) {
            for (var generax of ya.objetivos_generales) {
                for (var espe of generax.objetivos_especificos) {
                    for (var lin of espe.lineas) {
                        objetivos++
                    }
                }
            }
        }

        var alto = 0;
        for (var espe of genera.objetivos_especificos) {
            for (var lin of espe.lineas) {
                alto += vw_eje_estrategico_end.height;
            }
        }
        alto = alto === 0 ? vw_eje_estrategico_end.height : alto;
        if (resultados.length > objetivos) {
            alto = vw_eje_estrategico_end.altoendnum(end, ends, resultados);
            alto = (alto) / generales.length;
        }
        return alto;
    };
    vw_eje_estrategico_end.altogen = function (genera, generales, end, ends, resultados) {
        var alto = vw_eje_estrategico_end.altogennum(genera, generales, end, ends, resultados);
        return `height: ${(alto)}px;padding-left:5px;padding-top: ${vw_eje_estrategico_end.padding(alto, genera.nombre)}`;
    };

    vw_eje_estrategico_end.altoespenum = function (espex, especificos, genera, generales, end, ends, resultados) {
        var objetivos = 0;
        for (var ya of ends) {
            for (var generax of ya.objetivos_generales) {
                for (var espe of generax.objetivos_especificos) {
                    for (var lin of espe.lineas) {
                        objetivos++
                    }
                }
            }
        }
        var alto = 0;
        for (var lin of espex.lineas) {
            alto += vw_eje_estrategico_end.height;
        }
        if (resultados.length > objetivos) {
            alto = vw_eje_estrategico_end.altogennum(genera, generales, end, ends, resultados);
            alto = (alto) / especificos.length;
        }
        return alto;
    };
    vw_eje_estrategico_end.altoespe = function (espex, especificos, genera, generales, end, ends, resultados) {
        var alto = vw_eje_estrategico_end.altoespenum(espex, especificos, genera, generales, end, ends, resultados);
        return `height: ${(alto)}px;padding-left:5px;padding-top: ${vw_eje_estrategico_end.padding(alto, espex.nombre)}`;
    };

    vw_eje_estrategico_end.altoali = function (alix, aliniaciones, espex, especificos, genera, generales, end, ends, resultados) {
        var objetivos = 0;
        for (var ya of ends) {
            for (var generax of ya.objetivos_generales) {
                for (var espe of generax.objetivos_especificos) {
                    for (var lin of espe.lineas) {
                        objetivos++
                    }
                }
            }
        }
        var alto = vw_eje_estrategico_end.height;
        if (resultados.length > objetivos) {
            alto = vw_eje_estrategico_end.altoespenum(espex, especificos, genera, generales, end, ends, resultados);
            alto = (alto) / aliniaciones.length;
        }
        return `height: ${(alto)}px;padding-left:5px;padding-top: ${vw_eje_estrategico_end.padding(alto, alix.nombre)}`;
    };

    vw_eje_estrategico_end.backcolor = function (nombre) {
        return `background-color: ${(nombre ? 'white' : '#cccccc')}`;
    };
    vw_eje_estrategico_end.isoverflownum = function (key, name) {
        var el = document.getElementById(key + name);
        var curOverf = el.style.overflow;
        if (!curOverf || curOverf === "visible")
            el.style.overflow = "hidden";
        var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
        el.style.overflow = curOverf;
        console.log(isOverflowing);
        if (isOverflowing)
            return true;
        return false;
    };
    vw_eje_estrategico_end.isoverflow = function (key, name) {
        if (vw_eje_estrategico_end.isoverflownum(key, name))
            return `color: #1E88E5;text-decoration: underline;cursor:pointer;`;
    };
    vw_eje_estrategico_end.fill = function () {
        vw_eje_estrategico_end.DATA = {};
        vw_eje_estrategico_end.DATA.ejes = [];
        for (var row of vw_eje_estrategico_end.vw_eje_estrategico_end_list) {
            var S_eje = vw_eje_estrategico_end.DATA.ejes.filter(d => d.nombre === row.eje_estrategico);
            if (S_eje.length === 0) {
                vw_eje_estrategico_end.DATA.ejes.push({
                    nombre: row.eje_estrategico,
                    objetivos_estrategicos: []
                });
            }
            var ejeitem = vw_eje_estrategico_end.DATA.ejes.filter(d => d.nombre === row.eje_estrategico)[0];
            var S_eje_oe = ejeitem.objetivos_estrategicos.filter(d => d.nombre === row.objetivo_estrategico);

            if (S_eje_oe.length === 0) {
                ejeitem.objetivos_estrategicos.push({
                    nombre: row.objetivo_estrategico,
                    ends: [],
                    resultados: []
                });
            }

            var objitem = ejeitem.objetivos_estrategicos.filter(d => d.nombre === row.objetivo_estrategico)[0];
            var S_end = objitem.ends.filter(d => d.nombre === row.end);

            if (objitem.resultados.indexOf(row.resultado) === -1)
                objitem.resultados.push(row.resultado);

            if (S_end.length === 0) {
                objitem.ends.push({
                    nombre: row.end,
                    objetivos_generales: []
                });
            }

            var ogitem = objitem.ends.filter(d => d.nombre === row.end)[0];
            var S_general = ogitem.objetivos_generales.filter(d => d.nombre === row.objetivo_general);
            if (S_general.length === 0) {
                ogitem.objetivos_generales.push({
                    nombre: row.objetivo_general,
                    objetivos_especificos: []
                });
            }

            var oeitem = ogitem.objetivos_generales.filter(d => d.nombre === row.objetivo_general)[0];
            var S_especifico = oeitem.objetivos_especificos.filter(d => d.nombre === row.objetivo_especifico);

            if (S_especifico.length === 0) {
                oeitem.objetivos_especificos.push({
                    nombre: row.objetivo_especifico,
                    lineas: []
                });
            }

            var laitem = oeitem.objetivos_especificos.filter(d => d.nombre === row.objetivo_especifico)[0];
            var S_linea = laitem.lineas.filter(d => d.nombre === row.linea_accion);

            if (S_linea.length === 0) {
                laitem.lineas.push({
                    nombre: row.linea_accion
                });
            }

        }

    };

    vw_eje_estrategico_end.modaltext = function (message, column, key, name) {
        if (vw_eje_estrategico_end.isoverflownum(key, name)) {
            vw_eje_estrategico_end.modal.simpleModal(message, {
                header: {title: `${MESSAGE.ic('mono.completetext')} ${MESSAGE.i('mono.of')} ` + column}
            });
        }
    };

    vw_eje_estrategico_end.afterInstitucion = function () {
        var animation1 = new ANIMATION();
        animation1.loading(`#peitable`, "", ``, '80');
        vw_eje_estrategico_end.vw_eje_estrategico_end_get();
    };

    vw_eje_estrategico_end.vw_eje_estrategico_end_get = async function (r) {
        var animation1 = new ANIMATION();
        if (r)
            animation1.loading(`#peitable`, "", ``, '80');
        vw_eje_estrategico_end.vw_eje_estrategico_end_list = await BASEAPI.listp('vw_eje_estrategico_end', {
            limit: 0,
            orderby: "$compania, no_orden",
            order: "asc",
            where: vw_eje_estrategico_end.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_eje_estrategico_end.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_eje_estrategico_end.companiasel
                }]
        });
        vw_eje_estrategico_end.vw_eje_estrategico_end_list = vw_eje_estrategico_end.vw_eje_estrategico_end_list.data;
        vw_eje_estrategico_end.fill();
        animation1.stoploading(`#peitable`);
        vw_eje_estrategico_end.refreshAngular();
    };

    vw_eje_estrategico_end.exportXLS = function () {
        var url = $("#dataexport").excelexportjs({
            containerid: "dataexport",
            datatype: 'table',
            worksheetName: `Alineación PEI con la END.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación PEI con la END", url);
    };

    vw_eje_estrategico_end.exportPDF = function () {


        // var fileName = `Alineación PEI con la END.pdf`;
        // var url = $("#peitable_export").excelexportjs({
        //     containerid: "peitable_export",
        //     datatype: 'div',
        //     worksheetName: `Alineación PEI con la END`,
        //     returnUri: true
        // });
        // DOWNLOAD.excel(fileName, url);
        //
        $("#peitable_export").printThis({
            importCSS: true,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };


    setTimeout(() => {
        var animation1 = new ANIMATION();
        animation1.loading(`#peitable`, "", ``, '80');
        vw_eje_estrategico_end.vw_eje_estrategico_end_get();
    }, 2000);


    vw_eje_estrategico_end.openmodalField = function (value) {

        vw_eje_estrategico_end.tipeExport = value.toString();

        vw_eje_estrategico_end.modal.modalView("vw_eje_estrategico_end/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Alineación END con Ejes Estratégicos`,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }
});
