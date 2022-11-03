var params = {};
exports.run = async function (_params) {
    params = _params;


};
exports.api = {
    gets: {},
    posts: {
        delete_company: async function (request) {
            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            return await module.executeNonQuery(`${preter} DeleteCompany(${request.company}, ${request.option})`, params)
                .then(function (data) {
                    return data;
                }).catch(err => {
                    return err;
                });
        },
        rollback: async function (request) {
            var module = params.modules.mysql;
            return await module.executeNonQuery(`insert into aaa_ejecutadora VALUES()`, params)
                .then(function (data) {
                    return data;
                }).catch(err => {
                    return err;
                });
        }
    },
    puts: {},
    deletes: {},
    options: {}
};
