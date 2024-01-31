app.controller("lote_clonacion", function ($scope, $http, $compile) {
    ready = async () => {
        lote_clonacion = this;
        //lote_clonacion.fixFilters = [];
        lote_clonacion.session = new SESSION().current();
        //lote_clonacion.singular = "singular";
        //lote_clonacion.plural = "plural";
        //lote_clonacion.headertitle = "Hola Title";
        //lote_clonacion.destroyForm = false;
        //lote_clonacion.permissionTable = "tabletopermission";
        lote_clonacion.condiction = lote_clonacion.session.poa_id ? lote_clonacion.session.poa_id : 0;
        lote_clonacion.group_caracteristica = lote_clonacion.session.groups[0] ? lote_clonacion.session.groups[0].caracteristica : "";
        if (lote_clonacion.group_caracteristica == ENUM_2.Grupos.director_departamental || lote_clonacion.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
            lote_clonacion.fixFilters = [
                {
                    field: "compania",
                    value: lote_clonacion.session.compania_id
                },
                {
                    field: "departamento",
                    value: lote_clonacion.session.departamento
                }
            ];
        }else{
            lote_clonacion.fixFilters = [{
                field: "compania",
                value: lote_clonacion.session.compania_id
            }];
        }
        RUNCONTROLLER("lote_clonacion", lote_clonacion, $scope, $http, $compile);
        lote_clonacion.formulary = function (data, mode, defaultData) {
            if (lote_clonacion !== undefined) {
                RUN_B("lote_clonacion", lote_clonacion, $scope, $http, $compile);
                lote_clonacion.form.modalWidth = ENUM.modal.width.full;
                lote_clonacion.form.readonly = {poa_destino: lote_clonacion.session.poa_id, autor:lote_clonacion.session.usuario_id, compania: lote_clonacion.session.compania_id};
                lote_clonacion.form.titles = {
                    new: "Agregar configuración de clonación",
                    edit: "Editar configuración de clonación",
                    view: "Ver configuración de clonación"
                };
                lote_clonacion.createForm(data, mode, defaultData, undefined, (data)=>{
                    let pordefecto  ={productos: [],complete:false};
                    lote_clonacion.load_drp = false;
                    try {
                        if (mode === "new") {
                            lote_clonacion.config = pordefecto;
                            lote_clonacion.repeatProductos = [];
                            lote_clonacion.config.productos = [];
                        } else {
                            let parse = (lote_clonacion.config || JSON.stringify(pordefecto));
                            console.log(parse)
                            lote_clonacion.config = JSON.parse(parse);
                            lote_clonacion.currentRepeat = "productos";
                            lote_clonacion.repeatProductos = lote_clonacion.config.productos;
                            lote_clonacion.refreshAngular();
                        }
                    } catch (e) {
                        console.log(e);
                        lote_clonacion.config = pordefecto;
                    }
                });
                //ms_product.selectQueries['departamento'] = [
                //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
                //    }
                //];
                $scope.$watch("lote_clonacion.departamento", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(lote_clonacion, 'departamento', rules);
                });
                $scope.$watch("lote_clonacion.autor", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(lote_clonacion, 'autor', rules);
                });
                $scope.$watch("lote_clonacion.estatus", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(lote_clonacion, 'estatus', rules);
                });
                $scope.$watch("lote_clonacion.config", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(lote_clonacion, 'config', rules);
                });
                $scope.$watch("lote_clonacion.poa_desde", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(lote_clonacion, 'poa_desde', rules);
                });
                $scope.$watch("lote_clonacion.poa_destino", function (value) {
                    var rules = [];
                    //rules here
                    //rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(lote_clonacion, 'poa_destino', rules);
                });
            }
        };

