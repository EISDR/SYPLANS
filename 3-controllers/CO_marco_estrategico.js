app.controller("marco_estrategico", function ($scope, $http, $compile) {
    marco_estrategico = this;
    var session = new SESSION();
    marco_estrategico.pei = 0;// session.current().compania_id === null ? 0 :session.current().pei_id;
    //klk
    BASEAPI.first('pei',{
        "where": [
            {
                "field": "compania",
                "value": session.current().compania_id
            },{
                "field": "activo",
                "value": ENUM_2.pei_estatus.Activo
            }
        ]
    },function (result) {
        if (result){
            marco_estrategico.pei = result.id;
        }
        BASEAPI.first('marco_estrategico', {
            where: [{
                field: "pei",
                value: marco_estrategico.pei
            }]
        },function (result) {
            if(result){
                marco_estrategico.id_marco = result.id;
                marco_estrategico.mision = result.mision;
                marco_estrategico.vision = result.vision;
                setTimeout(function () {
                    autosize($('#marco_mision'));
                    $('textarea[value=""]:visible:enabled:first').focus();
                },100);
            }

            RUNCONTROLLER("marco_estrategico", marco_estrategico, $scope, $http, $compile);
            // RUN_B("marco_estrategico", marco_estrategico, $scope, $http, $compile);
            marco_estrategico.refreshAngular();
            marco_estrategico.plural = " "+MESSAGE.i('planificacion.titleMarcoEstrategico');
            marco_estrategico.formulary = function (data, mode, defaultData) {
                if (marco_estrategico !== undefined) {
                    RUN_B("marco_estrategico", marco_estrategico, $scope, $http, $compile);
                    marco_estrategico.form.titles = {
                        new: MESSAGE.i('planificacion.titleMarcoEstrategico'),
                        edit: "Editar - "+` ${MESSAGE.i('planificacion.titleMarcoEstrategico')}`,
                        view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleMarcoEstrategico')}`
                    };
                    marco_estrategico.form.readonly = {};
                    marco_estrategico.createForm(data, mode, defaultData);
                }
            };

        });

    });

    marco_estrategico.saveMision = function (value) {
        BASEAPI.first('marco_estrategico',{
            where:[{
                field: "pei",
                value: marco_estrategico.pei
            }]
        },function (result) {
            if(result){
                BASEAPI.updateall('marco_estrategico',{
                    "mision": marco_estrategico.mision,
                    "pei": marco_estrategico.pei,
                    where:[{
                        "field": "id",
                        "value": result.id
                    }]
                },function(result){
                    SWEETALERT.show({message: "Misión actualizado"});
                });
            } else {
                BASEAPI.insert('marco_estrategico',{
                    "mision": marco_estrategico.mision,
                    "pei": marco_estrategico.pei
                },function(result){
                    SWEETALERT.show({message: "Misión creado"});
                });
            }
        });
    };
    marco_estrategico.saveVision = function (value) {
        BASEAPI.first('marco_estrategico',{
            where:[{
                field: "pei",
                value: marco_estrategico.pei
            }]
        },function (result) {
            if(result){
                BASEAPI.updateall('marco_estrategico',{
                    "vision": marco_estrategico.vision,
                    "pei": marco_estrategico.pei,
                    where:[{
                        "field": "id",
                        "value": result.id
                    }]
                },function(result){
                    SWEETALERT.show({message: "Visión actualizado"});
                });
            } else {
                //
                BASEAPI.insert('marco_estrategico', {
                    "insertData": {
                        "mision": marco_estrategico.mision,
                        "pei":  marco_estrategico.pei
                    }
                },function(result){
                });

                BASEAPI.insert('marco_estrategico',{
                    "vision": marco_estrategico.vision,
                    "pei": marco_estrategico.pei
                },function(result){
                    SWEETALERT.show({message: "Visión Creado"});
                });
            }
        });
    };

});