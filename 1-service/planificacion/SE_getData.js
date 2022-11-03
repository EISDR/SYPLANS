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
        sp_complete_products: async function (request) {
            var module = params.CONFIG.mysqlactive ? params.modules.mysql : params.modules.postgre;
            var preter = params.CONFIG.mysqlactive ? 'call' : 'select';
            return await module.executeNonQuery(`${preter} sp_complete_products(${request.id_producto},${request.id_actividad},${request.id_poa})`, params)
                .then(function (data) {
                    return data;
                }).catch(err => {
                    return err;
                });
        },

        sp_actualizacion: async function (request) {
            var module = params.modules.mysql;
            return await module.executeNonQuery(`update indicador_poa_periodo set valor_alcanzado =\t

(select sum((REPLACE(REPLACE(ifnull(periodo.valor_alcanzado,0),',',''),'%','') * 1 )) value
from 
indicador_actividad_periodo periodo  
INNER JOIN indicador_actividad poa on poa.id=periodo.indicador_actividad where poa.indicador_poa =indicador_poa_periodo.indicador_poa
and periodo.periodo=indicador_poa_periodo.periodo
)

where indicador_poa_periodo.indicador_poa in (select indicador_poa from indicador_actividad);



update indicador_pei_ano set valor_alcanzado =\t
(select sum((REPLACE(REPLACE(ifnull(periodo.valor_alcanzado,0),',',''),'%','') * 1 )) value
from 
indicador_poa_periodo periodo  
INNER JOIN indicador_poa poa on poa.id=periodo.indicador_poa 
inner join productos_poa pro on pro.id=poa.producto
inner join poa p on p.id=pro.poa
where 
\tpoa.indicador_pei =indicador_pei_ano.indicador_pei 
\tand
\tp.periodo_poa=indicador_pei_ano.ano

)
where indicador_pei_ano.indicador_pei in (select indicador_pei from indicador_poa);


`, params)
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
