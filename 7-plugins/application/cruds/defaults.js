CRUDDEFAULTS = {
    table: {
        isStorage: false,
        rowStyle: function (row, $scope) {
            return "";
        },
        rowClass: function (row, $scope) {
            return $scope.activeSET(row) === false ? "bg-" + COLOR.danger + "-300" : "";
        },
        responsive: {
            "_7": "hidden",
            "_5": "visible-md visible-lg",
            "_3": "visible-sm visible-md visible-lg",
            "_1": "visible-xs visible-sm visible-md visible-lg"
        },
        report: false,
        width: "",
        offWidth: 5,
        baseWidth: 1000,
        columnsalign: "center",
        limits: [10, 20, 50],
        activeColumn: "active",
        key: 'id',
        deletekeys: ['id'],
        engine: 'ms',
        batch: true,
        persist: true,
        sortable: true,
        dragrow: false,
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: true,
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
            audit: true
        },
        options: [

            {
                text: (data) => {
                    return "";
                },
                title: (data) => {
                    if (typeof eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`) != "undefined"){
                        if (eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.audit){
                            return MESSAGE.i('actions.Remove') + ", " +
                                MESSAGE.i('actions.audit');
                        }  else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view){
                            return MESSAGE.i('actions.Edit') + ", " +
                                MESSAGE.i('actions.View');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view && eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.View') + ", " +
                                MESSAGE.i('actions.Remove');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.edit){
                            return MESSAGE.i('actions.Edit');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.view){
                            return MESSAGE.i('actions.View');
                        } else if(eval(`PERMISSIONS.mypermission.${data.$scope.modelName}`).allow.remove){
                            return MESSAGE.i('actions.Remove');
                        }
                    } else {
                        return MESSAGE.i('actions.Edit') + ", " +
                            MESSAGE.i('actions.View') + ", " +
                            MESSAGE.i('actions.Remove')+ ", " +
                            MESSAGE.i('actions.audit');
                    }
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active', 'view', 'copy', 'audit', 'extra'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Edit');
                        },
                        icon: (data) => {
                            return "pencil5";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.formulary({
                                where: [{
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                                        icon: "user"
                                    },
                                    footer: {
                                        cancelButton: true
                                    },
                                    content: {
                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                        sameController: true
                                    },
                                });
                            }
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Remove');
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        }
                    },
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('actions.Enable');
                    //     },
                    //     icon: (data) => {
                    //         return "checkmark-circle";
                    //     },
                    //     permission: (data) => {
                    //         return 'active';
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     click: function (data) {
                    //         SWEETALERT.confirm({
                    //             message: MESSAGE.i('alerts.AYSEnable'),
                    //             confirm: function () {
                    //                 SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    //                 data.$scope.activeRow(data.row, 1).then(function () {
                    //                     SWEETALERT.stop();
                    //                 });
                    //             }
                    //         });
                    //         return false;
                    //     },
                    //     show: function (data) {
                    //         return data.$scope.activeColumn();
                    //     }
                    // },
                    // {
                    //     text: (data) => {
                    //         return MESSAGE.i('actions.Disable');
                    //     },
                    //     icon: (data) => {
                    //         return "circle";
                    //     },
                    //     permission: (data) => {
                    //         return 'active';
                    //     },
                    //     characterist: (data) => {
                    //         return "";
                    //     },
                    //     click: function (data) {
                    //         SWEETALERT.confirm({
                    //             message: MESSAGE.i('alerts.AYSDisable'),
                    //             confirm: function () {
                    //                 SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    //                 data.$scope.activeRow(data.row, 0).then(function () {
                    //                     SWEETALERT.stop();
                    //                 });
                    //             }
                    //         });
                    //         return false;
                    //     },
                    //     show: function (data) {
                    //         return data.$scope.activeColumn();
                    //     }
                    // },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Copy');
                        },
                        icon: (data) => {
                            return "copy3";
                        },
                        permission: (data) => {
                            return 'copy';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {

                            var formatRow = {};

                            for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                                var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                                var key = i;
                                var alter = column.exportKey !== undefined ? column.exportKey : i;
                                if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                                    var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
                                    exampleText = exampleText === undefined ? "[string]" : exampleText;
                                    var realValue = eval(`data.row.${key};`);
                                    if (!DSON.oseaX(realValue)) {
                                        if (column.link !== undefined) {
                                            realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                                        }
                                        eval(`formatRow.${alter} = '${realValue}';`);
                                    }
                                }
                            }
                            SWEETALERT.confirm({
                                title: MESSAGE.i('actions.CopyRecords'),
                                message: MESSAGE.i('alerts.Copy'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                                    var records = [formatRow];
                                    var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
                                    var inserts = [];
                                    for (var i in records) {
                                        var record = records[i];
                                        var row = {};
                                        for (var i in record) {
                                            var key = i;
                                            var value = record[i];
                                            for (var c in columns) {
                                                var column = false;
                                                if (c === key || key === columns[c].exportKey)
                                                    column = columns[c];
                                                if (column === false) continue;
                                                eval(`row.${key} = '${value}';`);
                                                break;
                                            }
                                        }
                                        inserts.push({row: row, relations: []});
                                    }
                                    data.$scope.importing(inserts);
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        title: (data) => {
                            return MESSAGE.i('actions.audit');
                        },
                        permission: (data) => {
                            return 'audit';
                        },
                        icon: (data) => {
                            return "stack-text";
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/audit", data.$scope.modelName), {
                                    header: {
                                        title: MESSAGE.i('mono.auditof') + " " + data.$scope.plural,
                                        icon: "user"
                                    },
                                    footer: {
                                        cancelButton: true
                                    },
                                    content: {
                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                        sameController: true
                                    },
                                });
                            }
                        }
                    }
                ]
            },
            // {
            //     text: (data) => {
            //         return "";
            //     },
            //     title: (data) => {
            //         return MESSAGE.i('mono.Exportas');
            //     },
            //     icon: (data) => {
            //         return "file-download2";
            //     },
            //     permission: (data) => {
            //         return ['export.Clipboard', 'export.PDF', 'export.CSV', 'export.XLS', 'export.DOC'];
            //     },
            //     characterist: (data) => {
            //         return '';
            //     },
            //     menus: [
            //         {
            //             text: (data) => {
            //                 return MESSAGE.i('actions.Clipboard');
            //             },
            //             icon: (data) => {
            //                 return "copy3";
            //             },
            //             permission: (data) => {
            //                 return 'export.Clipboard';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 data.$scope.unCheckAll();
            //                 data.row.selected = true;
            //                 data.$scope.export.go('Clipboard', true);
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return "PDF";
            //             },
            //             icon: (data) => {
            //                 return "file-pdf";
            //             },
            //             permission: (data) => {
            //                 return 'export.PDF';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 data.$scope.unCheckAll();
            //                 data.row.selected = true;
            //                 data.$scope.export.go('PDF', true);
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return "CSV";
            //             },
            //             icon: (data) => {
            //                 return "libreoffice";
            //             },
            //             permission: (data) => {
            //                 return 'export.CSV';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 data.$scope.unCheckAll();
            //                 data.row.selected = true;
            //                 data.$scope.export.go('CSV', true);
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return ENUM.file.formats.XLS;
            //             },
            //             icon: (data) => {
            //                 return "file-excel";
            //             },
            //             permission: (data) => {
            //                 return 'export.XLS';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 data.$scope.unCheckAll();
            //                 data.row.selected = true;
            //                 data.$scope.export.go('XLS', true);
            //                 return false;
            //             }
            //         },
            //         {
            //             text: (data) => {
            //                 return "DOCX";
            //             },
            //             icon: (data) => {
            //                 return "file-word";
            //             },
            //             permission: (data) => {
            //                 return 'export.DOC';
            //             },
            //             characterist: (data) => {
            //                 return "";
            //             },
            //             click: function (data) {
            //                 data.$scope.unCheckAll();
            //                 data.row.selected = true;
            //                 data.$scope.export.go('DOC', true);
            //                 return false;
            //             }
            //         }
            //     ]
            // },

        ]
    }
};