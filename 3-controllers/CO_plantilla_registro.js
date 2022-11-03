app.controller("plantilla_registro", function ($scope, $http, $compile) {
    plantilla_registro = this;
    plantilla_registro.companist = new SESSION().current().compania_id;
    plantilla_registro.fixFilters = [{
        field: "compania",
        value: plantilla_registro.companist
    }];
    plantilla_registro.singular = "Registro";
    plantilla_registro.plural = "Registros";
    plantilla_registro.headertitle = "Registro";
    //plantilla_registro.destroyForm = false;
    //plantilla_registro.permissionTable = "tabletopermission";
    RUNCONTROLLER("plantilla_registro", plantilla_registro, $scope, $http, $compile);
    plantilla_registro.fields = [];
    plantilla_registro.uploadImage = (id) => {
        $(`#${id}`).trigger("click");
    };
    plantilla_registro.elqueunavez = {};
    plantilla_registro.setBase64 = async (control) => {
        debugger;
        const file = control.files[0];
        const base64 = await plantilla_registro.convertBase64(file);
        let avatar = document.getElementById("base_" + control.id);
        avatar.src = base64;
        plantilla_registro[control.id] = base64;
    };
    plantilla_registro.convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    plantilla_registro.refreshFields = (plantilla) => {
        let selected = plantilla_registro.plantillas.filter(d => d.id == plantilla);
        plantilla_registro.fields = [];
        if (selected.length) {
            for (const d of selected) {
                plantilla_registro.fields.push(d);
            }
        }
        plantilla_registro.refreshAngular();

    }
    plantilla_registro.getFields = (plantilla) => {
        let selected = plantilla_registro.plantillas.filter(d => d.id == plantilla);
        let fields = [];
        if (selected.length) {
            for (const d of selected) {
                fields.push(d);
            }
        }
        return fields;

    }

    plantilla_registro.formulary = async function (data, mode, defaultData) {
        if (plantilla_registro !== undefined) {
            plantilla_registro.fields = [];
            if (!plantilla_registro.plantillas) {
                plantilla_registro.plantillas = await BASEAPI.listp("vw_planitilla_fields", {
                    orderby: "$ orden, label",
                    order: "asc",
                    limit: 0,
                    page: 1
                });
                plantilla_registro.plantillas = plantilla_registro.plantillas.data;
            }
            plantilla_registro.plantillas.forEach(d => {
                plantilla_registro[d.field] = "";
            });
            RUN_B("plantilla_registro", plantilla_registro, $scope, $http, $compile);
            plantilla_registro.form.modalWidth = ENUM.modal.width.full;
            plantilla_registro.form.readonly = {compania: new SESSION().current().compania_id};
            plantilla_registro.form.titles = {
                new: "Agregar registro",
                edit: "Editar registro",
                view: "Ver registro"
            };
            plantilla_registro.createForm(data, mode, defaultData);

            //ms_product.selectQueries['plantilla'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }


            $scope.$watch("plantilla_registro.plantilla", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                plantilla_registro.refreshFields(value);
                VALIDATION.validate(plantilla_registro, 'plantilla', rules);
            });

        }
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
    plantilla_registro.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        plantilla_registro.fields.forEach(d => {
            data.inserting[d.field] = plantilla_registro[d.field];
        });
        resolve(true);
    });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    plantilla_registro.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        plantilla_registro.fields.forEach(d => {
            data.updating[d.field] = plantilla_registro[d.field];
        });
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