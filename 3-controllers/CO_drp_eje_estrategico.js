app.controller("drp_eje_estrategico", function ($scope, $http, $compile) {
    drp_eje_estrategico = this;
    drp_eje_estrategico.session = new SESSION().current();
    var session = new SESSION().current();
    drp_eje_estrategico.compania_id = session.compania_id;
    drp_eje_estrategico.publica = ENUM_2.COMPANY_TYPE.publica;
    drp_eje_estrategico.fixFilters = [
        {
            field: 'pei',
            operator: "=",
            value: session.estatus ? session.pei_id : 0
        }
    ];
    RUNCONTROLLER("drp_eje_estrategico", drp_eje_estrategico, $scope, $http, $compile);
    drp_eje_estrategico.plural = " " + MESSAGE.i('planificacion.titleEjeEstrategicos');
    drp_eje_estrategico.singular = "Eje Estratégico";
    drp_eje_estrategico.headertitle = MESSAGE.i('planificacion.titleEjeEstrategicos');
    getPEIstatus(drp_eje_estrategico, session.pei_id);
    drp_eje_estrategico.getPEIstatus = async function() {
        drp_eje_estrategico.comprobar = await BASEAPI.listp("pei", {
            where: [{
                field: 'id',
                operator: "=",
                value: session.pei_id
            }]
        });
        // drp_eje_estrategico.estatus_pei = drp_eje_estrategico.comprobar.data[0].estatus;
        drp_eje_estrategico.condicion_pei = drp_eje_estrategico.comprobar.data[0].activo;
    };
    drp_eje_estrategico.getPEIstatus();
    drp_eje_estrategico.triggers.table.after.load = async function (records) {
        if (drp_eje_estrategico.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            drp_eje_estrategico.setPermission("add",false);
        }
        if (session.tipo_institucion !== ENUM_2.COMPANY_TYPE.publica){
            CRUD_drp_eje_estrategico.table.columns.end_nombre.visible = false;
            CRUD_drp_eje_estrategico.table.columns.end_nombre.visible = false;
            CRUD_drp_eje_estrategico.table.columns.pnpsp_nombre.visible = false;
            CRUD_drp_eje_estrategico.table.columns.ods_nombre.visible = false;
            CRUD_drp_eje_estrategico.table.columns.end_nombre.visibleDetail = false;
            CRUD_drp_eje_estrategico.table.columns.pnpsp_nombre.visibleDetail = false;
            CRUD_drp_eje_estrategico.table.columns.ods_nombre.visibleDetail = false;
            CRUD_drp_eje_estrategico.table.columns.end_nombre.export = false;
            CRUD_drp_eje_estrategico.table.columns.pnpsp_nombre.export = false;
            CRUD_drp_eje_estrategico.table.columns.ods_nombre.export = false;
            CRUD_drp_eje_estrategico.table.columns.end_nombre.exportExample = false;
            CRUD_drp_eje_estrategico.table.columns.pnpsp_nombre.exportExample = false;
            CRUD_drp_eje_estrategico.table.columns.ods_nombre.exportExample = false;

            CRUD_drp_eje_estrategico.table.filters.columns.splice(3, 3);
        }
        check_PEI("drp_eje_estrategico", session.pei_id);
        drp_eje_estrategico.runMagicOneToMany('ods_nombre_mul', 'drp_eje_estrategico_ods', 'eje_estrategico', 'nombre', 'id');
        drp_eje_estrategico.runMagicOneToMany('pnpsp_nombre_mul', 'drp_eje_estrategico_pnpsp', 'eje_estrategico', 'nombre', 'id');
        drp_eje_estrategico.runMagicOneToMany('end_nombre_mul', 'drp_eje_estrategico_end2', 'eje_estrategico', 'nombre', 'id');
    };
    drp_eje_estrategico.formulary = function (data, mode, defaultData) {
        if (drp_eje_estrategico !== undefined) {
            RUN_B("drp_eje_estrategico", drp_eje_estrategico, $scope, $http, $compile);

            drp_eje_estrategico.form.titles = {
                new: MESSAGE.i('planificacion.titleEjeEstrategico'),
                edit: "Editar - "+` ${MESSAGE.i('planificacion.titleEjeEstrategico')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleEjeEstrategico')}`
            };
            // drp_eje_estrategico.form.readonly = {pei:new SESSION().current().pei_id};
            drp_eje_estrategico.createForm(data, mode, defaultData);
            drp_eje_estrategico.$scope.$watch('drp_eje_estrategico.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(drp_eje_estrategico, "nombre", rules);
            });

            drp_eje_estrategico.$scope.$watch('drp_eje_estrategico.no_orden', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico, "no_orden", rules);
            });

            drp_eje_estrategico.$scope.$watch('drp_eje_estrategico.aliniacion_end', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico, "aliniacion_end", rules);
            });

            drp_eje_estrategico.$scope.$watch('drp_eje_estrategico.aliniacion_pnpsp', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico, "aliniacion_pnpsp", rules);
            });

            drp_eje_estrategico.$scope.$watch('drp_eje_estrategico.aliniacion_ods', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(drp_eje_estrategico, "aliniacion_ods", rules);
            });
        }
    };
    drp_eje_estrategico.triggers.table.after.control = function (data) {
        if (data === "pei") {
            drp_eje_estrategico.pei = session.pei_id + "";
        }
        //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    };
});
