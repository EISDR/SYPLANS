app.controller("ser_salida", function ($scope, $http, $compile) {
    ser_salida = this;
    //ser_salida.fixFilters = [];
    ser_salida.session = new SESSION().current();
    ser_salida.trabajando = false;
    ser_salida.showmerelations = false;
    ser_salida.fixFilters = [{
        field: "compania",
        value: ser_salida.session.compania_id
    }];
    ser_salida.singular = "Salida no Conforme";
    ser_salida.plural = "Salidas no Conforme";
    ser_salida.headertitle = "Salidas no Conforme";
    ser_salida.my_true_estatus = 1;
    //ser_salida.destroyForm = false;
    //ser_salida.permissionTable = "tabletopermission";
    RUNCONTROLLER("ser_salida", ser_salida, $scope, $http, $compile);
    ser_salida.formulary = function (data, mode, defaultData, trabajando) {
        if (ser_salida !== undefined) {
            ser_salida.trabajando = trabajando;
            RUN_B("ser_salida", ser_salida, $scope, $http, $compile);
            ser_salida.form.modalWidth = ENUM.modal.width.full;
            ser_salida.form.readonly = {compania: ser_salida.session.compania_id};
            ser_salida.form.titles = {
                new: (!trabajando ? "Agregar" : "Trabajar") + " Salida no Conforme",
                edit: (!trabajando ? "Editar" : "Trabajar") + " Salida no Conforme",
                view: "Ver Salida no Conforme"
            };

            ser_salida.createForm(data, mode, defaultData);
            ser_salida.mode = mode;
            //ms_product.selectQueries['compania'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            ser_salida.selectQueries['ser_salida_estatus'] = [
                {
                    field: 'rol',
                    operator: '=',
                    value: ser_salida.session.groups[0].id
                }
            ];
            $scope.$watch("ser_salida.nombre", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'nombre', rules);
            });
            $scope.$watch("ser_salida.descripcion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'descripcion', rules);
            });
            //ms_product.selectQueries['ser_salida_tipo'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ser_salida.esproceso", function (value) {
                var rules = [];
                //rules here
                if (value) {
                    var rules_proceso = [];
                    ser_salida.validate['ser_servicio'] = {
                        messages: "",
                        type: "success",
                        valid: true
                    };
                    rules_proceso.push(VALIDATION.general.required(ser_salida.proceso));
                    VALIDATION.validate(ser_salida, 'proceso', rules_proceso);
                }else{
                    var rules_ser_servicio = [];
                    ser_salida.validate['proceso'] = {
                        messages: "",
                        type: "success",
                        valid: true
                    };
                    rules_ser_servicio.push(VALIDATION.general.required(ser_salida.ser_servicio));
                    VALIDATION.validate(ser_salida, 'ser_servicio', rules_ser_servicio);
                }
            });
            $scope.$watch("ser_salida.ser_salida_tipo", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'ser_salida_tipo', rules);
            });
            $scope.$watch("ser_salida.ser_servicio", function (value) {
                var rules = [];
                //rules here
                if (!ser_salida.esproceso){
                    rules.push(VALIDATION.general.required(value));
                }else{
                    ser_salida.validate['ser_servicio'] = {
                        messages: "",
                        type: "success",
                        valid: true
                    };
                }
                VALIDATION.validate(ser_salida, 'ser_servicio', rules);
            });
            $scope.$watch("ser_salida.proceso", function (value) {
                var rules = [];
                //rules here
                if (!ser_salida.esproceso){
                    ser_salida.validate['proceso'] = {
                        messages: "",
                        type: "success",
                        valid: true
                    };
                }else{
                    rules.push(VALIDATION.general.required(value));
                }
                VALIDATION.validate(ser_salida, 'proceso', rules);
            });
            $scope.$watch("ser_salida.nivel_urgencia", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'nivel_urgencia', rules);
            });
            $scope.$watch("ser_salida.nivel_impacto", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'nivel_impacto', rules);
            });
            //ms_product.selectQueries['ser_salida_estatus'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("ser_salida.ser_salida_estatus", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'ser_salida_estatus', rules);
            });
            $scope.$watch("ser_salida.nombre_queja", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'nombre_queja', rules);
            });
            $scope.$watch("ser_salida.telefono_queja", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'telefono_queja', rules);
            });
            $scope.$watch("ser_salida.correo_queja", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                VALIDATION.validate(ser_salida, 'correo_queja', rules);
            });
            $scope.$watch("ser_salida.detalle_reporte", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'detalle_reporte', rules);
            });
            $scope.$watch("ser_salida.fecha_queja", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'fecha_queja', rules);
            });
            $scope.$watch("ser_salida.fecha_solucion", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'fecha_solucion', rules);
            });
            $scope.$watch("ser_salida.comentario_cerrar", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'comentario_cerrar', rules);
            });
            $scope.$watch("ser_salida.fecha_compromiso", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ser_salida, 'fecha_compromiso', rules);
            });
        }
    };
    ser_salida.currentNivel = () => {
        let entidad = ser_salida.esproceso ? 'proceso' : 'pei_poa';
        if (ser_salida.nivel_urgencia_object && ser_salida.nivel_impacto_object) {
            let p = ser_salida.nivel_urgencia_object.valor / 100;
            let i = ser_salida.nivel_impacto_object.valor;
            let n = p * i;
            let nivel = ser_salida.niveles.filter(d => {
                return n >= d.valor && n <= d.valor_to && d.entidad === entidad;
            })[0];
            if (nivel) {
                nivel.calc = Number(n).toFixed(2);
            }
            return nivel;
        }
        return undefined;
    };
    ser_salida.triggers.table.after.load = async function (records) {
        ser_salida.niveles = await BASEAPI.listf("riesgo_resultado", [{
            field: "compania",
            value: ser_salida.session.compania_id
        }]);
    };
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
    ser_salida.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
        if (!ser_salida.esproceso){
            data.inserting.proceso = "$null";
        }else{
            data.inserting.ser_servicio = "$null";
        }
        const format = "YYYY-MM-DD";
        if(moment(ser_salida.fecha_compromiso, format).isBefore(moment(ser_salida.fecha_queja, format))){
            SWEETALERT.show({
                type: "error",
                message: "La fecha límite de compromiso no puede ser menor a la fecha de creación de la queja",
            })
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    ser_salida.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        if (!ser_salida.esproceso){
            data.updating.proceso = "$null";
        }else{
            data.updating.ser_servicio = "$null";
        }
        const format = "YYYY-MM-DD";
        if(moment(ser_salida.fecha_compromiso, format).isBefore(moment(ser_salida.fecha_queja, format))){
            SWEETALERT.show({
                type: "error",
                message: "La fecha límite de compromiso no puede ser menor a la fecha de creación de la queja",
            })
            var buttons = document.getElementsByClassName("btn btn-labeled");
            for(var item of buttons){
                item.disabled = false;
            }
            resolve(false);
        }
        if (ser_salida.estatusbefore !== ser_salida.ser_salida_estatus) {
            let elcoment = data.updating.comentario + "";
            data.updating.comentario = "";
            BASEAPI.insertp('ser_salida_comentario',
                {
                    "comentario": elcoment,
                    "ser_salida": ser_salida.id,
                    "fecha": "$now()",
                    "usuario": ser_salida.session.usuario,
                    "estatus": ser_salida.ser_salida_estatus_object.nombre,
                }).then(d => {
                resolve(true);
            });
        }
        resolve(true);
    });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});