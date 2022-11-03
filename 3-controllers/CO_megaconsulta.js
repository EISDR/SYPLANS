app.controller("megaconsulta", function ($scope, $http, $compile) {
    megaconsulta = this;
    var session = new SESSION().current();
    megaconsulta.session = session;
    RUNCONTROLLER("megaconsulta", megaconsulta, $scope, $http, $compile);
    RUN_B("megaconsulta", megaconsulta, $scope, $http, $compile);
    megaconsulta.headertitle = MESSAGE.i('planificacion.title_mega_consulta');
    megaconsulta.active_m_o = 'active';
    megaconsulta.active_pe_po = '';

    megaconsulta.evaluate_pei = function () {
        if (typeof mega_ejeestrategico !== "undefined")
            return (mega_ejeestrategico.allow(['mega_option']) || mega_comentarios_pei.allow(['mega_option']) || mega_indicadores_pei.allow(['mega_option']) || mega_resultado_esperado.allow(['mega_option']) || mega_estrategia.allow(['mega_option']) || mega_objetivoestrategico.allow(['mega_option']));
        return false;
    };
    megaconsulta.evaluate_poa = function () {
        if (typeof mega_presupuesto_aprobado !== "undefined")
            return (mega_presupuesto_aprobado.allow(['mega_option']) || mega_producto.allow(['mega_option']) || mega_actividades.allow(['mega_option']) || mega_actividades_asociadas.allow(['mega_option']) || mega_indicadores_poa.allow(['mega_option']) || mega_comentarios_poa.allow(['mega_option']));
        return false;
    };
    megaconsulta.mostrar_pei = function () {
        if (!megaconsulta.evaluate_poa()) {
            megaconsulta.active_pe_po = '';
            megaconsulta.active_m_o = 'active';
        }
    };
    megaconsulta.mostrar_poa = function () {
        if (!megaconsulta.evaluate_pei()) {
            megaconsulta.active_m_o = '';
            megaconsulta.active_pe_po = 'active';
        }
    };
    megaconsulta.click_en_poa = function () {
        mega_comentarios_poa.get_departamento();
    };
    // by diomedes
    if (typeof poa_admin != 'undefined') {
        if (typeof poa_admin != 'not define') {
            if (poa_admin) {
                if (poa_admin.sin_fin) {
                    megaconsulta.active_m_o = '';
                    megaconsulta.active_pe_po = 'active';
                }
                if (typeof filtros_poa != 'undefined') {
                    if (typeof filtros_poa != 'not define') {
                        if (filtros_poa) {
                            if (filtros_poa.form.selected('poa') && filtros_poa.form.selected('pei')) {
                                $('.modal-title').html(MESSAGE.i('planificacion.title_mega_consulta') + " / PEI " + filtros_pei.form.selected('pei').periodo_desde + " - " + filtros_pei.form.selected('pei').periodo_hasta + " / POA " + filtros_poa.form.selected('poa').periodo_poa);
                            } else {
                                if (filtros_poa.form.selected('pei')) {
                                    $('.modal-title').html(MESSAGE.i('planificacion.title_mega_consulta') + " / PEI " + filtros_pei.form.selected('pei').periodo_desde + " - " + filtros_pei.form.selected('pei').periodo_hasta);
                                } else {
                                    $('.modal-title').html(MESSAGE.i('planificacion.title_mega_consulta'));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (typeof autorizar_pei != 'undefined') {
        if (typeof autorizar_pei != 'not define') {
            if (autorizar_pei) {
                if (typeof filtros_poa != 'undefined') {
                    if (typeof filtros_poa != 'not define') {
                        if (filtros_poa) {
                            if (filtros_poa.form.selected('poa') && filtros_poa.form.selected('pei')) {
                                $('.modal-title').html(MESSAGE.i('planificacion.title_mega_consulta') + " / PEI " + filtros_pei.form.selected('pei').periodo_desde + " - " + filtros_pei.form.selected('pei').periodo_hasta + " / POA " + filtros_poa.form.selected('poa').periodo_poa);
                            } else {
                                if (filtros_poa.form.selected('pei')) {
                                    $('.modal-title').html(MESSAGE.i('planificacion.title_mega_consulta') + " / PEI " + filtros_pei.form.selected('pei').periodo_desde + " - " + filtros_pei.form.selected('pei').periodo_hasta);
                                } else {
                                    $('.modal-title').html(MESSAGE.i('planificacion.title_mega_consulta'));
                                }
                            }
                        }
                    }
                }
            }
        }
    }


});