//listas
        lote_clonacion.resultado_list = await BASEAPI.listp("vw_resultado", {limit: 0, where: [{field: "compania", value: lote_clonacion.session.compania_id}]});
        lote_clonacion.resultado_list = lote_clonacion.resultado_list.data;
        lote_clonacion.usuarios_list = await BASEAPI.listp("vw_usuario", {limit: 0, where: [{field: "compania", value: lote_clonacion.session.compania_id}]});
        lote_clonacion.usuarios_list = lote_clonacion.usuarios_list.data;
        lote_clonacion.departamentos_list = await BASEAPI.listp("departamento", {limit: 0, where: [{field: "compania", value: lote_clonacion.session.compania_id}]});
        lote_clonacion.departamentos_list = lote_clonacion.departamentos_list.data;
        lote_clonacion.producto_list = await BASEAPI.listp("vw_productos_poa", {limit: 0, where: [{field: "compania", value: lote_clonacion.session.compania_id}]});
        lote_clonacion.producto_list = lote_clonacion.producto_list.data;
        lote_clonacion.actividades_list = await BASEAPI.listp("vw_actividades_poa_slim_compania", {limit: 0, where: [{field: "compania", value: lote_clonacion.session.compania_id}]});
        lote_clonacion.actividades_list = lote_clonacion.actividades_list.data;

        lote_clonacion.fixDates = (item) => {
            item.fecha_fin = moment(lote_clonacion.session.periodo_poa + "-12-31").format('YYYY-MM-DD');
            item.fecha_inicio = moment(lote_clonacion.session.periodo_poa + "-01-01").format('YYYY-MM-DD');
        }
        lote_clonacion.productoListo = (producto) => {
            if (producto.mis_actividades)
                if (producto.mis_actividades.filter(d => !lote_clonacion.actividadLista(d)).length)
                    return false;
            return true;
        }
        lote_clonacion.actividadLista = (actividad) => {
            if (!lote_clonacion.usuarios.filter(d => d.id == actividad.responsable).length)
                return false;
            if (actividad.mis_actividades_apoyo)
                if (actividad.mis_actividades_apoyo.filter(d => !lote_clonacion.actividadApoyoLista(d)).length)
                    return false;
            return true;
        }

        lote_clonacion.actividadApoyoLista = (apoyo) => {
            if (!lote_clonacion.usuarios.filter(d => d.id == apoyo.responsable).length)
                return false;
            return true;
        }

        lote_clonacion.productoStyle = (producto) => {
            return [lote_clonacion.productoListo(producto) ? '' : 'bg-danger'];
        }
