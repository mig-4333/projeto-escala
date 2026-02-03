import { eachDayOfInterval, getDay } from "date-fns";

class DataHelpers {
    
    static getDataISO(data,hora="00:00"){
        // Transforma data (YYYY-MM-DD) e hora (HH:mm, 24 horas) no formato ISO
        const dataObjeto = new Date(`${data}T${hora}:00`);
        return dataObjeto
    };


    static getDatasEntreIntervalo(inicial,final,hora){
        // Obtém todos as datas no intervalo da data inicial e data final (inclusivo)
        const data_inicial = this.getDataISO(inicial,hora)
        const data_final = this.getDataISO(final,hora);
        const dias_intervalo = eachDayOfInterval({start:data_inicial, end: data_final});
        return dias_intervalo;
    };

    static getHorario(data_hora){
        // Obtém o horário (HH:mm:ss) a partir de uma data (YYYY-MM-DDTHH:mm:ss)
        const dataOBJ = new Date(data_hora)
        const horario = dataOBJ.toLocaleTimeString().slice(0,5);  // Obtém o horário (str) e formata para (HH:mm)
        return horario
    }

    static somaDia(dia){   
        // Soma um dia a mais em Date 
        const diaOBJ = new Date(dia);  // Garante que a variável tratada é um objeto Date
        const dia_somado = new Date(diaOBJ.getTime() + (1000 * 60 * 60 * 24));  // Um dia em milissegundos
        return dia_somado;
    };

    static validaDatasDiaSemana(datas,dias_semana){
        // Faz a validação se cada dia do intervalo bate com os dias da semana inputados
        const datas_tratadas = [];  // Armazena os dias que coincidem com os dias da semana desejado
        for (let data of datas){
            let dataOBJ = new Date(data);
            let dia_da_semana = dataOBJ.toLocaleDateString("pt-BR", {weekday:"long"});
            if (dias_semana.includes(dia_da_semana)){  // Verifica se a variavel percorrida esta na lista passada como parametro
                datas_tratadas.push(dataOBJ)  // Se sim, adiciona a data na lista que será retornada
            }};
        return datas_tratadas;
    };
    
    static substituiHoraData(data,hora){
        // Substitui o horario de uma data em formato ISO para o horario passado no parametro
            // SEM TRATAMENTO DO PARAM HORA ??????????
        let ISOstring = data.toISOString();
        let data_tratada = ISOstring.split("T")[0];
        let dataObjeto = DataHelpers.getDataISO(data_tratada,hora);
        return dataObjeto;
    }
    
};

export default DataHelpers;