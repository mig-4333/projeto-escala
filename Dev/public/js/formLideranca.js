function valida_campo_nome(nome){
    const regex_nome = /^[a-zA-ZÀ-ÿ\s]+$/; // Apenas letras e espaços
    if (nome === ""){
        document.getElementById("mensagem_nome_vazio").style.display = "block";
        return -1   
    }
    else if (!regex_nome.test(nome)) {
        document.getElementById("mensagem_nome_apenas_letras").style.display = "block";   
        return -1
    };
};

function valida_campo_contato(contato){
    const regex_contato = /^\(\d{2}\) 9\d{4}-\d{4}$/; // Telefone: (XX) 9XXXX-XXXX
    if (contato === ""){
        document.getElementById("mensagem_contato_vazio").style.display = "block";
        return -1
    }
    else if (!regex_contato.test(contato)) {
        document.getElementById("mensagem_contato_formato").style.display = "block";
        return -1
    }; 
};

function libera_botao(){
    if (erro_nome !== -1 && erro_contato !== -1){
        document.getElementById("botao_salvar").removeAttribute("disabled");
    };
};

// Inicializa as variáveis de verificação dos erros como -1 (não exibe)
let erro_nome = -1;
let erro_contato = -1;

document.getElementById("nome_form").addEventListener("blur", () => {
    document.getElementById("mensagem_nome_vazio").style.display = "none";   
    document.getElementById("mensagem_nome_apenas_letras").style.display = "none"; 
    erro_nome = valida_campo_nome(document.getElementById("nome_form").value);
    libera_botao();
});

document.getElementById("contato_form").addEventListener("blur", () => {
    document.getElementById("mensagem_contato_vazio").style.display = "none";
    document.getElementById("mensagem_contato_formato").style.display = "none";  
    erro_contato = valida_campo_contato(document.getElementById("contato_form").value);
    libera_botao();
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
}
});

const botoes_editar = document.querySelectorAll(".btn-editar");
    botoes_editar.forEach( (botao) => {
        botao.addEventListener("click", (event) => {
            document.getElementById("lideranca_id_edit").value = event.target.getAttribute('data_id');
        });
    });
                
