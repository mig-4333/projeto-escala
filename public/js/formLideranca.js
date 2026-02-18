const campos_form = {
    nome: document.getElementById("nome_form"),
    contato: document.getElementById("contato_form")
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
};

const regex = {
    nome : /^[a-zA-ZÀ-ÿ\s]+$/,
    contato : /^\(\d{2}\) 9\d{4}-\d{4}$/,
    str_vazio : /^\s*$/
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
    // muda a visualização da div de "none" para "block"
    div_erro.style.display = "block";
};

function validaCampo(campo){
    const nome_campo = campo.name  // O nome que o campo tem no html e coincide com o nome dos objetos regex e erros
    if (campoEstaVazio(campo.value)){
        mostraErro(erros[nome_campo].vazio);   
    }
    else if (formatoCampoEstaErrado(campo.value, regex[nome_campo])) {
        mostraErro(erros[nome_campo].formato);
    };
};

function verificaErros(){
    validaCampo(campos_form.nome);
    validaCampo(campos_form.contato);
};

function limpaErros(){
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        erro.style.display = "none"
    };
};

function getQtdErros(){
    let qtd_erros = 0;
    const erros = document.getElementsByClassName("alert-danger");
    for (erro of erros){
        if (erro.style.display === "block") qtd_erros += 1;
    };  
    return qtd_erros;
}

const botao_salvar = document.getElementById("botao_salvar");
botao_salvar.addEventListener("click", elemento => {
    limpaErros();
    verificaErros();
    if (getQtdErros() >= 1){
        elemento.preventDefault();
    }
})

// --------------------------------------------------------------------------------------------- // 
document.addEventListener("click", (event) => {
    const elemento_clicado = event.target;
    if (elemento_clicado.closest(".btn-excluir")) {
        const colunaParaRemover = elemento_clicado.closest('.linha_excluir'); 
        if (colunaParaRemover) {
            if (confirm("Tem certeza que deseja excluir este registro?")) {
                colunaParaRemover.remove();
        };
    };
}
});

const botoes_editar = document.querySelectorAll(".btn-editar");
    botoes_editar.forEach( (botao) => {
        botao.addEventListener("click", (event) => {
            document.getElementById("lideranca_id_edit").value = event.target.getAttribute('data_id');
        });
    });
                
