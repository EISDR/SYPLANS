app.controller("asignacion_especial_poa_monitoreo", function ($scope, $http, $compile) {
    asignacion_especial_poa_monitoreo = this;
    var session = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo = "";
    var cuerpo = "";
    asignacion_especial_poa_monitoreo.id_user_msj = [];
    asignacion_especial_poa_monitoreo.correo_user_msj = [];
    asignacion_especial_poa_monitoreo.id_actividad = [];
    asignacion_especial_poa_monitoreo.fileSI = [];
    asignacion_especial_poa_monitoreo.poa_id = session.poa_id === null ? 0 : session.poa_id;
    asignacion_especial_poa_monitoreo.current_user_group = session.groups;
    asignacion_especial_poa_monitoreo.CURRENT_USER_GROUP = asignacion_especial_poa_monitoreo.current_user_group.length > 0 ? asignacion_especial_poa_monitoreo.current_user_group[0].group : 0;
    TRIGGER.run(asignacion_especial_poa_monitoreo);
    asignacion_especial_poa_monitoreo.triggers.table.after.load = async function (records) {
        asignacion_especial_poa_monitoreo.fileSI = [];
        for (var items of records.data) {
            asignacion_especial_poa_monitoreo.files = () => new Promise(async (resolve, reject) => {
                BASEAPI.ajax.get(new HTTP().path(["files", "api"]), {folder: '/asignacion_especial_poa_monitoreo/asignacionfile/' + items.id}, function (result) {
                    if (result.data.count > 0) {
                        asignacion_especial_poa_monitoreo.fileSI.push({id: items.id});
                        resolve(true);
                    } else {
                        var buttons = document.getElementsByClassName("btn btn-labeled");
                        for(var item of buttons){
                            item.disabled = false;
                        }
                        resolve(false);
                    }
                }, $('#invisible'));
                // SWEETALERT.stop();
            });
            await asignacion_especial_poa_monitoreo.files();
            asignacion_especial_poa_monitoreo.refreshAngular();

        }
    };
    asignacion_especial_poa_monitoreo.triggers.table.after.close = function (data) {
        //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
        asignacion_especial_poa_monitoreo.refresh();
    };
    RUNCONTROLLER("asignacion_especial_poa_monitoreo", asignacion_especial_poa_monitoreo, $scope, $http, $compile);
    asignacion_especial_poa_monitoreo.singular = "Asignación Especial T";
    asignacion_especial_poa_monitoreo.plural = MESSAGE.i('planificacion.titleAsignacion');
    asignacion_especial_poa_monitoreo.fixFilters = [{
        field: "poa_id",
        operator: "=",
        value: asignacion_especial_poa_monitoreo.poa_id
    }];
    if (asignacion_especial_poa_monitoreo.CURRENT_USER_GROUP == "2" || asignacion_especial_poa_monitoreo.CURRENT_USER_GROUP == "7") {
        asignacion_especial_poa_monitoreo.fixFilters.push(
            {
                field: "id_departamento",
                operator: "=",
                value: session.departamento
            }
        );
    }
    if (session.poa_id){
        asignacion_especial_poa_monitoreo.headertitle = "Actualización de indicador / "+MESSAGE.i('planificacion.titleAsignacionEspecialTrabajar')+" / "+new SESSION().current().periodo_pei_msj +" /  "+new SESSION().current().periodo_poa_msj;
    } else if(session.pei_id) {
        asignacion_especial_poa_monitoreo.headertitle = "Actualización de indicador / "+MESSAGE.i('planificacion.titleAsignacionEspecialTrabajar')+" / "+new SESSION().current().periodo_pei_msj;
    } else {
        asignacion_especial_poa_monitoreo.headertitle = "Actualización de indicador / "+MESSAGE.i('planificacion.titleAsignacionEspecialTrabajar')+" / PEI ";
    }
    // asignacion_especial_poa_monitoreo.headertitle = MESSAGE.i('planificacion.titleAsignacionEspecialT')+" / PEI "+new SESSION().current().periodo_desde +" - " +new SESSION().current().periodo_hasta+ " / POA "+new SESSION().current().periodo_poa;

    asignacion_especial_poa_monitoreo.formulary = function (data, mode, defaultData) {
        if (asignacion_especial_poa_monitoreo !== undefined) {
            RUN_B("asignacion_especial_poa_monitoreo", asignacion_especial_poa_monitoreo, $scope, $http, $compile);
            asignacion_especial_poa_monitoreo.form.titles = {
                new: MESSAGE.i('planificacion.titleAsignacion'),
                edit: `${MESSAGE.i('planificacion.titleTrabajar')}`+" - "+`${MESSAGE.i('planificacion.titleAsignacion')}`,
                view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleAsignacion')}`
            };
            // implementacion de las notificaciones a la persona que la creo begin
            asignacion_especial_poa_monitoreo.form.after.update = function (data) {
                asignacion_especial_poa_monitoreo.id_user_msj = [];
                asignacion_especial_poa_monitoreo.array_grupos = [];
                var usuario = asignacion_especial_poa_monitoreo.form.selected('responsable');
                var nombre_data = asignacion_especial_poa_monitoreo.nombre;
                if (data.updating.estatus == ENUM_2.asignacion_especial_estatus.Completado.toString()){
                    titulo_push = `Se ha completado la asignación especial: "${nombre_data}"`;
                    cuerpo_push = `${usuario.nombre +' '+usuario.apellido} se ha completado la asignación especial: "${nombre_data}" asignada a usted.`;
                    titulo = `Se ha completado la asignación especial: "${nombre_data}"`;
                    cuerpo = `${usuario.nombre +' '+usuario.apellido} se ha completado la asignación especial: "${nombre_data}" asignada a usted.`;
                    asignacion_especial_poa_monitoreo.data_json2 = {
                        title: titulo_push,
                        content: cuerpo_push,
                        user: [asignacion_especial_poa_monitoreo.form.selected('responsable').id],
                        url: 'actividades_poa_monitoreo'
                    };
                    send_notification.send.send(asignacion_especial_poa_monitoreo.data_json2);
                    asignacion_especial_poa_monitoreo.data_json_email2 = {
                        to: asignacion_especial_poa_monitoreo.form.selected('responsable').correo,
                        subject: titulo,
                        name_show: "NoReply",
                        template: 'email/plane',
                        message: cuerpo,
                        notification: 'no'
                    };
                    // send_notification.send.email(asignacion_especial_poa_monitoreo.data_json_email2);
                    function_send_email_director_user(titulo_push,cuerpo_push,titulo,cuerpo,session.compania_id,asignacion_especial_poa_monitoreo.departamento_solicitado, asignacion_especial_poa_monitoreo.form.selected('responsable').correo,session.institucion_id);
                }
            };
            // end
            asignacion_especial_poa_monitoreo.form.readonly = {poa: asignacion_especial_poa_monitoreo.poa_id};
            asignacion_especial_poa_monitoreo.createForm(data, mode, defaultData);

            asignacion_especial_poa_monitoreo.$scope.$watch('asignacion_especial_poa_monitoreo.comentario',function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(asignacion_especial_poa_monitoreo, "comentario", rules)
            });
        }
    };

});