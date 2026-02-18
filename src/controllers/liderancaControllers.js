import Lideranca from "../models/liderancaModels.js" 


// Lida com o metódo GET na página inicial das lideranças
export const liderancaGET = async (req,res) => {  
    try {
        const { status_delete, status_edit } = req.query; 
        const liderancas = await Lideranca.buscaLiderancas(req.session.pastoral_id);  
        res.render("lideranca", { liderancas, status_delete, status_edit });
    }
    catch (error) {
        res.render("erro"); 
        };
    };

// Lida com o metódo PUT (modal de edição de lideranças)
export const liderancaPUT = async (req,res) => {  
    let status_edit
    try{
        const { id,nome,contato } = req.body;
        await Lideranca.alteraLideranca(id,nome,contato);
        status_edit = "sucesso"
    }
    catch (error) {
        status_edit = "erro"
    }
    finally{
        res.redirect(`/liderancas/?status_edit=${status_edit}`)
    }
};

// Lida com o metódo DELETE (Botão de excluir liderança)
export const liderancaDELETE = async (req,res) => {
    let status_delete;
    try {
        const id = req.params.id;
        await Lideranca.deletaLideranca(id);
        status_delete = "sucesso";
    }
    catch (error) {
        status_delete = "erro";
    }
    finally {
        res.redirect(`/liderancas?status_delete=${status_delete}`)
    };
};

// Renderiza o formulário de cadastro de liderança
export const new_liderancaGET = (req,res) => {
    try{
        res.render("form_lideranca");
    }
    catch (error) {
        res.render("erro");
    }
};

export const new_liderancaPOST = async (req,res) => {
    try {
        const { nome,contato } = req.body;
        const id_pastoral = parseInt(req.session.id,10); 
        await Lideranca.criaLideranca(id_pastoral, nome, contato);
        res.redirect("/liderancas/new?resultado=sucesso");
    }
    catch (error) {
        res.redirect("/liderancas/new?resultado=erro");
    }; 
};

