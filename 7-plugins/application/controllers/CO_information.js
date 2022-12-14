app.controller("information", function ($scope, $http, $compile) {
    information = this;
    information.headertitle = "";
    information.messageAbout = eval(`CONFIG.version.about.${MESSAGE.current().code}`);
    information.user = new SESSION().current();
    MENUMODAL = false;
    RUNCONTROLLER("information", information, $scope, $http, $compile);
    RUN_B("information", information, $scope, $http, $compile);

    baseController.currentModel = information;
    information.base = CONFIG.storageEntities;
    information.app = CONFIG.appEntities;
    information.menusall = baseController.elelemenu;
    information.getCount = async function (entity) {
        var animation = new ANIMATION();
        animation.loading(`#${entity}count`, "", ``, '30');
        var data = await BASEAPI.listp(entity, {});
        $(`#${entity}countvalue`).html(LAN.money(data.totalCount).format(false).split(".")[0]);
        animation.stoploading(`#${entity}count`);
    };
    information.addMainMenu = () => {
        information.menusall.splice(0, 0, {
            "icon": "home2",
            "href": "#",
            "text": "Nuevo Menu"
        });
        information.refreshAngular();
    };
    information.clean = async function (entity) {
        SWEETALERT.confirm({
            message: MESSAGE.i('alerts.AYSDelete'),
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                var result = await BASEAPI.truncatep(entity);
                if (result)
                    information.getCount(entity);
                SWEETALERT.stop();
            }
        });

    }
});