//ng-class="NNNNNNNNN.productoStyle(producto)"

        lote_clonacion.getData = async function (poa, departamento) {
            let productos = await BASEAPI.listp("productos_poa", {
                limit: 0,
                where: [{field: "poa", value: poa}, {field: "departamento", value: departamento}]
            });
            productos = productos.data;
            let productosIDS = productos.map(d => d.id);

            let activadaes = await BASEAPI.listp("actividades_poa", {
                limit: 0,
                where: [{field: "producto", value: productosIDS}]
            });
            activadaes = activadaes.data;
            let activadaesIDS = activadaes.map(d => d.id);

            let indiProductos = await BASEAPI.listp("indicador_poa", {
                limit: 0,
                where: [{field: "producto", value: productosIDS}]
            });
            indiProductos = indiProductos.data;
            let indiProductosIDS = indiProductos.map(d => d.id);

            let metasIndiProductos = await BASEAPI.listp("indicador_poa_periodo", {
                limit: 0,
                where: [{field: "indicador_poa", value: indiProductosIDS}]
            });
            metasIndiProductos = metasIndiProductos.data;

            let indiActividades = await BASEAPI.listp("indicador_actividad", {
                limit: 0,
                where: [{field: "actividades_poa", value: activadaesIDS}]
            });
            indiActividades = indiActividades.data;
            let indiActividadesIDS = indiActividades.map(d => d.id);

            let metasIndiActividades = await BASEAPI.listp("indicador_actividad_periodo", {
                limit: 0,
                where: [{field: "indicador_actividad", value: indiActividadesIDS}]
            });
            metasIndiActividades = metasIndiActividades.data;

            let apoyo = await BASEAPI.listp("actividades_apoyo", {
                limit: 0,
                where: [{field: "actividades_poa", value: activadaesIDS}]
            });
            apoyo = apoyo.data;

            let relations =
                [
                    {child: apoyo, parent: activadaes, field: "actividades_poa", name: "mis_actividades_apoyo"},
                    {child: metasIndiActividades, parent: indiActividades, field: "indicador_actividad", name: "mis_metas"},
                    {child: indiActividades, parent: activadaes, field: "actividades_poa", name: "mis_indicadores"},
                    {child: metasIndiProductos, parent: indiProductos, field: "indicador_poa", name: "mis_metas"},
                    {child: indiProductos, parent: productos, field: "producto", name: "mis_indicadores"},
                    {child: activadaes, parent: productos, field: "producto", name: "mis_actividades"},
                ];

            relations.forEach(relation => {
                relation.child.forEach(item => {
                    let current = relation.parent.filter(d => item[relation.field] == d.id)[0];
                    if (!current[relation.name])
                        current[relation.name] = [];
                    current[relation.name].push(item);
                });
            });

            productos.forEach(producto => {
                lote_clonacion.fixDates(producto);
                if (producto.mis_actividades)
                    producto.mis_actividades.forEach(actividad => {
                        lote_clonacion.fixDates(actividad);
                        if (actividad.mis_actividades_apoyo)
                            actividad.mis_actividades_apoyo.forEach(item => {
                                lote_clonacion.fixDates(item);
                            });
                    });
            });

            lote_clonacion.config.productos = productos;

            lote_clonacion.currentRepeat = "productos";
//ng-show="NNNNNNNNN.currentRepeat==='productos'"
            lote_clonacion.repeatProductos = lote_clonacion.config.productos;
            lote_clonacion.refreshAngular();
        }


        lote_clonacion.irActividades = (producto) => {
            lote_clonacion.currentRepeat = "actividades";
            lote_clonacion.repeatActividades = producto.mis_actividades;
            lote_clonacion.last_repeat = "productos";
            lote_clonacion.refreshAngular();
        }
        lote_clonacion.irIndicadoresP = (producto) => {
            lote_clonacion.currentRepeat = "indicadoresP";
            lote_clonacion.repeatIndicadoresP = producto.mis_indicadores;
            lote_clonacion.last_repeat = "productos";
            lote_clonacion.refreshAngular();
        }
        lote_clonacion.irActividades_apoyo = (actividad) => {
            lote_clonacion.currentRepeat = "actividades_apoyo";
            lote_clonacion.repeatActividades_apoyo = actividad.mis_actividades_apoyo;
            lote_clonacion.last_repeat = "actividades";
            lote_clonacion.refreshAngular();
        }
        lote_clonacion.irIndicadoresA = (actividad) => {
            lote_clonacion.currentRepeat = "indicadoresA";
            lote_clonacion.repeatIndicadoresA = actividad.mis_indicadores;
            lote_clonacion.last_repeat = "actividades";
            lote_clonacion.refreshAngular();
        }

        lote_clonacion.irAtras = (latabla) => {
            switch (latabla) {
                case "indicadoresP": {
                    lote_clonacion.currentRepeat = "productos";
                    lote_clonacion.refreshAngular();
                    break;
                }
                case "indicadoresA": {
                    lote_clonacion.currentRepeat = "actividades";
                    lote_clonacion.refreshAngular();
                    break;
                }
                case "actividades_apoyo": {
                    lote_clonacion.currentRepeat = "actividades";
                    lote_clonacion.refreshAngular();
                    break;
                }
                default : {
                    lote_clonacion.currentRepeat = "productos";
                    lote_clonacion.refreshAngular();
                }
            }
        }

        lote_clonacion.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
            data.inserting.config = JSON.stringify(lote_clonacion.config);
            data.inserting.config = data.inserting.config.replaceAll(`\\"`, ``);
            data.inserting.config = data.inserting.config.replaceAll(`\n\r`, ` `);
            data.inserting.config = data.inserting.config.replaceAll(`\n`, ` `);
            data.inserting.config = data.inserting.config.replaceAll(`\r`, ` `);
            data.inserting.config = data.inserting.config.replaceAll(`\t`, ``);
            data.inserting.config = data.inserting.config.replaceAll(`'`, ``);
            resolve(true);
        });

        lote_clonacion.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
            var tab = RegExp("\\t", "g");
            data.updating.config = JSON.stringify(lote_clonacion.config);
            data.updating.config = data.updating.config.replaceAll(`\\"`, ``);
            data.updating.config = data.updating.config.replaceAll(`\n\r`, ` `);
            data.updating.config = data.updating.config.replaceAll(`\n`, ` `);
            data.updating.config = data.updating.config.replaceAll(`\r`, ` `);
            data.updating.config = data.updating.config.replaceAll(`\\t`, ``);
            resolve(true);
        });

        lote_clonacion.format_money = function (value){
            return LAN.money(value).format(true);
        }
        lote_clonacion.format_date = function (value){
            return LAN.date(value);
        }

        lote_clonacion.get_value_name = function (value, from){
            switch (from){
                case "producto": {
                    if (lote_clonacion.producto_list.length > 0){
                        let producto = lote_clonacion.producto_list.filter(d => { return d.id === value})
                        return producto[0].nombre;
                    }
                }
                case "departamento": {
                    if (lote_clonacion.departamentos_list.length > 0){
                        let departamento = lote_clonacion.departamentos_list.filter(d => { return d.id === value})
                        return departamento[0].nombre;
                    }
                }
                case "actividades": {
                    if (lote_clonacion.actividades_list.length > 0){
                        let actividad = lote_clonacion.actividades_list.filter(d => { return d.id === value})
                        return actividad[0].nombre;
                    }
                }
                default: {
                    if (lote_clonacion.resultado_list.length > 0){
                        let resultado = lote_clonacion.resultado_list.filter(d => { return d.id === value})
                        return resultado[0].resultado_esperado;
                    }
                }
            }
        }
