app.controller("dashboard_paa_pastel", function ($scope, $http, $compile) {
    dashboard_paa_pastel = this;

    RUNCONTROLLER("dashboard_paa_pastel", dashboard_paa_pastel, $scope, $http, $compile);
    RUN_B("dashboard_paa_pastel", dashboard_paa_pastel, $scope, $http, $compile);
    function createArray(len, itm) {
        var arr1 = [itm],
            arr2 = [];
        while (len > 0) {
            if (len & 1) arr2 = arr2.concat(arr1);
            arr1 = arr1.concat(arr1);
            len >>>= 1;
        }
        return arr2;
    }
    var user = new SESSION().current();
    var paso = false;
    var carac = undefined;
    if (new new SESSION().current().groups.length > 0)
        carac = new SESSION().current().groups[0] ? new SESSION().current().groups[0].caracteristica : '';
    var mydepa = new SESSION().current().departamento;

    dashboard_paa_pastel.actualizacion = moment().format('DD/MM/YYYY h:mm');

    dashboard_paa_pastel.pie_events ={
        'click':function (data) {
            dashboard_paa_pastel.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    dashboard_paa_pastel.pie2_events ={
        'click':function (data) {
            dashboard_paa_pastel.openmodalactividades(data.name.toString().toLowerCase());
        }
    };
    dashboard_paa_pastel.pie3_events ={
        'click':function (data) {
            dashboard_paa_pastel.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };

    dashboard_paa_pastel.pie_data = [{value: 1, name: "N/A"}];
    dashboard_paa_pastel.pie2_data = [{value: 1, name: "N/A"}];
    dashboard_paa_pastel.pie3_data = [{value: 1, name: "N/A"}];

    dashboard_paa_pastel.selectQueries["departamento"] = [
        {
            "field": "compania",
            "operator": "=",
            "value": user.compania_id,
            "connector":'OR'
        },
        {
            "field": "compania",
            "operator":'=',
            "value": 0
        }
    ];

    dashboard_paa_pastel.triggers.table.after.control = function (data){
        if (data === "departamento"){
            if ((paso == false && carac === "DP") || (paso == false && carac === "AD")){
                dashboard_paa_pastel.departamento = mydepa.toString();
                dashboard_paa_pastel.form.loadDropDown('departamento');
                paso = true;
            }
            else if (paso == false) {
                dashboard_paa_pastel.departamento = "0";
                dashboard_paa_pastel.form.loadDropDown('departamento');
                dashboard_paa_pastel.form.options.departamento.disabled = false;
                dashboard_paa_pastel.refreshAngular();
                paso = true;
            }
        }
    };

    dashboard_paa_pastel.getAll = function () {
        if (dashboard_paa_pastel.departamento !== "[NULL]"){
            dashboard_paa_pastel.callDataPie();
        }
    };
    dashboard_paa_pastel.callDataPie = async function(){
        dashboard_paa_pastel.listProd = [];
        dashboard_paa_pastel.listAct = [];
        dashboard_paa_pastel.listAsig = [];

        if(dashboard_paa_pastel.departamento == "0"){
            dashboard_paa_pastel.whereCondition=[
                {
                    field: "id",
                    value: user.poa_id,
                }
            ];
        }else{
            dashboard_paa_pastel.whereCondition=[
                {
                    field: "id",
                    value: user.poa_id,
                },
                {
                    field: "departamento",
                    value: dashboard_paa_pastel.departamento
                }
            ];
        }

        var legendsAct = {
            planificados:{value:0, name: 'Planificados'},
            ejecucion:{value:0, name: 'En Ejecución'},
            vencidos:{value:0, name: 'Vencidos'},
            completados:{value:0, name: 'Completados'}
        };

        dashboard_paa_pastel.listProd = await  BASEAPI.listp('vw_dashboard_productos', {
            limit: 0,
            where: dashboard_paa_pastel.whereCondition
        });
        dashboard_paa_pastel.listAct = await  BASEAPI.listp('vw_dashboard_actividades', {
            limit: 0,
            where: dashboard_paa_pastel.whereCondition
        });
        dashboard_paa_pastel.listAsig = await  BASEAPI.listp('vw_dashboard_asignaciones', {
            limit: 0,
            where: dashboard_paa_pastel.whereCondition
        });

        //Cargar PIE Productos
        if(dashboard_paa_pastel.listProd.data.length > 0){
            legendsAct = {
                planificados:{value:0, name: 'Planificados'},
                ejecucion:{value:0, name: 'En Ejecución'},
                vencidos:{value:0, name: 'Vencidos'},
                completados:{value:0, name: 'Completados'}
            };

            dashboard_paa_pastel.listProd = dashboard_paa_pastel.listProd.data;

            dashboard_paa_pastel.listProd.forEach((row)=>{
                legendsAct.planificados.value += row.planificados;
                legendsAct.ejecucion.value += row.ejecucion;
                legendsAct.vencidos.value += row.vencidos;
                legendsAct.completados.value += row.completados;
            });

            dashboard_paa_pastel.pie_data=[];


            dashboard_paa_pastel.pie_data.push(
                {value: legendsAct.planificados.value, name: legendsAct.planificados.name},
                {value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name},
                {value: legendsAct.vencidos.value, name: legendsAct.vencidos.name},
                {value: legendsAct.completados.value, name: legendsAct.completados.name},
            );

        }else{
            dashboard_paa_pastel.pie2_data = [{value: 1, name: "N/A"}];
        }
        //Cargar PIE Actividades
        if(dashboard_paa_pastel.listAct.data.length > 0){
            legendsAct = {
                planificados:{value:0, name: 'Planificados'},
                ejecucion:{value:0, name: 'En Ejecución'},
                vencidos:{value:0, name: 'Vencidos'},
                completados:{value:0, name: 'Completados'}
            };

            dashboard_paa_pastel.listAct = dashboard_paa_pastel.listAct.data;

            dashboard_paa_pastel.listAct.forEach((row)=>{
                legendsAct.planificados.value += row.planificados;
                legendsAct.ejecucion.value += row.ejecucion;
                legendsAct.vencidos.value += row.vencidos;
                legendsAct.completados.value += row.completados;
            });

            dashboard_paa_pastel.pie2_data=[];

            dashboard_paa_pastel.pie2_data.push(
                {value: legendsAct.planificados.value, name: legendsAct.planificados.name},
                {value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name},
                {value: legendsAct.vencidos.value, name: legendsAct.vencidos.name},
                {value: legendsAct.completados.value, name: legendsAct.completados.name},
            );

        }else{
            dashboard_paa_pastel.pie2_data = [{value: 1, name: "N/A"}];
        }
        //Cargar PIE Asignaciones
        if(dashboard_paa_pastel.listAsig.data.length > 0){
            legendsAct = {
                planificados:{value:0, name: 'Planificados'},
                ejecucion:{value:0, name: 'En Ejecución'},
                vencidos:{value:0, name: 'Vencidos'},
                completados:{value:0, name: 'Completados'}
            };
            dashboard_paa_pastel.listAsig = dashboard_paa_pastel.listAsig.data;

            dashboard_paa_pastel.listAsig.forEach((row)=>{
                legendsAct.planificados.value += row.planificados;
                legendsAct.ejecucion.value += row.ejecucion;
                legendsAct.vencidos.value += row.vencidos;
                legendsAct.completados.value += row.completados;
            });

            dashboard_paa_pastel.pie3_data=[];

            dashboard_paa_pastel.pie3_data.push(
                {value: legendsAct.planificados.value, name: legendsAct.planificados.name},
                {value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name},
                {value: legendsAct.vencidos.value, name: legendsAct.vencidos.name},
                {value: legendsAct.completados.value, name: legendsAct.completados.name},
            );

        }else{
            dashboard_paa_pastel.pie3_data = [{value: 1, name: "N/A"}];
        }

        dashboard_paa_pastel.actualizacion = moment().format('DD/MM/YYYY h:mm');
        dashboard_paa_pastel.refreshAngular();
        dashboard_paa_pastel.charts.pie.refresh();
        dashboard_paa_pastel.charts.pie2.refresh();
        dashboard_paa_pastel.charts.pie3.refresh();
    };


    dashboard_paa_pastel.refresPies = async function () {
        SWEETALERT.loading({message: 'Refrescando'});
        await dashboard_paa_pastel.getAll();
        SWEETALERT.stop();
    };
    dashboard_paa_pastel.openmodalproductos = function (value) {
        dashboard_paa_pastel.Mproductos = value;
        dashboard_paa_pastel.modal.modalView("productos_poa", {
            width: 'modal-full',
            header: {
                title: dashboard_paa_pastel.session.tipo_institucion === 1 ? "Proyecto/Producto "  + dashboard_paa_pastel.Mproductos : "Proyectos/Planes de Acción " + dashboard_paa_pastel.Mproductos,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'productos_poa',
            },
        });
    };
    dashboard_paa_pastel.openmodalactividades = function (value) {
        dashboard_paa_pastel.Mactividades = value;
        dashboard_paa_pastel.modal.modalView("actividades_poa", {
            width: 'modal-full',
            header: {
                title: "Actividades "+ dashboard_paa_pastel.Mactividades,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'actividades_poa',
            },
        });
    };
    dashboard_paa_pastel.openmodalasignaciones = function (value) {
        dashboard_paa_pastel.Masignaciones = value;
        dashboard_paa_pastel.modal.modalView("vw_asignacion_especial_dashboard", {
            width: 'modal-full',
            header: {
                title: "Asignaciones especiales "+ dashboard_paa_pastel.Masignaciones,
                icon: "archive"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'vw_asignacion_especial_dashboard',
            },
        });
    };
    $scope.$watch('dashboard_paa_pastel.departamento', function (value) {
        dashboard_paa_pastel.getAll();
    });
});