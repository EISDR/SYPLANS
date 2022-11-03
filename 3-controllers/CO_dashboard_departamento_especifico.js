app.controller("dashboard_departamento_especifico", function ($scope, $http, $compile) {
    dashboard_departamento_especifico = this;
    RUNCONTROLLER("dashboard_departamento_especifico", dashboard_departamento_especifico, $scope, $http, $compile);
    RUN_B("dashboard_departamento_especifico", dashboard_departamento_especifico, $scope, $http, $compile);

    var user = new SESSION().current();
    var animation = new ANIMATION();
    dashboard_departamento_especifico.departamento_objeto = {};

    dashboard_departamento_especifico.getAll = async function () {
        if (dashboard_departamento_especifico.departamento !== "[NULL]") {
            console.log('ENTRO');
            dashboard_departamento_especifico.departamento_objeto = await BASEAPI.firstp('departamento', {
                where: [
                    {
                        "field": "id",
                        "operator": "=",
                        "value": user.departamento
                    }
                ]
            });
            dashboard_departamento_especifico.getPresupuesto();
            dashboard_departamento_especifico.getProductos();
            dashboard_departamento_especifico.getActividades();
            dashboard_departamento_especifico.getAsignaciones();
            // dashboard_departamento_especifico.getIndicadores();
        }
    };

    dashboard_departamento_especifico.getPresupuesto = function () {
        animation.loading(`#presupuestos`, "", ``, '30');
        dashboard_departamento_especifico.presupuestos = {};
        dashboard_departamento_especifico.condition = [{
            field: "poa",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: user.departamento
        }] ;

        BASEAPI.firstp('vw_presupesto', {
            where: dashboard_departamento_especifico.condition
        }).then(function (result) {
            dashboard_departamento_especifico.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_departamento_especifico.presupuestos = result;
            if(dashboard_departamento_especifico.presupuestos){
                for (var i in dashboard_departamento_especifico.presupuestos) {
                    dashboard_departamento_especifico.presupuestos[i] = LAN.money(dashboard_departamento_especifico.presupuestos[i]).format(true);
                }
                dashboard_departamento_especifico.refreshAngular();
            }
            animation.stoploading(`#presupuestos`);
        });
    };
    // dashboard_departamento_especifico.getIndicadores = function () {
    //     dashboard_departamento_especifico.condition = [{
    //         field: "poa",
    //         value: user.poa_id,
    //     }, {
    //         field: "departamento",
    //         value: user.departamento
    //     }] ;
    //     vw_dashboard_productosgrid.changeFilter(dashboard_departamento_especifico.condition);
    // };
    dashboard_departamento_especifico.getProductos = function () {
        animation.loading(`#productos`, "", ``, '30');
        dashboard_departamento_especifico.productos = {};
        dashboard_departamento_especifico.condition = [{
            field: "id",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: user.departamento
        }] ;

        BASEAPI.firstp('vw_dashboard_productos', {
            where: dashboard_departamento_especifico.condition
        }).then(function (result) {
            dashboard_departamento_especifico.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_departamento_especifico.productos= result;

            if(dashboard_departamento_especifico.productos){
                // var ejecucion =  parseInt(dashboard_departamento_especifico.productos.ejecucion) -  parseInt(dashboard_departamento_especifico.productos.completados);
                // dashboard_departamento_especifico.productos.ejecucion =   ejecucion ;
                // dashboard_departamento_especifico.productos.planificados =  parseInt(dashboard_departamento_especifico.productos.cantidad) -  ejecucion;

                for (var i in dashboard_departamento_especifico.productos) {
                    dashboard_departamento_especifico.productos[i] = parseInt(dashboard_departamento_especifico.productos[i]) < 10 ? ('0' + dashboard_departamento_especifico.productos[i]) : dashboard_departamento_especifico.productos[i];
                }
            }

            dashboard_departamento_especifico.refreshAngular();
            animation.stoploading(`#productos`);
        });
    };
    dashboard_departamento_especifico.getAsignaciones = function () {
        animation.loading(`#asignaciones`, "", ``, '30');
        dashboard_departamento_especifico.asignaciones = {};
        dashboard_departamento_especifico.condition = [{
            field: "id",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: user.departamento
        }];

        BASEAPI.firstp('vw_dashboard_asignaciones', {
            where: dashboard_departamento_especifico.condition
        }).then(function (result) {
            dashboard_departamento_especifico.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_departamento_especifico.asignaciones = result;
            if(dashboard_departamento_especifico.asignaciones){
                // var ejecucion =  parseInt(dashboard_departamento_especifico.asignaciones.ejecucion) -  parseInt(dashboard_departamento_especifico.asignaciones.completados);
                // dashboard_departamento_especifico.asignaciones.ejecucion =   ejecucion;
                // dashboard_departamento_especifico.asignaciones.planificados =  parseInt(dashboard_departamento_especifico.asignaciones.cantidad) -  ejecucion;


                for (var i in dashboard_departamento_especifico.asignaciones) {
                    dashboard_departamento_especifico.asignaciones[i] = parseInt(dashboard_departamento_especifico.asignaciones[i]) < 10 ? ('0' + dashboard_departamento_especifico.asignaciones[i]) : dashboard_departamento_especifico.asignaciones[i];
                }
            }
            dashboard_departamento_especifico.refreshAngular();
            animation.stoploading(`#asignaciones`);
        });
    };
    dashboard_departamento_especifico.getActividades = function () {
        animation.loading(`#actividades`, "", ``, '30');
        dashboard_departamento_especifico.actividades = {};
        dashboard_departamento_especifico.condition = [{
            field: "id",
            value: user.poa_id,
        }, {
            field: "departamento",
            value: user.departamento
        }] ;

        BASEAPI.firstp('vw_dashboard_actividades', {
            where: dashboard_departamento_especifico.condition
        }).then(function (result) {
            dashboard_departamento_especifico.actualizacion = moment().format('DD/MM/YYYY h:mm');

            dashboard_departamento_especifico.actividades = result;

            if(dashboard_departamento_especifico.actividades){
                // var ejecucion =  parseInt(dashboard_departamento_especifico.actividades.ejecucion) -  parseInt(dashboard_departamento_especifico.actividades.completados);
                // dashboard_departamento_especifico.actividades.ejecucion =   ejecucion;
                // dashboard_departamento_especifico.actividades.planificados =  parseInt(dashboard_departamento_especifico.actividades.cantidad) -  ejecucion;


                for (var i in dashboard_departamento_especifico.actividades) {
                    dashboard_departamento_especifico.actividades[i] = parseInt(dashboard_departamento_especifico.actividades[i]) < 10 ? ('0' + dashboard_departamento_especifico.actividades[i]) : dashboard_departamento_especifico.actividades[i];
                }
            }
            dashboard_departamento_especifico.refreshAngular();
            animation.stoploading(`#actividades`);
        });
    };


    // $scope.$watch('dashboard_departamento_especifico.departamento', function (value) {
    //     console.log(value);
        dashboard_departamento_especifico.getAll();
    // });
});
