CRUD_drp_estrategia = {};
DSON.keepmerge(CRUD_drp_estrategia, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_estrategia, {
    table: {
        engine: 'my',
        method: 'estrategia',
        batch:false,
        columns: {
            id: {
                label: "id",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            nombre: {
                label: "Nombre",
                shorttext: 370
            },
        },
        options: [{
            text: (data) => { return ''; },
            title: (data) => { return ''; },
            icon: (data) => { return ''; },
            show: (data) => { return true; },
            permission: (data) => { return false; },
            characterist: (data) => { return false; },
            menus:[]
            // {
            //     text: (data) => {
            //         return "";
            //     },
            //     title: (data) => {
            //         if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined"){
            //             if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //                 return MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }  else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.Remove');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit){
            //                 return MESSAGE.i('actions.Edit');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view){
            //                 return MESSAGE.i('actions.View');
            //             } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
            //                 return MESSAGE.i('actions.Remove');
            //             }
            //         } else {
            //             return MESSAGE.i('actions.Edit') + ", " +
            //                 MESSAGE.i('actions.View') + ", " +
            //                 MESSAGE.i('actions.Remove')+ ", " +
            //                 MESSAGE.i('actions.audit');
            //         }
            //     },
            //     icon: (data) => {
            //         return "cog2";
            //     },
            //     show: (data) => {
            //         return true;
            //     },
            //     permission: (data) => {
            //         return ['edit', 'remove', 'active', 'view', 'copy', 'audit'];
            //     },
            //     characterist: (data) => {
            //         return '';
            //     },
            //     menus: [
            //         {
            //             text: (data) => {
            //                 return MESSAGE.i('actions.Edit');
            //             },
            //             icon: (data) => {
            //                 return "pencil5";
            //             },
            //             permission: (data) => {
            //                 return 'edit';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             show: function (data) {
            //                 return true;
            //             },
            //             click: function (data) {
            //                 data.$scope.formulary({
            //                     where: [{
            //                         field: eval(`CRUD_${data.$scope.modelName}`).table.key,
            //                         value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
            //                     }]
            //                 }, FORM.modes.edit, {});
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return MESSAGE.i('actions.View');
            //             },
            //             icon: (data) => {
            //                 return "eye";
            //             },
            //             permission: (data) => {
            //                 return 'view';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 if (!DSON.oseaX(data.row)) {
            //                     data.$scope.dataForView = data.row;
            //                     data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
            //                         header: {
            //                             title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
            //                             icon: "user"
            //                         },
            //                         footer: {
            //                             cancelButton: true
            //                         },
            //                         content: {
            //                             loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
            //                             sameController: true
            //                         },
            //                     });
            //                 }
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return MESSAGE.i('actions.Remove');
            //             },
            //             icon: (data) => {
            //                 return "trash";
            //             },
            //             permission: (data) => {
            //                 return 'remove';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 SWEETALERT.confirm({
            //                     message: MESSAGE.i('alerts.AYSDelete'),
            //                     confirm: async function () {
            //                         SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
            //                         data.$scope.deleteRow(data.row).then(function () {
            //                             SWEETALERT.stop();
            //                         });
            //                     }
            //                 });
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return MESSAGE.i('actions.Copy');
            //             },
            //             icon: (data) => {
            //                 return "copy3";
            //             },
            //             permission: (data) => {
            //                 return 'copy';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //
            //                 var formatRow = {};
            //
            //                 for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
            //                     var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
            //                     var key = i;
            //                     var alter = column.exportKey !== undefined ? column.exportKey : i;
            //                     if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
            //                         var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
            //                         exampleText = exampleText === undefined ? "[string]" : exampleText;
            //                         var realValue = eval(`data.row.${key};`);
            //                         if (!DSON.oseaX(realValue)) {
            //                             if (column.link !== undefined) {
            //                                 realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
            //                             }
            //                             if (column.formattype === "datetime") {
            //                                 realValue = moment(realValue).format(DSON.UNIVERSALTIME);
            //                             }
            //                             if (column.formattype === "date") {
            //                                 realValue = moment(realValue).format(DSON.UNIVERSAL);
            //                             }
            //                             eval(`formatRow.${alter} = \`${realValue}\`;`);
            //                         }
            //                     }
            //                 }
            //                 SWEETALERT.confirm({
            //                     title: MESSAGE.i('actions.CopyRecords'),
            //                     message: MESSAGE.i('alerts.Copy'),
            //                     confirm: function () {
            //                         SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
            //                         var records = [formatRow];
            //                         var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
            //                         var inserts = [];
            //                         for (var i in records) {
            //                             var record = records[i];
            //                             var row = {};
            //                             for (var i in record) {
            //                                 var key = i;
            //                                 var value = record[i];
            //                                 for (var c in columns) {
            //                                     var column = false;
            //                                     if (c === key || key === columns[c].exportKey)
            //                                         column = columns[c];
            //                                     if (column === false) continue;
            //                                     eval(`row.${key} = \`${value}\`;`);
            //                                     break;
            //                                 }
            //                             }
            //                             inserts.push({row: row, relations: []});
            //                         }
            //                         data.$scope.importing(inserts);
            //                     }
            //                 });
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return MESSAGE.i('actions.audit');
            //             },
            //             title: (data) => {
            //                 return MESSAGE.i('actions.audit');
            //             },
            //             permission: (data) => {
            //                 return 'audit';
            //             },
            //             icon: (data) => {
            //                 return "stack-text";
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 if (!DSON.oseaX(data.row)) {
            //                     data.$scope.dataForView = data.row;
            //                     data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
            //                         header: {
            //                             title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
            //                             icon: "user"
            //                         },
            //                         footer: {
            //                             cancelButton: true
            //                         },
            //                         content: {
            //                             loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
            //                             sameController: true
            //                         },
            //                     });
            //                 }
            //             }
            //         },
            //     ]
            // },
            // {
            //     text: (data) => {
            //         return "Ver FODA";
            //     },
            //     title: (data) => {
            //         return "Ver FODA";
            //     },
            //     icon: (data) => {
            //         return "puzzle3";
            //     },
            //     characterist: (data) => {
            //         return "";
            //     },
            //     show: function (data) {
            //         return (data.row.foda == 'si');
            //     },
            //     permission: (data) => {
            //         return ["foda"];
            //     },
            //     click: async function (data) {
            //         await data.$scope.relateditems(data.row.id);
            //         data.$scope.modal.modalView("drp_estrategia/vFodaxEstrategia", {
            //             width: 'modal-full',
            //             header: {
            //                 title: "Lista de FODA",
            //                 icon: "puzzle3"
            //             },
            //             footer: {
            //                 cancelButton: true
            //             },
            //             content: {
            //                 loadingContentText: MESSAGE.i('actions.Loading'),
            //                 sameController: true
            //             },
            //         });
            //         // dashboard.modal.modalView("productos_poa", {
            //         //     width: 'modal-full',
            //         //     header: {
            //         //         title: "Productos "+ dashboard.Mproductos,
            //         //         icon: "archive"
            //         //     },
            //         //     footer: {
            //         //         cancelButton: false
            //         //     },
            //         //     content: {
            //         //         loadingContentText: MESSAGE.i('actions.Loading'),
            //         //         sameController: 'productos_poa',
            //         //     },
            //         // });
            //         return false;
            //     }
            // },
            // {
            //     text: (data) => {
            //         return "Ver PESTA";
            //     },
            //     title: (data) => {
            //         return "Ver PESTA";
            //     },
            //     icon: (data) => {
            //         return "briefcase";
            //     },
            //     characterist: (data) => {
            //         return "";
            //     },
            //     permission: (data) => {
            //         return ["pesta"];
            //     },
            //     show: function (data) {
            //         return (data.row.pesta == 'si');
            //     },
            //     click: async function (data) {
            //         await data.$scope.relateditems(data.row.id);
            //         data.$scope.modal.modalView("drp_estrategia/vpestaxEstrategia", {
            //             width: 'modal-full',
            //             header: {
            //                 title: "Lista de PESTA",
            //                 icon: "briefcase"
            //             },
            //             footer: {
            //                 cancelButton: true
            //             },
            //             content: {
            //                 loadingContentText: MESSAGE.i('actions.Loading'),
            //                 sameController: true
            //             },
            //         });
            //         return false;
            //     }
            }
        ]
    }
});