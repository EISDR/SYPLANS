CRUD_mis_actividades_apoyo = {};
DSON.keepmerge(CRUD_mis_actividades_apoyo, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mis_actividades_apoyo, {
    table: {
        engine: 'my',
        view:"actividades_apoyo",
        method:"actividades_apoyo",
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false,
                visible: false,
                visibleDetail: false,
                dead: true
            },
            nombre: {
                label: function () {
                    return "Actividad Apoyo";
                },
                shorttext: 370
            },
            descripcion: {
                label: "Descripción",
                shorttext: 370
            },
            departamento_nombre: {
                label: "Dpto.Solicitante",
                format: {
                    table: "departamento",
                    from: "departamento",
                    modal: {
                        header: {
                            title: MESSAGE.i(`planificacion.nombre`, 'nombre'),
                            // icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.loading')
                        }
                    }
                }
            },
            usuario_nombre: {
                label: "Solicitante",
                shorttext: 370,
                format: function (row){
                    if(row.usuario_nombre && row.usuario_apellido){
                        return row.usuario_nombre + " " + row.usuario_apellido;
                    }else
                        return '';

                }
            },
            vw_usuario_nombre: {
                label: "Responsable",
                shorttext: 370,
                format: function (row){
                    return row.vw_usuario_nombre + " " + row.vw_usuario_nombre;
                }
            },
            fecha_inicio: {
                label: "Fecha Inicio",
                sorttype: "date",
                formattype: "date",
            },
            fecha_fin: {
                label: "Fecha Fin",
                sorttype: "date",
                formattype: "date",
            },
            created_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                sorttype: "datetime",
                formattype:"datetime"
            },
            updated_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                sorttype: "datetime",
                formattype:"datetime"
            },
            deleted_at: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            created_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            updated_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            deleted_by: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            }
        },
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: true,
            copy: true,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
        },
    }
});