import Lideranca from "../models/liderancaModels.js" 


// Lida com o metódo GET na página inicial das lideranças
export const liderancaGET = async (req,res) => {  
    try {
    const { status } = req.query; 
    const liderancas = await Lideranca.buscaLiderancas();    
    res.render("lideranca", { liderancas, resultado: status });
    }
    catch (error) {
        res.send("Não foi possivel carregar as lideranças") 
        };
    };

// Lida com o metódo PUT (modal de edição de lideranças)
export const liderancaPUT = async (req,res) => {  
    try{
        const { id,nome,contato } = req.body;
        await Lideranca.alteraLideranca(id,nome,contato);
        res.redirect("/liderancas?status=sucesso");
    }
    catch (error) {
        res.redirect("/liderancas?status=erro");
    };
};

// Lida com o metódo DELETE (Botão de excluir liderança)
export const liderancaDELETE = async (req,res) => {
    try {
        const id = req.params.id;
        await Lideranca.deletaLideranca(id);
        const liderancas = await Lideranca.buscaLiderancas();
        res.render("lideranca", { 
            liderancas,
            lideranca_id : 0
        });
    }
    catch (error) {
        res.send("Ocorreu um erro ao deletar o registro");
    };
};

// Renderiza o formulário de cadastro de liderança
export const new_liderancaGET = (req,res) => {
    res.render("form_lideranca");
};

// Lida com o POST do formulário de nova liderança
export const new_liderancaPOST = async (req,res) => {
    try {
        const { nome,contato } = req.body;
        await Lideranca.criaLideranca(nome,contato);
        res.redirect("/liderancas/new?resultado=sucesso");
    }
    catch (error) {
        res.redirect("/liderancas/new?resultado=erro");
    }; 
};

