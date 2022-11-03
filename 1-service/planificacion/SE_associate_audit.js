//Example
// method: function (request) {
//     var name = params.CONFIG.appName + " " + (request.name || "Nada");
//     return {name: name};
// }
var params = {};
exports.run = async function (_params) {
    params = _params;


};
exports.api = {
    gets: {},
    posts: {
        mepyd: async function (request) {

        },
        heredar_audit: async function (request) {

            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            console.log('ejecutando el procedure', params.CONFIG.mysqlactive, request);
            return params.CONFIG.mysqlactive ? await module.executeNonQuery(`${preter} sp_auditoria(${request.id})`, params) : await module.executeNonQuery(`${preter} * from sp_auditoria(${request.id})`, params)
                .then((data) => {
                    if (params.CONFIG.mysqlactive)
                        return data;
                    else
                        return {
                            error: data.error,
                            index: data.index,
                            query: data.query,
                            recordset: [data.recordset.rows]
                        }
                }).catch(err => {
                    return err;

                });
        },
    },
    puts: {},
    deletes: {},
    options: {}
};
