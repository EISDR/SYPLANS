app.controller("vw_eje_estrategico_ods3", function ($scope, $http, $compile) {
    vw_eje_estrategico_ods3 = this;
    vw_eje_estrategico_ods3.destroyForm = false;
    var user = new SESSION().current();
    vw_eje_estrategico_ods3.session = user;
    //vw_eje_estrategico_ods3.fixFilters = [];
    //vw_eje_estrategico_ods3.singular = "singular";
    //vw_eje_estrategico_ods3.plural = "plural";
    //vw_eje_estrategico_ods3.headertitle = "Hola Title";
    //vw_eje_estrategico_ods3.destroyForm = false;
    //vw_eje_estrategico_ods3.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_eje_estrategico_ods3", vw_eje_estrategico_ods3, $scope, $http, $compile);
    RUN_B("vw_eje_estrategico_ods3", vw_eje_estrategico_ods3, $scope, $http, $compile);
    vw_eje_estrategico_ods3.colors = COLOR.secundary;
    vw_eje_estrategico_ods3.resumen_pei_list = [];
    vw_eje_estrategico_ods3.tipeExport = '';
    var animation1 = new ANIMATION();

    vw_eje_estrategico_ods3.rowspanme = function (list, field, value) {
        var r = 0;
        r = list.filter(d => {
            if (value != ' ')
                return eval(`d.${field}==value`)
        }).length;
        return r ? r : 1;
    };

    vw_eje_estrategico_ods3.seeme = function (list, field, value, key) {
        if (list[key - 1])
            if (value != ' ')
                return list[key - 1][field] != value;
        return true;
    };
    vw_eje_estrategico_ods3.graficos = {};
    vw_eje_estrategico_ods3.titles = {};
    vw_eje_estrategico_ods3.percents = {};
    vw_eje_estrategico_ods3.currentKey = "";
    vw_eje_estrategico_ods3.sorteorder = "nombre";
    vw_eje_estrategico_ods3.sorteorderOrder = "asc";

    vw_eje_estrategico_ods3.proyecto = (row) => {
        var mes = new Date().getMonth() + 1;
        var monitoreo = row.monitoreo_meta;
        var actual = Math.ceil((mes / (12 / monitoreo)));
        let proyectado = 0;
        let proyectadoPro = 0;
        let alcanzado = 0;
        let alcanzadoPro = 0;
        for (let i = 1; i < actual; i++) {
            proyectado += vw_eje_estrategico_ods3.sumformat(row["mods_meta" + i], row.meta_tipometa);
            alcanzado += vw_eje_estrategico_ods3.sumformat(row["mods_alcanzada" + i], row.meta_tipometa);
            proyectadoPro += vw_eje_estrategico_ods3.sumformat(row["proyecto_meta" + i], row.proyecto_tipometa);
            alcanzadoPro += vw_eje_estrategico_ods3.sumformat(row["proyecto_alcanzada" + i], row.proyecto_tipometa);
        }
        proyectado = vw_eje_estrategico_ods3.lasftFormat(proyectado, row.meta_tipometa, row, actual - 1);
        proyectadoPro = vw_eje_estrategico_ods3.lasftFormat(proyectadoPro, row.proyecto_tipometa, row, actual - 1);
        alcanzado = vw_eje_estrategico_ods3.lasftFormat(alcanzado, row.meta_tipometa, row, actual - 1);
        alcanzadoPro = vw_eje_estrategico_ods3.lasftFormat(alcanzadoPro, row.proyecto_tipometa, row, actual - 1);
        return {
            mp: proyectado,
            ma: alcanzado,
            pp: proyectadoPro,
            pa: alcanzadoPro,
        }
    };

    vw_eje_estrategico_ods3.sumformat = function (valor, tipo_meta) {
    debugger;
        switch (tipo_meta) {
            case 1: {
                return parseInt(valor) || 0;
                break;
            }
            case 2: {
                return parseInt(valor) ? true : false;
                break;
            }
            case 3: {
                return Math.abs(parseInt(valor) || 0) || 0;
                break;
            }
            case 4: {
                return LAN.money(valor).value || 0;
                break;
            }
            case 5: {
                return LAN.money(valor).value || 0;
                break;
            }
            case 6: {
                return parseInt(valor) || 0;
                break;
            }
        }

    };
    vw_eje_estrategico_ods3.lasftFormat = function (valor, tipo_meta, row, count) {

        switch (tipo_meta) {
            case 1: {
                return (parseFloat(valor / count) || 0) + "%";
                break;
            }
            case 2: {
                return valor ? 1 : 0;
                break;
            }
            case 3: {
                return valor || 0;
                break;
            }
            case 4: {
                return LAN.money(valor).format(false) || LAN.money(0).format(false);
                break;
            }
            case 5: {
                return LAN.money(valor).format(true) || LAN.money(0).format(true);
                break;
            }
            case 6: {
                return parseInt(valor) || 0;
                break;
            }
        }

    };

    vw_eje_estrategico_ods3.loadAllThis = (name, data) => {
        setTimeout(() => {
            data.forEach((grafico, ix) => {
                demoKnob(`${name}_${ix}`, grafico.value, grafico.color);
            });
        }, 50);
    };
    vw_eje_estrategico_ods3.sortGrafico = (key, prop, reverse) => {
        vw_eje_estrategico_ods3.graficos[key].sort(GetSortOrder(prop));
        if (reverse)
            vw_eje_estrategico_ods3.graficos[key].sort(GetSortOrder(prop)).reverse();
    };

    vw_eje_estrategico_ods3.modoBarra = async () => {

        vw_eje_estrategico_ods3.titles["B"] = "Vista Global de Cumplimiento de los Objetivos de Desarrollo Sostenible";
        vw_eje_estrategico_ods3.graficos["B"] = vw_eje_estrategico_ods3.grafico_ods.map(d => {
            let color = vw_eje_estrategico_ods3.ranges.filter(e => {
                return d.value >= e.from && d.value <= e.to
            })[0];
            d.color = color ? color.color : "#000";
            d.estatus = color ? color.titulo : "Sin Identificar";
            return d;
        });
        vw_eje_estrategico_ods3.graficos["C"] = {};
        for (const existe of vw_eje_estrategico_ods3.ODSDATA) {
            vw_eje_estrategico_ods3.graficos["C"][`${existe.edt} ${existe.nombre}`] = vw_eje_estrategico_ods3.graficos["B"].filter(d => {
                return d.nombre === `${existe.edt} ${existe.nombre}`
            })[0] || {
                estatus: "Sin Identificar",
                color: "#000",
                nombre: `${existe.edt} ${existe.nombre}`,
                count: 0,
                value: 0
            };
        }

        if (vw_eje_estrategico_ods3.noopenmodals)
            return;
        vw_eje_estrategico_ods3.modal.modalView("vw_eje_estrategico_ods3/barra", {
            header: {
                title: vw_eje_estrategico_ods3.titles["B"],
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

    vw_eje_estrategico_ods3.modoGrafico = async (ods, producto, percent) => {
        vw_eje_estrategico_ods3.selectedods = ods;
        vw_eje_estrategico_ods3.selectedproducto = producto;
        let key = ods && producto ? "A" : ods ? "P" : "O";

        if (key === "P") {
            vw_eje_estrategico_ods3.percents[key] = percent;
            vw_eje_estrategico_ods3.titles[key] = `Objetivos de Desarrollo Sostenible: "${ods}" (${vw_eje_estrategico_ods3.percents[key] || ''}%)`;

            vw_eje_estrategico_ods3.graficos[key] = vw_eje_estrategico_ods3.grafico_productos.filter(d => {
                return d.ods === ods
            }).map(d => {
                let color = vw_eje_estrategico_ods3.ranges.filter(e => {
                    return d.value >= e.from && d.value <= e.to
                })[0];
                d.color = color ? color.color : "#000";
                d.estatus = color ? color.titulo : "Sin Identificar";
                return d;
            });

        } else if (key === "A") {
            vw_eje_estrategico_ods3.percents[key] = percent;
            vw_eje_estrategico_ods3.titles[key] = `Objetivos de Desarrollo Sostenible: "${ods}" (${vw_eje_estrategico_ods3.percents["P"] || 0}%), Proyecto: "${producto}" (${vw_eje_estrategico_ods3.percents[key] || 0}%)`;

            vw_eje_estrategico_ods3.graficos[key] = vw_eje_estrategico_ods3.grafico_actividades.filter(d => {
                return d.producto === producto
            }).map(d => {
                let color = vw_eje_estrategico_ods3.ranges.filter(e => {
                    return d.value >= e.from && d.value <= e.to
                })[0];
                d.color = color ? color.color : "#000";
                d.estatus = color ? color.titulo : "Sin Identificar";
                return d;
            });
        } else {
            vw_eje_estrategico_ods3.titles[key] = "Cumplimiento de los Objetivos de Desarrollo Sostenible";
            vw_eje_estrategico_ods3.graficos[key] = vw_eje_estrategico_ods3.grafico_ods.map(d => {
                let color = vw_eje_estrategico_ods3.ranges.filter(e => {
                    return d.value >= e.from && d.value <= e.to
                })[0];
                d.color = color ? color.color : "#000";
                d.estatus = color ? color.titulo : "Sin Identificar";
                return d;
            });
        }
        if (!ods)
            if (vw_eje_estrategico_ods3.noopenmodals)
                return;

        vw_eje_estrategico_ods3.modal.modalView("vw_eje_estrategico_ods3/grafico_" + key, {
            header: {
                title: vw_eje_estrategico_ods3.titles[key],
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

    vw_eje_estrategico_ods3.verProducto = async (id) => {
        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
        vw_eje_estrategico_ods3.modelName = "proyecto_item";
        vw_eje_estrategico_ods3.usuarpadora = "vw_eje_estrategico_ods3";
        TABLEFORMAT.run(vw_eje_estrategico_ods3);
        let actividad = await BASEAPI.firstp("vw_proyecto_item", {where: [{value: id}]});
        let data = {row: actividad};

        console.log(data);
        data.row.involucrado = "";
        data.row = await directRunMagicManyToMany([data.row], 'involucrado', "involucrados", "proyecto_item", "id", 'nombre_completo', "proyecto_item_involucrado", "involucrado", "id");
        data.row = await directRunMagicManyToMany(data.row, 'ods', "ods", "proyecto_item", "id", 'nombre', "proyecto_item_ods", "ods", "id");
        data.row = await directRunMagicOneToMany(data.row, 'actividades', 'proyecto_item_actividad', 'proyecto_item', 'nombre', 'id');
        data.row = data.row[0];
        console.log(data.row);
        SWEETALERT.stop();
        if (!DSON.oseaX(data.row)) {
            vw_eje_estrategico_ods3.dataForView = data.row;
            vw_eje_estrategico_ods3.modal.modalView("vw_eje_estrategico_ods3/producto", {
                header: {
                    title: "Ver Proyecto Especial",
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
    vw_eje_estrategico_ods3.verActividad = async (id) => {
        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
        vw_eje_estrategico_ods3.modelName = "vw_proyecto_item_actividad";
        vw_eje_estrategico_ods3.usuarpadora = "vw_eje_estrategico_ods3";
        TABLEFORMAT.run(vw_eje_estrategico_ods3);
        let actividad = await BASEAPI.firstp("vw_proyecto_item_actividad", {where: [{value: id}]});
        let data = {row: actividad};
        vw_eje_estrategico_ods3.id = data.row.id;
        // debugger;
        // data.row = await directRunMagicManyToMany([data.row], 'mods', "mods", "proyecto_item", "id", 'nombre', "proyecto_actividad_mods", "mods", "id");
        // data.row = await directRunMagicOneToMany(data.row, 'actividades_apoyo_table', 'proyecto_actividad_apoyo', 'proyecto_actividad', 'nombre', 'id');
        SWEETALERT.stop();
        if (!DSON.oseaX(data.row)) {
            vw_eje_estrategico_ods3.dataForView = data.row;
            vw_eje_estrategico_ods3.modal.modalView("vw_eje_estrategico_ods3/actividad", {
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

    vw_eje_estrategico_ods3.afterInstitucion = function () {
        vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_get();
    };

    vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_get = async function () {
        animation1.loading(`.subcontent`, "", ``, '30');
        vw_eje_estrategico_ods3.ODSDATA = await BASEAPI.listp("ods", {
            limit: 0,
            page: 1,
        });
        vw_eje_estrategico_ods3.ODSDATA = vw_eje_estrategico_ods3.ODSDATA.data;
        vw_eje_estrategico_ods3.ranges = await BASEAPI.listp("ods_config", {limit: 0, page: 1});
        vw_eje_estrategico_ods3.ranges = vw_eje_estrategico_ods3.ranges.data;
        vw_eje_estrategico_ods3.listozo = await BASEAPI.listp('vw_reporte_mods_proyecto', {
            limit: 0,
            orderby: "$compania, ods, meta,indicador_meta, inicador_proyecto",
            order: "asc",
            where: vw_eje_estrategico_ods3.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_eje_estrategico_ods3.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_eje_estrategico_ods3.companiasel
                }]
        });
        vw_eje_estrategico_ods3.listozo = vw_eje_estrategico_ods3.listozo.data;

        vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_list = await BASEAPI.listp('vw_eje_estrategico_ods3', {
            limit: 0,
            orderby: "$compania, compania_nombre, eje_estrategico,resultado, odsdif",
            order: "asc",
            where: vw_eje_estrategico_ods3.institucion !== '[NULL]' ?
                [{
                    field: "compania",
                    value: vw_eje_estrategico_ods3.institucion
                }]
                :
                [{
                    field: "compania_base",
                    value: vw_eje_estrategico_ods3.companiasel
                }]
        });
        vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_list = vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_list.data;


        vw_eje_estrategico_ods3.companiaeje = [];
        vw_eje_estrategico_ods3.companiaesje = [];
        if (vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_list) {
            for (var item of vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_list) {
                if (!vw_eje_estrategico_ods3.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`]) {
                    vw_eje_estrategico_ods3.companiaeje.push({
                        compania_nombre: item.compania_nombre,
                        eje_estrategico: item.eje_estrategico,
                        pnombre: item.pnombre,
                        pid: item.producto_id,
                        metas: item.metas ? DSON.ULALIA(item.metas.split(';;;;')) : "Ninguna",
                        row: item,
                        records: vw_eje_estrategico_ods3.vw_eje_estrategico_ods3_list.filter(e => {
                            return (e.compania_nombre === item.compania_nombre && e.eje_estrategico === item.eje_estrategico)
                        })
                    });
                    vw_eje_estrategico_ods3.companiaesje[`${item.compania_nombre}x${item.eje_estrategico}`] = true;
                }

            }
        }
        vw_eje_estrategico_ods3.setPorcentaje();
        animation1.stoploading(`.subcontent`);

        vw_eje_estrategico_ods3.grafico_ods = [...new Set(vw_eje_estrategico_ods3.companiaeje.map(d => {
            return `${d.compania_nombre}____${d.OP}`
        }))];

        vw_eje_estrategico_ods3.grafico_preproduct = [];
        vw_eje_estrategico_ods3.companiaeje.map(d => {
            return d.records
        }).forEach(d => {
            d.forEach(e => {
                vw_eje_estrategico_ods3.grafico_preproduct.push(e)
            })
        });

        vw_eje_estrategico_ods3.grafico_productos = [...new Set(vw_eje_estrategico_ods3.grafico_preproduct.map(d => {
            return `${d.resultado}____${d.compania_nombre}____${d.FP}`
        }))];

        vw_eje_estrategico_ods3.grafico_actividades = [...new Set(vw_eje_estrategico_ods3.grafico_preproduct.map(d => {
            return `${d.odsdif}____${d.resultado}____${d.FA}`
        }))];

        vw_eje_estrategico_ods3.grafico_actividades = vw_eje_estrategico_ods3.grafico_actividades.map(d => {
            let spliter = d.split("____");
            return {nombre: spliter[0], producto: spliter[1], value: parseFloat(spliter[2]) || 0};
        });

        vw_eje_estrategico_ods3.grafico_productos = vw_eje_estrategico_ods3.grafico_productos.map(d => {
            let spliter = d.split("____");
            return {
                nombre: spliter[0],
                ods: spliter[1],
                value: parseFloat(spliter[2]) || 0,
                count: vw_eje_estrategico_ods3.grafico_actividades.filter(d => {
                    return d.producto === spliter[0]
                }).length
            };
        });

        vw_eje_estrategico_ods3.grafico_ods = vw_eje_estrategico_ods3.grafico_ods.map(d => {
            let spliter = d.split("____");
            return {
                nombre: spliter[0],
                value: parseFloat(spliter[1]) || 0,
                count: vw_eje_estrategico_ods3.grafico_productos.filter(d => {
                    return d.ods === spliter[0]
                }).length
            };
        });

        vw_eje_estrategico_ods3.odsimages = [];
        for (const existe of vw_eje_estrategico_ods3.ODSDATA) {
            if (existe) {
                let files = await FILE.serverp(`ods/odsimage/${existe.id}`, undefined, "notLoad");
                let image = files.filter(e => {
                    return e.original.indexOf(".png") !== -1 || e.original.indexOf(".jpg") !== -1
                })[0];
                if (image)
                    vw_eje_estrategico_ods3.odsimages[`${existe.edt} ${existe.nombre}`] = encodelast(image.url);
            }
        }
        vw_eje_estrategico_ods3.refreshAngular();
    };

    vw_eje_estrategico_ods3.exportXLS = function () {
        var url = $("#vw_eje_estrategico_ods3Table").excelexportjs({
            containerid: "vw_eje_estrategico_ods3Table",
            datatype: 'table',
            worksheetName: `Alineación ODS con Ejes estratégicos.xls`,
            returnUri: true
        });
        DOWNLOAD.excel("Alineación ODS con Ejes estratégicos", url);
    };

    vw_eje_estrategico_ods3.exportPDF = function () {

        $("#vw_eje_estrategico_ods3Export").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    };

    vw_eje_estrategico_ods3.openmodalField = function (value) {

        vw_eje_estrategico_ods3.tipeExport = value.toString();

        vw_eje_estrategico_ods3.modal.modalView("vw_eje_estrategico_ods3/export", {

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

    vw_eje_estrategico_ods3.setPorcentaje = () => {
        vw_eje_estrategico_ods3.companiaeje.forEach(d => {
            d.records.forEach(e => {
                e.FA = vw_eje_estrategico_ods3.porcentaje(e).a;
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
        vw_eje_estrategico_ods3.companiaeje.forEach(d => {
            let preto = 0;
            let pretocount = 0;
            let calculed = [];
            vw_eje_estrategico_ods3.companiaeje.forEach(p => {
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
    vw_eje_estrategico_ods3.porcentaje = (row) => {
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
            if (calc.ae === 6)
                props.a = (calc.apc / calc.ap) * 100;
            else
                props.a = 0;
        } else {
            if (calc.ae === 6)
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
