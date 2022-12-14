ANIMATION = function () {

    this.play = function (block, animation) {
        if (!STORAGE.get('animation')) {
            if (block === undefined) block = "#content";
            var element = $(block);
            if (animation === undefined) {
                animation = element.data("animation");
            }
            element.addClass("animated " + animation).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                element.removeClass("animated " + animation);
            });
        }
    };
    this.playPure = function (block, animation, callback) {
        if (!STORAGE.get('animation')) {
            block.addClass("animated " + animation).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                block.removeClass("animated " + animation);
                callback();
            });
        }
    };
    this.loading = function (customBlock, text, spinner, size, icon, top) {
        if (!STORAGE.get('animation')) {
            if (customBlock === undefined) customBlock = "#content";
            if (text === undefined) text = MESSAGE.i('actions.Loading');
            if (spinner !== undefined) {
                this.spinner.on(spinner);
            }
            var message = text + '<br><i class="icon-' + (icon || ("spinner2")) + ' ' + (top ? "spinner" : "spinner") + '" style="font-size: ' + (size || "50") + 'px"></i>';
            if (customBlock === "#content") {
                message = `<div class="spinner222">
                                <div class="double-bounce1 bg-<%= COLOR.primary %>-600"></div>
                                <div class="double-bounce2 bg-<%= COLOR.secundary %>-600"></div>
                                <div class="double-bounce3 bg-<%= COLOR.extra %>-600"></div>
                            </div>`;
            }
            var block = $(customBlock);
            $(block).block({
                message: message,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd',
                    height: '100%',
                    width: '100%',
                    left: '0px',
                    top: '0px'
                },
                css: {
                    border: 0,
                    backgroundColor: 'none'
                }
            });
        }
    };
    this.loadingParent = function (customBlock, text, spinner, size, icon, top) {
        if (!STORAGE.get('animation')) {
            if (customBlock === undefined) customBlock = "#content";
            if (text === undefined) text = MESSAGE.i('actions.Loading');
            if (spinner !== undefined) {
                this.spinner.on(spinner);
            }
            var message = text + '<br><i class="icon-' + (icon || ("spinner2")) + ' ' + (top ? "spinner" : "spinner") + '" style="font-size: ' + (size || "50") + 'px"></i>';
            if (customBlock === "#content") {
                message = `<div class="spinner222">
                                <div class="double-bounce1 bg-<%= COLOR.primary %>-600"></div>
                                <div class="double-bounce2 bg-<%= COLOR.secundary %>-600"></div>
                                <div class="double-bounce3 bg-<%= COLOR.extra %>-600"></div>
                            </div>`;
            }
            var block = $(customBlock);
            $(block).block({
                message: message,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd',
                    height: '100%',
                    width: '100%',
                    left: '0px',
                    top: '0px'
                },
                css: {
                    border: 0,
                    backgroundColor: 'none'
                }
            });
        }
    };
    this.stoploading = function (customBlock, spinner) {
        if (!STORAGE.get('animation')) {
            if (customBlock === undefined) {
                customBlock = "#content";
            }

            if (spinner !== undefined) {
                this.spinner.off(spinner);
            }
            var block = $(customBlock);
            $(block).unblock();
        }
    };
    this.loadingPure = function (customBlock, text, spinner, size, icon) {
        if (!STORAGE.get('animation')) {
            if (text === undefined) text = MESSAGE.i('actions.Loading');
            if (spinner !== undefined) {
                this.spinner.onPure(spinner);
            }
            customBlock.block({
                message: text + '<br><i class="icon-' + (icon || "spinner2") + ' spinner" style="font-size: ' + (size || "50") + 'px"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd',
                    height: '100%',
                    width: '100%',
                    left: '0px'
                },
                css: {
                    border: 0,
                    backgroundColor: 'none'
                }
            });
        }
    };
    this.stoploadingPure = function (customBlock, spinner) {
        if (!STORAGE.get('animation')) {
            if (spinner !== undefined) {
                this.spinner.offPure(spinner);
            }
            customBlock.unblock();
        }
    };
    this.spinner = {
        on: function (customBlock, top) {
            if (!STORAGE.get('animation')) {
                var i = $(customBlock).find("i");
                $(customBlock).addClass("disabled");
                $(customBlock).addClass("spinner");
                if (top) {
                    $(customBlock).addClass("spinnerTop");
                }
                if (i.length <= 0) {

                } else {
                    i.addClass("spinner");
                }
            }
        },
        off: function (customBlock) {
            if (!STORAGE.get('animation')) {
                var i = $(customBlock).find("i");
                $(customBlock).removeClass("disabled");
                $(customBlock).removeClass("spinner");
                if (i.length <= 0) {

                } else {
                    i.removeClass("spinner");
                }
            }
        },
        onPure: function (customBlock) {
            if (!STORAGE.get('animation')) {
                var i = customBlock.find("i");
                customBlock.addClass("disabled");
                customBlock.addClass("spinner");
                if (i.length <= 0) {

                } else {
                    i.addClass("spinner");
                }
            }
        },
        offPure: function (customBlock) {
            if (!STORAGE.get('animation')) {
                var i = customBlock.find("i");
                customBlock.removeClass("disabled");
                customBlock.removeClass("spinner");
                if (i.length <= 0) {

                } else {
                    i.removeClass("spinner");
                }
            }
        }

    }
};
$(document).ready(function () {

    // Animate when Pace loading is done
    firstPeace = true;
    Pace.on('done', function () {
        if (firstPeace) {
            $(".spinner222").addClass('afterSpinerLoad');
            $('#baseController').show();

            $(document).on('dblclick', '[data-dragonfile]', function () {
                var folder = $(this).data('dragonfile');
                folder = folder[0] = '/' ? folder.substr(1, folder.length - 1) : folder;
                baseController.viewData = {
                    root: folder,
                    scope: baseController.currentModel,
                    columns: 1,
                    maxsize: 9999,
                    maxfiles: 1
                };
                baseController.currentModel.modal.modalView("templates/components/gallery", {
                    width: 'modal-full',
                    header: {
                        title: `${MESSAGE.ic('mono.filesof')} ${folder}`,
                        icon: "file-stats"
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading')
                    },
                });
            });

            $('[data-dragonfile]').each(function () {
                FILE.runServerFile($(this))
            });


            firstPeace = false;

        }
    });

});
