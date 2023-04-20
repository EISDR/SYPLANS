async function execute() {
    folders = {
        models: "2-procedures",
        service: "1-service",
        controllers: "3-controllers",
        controllersBase: "7-plugins/application/controllers",
        crudBase: "7-plugins/application/cruds",
        crud: "4-crud",
        views: "5-views",
        viewsDragon: "7-plugins",
        endpoints: "9-endpoints",
        fields: "7-plugins/templates/form",
        silents: "7-plugins/templates/system/view",
        master: "7-plugins/master",
        language: "6-language",
        scripts: "scripts",
        modules: "modules",
        config: "0-config",
        eviroments: "8-enviroments",
        configBase: "7-plugins/application/config",
        styles: "styles",
        server: "server",
        files: "files",
        themesTemplate: "7-plugins/templates/system/color.ejs",
        themes: "files/configuration/themes",
    };
    var fs = fs || require("fs");
    var colors = colors || require("colors");
    const readline = require('readline');

    var modules = {}, localModules = [], localModulesVars = [], modulesList = [];
    colors.setTheme({
        error: ["red", "bgYellow"],
        success: ["green", "bgWhite"],
        info: ["cyan", "bgBlue"],
        warning: ["yellow", "bgRed"]
    });
    /*FUNCTIONS*/
    var getFiles = function (dir, filelist, prefix) {
        var fs = fs || require("fs"),
            files = fs.readdirSync(dir);
        filelist = filelist || [];
        prefix = prefix || "";
        files.forEach(function (file) {
            if (fs.statSync(dir + "/" + file).isDirectory()) {
                filelist = getFiles(dir + "/" + file, filelist, prefix + file + "/");
            } else {
                filelist.push(prefix + file);
            }
        });
        return filelist;
    };
    var mergeObject = function (from, to) {
        for (var i in from) {
            if (to.hasOwnProperty(i)) {
                if (typeof to[i] === 'object') {
                    mergeObject(from[i], to[i]);
                } else {
                    to[i] = from[i];
                }
            } else {
                to[i] = from[i];
            }
        }
    };

    /*GOLBAL VARS*/
    var CONFIG = {};
    //GET CONFIG
    configs = getFiles("./" + folders.configBase + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var file = eval("(" + fs.readFileSync(folders.configBase + "/" + config) + ")");
        mergeObject(file, CONFIG);
    });

    //CONFIG ORIGINAL
    configs = getFiles("./" + folders.config + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var file = eval("(" + fs.readFileSync(folders.config + "/" + config) + ")");
        mergeObject(file, CONFIG);
    });

    //GET MODULES NODEJS
    for (var i in CONFIG.modules) {
        var module = CONFIG.modules[i];
        localModules.push(module.module);
        localModulesVars.push(module.var);
        eval("var " + module.var + " = require('" + module.module + "');");
    }
    var filesmodules = fs.readdirSync("./" + folders.modules + "/");
    for (var i in filesmodules) {
        var file = filesmodules[i];
        modulesList.push(file.replace(".js", "").replace("BASE_", ""));
        eval("modules." + file.replace(".js", "").replace("BASE_", "") + " = require('./" + folders.modules + "/" + file + "');");
    }

    var app = express();
    app.set("view engine", "ejs");
    var allparams = "{";
    allparams += "      app: app,";
    allparams += "      dir: __dirname,";
    for (var i in modulesList) {
        var name = modulesList[i];
        allparams += "      " + name + ":modules." + name + ",";
    }
    for (var i in localModulesVars) {
        var name = localModulesVars[i];
        allparams += "      " + name + ":" + name + ",";
    }
    allparams += "      scope: '@model@',";
    allparams += "      modules:modules,";
    allparams += "      storage:storage,";
    allparams += "      http:http,";
    allparams += "      fetch :fetch,";
    allparams += "      fs:fs,";
    allparams += "      jwt:jwt,";
    allparams += "      rimraf:rimraf,";
    allparams += "      controllersjs:controllersjs,";
    allparams += "      crudjs:crudjs,";
    allparams += "      mssql:mssql,";
    allparams += "      mysql:mysql,";
    allparams += "      lacone:lacone,";
    allparams += "      CONFIG:CONFIG,";
    allparams += "      mail:mail,";
    allparams += "      folders:folders,";
    allparams += "      app:app";
    allparams += "}";
    lacone = undefined;
    //BASE CONTROLLERS
    controllersjs = getFiles("./" + folders.controllersBase + "/");
    for (var ctr in controllersjs)
        controllersjs[ctr] = controllersjs[ctr];
    //CUSTOM CONTROLLERS
    controllersjsCustom = getFiles("./" + folders.controllers + "/");
    for (var ctr in controllersjsCustom)
        controllersjsCustom[ctr] = controllersjsCustom[ctr];
    //MERGE CONTROLLERS
    for (var ctr of controllersjsCustom)
        controllersjs.push(ctr);

    //BASE CRUD'S
    crudjs = getFiles("./" + folders.crudBase + "/");
    for (var ctr in crudjs)
        crudjs[ctr] = crudjs[ctr];
    //CUSTOM CURD's
    crudCustom = getFiles("./" + folders.crud + "/");
    for (var ctr in crudCustom)
        crudCustom[ctr] = crudCustom[ctr];
    //MERGE CUSTOM
    for (var ctr of crudCustom)
        crudjs.push(ctr);
    var PARAMS = eval("(" + allparams + ")");


    //BEGIN//


    var ladataDB = null;
    if (PARAMS.CONFIG.mysqlactive) {
        mysql = MysqlPoolBooster(mysql);
        modules.mysql.lacone = PARAMS.mysql.createPool(PARAMS.CONFIG.mysql);
        ladataDB = modules.mysql;
    } else {
        ladataDB = modules.postgre;
    }
    mailFunc = (req) => {
        res = {};
        try {
            var transporter = PARAMS.mail.createTransport(PARAMS.CONFIG.smtp);
            var options = PARAMS.CONFIG.smptOptions;
            var from = PARAMS.CONFIG.support.email || PARAMS.CONFIG.smptOptions.sender;
            var name = PARAMS.CONFIG.developerBy.name || PARAMS.CONFIG.smptOptions.name;
            if (!req.to)
                res = {error: "mailneedreceivers", success: false};
            if (!req.subject)
                res = {error: "mailneedsubject", success: false};
            if (!req.html && !req.text && !req.template)
                res = {error: "mailneedbody", success: false};
            var mailOptions = {
                from: `"${name}" ${from}`,
                to: req.to,
                subject: req.subject
            };
            if (req.cc) {
                mailOptions.cc = req.cc;
            }
            if (req.bcc) {
                mailOptions.bcc = req.bcc;
            }
            if (req.text) {
                mailOptions.text = req.text;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res = {error: error, success: false};
                    }
                    res = {success: true};
                });
            }
            if (req.html) {
                mailOptions.html = req.html;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('si', res);
                        // res = {error: error, success: false});
                    }
                    res = {success: true};
                });
            }
            if (req.template) {
                PARAMS.app.render("../" + PARAMS.folders.viewsDragon + "/templates/" + req.template,
                    {
                        session: PARAMS.session,
                        CONFIG: PARAMS.CONFIG,
                        LANGUAGE: PARAMS.LANGUAGE,
                        SHOWLANGS: PARAMS.SHOWLANGS,
                        COLOR: PARAMS.CONFIG.ui.colors,
                        FOLDERS: PARAMS.folders,
                        models: [],
                        DATA: req.fields,
                    }, function (err, html) {
                        if (err) {
                            res = {error: err, html: html};
                            return;
                        }
                        mailOptions.html = html;
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                res = {error: error, success: false};
                            }
                            res = {success: true};
                            console.log(res);

                        });
                    }
                );
            }
        } catch (e) {
            console.log('error al intentar enviar los correo el posible error pudo ser que no existen un correo valido', e);
        }
    }
    dateToString = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }
    dateTimeToString = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm');
    }

    todate = (str) => {
        return moment(str).toDate();
    }
    totime = (str) => {
        return moment("2000-01-01 " + str).toDate();
    }
    console.clear();
    while (true) {
        await buclex(ladataDB, PARAMS, moment);
        await delay(60000);
    }
}


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
buclex = (ladataDB, PARAMS, moment) => new Promise(async (resolve, reject) => {
    let notificaciones = await ladataDB.data(`select * from vw_modulo_notificacion`, PARAMS);
    let listaEstatus = await ladataDB.data(`select * from auditoria_programa_plan_estatus where tiempo_estimado is not null and tiempo_estimado!=''`, PARAMS);
    listaEstatus = listaEstatus.data;
    notificaciones = notificaciones.data;


    // if (true) {
    //     await ladataDB.data(`truncate table modulo_notificacion_cache`, PARAMS);
    // }
    for (const notificacion of notificaciones) {

        let registros = await ladataDB.data(`select * from ${notificacion.view}`, PARAMS);
        let usersByRole = await ladataDB.data(`select * from usuario where profile in(${(notificacion.roles || '0').replaceAll(';', ',')})`, PARAMS);
        usersByRole = usersByRole.data;
        let usersByUser = await ladataDB.data(`select * from usuario where id in(${(notificacion.usuarios || '0').replaceAll(';', ',')})`, PARAMS);
        usersByUser = usersByUser.data;
        registros = registros.data;

        let today = new Date();
        let todayNoTime = todate(dateToString(today));
        let todayFormated = dateToString(today);
        let rawCampos = notificacion.campos.split(', ').map(d => d.replace('@', ''));
        let ejsTemplate = "email/module_notification_plane";
        if (notificacion.masterpage)
            ejsTemplate = "email/module_notification_syplans";

        let fixed = {};
        fixed.roles = usersByRole.map(d => d.correo);
        fixed.users = usersByUser.map(d => d.correo);
        fixed.correos = (notificacion.direct_emails || '').split(',');


        for (const registro of registros) {
            let mailParams = false;
            let code = registro[notificacion.field_code];
            if (notificacion.disparo_type === 'code') {
                let tasks = await ladataDB.data(`select * from modulo_notificacion_task where sended=0 or sended is null and date<='${todayFormated}'`, PARAMS);
                tasks = tasks.data;
                if (tasks.length) {
                    for (const task of tasks) {
                        if (notificacion.field_action === task.accion) {
                            if (code == task.record_id) {
                                mailParams = await ejecutarregistro(notificacion, registro, usersByRole, usersByUser, moment);
                                if (mailParams !== false) {
                                    console.log(`una tarea de ${task.accion}`);
                                    await ladataDB.data(`update modulo_notificacion_task set sended=1 where id=${task.id}`, PARAMS);
                                }
                            }
                        }
                    }
                }
            } else {
                let cached = await ladataDB.data(`select * from modulo_notificacion_cache where module_notification='${notificacion.id}' and code='${code}' and (permanent=0 OR date>='${todayFormated}')`, PARAMS);
                cached = cached.data.length;
                if (cached)
                    continue;
                mailParams = await ejecutarregistro(notificacion, registro, usersByRole, usersByUser, moment);
            }
            if (mailParams !== false) {
                await ladataDB.data(`insert into modulo_notificacion_cache(\`code\`,\`module_notification\`,\`date\`,\`permanent\`,\`to\`,\`cc\`,\`subject\`,\`email\`,\`push\`) VALUES('${code}',${notificacion.id},'${todayFormated}',${notificacion.send_one ? 0 : 1},'${mailParams.to.join(", ")}','${mailParams.cc.join(", ")}','${mailParams.subject}','${mailParams.fields.message}','${''}')`, PARAMS);
            }
        }
    }
    resolve(true);
});

