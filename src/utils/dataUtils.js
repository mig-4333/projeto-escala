import { eachDayOfInterval, getDay } from "date-fns";

// validar os parametros

class DataHelpers {
    static getDataISO(data,hora="00:00"){
        // Transforma data (YYYY-MM-DD) e hora (HH:mm) no formato ISO
        const dataObjeto = new Date(`${data}T${hora}:00`);
        return dataObjeto
    };

    static getDatasEntreIntervalo(inicial, final){
        const data_inicial = this.getDataISO(inicial);
        const data_final = this.getDataISO(final);
        const dias_intervalo = eachDayOfInterval({start:data_inicial, end: data_final});
        return dias_intervalo;
    };

    static getHorario(data_hora){
        // Obtém o horário (HH:mm:ss) a partir de uma data (YYYY-MM-DDTHH:mm:ss)
        const dataOBJ = new Date(data_hora);
        const horario = dataOBJ.toLocaleTimeString().slice(0,5); 
        return horario;
    };

    static getDataFormatada(dataISO){
        // Obtém a data formatada para exibição (DD/MM/YYYY) a partir de uma data (YYYY-MM-DDTHH:mm:ss) 
        const dataObj = new Date(dataISO);
        const dataFormatada = dataObj.toLocaleDateString("pt-BR");
        return dataFormatada;
    };

    static somaDia(dia){   
        const diaOBJ = new Date(dia); 
        const dia_somado = new Date(diaOBJ.getTime() + (1000 * 60 * 60 * 24));  // Um dia em milissegundos
        return dia_somado;
    };

    static validaDatasDiaSemana(datas,dias_semana){
        // Faz a validação se cada dia do intervalo bate com os dias da semana inputados
        const datas_tratadas = [];  
        for (let data of datas){
            let dataOBJ = new Date(data);
            let dia_da_semana = dataOBJ.toLocaleDateString("pt-BR", {weekday:"long"});
            if (dias_semana.includes(dia_da_semana)){  
                datas_tratadas.push(dataOBJ)  
            }};
        return datas_tratadas;
    };
    
    static setHora(data,hora){
        let ISOstring = data.toISOString();
        let data_tratada = ISOstring.split("T")[0];
        let dataObjeto = DataHelpers.getDataISO(data_tratada,hora);
        return dataObjeto;
    };
};

export default DataHelpers;