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