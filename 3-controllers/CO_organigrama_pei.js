app.controller("organigrama_pei", function ($scope, $http, $compile) {
    organigrama_pei = this;
    organigrama_pei.destroyForm = false;
    organigrama_pei.session = new SESSION().current();
    //organigrama_pei.fixFilters = [];
    //organigrama_pei.singular = "singular";
    //organigrama_pei.plural = "plural";
    organigrama_pei.headertitle = organigrama_pei.session.tipo_institucion == 1 ? "Alineación PEI - Instrumentos de Planificación Nacional (RESUMEN)": "Alineación Planificación Estratégica";
    //organigrama_pei.destroyForm = false;
    //organigrama_pei.permissionTable = "tabletopermission";
    RUNCONTROLLER("organigrama_pei", organigrama_pei, $scope, $http, $compile);
    RUN_B("organigrama_pei", organigrama_pei, $scope, $http, $compile);
    organigrama_pei.$scope.$watch("organigrama_pei.eje_estrategico", function (value) {
        if (organigrama_pei.form.selected('eje_estrategico')){
            organigrama_pei.origen = organigrama_pei.form.selected('eje_estrategico').id;
            organigrama_pei.key = undefined;
            organigrama_pei.type = undefined;
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = true;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false
            organigrama_pei.show_indBtn = false;
        }else {
            organigrama_pei.show_ejeBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'eje_estrategico', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.end", function (value) {
        if (organigrama_pei.form.selected('end')){
            organigrama_pei.origen = eval(organigrama_pei.form.selected('end').ejes_estrategico);
            organigrama_pei.origen.length = 1;
            organigrama_pei.key = `END${organigrama_pei.form.selected('end').id}`;
            organigrama_pei.type = 'END';
            organigrama_pei.childrenArray = ['END'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = true;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false;
            organigrama_pei.show_indBtn = false;
        }else {
            organigrama_pei.show_endBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'end', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.ods", function (value) {
        if (organigrama_pei.form.selected('ods')){
            organigrama_pei.origen = eval(organigrama_pei.form.selected('ods').ejes_estrategico);
            organigrama_pei.prueba = eval(organigrama_pei.form.selected('ods').ejes_estrategico);
            organigrama_pei.origen.length = 1;
            organigrama_pei.key = `ODS${organigrama_pei.form.selected('ods').id}`;
            organigrama_pei.type = 'ODS';
            organigrama_pei.childrenArray = ['ODS'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_odsBtn = true;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false
            organigrama_pei.show_indBtn = false;
        }else{
            organigrama_pei.show_odsBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'end', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.pnpsp", function (value) {
        if (organigrama_pei.form.selected('pnpsp')){
            organigrama_pei.origen = eval(organigrama_pei.form.selected('pnpsp').ejes_estrategico);
            organigrama_pei.origen.length = 1;
            organigrama_pei.key = `PNPSP${organigrama_pei.form.selected('pnpsp').id}`;
            organigrama_pei.type = 'PNPSP';
            organigrama_pei.childrenArray = ['PNPSP'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_pnpspBtn = true;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false
            organigrama_pei.show_indBtn = false;
        }else {
            organigrama_pei.show_pnpspBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'end', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.objetivo_estrategico", function (value) {
        if (organigrama_pei.form.selected('objetivo_estrategico')){
            organigrama_pei.origen = organigrama_pei.form.selected('objetivo_estrategico').eje_estrategico_id;
            organigrama_pei.key = `OBJ${organigrama_pei.form.selected('objetivo_estrategico').id}`;
            organigrama_pei.type = 'OBJ';
            organigrama_pei.childrenArray = ['OBJ_EST','EST','LA','LA_RES','RES_EST','RES','OEF_OBJ','OBJ_OE','OE','OES_EST','OES','IND','IND_RES','OBJ','CNI_RES','CN','CN_RES','CI','CI_RES','SUS_RES','SUS','POL_OBJ','POL','OBJ_OEF','OEF'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = true;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false;
            organigrama_pei.show_indBtn = false;
        }else{
            organigrama_pei.show_objBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'objetivo_estrategico', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.objetivo_especifico", function (value) {
        if (organigrama_pei.form.selected('objetivo_especifico')){
            organigrama_pei.origen = organigrama_pei.form.selected('objetivo_especifico').eje_estrategico;
            organigrama_pei.key = `OEF${organigrama_pei.form.selected('objetivo_especifico').id}`;
            organigrama_pei.type = 'OEF';
            organigrama_pei.childrenArray = ['OEF'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = true;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false;
            organigrama_pei.show_indBtn = false;
        }else{
            organigrama_pei.show_objesBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'objetivo_estrategico', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.politica", function (value) {
        if (organigrama_pei.form.selected('politica')){
            organigrama_pei.origen = eval(organigrama_pei.form.selected('politica').eje_estrategico);
            organigrama_pei.origen.length = 1;
            organigrama_pei.key = `POL${organigrama_pei.form.selected('politica').id}`;
            organigrama_pei.type = 'POL';
            organigrama_pei.childrenArray = ['POL'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = true;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false;
            organigrama_pei.show_indBtn = false;
        }else{
            organigrama_pei.show_politicaBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'objetivo_estrategico', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.estrategia", function (value) {
        if (organigrama_pei.form.selected('estrategia')){
            organigrama_pei.origen = organigrama_pei.form.selected('estrategia').eje_estrategico_id;
            organigrama_pei.key = `EST${organigrama_pei.form.selected('estrategia').id}`;
            organigrama_pei.type = 'EST';
            organigrama_pei.childrenArray = ['EST','RES_EST','RES','LA_RES','LA','OE','OES_EST','OES','IND','IND_RES','CNI_RES','CN_RES','CI_RES','CI','CN','SUS_RES','SUS'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = true;
            organigrama_pei.show_resBtn = false;
            organigrama_pei.show_indBtn = false;
        }else {
            organigrama_pei.show_estBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'estrategia', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.resultado", function (value) {
        if (organigrama_pei.form.selected('resultado')){
            organigrama_pei.origen = organigrama_pei.form.selected('resultado').eje_estrategico;
            organigrama_pei.key = `RES${organigrama_pei.form.selected('resultado').id}`;
            organigrama_pei.type = 'RES';
            organigrama_pei.childrenArray = ['LA_RES','RES','OE','IND','IND_RES','CNI_RES','CN_RES','CI_RES','CI','CN','SUS_RES','SUS'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.indicador = '[NULL]';
            organigrama_pei.form.loadDropDown('indicador');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = true;
            organigrama_pei.show_indBtn = false;
        }else{
            organigrama_pei.show_resBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'resultado', rules);
    });
    organigrama_pei.$scope.$watch("organigrama_pei.indicador", function (value) {
        if (organigrama_pei.form.selected('indicador')){
            organigrama_pei.origen = organigrama_pei.form.selected('indicador').id_eje_estrategico;
            organigrama_pei.key = `IND${organigrama_pei.form.selected('indicador').id}`;
            organigrama_pei.type = 'IND';
            organigrama_pei.childrenArray = ['OE','IND'];
            organigrama_pei.eje_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('eje_estrategico');
            organigrama_pei.end = '[NULL]';
            organigrama_pei.form.loadDropDown('end');
            organigrama_pei.ods = '[NULL]';
            organigrama_pei.form.loadDropDown('ods');
            organigrama_pei.pnpsp = '[NULL]';
            organigrama_pei.form.loadDropDown('pnpsp');
            organigrama_pei.objetivo_estrategico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_estrategico');
            organigrama_pei.objetivo_especifico = '[NULL]';
            organigrama_pei.form.loadDropDown('objetivo_especifico');
            organigrama_pei.politica = '[NULL]';
            organigrama_pei.form.loadDropDown('politica');
            organigrama_pei.estrategia = '[NULL]';
            organigrama_pei.form.loadDropDown('estrategia');
            organigrama_pei.resultado = '[NULL]';
            organigrama_pei.form.loadDropDown('resultado');
            organigrama_pei.show_ejeBtn = false;
            organigrama_pei.show_endBtn = false;
            organigrama_pei.show_odsBtn = false;
            organigrama_pei.show_pnpspBtn = false;
            organigrama_pei.show_objBtn = false;
            organigrama_pei.show_objesBtn = false;
            organigrama_pei.show_politicaBtn = false;
            organigrama_pei.show_estBtn = false;
            organigrama_pei.show_resBtn = false;
            organigrama_pei.show_indBtn = true;
        }else {
            organigrama_pei.show_indBtn = false;
        }
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(organigrama_pei, 'indicador', rules);
    });
    organigrama_pei.formulary = function (data, mode, defaultData) {
        if (organigrama_pei !== undefined) {

            organigrama_pei.form.modalWidth = ENUM.modal.width.full;
            organigrama_pei.form.readonly = {};
            organigrama_pei.createForm(data, mode, defaultData);

        }
    }
    organigrama_pei.openMyModal = function () {
        baseController.modal.modalView("vw_chart_eje/Graph", {
            width: "modal-fullXL",
            header: {
                title: "Organigrama PEI",
                icon: "tree7"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: 'vw_chart_eje'
            }
        });
    }
});