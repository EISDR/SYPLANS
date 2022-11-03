app.controller("clientes_institucion", function ($scope, $http, $compile) {
    clientes_institucion = this;
    var session = new SESSION().current();
    clientes_institucion.pei_id = session.pei_id === null ? 0 : session.pei_id;

    clientes_institucion.fixFilters = [{
        "field": "pei",
        "value": clientes_institucion.pei_id
    }];

    RUNCONTROLLER("clientes_institucion", clientes_institucion, $scope, $http, $compile);
    clientes_institucion.plural = "Grupos de Interés";
    clientes_institucion.singular = "Grupo de Interés";

    title_header_table_pei(clientes_institucion, MESSAGE.i('planificacion.titleClientes'));
    clientes_institucion.triggers.table.after.load = function (record) {
        clientes_institucion.runMagicOneToMany('cliente_id', 'clientes_compromisos', 'cliente', 'compromiso', 'id');
        clientes_institucion.refreshAngular();
        check_active_PEI(session.pei_id);
    };

    clientes_institucion.triggers.table.after.audit = () => new Promise(async (resolve, reject) => {
        console.log("Para copiar", Object.keys(dragon_audit.dataForView.dataJson));
        dragon_audit.dataForView.dataJson.pei = await clientes_institucion.runMagicColumAudit('pei', dragon_audit.dataForView.dataJson.pei);
        if (dragon_audit.dataForView.updatedJson)
            dragon_audit.dataForView.updatedJson.pei = await clientes_institucion.runMagicColumAudit('pei', dragon_audit.dataForView.updatedJson.pei);
        dragon_audit.dataForView.dataJson = DSON.removeOther(dragon_audit.dataForView.dataJson, ["pei", "nombre", "compromiso_institucional"]);
        resolve(true);
    });
    clientes_institucion.formulary = function (data, mode, defaultData) {
        if (clientes_institucion !== undefined) {
            RUN_B("clientes_institucion", clientes_institucion, $scope, $http, $compile);
            clientes_institucion.form.titles = {
                new: clientes_institucion.singular,
                edit: "Editar - " + clientes_institucion.singular,
                view: "Ver ALL - " + clientes_institucion.singular
            };

            clientes_institucion.form.before.insert = function (data) {
                if (clientes_institucion.pei_id === 0) {
                    SWEETALERT.show({
                        title: MESSAGE.i('planificacion.titleCliente'),
                        message: "No existe un periodo PEI activo",
                        confirm: function () {
                            SWEETALERT.stop();
                        }
                    });
                    return true;
                }
            };

            clientes_institucion.form.readonly = {pei: clientes_institucion.pei_id};
            clientes_institucion.createForm(data, mode, defaultData);
            clientes_institucion.triggers.table.after.control = function (data) {
                if (data === 'descripcion') {
                    if (typeof clientes_compromisos != 'undefined') {
                        if (clientes_compromisos) {
                            clientes_compromisos.setPermission("add", true);
                            clientes_compromisos.setPermission("edit", true);
                            clientes_compromisos.setPermission("remove", true);
                            clientes_compromisos.setPermission("view", true);
                            clientes_compromisos.setPermission("import", true);
                            clientes_compromisos.setPermission("actions", true);
                        }
                    }
                }
            };
            clientes_institucion.$scope.$watch('clientes_institucion.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(clientes_institucion, "nombre", rules)
            });
            clientes_institucion.$scope.$watch('clientes_institucion.compromiso_institucional', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(clientes_institucion, "compromiso_institucional", rules)
            });
        }
    }
});
