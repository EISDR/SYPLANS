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
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            poa: {
                label: "Poa",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre: {
                label: function(){ return "Departamento"},
                shorttext: 370
            },
            asignado: {
                label: "Presupuesto Asignado",
                formattype: "money",
                exportExample: "[money]",
            },
            por_asignar: {
                label: "Presupuesto por Asignar",
                formattype: "money",
                exportExample: "[money]",
            },
            estatus: {
                label: "Estatus",
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