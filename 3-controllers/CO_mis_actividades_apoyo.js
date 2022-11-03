app.controller("mis_actividades_apoyo", function ($scope, $http, $compile) {
    mis_actividades_apoyo = this;
    mis_actividades_apoyo.id_actividad = [];
    prueba = "";
    mis_actividades_apoyo.reonly = {};
    mis_actividades_apoyo.showMsjSi = false;
    mis_actividades_apoyo.showMsjNo = false;
    var session = new SESSION();


    mis_actividades_apoyo.fixFilters = [];

    var carac = undefined;
    if (new SESSION().current().groups.length > 0)
        carac = new SESSION().current().groups[0] ? new SESSION().current().groups[0].caracteristica : '';
    var mydepa = new SESSION().current().departamento;
    var myID = new SESSION().current().getID();
    mynewCondition = [];

    if (carac === "DP") {
        mis_actividades_apoyo.fixFilters.push({field: 'departamento', value: mydepa});
    } else if (carac === "AD") {
        mis_actividades_apoyo.fixFilters.push({field: 'responsable', value: myID});
    }else{
        BASEAPI.listp('actividades_poa', {
            limit:0,
            orderby: "id",
            order: "asc",
            where: [{
                field: "poa",
                value: new SESSION().current().poa_id
            }]
        }).then(function (result) {
            if(result){
                result=result.data;
                var actId = [];
                result.forEach((row) => {
                    actId.push(row.id);
                });
                mis_actividades_apoyo.fixFilters = [
                    {
                        "field": "actividades_poa",
                        "value": actId
                    }
                ];
            }else{
                mis_actividades_apoyo.fixFilters = [
                    {
                        "field": "id",
                        "value": -1
                    }
                ];
            }
            mis_actividades_apoyo.refresh();
        });
    }
    // mis_actividades_apoyo.refresh();

    RUNCONTROLLER("mis_actividades_apoyo", mis_actividades_apoyo, $scope, $http, $compile);
    mis_actividades_apoyo.plural = "Actividades de Apoyo Solicitante";
    mis_actividades_apoyo.headertitle = "Actividades de Apoyo Solicitante";
    mis_actividades_apoyo.singular = "";
    mis_actividades_apoyo.datas = {};
    mis_actividades_apoyo.datas.poa_id = new SESSION().current().poa_id;



    // mis_actividades_apoyo.formulary = function (data, mode, defaultData) {
    //     if (mis_actividades_apoyo !== undefined) {
    //         RUN_B("mis_actividades_apoyo", mis_actividades_apoyo, $scope, $http, $compile);
    //         mis_actividades_apoyo.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //             if (actividades_poa.producto_object === undefined || actividades_poa.fecha_inicio === null || actividades_poa.fecha_fin === null || actividades_poa.fecha_fin === "") {
    //                 mis_actividades_apoyo.showMsjSi = true;
    //                 mis_actividades_apoyo.showMsjNo = false;
    //                 resolve(true);
    //             } else {
    //                 mis_actividades_apoyo.showMsjSi = false;
    //                 mis_actividades_apoyo.showMsjNo = true;
    //                 resolve(true);
    //             }
    //
    //         });
    //         mis_actividades_apoyo.selectQueries["departamento"] = [
    //             {
    //                 field: "compania",
    //                 operator: "=",
    //                 value: new SESSION().current().compania_id
    //             },
    //             {
    //                 field: "id",
    //                 operator: "!=",
    //                 value: new SESSION().current().departamento
    //             }
    //         ];
    //         mis_actividades_apoyo.triggers.table.after.open = function () {
    //             var n = actividades_poa.nombre ? actividades_poa.nombre : "";
    //             $('.modal-title').html('Actividad Apoyo - Actividad ( ' + n + ' )');
    //         };
    //         mis_actividades_apoyo.triggers.table.after.close = function () {
    //             $('.modal-title').html('Actividad');
    //         };
    //         mis_actividades_apoyo.form.titles = {
    //             new: MESSAGE.i('planificacion.titleActividadApoyo'),
    //             edit: "Editar - " + ` ${MESSAGE.i('planificacion.titleActividadApoyo')}`,
    //             view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleActividadApoyo')}`
    //         };
    //         // implementacion de las notificaciones al momento de crear o modificar una actividad de apoyo begin
    //         mis_actividades_apoyo.form.after.insert = function (data) {
    //             var usuario = mis_actividades_apoyo.form.selected('responsable');
    //             mis_actividades_apoyo.data_json = {
    //                 title: MESSAGE.i('planificacion.titleActividadApoyo'),
    //                 content: MESSAGE.ieval('planificacion.mis_actividades_apoyo_send_notification',{
    //                     field: usuario.name,
    //                     field2: data.inserting.nombre,
    //                     field3: actividades_poa.nombre,
    //                     field4: mis_actividades_apoyo.fecha_fin
    //                 }),
    //                 user: [data.inserting.responsable],
    //                 url: 'mis_actividades_apoyo'
    //             };
    //             send_notification.send.send(mis_actividades_apoyo.data_json);
    //         };
    //         //
    //         mis_actividades_apoyo.form.after.update = function (data) {
    //             if ((mis_actividades_apoyo.departamento != mis_actividades_apoyo.new_dept) || (mis_actividades_apoyo.user_old.id.toString() != mis_actividades_apoyo.responsable)){
    //                 mis_actividades_apoyo.data_json = {
    //                     title: MESSAGE.i('planificacion.titleActividadApoyo'),
    //                     content: MESSAGE.ieval('planificacion.mis_actividades_apoyo_send_notification',{
    //                         field: mis_actividades_apoyo.form.selected('responsable').name,
    //                         field2: data.updating.nombre,
    //                         field3: actividades_poa.nombre,
    //                         field4: mis_actividades_apoyo.fecha_fin
    //                     }),
    //                     user: [data.updating.responsable],
    //                     url: 'mis_actividades_apoyo'
    //                 };
    //                 send_notification.send.send(mis_actividades_apoyo.data_json);
    //
    //                 mis_actividades_apoyo.data_json2 = {
    //                     title: MESSAGE.i('planificacion.titleActividadApoyo'),
    //                     content: MESSAGE.ieval('planificacion.mis_actividades_apoyo_remove_send_notification',{
    //                         field: mis_actividades_apoyo.user_old.name,
    //                         field2: data.updating.nombre,
    //                         field3: actividades_poa.nombre
    //                     }),
    //                     user: [mis_actividades_apoyo.user_old.id],
    //                     url: 'mis_actividades_apoyo'
    //                 };
    //                 send_notification.send.send(mis_actividades_apoyo.data_json2);
    //
    //             } else {
    //                 mis_actividades_apoyo.data_json = {
    //                     title: MESSAGE.i('planificacion.titleActividadApoyo'),
    //                     content: MESSAGE.ieval('planificacion.mis_actividades_apoyo_update_send_notification',{
    //                         field: mis_actividades_apoyo.user_old.name,
    //                         field2: data.updating.nombre,
    //                         field3: actividades_poa.nombre
    //                     }),
    //                     user: [data.updating.responsable],
    //                     url: 'mis_actividades_apoyo'
    //                 };
    //                 send_notification.send.send(mis_actividades_apoyo.data_json);
    //             }
    //         };
    //
    //         // end
    //         mis_actividades_apoyo.form.readonly = {
    //             departamento_solicitante: new SESSION().current().departamento
    //         };
    //         mis_actividades_apoyo.createForm(data, mode, defaultData);
    //
    //         if (actividades_poa.producto_object) {
    //             mis_actividades_apoyo.id_departamento = actividades_poa.producto_object.departamento_id;
    //         } else {
    //             mis_actividades_apoyo.id_departamento = 0;
    //         }
    //
    //         mis_actividades_apoyo.triggers.table.after.control = function (data) {
    //             if (mode == 'new' && data == 'range_date2') {
    //                 mis_actividades_apoyo.range_date2 = '';
    //                 mis_actividades_apoyo.refreshAngular();
    //             }
    //
    //             if (mode === 'edit' && data === 'departamento') {
    //                 mis_actividades_apoyo.new_dept = mis_actividades_apoyo.departamento;
    //             }
    //             if (mode === 'edit' && data === 'responsable') {
    //                 mis_actividades_apoyo.user_old = mis_actividades_apoyo.form.selected('responsable');
    //             }
    //
    //         };
    //
    //         mis_actividades_apoyo.$scope.$watch('mis_actividades_apoyo.nombre', function (value) {
    //             var rules = [];
    //             rules.push(VALIDATION.general.required(value));
    //             VALIDATION.validate(mis_actividades_apoyo, "nombre", rules)
    //         });
    //         var loadme = false;
    //         mis_actividades_apoyo.$scope.$watch('mis_actividades_apoyo.departamento', function (value) {
    //             var rules = [];
    //             rules.push(VALIDATION.general.required(value));
    //             VALIDATION.validate(mis_actividades_apoyo, "departamento", rules)
    //         });
    //         mis_actividades_apoyo.$scope.$watch('mis_actividades_apoyo.fecha_inicio', function (value) {
    //             var rules = [];
    //             rules.push(VALIDATION.general.required(value));
    //             VALIDATION.validate(mis_actividades_apoyo, "fecha_inicio", rules)
    //
    //         });
    //         mis_actividades_apoyo.$scope.$watch('mis_actividades_apoyo.fecha_fin', function (value) {
    //             var rules = [];
    //             rules.push(VALIDATION.general.required(value));
    //             VALIDATION.validate(mis_actividades_apoyo, "fecha_fin", rules)
    //         });
    //         mis_actividades_apoyo.$scope.$watch('mis_actividades_apoyo.range_date2', function (value) {
    //             var rules = [];
    //             rules.push(VALIDATION.general.required(value));
    //             VALIDATION.validate(mis_actividades_apoyo, "fecha_inicio", rules);
    //             VALIDATION.validate(mis_actividades_apoyo, "range_date2", rules);
    //         });
    //     }
    // };

});