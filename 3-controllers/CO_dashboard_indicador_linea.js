app.controller("dashboard_indicador_linea", function ($scope, $http, $compile) {
    dashboard_indicador_linea = this;

    RUNCONTROLLER("dashboard_indicador_linea", dashboard_indicador_linea, $scope, $http, $compile);
    RUN_B("dashboard_indicador_linea", dashboard_indicador_linea, $scope, $http, $compile);
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
    dashboard_indicador_linea.compania_id = user.compania_id;
    var paso = false;
    var carac = undefined;
    if (new new SESSION().current().groups.length > 0)
        carac = new SESSION().current().groups[0] ? new SESSION().current().groups[0].caracteristica : '';
    var mydepa = new SESSION().current().departamento;

    dashboard_indicador_linea.actualizacion = moment().format('DD/MM/YYYY h:mm');
    dashboard_indicador_linea.area_data = {
        legend: [],
        down: [],
        data: []
    };
    dashboard_indicador_linea.selectQueries["departamento"] = [
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
    dashboard_indicador_linea.triggers.table.after.control = function (data){
        if (data === "departamento"){
            if ((paso == false && carac === "DP") || (paso == false && carac === "AD")){
                dashboard_indicador_linea.departamento = mydepa.toString();
                dashboard_indicador_linea.departamento = mydepa.toString();
                dashboard_indicador_linea.form.loadDropDown('departamento');
                paso = true;
            }
            else if (paso == false) {
                dashboard_indicador_linea.departamento = "0";
                dashboard_indicador_linea.form.loadDropDown('departamento');
                dashboard_indicador_linea.form.options.departamento.disabled = false;
                dashboard_indicador_linea.refreshAngular();
                paso = true;
            }
        }
    };

    dashboard_indicador_linea.getAll = function () {
        if (dashboard_indicador_linea.departamento !== "[NULL]"){
            dashboard_indicador_linea.callDataLinea();
        }
    };
    dashboard_indicador_linea.callDataLinea = async function(){
        dashboard_indicador_linea.listInd = [];
        dashboard_indicador_linea.listIndN = [];
        if(dashboard_indicador_linea.departamento == "0"){
            dashboard_indicador_linea.whereCondition=[
                {
                    field: "poa",
                    value: user.poa_id
                },
                {
                    field: "compania",
                    value: user.compania_id,
                }
            ];
        }else{
            dashboard_indicador_linea.whereCondition=[
                {
                    field: "poa",
                    value: user.poa_id
                },
                {
                    field: "departamento",
                    value: dashboard_indicador_linea.departamento
                },
                {
                    field: "compania",
                    value: user.compania_id,
                }
            ];
        }


        dashboard_indicador_linea.listInd = await  BASEAPI.listp('vw_dashboard_productosgrid', {
            limit: 0,
            orderby: "indicador",
            order: "asc",
            where: dashboard_indicador_linea.whereCondition
        });
        if(dashboard_indicador_linea.listInd.data.length > 0){
        dashboard_indicador_linea.listInd = dashboard_indicador_linea.listInd.data;
        dashboard_indicador_linea.area_data={};
        dashboard_indicador_linea.area_data = {
            legend: ['Varianza', 'Acumulado', 'Alcanzado'],
            down: dashboard_indicador_linea.listIndN,
            data: [
                {
                    name: 'Alcanzado',
                    type: 'line',
                    stack: 'Total',
                    data: [],
                    itemStyle : { normal: {label : {
                                position: 'top',
                                show: true,
                                textStyle : {
                                    fontSize : '10',
                                    fontWeight : 'bold'
                                }
                            }}}
                },
                {
                    name: 'Acumulado',
                    type: 'line',
                    stack: 'Total',
                    data: [],
                    itemStyle : { normal: {label : {
                                position: 'top',
                                show: true,
                                textStyle : {
                                    fontSize : '10',
                                    fontWeight : 'bold'
                                }
                            }}}
                },
                {
                    name: 'Varianza',
                    type: 'line',
                    stack: 'Total',
                    data: [],
                    itemStyle : { normal: {label : {
                                position: 'top',
                                show: true,
                                textStyle : {
                                    fontSize : '15',
                                    fontWeight : 'bold'
                                }
                            },areaStyle: {type: 'default'}}}
                }
            ]
        };
        dashboard_indicador_linea.actualizacion = moment().format('DD/MM/YYYY h:mm');

        dashboard_indicador_linea.area_data.data[0].data = createArray(dashboard_indicador_linea.listIndN.length,'');
        dashboard_indicador_linea.area_data.data[1].data = createArray(dashboard_indicador_linea.listIndN.length,'');
        dashboard_indicador_linea.area_data.data[2].data = createArray(dashboard_indicador_linea.listIndN.length,'');

        for (var p = 0; p < dashboard_indicador_linea.listInd.length; p++){
            dashboard_indicador_linea.listIndN.push(dashboard_indicador_linea.listInd[p].indicador);
            dashboard_indicador_linea.area_data.data[0].data[p] = dashboard_indicador_linea.listInd[p].alcanzado ? dashboard_indicador_linea.listInd[p].alcanzado : '';
            dashboard_indicador_linea.area_data.data[1].data[p] = dashboard_indicador_linea.listInd[p].acumulado ?  dashboard_indicador_linea.listInd[p].acumulado :'';
            dashboard_indicador_linea.area_data.data[2].data[p] = dashboard_indicador_linea.listInd[p].alcanzado - dashboard_indicador_linea.listInd[p].acumulado ? dashboard_indicador_linea.listInd[p].alcanzado - dashboard_indicador_linea.listInd[p].acumulado : '';

            console.log(dashboard_indicador_linea.listInd[p].indicador,dashboard_indicador_linea.area_data.data[0].data[p], dashboard_indicador_linea.area_data.data[1].data[p],dashboard_indicador_linea.area_data.data[2].data[p]);
        }
        dashboard_indicador_linea.refreshAngular();
        dashboard_indicador_linea.charts.area.refresh();
        }else{
            dashboard_indicador_linea.area_data={};
            dashboard_indicador_linea.area_data = {
                legend: ['Varianza', 'Acumulado', 'Alcanzado'],
                down: ['Este departamento no contiene Indicadores'],
                data: [
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
                        name: 'Acumulado',
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
                        name: 'Varianza',
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
                    }
                ]
            };
            dashboard_indicador_linea.actualizacion = moment().format('DD/MM/YYYY h:mm');
            dashboard_indicador_linea.refreshAngular();
            dashboard_indicador_linea.charts.area.refresh();
        }
    };
    dashboard_indicador_linea.refresLines = async function () {
        SWEETALERT.loading({message: 'Refrescando'});
        await dashboard_indicador_linea.getAll();
        SWEETALERT.stop();
    };
    $scope.$watch('dashboard_indicador_linea.departamento', function (value) {
        dashboard_indicador_linea.getAll();
    });
});
