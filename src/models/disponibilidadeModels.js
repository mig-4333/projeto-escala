import prisma from "../prisma";

class Disponibilidade {
    static async buscaDisponibilidadesMissaEspecifica(id_missa){
        try{
            id_missa = parseInt(id_missa, 10);
            const disponibilidades = await prisma.disponibilidade_lideranca.findMany({
                where: {id_missa: id_missa}
            }) 
            return disponibilidades;
        }
        catch (error){
            throw error;
        };
    };

    static async registraDisponibilidades(dados_disponibilidade, id_missa){
        let array_delete = [];
        let dict_upsert = {};
        for (let [id_lideranca, disponibilidade] of Object.entries(dados_disponibilidade)){
            // 0: Não Disponível, 1: Pendente, 2: Disponível
            if (disponibilidade === "1") array_delete.push(id_lideranca);
            else if (disponibilidade === "0" || disponibilidade === "2") dict_upsert[id_lideranca] = disponibilidade;
        };
        if (dict_upsert.length !== 0) await this.upsertDisponivelIndisponivel(dict_upsert, id_missa);
        if (Object.keys(array_delete).length !== 0) await this.delete_Pendente(array_delete, id_missa);
    };

    static async upsertDisponivelIndisponivel(dict_lideranca, id_missa){
        try{
            id_missa = parseInt(id_missa, 10);
            for (let [id, status] of Object.entries(dict_lideranca)){
                id = parseInt(id, 10);
                await prisma.disponibilidade_lideranca.upsert({
                    where: {
                        id_lideranca_id_missa: {
                            id_lideranca: id,
                            id_missa: id_missa
                            }
                    },
                    update: {
                        status: status
                    },
                    create: {
                        id_missa: id_missa,
                        id_lideranca: id,
                        status: status
                    }
                }
        )}}
        catch (error){
            throw error;
        }
    };

    static async delete_Pendente(lista_id_lideranca, id_missa){
        try{
            id_missa = parseInt(id_missa, 10);
            lista_id_lideranca = lista_id_lideranca.map( id => id = parseInt(id,10))
            await prisma.disponibilidade_lideranca.deleteMany({
                where: {
                        AND: {
                            id_lideranca: {in: lista_id_lideranca},
                            id_missa: id_missa
                        },
                    },
                })
        }
        catch (error){
            throw error;
        }
    }
};

export default Disponibilidade;