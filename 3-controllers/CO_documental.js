app.controller("documental", function ($scope, $http, $compile) {
    documental = this;
    //documental.fixFilters = [];
    documental.singular = "Directorio";
    documental.plural = "Directorio";
    documental.headertitle = "Repositorio de Documentos";
    documental.destroyForm = false;
    //documental.permissionTable = "tabletopermission";
    RUNCONTROLLER("documental", documental, $scope, $http, $compile);
    documental.buttonhidecolumns = true;
    documental.root = "/";
    documental.mode = 1;
    documental.folderid = undefined;
    documental.loaded = false;
    documental.lan = LAN;
    documental.storage = STORAGE.get('lastfolderdocumental');
    documental.history = documental.storage || [];
    documental.getfiles = async (root) => {
        if (root)
            documental.history.push(root);

        let user = new SESSION().current();
        SWEETALERT.loading({message: "Cargando carpetas y archivos."});
        documental.list = await BASEAPI.listp('vw_documental', {
            where: [
                {
                    field: "compania",
                    value: user.compania_id
                },
                {
                    field: "root",
                    value: (documental.history.length ? documental.history.join('/') : "/")
                },
            ],
            order: "asc",
            orderby: "type"
        });
        documental.list = documental.list.data;
        SWEETALERT.stop();
        documental.loaded = true;
        STORAGE.add('lastfolderdocumental', documental.history);
        documental.refreshAngular();
    };
    documental.getPath = () => {
        return documental.history.length ? documental.history.join('/') : 'Inicio';
    };
    documental.back = async () => {
        if (documental.history.length) {
            documental.history.pop();
            documental.getfiles();
        }
    };

    documental.contieneHistorial = () => {
        if (!documental.list)
            return false;
        return documental.list.filter(folder => {
            return folder.history != '0';
        }).length > 0;
    };
    documental.contiene = () => {
        if (!documental.list)
            return false;
        return documental.list.filter(folder => {
            return documental.conditionalRoot(folder);
        }).length > 0;
    };
    documental.conditionalRoot = (folder) => {
        return documental.mode === 1 ? ((folder.type || 1) !== 4) : ((folder.type || 1) === 4 || folder.history > 0);
    };
    documental.documentoAsociado = function (id) {
        documentos_asociados.setPermission("file.upload", false);
        documentos_asociados.setPermission("file.remove", false);
        if (typeof documentos_asociados !== 'null') {
            if (documentos_asociados) {

                var root = DSON.template("/documentos_asociados/documento_asociadofile/" + id);

                baseController.viewData = {
                    root: root,
                    scope: 'documentos_asociados',
                    maxsize: 20,
                    maxfiles: 1,
                    acceptedFiles: null,
                    columns: 4,
                };

                documentos_asociados.modal.modalView("templates/components/gallery", {
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
    };

    documental.editfolder = async (id, type) => {
        documental.typed = type;
        documental.formulary({
            where: [{
                field: "id",
                value: id
            }]
        }, FORM.modes.edit, {});
    };
    documental.addFile = async (type) => {
        delete documental.id;
        documental.typed = type;
        documental.formulary(null, 'new');
    };
    documental.removeFolder = async (row, type) => {
        documental.typed = type;
        SWEETALERT.confirm({
            message: MESSAGE.i('alerts.AYSDelete'),
            confirm: function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                documental.deleteRow(row).then(function () {
                    SWEETALERT.stop();
                });
            }
        });
    };
    documental.formulary = function (data, mode, defaultData) {
        if (documental !== undefined) {
            RUN_B("documental", documental, $scope, $http, $compile);
            documental.form.modalWidth = ENUM.modal.width.full;
            documental.form.readonly = {};

            documental.form.titles = {
                new: "Agregar Nueva Carpeta",
                edit: "Editar Carpeta"
            };
            if (documental.typed === 2) {
                documental.form.titles = {
                    new: "Agregar Nuevo Archivo",
                    edit: "Editar Archivo"
                };
            }
            documental.createForm(data, mode, defaultData);
            $scope.$watch("documental.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documental, 'nombre', rules);
            });
            $scope.$watch("documental.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documental, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("documental.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documental, 'compania', rules);
            });
            $scope.$watch("documental.root", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(documental, 'root', rules);
            });
        }
    };
    documental.getfiles();
    // $scope.triggers.table.after.loadF = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    documental.triggers.table.before.open = () => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
        resolve(true);
    });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    documental.triggers.table.after.insert = function (data) {
        documental.getfiles();
        return true;
    };
    documental.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        let user = new SESSION().current();
        data.inserting.compania = user.compania_id;
        data.inserting.root = (documental.history.length ? documental.history.join('/') : "/");
        data.inserting.created_by = user.id;
        data.inserting.type = documental.typed;
        data.inserting.created = "$now()";
        resolve(true);
    });
    //
    documental.triggers.table.after.update = function (data) {
        documental.getfiles();
    };
    documental.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
        // await BASEAPI.insertIDp('documental', {
        //     nombre:
        // });
        let user = new SESSION().current();
        data.updating.updated_by = user.id;
        data.updating.updated = "$now()";
        resolve(true);
    });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    documental.beforeDelete = function (data) {
        return false;
    };
    documental.afterDelete = function (data) {
        documental.getfiles();
    };
    documental.deleteRow = async function (row) {
        var multiple = false;
        if (row === undefined) {
            row = ARRAY.last(documental.forDelte);
            ARRAY.removeLast(documental.forDelte);
            multiple = true;
        }
        var where = [];

        for (const deletekey of eval(`CRUD_${documental.modelName}`).table.deletekeys) {
            if (row !== undefined)
                where.push({field: deletekey, value: eval("row." + deletekey)});
        }
        if (documental.beforeDelete(row)) return;
        documental.procesingRowErrors = [];
        BASEAPI.deleteall("documental", where, async function (result) {
            if (result.data.error === false) {
                documental.afterDelete(row);
            }
        });
    };
});
