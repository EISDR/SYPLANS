app.controller("autorizar_pei", function ($scope, $http, $compile) {
    autorizar_pei = this;
    RUNCONTROLLER("autorizar_pei", autorizar_pei, $scope, $http, $compile);
    RUN_B("autorizar_pei", autorizar_pei, $scope, $http, $compile);
    autorizar_pei.permitir = false;

    autorizar_pei.getPEIstatus = async function() {
        autorizar_pei.pei_value = await BASEAPI.listp("pei", {
            where: [{
                field: 'id',
                operator: "=",
                value: new SESSION().current().pei_id
            }]
        });
        if (autorizar_pei.pei_value !== undefined){
            if (autorizar_pei.pei_value.data){
                if (autorizar_pei.pei_value.data[0].activo != ENUM_2.pei_estatus.Inactivo){
                    // if (autorizar_pei.pei_value.data[0].estatus !== ENUM_2.pei_estatus.Autorizado) {
                        autorizar_pei.modal.modalView('megaconsulta', {
                            header: {
                                title: MESSAGE.i('planificacion.title_mega_consulta'),
                                icon: ""
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: MESSAGE.i('actions.Loading'),
                                sameController: 'megaconsulta'
                            },
                            event: {
                                show: {
                                    end: function (data) {
                                        MODAL.close(autorizar_pei);
                                    }
                                }
                            }
                        });
                    // }
                    // else {
                    //     SWEETALERT.lastLaert = myswal({
                    //         type: "warning",
                    //         title: "PEI ya esta Autorizado, desea ir a la opción para ver detalle del PEI",
                    //         html:  "",
                    //         showCancelButton: true,
                    //         confirmButtonText: MESSAGE.ic('mono.yes'),
                    //         cancelButtonText: MESSAGE.ic('mono.no')
                    //     }).then(result => {
                    //         if (result.dismiss === undefined) {
                    //             autorizar_pei.modal.modalView('megaconsulta', {
                    //                 header: {
                    //                     title: MESSAGE.i('planificacion.title_mega_consulta'),
                    //                     icon: ""
                    //                 },
                    //                 footer: {
                    //                     cancelButton: true
                    //                 },
                    //                 content: {
                    //                     loadingContentText: MESSAGE.i('actions.Loading'),
                    //                     sameController: 'megaconsulta'
                    //                 },
                    //                 event: {
                    //                     show: {
                    //                         end: function (data) {
                    //                             MODAL.close(autorizar_pei);
                    //                         }
                    //                     }
                    //                 }
                    //             });
                    //         } else {
                    //             MODAL.close('autorizar_pei');
                    //         }
                    //     });
                    // }
                } else {
                    autorizar_pei.permitir = true;
                    autorizar_pei.refreshAngular();
                }

            } else{
                autorizar_pei.permitir = true;
                autorizar_pei.refreshAngular();
            }
        } else {
            autorizar_pei.permitir = true;
            autorizar_pei.refreshAngular();
        }
    };
    autorizar_pei.getPEIstatus();
});