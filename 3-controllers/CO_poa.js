app.controller("poa", function ($scope, $http, $compile) {
    poa = this;
    poa.respuesta = [];
    poa.respuesta_pei = [];
    poa.pei;
    var session = new SESSION().current();
    poa.periodos_poa = [];
    poa.periodo_poa;
    poa.peis = [];
    poa.headertitle = "POA";

    poa.refrescar = function () {

        if (compania) {
            BASEAPI.listp('pei', {
                limit: 0,
                where: [{
                    field: compania.form.mode == "new" ? 'tempid' : 'compania',
                    value: compania.form.mode == "new" ? 'compania' + compania.form.options.pei.tempId : compania.id,
                },
                    {
                        "field": "institucion",
                        "operator": "IS",
                        "value": "$NULL"
                    }]
            }).then(function (response) {
                var peis = [];

                if (response.data.length > 0) {
                    for (var pei of response.data) {
                        peis.push(pei.id);
                    }
                }
                poa.fixFilters = [
                    {
                        field: 'pei_id',
                        value: peis
                    }
                ];
                poa.peis = peis;
                poa.drp_pei = response.data;
                poa.respuesta_pei = response.data;
                poa.refresh();
            });
        } else {
            BASEAPI.listp('pei', {
                limit: 0,
                where: [{
                    field: institucion.form.mode == "new" ? 'tempid' : 'institucion',
                    value: institucion.form.mode == "new" ? 'institucion' + institucion.form.options.pei.tempId : institucion.id,
                }]
            }).then(function (response) {
                var peis = [];

                if (response.data.length > 0) {
                    for (var pei of response.data) {
                        peis.push(pei.id);
                    }
                }
                poa.fixFilters = [
                    {
                        field: 'pei_id',
                        value: peis
                    }
                ];
                poa.peis = peis;
                poa.drp_pei = response.data;
                poa.respuesta_pei = response.data;
                poa.refresh();
            });
        }
    };

    if (compania) {
        if (compania.form.mode != "new") {
            poa.refrescar();
        }
    } else {
        if (institucion)
            if (institucion.form.mode != "new") {
                poa.refrescar();
            }

    }

    poa.enviar_poa = function () {
        SWEETALERT.confirm({
            message: 'Está seguro de realizar esta acción',
            confirm: function () {
                SWEETALERT.loading({message: "Transfiriendo Actividades y Asignaciones..."});
                BASEAPI.first('poa', {
                    "where": [
                        {
                            "field": "id",
                            "value": poa.ids,
                        }
                    ]
                }, function (rs_poa) {
                    poa.actual = rs_poa;
                    poa.proximo_periodo = parseInt(rs_poa.periodo_poa) + 1;
                    BASEAPI.first('poa', {
                        "where": [
                            {
                                "field": "pei",
                                "value": poa.peis
                            },
                            {
                                "field": "periodo_poa",
                                "value": poa.proximo_periodo
                            }
                        ]
                    }, function (rs_proximo_poa) {
                        if (rs_proximo_poa !== undefined) {
                            poa.proximo_poa = rs_proximo_poa;
                            if (trabajar_actividades_poa_monitoreo.records.data.length > 0) {
                                SERVICE.planificacion_transfer.senditems({
                                    poa_id: poa.ids,
                                    poa_proximo: poa.proximo_poa.id
                                }, function (result) {
                                    console.log(result);
                                    if (result.data.error == false) {
                                        BASEAPI.updateall('poa', {
                                            "activo": 0,
                                            where: [{
                                                "field": "id",
                                                "value": poa.ids
                                            }]
                                        }, function (result5) {
                                            BASEAPI.updateall('poa', {
                                                "activo": 1,
                                                where: [{
                                                    "field": "id",
                                                    "value": poa.proximo_poa.id
                                                }]
                                            }, async function (result6) {
                                                SWEETALERT.stop();


                                                SWEETALERT.show({message: `Las Actividades y Asignaciones del POA: ` + poa.actual.nombre + ` pasaron al POA: ` + poa.proximo_poa.nombre});
                                                poa.refrescar();
                                                MODAL.closeAll();

                                            });
                                        });
                                    }
                                });

                            } else {
                                SWEETALERT.show({message: `No hay Actividades POA para transferir`});
                            }

                        } else {
                            SWEETALERT.show({message: `El POA siguiente ` + poa.proximo_periodo + ` no existe`});
                        }
                    });

                });
            }
        });
    };

    RUNCONTROLLER("poa", poa, $scope, $http, $compile);

    poa.plural = "POA";
    poa.singular = "POA";


    poa.afterDelete = function (data) {
        if (session.pei_id == data.pei_id) {
            if (data.activo == 1) {
                SWEETALERT.loading({message: `Eliminando poa  ${data.nombre} - ${data.periodo_poa}...`});
                new SESSION().update(
                    {
                        poa_id: "",
                        poa: "",
                        periodo_poa: "",
                        estado: "",
                        est_poa: "",
                        periodo_poa_msj: "",
                        cantidad: "",
                        monitoreo_nombre: ""
                    });
                location.reload();
            } else {
                SWEETALERT.loading({message: `Eliminando poa  ${data.nombre} - ${data.periodo_poa}...`});
                 BASEAPI.list('drp_poa_navbar', {
                    limit: 0,
                    order: 'asc',
                    orderby: 'periodo_poa',
                    where: [
                        {
                            "field": "pei",
                            "value": data.pei_id
                        }
                    ]
                }, function(result){
                    var condition = false;
                    if (result.data)
                        if (result.data.length > 0) {
                            baseController.poaList = result.data;
                            baseController.poaFirt = result.data.filter(d2 => {
                                return d2.id == baseController.poaActual;
                            });
                            if (baseController.poaFirt.length > 0) {
                                for (var poa in result.data) {
                                    if (baseController.poaFirt[0].id == baseController.poaList[poa].id) {
                                        baseController.poaList[poa].selected = true;
                                    } else {
                                        baseController.poaList[poa].selected = false;
                                    }
                                }
                                baseController.poaFullName = baseController.poaFirt[0].nombre + ' - ' + baseController.poaFirt[0].periodo_poa;
                                new SESSION().update({
                                    poa_id: baseController.poaFirt[0].id,
                                    poaActual: baseController.poaFirt[0].id,
                                    poaFirt: baseController.poaFirt,
                                    poaList: baseController.poaList,
                                    poaFullName: baseController.poaFullName,
                                    poa: baseController.poaFirt[0].nombre,
                                    periodo_poa: baseController.poaFirt[0].periodo_poa,
                                    estado: baseController.poaFirt[0].activo,
                                    est_poa: baseController.poaFirt[0].estado,
                                    periodo_poa_msj: `POA ${baseController.poaFirt[0].periodo_poa}`,
                                    cantidad: baseController.poaFirt[0].cantidad,
                                    monitoreo_nombre: baseController.poaFirt[0].nombre_mostrar
                                });
                            } else {
                                baseController.poaFirt = [baseController.poaList[0]];
                                for (var poa in result.data) {
                                    if (baseController.poaFirt[0].id == baseController.poaList[poa].id) {
                                        baseController.poaList[poa].selected = true;
                                    } else {
                                        baseController.poaList[poa].selected = false;
                                    }
                                }
                                baseController.poaFullName = baseController.poaFirt[0].nombre + ' - ' + baseController.poaFirt[0].periodo_poa;
                                new SESSION().update({
                                    poa_id: baseController.poaFirt[0].id,
                                    poaActual: baseController.poaFirt[0].id,
                                    poaFirt: baseController.poaFirt,
                                    poaList: baseController.poaList,
                                    poaFullName: baseController.poaFullName,
                                    poa: baseController.poaFirt[0].nombre,
                                    periodo_poa: baseController.poaFirt[0].periodo_poa,
                                    estado: baseController.poaFirt[0].activo,
                                    est_poa: baseController.poaFirt[0].estado,
                                    periodo_poa_msj: `POA ${baseController.poaFirt[0].periodo_poa}`,
                                    cantidad: baseController.poaFirt[0].cantidad,
                                    monitoreo_nombre: baseController.poaFirt[0].nombre_mostrar
                                });
                            }
                        } else {
                            baseController.poaFullName = "Seleccione un poa";
                            new SESSION().update({
                                poa_id: "",
                                poaActual: "",
                                poaFirt: "",
                                poaList: "",
                                poaFullName: baseController.poaFullName,
                                poa: "",
                                periodo_poa: "",
                                estado: "",
                                est_poa: "",
                                periodo_poa_msj: "",
                                cantidad: "",
                                monitoreo_nombre: ""
                            });
                        }
                location.reload();
                });


            }
        } else {
            //pei_admin.refresh();
        }
    };
    poa.asignaciones_pasadas = false;
    poa.openmodalField = function (value) {
        poa.ids = value;
        poa.estado_validate = false;
        poa.actividades_pendientes = [];
        poa.proximo_poa = {};
        poa.proximo_validar = false;
        poa.proximo_periodo = 0;
        poa.asignaciones_pendientes = [];
        poa.actual = {};
        poa.whereActividades = [];
        poa.whereAsignaciones = [];
        poa.rs_actividades_poa = [];


        poa.modal.modalView("poa/closePOA", {
            width: 'modal-full',
            header: {
                title: "Cerrar POA",
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                }
            },
        });


    };
    poa.openmodalField = function (value, row) {
        poa.actual = {};
        poa.ids = Row_id ? Row_id : value;
        poa.proximo_poa = {};
        poa.proximo_periodo = 0;

        console.log(poa.ids);
        // poa_admin = poa;
        baseController.modal.modalView("poa_admin/closePOA", {
            width: 'modal-full',
            header: {
                title: `Cerrar POA ${row.periodo_poa}`,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: "poa_admin"
            },
            event: {
                show: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                },
                hide: {
                    begin: function (data) {

                    },
                    end: function (data) {

                    }
                }
            },
        });
    };

    if (compania) {
        if (compania.form.mode == "new") {

            RUN_B("poa", poa, $scope, $http, $compile);

            poa.form.titles = {
                new: MESSAGE.i('planificacion.titlepoa'),
                edit: "Editar - " + ` ${MESSAGE.i('planificacion.titlepoa')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlepoa')}`
            }

        }
    } else {
        if (institucion.form.mode == "new") {

            RUN_B("poa", poa, $scope, $http, $compile);

            poa.form.titles = {
                new: MESSAGE.i('planificacion.titlepoa'),
                edit: "Editar - " + ` ${MESSAGE.i('planificacion.titlepoa')}`,
                view: "Ver ALL - " + `${MESSAGE.i('planificacion.titlepoa')}`
            }


        }
    }

    poa.formulary = function (data, mode, defaultData) {
        if (mode === "new") {
            if (!(baseController.session.multianual || baseController.session.multianual === null)) {
                SWEETALERT.show({
                    type: 'error',
                    message: `El plan ${baseController.session.nombre} no permite múltiples años del POA`
                });
                return;
            }
        }
        if (poa !== undefined) {
            RUN_B("poa", poa, $scope, $http, $compile);

            poa.form.readonly = {pei: poa.pei, periodo_poa: poa.periodo_poa, estado: 4, active: 1};
            if (typeof institucion !== "undefined")
                if (institucion)
                    if (institucion.form) {
                        poa.form.readonly.compania = institucion.compania;
                    }
            poa.createForm(data, mode, defaultData);
            poa.form.titles = {
                new: "Agregar  POA",
                edit: "Editar  POA"
            }
            poa.triggers.table.after.control = function (data) {
                if (mode == 'new' && data == 'estado') {
                    poa.estado = "4";
                    poa.form.options.estado.disabled = true;
                    poa.refreshAngular();
                }
            };
            poa.triggers.table.after.close = function (data) {
                pei.refresh();
            };

            poa.refrescar();
            poa.$scope.$watch('poa.nombre', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(poa, "nombre", rules);
            });
            poa.$scope.$watch('poa.periodo_poa', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "periodo_poa", rules);
            });
            poa.$scope.$watch('poa.monitoreo', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "monitoreo", rules);
            });
            poa.$scope.$watch('poa.estado', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "estado", rules)
            });
            poa.$scope.$watch('poa.pei', function (value) {
                var rules = [];

                poa.periodos_poa = [];

                poa.periodos_poa_anadidos = [];

                var selected = poa.respuesta_pei.filter(data => {
                    return data.id == poa.pei;
                });

                if (selected.length > 0) {

                    if (selected[0].activo != 1) {
                        $("#checkDinamic").hide();
                        poa.activo = false;
                    } else {
                        $("#checkDinamic").show();
                    }

                    for (var o = 0; o < poa.records.data.length; o++) {
                        poa.periodos_poa_anadidos.push(poa.records.data[o].periodo_poa);
                    }

                    for (var i = selected[0].periodo_desde; i <= selected[0].periodo_hasta; i++) {
                        poa.periodos_poa_anadidos.includes(i) && poa.periodo_poa != i ? 0 : poa.periodos_poa.push(i);
                    }
                }
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(poa, "pei", rules);
            });
            poa.res = false;

            poa.triggers.table.before.insert = (data) => new Promise(async (resolve, reject) => {

                // if (poa.res)
                //     return false;
                // poa.res = true;
                poa.respuesta = [];
                var result = await BASEAPI.listp('poa', {
                    "where": [
                        {
                            "field": "pei",
                            "value": poa.peis
                        }
                    ]
                });

                poa.respuesta = result.data;
                poa.selected_activo = poa.respuesta.filter(information => {
                    if (data.inserting.activo == true) {
                        return information.activo == 1;
                    }
                });

                poa.selected_periodo_poa = poa.respuesta.filter(information => {
                    return data.inserting.periodo_poa == information.periodo_poa;
                });

                if (poa.selected_activo.length > 0) {
                    SWEETALERT.show({message: `Ya existe un POA activo - ${poa.selected_activo[0].nombre}`});
                    poa.res = false;
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                    return;
                } else if (poa.selected_periodo_poa.length > 0) {
                    SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.inserting.periodo_poa} nombre: ` + poa.selected_periodo_poa[0].nombre});
                    poa.res = false;
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                    return;
                } else {
                    // poa.form.saveAction();
                    // SWEETALERT.stop();
                }

                if (session.pei_id == data.inserting.pei) {
                    if (data.inserting.activo == 1) {
                        SWEETALERT.confirm({
                            message: "Al activar el POA se estarán refrescando todas las variables temporales utilizadas en Syplans y deberá volver a iniciar la sesión",
                            confirm: function () {

                                resolve(true);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                } else {
                    resolve(true);
                }


            });
            poa.triggers.table.before.update = (data) => new Promise(async (resolve, reject) => {
                // if (poa.res)
                //     return false;
                // poa.res = true;
                poa.respuesta = [];
                var result = await BASEAPI.listp('poa', {
                    "where": [
                        {
                            "field": "pei",
                            "value": poa.peis,

                        },
                        {
                            "field": "id",
                            "operator": "!=",
                            "value": poa.id
                        }
                    ]
                });

                poa.respuesta = result.data;

                poa.selected_activo = poa.respuesta.filter(information => {
                    if (data.updating.activo == true) {
                        return information.activo == 1;
                    }

                });

                poa.selected_periodo_poa = poa.respuesta.filter(information => {
                    return data.updating.periodo_poa == information.periodo_poa;
                });

                if (poa.selected_activo.length > 0) {
                    SWEETALERT.show({message: `Ya existe un POA activo - ${poa.selected_activo[0].nombre}`});
                    poa.res = false;
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                    return;
                } else if (poa.selected_periodo_poa.length > 0) {
                    SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.updating.periodo_poa} nombre: ` + poa.selected_periodo_poa[0].nombre});
                    poa.res = false;
                    var buttons = document.getElementsByClassName("btn btn-labeled");
                    for (var item of buttons) {
                        item.disabled = false;
                    }
                    resolve(false);
                    return;
                } else {

                }

                if (session.pei_id == data.updating.pei) {
                    if (data.updating.activo == 1) {
                        SWEETALERT.confirm({
                            message: "Al activar el POA se estarán refrescando todas las variables temporales utilizadas en Syplans y deberá volver a iniciar la sesión",
                            confirm: function () {
                                resolve(true);
                            }
                        });
                    } else {
                        resolve(true);
                    }
                } else {
                    resolve(true);
                }

            });
            poa.triggers.table.after.insert = function (data) {
                console.log(data)
                if (session.pei_id == data.inserted.pei) {
                    SWEETALERT.loading({message: `Activando poa  ${data.inserted.nombre} - ${data.inserted.periodo_poa}...`});
                    BASEAPI.list('drp_poa_navbar', {
                        limit: 0,
                        order: 'asc',
                        orderby: 'periodo_poa',
                        where: [
                            {
                                "field": "pei",
                                "value": poa.pei
                            }
                        ]
                    }, function(result){
                        var condition = false;
                        if (result.data)
                            if (result.data.length > 0) {
                                baseController.poaList = result.data;
                                baseController.poaFirt = result.data.filter(d2 => {
                                    return d2.id == baseController.poaActual;
                                });
                                if (baseController.poaFirt.length > 0) {
                                    for (var poa in result.data) {
                                        if (baseController.poaFirt[0].id == baseController.poaList[poa].id) {
                                            baseController.poaList[poa].selected = true;
                                        } else {
                                            baseController.poaList[poa].selected = false;
                                        }
                                    }
                                    baseController.poaFullName = baseController.poaFirt[0].nombre + ' - ' + baseController.poaFirt[0].periodo_poa;
                                    new SESSION().update({
                                        poa_id: baseController.poaFirt[0].id,
                                        poaActual: baseController.poaFirt[0].id,
                                        poaFirt: baseController.poaFirt,
                                        poaList: baseController.poaList,
                                        poaFullName: baseController.poaFullName,
                                        poa: baseController.poaFirt[0].nombre,
                                        periodo_poa: baseController.poaFirt[0].periodo_poa,
                                        estado: baseController.poaFirt[0].activo,
                                        est_poa: baseController.poaFirt[0].estado,
                                        periodo_poa_msj: `POA ${baseController.poaFirt[0].periodo_poa}`,
                                        cantidad: baseController.poaFirt[0].cantidad,
                                        monitoreo_nombre: baseController.poaFirt[0].nombre_mostrar,
                                        poa_habilitado: baseController.poaFirt[0].poa_habilitado
                                    });
                                } else {
                                    baseController.poaFirt = [baseController.poaList[0]];
                                    for (var poa in result.data) {
                                        if (baseController.poaFirt[0].id == baseController.poaList[poa].id) {
                                            baseController.poaList[poa].selected = true;
                                        } else {
                                            baseController.poaList[poa].selected = false;
                                        }
                                    }
                                    baseController.poaFullName = baseController.poaFirt[0].nombre + ' - ' + baseController.poaFirt[0].periodo_poa;
                                    new SESSION().update({
                                        poa_id: baseController.poaFirt[0].id,
                                        poaActual: baseController.poaFirt[0].id,
                                        poaFirt: baseController.poaFirt,
                                        poaList: baseController.poaList,
                                        poaFullName: baseController.poaFullName,
                                        poa: baseController.poaFirt[0].nombre,
                                        periodo_poa: baseController.poaFirt[0].periodo_poa,
                                        estado: baseController.poaFirt[0].activo,
                                        est_poa: baseController.poaFirt[0].estado,
                                        periodo_poa_msj: `POA ${baseController.poaFirt[0].periodo_poa}`,
                                        cantidad: baseController.poaFirt[0].cantidad,
                                        monitoreo_nombre: baseController.poaFirt[0].nombre_mostrar,
                                        poa_habilitado: baseController.poaFirt[0].poa_habilitado
                                    });
                                }
                            } else {
                                baseController.poaFullName = "Seleccione un poa";
                                new SESSION().update({
                                    poa_id: "",
                                    poaActual: "",
                                    poaFirt: "",
                                    poaList: "",
                                    poaFullName: baseController.poaFullName,
                                    poa: "",
                                    periodo_poa: "",
                                    estado: "",
                                    est_poa: "",
                                    periodo_poa_msj: "",
                                    cantidad: "",
                                    monitoreo_nombre: ""
                                });
                            }
                        location.reload();
                    });
                } else {

                }
            };
            poa.triggers.table.after.update = function (data) {
                if (session.pei_id == poa.pei) {
                    if (data.updating.activo == 1) {
                        SWEETALERT.loading({message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});

                        for (var i = 1; i <= 5; i++) {
                            setTimeout(function () {
                                SWEETALERT.loading({
                                    message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                                    animation: ""
                                });
                            }, i * 500);
                        }

                        var parasalior = {
                            poa_id: poa.id,
                            poa: data.updating.nombre,
                            periodo_poa: data.updating.periodo_poa,
                            estado: data.updating.activo,
                            est_poa: data.updating.estado,
                            periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                            cantidad: poa.form.selected('monitoreo').cantidad,
                            monitoreo_nombre: poa.form.selected('monitoreo').nombre_mostrar,
                            poa_habilitado: poa.active
                        };
                        setTimeout(function () {
                            new SESSION().update(
                                parasalior);
                            new SESSION().destroy();
                            location.reload();
                        }, 5000);

                    } else {
                        SWEETALERT.loading({message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});
                        for (var i = 1; i <= 5; i++) {
                            setTimeout(function () {
                                SWEETALERT.loading({
                                    message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                                    animation: ""
                                });
                            }, i * 500);
                        }
                        var parasalior = {
                            poa_id: poa.id,
                            poa: data.updating.nombre,
                            periodo_poa: data.updating.periodo_poa,
                            estado: data.updating.activo,
                            est_poa: data.updating.estado,
                            periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                            cantidad: poa.form.selected('monitoreo').cantidad,
                            monitoreo_nombre: poa.form.selected('monitoreo').nombre_mostrar,
                            poa_habilitado: poa.active
                        };
                        setTimeout(function () {
                            new SESSION().update(
                                parasalior);
                            location.reload();
                        }, 5000);
                    }
                } else {
                    // pei_admin.refresh();
                }
                if (session.pei_id == poa.pei) {


                    if (data.updating.activo == 1) {
                        SWEETALERT.loading({message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});

                        for (var i = 1; i <= 5; i++) {
                            setTimeout(function () {
                                SWEETALERT.loading({
                                    message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                                    animation: ""
                                });
                            }, i * 500);
                        }

                        var parasalior = {
                            poa_id: poa.id,
                            poa: data.updating.nombre,
                            periodo_poa: data.updating.periodo_poa,
                            estado: data.updating.activo,
                            est_poa: data.updating.estado,
                            periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                            cantidad: poa.form.selected('monitoreo').cantidad,
                            monitoreo_nombre: poa.form.selected('monitoreo').nombre_mostrar,
                            poa_habilitado: poa.active
                        };
                        setTimeout(function () {
                            new SESSION().update(
                                parasalior);
                            new SESSION().destroy();
                            location.reload();
                        }, 5000);

                    } else {
                        SWEETALERT.loading({message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});
                        for (var i = 1; i <= 5; i++) {
                            setTimeout(function () {
                                SWEETALERT.loading({
                                    message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                                    animation: ""
                                });
                            }, i * 500);
                        }
                        var parasalior = {
                            poa_id: poa.id,
                            poa: data.updating.nombre,
                            periodo_poa: data.updating.periodo_poa,
                            estado: data.updating.activo,
                            est_poa: data.updating.estado,
                            periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                            cantidad: poa.form.selected('monitoreo').cantidad,
                            monitoreo_nombre: poa.form.selected('monitoreo').nombre_mostrar,
                            poa_habilitado: poa.active
                        };
                        setTimeout(function () {
                            new SESSION().update(
                                parasalior);
                            location.reload();
                        }, 5000);
                    }
                } else {
                    // pei_admin.refresh();
                }
                if (session.pei_id == poa.pei) {


                    if (data.updating.activo == 1) {
                        SWEETALERT.loading({message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});

                        for (var i = 1; i <= 5; i++) {
                            setTimeout(function () {
                                SWEETALERT.loading({
                                    message: `Activando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                                    animation: ""
                                });
                            }, i * 500);
                        }

                        var parasalior = {
                            poa_id: poa.id,
                            poa: data.updating.nombre,
                            periodo_poa: data.updating.periodo_poa,
                            estado: data.updating.activo,
                            est_poa: data.updating.estado,
                            periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                            cantidad: poa.form.selected('monitoreo').cantidad,
                            monitoreo_nombre: poa.form.selected('monitoreo').nombre_mostrar
                        };
                        setTimeout(function () {
                            new SESSION().update(
                                parasalior);
                            new SESSION().destroy();
                            location.reload();
                        }, 5000);

                    } else {
                        SWEETALERT.loading({message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`});
                        for (var i = 1; i <= 5; i++) {
                            setTimeout(function () {
                                SWEETALERT.loading({
                                    message: `Desactivando poa  ${data.updating.nombre} - ${data.updating.periodo_poa}...`,
                                    animation: ""
                                });
                            }, i * 500);
                        }
                        var parasalior = {
                            poa_id: poa.id,
                            poa: data.updating.nombre,
                            periodo_poa: data.updating.periodo_poa,
                            estado: data.updating.activo,
                            est_poa: data.updating.estado,
                            periodo_poa_msj: `POA ${data.updating.periodo_poa}`,
                            cantidad: poa.form.selected('monitoreo').cantidad,
                            monitoreo_nombre: poa.form.selected('monitoreo').nombre_mostrar
                        };
                        setTimeout(function () {
                            new SESSION().update(
                                parasalior);
                            location.reload();
                        }, 5000);
                    }
                } else {
                    // //pei_admin.refresh();
                }
            };
            // poa.form.before.insert = function (data) {
            //
            //
            //     return true;
            // };
            //
            // poa.form.before.update = function (data) {
            //     if (poa.res)
            //         return false;
            //     poa.res = true;
            //     poa.respuesta = [];
            //     BASEAPI.list('poa', {
            //         "where": [
            //             {
            //                 "field": "pei",
            //                 "value": poa.peis,
            //
            //             },
            //             {
            //                 "field": "id",
            //                 "operator": "!=",
            //                 "value": poa.id
            //             }
            //         ]
            //     }, function (result) {
            //         poa.respuesta = result.data;
            //
            //         poa.selected_activo = poa.respuesta.filter(information => {
            //             if (data.updating.activo == true) {
            //                 return information.activo == 1;
            //             }
            //
            //         });
            //
            //         poa.selected_periodo_poa = poa.respuesta.filter(information => {
            //             return data.updating.periodo_poa == information.periodo_poa;
            //         });
            //
            //         if (poa.selected_activo.length > 0) {
            //             SWEETALERT.show({message: `Ya existe un POA activo - ${poa.selected_activo[0].nombre}`});
            //             poa.res = false;
            //         } else if (poa.selected_periodo_poa.length > 0) {
            //             SWEETALERT.show({message: `Ya existe un POA con el Periodo ${data.updating.periodo_poa} nombre: ` + poa.selected_periodo_poa[0].nombre});
            //             poa.res = false;
            //         } else {
            //             poa.form.saveAction();
            //             SWEETALERT.stop();
            //         }
            //     });
            //
            //     return true;
            // };

        }
    };


});
