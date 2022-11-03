CRUD_drp_resultado = {};
DSON.keepmerge(CRUD_drp_resultado, CRUDDEFAULTS);
DSON.keepmerge(CRUD_drp_resultado, {
    table: {
        engine: 'my',
        method: 'resultado',
        batch: false,
        columns: {
            id: {
                label: "id",
                sorttype: "numeric",
                class: "text-left",
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead:true
            },
            nombre: {
                label: function() {
                    return "Resultado"
                },
                shorttext: 370
            },
            perspectiva: {
                label: "Perspectiva",
                shorttext: 370
            },
            nombre_estrategia: {
                label: "Estrategia",
                shorttext: 370
            }
        },
        options: [
            {
                text: (data) => { return ''; },
                title: (data) => { return ''; },
                icon: (data) => { return ''; },
                show: (data) => { return true; },
                permission: (data) => { return false; },
                characterist: (data) => { return false; },
                menus:[]
            //     text: (data) => {
            //         return "";
            //     },
            //     title: (data) => {
            //         if (PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.view && PERMISSIONS.mypermission.drp_resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove')+ ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View')+ ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.view && PERMISSIONS.mypermission.drp_resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             return MESSAGE.i('actions.View') + ", " +
            //                 MESSAGE.i('actions.audit');
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             }
            //         } else if (PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.view && PERMISSIONS.mypermission.drp_resultado.allow.remove){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.remove){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.Remove');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.view){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.view && PERMISSIONS.mypermission.drp_resultado.allow.remove){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.View') + ", " +
            //                     MESSAGE.i('actions.Remove') + ", " +
            //                     MESSAGE.i('actions.audit');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.view){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.View');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit && PERMISSIONS.mypermission.drp_resultado.allow.remove){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit') + ", " +
            //                     MESSAGE.i('actions.Remove');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.edit){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Edit');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.view){
            //             return MESSAGE.i('actions.View');
            //         } else if(PERMISSIONS.mypermission.drp_resultado.allow.remove){
            //             if (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar){
            //                 return MESSAGE.i('actions.Remove');
            //             } else {
            //                 return MESSAGE.i('actions.View');
            //             }
            //         }
            //     },
            //     icon: (data) => {
            //         return "cog2";
            //     },
            //     permission: (data) => {
            //         return ['edit', 'remove', 'active', 'view', 'copy'];
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
            //             show: (data) => {
            //                 return (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar);
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
            //             show: (data) => {
            //                 return (data.row.estatus_pei == ENUM_2.pei_estatus.Pendiente_a_autorizar);
            //             },
            //             click: function (data) {
            //                 SWEETALERT.confirm({
            //                     message: MESSAGE.i('alerts.AYSDelete'),
            //                     confirm: function () {
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
            //                             eval(`formatRow.${alter} = '${realValue}';`);
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
            //                                     eval(`row.${key} = '${value}';`);
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
            //         }
            //     ]
            }
        ]
    }
});