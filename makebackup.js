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

    function desofuscar(file) {
        if (file.indexOf("#bqqObnf#") !== -1) {
            var result = "";
            for (var chart of file) {
                result += String.fromCharCode(chart.charCodeAt(0) - 1);
            }
            return result;
        } else
            return file;
    }

    var CONFIG = {};
    configs = getFiles("./" + folders.configBase + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var file = eval("(" + fs.readFileSync(folders.configBase + "/" + config) + ")");
        mergeObject(file, CONFIG);
    });
    configs = getFiles("./" + folders.config + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var file = eval("(" + fs.readFileSync(folders.config + "/" + config) + ")");
        mergeObject(file, CONFIG);
    });
    var configMode = CONFIG.mode === "developer" ? folders.config : `${folders.eviroments}/${CONFIG.mode}`;
    for (var i in CONFIG.modules) {
        var module = CONFIG.modules[i];
        localModules.push(module.module);
        localModulesVars.push(module.var);
        eval("var " + module.var + " = require('" + module.module + "');");
    }
    CONFIG = {};
    configs = getFiles("./" + folders.configBase + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var fileContent = fs.readFileSync(folders.configBase + "/" + config) + "";
        var file = eval("(" + desofuscar(fileContent) + ")");
        mergeObject(file, CONFIG);
    });
    configs = getFiles("./" + configMode + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var fileContent = fs.readFileSync(configMode + "/" + config) + "";
        var file = eval("(" + desofuscar(fileContent) + ")");
        mergeObject(file, CONFIG);
    });
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
    allparams += "      postgre:postgre,";
    allparams += "      lacone:lacone,";
    allparams += "      CONFIG:CONFIG,";
    allparams += "      mail:mail,";
    allparams += "      folders:folders,";
    allparams += "      app:app";
    allparams += "}";
    lacone = undefined;
    controllersjs = getFiles("./" + folders.controllersBase + "/");
    for (var ctr in controllersjs)
        controllersjs[ctr] = controllersjs[ctr];
    controllersjsCustom = getFiles("./" + folders.controllers + "/");
    for (var ctr in controllersjsCustom)
        controllersjsCustom[ctr] = controllersjsCustom[ctr];
    for (var ctr of controllersjsCustom)
        controllersjs.push(ctr);
    crudjs = getFiles("./" + folders.crudBase + "/");
    for (var ctr in crudjs)
        crudjs[ctr] = crudjs[ctr];
    crudCustom = getFiles("./" + folders.crud + "/");
    for (var ctr in crudCustom)
        crudCustom[ctr] = crudCustom[ctr];
    for (var ctr of crudCustom)
        crudjs.push(ctr);
    var PARAMS = eval("(" + allparams + ")");
    // var ladataDB = modules.postgre;
    console.clear();
    console.log(PARAMS);
    modules.postgre.lacone = new PARAMS.postgre.Pool(PARAMS.CONFIG.postgre);
    var ladataDB = modules.postgre;
    console.clear();
    setTimeout(async () => {
        console.clear();
        while (true) {
            await buclex(ladataDB, PARAMS, CONFIG);
            await delay(10000);
        }
    }, 5000);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
antiQuery = (str) => {
    return (str || "").split(`'`).join(`''`);
}
buclex = (ladataDB, PARAMS, CONFIG) => new Promise(async (resolve, reject) => {
        console.log('Check: ' + new Date());
        const LoDash = require('lodash');
        let schedule = await ladataDB.data(`select * from backup_config limit 1`, PARAMS);
        schedule = schedule.data[0];
        let isDay = false;
        let isHour = false;
        if (schedule.frecuencia === "Diario") {
            isDay = true;
            let now = new Date();
            console.log(`2001-01-01 ${schedule.hora}`, `2001-01-01 ${now.getHours()}:${now.getMinutes()}`);
            let dbDate = new Date(`2001-01-01 ${schedule.hora}`);
            let thisDate = new Date(`2001-01-01 ${now.getHours()}:${now.getMinutes()}`);
            if (dbDate <= thisDate)
                isHour = true;
        }
        let rows = await ladataDB.data(`select * from backup_ejecucion where ruta_archivo is null`, PARAMS);
        let total = rows.data.length;
        let conn = PARAMS.CONFIG.postgre;
        let source = PARAMS.CONFIG.postgrebackup;
        if (total > 0) {
            for (const ROW of rows.data) {
                if ((isDay && isHour) || ROW.inmediato == 1) {
                    let prefix = "";
                    if (ROW.inmediato == 1)
                        prefix = "-inmediato";
                    let ruta = "Sin ejecutar";
                    let lafecha = `${ROW.fecha.getFullYear()}-${ROW.fecha.getMonth()}-${ROW.fecha.getDate()}`;
                    console.log(`ejecutando backup(${ROW.id}) ${lafecha}`);
                    try {
                        ruta = `backups/${ROW.id}-${lafecha}-${PARAMS.CONFIG.appName}(${source.database})${prefix}.sql`;
                        var exec = require('child_process').execSync;
                        child = exec(`SET "PGPASSWORD=${conn.password}" && "${source.binpath}\\pg_dump" -h ${conn.host} -p ${conn.port} -U ${conn.user}  -d ${source.database} > ${ruta}`);
                    } catch (err) {
                        console.log(err.message.error);
                        ruta = antiQuery(err.message);
                    }
                    await ladataDB.data(`update backup_ejecucion set ruta_archivo='${ruta}' where id=${ROW.id}`, PARAMS);
                }
            }
        } else {
            console.log(`Sin backup en cola`);
        }

        resolve(true);
    }
);
execute();
//node generate.js mysql {nombre de la tabla}
