MESSAGE = {
    missingLanguage: [],
    OPEN: function () {
        baseController.viewData = {
            staticdata: MESSAGE.missingLanguage
        };
        var modal = {
            header: {
                title: "Missing Messages",
                icon: "stack-text"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        };
        baseController.currentModel.modal.modalView("templates/components/messageManager", modal);
    },
    register: function (language, folder, key) {
        if (!STORAGE.get("missingLanguage"))
            console.log("norev");
        let recolectados = STORAGE.get("missingLanguage") || [];
        for (const old of recolectados) {
            let exist = MESSAGE.missingLanguage.filter(d => d.category === old.category && d.key === old.key).length;
            if (!exist)
                MESSAGE.missingLanguage.push(old);
        }
        let exist = MESSAGE.missingLanguage.filter(d => d.category === folder && d.key === key);
        if (!exist.length) {
            let old = "";
            if (LANGUAGEOLD.es)
                if (LANGUAGEOLD.es[folder || "mono"])
                    if (LANGUAGEOLD.es[folder || "mono"][key])
                        old = LANGUAGEOLD.es[folder || "mono"][key];
            MESSAGE.missingLanguage.push({
                category: folder || "mono",
                key: key,
                es: old ? old : `${key}**`,
                en: `${key}**`,
                ia: 0,
                human: 0,
                exist: 0
            });
            STORAGE.add("missingLanguage", MESSAGE.missingLanguage);
        }
    },
    characterize: function (str) {
        var charac = [];
        var newstr = str;
        charac["@ENTER@"] = "<br>";
        charac["@SPACE@"] = " ";
        charac["@MINUS@"] = "<";
        charac["@MAYOR@"] = ">";
        charac["@QUOTE@"] = "'";
        charac["@DOBLEQUOTE@"] = "\"";
        for (var i in charac) {
            newstr = newstr.replaceAll(i, charac[i]);
        }
        return newstr;
    },
    i: function (key, defaulttext) {
        var lan = STORAGE.get('LANGUAGE') || CONFIG.language;
        var toreturn = key;
        var strict = key.split('.');
        if (MESSAGE.exist(key)) {
            return MESSAGE.characterize(eval(`(LANGUAGE?.${lan}||{}).${strict[0]}['${strict[1]}']`));
        } else {
            for (var i in LANGUAGE) {
                if (MESSAGE.existOther(key, i)) {
                    if (CONFIG.mode === "developer") {
                        if (strict.length > 1)
                            MESSAGE.register(lan, strict[0], strict[1]);
                        else {
                            SWEETALERT.show(`The langage key ${key} don't have folder, please change`);
                        }
                    }
                    return MESSAGE.characterize(eval(`LANGUAGE.${i}.${strict[0]}['${strict[1]}']`));
                }
            }
            if (CONFIG.mode === "developer") {
                var strict = key.split('.');
                if (strict.length > 1)
                    MESSAGE.register(lan, strict[0], strict[1]);
                else {
                    SWEETALERT.show({message: `The langage key ${key} don't have folder, please change`});
                }
            }
            return defaulttext || `[${lan}.${key}]`;
        }
    },
    ieval: function (key, vars) {
        for (var i in vars) {
            eval(`var ${i} =vars[i]`);
        }
        return eval("`" + MESSAGE.i(key) + "`");
    },
    ic: function (key, defaulttext) {
        return capitalize(MESSAGE.i(key, defaulttext));
    },
    ispace: function (key, defaulttext) {
        return MESSAGE.i(key.replaceAll(' ', ''), defaulttext);
    },
    icspace: function (key, defaulttext) {
        return MESSAGE.ic(key.replaceAll(' ', ''), defaulttext);
    },
    exist: function (key) {
        var lan = STORAGE.get('LANGUAGE') || CONFIG.language;
        if (!eval(`(LANGUAGE?.${lan}||{}).hasOwnProperty('${key.split('.')[0]}')`))
            return false;
        var exist = eval(`((LANGUAGE?.${lan}||{})?.${key.split('.')[0]}||{}).hasOwnProperty('${key.split('.')[1]}')`);
        if (!exist) {
            MESSAGE.register(lan, key.split('.')[0], key.split('.')[1]);
        }
        return exist;
    },
    existOther: function (key, lan) {
        if (!eval(`(LANGUAGE?.${lan}||{}).hasOwnProperty('${key.split('.')[0]}')`))
            return false;
        return eval(`((LANGUAGE?.${lan}||{})?.${key.split('.')[0]}||{}).hasOwnProperty('${key.split('.')[1]}')`);
    },
    current: function (code) {
        return SHOWLANGS.filter(function (lang) {
            return lang.code === (STORAGE.get('LANGUAGE') || CONFIG.language);
        })[0];
    },
    select: function (code) {
        return SHOWLANGS.filter(function (lang) {
            return lang.code === code;
        })[0];
    },
    change: function (lang) {
        SWEETALERT.confirm({
            type: ENUM.modal.type.warning,
            title: "Language",
            message: MESSAGE.ieval('alerts.ChangeLanguage', {lang: lang}),
            confirm: function () {
                STORAGE.add('LANGUAGE', lang.code);
                location.reload();
            }
        });
    },
    run: function () {
        $('[dragonlanguage]').each(function () {
            $me = $(this);
            if (!DSON.oseaX($me.attr('title')))
                if ($me.attr('title').indexOf('MESSAGE.') !== -1)
                    $me.attr('title', eval($me.attr('title')));
            if (!DSON.oseaX($me.attr('placeholder')))
                if ($me.attr('placeholder').indexOf('MESSAGE.') !== -1)
                    $me.attr('placeholder', eval($me.attr('placeholder')));

            if (!DSON.oseaX($me.attr('data-original-title')))
                if ($me.attr('data-original-title').indexOf('MESSAGE.') !== -1)
                    $me.attr('data-original-title', eval($me.attr('data-original-title')));
            if (!DSON.oseaX($me.attr('value')))
                if ($me.attr('value').indexOf('MESSAGE.') !== -1)
                    $me.attr('value', eval($me.attr('value')));
            $me.find('language').each(function () {
                if ($(this).html().indexOf('MESSAGE.') !== -1) {
                    $(this).html(eval($(this).html()));
                }
            });
            $me.removeAttr('dragonlanguage');
        });

        $('[dragoncontrol]').each(function () {
            $me = $(this);


            $meId = $me.attr('id');
            //new ANIMATION().loadingPure($("#" + $meId).parent(), " ", ``, '30');
            $control = $me.attr('dragoncontrol');
            $name = $me.attr('name');
            $scope = $me.attr('scope');
            $cache = $me.attr('cache') === "false" ? false : true;
            $properties = {};
            if ($me.html().trim() !== "") {
                $properties = DSON.EO($me.html());
            }
            $append = false;
            if ($me.attr('append')) {
                $append = $me.attr('append');
            }
            $cols = 6;
            if ($me.attr('cols')) {
                $cols = $me.attr('cols');
            }
            $label = capitalize($name);
            if ($me.attr('label')) {
                $label = $me.attr('label');
            }
            if (($name && $scope)) {
                eval(`${$scope}.control.${$control}("#${$meId}", "${$name}", $properties,$append,$cols,$label,$cache)`);
            }
            $me.removeAttr('dragoncontrol');
        });
        MENU.hideNavBar();
    },
    ia: {
        llaves: [
            "050a959c8amshc63e1077497d200p1f174ajsnaac283750ae4",
            "28ccc2c1c2mshe2fb37e2a19557fp10e3fbjsn296d6173f5dc",
            "1983932697mshf3ace7d3cdc388ep10e0a0jsn139a082b3ed4",
            "6d59663e89msh5a36a734d05c09ep1ef4dbjsn7411085ceced",
            "dcf99cb3e7msh08cad86b1e99ec9p1aa666jsn8757fd3bc7e2",
            "ed45948cd7msh99d59836b48e36fp1e029ajsnd8fe501e9c4f",
            "1612f8a02dmshfdd217d1536edc7p1d5211jsn4719ba200211",
            "a685681a9dmshf39fb816c87c933p137a3cjsn0d4d6ee16f81",
            "0117bd1c33msh5b8c728b8fa6c33p107da4jsn93eba1d19e86",
            "2e2694555fmsh92f7e40347ff631p1ff7cbjsnb23b7d13cce8",
            "4245a2c86dmshaca018dd3c137a2p1f0d96jsn59a0ead6a510"
        ],
    }
};
