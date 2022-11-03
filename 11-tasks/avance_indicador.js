var _params = null;
exports.init = function (params) {
    _params = params;
    get_data = async function (){
        var connection = params.modules.mysql;
        var list_planificacion = [];
        var list_departamento = [];
        var list_correo_planificacion = [];
        var list_correo_departamento = [];
        var list_indicadores_planificacion = [];
        var list_indicadores_departamento = [];
        var list_poa_planificacion = [];
        var list_poa_departamento = [];
        var list_poa_correo_planificacion = [];
        var list_poa_correo_departamento = [];
        var list_poa_indicadores_planificacion = [];
        var list_poa_indicadores_departamento = [];
        var list_actividad_planificacion = [];
        var list_actividad_departamento = [];
        var list_actividad_correo_planificacion = [];
        var list_actividad_correo_departamento = [];
        var list_actividad_indicadores_planificacion = [];
        var list_actividad_indicadores_departamento = [];
        var current_company = "";
        var noti_info = await connection.executeNonQuery(`SELECT * FROM vw_notificaciones_ai`, _params)
            .then(function (data) {
                return data;
            }).catch(err => {
                return err;
            });
        var noti_info_poa = await connection.executeNonQuery(`SELECT * FROM vw_notificaciones_aip`, _params)
            .then(function (data) {
                return data;
            }).catch(err => {
                return err;
            });
        var noti_info_actividad = await connection.executeNonQuery(`SELECT * FROM vw_notificaciones_aia`, _params)
            .then(function (data) {
                return data;
            }).catch(err => {
                return err;
            });
        for (var i of noti_info.recordset) {
            if (i.rol_id == 4 || i.rol_id == 5){
                list_planificacion.push(i.usuario);
                list_correo_planificacion.push(i.correo);
                list_indicadores_planificacion.push(i.indicador);
            }
            else if (i.rol_id == 6 || i.rol_id == 7) {
                list_departamento.push(i.usuario);
                list_correo_departamento.push(i.correo);
                list_indicadores_departamento.push(i.indicador);
            }
        }
        for (var i of noti_info_poa.recordset) {
            if (i.rol_id == 4 || i.rol_id == 5){
                list_poa_planificacion.push(i.usuario);
                list_poa_correo_planificacion.push(i.correo);
                list_poa_indicadores_planificacion.push(i.indicador);
            }
            else if (i.rol_id == 6 || i.rol_id == 7) {
                list_poa_departamento.push(i.usuario);
                list_poa_correo_departamento.push(i.correo)
                list_poa_indicadores_departamento.push(i.indicador);
            }
        }
        for (var i of noti_info_actividad.recordset) {
            if (i.rol_id == 4 || i.rol_id == 5){
                list_actividad_planificacion.push(i.usuario);
                list_actividad_correo_planificacion.push(i.correo);
                list_actividad_indicadores_planificacion.push(i.indicador);
            }
            else if (i.rol_id == 6 || i.rol_id == 7) {
                list_actividad_departamento.push(i.usuario);
                list_actividad_correo_departamento.push(i.correo)
                list_actividad_indicadores_departamento.push(i.indicador);
            }
        }
        // list_poa_correo_planificacion.push('volivero@eisdr.com');
        // list_poa_correo_departamento.push('volivero@eisdr.com');

        if (list_planificacion.length > 0 ){
            params.servicesFunctions.base_onesignal.posts.send(
                {
                    headings: { en: 'Proceder con la evaluación de la captura de los avances de los Indicadores PEI'},
                    contents: { en: 'Favor revisar su correo electrónico para más información' },
                    users: list_planificacion,
                });
        } if (list_correo_planificacion.length > 0){
            var unique_indicadores = [...new Set(list_indicadores_planificacion)];
            mail({
                to: list_correo_planificacion,
                subject: "Proceder con la evaluación de la captura de los avances de los Indicadores PEI",
                name: "noReply",
                template: 'email/avance_indicador_planificacion',
                fields: {
                    list: unique_indicadores
                }
            });
        }
        if (list_poa_planificacion.length > 0){
            params.servicesFunctions.base_onesignal.posts.send(
                {
                    headings: { en: 'Proceder con la evaluación de la captura de los avances de los Indicadores de Producto'},
                    contents: { en: 'Favor revisar su correo electrónico para más información' },
                    users: list_planificacion,
                });
        } if (list_poa_correo_planificacion.length > 0){
            var unique_poa_indicadores = [...new Set(list_poa_indicadores_planificacion)];
            mail({
                to: list_poa_correo_planificacion,
                subject: "Proceder con la evaluación de la captura de los avances de los Indicadores de Producto",
                name: "noReply",
                template: 'email/avance_indicador_planificacion',
                fields: {
                    list: unique_poa_indicadores
                }
            });
        }
        if (list_actividad_planificacion.length > 0){
            params.servicesFunctions.base_onesignal.posts.send(
                {
                    headings: { en: 'Proceder con la evaluación de la captura de los avances de los Indicadores de Actividad'},
                    contents: { en: 'Favor revisar su correo electrónico para más información' },
                    users: list_planificacion,
                });
        } if (list_actividad_correo_planificacion.length > 0){
            var unique_actividad_indicadores = [...new Set(list_actividad_indicadores_planificacion)];
            mail({
                to: list_actividad_correo_planificacion,
                subject: "Proceder con la evaluación de la captura de los avances de los Indicadores de Actividad",
                name: "noReply",
                template: 'email/plane',
                fields: {
                    list: unique_actividad_indicadores
                }
            });
        }

        if (list_departamento.length > 0 ){
            params.servicesFunctions.base_onesignal.posts.send(
                {
                    headings: { en: 'Proceder con la captura de los avances de sus Indicadores PEI'},
                    contents: { en: 'Favor revisar su correo electrónico para más información' },
                    users: list_planificacion,
                });
        } if (list_correo_departamento.length > 0){
            var unique_indicadores = [...new Set(list_indicadores_planificacion)];
            mail({
                to: list_correo_planificacion,
                subject: "Proceder con la captura de los avances de sus Indicadores PEI",
                name: "noReply",
                template: 'email/avance_indicador_departamento',
                fields: {
                    list: unique_indicadores
                }
            });
        }
        if (list_poa_departamento.length > 0){
            params.servicesFunctions.base_onesignal.posts.send(
                {
                    headings: { en: 'Proceder con la captura de los avances de sus Indicadores de Producto'},
                    contents: { en: 'Favor revisar su correo electrónico para más información' },
                    users: list_planificacion,
                });
        } if (list_poa_correo_departamento.length > 0){
            var unique_poa_indicadores = [...new Set(list_poa_indicadores_planificacion)];
            mail({
                to: list_poa_correo_planificacion,
                subject: "Proceder con la captura de los avances de sus Indicadores de Producto",
                name: "noReply",
                template: 'email/avance_indicador_departamento',
                fields: {
                    list: unique_poa_indicadores
                }
            });
        }
        if (list_actividad_departamento.length > 0){
            params.servicesFunctions.base_onesignal.posts.send(
                {
                    headings: { en: 'Proceder con la captura de los avances de sus Indicadores de Actividad'},
                    contents: { en: 'Favor revisar su correo electrónico para más información' },
                    users: list_planificacion,
                });
        } if (list_actividad_correo_departamento.length > 0){
            var unique_actividad_indicadores = [...new Set(list_actividad_indicadores_planificacion)];
            mail({
                to: list_actividad_correo_planificacion,
                subject: "Proceder con la captura de los avances de sus Indicadores de Actividad",
                name: "noReply",
                template: 'email/avance_indicador_departamento',
                fields: {
                    list: unique_actividad_indicadores
                }
            });
        }
         console.log(new SESSION().current());
    }
    function mail(req) {
        res = {};
        var models = params.models
            .concat(params.modelsql)
            .concat(params.modelmysql)
            .concat(params.modelpostgre)
            .concat(params.modeloracle)
            .concat(params.modelstorage);
        try {
            var transporter = params.mail.createTransport(params.CONFIG.smtp);
            var options = params.CONFIG.smptOptions;
            var from = params.CONFIG.support.email || params.CONFIG.smptOptions.sender;
            var name = params.CONFIG.developerBy.name || params.CONFIG.smptOptions.name;
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
                        console.log('si',res);
                        // res = {error: error, success: false});
                    }
                    res = {success: true};
                });
            }
            if (req.template) {
                params.app.render("../" + params.folders.viewsDragon + "/templates/" + req.template,
                    {
                        session: params.session,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        models: models,
                        FOLDERS: params.folders,
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
                        });
                    }
                );
            }
        } catch (e) {
            console.log('error al intentar enviar los correo el posible error pudo ser que no existen un correo valido',e);
        }
    }
    // params.schedule.scheduleJob({minute: 43}, get_data);
    // for (var i = 0; i <= 60; i += 1) {
    //     params.schedule.scheduleJob({minute: i}, get_data);
    // }
}