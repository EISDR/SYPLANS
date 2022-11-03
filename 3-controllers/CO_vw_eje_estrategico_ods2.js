app.controller("vw_eje_estrategico_ods2", function ($scope, $http, $compile) {
    vw_eje_estrategico_ods2 = this;
    vw_eje_estrategico_ods2.destroyForm = false;
    var user = new SESSION().current();
    vw_eje_estrategico_ods2.session = user;
    //vw_eje_estrategico_ods2.fixFilters = [];
    //vw_eje_estrategico_ods2.singular = "singular";
    //vw_eje_estrategico_ods2.plural = "plural";
    //vw_eje_estrategico_ods2.headertitle = "Hola Title";
    //vw_eje_estrategico_ods2.destroyForm = false;
    //vw_eje_estrategico_ods2.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_eje_estrategico_ods2", vw_eje_estrategico_ods2, $scope, $http, $compile);
    RUN_B("vw_eje_estrategico_ods2", vw_eje_estrategico_ods2, $scope, $http, $compile);
    vw_eje_estrategico_ods2.colors = COLOR.secundary;
    vw_eje_estrategico_ods2.resumen_pei_list = [];
    vw_eje_estrategico_ods2.tipeExport = '';
    var animation1 = new ANIMATION();

    vw_eje_estrategico_ods2.rowspanme = function (list, field, value) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };

    vw_eje_estrategico_ods2.seeme = function (list, field, value, key) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    vw_eje_estrategico_ods2.graficos = {};
    vw_eje_estrategico_ods2.titles = {};
    vw_eje_estrategico_ods2.percents = {};
    vw_eje_estrategico_ods2.currentKey = "";
    vw_eje_estrategico_ods2.sorteorder = "nombre";
    vw_eje_estrategico_ods2.sorteorderOrder = "asc";

    vw_eje_estrategico_ods2.loadAllThis = (name, data) => {
        setTimeout(() => {
            data.forEach((grafico, ix) => {
                demoKnob(`${name}_${ix}`, grafico.value, grafico.color);
            });
        }, 50);
    };
    vw_eje_estrategico_ods2.sortGrafico = (key, prop, reverse) => {
        vw_eje_estrategico_ods2.graficos[key].sort(GetSortOrder(prop));
        if (reverse)
            vw_eje_estrategico_ods2.graficos[key].sort(GetSortOrder(prop)).reverse();
    };

    vw_eje_estrategico_ods2.modoBarra = async () => {

        vw_eje_estrategico_ods2.titles["B"] = "Vista Global de Cumplimiento de los Objetivos de Desarrollo Sostenible";
        vw_eje_estrategico_ods2.graficos["B"] = vw_eje_estrategico_ods2.grafico_ods.map(d => {
            let color = vw_eje_estrategico_ods2.ranges.filter(e => {
                return d.value >= e.from && d.value <= e.to
            })[0];
            d.color = color ? color.color : "#000";
            d.estatus = color ? color.titulo : "Sin Identificar";
            return d;
        });
        vw_eje_estrategico_ods2.graficos["C"] = {};
        for (const existe of vw_eje_estrategico_ods2.ODSDATA) {
            vw_eje_estrategico_ods2.graficos["C"][`${existe.edt} ${existe.nombre}`] = vw_eje_estrategico_ods2.graficos["B"].filter(d => {
                return d.nombre === `${existe.edt} ${existe.nombre}`
            })[0] || {
                estatus: "Sin Identificar",
                color: "#000",
                nombre: `${existe.edt} ${existe.nombre}`,
                count: 0,
                value: 0
            };
        }

        if (vw_eje_estrategico_ods2.noopenmodals)
            return;
        vw_eje_estrategico_ods2.modal.modalView("vw_eje_estrategico_ods2/barra", {
            header: {
                title: vw_eje_estrategico_ods2.titles["B"],
                icon: "chart"
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

    vw_eje_estrategico_ods2.modoGrafico = async (ods, producto, percent) => {
        vw_eje_estrategico_ods2.selectedods = ods;
        vw_eje_estrategico_ods2.selectedproducto = producto;
        let key = ods && producto ? "A" : ods ? "P" : "O";

        if (key === "P") {
            vw_eje_estrategico_ods2.percents[key] = percent;
            vw_eje_estrategico_ods2.titles[key] = `Objetivos de Desarrollo Sostenible: "${ods}" (${vw_eje_estrategico_ods2.percents[key] || ''}%)`;

            vw_eje_estrategico_ods2.graficos[key] = vw_eje_estrategico_ods2.grafico_productos.filter(d => {
                return d.ods === ods
            }).map(d => {
                let color = vw_eje_estrategico_ods2.ranges.filter(e => {
                    return d.value >= e.from && d.value <= e.to
                })[0];
                d.color = color ? color.color : "#000";
                d.estatus = color ? color.titulo : "Sin Identificar";
                return d;
            });

        } else if (key === "A") {
            vw_eje_estrategico_ods2.percents[key] = percent;
            vw_eje_estrategico_ods2.titles[key] = `Objetivos de Desarrollo Sostenible: "${ods}" (${vw_eje_estrategico_ods2.percents["P"] || 0}%), Producto: "${producto}" (${vw_eje_estrategico_ods2.percents[key] || 0}%)`;

            vw_eje_estrategico_ods2.graficos[key] = vw_eje_estrategico_ods2.grafico_actividades.filter(d => {
                return d.producto === producto
            }).map(d => {
                let color = vw_eje_estrategico_ods2.ranges.filter(e => {
                    return d.value >= e.from && d.value <= e.to
                })[0];
                d.color = color ? color.color : "#000";
                d.estatus = color ? color.titulo : "Sin Identificar";
                return d;
            });
        } else {
            vw_eje_estrategico_ods2.titles[key] = "Cumplimiento de los Objetivos de Desarrollo Sostenible";
            vw_eje_estrategico_ods2.graficos[key] = vw_eje_estrategico_ods2.grafico_ods.map(d => {
                let color = vw_eje_estrategico_ods2.ranges.filter(e => {
                    return d.value >= e.from && d.value <= e.to
                })[0];
                d.color = color ? color.color : "#000";
                d.estatus = color ? color.titulo : "Sin Identificar";
                return d;
            });
        }

        if (!ods)
            if (vw_eje_estrategico_ods2.noopenmodals)
                return;
        vw_eje_estrategico_ods2.modal.modalView("vw_eje_estrategico_ods2/grafico_" + key, {
            header: {
                title: vw_eje_estrategico_ods2.titles[key],
                icon: "chart"
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

    vw_eje_estrategico_ods2.verProducto = async (id) => {
        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
        vw_eje_estrategico_ods2.modelName = "productos_poa";
        vw_eje_estrategico_ods2.usuarpadora = "vw_eje_estrategico_ods2";
        TABLEFORMAT.run(vw_eje_estrategico_ods2);
        let actividad = await BASEAPI.firstp("vw_productos_poa_detalles", {where: [{value: id}]});
        let data = {row: actividad};
        SWEETALERT.stop();
        if (!DSON.oseaX(data.row)) {
            vw_eje_estrategico_ods2.dataForView = data.row;
            vw_eje_estrategico_ods2.modal.modalView("vw_eje_estrategico_ods2/producto", {
                header: {
                    title: "Ver Producto",
                    icon: "user"
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
        }
    };
    vw_eje_estrategico_ods2.verActividad = async (id) => {
        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
        vw_eje_estrategico_ods2.modelName = "actividades_poa";
        vw_eje_estrategico_ods2.usuarpadora = "vw_eje_estrategico_ods2";
        TABLEFORMAT.run(vw_eje_estrategico_ods2);
        let actividad = await BASEAPI.firstp("vw_actividades_poa", {where: [{value: id}]});
        let data = {row: actividad};
        SWEETALERT.stop();
        if (!DSON.oseaX(data.row)) {
            vw_eje_estrategico_ods2.dataForView = data.row;
            vw_eje_estrategico_ods2.modal.modalView("vw_eje_estrategico_ods2/actividad", {
                header: {
                    title: "Ver Actividad",
                    icon: "user"
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
        }
    };

    vw_eje_estrategico_ods2.afterInstitucion = function () {
        vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_get();
    };

    vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');
        vw_eje_estrategico_ods2.ODSDATA = await BASEAPI.listp("ods", {
            limit: 0,
            page: 1
        });
        vw_eje_estrategico_ods2.ODSDATA = vw_eje_estrategico_ods2.ODSDATA.data;
        vw_eje_estrategico_ods2.ranges = await BASEAPI.listp("ods_config", {limit: 0, page: 1});
        vw_eje_estrategico_ods2.ranges = vw_eje_estrategico_ods2.ranges.data;


        vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_list = await BASEAPI.listp('vw_eje_estrategico_ods2', {
            limit: 0,
            orderby: "$compania, compania_nombre, eje_estrategico,resultado, odsdif",
            order: "asc",
            where: vw_eje_estrategico_ods2.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_eje_estrategico_ods2.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_eje_estrategico_ods2.companiasel
                }]
        });
        vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_list = vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_list.data;


        vw_eje_estrategico_ods2.companiaeje = [];
        vw_eje_estrategico_ods2.companiaesje = [];
        if (vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_list) {
            for (var item of vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_list) {
                if (!vw_eje_estrategico_ods2.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`]) {
                    vw_eje_estrategico_ods2.companiaeje.push({
                        compania_nombre: item.compania_nombre,
                        eje_estrategico: item.eje_estrategico,
                        metas: item.metas ? DSON.ULALIA(item.metas.split(';;;;')) : "Ninguna",
                        row: item,
                        records: vw_eje_estrategico_ods2.vw_eje_estrategico_ods2_list.filter(e => {
                            return (e.compania_nombre === item.compania_nombre && e.eje_estrategico === item.eje_estrategico)
                        })
                    });
                    vw_eje_estrategico_ods2.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`] = true;
                }

            }
        }
        vw_eje_estrategico_ods2.setPorcentaje();
        animation1.stoploading(`.subcontent`);

        vw_eje_estrategico_ods2.grafico_ods = [...new Set(vw_eje_estrategico_ods2.companiaeje.map(d => {
            return `${d.compania_nombre}____${d.OP}`
        }))];

        vw_eje_estrategico_ods2.grafico_preproduct = [];
        vw_eje_estrategico_ods2.companiaeje.map(d => {
            return d.records
        }).forEach(d => {
            d.forEach(e => {
                vw_eje_estrategico_ods2.grafico_preproduct.push(e)
            })
        });

        vw_eje_estrategico_ods2.grafico_productos = [...new Set(vw_eje_estrategico_ods2.grafico_preproduct.map(d => {
            return `${d.resultado}____${d.compania_nombre}____${d.FP}`
        }))];

        vw_eje_estrategico_ods2.grafico_actividades = [...new Set(vw_eje_estrategico_ods2.grafico_preproduct.map(d => {
            return `${d.odsdif}____${d.resultado}____${d.FA}`
        }))];

        vw_eje_estrategico_ods2.grafico_actividades = vw_eje_estrategico_ods2.grafico_actividades.map(d => {
            let spliter = d.split("____");
            return {nombre: spliter[0], producto: spliter[1], value: parseFloat(spliter[2]) || 0};
        });

        vw_eje_estrategico_ods2.grafico_productos = vw_eje_estrategico_ods2.grafico_productos.map(d => {
            let spliter = d.split("____");
            return {
                nombre: spliter[0],
                ods: spliter[1],
                value: parseFloat(spliter[2]) || 0,
                count: vw_eje_estrategico_ods2.grafico_actividades.filter(d => {
                    return d.producto === spliter[0]
                }).length
            };
        });

        vw_eje_estrategico_ods2.grafico_ods = vw_eje_estrategico_ods2.grafico_ods.map((d, ix) => {
            let spliter = d.split("____");
            return {
                nombre: spliter[0],
                value: parseFloat(spliter[1]) || 0,
                count: vw_eje_estrategico_ods2.grafico_productos.filter(d => {
                    return d.ods === spliter[0]
                }).length
            };
        });

        vw_eje_estrategico_ods2.odsimages = [];
        for (const existe of vw_eje_estrategico_ods2.ODSDATA) {
            if (existe) {
                let files = await FILE.serverp(`ods/odsimage/${existe.id}`, undefined, "notLoad");
                let image = files.filter(e => {
                    return e.original.indexOf(".png") !== -1 || e.original.indexOf(".jpg") !== -1
                })[0];
                if (image)
                    vw_eje_estrategico_ods2.odsimages[`${existe.edt} ${existe.nombre}`] = encodelast(image.url);
            }
        }
        vw_eje_estrategico_ods2.refreshAngular();
    };

    vw_eje_estrategico_ods2.exportXLS = function () {
        var url = $("#vw_eje_estrategico_ods2Table").excelexportjs({
            containerid: "vw_eje_estrategico_ods2Table",
            datatype: 'table',
            worksheetName: `Alineación ODS con Ejes estratégicos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación ODS con Ejes estratégicos", url);
    };

    vw_eje_estrategico_ods2.exportPDF = function () {

        $("#vw_eje_estrategico_ods2Export").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };

    vw_eje_estrategico_ods2.openmodalField = function (value) {

        vw_eje_estrategico_ods2.tipeExport = value.toString();

        vw_eje_estrategico_ods2.modal.modalView("vw_eje_estrategico_ods2/export", {

            width: 'modal-full',
            header: {
                title: `Vista Previa Alineación ODS con Ejes estratégicos`,
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

    vw_eje_estrategico_ods2.setPorcentaje = () => {
        vw_eje_estrategico_ods2.companiaeje.forEach(d => {
            d.records.forEach(e => {
                e.FA = vw_eje_estrategico_ods2.porcentaje(e).a;
            });
            d.records.forEach(e => {
                let yopro = 0;
                let len = 0;
                d.records.forEach(f => {
                    if (f.resultado === e.resultado) {
                        yopro += parseInt(f.FA) || 0;
                        len += 1;
                    }
                });
                e.FP = (yopro * 100) / (len * 100);
            });

        });
        vw_eje_estrategico_ods2.companiaeje.forEach(d => {
            let preto = 0;
            let pretocount = 0;
            let calculed = [];
            vw_eje_estrategico_ods2.companiaeje.forEach(p => {
                if (p.compania_nombre === d.compania_nombre) {
                    p.records.forEach(e => {
                        if (calculed.indexOf(e.resultado) === -1) {
                            calculed.push(e.resultado);
                            preto += parseInt(e.FP) || 0;
                            pretocount++;
                        }
                    });
                }
            });
            d.OPtotal = preto;
            d.cantidad = pretocount;
            d.OP = (preto * 100) / (pretocount * 100);
            d.OP = Number(d.OP).toFixed(2).replace(".00", "");
            d.records.forEach(e => {
                e.FA = Number(e.FA).toFixed(2).replace(".00", "");
                e.FP = Number(e.FP).toFixed(2).replace(".00", "");
            });
        });
    };
    vw_eje_estrategico_ods2.porcentaje = (row) => {
        let props = {
            a: 0,
            p: 0,
            o: 0
        };
        let calc = {
            ae: parseInt(row.actividad_estatus) || 0,
            pe: parseInt(row.producto_estatus) || 0,
            apc: parseInt(row.apoyo_completa) || 0,
            ap: parseInt(row.apoyo_total) || 0,
            ac: parseInt(row.actividades_completa) || 0,
            a: parseInt(row.actividades_total) || 0,
            pc: parseInt(row.productos_completa) || 0,
            p: parseInt(row.productos_total) || 0
        };
        if (calc.ap) {
            if (calc.ae === 1)
                props.a = (calc.apc / calc.ap) * 100;
            else
                props.a = 0;
        } else {
            if (calc.ae === 1)
                props.a = 100;
            else
                props.a = 0;
        }
        if (calc.a) {
            if (calc.pe === 3)
                props.p = (calc.ac / calc.a) * 100;
            else
                props.p = 0;
        } else {
            if (calc.pe === 3)
                props.p = 100;
            else
                props.p = 0;
        }
        props.o = (calc.pc / calc.p) * 100;

        Object.keys(props).forEach(d => {
            props[d] = Number(props[d]).toFixed(2).replace(".00", "");
        });
        return props;
    };
});