ejecutarregistro = async (notificacion, registro, usersByRole, usersByUser, moment) => {
    let today = new Date();
    let todayNoTime = todate(dateToString(today));
    let todayFormated = dateToString(today);
    let rawCampos = notificacion.campos.split(', ').map(d => d.replace('@', ''));
    let ejsTemplate = "email/module_notification_plane";
    if (notificacion.masterpage)
        ejsTemplate = "email/module_notification_syplans";

    let fixed = {};
    fixed.roles = usersByRole.map(d => d.correo);
    fixed.users = usersByUser.map(d => d.correo);
    fixed.correos = (notificacion.direct_emails || '').split(',');

    try {
        let loscode = JSON.parse(notificacion.code);
        console.log(loscode);
    } catch (e) {

    }

    let diff = undefined;
    let elcondition = undefined;
    if (notificacion.disparo_type !== 'code') {
        if (notificacion.disparo_type === 'fecha') {
            let fecha = todate(registro[notificacion.field_date]);
            diff = moment(todayNoTime).diff(fecha, 'minutes');
            if (notificacion.date_strict) {
                diff = moment(today).diff(fecha, 'minutes');
                console.log(`${dateTimeToString(today)} && ${dateTimeToString(fecha)} DIFF ${diff}`);
            } else
                console.log(`${dateToString(todayNoTime)} && ${dateToString(fecha)} DIFF ${diff}`);
            elcondition = notificacion.field_fechacondition;
        }
        if (notificacion.disparo_type === 'vigencia') {
            let tiempo = totime(registro[notificacion.field_tiempo]);
            let vigencia = totime(registro[notificacion.field_vigencia]);
            diff = moment(tiempo).diff(vigencia, 'minutes');
            elcondition = notificacion.field_tiempocondition;
            console.log(`${dateTimeToString(tiempo)} && ${dateTimeToString(vigencia)} DIFF ${diff}`);
        }
        if (notificacion.disparo_type === 'estimado') {
            let tiempo = totime(registro[notificacion.field_estimado]);
            let vigencia = totime(listaEstatus.filter(d => d.id == notificacion.field_estatus)[0].tiempo_estimado);
            diff = moment(tiempo).diff(vigencia, 'minutes');
            elcondition = notificacion.field_tiempocondition;
            console.log(`${dateTimeToString(tiempo)} && ${dateTimeToString(vigencia)} DIFF ${diff}`);
        }
        switch (elcondition) {
            case "igual": {
                if (diff !== 0) {
                    console.log(elcondition);
                    return false;
                }
                break;
            }
            case "mayor": {
                if (diff >= 0) {
                    console.log(elcondition);
                    return false;
                }
                break;
            }
            case "mayorigual": {
                if (diff > 0) {
                    console.log(elcondition);
                    return false;
                }
                break;
            }
            case "menor": {
                if (diff <= 0) {
                    console.log(elcondition);
                    return false;
                }
                break;
            }
            case "menorigual": {
                if (diff < 0) {
                    console.log(elcondition);
                    return false;
                }
                break;
            }
            default: {
                if (diff !== 0) {
                    console.log(elcondition);
                    return false;
                }
                break;
            }
        }
    }
    let DR = (notificacion.destiny_roles || 'to').toLowerCase();
    let DU = (notificacion.destiny_usuario || 'to').toLowerCase();
    let DF = (notificacion.destiny_fix || 'to').toLowerCase();
    let mailParams = {to: [], cc: [], cco: []};
    if (fixed.roles.length)
        mailParams[DR] = mailParams[DR].concat(fixed.roles);
    if (fixed.users.length)
        mailParams[DU] = mailParams[DU].concat(fixed.users);
    if (fixed.correos.length)
        mailParams[DF] = mailParams[DF].concat(fixed.correos);
    let putters = {
        field_email: "to",
        field_email_cc: "cc",
        field_email_cco: "cco"
    }
    for (const tc of Object.keys(putters)) {
        if (registro[notificacion[tc]]) {
            let toarray = registro[notificacion[tc]].split(',');
            toarray = toarray.filter(d => d.indexOf("@") !== -1);
            if (toarray.length)
                mailParams[putters[tc]] = mailParams[putters[tc]].concat(toarray);
        }
    }
    ["to", "cc", "cco"].forEach(typec => {
        mailParams[typec] = [...new Set(mailParams[typec])];
    });
    let subject = notificacion.subject;
    let template = notificacion.template;
    let templatePush = notificacion.template_push;
    rawCampos.forEach(campo => {
        template = template.replaceAll(`@${campo}`, registro[campo] || '');
        templatePush = templatePush.replaceAll(`@${campo}`, registro[campo] || '');
        subject = subject.replaceAll(`@${campo}`, registro[campo] || '');
    });
    mailParams.subject = subject;
    mailParams.fields = {message: template};
    mailParams.name = "noReply";
    mailParams.template = ejsTemplate;
    console.log(mailParams);
    mailFunc(mailParams);
    return mailParams;
}
execute();
//node generate.js mysql {nombre de la tabla}
