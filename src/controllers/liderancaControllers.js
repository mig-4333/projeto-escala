import Lideranca from "../models/liderancaModels.js" 

// Lida com o metódo GET na página inicial das lideranças
export const liderancaGET = async (req,res) => {  
    try {
        const liderancas = await Lideranca.buscaLiderancas(req.session.pastoral_id);  
        res.render("lideranca", { liderancas });
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao carregar lideranças.");
        res.redirect("/erro");
        };
    };

// Lida com o metódo PUT (modal de edição de lideranças)
export const liderancaPUT = async (req,res) => {  
    try{
        const { id,nome,contato } = req.body;
        await Lideranca.alteraLideranca(id,nome,contato);
        req.flash("success", "Liderança alterada com sucesso.");
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao alterar liderança.");
    }
    finally{
        res.redirect("/liderancas")
    }
};

// Lida com o metódo DELETE (Botão de excluir liderança)
export const liderancaDELETE = async (req,res) => {
    try {
        const id = req.params.id;
        await Lideranca.deletaLideranca(id);
        req.flash("success", "Liderança deletada com sucesso.");
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao deletar liderança.");
    }
    finally {
        res.redirect("/liderancas");
    };
};

// Renderiza o formulário de cadastro de liderança
export const new_liderancaGET = (req,res) => {
    try{
        res.render("form_lideranca");
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao renderizar formulário da liderança.");
        res.redirect("erro");
    }
};

// Lida com o metódo POST (formulário de nova liderança)
export const new_liderancaPOST = async (req,res) => {
    try {
        const { nome,contato, data_nascimento } = req.body;
        const id_pastoral = req.session.pastoral_id; 
        await Lideranca.criaLideranca(id_pastoral, nome, contato, data_nascimento);
        req.flash("success", "Liderança criada com sucesso.");
        res.redirect("/liderancas/new");
    }
    catch (error) {
        req.flash("error", "Ocorreu algum erro ao criar liderança.");
        res.redirect("/liderancas/new");
    }; 
};
