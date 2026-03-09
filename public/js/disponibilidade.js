function getIdMisssaModal(btn_mostrar_modal){
    const pai_btn = btn_mostrar_modal.parentElement;  // Seleciona o pai do modal (tag <th>)
    const id_missa = pai_btn.nextElementSibling.value;  // O valor do prox elemento (input hidden) é o id da missa
    return id_missa;
};

async function getDisponibilidades(id_missa){
    try{
        const response = await fetch(`/disponibilidade/dados/${id_missa}`); 
        const dados_response = await response.json();
        const obj_disponibilidades = dados_response.disponibilidades
        return obj_disponibilidades;  
    }
    catch (error){
        throw error;
    };
};

function setValoresDisponibilidade(obj_disponibilidades){
    for (let dado of Object.values(obj_disponibilidades)){
        const valor_disponibilidade_lideranca = document.getElementById(`range_lideranca_${dado.id_lideranca}`);
        valor_disponibilidade_lideranca.value = dado.status;
    }; 
};

function trataValoresStepInput(valor_input){
    let mensagem;
    switch (valor_input){
        case "0":
            mensagem = "Não Disponível";
            break
        case "1":
            mensagem = "Pendente";
            break
        case "2":
            mensagem = "Disponível";
            break
    };
    return mensagem;
};

function trataValorInput(input){
    const output = input.nextElementSibling;
    const input_tratado = trataValoresStepInput(input.value);
    output.textContent = input_tratado;    
};

function trataListaDisponibilidades(){
    const lista_inputs_range = document.getElementsByClassName("range");
    for (let input of lista_inputs_range){
        trataValorInput(input);
        input.addEventListener("input", () => {
            trataValorInput(input);
        });
    };
};


const btns_mostrar_modal = document.getElementsByClassName("botao_mostrar_modal");
for (btn of btns_mostrar_modal){
    btn.addEventListener("click", async event => {
        const id_missa = getIdMisssaModal(btn);        
        const input_hidden_id_missa = document.getElementById("id_missa_modal");
        input_hidden_id_missa.setAttribute("value", id_missa)
        const dados_disponibilidade = await getDisponibilidades(id_missa);
        await setValoresDisponibilidade(dados_disponibilidade);
        trataListaDisponibilidades();
    });
};