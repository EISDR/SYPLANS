app.controller("vw_auditoria_programa", function ($scope, $http, $compile) {
    vw_auditoria_programa = this;
    vw_auditoria_programa.session = new SESSION().current();
    vw_auditoria_programa.fixFilters = [
        {
            field: "estatus",
            value: 5
        },
        {
            field: "compania",
            value: vw_auditoria_programa.session.compania_id
        },
        {
            "field": "institucion",
            "operator": vw_auditoria_programa.session.institucion_id ? "=" : "is",
            "value": vw_auditoria_programa.session.institucion_id ? vw_auditoria_programa.session.institucion_id : "$null"
        }
    ];
    vw_auditoria_programa.singular = "Programa de Auditoria";
    vw_auditoria_programa.plural = "Programa de Auditoria";
    vw_auditoria_programa.headertitle = "Programas de Auditoría Pasados";
    vw_auditoria_programa.destroyForm = false;
    vw_auditoria_programa.created = false;
    vw_auditoria_programa.firsttime = false;
    vw_auditoria_programa.planes_auditoria = [];
    vw_auditoria_programa.current_year = moment().format('YYYY');
    var animation = new ANIMATION();
    //vw_auditoria_programa.permissionTable = "tabletopermission";
    RUNCONTROLLER("vw_auditoria_programa", vw_auditoria_programa, $scope, $http, $compile);
    RUN_B("vw_auditoria_programa", vw_auditoria_programa, $scope, $http, $compile);
    vw_auditoria_programa.getPlanesAuditoria = function (callback) {
        animation.loading(`#PlanAuditoria`, "", ``, '30');
        vw_auditoria_programa.condition_plan = [
            {
                field: "id",
                value: vw_auditoria_programa.id
            }
        ];
        vw_auditoria_programa.planes = {
            cantidad: 0,
            preplanificacion: 0,
            planificadas: 0,
            autorizadas: 0,
            enproceso: 0,
            recoleccionfinalizadas: 0,
            informepreliminar: 0,
            finalizadas: 0,
            cerradas: 0
        };
        BASEAPI.listp('vw_dashboard_plan_auditoria', {
            limit: 0,
            orderby: "id",
            order: "asc",
            where: vw_auditoria_programa.condition_plan
        }).then( async function (result) {
            vw_auditoria_programa.nombre_estatus_plan = await BASEAPI.listp('auditoria_programa_plan_estatus', {
                limit: 0,
                orderby: "code",
                order: "asc",
                where: [
                    {
                        field: "entidad",
                        value: 1
                    }
                ]
            });
            vw_auditoria_programa.nombre_estatus_plan = vw_auditoria_programa.nombre_estatus_plan.data;
            vw_auditoria_programa.actualizacion = moment().format('DD/MM/YYYY h:mm');
            vw_auditoria_programa.listplanes = result;
            vw_auditoria_programa.array_planes = [];
            vw_auditoria_programa.planes.cantidad = 0;
            vw_auditoria_programa.planes.preplanificacion = 0;
            vw_auditoria_programa.planes.planificadas = 0;
            vw_auditoria_programa.planes.enproceso = 0;
            vw_auditoria_programa.planes.autorizadas = 0;
            vw_auditoria_programa.planes.recoleccionfinalizadas = 0;
            vw_auditoria_programa.planes.informepreliminar = 0;
            vw_auditoria_programa.planes.finalizadas = 0;
            vw_auditoria_programa.planes.cerradas = 0;
            if (vw_auditoria_programa.listplanes.data) {
                if (vw_auditoria_programa.listplanes.data.length > 0) {
                    for (var pr = 0; pr < vw_auditoria_programa.listplanes.data.length; pr++) {
                        vw_auditoria_programa.planes.preplanificacion += vw_auditoria_programa.listplanes.data[pr].preplanificacion;
                        vw_auditoria_programa.planes.planificadas += vw_auditoria_programa.listplanes.data[pr].planificadas;
                        vw_auditoria_programa.planes.enproceso += vw_auditoria_programa.listplanes.data[pr].enproceso;
                        vw_auditoria_programa.planes.autorizadas += vw_auditoria_programa.listplanes.data[pr].autorizadas;
                        vw_auditoria_programa.planes.recoleccionfinalizadas += vw_auditoria_programa.listplanes.data[pr].recoleccionfinalizadas;
                        vw_auditoria_programa.planes.informepreliminar += vw_auditoria_programa.listplanes.data[pr].informepreliminar;
                        vw_auditoria_programa.planes.finalizadas += vw_auditoria_programa.listplanes.data[pr].finalizadas;
                        vw_auditoria_programa.planes.cerradas += vw_auditoria_programa.listplanes.data[pr].cerradas;
                        vw_auditoria_programa.planes.cantidad += vw_auditoria_programa.listplanes.data[pr].cantidad;
                    }

                    for (var i in vw_auditoria_programa.planes) {
                        vw_auditoria_programa.planes[i] = parseInt(vw_auditoria_programa.planes[i]) < 10 ? ('0' + vw_auditoria_programa.planes[i]) : vw_auditoria_programa.planes[i];
                        if (i !== 'cantidad')
                            vw_auditoria_programa.array_planes.push(
                                {
                                    name: i == 'preplanificacion' ? vw_auditoria_programa.nombre_estatus_plan[0].nombre :  i == 'autorizadas' ? vw_auditoria_programa.nombre_estatus_plan[2].nombre :  i == 'recoleccionfinalizadas' ? vw_auditoria_programa.nombre_estatus_plan[5].nombre : i == 'informepreliminar' ? vw_auditoria_programa.nombre_estatus_plan[6].nombre : i == 'enproceso' ? vw_auditoria_programa.nombre_estatus_plan[3].nombre : i == "planificadas" ? vw_auditoria_programa.nombre_estatus_plan[1].nombre : i == "finalizadas" ? vw_auditoria_programa.nombre_estatus_plan[4].nombre :  i == "cerradas" ? vw_auditoria_programa.nombre_estatus_plan[7].nombre :"????",
                                    value: LAN.money(vw_auditoria_programa.planes[i]).value,
                                    percent: vw_auditoria_programa.planes.cantidad > 0 ? Math.round((LAN.money(vw_auditoria_programa.planes[i]).value / LAN.money(vw_auditoria_programa.planes.cantidad).value) * 100) + '%': '0%',
                                    total: LAN.money(vw_auditoria_programa.planes.cantidad).value,
                                    icon:  i == 'informepreliminar' ? 'icon-certificate' : i == 'recoleccionfinalizadas' ? 'icon-stack-check' : i == 'finalizadas' ? 'icon-checkmark4' : i == 'preplanificacion' ? 'icon-strategy' : i == 'planificadas' ? 'icon-arrow-right16' : i == 'autorizadas' ? 'icon-clipboard2' : i == 'enproceso' ? ' icon-cogs' : i == 'cerradas' ? ' icon-switch' : 'icon-question3',
                                    color: i == 'informepreliminar' ? '#6a46e0' : i == 'recoleccionfinalizadas' ? '#543070' : i == 'finalizadas' ? '#4451DB' : i == 'preplanificacion' ? '#5F5FAF' : i == 'planificadas' ? '#84a379' : i == 'autorizadas' ? '#548235' : i == 'enproceso' ? '#6b4d82' : i == 'cerradas' ? '#4613ed' :'#CCCCCC',
                                    order: i == 'informepreliminar' ? '6' : i == 'recoleccionfinalizadas' ? '5' : i == 'finalizadas' ? '7' : i == 'preplanificacion' ? '1' : i == 'planificadas' ? '2' : i == 'autorizadas' ? '3' : i == 'enproceso' ? '4' : i == 'cerradas' ? '8' : '9',
                                    light_color: i == 'informepreliminar' ? '#7c65c9' : i == 'recoleccionfinalizadas' ? '#995ccc' : i == 'finalizadas' ? '#7784FF' : i == 'preplanificacion' ? '#9292E2' : i == 'planificadas' ? '#a4de90' : i == 'autorizadas' ? '#87B568' : i == 'enproceso' ? '#a87dc9' : i == 'cerradas' ? '#7373ff' :  '#CCCCCC',
                                    font_color: 'white',
                                    title: "Hacer clic para ver detalle"
                                }
                            )
                    }
                }
            }
            animation.stoploading(`#PlanAuditoria`);
            vw_auditoria_programa.refreshAngular();
            if (callback)
                callback();
        });
    }
    vw_auditoria_programa.getPrograma = async function () {
        var auditoriaData = await BASEAPI.firstp('vw_auditoria_programa', {
            order: "desc",
            where: [
                {
                    field: "estatus",
                    operator: "!=",
                    value: 8
                },
                {
                    field: "compania",
                    value: vw_auditoria_programa.session.compania_id
                },
                {
                    "field": "institucion",
                    "operator":  vw_auditoria_programa.session.institucion_id ? "=" : "is",
                    "value":  vw_auditoria_programa.session.institucion_id ?  vw_auditoria_programa.session.institucion_id : "$null"
                },
            ]
        });
        if (auditoriaData) {
            vw_auditoria_programa.created = true;
            vw_auditoria_programa.id = auditoriaData.id;
            vw_auditoria_programa.nombre = auditoriaData.nombre;
            vw_auditoria_programa.descripcion = auditoriaData.descripcion;
            vw_auditoria_programa.fecha_inicio = auditoriaData.fecha_inicio;
            vw_auditoria_programa.fecha_fin = auditoriaData.fecha_fin;
            vw_auditoria_programa.range_date = auditoriaData.fecha_inicio ? LAN.date(auditoriaData.fecha_inicio) + " - " + LAN.date(auditoriaData.fecha_fin) : "";
            vw_auditoria_programa.estatus = auditoriaData.estatus + '';
            vw_auditoria_programa.poa = auditoriaData.poa + '';
            vw_auditoria_programa.current_estatus = auditoriaData.estatus;
            vw_auditoria_programa.estatus_nombre = auditoriaData.estatus_nombre;
            vw_auditoria_programa.compania = auditoriaData.compania;
            vw_auditoria_programa.institucion = auditoriaData.institucion;
            if (auditoriaData.estatus == 5){
                vw_auditoria_programa.form.options.fecha_fin.disabled =true;
                vw_auditoria_programa.form.options.fecha_inicio.disabled =true;
                vw_auditoria_programa.refreshAngular();
            }
            vw_auditoria_programa.planes_auditoria = await BASEAPI.listp('vw_auditoria_programa_plan',{
                limit: 0,
                where: [
                    {
                        field: "auditoria_programa",
                        value: vw_auditoria_programa.id
                    }
                ]
            })
            vw_auditoria_programa.planes_auditoria = vw_auditoria_programa.planes_auditoria.data;
            vw_auditoria_programa.form.loadDropDown('estatus')
            vw_auditoria_programa.getPlanesAuditoria();
        }else{
            vw_auditoria_programa.created = false;
            vw_auditoria_programa.estatus_nombre = "Abierto";
            vw_auditoria_programa.current_estatus = 1;
            vw_auditoria_programa.planes = [];
            vw_auditoria_programa.poa = '[NULL]';
            vw_auditoria_programa.form.loadDropDown('poa');
        }
        vw_auditoria_programa.refreshAngular();
    };
    vw_auditoria_programa.getPrograma();
    vw_auditoria_programa.selectQueries['estatus'] = [
        {
            field: 'rol',
            operator: '=',
            value: vw_auditoria_programa.session.groups[0].id
        }
    ];
    vw_auditoria_programa.lista_ano = [];
    for (var a = 2018; a <= 3000; a++) {
        if (a >= vw_auditoria_programa.current_year) {
            vw_auditoria_programa.lista_ano.push(a);
        }
    }
    vw_auditoria_programa.$scope.$watch("vw_auditoria_programa.nombre", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_programa, 'nombre', rules);
    });
    vw_auditoria_programa.$scope.$watch("vw_auditoria_programa.poa", function (value) {
        var rules = [];
        //rules here
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_programa, 'poa', rules);
    });
    vw_auditoria_programa.$scope.$watch("vw_auditoria_programa.descripcion", function (value) {
        var rules = [];
        //rules here
        //rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_programa, 'descripcion', rules);
    });
    vw_auditoria_programa.$scope.$watch('vw_auditoria_programa.fecha_inicio', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_programa, "fecha_inicio", rules)
    });
    vw_auditoria_programa.$scope.$watch('vw_auditoria_programa.fecha_fin', function (value) {
        // var rules = [];
        // rules.push(VALIDATION.general.required(value));
        // VALIDATION.validate(productos_poa, "fecha_fin", rules)
    });
    vw_auditoria_programa.$scope.$watch('vw_auditoria_programa.range_date', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(vw_auditoria_programa, "fecha_inicio", rules);
        VALIDATION.validate(vw_auditoria_programa, "range_date", rules);
    });
    vw_auditoria_programa.triggers.table.after.control = function (data) {
        if (data == 'range_date') {
            vw_auditoria_programa.range_date = "";
            var elano = vw_auditoria_programa.poa ? vw_auditoria_programa.poa : vw_auditoria_programa.current_year;
            var rango_minimo =  moment(("01-02-" + moment(elano).format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");
            var rango_maximo = moment(("01-01-" + moment(elano).add(1, 'years').format('YYYY'))).add(-1, 'day').format("YYYY-MM-DD");

            vw_auditoria_programa.range_date_min(rango_minimo);
            vw_auditoria_programa.range_date_max(rango_maximo);
            vw_auditoria_programa.refreshAngular();
        }
    };
    vw_auditoria_programa.formulary = function (data, mode, defaultData) {
        if (vw_auditoria_programa !== undefined) {
            RUN_B("vw_auditoria_programa", vw_auditoria_programa, $scope, $http, $compile);
            vw_auditoria_programa.form.modalWidth = ENUM.modal.width.full;
            vw_auditoria_programa.form.readonly = {};
            vw_auditoria_programa.createForm(data, mode, defaultData);
            $scope.$watch("vw_auditoria_programa.nombre", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa, 'nombre', rules);
            });
            $scope.$watch("vw_auditoria_programa.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa, 'descripcion', rules);
            });
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_auditoria_programa.compania", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa, 'compania', rules);
            });
            //ms_product.selectQueries['institucion'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("vw_auditoria_programa.institucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa, 'institucion', rules);
            });
            $scope.$watch("vw_auditoria_programa.estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(vw_auditoria_programa, 'estatus', rules);
            });
        }
    };
    vw_auditoria_programa.saveData = function () {
        let titulo_push="";
        let cuerpo_push="";
        let titulo= "";
        let cuerpo="";
        let cuerpo2 = "";
        if (vw_auditoria_programa.created){
            VALIDATION.save(vw_auditoria_programa, async function () {
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
                    BASEAPI.updateall('auditoria_programa', {
                        nombre: vw_auditoria_programa.nombre,
                        descripcion: vw_auditoria_programa.descripcion ? vw_auditoria_programa.descripcion : "$null",
                        fecha_inicio: vw_auditoria_programa.fecha_inicio ? moment(vw_auditoria_programa.fecha_inicio).format("YYYY-MM-DD HH:mm:ss") : "$null",
                        fecha_fin: vw_auditoria_programa.fecha_fin ? moment(vw_auditoria_programa.fecha_fin).format("YYYY-MM-DD HH:mm:ss") : "$null",
                        estatus: vw_auditoria_programa.estatus ? vw_auditoria_programa.estatus : 1,
                        poa: vw_auditoria_programa.poa ? vw_auditoria_programa.poa : "$null",
                        compania: vw_auditoria_programa.session.compania_id ? vw_auditoria_programa.session.compania_id : "$null",
                        institucion: vw_auditoria_programa.session.institucion_id ? vw_auditoria_programa.session.institucion_id : "$null",
                        where: [
                            {
                                field: "id",
                                value: vw_auditoria_programa.id
                            }
                        ]
                    }, function (result) {
                        vw_auditoria_programa.current_estatus = vw_auditoria_programa.estatus;
                        if (vw_auditoria_programa.firsttime ){
                            SWEETALERT.show({message: "Programa de Auditoria ha sido Creado"});
                            vw_auditoria_programa.firsttime = false;
                        }else {
                            SWEETALERT.show({message: "Programa de Auditoria ha sido modificado"});
                        }
                        if (vw_auditoria_programa.estatus == 3){
                            titulo_push = `El programa de auditoría "${vw_auditoria_programa.nombre}" ha sido creado.`;
                            cuerpo_push = `Se ha creado el programa de auditoría "${vw_auditoria_programa.nombre}"`;
                            titulo = `El programa de auditoría "${vw_auditoria_programa.nombre}" ha sido creado`
                            cuerpo = `Se ha creado el programa de auditoría  "${ vw_auditoria_programa.nombre }".
                            
Los Supervisores y Anlistas de Calidad deben proceder a definir los planes de auditoría.
                            
Gracias.`;
                            function_send_email_custom_group(titulo_push, cuerpo_push, titulo, cuerpo, vw_auditoria_programa.session.compania_id, vw_auditoria_programa.session.institucion_id, [18,17], 4);
                        }
                        vw_auditoria_programa.getPrograma()
                    });
            },["nombre", "fecha_inicio", "range_date"]);
        }else {
            VALIDATION.save(vw_auditoria_programa, async function () {
                BASEAPI.insertID('auditoria_programa', {
                nombre: vw_auditoria_programa.nombre,
                descripcion: vw_auditoria_programa.descripcion ? vw_auditoria_programa.descripcion : "$null",
                fecha_inicio: vw_auditoria_programa.fecha_inicio ? moment(vw_auditoria_programa.fecha_inicio).format("YYYY-MM-DD HH:mm:ss") : "$null",
                fecha_fin: vw_auditoria_programa.fecha_fin ? moment(vw_auditoria_programa.fecha_fin).format("YYYY-MM-DD HH:mm:ss") : "$null",
                estatus: 1,
                poa: vw_auditoria_programa.poa ? vw_auditoria_programa.poa : "$null",
                compania: vw_auditoria_programa.session.compania_id ? vw_auditoria_programa.session.compania_id : "$null",
                institucion: vw_auditoria_programa.session.institucion_id ? vw_auditoria_programa.session.institucion_id : "$null",
            }, '','',async function (result) {
                if (result.data.data.length > 0) {
                    SWEETALERT.stop();
                    vw_auditoria_programa.firsttime = true;
                    vw_auditoria_programa.estatus = "1";
                    vw_auditoria_programa.form.loadDropDown('estatus');
                    vw_auditoria_programa.refreshAngular();
                    var auditoriaData = await BASEAPI.firstp('vw_auditoria_programa', {
                        order: "desc",
                        where: [
                            {
                                field: "estatus",
                                operator: "!=",
                                value: 8
                            },
                            {
                                field: "compania",
                                value: vw_auditoria_programa.session.compania_id
                            },
                            {
                                "field": "institucion",
                                "operator":  vw_auditoria_programa.session.institucion_id ? "=" : "is",
                                "value":  vw_auditoria_programa.session.institucion_id ?  vw_auditoria_programa.session.institucion_id : "$null"
                            },
                        ]
                    });
                    if (auditoriaData) {
                        vw_auditoria_programa.created = true;
                        vw_auditoria_programa.id = auditoriaData.id;
                        vw_auditoria_programa.nombre = auditoriaData.nombre;
                        vw_auditoria_programa.descripcion = auditoriaData.descripcion;
                        vw_auditoria_programa.fecha_inicio = auditoriaData.fecha_inicio;
                        vw_auditoria_programa.fecha_fin = auditoriaData.fecha_fin;
                        vw_auditoria_programa.range_date = auditoriaData.fecha_inicio ? LAN.date(auditoriaData.fecha_inicio) + " - " + LAN.date(auditoriaData.fecha_fin) : "";
                        vw_auditoria_programa.estatus = auditoriaData.estatus + '';
                        vw_auditoria_programa.poa = auditoriaData.poa + '';
                        vw_auditoria_programa.current_estatus = auditoriaData.estatus;
                        vw_auditoria_programa.estatus_nombre = auditoriaData.estatus_nombre;
                        vw_auditoria_programa.compania = auditoriaData.compania;
                        vw_auditoria_programa.institucion = auditoriaData.institucion;
                        if (auditoriaData.estatus ==3){
                            vw_auditoria_programa.form.options.fecha_fin.disabled =true;
                            vw_auditoria_programa.form.options.fecha_inicio.disabled =true;
                            vw_auditoria_programa.refreshAngular();
                        }
                        vw_auditoria_programa.form.loadDropDown('estatus')
                    }else{
                        vw_auditoria_programa.created = false;
                        vw_auditoria_programa.estatus = "1";
                        vw_auditoria_programa.estatus_nombre = "En elaboración";
                        vw_auditoria_programa.current_estatus = 1;
                    }
                    vw_auditoria_programa.refreshAngular();
                }
            });
            },["poa"]);
        }
    }
    vw_auditoria_programa.cancelar = function (){
        location.reload();
    };
    vw_auditoria_programa.allow_action = function (estatus) {
        if (vw_auditoria_programa.allowAction("Autorizar", "vw_auditoria_programa", estatus)){
            if (vw_auditoria_programa.planes_auditoria) {
                if (vw_auditoria_programa.planes_auditoria.length > 0) {
                    var planes_pendientes = vw_auditoria_programa.planes_auditoria.filter(d => {
                        return d.estatus == 2 || d.estatus == 1;
                    });
                    return planes_pendientes.length === 0;
                } else {
                    return false
                }
            }else{
                return false
            }
        }else if (vw_auditoria_programa.allowAction("Cerrar", "vw_auditoria_programa", estatus)){
            if (vw_auditoria_programa.planes_auditoria) {
                if (vw_auditoria_programa.planes_auditoria.length > 0) {
                    var planes_finalizados = vw_auditoria_programa.planes_auditoria.filter(d => {
                        return d.estatus == 5 || d.estatus == 8;
                    });
                    return planes_finalizados.length === vw_auditoria_programa.planes_auditoria.length;
                } else {
                    return false
                }
            }else{
                return false
            }
        }else{
            return true;
        }
    }
    vw_auditoria_programa.openmodalplanes = function (value) {
        vw_auditoria_programa.Mplanes = value;
        console.log("Entre", vw_auditoria_programa.Mplanes)
        vw_auditoria_programa.modal.modalView("auditoria_programa_plan", {
            width: 'modal-full',
            header: {
                title: "Auditorías " + vw_auditoria_programa.Mplanes,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'auditoria_programa_plan',
            },
            event: {
                show: {
                    end: function (data) {
                        setTimeout(function(){
                            if (typeof auditoria_programa_plan != 'undefined') {
                                if (typeof auditoria_programa_plan != 'not defined') {
                                    if (auditoria_programa_plan) {
                                        auditoria_programa_plan.setPermission("add", false);
                                        auditoria_programa_plan.setPermission("edit", false);
                                        auditoria_programa_plan.setPermission("remove", false);
                                        auditoria_programa_plan.setPermission("export", false);
                                    }
                                }
                            }
                        }, 500);
                    }
                },
                hide: {
                    end: function(data){
                        setTimeout(function(){
                            if (typeof auditoria_programa_plan != 'undefined') {
                                if (typeof auditoria_programa_plan != 'not defined') {
                                    if (auditoria_programa_plan) {
                                        auditoria_programa_plan.setPermission("add", true);
                                        auditoria_programa_plan.setPermission("edit", true);
                                        auditoria_programa_plan.setPermission("remove", true);
                                        auditoria_programa_plan.setPermission("export", true);
                                    }
                                }
                            }
                        }, 500);
                    }
                }
            }
        });
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});