//NNNNNNNNN.irAtras("productos")

        lote_clonacion.emigrar_poa = async function () {
            if (lote_clonacion.session.est_poa === ENUM_2.poa_estatus.Cerrado){
                SWEETALERT.show({type: "error", message: "El POA destino está cerrado, no se puede proceder con el proceso de clonación"})
            }else {
                SWEETALERT.loading({message: "Por favor espere mientras se insertan los registros al nuevo POA seleccionado" + "..."})
                lote_clonacion.prespuesto_aprobado = await BASEAPI.listp("presupuesto_aprobado", {limit: 0,
                    where: [{field: "poa", value: lote_clonacion.session.poa_id}, {
                        field: "departamento",
                        value: lote_clonacion.departamento
                    }]
                });
                lote_clonacion.prespuesto_aprobado = lote_clonacion.prespuesto_aprobado.data;
                lote_clonacion.prespuesto_aprobado_viejo = await BASEAPI.listp("vw_presupuesto_aprobado", {limit: 0,
                    where: [{field: "poa", value: lote_clonacion.poa_desde}, {
                        field: "departamento_id",
                        value: lote_clonacion.departamento
                    }]
                });
                lote_clonacion.prespuesto_aprobado_viejo = lote_clonacion.prespuesto_aprobado_viejo.data
                console.log(lote_clonacion.prespuesto_aprobado_viejo, lote_clonacion.prespuesto_aprobado)

                if (lote_clonacion.prespuesto_aprobado[0].valor < lote_clonacion.prespuesto_aprobado_viejo[0].presupuesto_asignado){
                    SWEETALERT.show({
                        type: "error",
                        message: `<p>No se puede llevar a cabo el proceso de clonación debido a que el departamento <strong style="text-transform: uppercase">${lote_clonacion.prespuesto_aprobado_viejo[0].departamento}</strong> no cuenta con presupuesto suficiente.</p>
                        <p>El departamento cuenta con un presupuesto de: ${LAN.money(lote_clonacion.prespuesto_aprobado[0].valor).format(true)} y la cantidad total de presupuesto que necesita debe ser mayor a: ${LAN.money(lote_clonacion.prespuesto_aprobado_viejo[0].presupuesto_asignado).format(true)}.</p>`
                    });
                }else{
                    if (lote_clonacion.config.productos) {
                        for (let producto of lote_clonacion.config.productos) {
                            let new_producto = DSON.OSO(producto);
                            delete new_producto.mis_actividades
                            delete new_producto.mis_indicadores
                            delete new_producto.id
                            new_producto.poa = lote_clonacion.session.poa_id;
                            new_producto.presupuesto_aprobado = lote_clonacion.prespuesto_aprobado.id;
                            lote_clonacion.fixDates(new_producto)
                            var result_producto = await BASEAPI.insertIDp('productos_poa', new_producto, '', '')
                            result_producto = result_producto.data;
                            if (result_producto) {
                                if (result_producto.data.length > 0) {
                                    if (result_producto.data[0].id) {
                                        if (producto.mis_actividades) {
                                            for (let actividad of producto.mis_actividades) {
                                                let new_actividad = DSON.OSO(actividad);
                                                delete new_actividad.mis_actividades_apoyo
                                                delete new_actividad.mis_indicadores
                                                delete new_actividad.id
                                                new_actividad.poa = lote_clonacion.session.poa_id;
                                                new_actividad.producto = result_producto.data[0].id;
                                                lote_clonacion.fixDates(new_actividad)
                                                var result_actividad = await BASEAPI.insertIDp('actividades_poa', new_actividad, '', '')
                                                result_actividad = result_actividad.data;
                                                if (result_actividad) {
                                                    if (result_actividad.data.length > 0) {
                                                        if (result_actividad.data[0].id) {
                                                            if (actividad.mis_actividades_apoyo) {
                                                                for (let actividad_apoyo of actividad.mis_actividades_apoyo) {
                                                                    let new_actividad_apoyo = DSON.OSO(actividad_apoyo);
                                                                    delete new_actividad_apoyo.id
                                                                    new_actividad_apoyo.actividades_poa = result_actividad.data[0].id;
                                                                    lote_clonacion.fixDates(new_actividad_apoyo)
                                                                    await BASEAPI.insertIDp('actividades_apoyo', new_actividad_apoyo, '', '');
                                                                }
                                                            }
                                                            if (actividad.mis_indicadores) {
                                                                for (let indicador_actividad of actividad.mis_indicadores) {
                                                                    let new_indicador_actividad = DSON.OSO(indicador_actividad);
                                                                    delete new_indicador_actividad.id
                                                                    delete new_indicador_actividad.mis_metas
                                                                    new_indicador_actividad.actividades_poa = result_actividad.data[0].id;
                                                                    var result_indicador_actividad = await BASEAPI.insertIDp('indicador_actividad', new_indicador_actividad, '', '');
                                                                    result_indicador_actividad = result_indicador_actividad.data;
                                                                    if (result_indicador_actividad) {
                                                                        if (result_indicador_actividad.data.length > 0) {
                                                                            if (result_indicador_actividad.data[0].id) {
                                                                                if (indicador_actividad.mis_metas) {
                                                                                    for (let meta of indicador_actividad.mis_metas) {
                                                                                        let new_meta = DSON.OSO(meta);
                                                                                        delete new_meta.id
                                                                                        new_meta.indicador_actividad = result_indicador_actividad.data[0].id;
                                                                                        await BASEAPI.insertIDp('indicador_actividad_periodo', new_meta, '', '');
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                console.log(result_actividad)
                                            }
                                        }
                                        if (producto.mis_indicadores) {
                                            for (let indicador_producto of producto.mis_indicadores) {
                                                let new_indicador_producto = DSON.OSO(indicador_producto);
                                                delete new_indicador_producto.id
                                                delete new_indicador_producto.mis_metas
                                                new_indicador_producto.producto = result_producto.data[0].id;
                                                var result_indicador_producto = await BASEAPI.insertIDp('indicador_poa', new_indicador_producto, '', '');
                                                result_indicador_producto = result_indicador_producto.data;
                                                if (result_indicador_producto) {
                                                    if (result_indicador_producto.data.length > 0) {
                                                        if (result_indicador_producto.data[0].id) {
                                                            if (indicador_producto.mis_metas) {
                                                                for (let meta of indicador_producto.mis_metas) {
                                                                    let new_meta = DSON.OSO(meta);
                                                                    delete new_meta.id
                                                                    new_meta.indicador_poa = result_indicador_producto.data[0].id;
                                                                    await BASEAPI.insertIDp('indicador_poa_periodo', new_meta, '', '');
                                                                }
                                                            }
                                                        }
                                                    }
                                                    console.log(result_indicador_producto);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            console.log(result_producto)
                        }
                        SWEETALERT.stop();
                    } else {
                        SWEETALERT.show({
                            type: 'error',
                            message: "No existen datos obtenidos desde la busqueda"
                        })
                    }
                }

            }
        }


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
        lote_clonacion.triggers.table.after.control = function (data) {
            if (lote_clonacion.group_caracteristica == ENUM_2.Grupos.director_departamental || lote_clonacion.group_caracteristica == ENUM_2.Grupos.analista_departamental) {
                if (!lote_clonacion.load_drp) {
                    if (lote_clonacion.form.mode == 'new') {
                        lote_clonacion.departamento = lote_clonacion.session.departamento + "";
                    }
                    lote_clonacion.form.options.departamento.disabled = true;
                    lote_clonacion.load_drp = true;
                    lote_clonacion.refreshAngular();
                }
            }
            //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
        };
        // $scope.triggers.table.before.control = function (data) {
        //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
        // };
        //$scope.beforeDelete = function (data) {
        //    return false;
        //};
        //$scope.afterDelete = function (data) {
        //};
    }
    ready();
});