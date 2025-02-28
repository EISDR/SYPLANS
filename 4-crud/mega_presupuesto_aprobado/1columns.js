CRUD_mega_presupuesto_aprobado = {};
DSON.keepmerge(CRUD_mega_presupuesto_aprobado, CRUDDEFAULTS);
DSON.keepmerge(CRUD_mega_presupuesto_aprobado, {
    table: {
        engine: 'my',
        view:'vw_mega_presupuesto_aprobado',
        sort: "id",
        order: "desc",
        columns: {
            id: {
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            poa: {
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre: {
                shorttext: 370
            },
            asignado: {
                formattype: "money",
                exportExample: "[money]",
            },
            por_asignar: {
                formattype: "money",
                exportExample: "[money]",
            },
            estatus: {
                shorttext: 370
            }
        },
        options: [
            {
                text: (data) => {
                    //
                    return "";
                },
                title: (data) => {
                    return "";
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['work'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return MESSAGE.i('planificacion.work');
                        },
                        icon: (data) => {
                            return "hammer-wrench";
                        },
                        permission: (data) => {
                            return 'work';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            mega_presupuesto_aprobado.open_modal(data.row.departamento_id,data.row.id_estatus,data.row.id);
                            return false;
                        },
                    }
                ]
            }
        ],
    }
});