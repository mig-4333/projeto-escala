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
    const campos_data_nascimento = document.getElementsByClassName("data_nascimento");
    for (let campo_data of campos_data_nascimento){
        alterarCampoDataNascimentoHTML(campo_data);		
    };
};
trataDataNascimento();

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