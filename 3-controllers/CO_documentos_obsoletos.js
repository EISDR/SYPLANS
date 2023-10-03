app.controller("documentos_obsoletos", function ($scope, $http, $compile) {
    documentos_obsoletos = this;
    documentos_obsoletos.session = new SESSION().current();
    documentos_obsoletos.caracteristica = documentos_obsoletos.session.groups[0].caracteristica;
    var animation = new ANIMATION();
    documentos_obsoletos.currentdate = moment().format("YYYY-MM-DD");
    //documentos_obsoletos.singular = "singular";
    //documentos_obsoletos.plural = "plural";
    //documentos_obsoletos.headertitle = "Hola Title";
    //documentos_obsoletos.destroyForm = false;
    //documentos_obsoletos.permissionTable = "tabletopermission";
    RUNCONTROLLER("documentos_obsoletos", documentos_obsoletos, $scope, $http, $compile);
    RUN_B("documentos_obsoletos", documentos_obsoletos, $scope, $http, $compile);
    documentos_obsoletos.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  documentos_obsoletos.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  documentos_obsoletos.session.institucion_id ? "=" : "is",
                    "value":  documentos_obsoletos.session.institucion_id ?  documentos_obsoletos.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            documentos_obsoletos.mapa_id = mapaData.id;
            var documentos_confidenciales = await BASEAPI.listp('vw_documentos_confidenciales', {
                limit:0,
                where: [
                    {
                        field: "compania",
                        value:  documentos_obsoletos.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator":  documentos_obsoletos.session.institucion_id ? "=" : "is",
                        "value":  documentos_obsoletos.session.institucion_id ?  documentos_obsoletos.session.institucion_id : "$null"
                    },
                    {
                        open:"(",
                        field: "rol",
                        operator: "=",
                        value: documentos_obsoletos.session.groups[0].id,
                        connector: "OR"
                    },
                    {
                        close:")",
                        field: "usuario",
                        operator: "=",
                        value: documentos_obsoletos.session.id,
                    }
                ]
            });
            documentos_confidenciales = documentos_confidenciales.data;
            const documentos_confidencialesIds = documentos_confidenciales.map(doc => doc.id)
            if (documentos_obsoletos.caracteristica == ENUM_2.Grupos.director_general || documentos_obsoletos.caracteristica == ENUM_2.Grupos.analista_de_calidad || documentos_obsoletos.caracteristica == ENUM_2.Grupos.supervisor_de_calidad){
                documentos_obsoletos.fixFilters = [
                    {
                        field: "compania",
                        value: documentos_obsoletos.session.compania_id
                    },
                    {
                        field: "documento_general",
                        operator: "is",
                        value: "$null"
                    },
                    {
                        "field": "institucion",
                        "operator": documentos_obsoletos.session.institucion_id ? "=" : "is",
                        "value": documentos_obsoletos.session.institucion_id ? documentos_obsoletos.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus_id",
                        operator: "!=",
                        value: ENUM_2.documentos_estatus.Eliminado
                    },
                    {
                        "field": "vigencia",
                        "operator": "<",
                        "value": documentos_obsoletos.currentdate
                    },
                    {
                        field: "mapa_proceso",
                        value: documentos_obsoletos.mapa_id ? documentos_obsoletos.mapa_id : -1
                    }
                ];
            } else {
                documentos_obsoletos.fixFilters = [
                    {
                        field: "compania",
                        value: documentos_obsoletos.session.compania_id
                    },
                    {
                        field: "documento_general",
                        operator: "is",
                        value: "$null"
                    },
                    {
                        "field": "institucion",
                        "operator": documentos_obsoletos.session.institucion_id ? "=" : "is",
                        "value": documentos_obsoletos.session.institucion_id ? documentos_obsoletos.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus_id",
                        operator: "!=",
                        value: ENUM_2.documentos_estatus.Eliminado
                    },
                    {
                        field: "mapa_proceso",
                        value: documentos_obsoletos.mapa_id ? documentos_obsoletos.mapa_id : -1
                    },
                    {
                        "field": "vigencia",
                        "operator": "<",
                        "value": documentos_obsoletos.currentdate
                    },
                    {
                        open:"(",
                        field: "es_confidencial",
                        operator: "is",
                        value: "$null",
                        connector: "OR"
                    },
                    {
                        close:")",
                        field: CONFIG.mysqlactive ? "id" : "$BASE.id::text",
                        value: documentos_confidencialesIds,
                    }
                ];
            }
        }else{
            documentos_obsoletos.fixFilters = [
                {
                    field: "compania",
                    value:  documentos_obsoletos.session.compania_id
                },
                {
                    field: "documento_general",
                    operator: "is",
                    value: "$null"
                },
                {
                    "field": "institucion",
                    "operator":  documentos_obsoletos.session.institucion_id ? "=" : "is",
                    "value":  documentos_obsoletos.session.institucion_id ?  documentos_obsoletos.session.institucion_id : "$null"
                },
                {
                    "field": "vigencia",
                    "operator": "<",
                    "value": documentos_obsoletos.currentdate
                },
                {
                    "field": "estatus_id",
                    "operator": "!=",
                    "value": ENUM_2.documentos_estatus.Eliminado
                },
                {
                    field: "mapa_proceso",
                    value:  -1
                }
            ];
        }
        documentos_obsoletos.refresh();
        if (callback)
            callback();
    }
    documentos_obsoletos.getMapaProceso();
    documentos_obsoletos.formulary = function (data, mode, defaultData) {
        if (documentos_obsoletos !== undefined) {
            documentos_obsoletos.form.modalWidth = ENUM.modal.width.full;
            documentos_obsoletos.form.readonly = {};
            documentos_obsoletos.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("documentos_obsoletos.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'compania', rules);
            });
            $scope.$watch("documentos_obsoletos.nombre_mapa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'nombre_mapa', rules);
            });
            $scope.$watch("documentos_obsoletos.nombre_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'nombre_proceso', rules);
            });
            $scope.$watch("documentos_obsoletos.id_responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'id_responsable_proceso', rules);
            });
            $scope.$watch("documentos_obsoletos.responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'responsable_proceso', rules);
            });
            $scope.$watch("documentos_obsoletos.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'codigo', rules);
            });
            $scope.$watch("documentos_obsoletos.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'nombre', rules);
            });
            $scope.$watch("documentos_obsoletos.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'estatus_id', rules);
            });
            $scope.$watch("documentos_obsoletos.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'estatus', rules);
            });
            $scope.$watch("documentos_obsoletos.nombre_drp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'nombre_drp', rules);
            });
            $scope.$watch("documentos_obsoletos.programa_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'programa_plan', rules);
            });
            $scope.$watch("documentos_obsoletos.id_punto_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'id_punto_verificacion', rules);
            });
            $scope.$watch("documentos_obsoletos.punto_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'punto_verificacion', rules);
            });
            $scope.$watch("documentos_obsoletos.cumple", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'cumple', rules);
            });
            $scope.$watch("documentos_obsoletos.observaciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'observaciones', rules);
            });
            $scope.$watch("documentos_obsoletos.tipo_inconformidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'tipo_inconformidad', rules);
            });
            $scope.$watch("documentos_obsoletos.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'descripcion', rules);
            });
            $scope.$watch("documentos_obsoletos.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'proceso', rules);
            });
            $scope.$watch("documentos_obsoletos.creado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'creado_por', rules);
            });
            $scope.$watch("documentos_obsoletos.creado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'creado_por_nombre', rules);
            });
            $scope.$watch("documentos_obsoletos.creado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'creado_en', rules);
            });
            $scope.$watch("documentos_obsoletos.aprobado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'aprobado_por', rules);
            });
            $scope.$watch("documentos_obsoletos.aprobado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'aprobado_por_nombre', rules);
            });
            $scope.$watch("documentos_obsoletos.tipo_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'tipo_documento', rules);
            });
            $scope.$watch("documentos_obsoletos.aprobado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'aprobado_en', rules);
            });
            $scope.$watch("documentos_obsoletos.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'observacion', rules);
            });
            $scope.$watch("documentos_obsoletos.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'tempid', rules);
            });
            $scope.$watch("documentos_obsoletos.responsable_ducumento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documentos_obsoletos, 'responsable_ducumento', rules);
            });
        }
    };
    documentos_obsoletos.openmodalField = function (value) {

        documentos_obsoletos.tipeExport = 'PDF';

        documentos_obsoletos.modal.modalView("documentos_obsoletos/exportpreview", {
            width: 'modal-full',
            header: {
                title: `Vista Previa Lista maestra de Documentos`,
                icon: "ICON.classes.printer"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }
    documentos_obsoletos.exportPDF = function (){
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    }
    documentos_obsoletos.get_date = function(date) {
        if (date)
            return moment(date).format(`DD`) + " de " +  moment(date).format(`MMMM`) + " de "  + moment(date).format(`YYYY hh:mmA`);
        else
            return moment().format(`DD`) + " de " +  moment().format(`MMMM`) + " de "  + moment().format(`YYYY hh:mmA`);
    };
    documentos_obsoletos.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);

    };
    documentos_obsoletos.verFile = function (key, row) {
        if (key != "folder")
            return;

        documentos_obsoletos.setPermission("file.upload", false);
        documentos_obsoletos.setPermission("file.remove", false);
        if (typeof documentos_obsoletos !== 'null') {
            if (documentos_obsoletos) {
                var info =  row.id
                if (info) {
                    var root = DSON.template("/documentos_asociados/documento_asociadofile/" + row.id, row);
                    documentos_obsoletos.showfiletypes = function () {
                        var modal = {
                            width: "modal-full",
                            header: {
                                title: "Ver tipos de archivos permitidos a ser cargados",
                                icon: "file-eye"
                            },
                            footer: {
                                cancelButton: false,
                                buttons: [
                                    {
                                        color: "btn bg-<%= COLOR.info %> btn-labeled btn-xs pull-rightm",
                                        title: "<b><i class='icon-arrow-right8'></i></b>Continuar",
                                        action: function () {
                                            MODAL.close();
                                        }
                                    }
                                ]
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading')
                            },
                            event: {
                                show: {
                                    begin: function (data) {
                                        data.permitted_files = [];
                                        for (var i in CONFIG.fileType_general) {
                                            for (var j in CONFIG.fileType_general[i]) {
                                                if (typeof data.permitted_files[j] == "undefined") {
                                                    data.permitted_files[j] = {};
                                                }
                                                data.permitted_files[j][i] = CONFIG.fileType_general[i][j];
                                            }
                                        }
                                    }
                                },
                                hide: {
                                    begin: function (data) {

                                    }
                                }
                            }
                        };
                        documentos_obsoletos.modal.modalView("templates/components/filetype", modal);
                    };
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    documentos_obsoletos.modal.modalView("templates/components/gallery", {
                        width: 'modal-full',
                        header: {
                            title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                        },
                        footer: {
                            cancelButton: false
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    });
                }
            }
        }
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
});