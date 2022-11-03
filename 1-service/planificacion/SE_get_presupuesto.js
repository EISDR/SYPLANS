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
        get_department: async function (request) {
            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            return await module.executeNonQuery(`${preter} get_dep(${request.id_department},${request.id_poa})`, params)
                .then(function (data) {
                    return data;
                }).catch(err => {
                    return err;
                });
        },
    },
    puts: {},
    deletes: {},
    options: {}
};