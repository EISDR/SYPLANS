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
        senditems: async function (request) {

            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            console.log('declarando el storage');
            var records = await params.storage.getItem("dragon_audit") || [];
            console.log('sacando el poa viejo');
            var copyrecords = JSON.parse(JSON.stringify(records));
            var newrecords = copyrecords.filter(d => {
                if (d.poa) {
                    return d.poa == request.poa_id
                }
            });
            console.log('modificandolo para el poa nuevo: ' + newrecords.length);
            console.log('grabando la auditoria');
            for (var reco of newrecords) {
                if (reco) {
                    console.log(reco);
                    reco.poa = request.poa_proximo;
                    records.push(reco);
                }
            }
            await params.storage.setItem("dragon_audit", records);
            console.log('ejecutando el procedure');

            return await module.executeNonQuery(`${preter} sp_transfer_poa(${request.poa_id},${request.poa_proximo})`, params)
                .then(function (data) {

                    return data;
                }).catch(err => {
                    return err;

                });
        },
        deleteindicadorpei: async function (request) {
            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            return await module.executeNonQuery(`${preter} sp_indicador_pei_delete_relation(${request.indicador_pei_id})`, params)
                .then(function (data) {
                    return data;
                }).catch(err => {
                    return err;
                });
        },
        deleteindicadorpoa: async function (request) {
            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            return await module.executeNonQuery(`${preter} sp_indicador_poa_delete_relation(${request.indicador_poa_id})`, params)
                .then(function (data) {
                    return data;
                }).catch(err => {
                    return err;
                });
        },
        updateMasa: async function (request) {
            var module = params.modules.mysql;
            return await module.executeNonQuery(`UPDATE pacc_departamental_detail SET costo_total = (IFNULL( periodo_1, 0 ) + IFNULL( periodo_2, 0 ) + IFNULL( periodo_3, 0 ) + IFNULL( periodo_4, 0 ) ) * precio_unitario;`, params)
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
