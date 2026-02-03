// BOTÃO EDITAR MISSA (DIA ESPECÍFICO)
const btns_editar = document.querySelectorAll(".btn-editar-missa");
btns_editar.forEach(btn_editar => {
    btn_editar.addEventListener("click", (event) => {
        const missa_id_form = document.getElementById("missa_id_form");
        const id = event.target.getAttribute("data_id");
        missa_id_form.value = id
    });
});


// BOTÃO EXCLUIR MISSA (DIA ESPECÍFICO)
const btns_excluir = document.querySelectorAll(".btn-excluir-missa")
btns_excluir.forEach( btn_excluir => {
    btn_excluir.addEventListener("click", (element) => {
        const colunaParaRemover = element.closest(".linha_excluir");
        if (colunaParaRemover){
            if (confirm("Tem certeza que deseja excluir este registro?")) {
            colunaParaRemover.remove();
            }
        }
    })
})

function primeiraLetraMaiscula(txt){
        txt = String(txt)
        const txt_tratado = txt.charAt(0).toUpperCase() + txt.slice(1);
        return txt_tratado
    };
    
function trataDataTopo(){
    let data = document.getElementById("data_topo_pagina") ;
    const dataISO = new Date (data.innerHTML);
    const dia = dataISO.getDate();
    const dia_semana = primeiraLetraMaiscula(dataISO.toLocaleDateString("pt-BR", {weekday:"long"}));
    const ano = dataISO.getFullYear();
    const mes = primeiraLetraMaiscula(dataISO.toLocaleDateString("pt-BR", { month: "long" }));
    return `${dia_semana}, ${dia} De ${mes} De ${ano}`
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("data_topo_pagina").innerHTML = trataDataTopo();   
})

const links_modal_desc = document.querySelectorAll(".link_desc");
    for (link of links_modal_desc){
        link.addEventListener("click", () => {
            const body_modal = document.getElementById("body_modal");
            const linha = link.closest(".linha");
            body_modal.innerHTML = linha.querySelector(".input_hidden_desc").value;
        });
    };

// VALIDAÇÃO DOS FORMULÁRIOS (Missa, Missa Recorrente e Modal Edição)

function limpaErro(){
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        erro.style.display = "none"
    };
};

function exibeErro(div_erro){
    // visualização do erro específico de "none" para "block"
    div_erro.style.display = "block";
};

function textoVazio(texto){
    // Retorna true se texto estiver vazio
    const regex_txt_vazio = /^\s*$/;
    return regex_txt_vazio.test(texto);
};

function ultrapassaQtdMinLideranca(qtd){
    // Retorna true se qtd for maior que o numero minimo de lideranças ("minlenght" no HTML) 
    const qtd_min_front = parseInt(campos_form.qtd_min.min,10)
    return qtd < qtd_min_front ? true : false
};

function validaFormatoData(data){
    // Retorna true se o formato da data estiver errado
    const regex =  /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(data)) return true; 
    
    const partes = data.split("-");
    const ano = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const dia = parseInt(partes[2], 10);

    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) return false;  
    
    const dataObj = new Date(ano, mes - 1, dia);
    return dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes - 1 || dataObj.getDate() !== dia;
    // retorna true se algum dos valores for diferente do valor ISO
};

function verificaErros(){
    console.log(campos_form)
    if (campos_form.datas.lenght > 0){
        for (data of campos_form.data){
            validaFormatoData(data.value)
            exibeErro(erros.data.formato)
        }
    }
    if (campos_form.data){
        if (validaFormatoData(campos_form.data.value)){
            exibeErro(erros.data.formato);
            };
    };
    if (ultrapassaQtdMinLideranca(campos_form.qtd_min.value)){
        exibeErro(erros.qtd_min.ultrapassa);
    }
    for (let campo of Object.values(campos_form)){
        if (textoVazio(campo.value)){ 
            exibeErro(erros[campo.name].vazio)
        };
    };
};

function getQtdErros(){
    let qtd_erros = 0;
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        if (erro.style.display === "block") qtd_erros += 1;
    };  
    return qtd_erros
}


const campos_form = {
    titulo : document.getElementById("titulo_missa"),
    qtd_min : document.getElementById("qtd_min_lideranca_missa"),
    hora : document.getElementById("hora_missa"),
    data : document.getElementById("data_missa"),
    datas : document.getElementsByClassName("datas_missa"),
};

const erros = {
    titulo : {vazio : document.getElementById("mensagem_titulo_vazio")},
    qtd_min : {
        vazio : document.getElementById("mensagem_qtd_min_lideranca_vazio"),
        ultrapassa : document.getElementById("mensagem_qtd_min_lideranca_ultrapassa")
    },
    hora : {vazio : document.getElementById("mensagem_hora_vazio"),},
    data : {
        vazio : document.getElementById("mensagem_data_vazio"),
        formato : document.getElementById("mensagem_data_formato"),
    },
};

const botao_enviar = document.getElementById("botao_salvar_missa");
botao_enviar.addEventListener("click", elemento => {
    console.log("CLICOU")
    limpaErro();
    verificaErros()
    if (getQtdErros() >= 1){
        elemento.preventDefault();
    };
})