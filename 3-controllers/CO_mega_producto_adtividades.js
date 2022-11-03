app.controller("mega_producto_adtividades", function ($scope, $http, $compile) {
    mega_producto_adtividades = this;

    mega_producto_adtividades.headertitle = "Actividades";
    mega_producto_adtividades.plural = "Actividades";
    mega_producto_adtividades.singular = "Actividad";
    mega_producto_adtividades.id_status = mega_producto.id_status;
    mega_producto_adtividades.fixFilters = [
        {
            "field": 'producto',
            "value": mega_producto.id_producto
        }
    ];

    RUNCONTROLLER("mega_producto_adtividades", mega_producto_adtividades, $scope, $http, $compile);
    RUN_B("mega_producto_adtividades", mega_producto_adtividades, $scope, $http, $compile);
    mega_producto_adtividades.setPermission('actions',false);
    mega_producto_adtividades.$scope.$watch('mega_producto_adtividades.comentario', function (value) {
       var rules = [];
       rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.yariel.maliciousCode(value));
       VALIDATION.validate(mega_producto_adtividades, "comentario", rules);
    });

    mega_producto_adtividades.addComentario = function () {

        VALIDATION.save(mega_producto_adtividades, function () {
            BASEAPI.insertp('comentarios', {
                "comentario": mega_producto_adtividades.comentario,
                "type": 6,
                "created_by": mega_producto.usuario_id,
                "value": mega_producto.id_producto
            }).then(res => {

                SWEETALERT.show({message: `Comentario agregado con éxito.`});
                mega_producto_adtividades.comentario = "";
                mega_producto_adtividades.refreshAngular();

            });
        });
    };

    mega_producto_adtividades.triggers.table.after.load = function (record){
        $('#mega_producto_adtividadesTableBody .dragon-rows:eq(0)').addClass('alpha-secundary');
        // mega_producto_adtividades.id_actividad = mega_producto_adtividades.records ? mega_producto_adtividades.records.data[0].id : -1
        console.log('sii');
    };
    mega_producto_adtividades.closeComentario = function () {
        MODAL.close($scope);
    }
});
