app.controller("dashboard_presupuesto_barra", function ($scope, $http, $compile) {
    dashboard_presupuesto_barra = this;

    RUNCONTROLLER("dashboard_presupuesto_barra", dashboard_presupuesto_barra, $scope, $http, $compile);
    RUN_B("dashboard_presupuesto_barra", dashboard_presupuesto_barra, $scope, $http, $compile);
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

    dashboard_presupuesto_barra.actualizacion = moment().format('DD/MM/YYYY h:mm');
    //initializacion de los dashboard
    dashboard_presupuesto_barra.columnsstack_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_presupuesto_barra.pie_events ={
        'click':function (data) {
            dashboard_presupuesto_barra.openmodalproductos(data.name.toString().toLowerCase());
        }
    };
    dashboard_presupuesto_barra.pie2_events ={
        'click':function (data) {
            dashboard_presupuesto_barra.openmodalactividades(data.name.toString().toLowerCase());
        }
    };
    dashboard_presupuesto_barra.pie3_events ={
        'click':function (data) {
            dashboard_presupuesto_barra.openmodalasignaciones(data.name.toString().toLowerCase());
        }
    };
    dashboard_presupuesto_barra.pie_data = [{value: 1, name: "N/A"}];
    dashboard_presupuesto_barra.pie2_data = [{value: 1, name: "N/A"}];
    dashboard_presupuesto_barra.pie3_data = [{value: 1, name: "N/A"}];
    dashboard_presupuesto_barra.area_data = {
        legend: [],
        down: [],
        data: []
    };

    dashboard_presupuesto_barra.selectQueries["departamento"] = [
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
    dashboard_presupuesto_barra.triggers.table.after.control = function (data){
        if (data === "departamento"){
            if ((paso == false && carac === "DP") || (paso == false && carac === "AD")){
                dashboard_presupuesto_barra.departamento = mydepa.toString();
                dashboard_presupuesto_barra.form.loadDropDown('departamento');
                paso = true;
            }
            else if (paso == false) {
                dashboard_presupuesto_barra.departamento = "0";
                dashboard_presupuesto_barra.form.loadDropDown('departamento');
                dashboard_presupuesto_barra.form.options.departamento.disabled = false;
                dashboard_presupuesto_barra.refreshAngular();
                paso = true;
            }
        }
    };

    dashboard_presupuesto_barra.getAll = async function () {
        if (dashboard_presupuesto_barra.departamento !== "[NULL]"){
             dashboard_presupuesto_barra.callDataBarra();
              dashboard_presupuesto_barra.callDataLinea();
              dashboard_presupuesto_barra.callDataPie();
        }
    };
    dashboard_presupuesto_barra.callDataBarra = async function(){
        dashboard_presupuesto_barra.listPre = [];
        dashboard_presupuesto_barra.listDep = [];
        if(dashboard_presupuesto_barra.departamento == "0"){
            dashboard_presupuesto_barra.whereCondition=[
                {
                    field: "compania",
                    value: user.compania_id
                }
            ];
        }else{
            dashboard_presupuesto_barra.whereCondition=[
                {
                    field: "compania",
                    value: user.compania_id
                },
                {
                    field: "departamento",
                    value: dashboard_presupuesto_barra.departamento
                }
            ];
        }

        dashboard_presupuesto_barra.listPre = await  BASEAPI.listp('vw_presupesto', {
            limit: 0,
            orderby: "departamento_nombre",
            order: "asc",
            where: dashboard_presupuesto_barra.whereCondition
        });
        dashboard_presupuesto_barra.listPre = dashboard_presupuesto_barra.listPre.data;
        dashboard_presupuesto_barra.columnsstack_data={};
        dashboard_presupuesto_barra.columnsstack_data = {
            legend: ['Disponible', 'Ejecutado', 'No Ejecutado'],
            down: dashboard_presupuesto_barra.listDep,
            data: [
                {
                    name: 'No Ejecutado',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            color: '#548235'
                        },
                        emphasis: {
                            label: {
                                show: true
                            },
                            color: '#548235'
                        }
                    },
                    data: []
                },
                {
                    name: 'Ejecutado',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {

                            label: {
                                show: true,
                                position: 'inside'
                            },
                            color: '#FF0000'
                        },
                        emphasis: {

                            label: {
                                show: true
                            },
                            color: '#FF0000'
                        }
                    },
                    data: []
                },
                {
                    name: 'Disponible',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'inside'
                            },
                            color: '#2E75B6'
                        },
                        emphasis: {
                            label: {
                                show: true
                            },
                            color: '#2E75B6'
                        }
                    },
                    data: []
                }
            ]
        };
        dashboard_presupuesto_barra.actualizacion = moment().format('DD/MM/YYYY h:mm');

        dashboard_presupuesto_barra.columnsstack_data.data[0].data = createArray(dashboard_presupuesto_barra.listDep.length,'');
        dashboard_presupuesto_barra.columnsstack_data.data[1].data = createArray(dashboard_presupuesto_barra.listDep.length,'');
        dashboard_presupuesto_barra.columnsstack_data.data[2].data = createArray(dashboard_presupuesto_barra.listDep.length,'');

        for (var p = 0; p < dashboard_presupuesto_barra.listPre.length; p++){
            dashboard_presupuesto_barra.listDep.push(dashboard_presupuesto_barra.listPre[p].departamento_nombre);
            dashboard_presupuesto_barra.columnsstack_data.data[0].data[p] = dashboard_presupuesto_barra.listPre[p].noejecutado ? dashboard_presupuesto_barra.listPre[p].noejecutado : '' ;
            dashboard_presupuesto_barra.columnsstack_data.data[1].data[p] = dashboard_presupuesto_barra.listPre[p].ejecutado ? dashboard_presupuesto_barra.listPre[p].ejecutado: '';
            dashboard_presupuesto_barra.columnsstack_data.data[2].data[p] = dashboard_presupuesto_barra.listPre[p].reprogramar ? dashboard_presupuesto_barra.listPre[p].reprogramar:'';
        }
        dashboard_presupuesto_barra.refreshAngular();
        dashboard_presupuesto_barra.charts.columnsstack.refresh();
    };
    dashboard_presupuesto_barra.callDataPie = async function(){

        dashboard_presupuesto_barra.listProd = [];
        dashboard_presupuesto_barra.listAct = [];
        dashboard_presupuesto_barra.listAsig = [];

        if(dashboard_presupuesto_barra.departamento == "0"){
            dashboard_presupuesto_barra.whereCondition=[
                {
                    field: "id",
                    value: user.poa_id,
                }
            ];
        }else{
            dashboard_presupuesto_barra.whereCondition=[
                {
                    field: "id",
                    value: user.poa_id,
                },
                {
                    field: "departamento",
                    value: dashboard_presupuesto_barra.departamento
                }
            ];
        }

        var legendsAct = {
            planificados:{value:0, name: 'Planificados'},
            ejecucion:{value:0, name: 'En Ejecución'},
            vencidos:{value:0, name: 'Vencidos'},
            completados:{value:0, name: 'Completados'}
        };

        dashboard_presupuesto_barra.listProd = await  BASEAPI.listp('vw_dashboard_productos', {
            limit: 0,
            where: dashboard_presupuesto_barra.whereCondition
        });
        dashboard_presupuesto_barra.listAct = await  BASEAPI.listp('vw_dashboard_actividades', {
            limit: 0,
            where: dashboard_presupuesto_barra.whereCondition
        });
        dashboard_presupuesto_barra.listAsig = await  BASEAPI.listp('vw_dashboard_asignaciones', {
            limit: 0,
            where: dashboard_presupuesto_barra.whereCondition
        });

        //Cargar PIE Productos
        dashboard_presupuesto_barra.listProd = dashboard_presupuesto_barra.listProd.data;
        if(dashboard_presupuesto_barra.listProd.length > 0 ){
            legendsAct = {
                planificados:{value:0, name: 'Planificados'},
                ejecucion:{value:0, name: 'En Ejecución'},
                vencidos:{value:0, name: 'Vencidos'},
                completados:{value:0, name: 'Completados'}
            };



            dashboard_presupuesto_barra.listProd.forEach((row)=>{
                legendsAct.planificados.value += row.planificados;
                legendsAct.ejecucion.value += row.ejecucion;
                legendsAct.vencidos.value += row.vencidos;
                legendsAct.completados.value += row.completados;
            });

            dashboard_presupuesto_barra.pie_data=[];
            dashboard_presupuesto_barra.pie_legend = ['Planificados','En Ejecución','Vencidos','Completados'];
            dashboard_presupuesto_barra.pie_data.push(
                {value: legendsAct.planificados.value, name: legendsAct.planificados.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#44546A',
                        },
                        emphasis: {
                            color: '#44546A',
                        }
                    }},
                {value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#548235',
                        },
                        emphasis: {
                            color: '#548235',
                        }
                    }},
                {value: legendsAct.vencidos.value, name: legendsAct.vencidos.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#FF0000',
                        },
                        emphasis: {
                            color: '#FF0000',
                        }
                    }},
                {value: legendsAct.completados.value, name: legendsAct.completados.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#4451db',
                        },
                        emphasis: {
                            color: '#4451db',
                        }
                    }},
            );

        }else{
            dashboard_presupuesto_barra.pie_data = [{value: 1, name: "Sin información", itemStyle: {
                    normal: {
                        label:{
                            show: false
                        },
                        labelLine : {
                            show : false
                        },
                        color: '#80867C',
                    },
                    emphasis: {
                        color: '#80867C',
                    }
                }}];
        }
        //Cargar PIE Actividades

        dashboard_presupuesto_barra.listAct = dashboard_presupuesto_barra.listAct.data;
        if(dashboard_presupuesto_barra.listAct.length > 0){
            legendsAct = {
                planificados:{value:0, name: 'Planificados'},
                ejecucion:{value:0, name: 'En Ejecución'},
                vencidos:{value:0, name: 'Vencidos'},
                completados:{value:0, name: 'Completados'}
            };


            dashboard_presupuesto_barra.listAct.forEach((row)=>{
                legendsAct.planificados.value += row.planificados;
                legendsAct.ejecucion.value += row.ejecucion;
                legendsAct.vencidos.value += row.vencidos;
                legendsAct.completados.value += row.completados;
            });
            dashboard_presupuesto_barra.pie2_data=[];
            dashboard_presupuesto_barra.pie2_legend = ['Planificados','En Ejecución','Vencidos','Completados'];

            dashboard_presupuesto_barra.pie2_data.push(
                {value: legendsAct.planificados.value, name: legendsAct.planificados.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#44546A',
                        },
                        emphasis: {
                            color: '#44546A',
                        }
                    }},
                {value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#548235',
                        },
                        emphasis: {
                            color: '#548235',
                        }
                    }},
                {value: legendsAct.vencidos.value, name: legendsAct.vencidos.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#FF0000',
                        },
                        emphasis: {
                            color: '#FF0000',
                        }
                    }},
                {value: legendsAct.completados.value, name: legendsAct.completados.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#4451db',
                        },
                        emphasis: {
                            color: '#4451db',
                        }
                    }},
            );

        }else{
            dashboard_presupuesto_barra.pie2_data = [{value: 1, name: "Sin información", itemStyle: {
                    normal: {
                        label:{
                            show: false
                        },
                        labelLine : {
                            show : false
                        },
                        color: '#80867C',
                    },
                    emphasis: {
                        color: '#80867C',
                    }
                }}];
        }
        //Cargar PIE Asignaciones

        dashboard_presupuesto_barra.listAsig = dashboard_presupuesto_barra.listAsig.data;
        if(dashboard_presupuesto_barra.listAsig.length > 0){
            legendsAct = {
                planificados:{value:0, name: 'Planificados'},
                ejecucion:{value:0, name: 'En Ejecución'},
                vencidos:{value:0, name: 'Vencidos'},
                completados:{value:0, name: 'Completados'}
            };


            dashboard_presupuesto_barra.listAsig.forEach((row)=>{
                legendsAct.planificados.value += row.planificados;
                legendsAct.ejecucion.value += row.ejecucion;
                legendsAct.vencidos.value += row.vencidos;
                legendsAct.completados.value += row.completados;
            });

            dashboard_presupuesto_barra.pie3_data=[];
            dashboard_presupuesto_barra.pie3_legend = ['Planificados','En Ejecución','Vencidos','Completados'];
            dashboard_presupuesto_barra.pie3_data.push(
                {value: legendsAct.planificados.value, name: legendsAct.planificados.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#44546A',
                        },
                        emphasis: {
                            color: '#44546A',
                        }
                    }},
                {value: legendsAct.ejecucion.value, name: legendsAct.ejecucion.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#548235',
                        },
                        emphasis: {
                            color: '#548235',
                        }
                    }},
                {value: legendsAct.vencidos.value, name: legendsAct.vencidos.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#FF0000',
                        },
                        emphasis: {
                            color: '#FF0000',
                        }
                    }},
                {value: legendsAct.completados.value, name: legendsAct.completados.name, itemStyle: {
                        normal: {
                            label:{
                                show: false
                            },
                            labelLine : {
                                show : false
                            },
                            color: '#4451db',
                        },
                        emphasis: {
                            color: '#4451db',
                        }
                    }},
            );

        }else{
            dashboard_presupuesto_barra.pie3_data = [{value: 1, name: "Sin información", itemStyle: {
                    normal: {
                        label:{
                            show: false
                        },
                        labelLine : {
                            show : false
                        },
                        color: '#80867C',
                    },
                    emphasis: {
                        color: '#80867C',
                    }
                }}];
        }

        dashboard_presupuesto_barra.actualizacion = moment().format('DD/MM/YYYY h:mm');
        dashboard_presupuesto_barra.refreshAngular();
        dashboard_presupuesto_barra.charts.pie.refresh();
        dashboard_presupuesto_barra.charts.pie2.refresh();
        dashboard_presupuesto_barra.charts.pie3.refresh();
    };
    dashboard_presupuesto_barra.callDataLinea = async function(){
        dashboard_presupuesto_barra.listInd = [];
        dashboard_presupuesto_barra.listIndN = [];
        if(dashboard_presupuesto_barra.departamento == "0"){
            dashboard_presupuesto_barra.whereCondition=[
                {
                    field: "poa",
                    value: user.poa_id
                }
            ];
        }else{
            dashboard_presupuesto_barra.whereCondition=[
                {
                    field: "poa",
                    value: user.poa_id
                },
                {
                    field: "departamento",
                    value: dashboard_presupuesto_barra.departamento
                }
            ];
        }


        dashboard_presupuesto_barra.listInd = await  BASEAPI.listp('vw_dashboard_productosgrid', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: dashboard_presupuesto_barra.whereCondition
        });
        if(dashboard_presupuesto_barra.listInd.data.length > 0){
            dashboard_presupuesto_barra.listInd = dashboard_presupuesto_barra.listInd.data;
            dashboard_presupuesto_barra.area_data={};
            dashboard_presupuesto_barra.area_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: dashboard_presupuesto_barra.listIndN,
                data: [
                    {
                        name: 'Diferencia',
                        type: 'line',
                        stack: 'Total',
                        data: [],
                        itemStyle : { normal: {label : {
                                    position: 'top',
                                    show: true,
                                    textStyle : {
                                        fontSize : '12',
                                        fontWeight : 'bold',
                                        color: '#000000'
                                    }
                                },color:'#F0F0F0',areaStyle: {type: 'default',color:'#F0F0F0'}}}
                    },
                    {
                        name: 'Alcanzado',
                        type: 'line',
                        stack: 'Total',
                        data: [],
                        itemStyle : { normal: {label : {
                                    position: 'top',
                                    show: true,
                                    textStyle : {
                                        fontSize : '12',
                                        fontWeight : 'bold'
                                    }
                                },color:'#5B9BD5'}}
                    },
                    {
                        name: 'Proyectado',
                        type: 'line',
                        stack: 'Total',
                        data: [],
                        itemStyle : { normal: {label : {
                                    position: 'top',
                                    show: true,
                                    textStyle : {
                                        fontSize : '12',
                                        fontWeight : 'bold'
                                    }
                                },color:'#70AD47'}}
                    }

                ]
            };
            dashboard_presupuesto_barra.actualizacion = moment().format('DD/MM/YYYY h:mm');

            dashboard_presupuesto_barra.area_data.data[0].data = createArray(dashboard_presupuesto_barra.listIndN.length,'');
            dashboard_presupuesto_barra.area_data.data[1].data = createArray(dashboard_presupuesto_barra.listIndN.length,'');
            dashboard_presupuesto_barra.area_data.data[2].data = createArray(dashboard_presupuesto_barra.listIndN.length,'');

            for (var p = 0; p < dashboard_presupuesto_barra.listInd.length; p++){
                dashboard_presupuesto_barra.listIndN.push(dashboard_presupuesto_barra.listInd[p].indicador);
                dashboard_presupuesto_barra.area_data.data[1].data[p] = dashboard_presupuesto_barra.listInd[p].alcanzado ? dashboard_presupuesto_barra.listInd[p].alcanzado : '';
                dashboard_presupuesto_barra.area_data.data[2].data[p] = dashboard_presupuesto_barra.listInd[p].acumulado ?  dashboard_presupuesto_barra.listInd[p].acumulado :'';
                dashboard_presupuesto_barra.area_data.data[0].data[p] = dashboard_presupuesto_barra.listInd[p].alcanzado - dashboard_presupuesto_barra.listInd[p].acumulado ? dashboard_presupuesto_barra.listInd[p].alcanzado - dashboard_presupuesto_barra.listInd[p].acumulado : '';

            }
            dashboard_presupuesto_barra.refreshAngular();
            dashboard_presupuesto_barra.charts.area.refresh();
        }else{
            dashboard_presupuesto_barra.area_data={};
            dashboard_presupuesto_barra.area_data = {
                legend: ['Proyectado', 'Alcanzado', 'Diferencia'],
                down: ['Este departamento no contiene Indicadores'],
                data: [
                    {
                        name: 'Diferencia',
                        type: 'line',
                        stack: 'Total',
                        data: [''],
                        itemStyle : { normal: {label : {
                                    show: true,
                                    textStyle : {
                                        fontSize : '10',
                                        fontWeight : 'bold'
                                    }
                                },areaStyle: {type: 'default'}}}
                    },
                    {
                        name: 'Alcanzado',
                        type: 'line',
                        stack: 'Total',
                        data: [''],
                        itemStyle : { normal: {label : {
                                    show: true,
                                    textStyle : {
                                        fontSize : '10',
                                        fontWeight : 'bold'
                                    }
                                }}}
                    },
                    {
                        name: 'Proyectado',
                        type: 'line',
                        stack: 'Total',
                        data: [''],
                        itemStyle : { normal: {label : {
                                    show: true,
                                    textStyle : {
                                        fontSize : '10',
                                        fontWeight : 'bold'
                                    }
                                }}}
                    }

                ]
            };
            dashboard_presupuesto_barra.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_presupuesto_barra.refreshAngular();
            dashboard_presupuesto_barra.charts.area.refresh();
        }
    };

    dashboard_presupuesto_barra.refresBars = async function () {
        SWEETALERT.loading({message: 'Refrescando'});
        await dashboard_presupuesto_barra.getAll();
        SWEETALERT.stop();
    };

    dashboard_presupuesto_barra.openmodalproductos = function (value) {
        dashboard_presupuesto_barra.Mproductos = value;
        dashboard_presupuesto_barra.modal.modalView("productos_poa", {
            width: 'modal-full',
            header: {
                title: dashboard_presupuesto_barra.session.tipo_institucion === 1 ? "Proyecto/Producto "  + dashboard_presupuesto_barra.Mproductos : "Proyectos/Planes de Acción " + dashboard_presupuesto_barra.Mproductos,
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
    dashboard_presupuesto_barra.openmodalactividades = function (value) {
        dashboard_presupuesto_barra.Mactividades = value;
        dashboard_presupuesto_barra.modal.modalView("actividades_poa", {
            width: 'modal-full',
            header: {
                title: "Actividades "+ dashboard_presupuesto_barra.Mactividades,
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
    dashboard_presupuesto_barra.openmodalasignaciones = function (value) {
        dashboard_presupuesto_barra.Masignaciones = value;
        dashboard_presupuesto_barra.modal.modalView("vw_asignacion_especial_dashboard", {
            width: 'modal-full',
            header: {
                title: "Asignaciones especiales "+ dashboard_presupuesto_barra.Masignaciones,
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

    $scope.$watch('dashboard_presupuesto_barra.departamento', function (value) {
        dashboard_presupuesto_barra.getAll();
    });
});