app.controller("resumen_pei_poa", function ($scope, $http, $compile) {
    resumen_pei_poa = this;
    resumen_pei_poa.destroyForm = false;
    resumen_pei_poa.session = new SESSION().current();
    RUNCONTROLLER("resumen_pei_poa", resumen_pei_poa, $scope, $http, $compile);

    resumen_pei_poa.active_indi_pei = "";
    resumen_pei_poa.active_mat_pei = "";
    resumen_pei_poa.active_indi_poa = "";
    resumen_pei_poa.active_mat_poa = "";

    resumen_pei_poa.see_indicador_pei = function () {
        return resumen_pei_poa.allow(['see_indicador_pei']);
    }
    resumen_pei_poa.see_matriz_pei = function () {
        return resumen_pei_poa.allow(['see_matriz_pei']);
    }
    resumen_pei_poa.see_indicador_poa = function () {
        return resumen_pei_poa.allow(['see_indicador_poa']);
    }
    resumen_pei_poa.see_matriz_poa = function () {
        return resumen_pei_poa.allow(['see_matriz_poa']);
    }
    resumen_pei_poa.see_indicador_actividad = function () {
        return resumen_pei_poa.allow(['see_indicador_actividad']);
    }
    resumen_pei_poa.see_matriz_actividad = function () {
        return resumen_pei_poa.allow(['see_matriz_actividad']);
    }
    //+++++++
    resumen_pei_poa.mostrar_indicador_pei = async function () {
        if (await resumen_pei_poa.see_indicador_pei()) {
            resumen_pei_poa.active_indi_pei = "active";
            resumen_pei_poa.active_mat_pei = "";
            resumen_pei_poa.active_indi_poa = "";
            resumen_pei_poa.active_mat_poa = "";
            // await resumen_pei.resumen_pei_get();
            resumen_pei_poa.refreshAngular();
        }
        return resumen_pei_poa.allow(['see_indicador_pei']);
    }
    resumen_pei_poa.mostrar_matriz_pei = async function () {
        if (await resumen_pei_poa.see_matriz_pei()) {
            resumen_pei_poa.active_indi_pei = "";
            resumen_pei_poa.active_mat_pei = "active";
            resumen_pei_poa.active_indi_poa = "";
            resumen_pei_poa.active_mat_poa = "";
            await resumen_indicador_pei.resumen_indicador_pei_get();
            resumen_pei_poa.refreshAngular();
        }
        return resumen_pei_poa.allow(['see_matriz_pei']);
    }
    resumen_pei_poa.mostrar_indicador_poa = async function () {
        if (await resumen_pei_poa.see_indicador_poa()) {
            resumen_pei_poa.active_indi_pei = "";
            resumen_pei_poa.active_mat_pei = "";
            resumen_pei_poa.active_indi_poa = "active";
            resumen_pei_poa.active_mat_poa = "";
            resumen_pei_poa.refreshAngular();
        }
        return resumen_pei_poa.allow(['see_indicador_poa']);
    }
    resumen_pei_poa.mostrar_matriz_poa = async function () {
        if (await resumen_pei_poa.see_matriz_poa()) {
            resumen_pei_poa.active_indi_pei = "";
            resumen_pei_poa.active_mat_pei = "";
            resumen_pei_poa.active_indi_poa = "";
            resumen_pei_poa.active_mat_poa = "active";
            await resumen_indicador_poa.resumen_indicador_poa_get();
            resumen_pei_poa.refreshAngular();
        }
        return resumen_pei_poa.allow(['see_matriz_poa']);
    }
    resumen_pei_poa.mostrar_indicador_actividad = async function () {
        if (await resumen_pei_poa.see_indicador_actividad()) {
            resumen_pei_poa.active_indi_pei = "";
            resumen_pei_poa.active_mat_pei = "";
            resumen_pei_poa.active_indi_poa = "active";
            resumen_pei_poa.active_mat_poa = "";
            await resumen_indicador_actividad.resumen_indicador_actividad_get();
            resumen_pei_poa.refreshAngular();
        }
        return resumen_pei_poa.allow(['see_indicador_actividad']);
    }

});