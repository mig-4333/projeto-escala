function primeiraLetraMaiscula(txt){
        txt = String(txt);
        const txt_tratado = txt.charAt(0).toUpperCase() + txt.slice(1);
        return txt_tratado;
    };
    
function trataDataTopo(){
    let data = document.getElementById("data_topo_pagina");
    const dataISO = new Date (data.innerHTML);
    const dia = dataISO.getDate();
    const dia_semana = primeiraLetraMaiscula(dataISO.toLocaleDateString("pt-BR", {weekday:"long"}));
    const ano = dataISO.getFullYear();
    const mes = primeiraLetraMaiscula(dataISO.toLocaleDateString("pt-BR", { month: "long" }));
    return `${dia_semana}, ${dia} De ${mes} De ${ano}`;
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("data_topo_pagina").innerHTML = trataDataTopo();   
});

// Carrega o modal da descrição
const links_modal_desc = document.querySelectorAll(".link_desc");
    for (link of links_modal_desc){
        link.addEventListener("click", () => {
            const body_modal = document.getElementById("body_modal");
            const linha = link.closest(".linha");
            body_modal.innerHTML = linha.querySelector(".input_hidden_desc").value;
        });
    };

// BOTÃO EDITAR MISSA (DIA ESPECÍFICO)
const btns_editar = document.querySelectorAll(".btn-editar-missa");
btns_editar.forEach(btn_editar => {
    btn_editar.addEventListener("click", (event) => {
        const missa_id_form = document.getElementById("missa_id_form");
        const id = event.target.getAttribute("data_id");
        missa_id_form.value = id
    });
});

document.addEventListener("click", (event) => {
    const elemento_clicado = event.target;
    if (elemento_clicado.closest(".btn-excluir-missa")) {
        const colunaParaRemover = elemento_clicado.closest('.linha_excluir'); 
        if (colunaParaRemover) {
            if (confirm("Tem certeza que deseja excluir este registro?")) {
                colunaParaRemover.remove();
        };
    };
}
});