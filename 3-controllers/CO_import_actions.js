app.controller("import_actions", function ($scope, $http, $compile) {

    BASEAPI.listp('usuario', {
        limit: 0,
        where: [{
            field: 'compania',
            value: new SESSION().current().compania_id
        }]
    }).then(usuarios => {
        import_actions = this;
        import_actions.usuarios = usuarios.data;
        import_actions.session = new SESSION().current();
        if (CONFIG.mysqlactive)
            import_actions.templates = {
                create: "drop table if EXISTS `aaa_@NAME`;create table `aaa_@NAME`(@FIELS);",
                insert: "insert into `aaa_@NAME` VALUES(@VALUES);",
                field: "`@FIELD` TEXT",
                value: "'@VALUE'",
                required: `"@FIELD" es un campo requerido revisar en la hoja "@HOJA" fila "@FILA"`
            };
        else
            import_actions.templates = {
                create: `drop table if EXISTS "aaa_@NAME";create table "aaa_@NAME" (@FIELS);`,
                insert: `insert into "aaa_@NAME" VALUES(@VALUES);`,
                field: `"@FIELD" TEXT`,
                value: `'@VALUE'`,
                required: `"@FIELD" es un campo requerido revisar en la hoja "@HOJA" fila "@FILA"`
            };
        import_actions.executeFile = async (id) => {
            SWEETALERT.loading({message: "Analizando Archivo"});
            let files = await FILE.serverp(`import_actions/import/${id}`, undefined, "notLoad");
            let xlspath = files.filter(e => {
                return e.original.indexOf(".xls") !== -1;
            })[0];
            if (xlspath) {
                SWEETALERT.loading({message: "Verificando Archivo"});
                let sheets = await FILE.xlsjsonp(`files/import_actions/import/${id}/${xlspath.fileName}`, undefined, "notLoad");
                if (sheets) {
                    sheets = sheets.data;
                    if (sheets) {
                        let mapping = sheets.mapping;
                        sheets = sheets.excel;
                        if (sheets) {
                            let sheetsNames = Object.keys(sheets);
                            let createTablesScript = [];
                            let insertScript = [];
                            let tablesRunned = [];
                            let requiredErrors = [];
                            sheetsNames.forEach(d => {
                                let tablename = d;
                                if (tablesRunned.indexOf(tablename) == -1) {
                                    let records = sheets[d];
                                    if (records)
                                        if (records.length) {
                                            let columnsReal = mapping[d];
                                            let columns = columnsReal.map(c => {
                                                return import_actions.templates.field.replaceAll("@FIELD", c);
                                            });
                                            createTablesScript.push(import_actions.templates.create.replaceAll("@NAME", tablename.trim().toLowerCase()).replaceAll("@FIELS", columns.join(", ")));
                                            records.forEach((i, fila) => {
                                                if (i) {
                                                    let values = [];
                                                    columnsReal.forEach(cr => {
                                                        if (cr.indexOf("(*)") !== -1) {
                                                            if (!i[cr]) {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.required.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                return;
                                                            }
                                                        }
                                                        values.push(import_actions.templates.value.replaceAll("@VALUE", (((i[cr] || "") + "") || "").replaceAll("'", "''")));
                                                    });
                                                    insertScript.push(import_actions.templates.insert.replaceAll("@NAME", tablename.trim().toLowerCase()).replaceAll("@VALUES", values.join(", ")));
                                                }
                                            });
                                            tablesRunned.push(tablesRunned);
                                        }
                                }
                            });
                            if (requiredErrors.length === 0) {
                                SERVICE.base_db.directQuery({query: createTablesScript.join('\n')}, (data) => {
                                    SERVICE.base_db.directQuery({query: insertScript.join('\n')}, async (doto) => {
                                        SWEETALERT.stop();
                                        await BASEAPI.updateallp('import_actions', {
                                            "user_id": import_actions.session.id,
                                            "fecha": "$now()",
                                            "mensaje": "Completa",
                                            where: [{
                                                "field": "id",
                                                "value": id
                                            }]
                                        });SWEETALERT.show({
                                            type: 'warning',
                                            message: `Insertando los datos correspondientes`
                                        });
                                        if (CONFIG.mysqlactive)
                                            SERVICE.base_db.directQuery({query: `call importCOmpania(${import_actions.compania})`}, async (doto) => {
                                                SWEETALERT.show({
                                                    type: 'warning',
                                                    message: `Data verificada e insertada`
                                                });
                                            });
                                        else
                                            SERVICE.base_db.directQuery({query: `select ImportCompania(${import_actions.compania})`}, async (doto) => {
                                                SWEETALERT.show({
                                                    type: 'warning',
                                                    message: `Data verificada e insertada`
                                                });
                                            });
                                    });
                                });
                            } else {
                                await BASEAPI.updateallp('import_actions', {
                                    "user_id": import_actions.session.id,
                                    "fecha": "$now()",
                                    "mensaje": requiredErrors.join("</br>"),
                                    where: [{
                                        "field": "id",
                                        "value": id
                                    }]
                                });
                                SWEETALERT.show({type: 'warning', message: `Verificación Completada Con Errores`});
                            }
                        }
                    }
                }
            } else {
                SWEETALERT.stop();
                SWEETALERT.show({type: 'warning', message: `Debe subir un archivo para ejecutarlo`});
                return;
            }
        };
        //import_actions.fixFilters = [];
        //import_actions.singular = "singular";
        //import_actions.plural = "plural";
        //import_actions.headertitle = "Hola Title";
        //import_actions.destroyForm = false;
        //import_actions.permissionTable = "tabletopermission";
        RUNCONTROLLER("import_actions", import_actions, $scope, $http, $compile);
        import_actions.formulary = function (data, mode, defaultData) {
            if (import_actions !== undefined) {
                RUN_B("import_actions", import_actions, $scope, $http, $compile);
                import_actions.form.modalWidth = ENUM.modal.width.full;
                import_actions.form.readonly = {};
                import_actions.createForm(data, mode, defaultData);
                $scope.$watch("import_actions.user_id", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(import_actions, 'user_id', rules);
                });
                $scope.$watch("import_actions.compania", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(import_actions, 'compania', rules);
                });
                $scope.$watch("import_actions.description", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(import_actions, 'description', rules);
                });
            }
        };
        // $scope.triggers.table.after.load = async function (records) {
        //
        // };
        // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // $scope.triggers.table.after.open = function (data) {
        //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
        // };
        // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // $scope.triggers.table.after.close = function (data) {
        //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        // };
        // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // $scope.triggers.table.after.insert = function (data) {
        //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
        //     return true;
        // };
        // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // $scope.triggers.table.after.update = function (data) {
        //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        // };
        // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
        //     resolve(true);
        // });
        //
        // $scope.triggers.table.after.control = function (data) {
        //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        // };
        // $scope.triggers.table.before.control = function (data) {
        //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
        // };
        //$scope.beforeDelete = function (data) {
        //    return false;
        //};
        //$scope.afterDelete = function (data) {
        //};
        RUNTABLE('import_actions');
    });
});
