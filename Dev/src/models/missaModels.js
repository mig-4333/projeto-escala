import prisma from "../prisma.js"
import DataHelpers from "../utils/dataMissaUtils.js";


class Missa {    
    constructor (titulo,qtd_min,desc,data,hora){
        this.titulo = titulo;
        this.qtd_min = qtd_min;
        this.desc = desc;
        this.data = data;
        this.hora = hora;
    };

    // Lida com o metódo GET de todas as missas (visualização de calendário)
    static async buscaMissas(){
        try{
            return await prisma.missa.findMany();
        }
        catch (error){
            throw error;
        };
    };

    // Lida com o metódo GET das missas de uma data (visualização de tabela)
    static async buscaMissasData(data){
        const dataOBJ = DataHelpers.getDataISO(data)
        try{
            const missas =  await prisma.missa.findMany({
                where: { AND: [
                    { data_hora: { gt: dataOBJ }},
                    { data_hora: { lt: DataHelpers.somaDia(dataOBJ) }}
                ]
            }});
            for (let missa of missas) missa.horario = DataHelpers.getHorario(missa.data_hora);  
            return missas 
        }
        catch (error) {
            throw error;
        };
    };

    // Lida com o metódo PUT de missas
    static async editaMissa(id,titulo,qtd_min,desc,data,hora){
        try{
            console.log("2. [Model] Vai iniciar a chamada ao Prisma...");
            const dataOBJ = DataHelpers.getDataISO(data,hora);
            qtd_min = parseInt(qtd_min,10);
            id = parseInt(id,10);
            return await prisma.missa.update({
                where: {
                    id: id,
                },
                data: {
                    data_hora: dataOBJ,
                    qtd_min_liderancas: qtd_min,
                    descricao: desc,
                    titulo: titulo,
                },
            })
        }
        catch (error) {
            console.log("MODEL ERROR")
            throw error
        };
    };
    
    // Lida com o metódo DELETE de missas
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
        }
    };

    // Lida com o metódo POST de Missa (única)
    static async criaMissa(titulo,qtd_min,desc,data,hora){
        const dataObjeto = DataHelpers.getDataISO(data,hora)
        qtd_min = parseInt(qtd_min, 10);
        try{
            return await prisma.missa.create({
                data: {
                    data_hora: dataObjeto,
                    qtd_min_liderancas: qtd_min,
                    descricao: desc,
                    titulo: titulo
                }}
        )}
        catch (error){
            throw error;
        };
    };

    // Lida com o metódo POST de Missa (recorrente)
    static async criaMissaRecorrente(titulo, qtd_min, desc, dias_semana, data_inicial,data_final, hora){
        qtd_min = parseInt(qtd_min, 10);
        const lista_dias = DataHelpers.getDatasEntreIntervalo(data_inicial,data_final,hora);
        const dias_tratado = DataHelpers.validaDatasDiaSemana(lista_dias,dias_semana,hora);
        try{
            const lista_dados = []
            for (let data of dias_tratado){
                let data_tratada = DataHelpers.substituiHoraData(data,hora);
                let array_dados = {
                        data_hora:  data_tratada,
                        qtd_min_liderancas: qtd_min,
                        descricao: desc,
                        titulo: titulo
                };
                lista_dados.push(array_dados)
            };
            return await prisma.missa.createMany({data: lista_dados})
        }
        catch (error){
            throw error;
        }
    }

}

export default Missa;