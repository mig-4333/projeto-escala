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
        vazio: undefined,
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
    // retorna true se texto estiver vazio
    return regex.str_vazio.test(str);
};

function mostraErro(div_erro){
    if (div_erro) div_erro.style.display = "block";
};


function getCamposDataNascimneto( ){
    const array_campos_datas = document.getElementsByClassName("data_nascimento");
    return array_campos_datas;
};

function trataFormatoData(data){
    let dataOBJ = new Date(data);
        const data_tratada = dataOBJ.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    return data_tratada;
};

function alterarCampoDataNascimentoHTML(campo_data){
    campo_data.innerHTML = trataFormatoData(campo_data.innerHTML);
};

function trataDataNascimento(){
    // Obtem todas as datas de nascimento da tabela e trata cada data (dd/mm/yyyy) e altera o HTML 
    const campos_data_nascimento = getCamposDataNascimneto();
    for (let campo_data of campos_data_nascimento){
        alterarCampoDataNascimentoHTML(campo_data);		
    };
    
};
trataDataNascimento()

function validaCampo(campo){
    const nome_campo = campo.name  // O nome que o campo tem no html e coincide com o nome dos objetos regex e erros
    if (formatoCampoEstaErrado(campo.value, regex[nome_campo])) {
        mostraErro(erros[nome_campo].formato);
    }
    else if (campoEstaVazio(campo.value)){
        mostraErro(erros[nome_campo].vazio);   
    };
};

function verificaErros(){
    validaCampo(campos_form.nome);
    validaCampo(campos_form.contato);
    validaCampo(campos_form.data_nascimento);
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

const botao_salvar = document.getElementById("botao_salvar");
botao_salvar.addEventListener("click", elemento => {
    limpaErros();
    verificaErros();
    if (getQtdErros() >= 1) elemento.preventDefault();
    });

document.addEventListener("click", (event) => {
    const elemento_clicado = event.target;
    if (elemento_clicado.closest(".btn-excluir")) {
        const colunaParaRemover = elemento_clicado.closest('.linha_excluir'); 
        if (colunaParaRemover) {
            if (confirm("Tem certeza que deseja excluir este registro?")) {
                colunaParaRemover.remove();
            };
        };
    };
});

const botoes_editar = document.querySelectorAll(".btn-editar");
    botoes_editar.forEach( (botao) => {
        botao.addEventListener("click", (event) => {
            document.getElementById("lideranca_id_edit").value = event.target.getAttribute('data_id');
        });
    });      