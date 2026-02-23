import prisma from "../prisma.js"
import DataHelpers from "../utils/dataUtils.js"

class Lideranca {
    static async buscaLiderancas(id_pastoral){
        try {
            const liderancas = await prisma.lideranca.findMany({
                where: {
                    id_pastoral: id_pastoral
                },
                orderBy:{
                    id: 'asc',
                }
            });        
            return liderancas
        } 
        catch (error) {
            throw error;
        };
    };

    static async criaLideranca(id_pastoral, nome, contato, data_nascimento){
        try{
            const dataObjeto = DataHelpers.getDataISO(data_nascimento);
            return await prisma.lideranca.create({
                data: {
                    id_pastoral, id_pastoral,
                    nome: nome,
                    contato: contato,
                    data_nascimento: dataObjeto
                }
            }
        )} 
        catch (error){
            throw error;
        };
    };

    static async deletaLideranca(id){
        try{
            id = parseInt(id,10);
            await prisma.lideranca.delete({
                where: {
                    id: id,
                }
            });
        }
        catch (error) {
            throw error;
        };
    };

    static async alteraLideranca(id,nome,contato){
        try {
            id = parseInt(id,10);
            await prisma.lideranca.update({
            where: {
                id: id
            },
            data: {
                id: id,
                nome: nome,
                contato: contato
            }
            })
        } 
        catch (error){
            throw error;
        };
    };
};

export default Lideranca;
