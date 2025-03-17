app.controller("module_lan", function ($scope, $http, $compile) {
    ready = async () => {
        module_lan = this;
        module_lan.existentes = await BASEAPI.listf('module_lan');
        module_lan.languages = await BASEAPI.listf('language');
        module_lan.llaves = await BASEAPI.listf('ia_llaves');
        if (module_lan.llaves.filter(d => !d.full).length === 0) {
            await BASEAPI.updateallp('ia_llaves', {
                full: 0
            });
        }
        //module_lan.fixFilters = [];
        module_lan.session = new SESSION().current();
        module_lan.currentLan = STORAGE.get('templan') || (module_lan.session.language || "es")
        //module_lan.fixFilters = [{
        //    field: "compania",
        //    value: module_lan.session.compania_id
        //}];
        module_lan.singular = "Módulo de lenguaje";
        module_lan.plural = "Módulos de lenguaje";
        module_lan.headertitle = "Módulo de lenguaje";
        module_lan.thereChanges = () => {
            let languages = Object.keys(LANGUAGE);
            let newLAN = {};
            languages.forEach(l => {
                newLAN[l] = {};
            });
            for (const LL of module_lan.existentes) {
                let category = LL.category || "base";
                if (!newLAN[CONFIG.language])
                    newLAN[CONFIG.language] = {};
                if (!newLAN[CONFIG.language][category])
                    newLAN[CONFIG.language][category] = {};
                if (!newLAN[CONFIG.language][category][LL.key])
                    newLAN[CONFIG.language][category][LL.key] = LL[CONFIG.language];
            }
            return (JSON.stringify(newLAN) !== JSON.stringify(LANGUAGE));
        }
        module_lan.hasChanges = module_lan.thereChanges();
        module_lan.missings = [];
        module_lan.thereNews = () => {
            return module_lan.missings.length;
        }
        module_lan.integrarMensajes = async () => {
            SWEETALERT.loading({message: "Integrando Mensajes..."});
            console.log(module_lan.missings);
            module_lan.missings = module_lan.missings.filter(d => d.key && d.category);
            await BASEAPI.insertp("module_lan", module_lan.missings);
            setTimeout(() => {
                STORAGE.delete("missingLanguage");
                location.reload();
            }, 5000);

        }
        module_lan.actualizarLengua = async () => {
            SWEETALERT.loading({message: "Actualizando mensajes integrados"});
            STORAGE.delete('lastLan');
            STORAGE.delete('LANGUAGEDATA');
            setTimeout(() => {
                location.reload();
            }, 5000);
        }

        module_lan.cambiarIdioma = async (item) => {
            SWEETALERT.loading({message: "Cambiando a " + item.label});
            STORAGE.add('templan', item.nombre);
            STORAGE.delete('LANGUAGE');
            STORAGE.add('LANGUAGE', item.nombre);
            STORAGE.delete('lastLan');
            STORAGE.delete('LANGUAGEDATA');
            setTimeout(() => {
                location.reload();
            }, 5000);
        }

        //module_lan.destroyForm = false;
        //module_lan.permissionTable = "tabletopermission";
        RUNCONTROLLER("module_lan", module_lan, $scope, $http, $compile);
        module_lan.getStatus = (row) => {
            if (row.ia != '0')
                return "ia";
            else if (row.human != '0') {
                return "human";
            } else
                return "no";
        }
        module_lan.formulary = function (data, mode, defaultData) {
            if (module_lan !== undefined) {
                RUN_B("module_lan", module_lan, $scope, $http, $compile);
                module_lan.form.modalWidth = ENUM.modal.width.full;
                // module_lan.form.readonly = {compania: module_lan.session.compania_id};
                module_lan.form.titles = {
                    new: "Agregar Módulo de lenguaje",
                    edit: "Editar Módulo de lenguaje",
                    view: "Ver Módulo de lenguaje"
                };
                if (mode === "edit")
                    module_lan.createForm(data, mode, defaultData, "formEdit");
                else
                    module_lan.createForm(data, mode, defaultData);
                //ms_product.selectQueries['language'] = [
                //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
                //    }
                //];
                $scope.$watch("module_lan.es", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(module_lan, 'ia', rules);
                });
                $scope.$watch("module_lan.en", function (value) {
                    var rules = [];
                    //rules here
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(module_lan, 'ia', rules);
                });
            }
        };
        module_lan.downloadJson = async function () {
            module_lan.data = await BASEAPI.listp('module_lan', {
                limit: 0,
                join: [
                    {
                        'table': 'language',
                        'base': 'language',
                        'field': 'id',
                        'columns': ['nombre']
                    }
                ],
            });
            module_lan.data = module_lan.data.data;

            const groupedData = module_lan.data.reduce((acc, item) => {
                if (!acc[item.language_nombre]) {
                    acc[item.language_nombre] = [];
                }
                acc[item.language_nombre].push(item);
                return acc;
            }, {});
            console.log('Datos agrupados por language_nombre:', groupedData);

            Object.keys(groupedData).forEach(language => {
                const jsonData = JSON.stringify(groupedData[language], null, 4);
                const blob = new Blob([jsonData], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${language}_data.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        };
        module_lan.triggers.table.after.load = function (records) {
            module_lan.missings = MESSAGE.missingLanguage.filter(d => !module_lan.existentes.filter(e => e.category === d.category && e.key === d.key).length);
        };
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
        module_lan.triggers.table.after.insert = function (data) {
            module_lan.hasChanges = module_lan.thereChanges();
            return true;
        };
        module_lan.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
            if (data.inserting.category_exist) {
                data.inserting.category = data.inserting.category_exist + "";
            }
            delete data.inserting.category_exist;
            resolve(true);
        });
        //
        module_lan.triggers.table.after.update = function (data) {

            module_lan.hasChanges = module_lan.thereChanges();
            //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
        };
        module_lan.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            if (module_lan.ia) {
                data.updating.ia = 1;
            } else {
                data.updating.human = 1;
            }
            resolve(true);
        });
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
        RUNTABLE('module_lan');
        module_lan.refreshAngular();
        module_lan.translateSetting = (text) => {
            let q = module_lan.cleanTranslatePre(text);
            let key = module_lan.llaves.filter(d => !d.full)[0].llave;
            return {
                "async": true,
                "crossDomain": true,
                "url": `https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=es|en&q=${q}&mt=1&onlyprivate=0`,
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Key": key,
                    "X-RapidAPI-Host": "translated-mymemory---translation-memory.p.rapidapi.com"
                }
            };
        };
        module_lan.translateAll = async () => {
            SWEETALERT.confirm({
                message: "Está seguro que desea traducir los mensajes en masa?",
                confirm: async () => {
                    debugger
                    SWEETALERT.loading({message: `Traduciendo pendientes`});
                    module_lan.existentes = await BASEAPI.listf('module_lan');
                    module_lan.existentes = module_lan.existentes.filter(d => module_lan.getStatus(d) === "no");
                    let count = 0;
                    SWEETALERT.loading({message: `Traduciendo  ${count}/${module_lan.existentes.length}`});
                    for (const message of module_lan.existentes) {
                        let cleaned = message.es.replaceAll("**", "");
                        let response = await module_lan.translate(cleaned);
                        if (response.result) {
                            await BASEAPI.updateallp('module_lan', {
                                en: response.text,
                                es: cleaned,
                                ia: 1,
                                where: [
                                    {
                                        field: "id",
                                        value: message.id
                                    }
                                ]
                            });
                            SWEETALERT.changeHtml(`Traduciendo  ${++count}/${module_lan.existentes.length}`)
                        } else if (response.key) {
                            await BASEAPI.updateallp('ia_llaves', {
                                full: 1,
                                where: [
                                    {
                                        field: "llave",
                                        value: response.key.llave
                                    }
                                ]
                            });
                            SWEETALERT.show({
                                type: 'error',
                                message: `LA AI llegó a su limite temporal, favor recargar y continuar con el proceso`,
                                confirm: function () {
                                    location.reload();
                                }
                            });
                            break;
                        } else {
                            SWEETALERT.show({
                                type: 'error',
                                message: `Error con la traducción de ${cleaned}, para volver con el proceso favor revisar`,
                                close: function () {
                                }
                            });
                            break;
                        }
                    }
                    SWEETALERT.show({message: "Traducción completa"});
                }
            });
        };
        module_lan.one = async (from) => {
            let response = await module_lan.translate(from);
            console.log("response", response);
            if (response.result) {
                module_lan.en = response.text;
                module_lan.ia = true;
                module_lan.refreshAngular();
                SWEETALERT.stop();
                SWEETALERT.show({message: "Traducción completa"});
            } else {
                if (response.key) {
                    await BASEAPI.updateallp('ia_llaves', {
                        full: 1,
                        where: [
                            {
                                field: "llave",
                                value: response.key.llave
                            }
                        ]
                    });
                    SWEETALERT.show({
                        type: 'error',
                        message: `LA AI llegó a su limite temporal, favor recargar y continuar con el proceso`,
                        confirm: function () {
                            location.reload();
                        }
                    });
                } else {
                    SWEETALERT.show({
                        type: 'error',
                        message: `Error con la petición ${response.message}`,
                        close: function () {
                        }
                    });
                }
            }
        }
        module_lan.translateForm = async () => {
            SWEETALERT.loading({message: `Traduciendo ${module_lan.es}`});
            let response = await module_lan.translate(module_lan.es);
            console.log("response", response);
            if (response.result) {
                module_lan.en = response.text;
                module_lan.ia = 1;
                module_lan.refreshAngular();
                SWEETALERT.stop();
                SWEETALERT.show({message: "Traducción completa"});
            } else {
                if (response.key) {
                    await BASEAPI.updateallp('ia_llaves', {
                        full: 1,
                        where: [
                            {
                                field: "llave",
                                value: response.key.llave
                            }
                        ]
                    });
                    SWEETALERT.show({
                        type: 'error',
                        message: `LA AI llegó a su limite temporal, favor recargar y continuar con el proceso`,
                        confirm: function () {
                            location.reload();
                        }
                    });
                } else {
                    SWEETALERT.show({
                        type: 'error',
                        message: `Error con la petición ${response.message}`,
                        close: function () {
                        }
                    });
                }
            }
        }
        module_lan.translate = async (text) => new Promise((resolve, reject) => {
            const settings = module_lan.translateSetting(text);
            $.ajax(settings).done((response) => {
                resolve({result: true, text: module_lan.resToTranslate(response)});
            }).fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR);
                let key = module_lan.llaves.filter(d => !d.full)[0];
                if (jqXHR.status === 429) {
                    resolve({result: false, key: key});
                } else {
                    resolve({result: false, message: errorThrown});
                }
            });
        });
        module_lan.resToTranslate = (response) => {
            if (response) {
                if (response.responseData)
                    if (response.responseData.translatedText) {
                        let clean = $('<textarea />').html(response.responseData.translatedText).text();
                        return clean;
                    }
            }
            return "";
        }
        module_lan.cleanTranslatePre = (str) => {
            let dictionary = {
                // " slp": " Sleeps",
                // " psn": " Poisons",
                // " par": " Paralyzes",
                // " SpD": " Special Defense",
                // " SpA": " Special Attack",
                // "Sp. Def": "Special Defense",
                // "Sp. Atk": "Special Attack",
                // " Def ": " Defense ",
                // " Atk ": " Attack ",
                // "OHKOs": "Kill"
            };
            let new_string = str;
            for (let dictionaryKey in dictionary) {
                let item = dictionary[dictionaryKey];
                new_string = new_string.replace(dictionaryKey, item);
            }
            return new_string.toLowerCase();
        };
        module_lan.openPending = () => {
            $("#listPending").modal("show");
        }
    };
    ready();
});
