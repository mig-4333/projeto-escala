const campos_form = {
    nome: document.getElementById("nome_form"),
    contato: document.getElementById("contato_form"),
    data_nascimento: document.getElementById("data_nascimento_form")
};

const erros = {
    nome: {
        vazio: document.getElementById("mensagem_nome_vazio"),
        formato: document.getElementById("mensagem_nome_apenas_letras") 
    },
    contato: {
        vazio: document.getElementById("mensagem_contato_vazio"),
        formato: document.getElementById("mensagem_contato_formato")
    },
    data_nascimento: {
        formato: document.getElementById("mensagem_data_formato")        
    }
};

const regex = {
    nome : /^[a-zA-ZÀ-ÿ\s]+$/,
    contato : /^\(\d{2}\) 9\d{4}-\d{4}$/,
    str_vazio : /^\s*$/,
    data_nascimento : /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
};

function formatoCampoEstaErrado(string,regex){
    // retorna true se o formato do string estiver errado (não bater a regex passada no parametro)
    return regex.test(string) ? false : true;  
};

function campoEstaVazio(str){
    return regex.str_vazio.test(str);
};

function mostraErro(div_erro){
    if (div_erro) div_erro.style.display = "block";
};

function validaCampo(campo){
    const nome_campo = campo.name  // O nome que o campo tem no html coincide com o nome dos objetos regex e erros
    if (campoEstaVazio(campo.value)) {
        mostraErro(erros[nome_campo].vazio);   
    }
    else if (formatoCampoEstaErrado(campo.value, regex[nome_campo])) {
        mostraErro(erros[nome_campo].formato);
    };
};

function validaData(data){
    const nome_campo = data.name  // O nome que o campo tem no html coincide com o nome dos objetos regex e erros
    if (data.value === "" && data.validity.badInput) {
        mostraErro(erros[nome_campo].formato);
        }
    else if (data.value !== "" && formatoCampoEstaErrado(data.value, regex[nome_campo])){
        mostraErro(erros[nome_campo].formato);
    }
    };

function limpaErros(){
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        erro.style.display = "none";
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
    validaCampo(campos_form.nome);
    validaCampo(campos_form.contato);
    validaData(campos_form.data_nascimento);
};

const botao_salvar = document.getElementById("botao_salvar");
botao_salvar.addEventListener("click", elemento => {
    limpaErros();
    verificaErros();
    if (getQtdErros() >= 1) elemento.preventDefault();
    });
