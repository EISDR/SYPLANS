app.controller("actividades_apoyo", function ($scope, $http, $compile) {
    actividades_apoyo = this;
    actividades_apoyo.id_actividad = [];
    prueba = "";
    actividades_apoyo.reonly = {};
    actividades_apoyo.rules = [];
    actividades_apoyo.last_id = 0;
    actividades_apoyo.showMsjSi = false;
    actividades_apoyo.showMsjNo = false;
    actividades_apoyo.paso = false;
    var loaded = false;
    var user = new SESSION().current();
    var titulo_push = "";
    var cuerpo_push = "";
    var titulo_email = "";
    var cuerpo_email = "";
    var correo = "";
    actividades_apoyo.show_export_tab = true;
    actividades_apoyo.session = user;
    RUNCONTROLLER("actividades_apoyo", actividades_apoyo, $scope, $http, $compile);
    actividades_apoyo.plural = "Actividades de Apoyo";
    actividades_apoyo.headertitle = "Actividades de Apoyo";
    actividades_apoyo.singular = "";
    actividades_apoyo.singular = "";
    actividades_apoyo.datas = {};
    actividades_apoyo.datas = {};
    actividades_apoyo.datas.poa_id = user.poa_id;
    actividades_apoyo.formulary = function (data, mode, defaultData) {
        if (actividades_apoyo !== undefined) {
            RUN_B("actividades_apoyo", actividades_apoyo, $scope, $http, $compile);
            actividades_apoyo.triggers.table.before.open = () => new Promise((resolve, reject) => {
                if (typeof productos_poa != "undefined") {
                    if (productos_poa) {
                        if (typeof productos_poa !== 'not defined') {
                            if (actividades_poa.fecha_inicio === null || actividades_poa.fecha_fin === null || actividades_poa.fecha_fin === "") {
                                actividades_apoyo.showMsjSi = true;
                                actividades_apoyo.showMsjNo = false;
                                resolve(true);
                            } else {
                                actividades_apoyo.showMsjSi = false;
                                actividades_apoyo.showMsjNo = true;
                                resolve(true);
                            }
                            return
                        }
                    }
                }
                if (actividades_poa.producto_object === undefined || actividades_poa.fecha_inicio === null || actividades_poa.fecha_fin === null || actividades_poa.fecha_fin === "") {
                    actividades_apoyo.showMsjSi = true;
                    actividades_apoyo.showMsjNo = false;
                    resolve(true);
                } else {
                    actividades_apoyo.showMsjSi = false;
                    actividades_apoyo.showMsjNo = true;
                    resolve(true);
                }
            });
            actividades_apoyo.selectQueries["departamento"] = [
                {
                    field: "compania",
                    operator: "=",
                    value: user.compania_id
                },
                {
                    field: "poa",
                    operator: "=",
                    value: user.poa_id
                }
            ];
            actividades_apoyo.triggers.table.after.open = async function (data) {


                if (mode != "new") {
                    actividades_apoyo.oldpresupuesto = actividades_apoyo.presupuesto;
                    actividades_apoyo.oldfecha_inicio = actividades_apoyo.fecha_inicio;
                    actividades_apoyo.oldfecha_fin = actividades_apoyo.fecha_fin;
                    ["bienes_permiso", "bienes_permiso_nombre", "presupuestario", "presupuestario_nombre"].forEach(d => {
                        if (actividades_apoyo[d] === '[NULL]')
                            actividades_apoyo[d] = '';
                    });
                    actividades_apoyo.refreshAngular();
                } else {

                }
                if (!DSON.oseaX(actividades_poa.presupuesto_restante)) {
                    actividades_apoyo.true_presupuesto_restante = actividades_poa.presupuesto_restante;
                }
                if (!DSON.oseaX(actividades_poa.presupuesto)) {
                    actividades_apoyo.presupuesto_extra_viejo = actividades_poa.presupuesto_anterior;
                    actividades_apoyo.valor_act_poa_original = actividades_poa.presupuesto;
                    actividades_apoyo.valor_act_poa_press = actividades_poa.presupuesto;
                    if (!DSON.oseaX(actividades_apoyo.presupuesto)) {
                        actividades_apoyo.presupuesto_viejo = actividades_apoyo.presupuesto;
                        actividades_apoyo.valor_act_poa_original = actividades_poa.presupuesto - actividades_apoyo.presupuesto;
                    }
                }
                actividades_apoyo.last_id = undefined;
                var n = actividades_poa.nombre ? actividades_poa.nombre : "";
                $('.modal-title').html('Actividad Apoyo - Actividad ( ' + n + ' )');
                if ((actividades_apoyo.maneja_presupuesto_act_apoyo)) {
                    actividades_apoyo.pages.form.save = function (pre, post, close) {
                        console.log("Entre al metodo sobreescrito");
                        var $scope = actividades_apoyo;
                        var newRecord = {};
                        var state = $scope.validation.statePure(['nombre', 'departamento', 'responsable', 'fecha_inicio', 'fecha_fin', 'range_date2', 'presupuesto']);
                        if (state === VALIDATION.types.success) {
                            $scope.form.saveAction(close);
                        } else {
                            if (state === VALIDATION.types.warning) {
                                SWEETALERT.confirm({
                                    message:
                                        MESSAGE.i('alerts.ContainsWarning'),
                                    confirm: function () {
                                        $scope.form.saveAction(close);
                                    }
                                });
                            } else {
                                $scope.form.intent = true;
                                SWEETALERT.show({
                                    type: "error",
                                    message: MESSAGE.i('alerts.ContainsError'),
                                    confirm: function () {
                                        $scope.pages.form.focusFirstValidation();
                                    }
                                });

                            }
                        }
                    };
                } else {
                    actividades_apoyo.pages.form.save = function (pre, post, close) {
                        console.log("Entre al metodo sobreescrito");
                        var $scope = actividades_apoyo;
                        var newRecord = {};
                        var state = $scope.validation.statePure(['nombre', 'departamento', 'responsable', 'fecha_inicio', 'fecha_fin', 'range_date2']);
                        if (state === VALIDATION.types.success) {
                            $scope.form.saveAction(close);
                        } else {
                            if (state === VALIDATION.types.warning) {
                                SWEETALERT.confirm({
                                    message:
                                        MESSAGE.i('alerts.ContainsWarning'),
                                    confirm: function () {
                                        $scope.form.saveAction(close);
                                    }
                                });
                            } else {
                                $scope.form.intent = true;
                                SWEETALERT.show({
                                    type: "error",
                                    message: MESSAGE.i('alerts.ContainsError'),
                                    confirm: function () {
                                        $scope.pages.form.focusFirstValidation();
                                    }
                                });

                            }
                        }
                    };
                    actividades_apoyo.updateInputPresupuesto();
                }
                if (actividades_apoyo.form.mode) {
                    actividades_apoyo.lista_presupuesto_act_apoyo = 0;
                    actividades_apoyo.lista_valore_presupuesto = await BASEAPI.listp('actividades_apoyo', {
                        where: [{
                            field: "tempid",
                            value: "actividades_poa" + actividades_poa.form.options.actividades_apoyo.tempId
                        }]
                    });
                    for (item of actividades_apoyo.lista_valore_presupuesto.data) {
                        actividades_apoyo.lista_presupuesto_act_apoyo += item.presupuesto;
                    }
                }
            };
            actividades_apoyo.triggers.table.after.close = async function () {
                $('.modal-title').html('Actividad');
                actividades_apoyo.paso = false;
                loaded = false;
                // if (typeof actividades_poa !== 'undefined') {
                //     if (typeof actividades_poa !== 'not define') {
                //         if (actividades_poa) {
                //             if (actividades_poa.presupuesto !== "") {
                //                 if (actividades_poa.maneja_presupuesto) {
                //                     if (actividades_poa.form.mode != "edit") {
                //                         actividades_poa.lista_act_apoyo_presupuesto = [];
                //                         var result = await BASEAPI.listp("actividades_apoyo", {
                //                             limit: 0,
                //                             order: "asc",
                //                             where: [
                //                                 {
                //                                     field: "tempid",
                //                                     value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                //                                 },
                //                                 {
                //                                     field: "presupuesto",
                //                                     operator: ">",
                //                                     value: 0
                //                                 }
                //                             ]
                //                         });
                //                         actividades_poa.lista_act_apoyo_presupuesto = result.data;
                //                         actividades_poa.sum_press_act_apoyo = 0;
                //                         for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                //                             actividades_poa.sum_press_act_apoyo += i.presupuesto;
                //                         }
                //                         ;
                //                         if (actividades_poa.presupuesto !== "") {
                //                             if (actividades_poa.form.options.presupuesto) {
                //                                 actividades_poa.form.options.presupuesto.disabled = true;
                //                                 actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                //                             }
                //                         }
                //                         actividades_poa.refreshAngular();
                //                     } else {
                //                         actividades_poa.lista_act_apoyo_presupuesto = [];
                //                         var result = await BASEAPI.listp("actividades_apoyo", {
                //                             limit: 0,
                //                             order: "asc",
                //                             where: [
                //                                 {
                //                                     field: "actividades_poa",
                //                                     value: actividades_poa.id
                //                                 },
                //                                 {
                //                                     field: "presupuesto",
                //                                     operator: ">",
                //                                     value: 0
                //                                 }
                //                             ]
                //                         });
                //                         actividades_poa.lista_act_apoyo_presupuesto = result.data;
                //                         actividades_poa.sum_press_act_apoyo = 0;
                //                         for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                //                             actividades_poa.sum_press_act_apoyo += i.presupuesto;
                //                         }
                //                         ;
                //                         if (actividades_poa.presupuesto !== "") {
                //                             if (actividades_poa.form.options.presupuesto) {
                //                                 actividades_poa.form.options.presupuesto.disabled = true;
                //                                 actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                //                             }
                //                         }
                //                         actividades_poa.refreshAngular();
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
            };
            actividades_apoyo.afterDelete = async function (data) {
                if (typeof actividades_poa !== 'undefined') {
                    if (typeof actividades_poa !== 'not define') {
                        if (actividades_poa) {
                            if (actividades_poa.maneja_presupuesto) {
                                if (actividades_poa.form.mode != "edit") {
                                    actividades_poa.lista_act_apoyo_presupuesto = [];
                                    var result = await BASEAPI.listp("actividades_apoyo", {
                                        limit: 0,
                                        order: "asc",
                                        where: [
                                            {
                                                field: "tempid",
                                                value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                                            },
                                            {
                                                field: "presupuesto",
                                                operator: ">",
                                                value: 0
                                            }
                                        ]
                                    });
                                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                                    actividades_poa.sum_press_act_apoyo = 0;
                                    for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                                        actividades_poa.sum_press_act_apoyo += i.presupuesto;
                                    }
                                    ;
                                    if (actividades_poa.presupuesto !== "") {
                                        if (actividades_poa.maneja_presupuesto) {
                                            actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                                        }
                                    }
                                    actividades_poa.refreshAngular();
                                } else {
                                    actividades_poa.lista_act_apoyo_presupuesto = [];
                                    var result = await BASEAPI.listp("actividades_apoyo", {
                                        limit: 0,
                                        order: "asc",
                                        where: [
                                            {
                                                field: "actividades_poa",
                                                value: actividades_poa.id
                                            },
                                            {
                                                field: "presupuesto",
                                                operator: ">",
                                                value: 0
                                            }
                                        ]
                                    });
                                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                                    actividades_poa.sum_press_act_apoyo = 0;
                                    for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                                        actividades_poa.sum_press_act_apoyo += i.presupuesto;
                                    }
                                    ;
                                    if (actividades_poa.maneja_presupuesto) {
                                        actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                                    }
                                    actividades_poa.refreshAngular();
                                    BASEAPI.updateall('actividades_poa', {
                                        presupuesto: LAN.money(actividades_poa.presupuesto).value,
                                        where: [
                                            {
                                                field: "id",
                                                value: actividades_poa.id
                                            }
                                        ]
                                    }, function (result) {
                                        console.log(result);
                                    });
                                }
                                actividades_poa.form.options.presupuesto.disabled = true;
                                actividades_poa.refreshAngular();
                            } else {
                                actividades_poa.form.options.presupuesto.disabled = false;
                            }
                            actividades_poa.presupuesto_restante_calculate();
                            actividades_poa.refreshAngular();
                        }
                    }
                }
            };
            actividades_apoyo.triggers.table.after.load = async function (records) {
                //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
                // if (typeof actividades_poa !== 'undefined') {
                //     if (typeof actividades_poa !== 'not define') {
                //         if (actividades_poa) {
                //             if (actividades_poa.maneja_presupuesto) {
                //                 if (actividades_poa.form.mode != "edit") {
                //                     actividades_poa.lista_act_apoyo_presupuesto = [];
                //                     var result = await BASEAPI.listp("actividades_apoyo", {
                //                         limit: 0,
                //                         order: "asc",
                //                         where: [
                //                             {
                //                                 field: "tempid",
                //                                 value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                //                             },
                //                             {
                //                                 field: "presupuesto",
                //                                 operator: ">",
                //                                 value: 0
                //                             }
                //                         ]
                //                     });
                //                     actividades_poa.lista_act_apoyo_presupuesto = result.data;
                //                     actividades_poa.sum_press_act_apoyo = 0;
                //                     for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                //                         actividades_poa.sum_press_act_apoyo += i.presupuesto;
                //                     };
                //                     if (actividades_poa.presupuesto !== "") {
                //                         if (actividades_poa.maneja_presupuesto) {
                //                             actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo);
                //                         }
                //                     }
                //                     actividades_poa.refreshAngular();
                //                 } else {
                //                     actividades_poa.lista_act_apoyo_presupuesto = [];
                //                     var result = await BASEAPI.listp("actividades_apoyo", {
                //                         limit: 0,
                //                         order: "asc",
                //                         where: [
                //                             {
                //                                 field: "actividades_poa",
                //                                 value: actividades_poa.id
                //                             },
                //                             {
                //                                 field: "presupuesto",
                //                                 operator: ">",
                //                                 value: 0
                //                             }
                //                         ]
                //                     });
                //                     actividades_poa.lista_act_apoyo_presupuesto = result.data;
                //                     actividades_poa.sum_press_act_apoyo = 0;
                //                     for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                //                         actividades_poa.sum_press_act_apoyo += i.presupuesto;
                //                     };
                //                     if (actividades_poa.maneja_presupuesto) {
                //                         actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo);
                //                     }
                //                     actividades_poa.refreshAngular();
                //                 }
                //                 actividades_poa.form.options.presupuesto.disabled = true;
                //                 actividades_poa.refreshAngular();
                //             } else {
                //                 actividades_poa.form.options.presupuesto.disabled = false;
                //             }
                //             actividades_poa.presupuesto_restante_calculate();
                //             actividades_poa.refreshAngular();
                //         }
                //     }
                // }
            };
            actividades_apoyo.form.titles = {
                new: MESSAGE.i('planificacion.titleActividadApoyo'),
                edit: "Editar - " + ` ${MESSAGE.i('planificacion.titleActividadApoyo')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titleActividadApoyo')}`
            };
            // implementacion de las notificaciones al momento de crear o modificar una actividad de apoyo begin

            actividades_apoyo.form.after.insert = async function (data) {
                if (typeof actividades_poa !== 'undefined') {
                    if (typeof actividades_poa !== 'not define') {
                        if (actividades_poa) {
                            if (actividades_poa.maneja_presupuesto) {
                                if (actividades_poa.form.mode != "edit") {
                                    actividades_poa.lista_act_apoyo_presupuesto = [];
                                    var result = await BASEAPI.listp("actividades_apoyo", {
                                        limit: 0,
                                        order: "asc",
                                        where: [
                                            {
                                                field: "tempid",
                                                value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                                            },
                                            {
                                                field: "presupuesto",
                                                operator: ">",
                                                value: 0
                                            }
                                        ]
                                    });
                                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                                    actividades_poa.sum_press_act_apoyo = 0;
                                    for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                                        actividades_poa.sum_press_act_apoyo += i.presupuesto;
                                    }
                                    ;
                                    if (actividades_poa.presupuesto !== "") {
                                        console.log("entre en el if de presupuesto", actividades_poa.presupuesto);
                                        if (actividades_poa.maneja_presupuesto) {
                                            console.log("entre en el if de maneja presupuesto", actividades_poa.maneja_presupuesto);
                                            actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                                            console.log("luego de la asignacion del presupuesto", actividades_poa.presupuesto);
                                        }
                                    }
                                    actividades_poa.refreshAngular();
                                } else {
                                    actividades_poa.lista_act_apoyo_presupuesto = [];
                                    var result = await BASEAPI.listp("actividades_apoyo", {
                                        limit: 0,
                                        order: "asc",
                                        where: [
                                            {
                                                field: "actividades_poa",
                                                value: actividades_poa.id
                                            },
                                            {
                                                field: "presupuesto",
                                                operator: ">",
                                                value: 0
                                            }
                                        ]
                                    });
                                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                                    actividades_poa.sum_press_act_apoyo = 0;
                                    for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                                        actividades_poa.sum_press_act_apoyo += i.presupuesto;
                                    }
                                    ;
                                    if (actividades_poa.maneja_presupuesto) {
                                        actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                                    }
                                    actividades_poa.refreshAngular();
                                }
                                actividades_poa.form.options.presupuesto.disabled = true;
                                actividades_poa.refreshAngular();
                            } else {
                                if (actividades_poa.form)
                                    if (actividades_poa.form.options)
                                        if (actividades_poa.form.options.presupuesto)
                                            actividades_poa.form.options.presupuesto.disabled = false;
                            }
                            actividades_poa.refreshAngular();
                            if (actividades_poa.form.mode == "edit") {
                                var usuario = actividades_apoyo.form.selected('responsable');
                                actividades_apoyo.data_json = {
                                    title: `Ha sido asignado para dar apoyo a la actividad "${actividades_poa.nombre}"`,
                                    content: `${usuario.name}, se le ha asignado la actividad de apoyo: "${data.inserting.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}.`,
                                    user: [data.inserting.responsable],
                                    url: 'actividades_apoyo'
                                };
                                send_notification.send.send(actividades_apoyo.data_json);
                                // actividades_apoyo.data_json_email = {
                                //     to: usuario.correo,
                                //     subject: `Ha sido asignado para dar apoyo a la actividad "${ actividades_poa.nombre}"`,
                                //     name_show: "NoReply",
                                //     template: 'email/plane',
                                //     message: `${usuario.name}, se le ha asignado la actividad de apoyo: "${data.inserting.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}.`,
                                //     notification: 'no'
                                // };
                                // send_notification.send.email(actividades_apoyo.data_json_email);

                                if (!DSON.oseaX('actividades_poa')) {
                                    if (actividades_apoyo.presupuesto) {
                                        actividades_apoyo.last_id = data.inserted.id;
                                        console.log("en el after insert", actividades_apoyo.last_id);
                                    }
                                }
                                //
                                titulo_push = `Ha sido asignado para dar apoyo a la actividad "${actividades_poa.nombre}"`;
                                cuerpo_push = `${usuario.name}, se le ha asignado la actividad de apoyo: "${data.inserting.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}.`;
                                correo = `${usuario.correo}`;
                                titulo_email = `Ha sido asignado para dar apoyo a la actividad "${actividades_poa.nombre}"`;
                                cuerpo_email = `${usuario.name}, se le ha asignado la actividad de apoyo: "${data.inserting.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}.`;
                                function_send_email_director_user(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, actividades_apoyo.departamento, correo, user.institucion_id);
                            }
                        }
                    }
                }
            };

            actividades_apoyo.triggers.table.before.update = (data) => new Promise((resolve, reject) => {

                if (!actividades_apoyo.maneja_presupuesto_act_apoyo) {
                    data.updating.presupuesto = '$NULL';
                    data.updating.tipo_inversion = '$NULL';
                    data.updating.bienes_permiso = '$NULL';
                    data.updating.bienes_permiso_nombre = '$NULL';
                    data.updating.presupuestario = '$NULL';
                    data.updating.presupuestario_nombre = '$NULL';
                }
                resolve(true);
            });
            // actividades_poa.form.before.insert = function (data) {
            //
            // };
            actividades_apoyo.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                if (!actividades_apoyo.maneja_presupuesto_act_apoyo) {
                    data.inserting.presupuesto = '$NULL';
                    data.inserting.tipo_inversion = '$NULL';
                    data.inserting.bienes_permiso = '$NULL';
                    data.inserting.bienes_permiso_nombre = '$NULL';
                    data.inserting.presupuestario = '$NULL';
                    data.inserting.presupuestario_nombre = '$NULL';
                }
                resolve(true);
            });
            //
            actividades_apoyo.form.after.update = async function (data) {
                if (typeof actividades_poa !== 'undefined') {
                    if (typeof actividades_poa !== 'not define') {
                        if (actividades_poa) {
                            if (actividades_poa.maneja_presupuesto) {
                                if (actividades_poa.form.mode != "edit") {
                                    actividades_poa.lista_act_apoyo_presupuesto = [];
                                    var result = await BASEAPI.listp("actividades_apoyo", {
                                        limit: 0,
                                        order: "asc",
                                        where: [
                                            {
                                                field: "tempid",
                                                value: `actividades_poa${actividades_poa.form.options.actividades_apoyo.tempId}`
                                            },
                                            {
                                                field: "presupuesto",
                                                operator: ">",
                                                value: 0
                                            }
                                        ]
                                    });
                                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                                    actividades_poa.sum_press_act_apoyo = 0;
                                    for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                                        actividades_poa.sum_press_act_apoyo += i.presupuesto;
                                    }
                                    ;
                                    if (actividades_poa.presupuesto !== "") {
                                        if (actividades_poa.maneja_presupuesto) {
                                            actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                                        }
                                    }
                                    actividades_poa.refreshAngular();
                                } else {
                                    actividades_poa.lista_act_apoyo_presupuesto = [];
                                    var result = await BASEAPI.listp("actividades_apoyo", {
                                        limit: 0,
                                        order: "asc",
                                        where: [
                                            {
                                                field: "actividades_poa",
                                                value: actividades_poa.id
                                            },
                                            {
                                                field: "presupuesto",
                                                operator: ">",
                                                value: 0
                                            }
                                        ]
                                    });
                                    actividades_poa.lista_act_apoyo_presupuesto = result.data;
                                    actividades_poa.sum_press_act_apoyo = 0;
                                    for (var i of actividades_poa.lista_act_apoyo_presupuesto) {
                                        actividades_poa.sum_press_act_apoyo += i.presupuesto;
                                    }
                                    ;
                                    if (actividades_poa.maneja_presupuesto) {
                                        actividades_poa.presupuesto = LAN.money(actividades_poa.sum_press_act_apoyo).format(false);
                                    }
                                    actividades_poa.refreshAngular();
                                    BASEAPI.updateall('actividades_poa', {
                                        presupuesto: LAN.money(actividades_poa.presupuesto).value,
                                        where: [
                                            {
                                                field: "id",
                                                value: actividades_poa.id
                                            }
                                        ]
                                    }, function (result) {
                                        console.log(result);
                                    });
                                }
                                actividades_poa.form.options.presupuesto.disabled = true;
                                actividades_poa.refreshAngular();
                            } else {
                                if (typeof actividades_apoyo != "undefined") {
                                    if (actividades_apoyo) {
                                        if (typeof actividades_apoyo !== 'not defined') {
                                            if (actividades_poa.lista_act_apoyo_presupuesto.length > 0) {
                                                SWEETALERT.show({
                                                    message: "Debe quitar los presupuestos de actividades de apoyo.",
                                                    type: "warning"
                                                });
                                                actividades_poa.maneja_presupuesto = true;
                                                checkboxactividades_poa_maneja_presupuesto.setPosition(2);
                                            }
                                        }
                                    }
                                }
                                if (actividades_poa.form)
                                    if (actividades_poa.form.options)
                                        if (actividades_poa.form.options.presupuesto)
                                            actividades_poa.form.options.presupuesto.disabled = false;
                            }
                            actividades_poa.refreshAngular();
                        }
                    }
                }
                if ((actividades_apoyo.departamento != actividades_apoyo.new_dept) || (actividades_apoyo.user_old.id.toString() != actividades_apoyo.responsable)) {
                    var array_correo = [];
                    actividades_apoyo.data_json = {
                        title: `Ha sido asignado para dar apoyo a la actividad "${actividades_poa.nombre}"`,
                        content: `${actividades_apoyo.form.selected('responsable').name}, se le ha asignado la actividad de apoyo: "${data.updating.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}.`,
                        user: [data.updating.responsable],
                        url: 'actividades_apoyo'
                    };
                    send_notification.send.send(actividades_apoyo.data_json);
                    BASEAPI.mail({
                        "to": actividades_apoyo.form.selected('responsable').correo,
                        "subject": `Ha sido asignado para dar apoyo a la actividad "${actividades_poa.nombre}"`,
                        "name": "NoReply",
                        "template": 'email/plane',
                        "fields": { //estos campos se utilizarán en el template
                            message: `${actividades_apoyo.form.selected('responsable').name}, se le ha asignado la actividad de apoyo: "${data.updating.nombre}". La misma deberá trabajarse durante el rango de fecha de ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}.`,
                        }
                    }, function (result) {
                    });

                    actividades_apoyo.data_json2 = {
                        title: `Ha sido removido de la actividad de apoyo: "${data.updating.nombre}"`,
                        content: `${actividades_apoyo.user_old.name} ha sido removido de la actividad de apoyo: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_apoyo.form.selected('responsable').name}.`,
                        user: [actividades_apoyo.user_old.id],
                        url: 'actividades_apoyo'
                    };
                    send_notification.send.send(actividades_apoyo.data_json2);
                    // BASEAPI.mail({
                    //     "to": actividades_apoyo.user_old.correo,
                    //     "subject": `Ha sido removido de la actividad de apoyo: "${data.updating.nombre}"`,
                    //     "name": "NoReply",
                    //     "template": 'email/plane',
                    //     "fields": { //estos campos se utilizarán en el template
                    //         message: `${actividades_apoyo.user_old.name} ha sido removido de la actividad de apoyo: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_apoyo.form.selected('responsable').name}.`,
                    //     }
                    // }, function (result) {
                    //
                    // });

                    titulo_push = `Ha sido removido de la actividad de apoyo: "${data.updating.nombre}"`
                    cuerpo_push = `${actividades_apoyo.user_old.name} ha sido removido de la actividad de apoyo: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_apoyo.form.selected('responsable').name}.`;
                    array_correo.push(actividades_apoyo.user_old.correo);
                    array_correo.push(actividades_apoyo.form.selected('responsable').correo);
                    titulo_email = `Ha sido removido de la actividad de apoyo: "${data.updating.nombre}"`
                    cuerpo_email = `${actividades_apoyo.user_old.name} ha sido removido de la actividad de apoyo: "${data.updating.nombre}", dicha actividad fué asignada a ${actividades_apoyo.form.selected('responsable').name}.`;
                    function_send_email_director_user(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, actividades_apoyo.departamento, array_correo, user.institucion_id);

                } else {
                    if (moment(actividades_apoyo.oldfecha_inicio).format("YYYY/MM/DD") != data.updating.fecha_inicio || moment(actividades_apoyo.oldfecha_fin).format("YYYY/MM/DD") != data.updating.fecha_fin) {
                        actividades_apoyo.data_json = {
                            title: `Hubo un cambio de fecha en la Actividad de Apoyo`,
                            content: `${actividades_apoyo.user_old.name}, ha habido cambios en el rango de fecha de la ejecución de la tarea: ${data.updating.nombre}. El nuevo rango va desde  ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin} .Proceder a tomar las acciones que considre pertinente.`,
                            user: [data.updating.responsable],
                            url: 'actividades_apoyo'
                        };
                        send_notification.send.send(actividades_apoyo.data_json);
                        // BASEAPI.mail({
                        //     "to": actividades_apoyo.user_old.correo,
                        //     "subject": `Hubo un cambio de fecha en la Actividad de Apoyo`,
                        //     "name": "noReply",
                        //     "template": 'email/plane',
                        //     "fields": { //estos campos se utilizarán en el template
                        //         message: `${actividades_apoyo.user_old.name}, Ha habido cambios en el rango de fecha de la ejecución de la tarea: ${data.updating.nombre}. El nuevo rango va desde  ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`,
                        //     }
                        // }, function (result) {
                        // });
                        titulo_push = `Hubo un cambio de fecha en la  Actividad de Apoyo "${data.updating.nombre}"`;
                        cuerpo_push = `${actividades_apoyo.user_old.name}, ha habido cambios en el rango de fecha de la ejecución de la tarea: ${data.updating.nombre}. El nuevo rango va desde  ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`;
                        correo = `${actividades_apoyo.user_old.correo}`;
                        titulo_email = `Hubo un cambio de fecha en la  Actividad de Apoyo "${data.updating.nombre}"`;
                        cuerpo_email = `${actividades_apoyo.user_old.name}, ha habido cambios en el rango de fecha de la ejecución de la tarea: ${data.updating.nombre}. El nuevo rango va desde  ${actividades_apoyo.fecha_inicio} hasta ${actividades_apoyo.fecha_fin}. Proceder a tomar las acciones que considre pertinente.`;
                        function_send_email_group_user(titulo_push, cuerpo_push, titulo_email, cuerpo_email, user.compania_id, actividades_apoyo.departamento, correo, user.institucion_id);

                    }
                    if (LAN.money(actividades_apoyo.oldpresupuesto).value != data.updating.presupuesto) {
                        actividades_apoyo.data_json = {
                            title: `Actividad de apoyo "${data.updating.nombre}" ha cambiado su presupuesto`,
                            content: `${actividades_apoyo.user_old.name}, ha sido cambiado el presupuesto de la actividad de apoyo "${data.updating.nombre}" de ${LAN.money(actividades_apoyo.oldpresupuesto).format(false)} a ${actividades_apoyo.presupuesto}`,
                            user: [data.updating.responsable],
                            url: 'actividades_poa'
                        };
                        // BASEAPI.mail({
                        //     "to": actividades_poa.form.selected('responsable').correo,
                        //     "subject": `Hubo un cambio de fecha en la Actividad`,
                        //     "name": "noReply",
                        //     "template": 'email/plane',
                        //     "fields": { //estos campos se utilizarán en el template
                        //         message: `${actividades_poa.form.selected('responsable').nombre + ' ' + actividades_poa.form.selected('responsable').apellido}, ha habido cambios en el rango de fecha de la ejecución de la tarea: "${data.updating.nombre}". El nuevo rango va desde ${actividades_poa.fecha_inicio} hasta ${actividades_poa.fecha_fin}. Proceder a tomar las acciones que considere pertinente.`,
                        //     }
                        // }, function (result) {
                        // });
                        send_notification.send.send(actividades_apoyo.data_json);

                        titulo_push = `Actividad de apoyo "${data.updating.nombre}" ha cambiado su presupuesto`;
                        cuerpo_push = `${actividades_apoyo.user_old.name}, ha sido cambiado el presupuesto de la actividad de apoyo "${data.updating.nombre}" de ${LAN.money(actividades_apoyo.oldpresupuesto).format(false)} a ${actividades_apoyo.presupuesto}`;
                        correo = `${actividades_apoyo.form.selected('responsable').correo}`;
                        titulo = `Actividad de apoyo "${data.updating.nombre}" ha cambiado su presupuesto`;
                        cuerpo = `${actividades_apoyo.user_old.name}, ha sido cambiado el presupuesto de la actividad de apoyo "${data.updating.nombre}" de ${LAN.money(actividades_apoyo.oldpresupuesto).format(false)} a ${actividades_apoyo.presupuesto}`;
                        function_send_email_group_user(titulo_push, cuerpo_push, titulo, cuerpo, actividades_apoyo.session.compania_id, actividades_apoyo.departamento, correo, actividades_apoyo.session.institucion_id);
                    }
                }
            };
            // end
            actividades_apoyo.form.readonly = {
                departamento_solicitante: user.departamento
            };
            actividades_apoyo.createForm(data, mode, defaultData);
            actividades_apoyo.form.schemas.insert.presupuesto_pro = FORM.schemasType.calculated;
            actividades_apoyo.form.schemas.insert.presupuesto_restante = FORM.schemasType.calculated;
            actividades_apoyo.form.schemas.update.presupuesto_pro = FORM.schemasType.calculated;
            actividades_apoyo.form.schemas.update.presupuesto_restante = FORM.schemasType.calculated;

            if (actividades_poa.producto_object) {
                actividades_apoyo.id_departamento = actividades_poa.producto_object.departamento_id;
            } else {
                actividades_apoyo.id_departamento = 0;
            }

            actividades_apoyo.triggers.table.after.control = function (data) {
                if (mode == 'new' && data == 'range_date2') {
                    actividades_apoyo.range_date2 = '';
                    actividades_apoyo.range_date2_min(actividades_poa.fecha_inicio);
                    actividades_apoyo.range_date2_max(actividades_poa.fecha_fin);
                    actividades_apoyo.range_date2_start('01-01-' + user.periodo_poa);
                    actividades_apoyo.range_date2_end('31-12-' + user.periodo_poa);
                    actividades_apoyo.refreshAngular();
                }
                if (mode == 'edit' && data == 'range_date2') {
                    actividades_apoyo.range_date2_min(actividades_poa.fecha_inicio);
                    actividades_apoyo.range_date2_max(actividades_poa.fecha_fin);
                    actividades_apoyo.range_date2_start('01-01-' + user.periodo_poa);
                    actividades_apoyo.range_date2_end('31-12-' + user.periodo_poa);
                    actividades_apoyo.refreshAngular();
                }
                if (data === "departamento") {
                    loaded = true;
                    if (actividades_apoyo.form.selected('departamento') !== null) {
                        actividades_apoyo.presupuesto_anterior = 0;

                        actividades_apoyo.edit_departamento = actividades_apoyo.form.selected('departamento').id;
                        var presupuesto_restante = mode == 'new' ? LAN.money(actividades_apoyo.form.selected('departamento').presupuesto_restante).value : LAN.money(actividades_apoyo.form.selected('departamento').presupuesto_restante_editar).value;
                        var presupuesto = LAN.money(actividades_apoyo.presupuesto).value;
                        actividades_apoyo.presupuesto_anterior = presupuesto;

                        actividades_apoyo.presupuesto_restante_total = LAN.money((presupuesto_restante + presupuesto)).format(false);
                        actividades_apoyo.form.selected('departamento').presupuesto = LAN.money(actividades_apoyo.form.selected('departamento').presupuesto).format(false);

                        actividades_apoyo.presupuesto_restante = LAN.money(actividades_apoyo.presupuesto_restante_calculate()).format(false);
                        actividades_apoyo.true_presupuesto_restante_act = actividades_apoyo.presupuesto_restante;
                        actividades_apoyo.refreshAngular();
                    }
                    if (actividades_apoyo.presupuesto) {
                        actividades_apoyo.presupuesto = LAN.money(actividades_apoyo.presupuesto).format(false);
                        actividades_apoyo.refreshAngular();
                    }
                }
                if (mode === 'edit' && data === 'departamento') {
                    actividades_apoyo.new_dept = actividades_apoyo.departamento;
                    actividades_apoyo.paso = true;
                }
                if (mode === 'edit' && data === 'responsable') {
                    actividades_apoyo.user_old = actividades_apoyo.form.selected('responsable');
                }
                if (data === 'estatus' && mode === 'new') {
                    actividades_apoyo.estatus = "1";
                    actividades_apoyo.refreshAngular();
                }
                ["bienes_permiso", "bienes_permiso_nombre", "presupuestario", "presupuestario_nombre"].forEach(d => {
                    if (actividades_apoyo[d] === '[NULL]')
                        actividades_apoyo[d] = '';
                });
            };

            actividades_apoyo.$scope.$watch('actividades_apoyo.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_apoyo, "nombre", rules)
            });
            actividades_apoyo.$scope.$watch('actividades_apoyo.departamento', function (value) {

                if (actividades_apoyo.form.selected('departamento') !== null) {
                    var presupuesto_restante = mode == 'new' ? LAN.money(actividades_apoyo.form.selected('departamento').presupuesto_restante).value : LAN.money(actividades_apoyo.form.selected('departamento').presupuesto_restante_editar).value;
                    actividades_apoyo.presupuesto_pro = LAN.money(actividades_apoyo.form.selected('departamento').presupuesto).format(false);
                    actividades_apoyo.presupuesto_restante = actividades_apoyo.presupuesto_restante_calculate();
                    if (actividades_apoyo.edit_departamento != value) {
                        actividades_apoyo.presupuesto_restante_total = LAN.money((presupuesto_restante)).format(false);
                    } else {
                        actividades_apoyo.presupuesto_restante_total = LAN.money((presupuesto_restante + actividades_apoyo.presupuesto_anterior)).format(false);
                    }
                    // if (actividades_poa.limpiar) {
                    //     if (actividades_poa.form.selected('producto')) {
                    //         actividades_poa.form.selected('producto').fecha_fin = "";
                    //         actividades_poa.form.selected('producto').fecha_inicio = "";
                    //         actividades_poa.form.selected('producto').resultado = "";
                    //     }
                    //
                    //     actividades_poa.range_date = "";
                    //     actividades_poa.presupuesto = 0;
                    // }
                    actividades_apoyo.range_date = "";
                    actividades_apoyo.presupuesto = 0;
                    actividades_apoyo.limpiar = true;

                    actividades_apoyo.form.selected('departamento').presupuesto = LAN.money(actividades_apoyo.form.selected('departamento').presupuesto).format(false);
                    actividades_apoyo.updateInputPresupuesto();
                }

                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_apoyo, "departamento", rules)
            });
            actividades_apoyo.$scope.$watch('actividades_apoyo.responsable', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_apoyo, "responsable", rules)
            });
            actividades_apoyo.$scope.$watch('actividades_apoyo.fecha_inicio', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_apoyo, "fecha_inicio", rules)

            });
            actividades_apoyo.$scope.$watch('actividades_apoyo.fecha_fin', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_apoyo, "fecha_fin", rules)
            });
            actividades_apoyo.$scope.$watch('actividades_apoyo.range_date2', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(actividades_apoyo, "fecha_inicio", rules);
                VALIDATION.validate(actividades_apoyo, "range_date2", rules);
            });
            // data.updating.presupuestario = '$NULL';
            // data.updating.presupuestario_nombre = '$NULL';
            actividades_apoyo.$scope.$watch('actividades_apoyo.descripcion', function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(actividades_apoyo, "descripcion", rules)
            });
            actividades_apoyo.$scope.$watch('actividades_apoyo.maneja_presupuesto_act_apoyo', function (value) {
                if (value !== false) {
                    if (!DSON.oseaX('actividades_poa')) {
                        actividades_apoyo.presupuesto_pro = actividades_poa.presupuesto_pro;
                        actividades_apoyo.departamento = actividades_poa.departamento;
                        if (actividades_apoyo.form.options.departamento)
                            actividades_apoyo.form.options.departamento.disabled = true;
                        actividades_apoyo.form.loadDropDown('departamento');
                    }
                } else {
                    if (actividades_apoyo.form.mode != "edit") {
                        actividades_apoyo.departamento = '[NULL]';
                        if (actividades_apoyo.departamento) {
                            actividades_apoyo.form.options.departamento.disabled = false;
                        }
                        actividades_apoyo.form.loadDropDown('departamento');
                    } else {
                        if (actividades_apoyo.paso) {
                            actividades_apoyo.departamento = '[NULL]';
                            if (actividades_apoyo.departamento) {
                                actividades_apoyo.form.options.departamento.disabled = false;
                            }
                            actividades_apoyo.form.loadDropDown('departamento');
                        }
                    }
                    actividades_apoyo.tipo_inversion = "[NULL]";
                    actividades_apoyo.form.loadDropDown('tipo_inversion');
                }

                if ((value)) {
                    actividades_apoyo.pages.form.save = function (pre, post, close) {
                        console.log("Entre al metodo sobreescrito");
                        var $scope = actividades_apoyo;
                        var newRecord = {};
                        var state = $scope.validation.statePure(['nombre', 'departamento', 'responsable', 'fecha_inicio', 'fecha_fin', 'range_date2', 'presupuesto']);
                        if (state === VALIDATION.types.success) {
                            $scope.form.saveAction(close);
                        } else {
                            if (state === VALIDATION.types.warning) {
                                SWEETALERT.confirm({
                                    message:
                                        MESSAGE.i('alerts.ContainsWarning'),
                                    confirm: function () {
                                        $scope.form.saveAction(close);
                                    }
                                });
                            } else {
                                $scope.form.intent = true;
                                SWEETALERT.show({
                                    type: "error",
                                    message: MESSAGE.i('alerts.ContainsError'),
                                    confirm: function () {
                                        $scope.pages.form.focusFirstValidation();
                                    }
                                });

                            }
                        }
                    };
                } else {
                    actividades_apoyo.pages.form.save = function (pre, post, close) {
                        console.log("Entre al metodo sobreescrito");
                        var $scope = actividades_apoyo;
                        var newRecord = {};
                        var state = $scope.validation.statePure(['nombre', 'departamento', 'responsable', 'fecha_inicio', 'fecha_fin', 'range_date2']);
                        if (state === VALIDATION.types.success) {
                            $scope.form.saveAction(close);
                        } else {
                            if (state === VALIDATION.types.warning) {
                                SWEETALERT.confirm({
                                    message:
                                        MESSAGE.i('alerts.ContainsWarning'),
                                    confirm: function () {
                                        $scope.form.saveAction(close);
                                    }
                                });
                            } else {
                                $scope.form.intent = true;
                                SWEETALERT.show({
                                    type: "error",
                                    message: MESSAGE.i('alerts.ContainsError'),
                                    confirm: function () {
                                        $scope.pages.form.focusFirstValidation();
                                    }
                                });

                            }
                        }
                    };
                    actividades_apoyo.updateInputPresupuesto();
                }
                // var rules = [];
                // VALIDATION.validate(actividades_apoyo, "maneja_presupuesto_act_apoyo", rules)
            });
            actividades_apoyo.updateInputPresupuesto = function () {
                actividades_apoyo.refreshAngular();
            };
            actividades_apoyo.$scope.$watch('actividades_apoyo.presupuesto', async function (value) {
                var rules = [];
                var GB_PRA = actividades_apoyo.presupuesto_anterior;
                actividades_apoyo.presupuesto_restante = LAN.money(actividades_apoyo.presupuesto_restante_calculate(value)).format(false);
                // if (FORM.modes.new == mode) {
                //     actividades_apoyo.presupuesto_restante = LAN.money(actividades_apoyo.presupuesto_restante).value;
                //     actividades_apoyo.lista_valore_presupuesto = await BASEAPI.listp('actividades_apoyo', {
                //         where: [{
                //             field: "tempid",
                //             value: "actividades_poa" + actividades_poa.form.options.actividades_apoyo.tempId
                //         }]
                //     });
                //     for (item of actividades_apoyo.lista_valore_presupuesto.data) {
                //         actividades_apoyo.presupuesto_restante -= item.presupuesto;
                //     }
                //     actividades_apoyo.presupuesto_restante = LAN.money(actividades_apoyo.presupuesto_restante).format(false);
                //     actividades_apoyo.refreshAngular();
                // }
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.mayorCero(value, "presupuesto"));
                if (typeof value == "string") {
                    rules.push(VALIDATION.yariel.greaterThanAct(
                        parseFloat(DSON.cleanNumber(value)),
                        (parseFloat(DSON.cleanNumber(actividades_apoyo.true_presupuesto_restante)) + GB_PRA),
                        "El monto de la actividad de apoyo", "Presupuesto disponible del departamento"));
                }
                VALIDATION.validate(actividades_apoyo, "presupuesto", rules);
            });
            actividades_apoyo.closeModal = async function () {
                actividades_apoyo.pages.form.close();
            }
            actividades_apoyo.presupuesto_restante_calculate = function (value) {

                if (actividades_apoyo.form.selected('departamento') !== null) {
                    var DB_PRR = LAN.money(actividades_apoyo.form.selected('departamento').presupuesto_restante).value;
                    var PT_PR = LAN.money(value).value || LAN.money(actividades_apoyo.presupuesto).value;
                    var GB_PRA = LAN.money(actividades_apoyo.presupuesto_anterior).value;
                    var LT_AP = LAN.money(actividades_apoyo.lista_presupuesto_act_apoyo).value;
                    var AC_PS = LAN.money(actividades_apoyo.valor_act_poa_press).value || 0;

                    if (actividades_poa.form.mode == 'new') {
                        var RESTANTE = mode == 'new' ?
                            (DB_PRR - PT_PR) - LAN.money(actividades_poa.presupuesto).value :
                            ((DB_PRR + GB_PRA) - PT_PR) - LAN.money(actividades_poa.presupuesto).value;
                    } else {
                        var RESTANTE = mode == 'new' ?
                            (DB_PRR - PT_PR) :
                            (DB_PRR + GB_PRA) - PT_PR;
                    }

                    return LAN.money(RESTANTE).format(false);
                }
            };
        }
    };
});
