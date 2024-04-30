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
        import_actions.check_date = function (date){
            // Intentar analizar la fecha con los formatos especificados
            const fechaParseada = moment(date, ['M-D-YYYY', 'MM-DD-YYYY', 'M/D/YYYY', "MM/DD/YYYY"]);

            // Comprueba si la fecha analizada es válida en al menos uno de los formatos
            return !!fechaParseada.isValid();
        }

        if (CONFIG.mysqlactive)
            import_actions.templates = {
                create: "drop table if EXISTS `aaa_@NAME`;create table `aaa_@NAME`(@FIELS);",
                insert: "insert into `aaa_@NAME` VALUES(@VALUES);",
                field: "`@FIELD` TEXT",
                value: "'@VALUE'",
                required: `"@FIELD" es un campo requerido por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_date: `El formato de fecha del campo "@FIELD" está erroneo, este debe de ser "mes-día-año (MM-DD-YYYY)" por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_number: `El campo "@FIELD" debe de ser un valor numérico por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_money: `El campo "@FIELD" es un campo tipo dinero debe ser un monto valido en el formato correcto (Ej. 100.50) revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_bool: `El campo "@FIELD" es un campo tipo booleano seleccione una opción válida. Este campo debe ser marcado como 'Sí' o 'No' por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_relation: `El campo "@FIELD" es un campo tipo relación y el contenido no existe en la tabla padre. Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_porcentaje: `El campo "@FIELD" no cumple con el tipo de meta "Porcentaje" este debe ser un valor entre 0 y 100 sin puntos decimales (Ej. 70). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_indice: `El campo "@FIELD" no cumple con el tipo de meta "Indice" el valor de este debe ser 0 o 1. Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_valor_absoluto: `El campo "@FIELD" no cumple con el tipo de meta "Valor absoluto" este debe ser un valor entero positivo (Ej. 300). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_decimal: `El campo "@FIELD" no cumple con el tipo de meta "Decimal" este debe ser un valor positivo con dos puntos decimales (Ej. 350.50). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_dinero: `El campo "@FIELD" no cumple con el tipo de meta "Dinero" este debe ser un valor positivo con dos puntos decimales (Ej. 10,450.96). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_entero: `El campo "@FIELD" no cumple con el tipo de meta "Entero" este no puede ser un valor menor a cero, no debe separadores ni tener puntos decimales (Ej. 1000). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`
            };
        else
            import_actions.templates = {
                create: `drop table if EXISTS "aaa_@NAME";create table "aaa_@NAME" (@FIELS);`,
                insert: `insert into "aaa_@NAME" VALUES(@VALUES);`,
                field: `"@FIELD" TEXT`,
                value: `'@VALUE'`,
                required: `"@FIELD" es un campo requerido por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_date: `El formato de fecha del campo "@FIELD" está erroneo, este debe de ser "mes-día-año (MM-DD-YYYY)" por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_number: `El campo "@FIELD" debe de ser un valor numérico por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_money: `El campo "@FIELD" es un campo tipo dinero debe ser un monto valido en el formato correcto (Ej. 100.50) revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_bool: `El campo "@FIELD" es un campo tipo booleano seleccione una opción válida. Este campo debe ser marcado como 'Sí' o 'No' por favor revisar en la hoja "@HOJA" fila "@FILA"`,
                valid_relation: `El campo "@FIELD" es un campo tipo relación y el contenido no existe en la tabla padre. Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_porcentaje: `El campo "@FIELD" no cumple con el tipo de meta "Porcentaje" este debe ser un valor entre 0 y 100 (Ej. 70). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_indice: `El campo "@FIELD" no cumple con el tipo de meta "Indice" el valor de este debe ser 0 o 1. Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_valor_absoluto: `El campo "@FIELD" no cumple con el tipo de meta "Valor absoluto" este debe ser un valor entero positivo (Ej. 300). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_decimal: `El campo "@FIELD" no cumple con el tipo de meta "Decimal" este debe ser un valor positivo con dos puntos decimales (Ej. 350.50). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_dinero: `El campo "@FIELD" no cumple con el tipo de meta "Dinero" este debe ser un valor positivo con dos puntos decimales (Ej. 10,450.96). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`,
                meta_entero: `El campo "@FIELD" no cumple con el tipo de meta "Entero" este no puede ser un valor menor a cero, no debe separadores ni tener puntos decimales (Ej. 1000). Por favor revisar y corregir el contenido en la hoja "@HOJA" fila "@FILA"`
            };
        import_actions.executeFile = async (id) => {
            SWEETALERT.loading({message: "Analizando Archivo"});
            let files = await FILE.serverp(`import_actions/import/${id}`, undefined, "notLoad");
            let xlspath = files.filter(e => {
                return e.original.indexOf(".xls") !== -1;
            })[0];
            if (xlspath) {
                let diccionario ={
                    "Cargo (*) (r)": {sheet: "Cargos", column:"Cargo (*)"},
                    "Valor (*) (r)": {sheet: "PEI - Valores", column:"Valor (*)"},
                    "Grupo de Interés (*) (r)": {sheet: "PEI - Grupo de Interés", column:"Grupo de Interés (*)"},
                    "Compromiso Institucional (*) (r)": {sheet: "PEI - Compromiso Institucional", column:"Compromiso Institucional (*)"},
                    "Estrategia nacional de desarrollo (*) (r)": {sheet: "PEI - Est. Nac. de Desarrollo", column:"Estrategia nacional de desarrollo (*)"},
                    "Objetivo de desarrollo sostenible (*) (r)": {sheet: "PEI - Obj. Des. Sostenible", column:"Objetivo de desarrollo sostenible (*)"},
                    "Objetivo de Desarrollo Sostenible (*) (r)": {sheet: "PEI - Obj. Des. Sostenible", column:"Objetivo de desarrollo sostenible (*)"},
                    "Plan nacional plurianual de desarrollo sostenible (*) (r)": {sheet: "PEI-Plan Nac.Plurianual Séc.Púb", column:"Plan Nacional Plurianual del Séctor Público (*)"},
                    "Plan Nacional Plurianual del Séctor Público (*) (r)": {sheet: "PEI-Plan Nac.Plurianual Séc.Púb", column:"Plan Nacional Plurianual del Séctor Público (*)"},
                    "Eje Estratégico (*) (r)": {sheet: "PEI - Eje estratégico", column:"Eje estratégico (*)"},
                    "Eje estratégico (*) (r)": {sheet: "PEI - Eje estratégico", column:"Eje estratégico (*)"},
                    "Objetivo General (*) (r)": {sheet: "PEI - Obj Generales END", column:"Objetivos Generales (*)"},
                    "Objetivo General END (*) (r)": {sheet: "PEI - Obj Generales END", column:"Objetivos Generales (*)"},
                    "Objetivo estratégico (*) (r)": {sheet: "PEI - Objetivo estratégico", column:"Objetivo estratégico (*)"},
                    "Objetivo Específico (*) (r)": {sheet: "PEI - Obj Específicos END", column:"Objetivo Específico (*)"},
                    "Objetivo Especifico END (*) (r)": {sheet: "PEI - Obj Específicos END", column:"Objetivo Específico (*)"},
                    "Estrategia (*) (r)": {sheet: "PEI - Estrategia", column:"Estrategia (*)"},
                    "Perspectiva (*) (r)": {sheet: "PEI - Perspectiva BSC", column:"Perspectiva (*)"},
                    "Linea de Acción (*) (r)": {sheet: "PEI - Líneas de Acción END", column:"Línea de Acción (*)"},
                    "Metas Objetivo de Desarrollo Sostenible (*) (r)": {sheet: "PEI - Metas ODS", column:"Metas Objetivo de desarrollo sostenible (*)"},
                    "Resultado Esperado (*) (r)": {sheet: "PEI - Resultado Esperado", column:"Resultado Esperado (*)"},
                    "Indicadores PEI (*) (r)": {sheet: "PEI - Indicadores", column:"Inidicador (*)"},
                    "PEI (*) (r)": {sheet: "PEI", column:"PEI (*)"},
                    "Involucrado (*) (r)": {sheet: "POA - Involucrados", column:"Involucrado (*)"},
                    "Indicadores Productos (*) (r)": {sheet: "POA - Indicadores Productos", column:"Inidicador (*)"},
                    "Actividad (*) (r)": {sheet: "POA - Actividades", column:"Actividad (*)"},
                    "Indicadores Actividades (*) (r)": {sheet: "POA - Indicadores Actividades", column:"Inidicador (*)"},
                    "Características Indicador (*) (r)": {sheet: "Característica Indicador", column:"Caracteristica Indicador (*)"},
                    "Departamento (*) (r)": {sheet: "Departamentos", column:"Departamento (*)"},
                    "Departamento solicitado (*) (r)": {sheet: "Departamentos", column:"Departamento (*)"},
                    "Responsable (*) (r)": {sheet: "Usuarios", column:"Nombre (*)"},
                    "Producto (*) (r)": {sheet: "POA - Productos", column:"Producto (*)"},
                    "Resultado esperado (*) (r)":{sheet: "PEI - Resultado Esperado", column:"Resultado Esperado (*)"},
                };
                SWEETALERT.loading({message: "Verificando Archivo"});
                let sheets = await FILE.xlsjsonp(`files/import_actions/import/${id}/${xlspath.fileName}`, undefined, "notLoad");
                import_actions.sheets = sheets;
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
                                    records = records.filter(Boolean)
                                    records.forEach(object => {
                                        // Recorre cada propiedad del objeto
                                        Object.keys(object).forEach(key => {
                                            // Si la propiedad es "undefined", elimínala
                                            if (key === "undefined") {
                                                delete object[key];
                                            }
                                        });
                                    });
                                    records = records.filter(object => Object.keys(object).length > 0);
                                    if (records)
                                        if (records.length) {
                                            let columnsReal = mapping[d];
                                            let columns = columnsReal.map(c => {
                                                // //Quitar los identificadores malignos nuevos de la columna
                                                c = c.replaceAll(" (d)", "").replaceAll(" (m)", "").replaceAll(" (n)", "").replaceAll(" (b)", "").replaceAll(" (r)", "");
                                                return import_actions.templates.field.replaceAll("@FIELD", c);
                                            });
                                            createTablesScript.push(import_actions.templates.create.replaceAll("@NAME", tablename.trim().toLowerCase()).replaceAll("@FIELS", columns.join(", ")));
                                            records.forEach((i, fila) => {
                                                if (i && d.toLowerCase().indexOf("- indicadores") !== -1) {
                                                    let values = [];
                                                    let tipodemeta = i["Tipo de meta (*)"] || i["Tipo de meta (*)"];
                                                    columnsReal.forEach((cr, ix )=> {
                                                        let campo = i[cr];
                                                        let problem = false;

                                                        if (cr.indexOf("(*)") !== -1) {
                                                            if (DSON.NewoseaX0(campo)) {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.required.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                problem = true;
                                                            }
                                                        }

                                                        if (cr.indexOf("(r)") !== -1) {
                                                            let refMap = diccionario[cr];
                                                            if(refMap){
                                                                let lassheets = sheets[refMap.sheet].filter(Boolean)
                                                                // Recorre cada objeto en el array
                                                                lassheets.forEach(object => {
                                                                    // Recorre cada propiedad del objeto
                                                                    Object.keys(object).forEach(key => {
                                                                        // Si la propiedad es "undefined", elimínala
                                                                        if (key === "undefined") {
                                                                            delete object[key];
                                                                        }
                                                                    });
                                                                });
                                                                // Filtra los objetos vacíos
                                                                lassheets = lassheets.filter(object => Object.keys(object).length > 0);

                                                                let exist = lassheets.filter(e=>e[refMap.column]===i[cr]).length;
                                                                if(!exist){
                                                                    requiredErrors.push(import_actions.templates.valid_relation.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                }
                                                            }
                                                        }

                                                        if (cr.toLowerCase().indexOf("meta 20xx") !== -1 || cr.toLowerCase().indexOf("trimestre") !== -1 || (cr.toLowerCase() === "línea base (*)")) {
                                                            // || cr.toLowerCase().indexOf("línea base") !== -1
                                                            if (tipodemeta === "Indice" || tipodemeta === "Índice") {
                                                                if (campo > 1 || campo < 0) {
                                                                    values.push("''");
                                                                    requiredErrors.push(import_actions.templates.meta_indice.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                    problem = true;
                                                                }
                                                            }else if (tipodemeta === "Valor absoluto") {
                                                                if (campo < 0) {
                                                                    values.push("''");
                                                                    requiredErrors.push(import_actions.templates.meta_valor_absoluto.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                    problem = true;
                                                                }
                                                            }else if (tipodemeta === "Decimal") {
                                                                const regexMoney = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;
                                                                if (!regexMoney.test(campo)) {
                                                                    values.push("''");
                                                                    requiredErrors.push(import_actions.templates.meta_decimal.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                    problem = true;
                                                                }
                                                            }else if (tipodemeta === "Dinero") {
                                                                const regexMoney = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;
                                                                if (!regexMoney.test(campo)) {
                                                                    values.push("''");
                                                                    requiredErrors.push(import_actions.templates.meta_dinero.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                    problem = true;
                                                                }
                                                            }else if (tipodemeta === "Entero") {
                                                                const regexEntero = /^\d+$/;
                                                                if (!regexEntero.test(campo)) {
                                                                    values.push("''");
                                                                    requiredErrors.push(import_actions.templates.meta_entero.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                    problem = true;
                                                                }
                                                            }else if (tipodemeta === "Porcentaje") {
                                                                campo = (campo * 100).toFixed(2);
                                                                if (campo > 100 || campo < 0) {
                                                                    values.push("''");
                                                                    requiredErrors.push(import_actions.templates.meta_porcentaje.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                    problem = true;
                                                                }
                                                            }
                                                        }
                                                        if (problem)
                                                            return
                                                        values.push(import_actions.templates.value.replaceAll("@VALUE", (((campo || "") + "") || "").replaceAll("'", "''")));
                                                    });
                                                    insertScript.push(import_actions.templates.insert.replaceAll("@NAME", tablename.trim().toLowerCase()).replaceAll("@VALUES", values.join(", ")));
                                                } else if (i) {
                                                    let values = [];
                                                    let problem= false;
                                                    columnsReal.forEach((cr, ix )=> {
                                                        if (cr.indexOf("(*)") !== -1) {
                                                            if (DSON.NewoseaX0(i[cr])) {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.required.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                problem = true;
                                                            }
                                                        }

                                                        //Aquí según el indentificador validar
                                                        if (cr.indexOf("(d)") !== -1) {
                                                            let lafeche = i[cr];
                                                            if (!import_actions.check_date(lafeche)) {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.valid_date.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                problem = true;
                                                            }
                                                        }else if (cr.indexOf("(m)") !== -1) {
                                                            const regexMoney = /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d{1,2})?$/;
                                                            let ledinero = i[cr];
                                                            if (!regexMoney.test(ledinero)) {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.valid_money.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                problem = true;
                                                            }
                                                        } else if (cr.indexOf("(n)") !== -1) {
                                                            const regexEntero = /^\d+$/;
                                                            let leinteger = i[cr];
                                                            if (!regexEntero.test(leinteger)) {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.valid_number.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                problem = true;
                                                            }
                                                        }else if (cr.indexOf("(b)") !== -1) {
                                                            let lebooleana = (i[cr]||"").toLowerCase();
                                                            if (lebooleana != "si" && lebooleana != "no") {
                                                                values.push("''");
                                                                requiredErrors.push(import_actions.templates.valid_bool.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                problem = true;
                                                            }
                                                        }else if (cr.indexOf("(r)") !== -1) {
                                                            let refMap = diccionario[cr];
                                                            if(refMap){
                                                                let lassheets = sheets[refMap.sheet].filter(Boolean)
                                                                // Recorre cada objeto en el array
                                                                lassheets.forEach(object => {
                                                                    // Recorre cada propiedad del objeto
                                                                    Object.keys(object).forEach(key => {
                                                                        // Si la propiedad es "undefined", elimínala
                                                                        if (key === "undefined") {
                                                                            delete object[key];
                                                                        }
                                                                    });
                                                                });
                                                                // Filtra los objetos vacíos
                                                                lassheets = lassheets.filter(object => Object.keys(object).length > 0);

                                                                let exist = lassheets.filter(e=>e[refMap.column]===i[cr]).length;
                                                                if(!exist){
                                                                    requiredErrors.push(import_actions.templates.valid_relation.replaceAll("@FIELD", cr).replaceAll("@HOJA", tablename).replaceAll("@FILA", fila + 1));
                                                                }
                                                            }
                                                        }

                                                        //si tuvo problemas ya sea requerido o de valudación entonces return
                                                        if (problem)
                                                            return
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
                                // await BASEAPI.updateallp('import_actions', {
                                //     "user_id": import_actions.session.id,
                                //     "fecha": "$now()",
                                //     "mensaje": "Completa",
                                //     where: [{
                                //         "field": "id",
                                //         "value": id
                                //     }]
                                // });
                                // SWEETALERT.show({
                                //     type: 'warning',
                                //     message: `Data verificada e insertada`,
                                //     confirm: function () {
                                //         import_actions.pages.form.save();
                                //     }
                                // });
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
                                                    message: `Data verificada e insertada`,
                                                    confirm: function () {
                                                        import_actions.pages.form.save();
                                                    }
                                                });
                                            });
                                        else
                                            SERVICE.base_db.directQuery({query: `select ImportCompania(${import_actions.compania})`}, async (doto) => {
                                                SWEETALERT.show({
                                                    type: 'warning',
                                                    message: `Data verificada e insertada`,
                                                    confirm: function () {
                                                        import_actions.pages.form.save();
                                                    }
                                                });
                                            });
                                    });
                                });
                            } else {
                                await BASEAPI.updateallp('import_actions', {
                                    "user_id": import_actions.session.id,
                                    "fecha": "$now()",
                                    "mensaje": "<ol><li>" + requiredErrors.join("</li><li>") + "</li></ol>",
                                    where: [{
                                        "field": "id",
                                        "value": id
                                    }]
                                });
                                SWEETALERT.show({
                                    type: 'warning',
                                    message: `Verificación Completada Con Errores`,
                                    confirm: function(){
                                        MODAL.close();
                                        import_actions.refresh();
                                    }
                                });
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
