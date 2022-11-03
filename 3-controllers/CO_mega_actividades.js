app.controller("mega_actividades", function ($scope, $http, $compile) {
    mega_actividades = this;
    mega_actividades.fileSI = [];

    TRIGGER.run(mega_actividades);
    mega_actividades.triggers.table.after.load = async function (records) {
        mega_actividades.fileSI = [];
        for (var items of records.data) {
            mega_actividades.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/actividades_poa_monitoreo/actividadfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        mega_actividades.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
            });
            await mega_actividades.files();
            mega_actividades.refreshAngular();
        }
    };
    mega_actividades.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        mega_actividades.refresh();
    };
    RUNCONTROLLER("mega_actividades", mega_actividades, $scope, $http, $compile);
    RUN_B("mega_actividades", mega_actividades, $scope, $http, $compile);
    mega_actividades.headertitle = MESSAGE.i('planificacion.title_mega_actividades');
    mega_actividades.singular = 'Actividades';
    mega_actividades.plural = 'Actividades';
    mega_actividades.fixFilters = [
        {
            "field": "id",
            "operator": "=",
            "value": "0"
        }
    ];
    mega_actividades.filter_mega_actividades = () => new Promise ( async (resolve, reject) => {
        mega_actividades.fixFilters = [];
        mega_actividades.fixFilters.push({
            "field": "poa",
            "operator": "=",
            "value": filtros_poa.poa
        });
        if (!DSON.oseaX(filtros_pei.eje_estrategico_pei)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'id_eje_estrategico',
                    value: filtros_pei.eje_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.objetivo_estrategico_pei)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'id_objetivo_estrategico',
                    value: filtros_pei.objetivo_estrategico_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.estrategia_pei)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'id_estrategia',
                    value: filtros_pei.estrategia_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_pei.resultado_pei)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'id_resultado',
                    value: filtros_pei.resultado_pei
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.departamento)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'departamento',
                    operator: '=',
                    value: filtros_poa.departamento
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.productos_poa)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'producto',
                    operator: '=',
                    value: filtros_poa.productos_poa
                }
            );
        }
        if (!DSON.oseaX(filtros_poa.actividades_poa)) {
            mega_actividades.fixFilters.push(
                {
                    field: 'id',
                    operator: '=',
                    value: filtros_poa.actividades_poa
                }
            );
        }
        resolve(1);
    });
    mega_actividades.formulary = function (data, mode, defaultData) {
        if (mega_actividades !== undefined) {
            RUN_B("mega_actividades", mega_actividades, $scope, $http, $compile);
            mega_actividades.form.titles = {
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.title_mega_actividades_asociadas')}`
            };
            mega_actividades.createForm(data, mode, defaultData);
        }
    };
    mega_actividades.openCommentModal = function (comment, actividad) {
        mega_actividades.rs_comment = comment;
        mega_actividades.rs_actividad = actividad;
        mega_actividades.modal.modalView("mega_actividades/comment", {
            width: 'modal-full',
            header: {
                title: `Comentario - Actividad ` + mega_actividades.rs_actividad,
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            }
        });
    }

});