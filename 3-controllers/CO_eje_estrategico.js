app.controller("eje_estrategico", function ($scope, $http, $compile) {
    eje_estrategico = this;
    var user = new SESSION().current();
    var validar = false;
    eje_estrategico.session = user;
    eje_estrategico.publica = ENUM_2.COMPANY_TYPE.publica;
    eje_estrategico.compania_id = user.compania_id;
    eje_estrategico.fixFilters = [
        {
            field: 'pei',
            operator: "=",
            value: user.estatus ? user.pei_id : 0
        }
    ];
    eje_estrategico.have_sector = true;
    RUNCONTROLLER("eje_estrategico", eje_estrategico, $scope, $http, $compile);
    eje_estrategico.plural = "Eje Estratégico";
    eje_estrategico.singular = "Eje Estratégico";

    title_header_table_pei(eje_estrategico, MESSAGE.i('planificacion.titleEjeEstrategico'));
    eje_estrategico.getPEIstatus = async function () {
        eje_estrategico.pei = await BASEAPI.listp("pei", {
            where: [{
                field: 'id',
                operator: "=",
                value: user.pei_id
            }]
        });
        if (eje_estrategico.pei.data) {
            if (eje_estrategico.pei.data.length > 0) {
                eje_estrategico.estatus_pei = eje_estrategico.pei.data[0].estatus;
                eje_estrategico.condicion_pei = eje_estrategico.pei.data[0].activo;
            }
        }
    };
    eje_estrategico.getPEIstatus();


    eje_estrategico.triggers.table.after.load = async function (records) {
        if (eje_estrategico.estatus_pei && eje_estrategico.condicion_pei == ENUM_2.pei_estatus.Inactivo) {
            eje_estrategico.setPermission("add", false);
        }
        if (eje_estrategico.estatus_pei && eje_estrategico.estatus_pei == ENUM_2.pei_estatus.Autorizado) {
            eje_estrategico.setPermission("add", false);
        }
        if (!eje_estrategico.session.sector_id) {
            eje_estrategico.have_sector = false;
            delete CRUD_objetivo_estrategico.table.columns.objetivo_sectorial;
            delete CRUD_objetivo_estrategico.table.columns.objetivos_sectoriales;
        }
        check_PEI("eje_estrategico", user.pei_id);
        eje_estrategico.runMagicOneToMany('ods_nombre_mul', 'drp_eje_estrategico_ods', 'eje_estrategico', 'nombre', 'id');
        eje_estrategico.runMagicOneToMany('pnpsp_nombre_mul', 'drp_eje_estrategico_pnpsp', 'eje_estrategico', 'nombre', 'id');
        eje_estrategico.runMagicOneToMany('end_nombre_mul', 'drp_eje_estrategico_end2', 'eje_estrategico', 'nombre', 'id');
        eje_estrategico.runMagicManyToMany('programa_sectorial', 'vw_sec_programa_sectorial',
            'eje_estrategico', 'id', 'sec_nombre', 'sec_programa_sectorial_eje_estrategico',
            'programa_sectorial', 'id')
    };
    eje_estrategico.inuse = false;
    eje_estrategico.inusemessage = function () {
        if (eje_estrategico.inuse) {
            SWEETALERT.show({
                type: 'warning',
                message: `<p>No es posible modificar ni borrar este eje estratégico, pues existen objetivos estratégicos de este eje que están relacionados a objetivos generales de la END</p> Para poder borrar deberá borrar todos sus registros relacionados.`
            });
        }
    };

    eje_estrategico.formulary = function (data, mode, defaultData) {
        eje_estrategico.inuse = false;
        if (eje_estrategico !== undefined) {
            RUN_B("eje_estrategico", eje_estrategico, $scope, $http, $compile);
            eje_estrategico.form.titles = {
                new: "Nuevo - " + eje_estrategico.singular,
                edit: "Editar - " + eje_estrategico.singular,
                view: "Ver ALL - " + eje_estrategico.singular
            };

            eje_estrategico.form.schemas.insert = {};
            eje_estrategico.form.schemas.select = {};

            eje_estrategico.form.readonly = {pei: user.pei_id};
            eje_estrategico.createForm(data, mode, defaultData);
            validar = false;
            eje_estrategico.$scope.$watch('eje_estrategico.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(eje_estrategico, "nombre", rules);
            });

            eje_estrategico.$scope.$watch('eje_estrategico.aliniacion_end', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(eje_estrategico, "aliniacion_end", rules);
            });
            eje_estrategico.$scope.$watch('eje_estrategico.aliniacion_pnpsp', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(eje_estrategico, "aliniacion_pnpsp", rules);
            });
            eje_estrategico.$scope.$watch('eje_estrategico.aliniacion_ods', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(eje_estrategico, "aliniacion_ods", rules);
            });
            eje_estrategico.$scope.$watch('eje_estrategico.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(eje_estrategico, "descripcion", rules)
            });

            eje_estrategico.triggers.table.after.control = function (data) {
                if (data === "aliniacion_end_mul") {
                    if (validar === false && mode === "edit" && eje_estrategico.id !== undefined) {
                        validar = true;
                        BASEAPI.list('alineacionoe', {
                            limit: 0,
                            orderby: 'id',
                            order: "asc",
                            where: [
                                {
                                    "field": "id",
                                    "value": eje_estrategico.id
                                },
                                {
                                    "field": "end",
                                    "value": eje_estrategico.aliniacion_end_mul
                                }
                            ]
                        }, function (result) {
                            if (result.data.length > 0) {
                                // eje_estrategico.inuse = true;
                                // eje_estrategico.form.options.aliniacion_end_mul.disabled = true;
                            }
                            eje_estrategico.refreshAngular();
                        });
                    }
                }
            };
        }
    };
});
