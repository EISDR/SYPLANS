PERMISSIONS = {
    entities: null,
    entitiesCount: 0,
    mypermission: null,
    run: function ($scope) {
        $scope.HACK = function () {
            $scope.option.show = function (menu, row) {
                return true;
            };
            $scope.allow = function (permisionName, or, isModal) {
                return true;
            };
            $scope.setPermission("add", true);
            $scope.setPermission("edit", true);
            $scope.setPermission("remove", true);
            $scope.setPermission("view", true);
            $scope.setPermission("import", true);
            $scope.setPermission("copy", true);
            $scope.setPermission("actions", true);
            $('.icon-plus-circle2 ').parent().show();
        };

        $scope.allowAction = function (entity, controller, estatus) {
            let rol = new SESSION().current().profile;
            return baseController.WORKFLOW.filter(d => {
                return d.accion === entity && d.entidad === controller && (d.acciones_estatus || []).indexOf(parseInt(estatus)) !== -1 && (d.acciones_rol || []).indexOf(parseInt(rol)) !== -1
            }).length > 0;
        };
        $scope.allowFeature = function (entity, controller, estatus) {
            let rol = new SESSION().current().profile;
            return baseController.WORKFLOW.filter(d => {
                return d.feature === entity && d.entidad === controller && (d.features_estatus || []).indexOf(parseInt(estatus)) !== -1 && (d.features_rol || []).indexOf(parseInt(rol)) !== -1
            }).length > 0;
        };
        $scope.allow = function (permisionName, or, isModal) {
            var finalCrud = eval(`PERMISSIONS.mypermission.${$scope.modelName}`);
            if (finalCrud !== undefined) {
                if (isModal)
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                        finalCrud = eval(`PERMISSIONS.mypermission.${$scope.modelName}`);
                if (finalCrud.allow !== undefined && permisionName !== "") {
                    or = DSON.ifundefined(or, true);
                    if (Array.isArray(permisionName)) {
                        for (const permisionNameElement of permisionName) {
                            if (or) {
                                if (eval("finalCrud.allow." + permisionNameElement + " === true;") === true)
                                    return true;
                            } else {
                                if (eval("finalCrud.allow." + permisionNameElement + " === true;") === false)
                                    return false;
                            }
                        }
                    } else
                        return eval("finalCrud.allow." + permisionName + " === true;");
                    return !or;
                }
            }
            return true;
        };
        $scope.setPermission = function (permisionName, value) {
            var finalCrud = eval(`PERMISSIONS.mypermission.${$scope.modelName}`);
            if (finalCrud !== undefined) {
                if (finalCrud.allow !== undefined && permisionName !== "") {
                    if (Array.isArray(permisionName)) {
                        for (const permisionNameElement of permisionName) {
                            eval(`PERMISSIONS.mypermission.${$scope.modelName}.allow.` + permisionNameElement + " = value;");
                        }
                    } else
                        eval(`PERMISSIONS.mypermission.${$scope.modelName}.allow.` + permisionName + " = value;");
                }
                $scope.refreshAngular();
            }
        };
        $scope.characterist = function (characterist, or, isModal) {
            var finalCrud = eval(`CRUD_${$scope.modelName}`);
            if (isModal)
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                    finalCrud = eval(`CRUD_${$scope.modelName}`);
            if (finalCrud.table !== undefined && characterist !== "") {
                or = DSON.ifundefined(or, true);
                if (Array.isArray(characterist)) {
                    for (const permisionNameElement of characterist) {
                        if (or) {
                            if (eval("finalCrud.table." + permisionNameElement + " !== false;") === true)
                                return true;
                        } else {
                            if (eval("finalCrud.table." + permisionNameElement + " !== false;") === false)
                                return false;
                        }
                    }
                } else
                    return eval("finalCrud.table." + characterist + " !== false;");
                return !or;
            }
            return true;
        };
        $scope.moduleColor = function (actions) {
            var search = JSON.stringify(actions);
            if (search.indexOf('false') !== -1)
                if (search.indexOf('true') !== -1)
                    return "warning";
            if (search.indexOf('false') === -1)
                return "success";
            if (search.indexOf('true') === -1)
                return "danger";
        };
        $scope.moduleName = function (name) {
            if (MESSAGE.exist('permissions.' + name.replaceAll(/\?/g, "_"))) {
                if ($scope.menuParentName(name)) {
                    return $scope.menuParentName(name) + ' - ' + MESSAGE.i('permissions.' + name.replaceAll(/\?/g, "_"));
                } else {
                    return MESSAGE.i('permissions.' + name.replaceAll(/\?/g, "_"));
                }
            } else {
                if ($scope.menuParentName(name)) {
                    return $scope.menuParentName(name) + " - " + capitalize(name.replaceAll('_', ' '));
                } else {
                    return capitalize(name.replaceAll('_', ' '));
                }
            }
        };
        $scope.menuParentName = function (name) {
            for (var i of CONFIG.menus) {
                if (i.menus) {
                    if (i.menus.length > 0) {
                        for (var j of i.menus) {
                            if (j.href.includes(name)) {
                                return i.text;
                            }
                        }
                    }
                } else if (i.href.includes(name)) {
                    return i.text
                }
            }
        };
        $scope.moduleNameShort = function (name, length) {
            var nameD = $scope.moduleName(name);
            if (nameD.length > length) {
                return nameD.substring(0, length) + "...";
            }
            return nameD;
        };
        $scope.hasProperties = function (Obj) {
            if (Obj.type === "empty") {
                if (Object.keys(Obj.allow).length > 2) {
                    return true
                } else if (Object.keys(Obj.allow.export).length === 0 && Object.keys(Obj.allow.file).length === 0) {
                    return false
                }
            } else {
                return true
            }
        };
        $scope.boolIcon = function (value) {
            return value === true ? ' icon-checkbox-checked' : ' icon-checkbox-unchecked';
        };
        $scope.isObject = function (obj) {
            return typeof obj === 'object';
        };
        $scope.savePermission = function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.saving')});
            BASEAPI.deleteall('permission', {
                "where": [
                    {
                        "value": `${$scope.idPermission}`
                    }
                ]
            }, function (deleted) {
                BASEAPI.insert('permission', {
                    "insertData": {
                        "id": `${$scope.idPermission}`,
                        "object": JSON.stringify($scope.permissions)
                    }
                }, function (insert) {
                    SWEETALERT.stop();
                    location.reload();
                });
            });
        };
    },
    format: function () {
        for (var i in CONFIG.permissions.list) {
            if (CONFIG.permissions.list[i].fix) {
                DSON.merge(
                    CONFIG.permissions.list[i].allow,
                    CONFIG.permissions.list[i].fix,
                    true);
            } else {
                DSON.merge(
                    CONFIG.permissions.list[i].allow,
                    eval(`CONFIG.permissions.types.${CONFIG.permissions.list[i].type}`),
                    true);
            }

            PERMISSIONS.entitiesCount++;
        }
        PERMISSIONS.entities = DSON.OSO(CONFIG.permissions.list);
        PERMISSIONS.mypermission = DSON.OSO(CONFIG.permissions.list);
    }
};

