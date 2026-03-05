import prisma from "../prisma.js";
import DataHelpers from "../utils/dataUtils.js";

class Missa {    
    static async buscaMissas(id_pastoral){
        try{
            const missas = await prisma.missa.findMany({
                where: { id_pastoral: id_pastoral}
            });
            for (let missa of missas){
                missa.data = DataHelpers.getDataFormatada(missa.data_hora);
                missa.horario = DataHelpers.getHorario(missa.data_hora);
            };
            return missas;
        }
        catch (error){
            throw error;
        };
    };

    static async buscaMissasData(id_pastoral, data){
        try{
            const dataOBJ = DataHelpers.getDataISO(data);
            const missas =  await prisma.missa.findMany({
                where: { AND: [
                    { id_pastoral: id_pastoral},
                    { data_hora: { gt: dataOBJ }},
                    { data_hora: { lt: DataHelpers.somaDia(dataOBJ) }}
                ]
            }});
            for (let missa of missas) {
                missa.data = DataHelpers.getDataFormatada(missa.data_hora);
                missa.horario = DataHelpers.getHorario(missa.data_hora);
            };  
            return missas; 
        }
        catch (error) {
            throw error;
        };
    };

    static async editaMissa(dados_missa){
        try{
            const dataOBJ = DataHelpers.getDataISO(dados_missa.data, dados_missa.hora);
            const qtd_min = parseInt(dados_missa.qtd_min,10);
            const id = parseInt(dados_missa.id,10);
            return await prisma.missa.update({
                where: {
                    id: id,
                },
                data: {
                    data_hora: dataOBJ,
                    qtd_min_liderancas: qtd_min,
                    descricao: dados_missa.desc,
                    titulo: dados_missa.titulo,
                },
            })
        }
        catch (error) {
            throw error
        };
    };
    
    static async deletaMissa(id){
        id = parseInt(id,10)
        try{
            return await prisma.missa.delete({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            throw error;
        };
    };

    static async criaMissa(dados_missa){
        const dataObjeto = DataHelpers.getDataISO(dados_missa.data, dados_missa.hora)
        const qtd_min = parseInt(dados_missa.qtd_min, 10);
        try{
            return await prisma.missa.create({
                data: {
                    id_pastoral: dados_missa.id_pastoral,
                    data_hora: dataObjeto,
                    qtd_min_liderancas: qtd_min,
                    descricao: dados_missa.desc,
                    titulo: dados_missa.titulo
                }});
            }
        catch (error){
            throw error;
        };
    };

    static trata_array_missas_recorrente (dados_missa, datas_missas) {
        const array_dados_missas_recorrente = [];
        for (let data of datas_missas){
            let qtd_min = parseInt(dados_missa.qtd_min, 10);
            let data_tratada = DataHelpers.setHora(data, dados_missa.hora);
            let array_dados_missa = {
                id_pastoral: dados_missa.id_pastoral,
                data_hora:  data_tratada,
                qtd_min_liderancas: qtd_min,
                descricao: dados_missa.desc,
                titulo: dados_missa.titulo
            };
            array_dados_missas_recorrente.push(array_dados_missa);
        };
        return array_dados_missas_recorrente;
    };

    static trataDias(dados_missa){
        const lista_datas = DataHelpers.getDatasEntreIntervalo(dados_missa.data_inicial, dados_missa.data_final);
        const lista_datas_com_horario = lista_datas.map( data => DataHelpers.setHora(data, dados_missa.hora))
        const datas_validas = DataHelpers.validaDatasDiaSemana(lista_datas_com_horario, dados_missa.dias_semana);
        return datas_validas;
    }

    static async criaMissaRecorrente(dados_missa){
        try{
            dados_missa.qtd_min = parseInt(dados_missa.qtd_min, 10); 
            const datas_validas = this.trataDias(dados_missa);
            const dados_missas_tratados = this.trata_array_missas_recorrente(dados_missa, datas_validas); 
            return await prisma.missa.createMany({data: dados_missas_tratados});
        }
        catch (error){
            console.log(error)
            throw error;
        };
    };

};

export default Missa;