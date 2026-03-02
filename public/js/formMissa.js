const campos_form = {
    titulo : document.getElementById("titulo_missa"),
    qtd_min : document.getElementById("qtd_min_lideranca_missa"),
    hora : document.getElementById("hora_missa"),
    data : document.getElementById("data_missa"),
    datas : document.getElementsByClassName("datas_missa"),
};

const erros = {
    titulo : {
        vazio : document.getElementById("mensagem_titulo_vazio")
    },
    qtd_min : {
        vazio : document.getElementById("mensagem_qtd_min_lideranca_vazio"),
        ultrapassa : document.getElementById("mensagem_qtd_min_lideranca_ultrapassa")
    },
    hora : {
        vazio : document.getElementById("mensagem_hora_vazio"),
    },
    data : {
        vazio : document.getElementById("mensagem_data_vazio"),
        formato : document.getElementById("mensagem_data_formato"),
    },
};

const regex = {
    txt_vazio : /^\s*$/,
    data : /^\d{4}-\d{2}-\d{2}$/
};

function textoVazio(texto){
    // Retorna true se texto estiver vazio
    return regex.txt_vazio.test(texto);
};

function ultrapassaQtdMinLideranca(qtd){ 
    const qtd_min_front = parseInt(campos_form.qtd_min.min, 10);
    return (qtd < qtd_min_front);
};

function limpaErro(){
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        erro.style.display = "none"
    };
};

function exibeErro(div_erro){
    div_erro.style.display = "block";
};

function validaFormatoData(data){
    // retorna true se estiver fora do formato YYYY-MM-DD 
    if (!regex.data.test(data)) return true; 
    const dataObj = new Date(ano, mes - 1, dia);
    return dataObj.getFullYear() !== ano || dataObj.getMonth() !== mes - 1 || dataObj.getDate() !== dia;  // retorna true se algum dos valores for diferente do valor ISO
};
 
function getValoresInputsCampos(){
    valores_campos_form = Object.values(campos_form);
    const campos_form_tratado = valores_campos_form.filter( valor_campo => valor_campo !== null );
    return campos_form_tratado;
};

function verificaCamposVazios(){
    const valores_campos_form = getValoresInputsCampos();
    for (let campo of valores_campos_form){ 
        if (campo instanceof HTMLCollection){
            for (let data of campo){
                if (textoVazio(data.value)) exibeErro(erros.data.vazio);
            };
        }
        else if (textoVazio(campo.value)) exibeErro(erros[campo.name].vazio)
    };
};

function getQtdErros(){
    let qtd_erros = 0;
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        if (erro.style.display === "block") qtd_erros += 1;
    };  
    return qtd_erros;
};

function verificaErros(){ 
    if (campos_form.datas.length > 1){
        for (let data of campos_form.datas){
            if (validaFormatoData(data.value)) exibeErro(erros.data.formato);
        };
    }
    else if (campos_form.data){
        if (validaFormatoData(campos_form.data.value)) exibeErro(erros.data.formato);
    };
    if (ultrapassaQtdMinLideranca(campos_form.qtd_min.value)) exibeErro(erros.qtd_min.ultrapassa);
    verificaCamposVazios(); 
};

const botao_enviar = document.getElementById("botao_salvar_missa");
botao_enviar.addEventListener("click", elemento => {
    limpaErro();
    verificaErros();
    if (getQtdErros() >= 1){
        elemento.preventDefault();
    };
});