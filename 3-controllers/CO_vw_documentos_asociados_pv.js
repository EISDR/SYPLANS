app.controller("vw_documentos_asociados_pv", function ($scope, $http, $compile) {
    vw_documentos_asociados_pv = this;
    vw_documentos_asociados_pv.session = new SESSION().current();
    vw_documentos_asociados_pv.caracteristica = vw_documentos_asociados_pv.session.groups[0].caracteristica;
    var animation = new ANIMATION();
    //vw_documentos_asociados_pv.singular = "singular";
    //vw_documentos_asociados_pv.plural = "plural";
    //vw_documentos_asociados_pv.headertitle = "Hola Title";
    //vw_documentos_asociados_pv.destroyForm = false;
    //vw_documentos_asociados_pv.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_documentos_asociados_pv", vw_documentos_asociados_pv, $scope, $http, $compile);
    RUN_B("vw_documentos_asociados_pv", vw_documentos_asociados_pv, $scope, $http, $compile);
    vw_documentos_asociados_pv.getMapaProceso = async function (callback) {
        var mapaData = await BASEAPI.firstp('vw_mapa_proceso', {
            order: "desc",
            where: [
                {
                    field: "compania",
                    value:  vw_documentos_asociados_pv.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  vw_documentos_asociados_pv.session.institucion_id ? "=" : "is",
                    "value":  vw_documentos_asociados_pv.session.institucion_id ?  vw_documentos_asociados_pv.session.institucion_id : "$null"
                },
                {
                    field: "estatus",
                    operator: "!=",
                    value: 4
                }
            ]
        });
        if (mapaData) {
            vw_documentos_asociados_pv.mapa_id = mapaData.id;
            var documentos_confidenciales = await BASEAPI.listp('vw_documentos_confidenciales', {
                limit:0,
                where: [
                    {
                        field: "compania",
                        value:  vw_documentos_asociados_pv.session.compania_id
                    },
                    {
                        "field": "institucion",
                        "operator":  vw_documentos_asociados_pv.session.institucion_id ? "=" : "is",
                        "value":  vw_documentos_asociados_pv.session.institucion_id ?  vw_documentos_asociados_pv.session.institucion_id : "$null"
                    },
                    {
                        open:"(",
                        field: "rol",
                        operator: "=",
                        value: vw_documentos_asociados_pv.session.groups[0].id,
                        connector: "OR"
                    },
                    {
                        close:")",
                        field: "usuario",
                        operator: "=",
                        value: vw_documentos_asociados_pv.session.id,
                    }
                ]
            });
            documentos_confidenciales = documentos_confidenciales.data;
            const documentos_confidencialesIds = documentos_confidenciales.map(doc => doc.id)
            if (vw_documentos_asociados_pv.caracteristica == ENUM_2.Grupos.director_general || vw_documentos_asociados_pv.caracteristica == ENUM_2.Grupos.analista_de_calidad || vw_documentos_asociados_pv.caracteristica == ENUM_2.Grupos.supervisor_de_calidad){
                vw_documentos_asociados_pv.fixFilters = [
                    {
                        field: "compania",
                        value: vw_documentos_asociados_pv.session.compania_id
                    },
                    {
                        field: "documento_general",
                        operator: "is",
                        value: "$null"
                    },
                    {
                        "field": "institucion",
                        "operator": vw_documentos_asociados_pv.session.institucion_id ? "=" : "is",
                        "value": vw_documentos_asociados_pv.session.institucion_id ? vw_documentos_asociados_pv.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus_id",
                        operator: "!=",
                        value: ENUM_2.documentos_estatus.Eliminado
                    },
                    {
                        field: "mapa_proceso",
                        value: vw_documentos_asociados_pv.mapa_id ? vw_documentos_asociados_pv.mapa_id : -1
                    }
                ];
            } else {
                vw_documentos_asociados_pv.fixFilters = [
                    {
                        field: "compania",
                        value: vw_documentos_asociados_pv.session.compania_id
                    },
                    {
                        field: "documento_general",
                        operator: "is",
                        value: "$null"
                    },
                    {
                        "field": "institucion",
                        "operator": vw_documentos_asociados_pv.session.institucion_id ? "=" : "is",
                        "value": vw_documentos_asociados_pv.session.institucion_id ? vw_documentos_asociados_pv.session.institucion_id : "$null"
                    },
                    {
                        field: "estatus_id",
                        operator: "!=",
                        value: ENUM_2.documentos_estatus.Eliminado
                    },
                    {
                        field: "mapa_proceso",
                        value: vw_documentos_asociados_pv.mapa_id ? vw_documentos_asociados_pv.mapa_id : -1
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
            vw_documentos_asociados_pv.fixFilters = [
                {
                    field: "compania",
                    value:  vw_documentos_asociados_pv.session.compania_id
                },
                {
                    field: "documento_general",
                    operator: "is",
                    value: "$null"
                },
                {
                    "field": "institucion",
                    "operator":  vw_documentos_asociados_pv.session.institucion_id ? "=" : "is",
                    "value":  vw_documentos_asociados_pv.session.institucion_id ?  vw_documentos_asociados_pv.session.institucion_id : "$null"
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
        vw_documentos_asociados_pv.refresh();
        if (callback)
            callback();
    }
    vw_documentos_asociados_pv.getMapaProceso();
    vw_documentos_asociados_pv.formulary = function (data, mode, defaultData) {
        if (vw_documentos_asociados_pv !== undefined) {
            vw_documentos_asociados_pv.form.modalWidth = ENUM.modal.width.full;
            vw_documentos_asociados_pv.form.readonly = {};
            vw_documentos_asociados_pv.createForm(data, mode, defaultData);
            //ms_product.selectQueries['compania'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("vw_documentos_asociados_pv.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'compania', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.nombre_mapa", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'nombre_mapa', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.nombre_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'nombre_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.id_responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'id_responsable_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.responsable_proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'responsable_proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.codigo", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'codigo', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.estatus_id", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'estatus_id', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'estatus', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.nombre_drp", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'nombre_drp', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.programa_plan", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'programa_plan', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.id_punto_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'id_punto_verificacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.punto_verificacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'punto_verificacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.cumple", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'cumple', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.observaciones", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'observaciones', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.tipo_inconformidad", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'tipo_inconformidad', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'descripcion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.proceso", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'proceso', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.creado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'creado_por', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.creado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'creado_por_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.creado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'creado_en', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.aprobado_por", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'aprobado_por', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.aprobado_por_nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'aprobado_por_nombre', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.tipo_documento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'tipo_documento', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.aprobado_en", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'aprobado_en', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.observacion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'observacion', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.tempid", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'tempid', rules);
            });
            $scope.$watch("vw_documentos_asociados_pv.responsable_ducumento", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_documentos_asociados_pv, 'responsable_ducumento', rules);
            });
        }
    };
    vw_documentos_asociados_pv.openmodalField = function (value) {

        vw_documentos_asociados_pv.tipeExport = 'PDF';

        vw_documentos_asociados_pv.modal.modalView("vw_documentos_asociados_pv/exportpreview", {
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
    vw_documentos_asociados_pv.exportPDF = function (){
        $("#PDF").printThis({
            importCSS: false,                // import parent page css
            loadCSS: "../styles/planificacion/stylePrint.css?node=" + new Date().getTime(),      // path to additional css file - use an array [] for multiple
            printDelay: 333,
        });
    }
    vw_documentos_asociados_pv.get_date = function(date) {
        if (date)
            return moment(date).format(`DD`) + " de " +  moment(date).format(`MMMM`) + " de "  + moment(date).format(`YYYY hh:mmA`);
        else
            return moment().format(`DD`) + " de " +  moment().format(`MMMM`) + " de "  + moment().format(`YYYY hh:mmA`);
    };
    vw_documentos_asociados_pv.triggers.table.after.load = async function (records) {
        //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);

    };
    vw_documentos_asociados_pv.verFile = function (key, row) {
        if (key != "folder")
            return;

        vw_documentos_asociados_pv.setPermission("file.upload", false);
        vw_documentos_asociados_pv.setPermission("file.remove", false);
        if (typeof vw_documentos_asociados_pv !== 'null') {
            if (vw_documentos_asociados_pv) {
                var info =  row.id
                if (info) {
                    var root = DSON.template("/documentos_asociados/documento_asociadofile/" + row.id, row);
                    vw_documentos_asociados_pv.showfiletypes = function () {
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
                        vw_documentos_asociados_pv.modal.modalView("templates/components/filetype", modal);
                    };
                    baseController.viewData = {
                        root: root,
                        scope: 'actividades_poa_monitoreo',
                        maxsize: 20,
                        maxfiles: 1,
                        acceptedFiles: null,
                        columns: 4,
                    };

                    vw_documentos_asociados_pv.modal.modalView("templates/components/gallery", {
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