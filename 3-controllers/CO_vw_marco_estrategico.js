app.controller("vw_marco_estrategico", function ($scope, $http, $compile) {
    vw_marco_estrategico = this;
    var session = new SESSION();
    vw_marco_estrategico.pei = 0;// session.current().compania_id === null ? 0 :session.current().pei_id;
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
            vw_marco_estrategico.pei = result.id;
        }
        BASEAPI.first('marco_estrategico', {
            where: [{
                field: "pei",
                value: vw_marco_estrategico.pei
            }]
        },function (result) {
            if(result){
                vw_marco_estrategico.id_marco = result.id;
                vw_marco_estrategico.mision = result.mision;
                vw_marco_estrategico.vision = result.vision;

                setTimeout(function () {
                    autosize($('#view_vision'));
                },100);
            }

            RUNCONTROLLER("vw_marco_estrategico", vw_marco_estrategico, $scope, $http, $compile);
            // RUN_B("vw_marco_estrategico", vw_marco_estrategico, $scope, $http, $compile);
            vw_marco_estrategico.refreshAngular();
            vw_marco_estrategico.plural = " "+MESSAGE.i('planificacion.titleMarcoEstrategico');
            vw_marco_estrategico.formulary = function (data, mode, defaultData) {
                if (vw_marco_estrategico !== undefined) {
                    RUN_B("vw_marco_estrategico", vw_marco_estrategico, $scope, $http, $compile);
                    vw_marco_estrategico.form.titles = {
                        new: MESSAGE.i('planificacion.titleMarcoEstrategico'),
                        edit: "Editar - "+`${MESSAGE.i('planificacion.titleMarcoEstrategico')}`,
                        view: "Ver ALL - "+`${MESSAGE.i('planificacion.titleMarcoEstrategico')}`
                    };
                    vw_marco_estrategico.form.readonly = {};
                    vw_marco_estrategico.createForm(data, mode, defaultData);
                }
            };

        });

    });

    vw_marco_estrategico.saveMision = function (value) {
        BASEAPI.first('marco_estrategico',{
            where:[{
                field: "pei",
                value: vw_marco_estrategico.pei
            }]
        },function (result) {
            if(result){
                BASEAPI.updateall('marco_estrategico',{
                    "mision": vw_marco_estrategico.mision,
                    "pei": vw_marco_estrategico.pei,
                    where:[{
                        "field": "id",
                        "value": result.id
                    }]
                },function(result){
                    SWEETALERT.show({message: "Misión actualizado"});
                });
            } else {
                BASEAPI.insert('marco_estrategico',{
                    "mision": vw_marco_estrategico.mision,
                    "pei": vw_marco_estrategico.pei
                },function(result){
                    SWEETALERT.show({message: "Misión creado"});
                });
            }
        });
    };
    vw_marco_estrategico.saveVision = function (value) {
        BASEAPI.first('marco_estrategico',{
            where:[{
                field: "pei",
                value: vw_marco_estrategico.pei
            }]
        },function (result) {
            if(result){
                BASEAPI.updateall('marco_estrategico',{
                    "vision": vw_marco_estrategico.vision,
                    "pei": vw_marco_estrategico.pei,
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
                        "mision": vw_marco_estrategico.mision,
                        "pei":  vw_marco_estrategico.pei
                    }
                },function(result){
                });

                BASEAPI.insert('marco_estrategico',{
                    "vision": vw_marco_estrategico.vision,
                    "pei": vw_marco_estrategico.pei
                },function(result){
                    SWEETALERT.show({message: "Visión Creado"});
                });
            }
        });
    };

});