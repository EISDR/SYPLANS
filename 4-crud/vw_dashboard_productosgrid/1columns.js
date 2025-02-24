CRUD_vw_dashboard_productosgrid = {};
DSON.keepmerge(CRUD_vw_dashboard_productosgrid, CRUDDEFAULTS);
DSON.keepmerge(CRUD_vw_dashboard_productosgrid, {
    table: {
        engine: 'ms',
        report: true,
        view: 'vw_dashboard_productosgrid',
        method: "indicador_poa",
        batch: false,
        width: "500px",
        sortable: false,
        allow: {
            add: false,
            edit: false,
            view: false,
            remove: false,
            active: false,
            filter: true,
            import: false,
            copy: false,
            clone: false,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: false,
        },
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                dead: true
            },
            direccion_meta: {
                exportExample: false,
                visible: false,
                dead: true
            },
            producto: {
            },
            indicador: {
            },
            flecha: {
                anonymous: true,
                format: function (row) {
                    if (row.cumplidor)
                        if (row.cumplidor.general)
                            if (row.cumplidor.general[0])
                                if (row.cumplidor.general[0].direccionMeta)
                                    if (row.cumplidor.general[0].direccionMeta[0])
                                        if (row.cumplidor.general[0].direccionMeta[0].nombre)
                                            if (row.cumplidor.general[0].direccionMeta[0].nombre)
                                                return row.cumplidor.general[0].direccionMeta[0].nombre;
                }
            },
            acumulado: {
                format: function (row) {
                    if (row.cumplidor)
                        if (row.cumplidor.general)
                            if (row.cumplidor.general[0])
                                if (row.cumplidor.general[0].sumas)
                                    if (row.cumplidor.general[0].sumas.formatedSumMeta)
                                        return row.cumplidor.general[0].sumas.formatedSumMeta;
                },
                sorttype: "numeric",
                // formattype: ENUM.FORMAT.numeric
            },
            alcanzado: {
                sorttype: "numeric",
                format: function (row) {
                    if (row.cumplidor)
                        if (row.cumplidor.general)
                            if (row.cumplidor.general[0])
                                if (row.cumplidor.general[0].sumas)
                                    if (row.cumplidor.general[0].sumas.formatedSumAlcanzada)
                                        return row.cumplidor.general[0].sumas.formatedSumAlcanzada;
                },
                // formattype: ENUM.FORMAT.numeric
            },
            cumplimiento: {
                format: function (row) {
                    let ponderacion = "";
                    let clase = "";
                    if (row.cumplidor)
                        if (row.cumplidor.ponderacion)
                            if (row.cumplidor.ponderacion.titulo) {
                                ponderacion = row.cumplidor.ponderacion.titulo;
                                clase = `text_${row.cumplidor.ponderacion.id}`;
                            }
                    return `<span class="${clase}" title="${ponderacion}">${row.cumplidor.cumplimiento}%</span>`;
                },
                sortable: false
            },
            detalle: {
                format: function (row) {
                    return `<a class="ng-binding" title="Ver Detalle" data-action="Ver">
			<i class="icon-eye "></i>
		</a>`
                },
                click: function (data) {
                    if (data.row.cumplidor)
                        if (data.row.cumplidor.ficha) {
                            data.$scope.FICHA = data.row.cumplidor.ficha.FICHA;
                            data.$scope.modal.modalView("aacontroldemando/fichaindicador", {
                                header: {
                                    title: data.row.indicador,
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`
                                },
                            });
                        }
                }
            }
        },
    }
});
