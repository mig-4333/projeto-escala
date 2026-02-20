import Login from "../models/loginModels";

export const inicioGET = (req,res) => {
    res.render("inicio");
};

export const loginGET = (req,res) => {
    res.render("login");
};

export const loginPOST = async (req, res) => {
    try{
        const { nome,senha } = req.body;
        const pastoral = await Login.valida_login(nome,senha);
        req.session.regenerate(err => {
                if (err) {
                    throw new Error("Erro ao regenerar sessão")
                }
                req.session.pastoral_id = pastoral.id;
                req.flash("success", "Login realizado com sucesso."); 
                res.redirect("home"); 
            });
    }
    catch {
        req.flash("error", "Erro ao fazer login.");
        res.render("erro");
    };
};

export const logout = (req, res) => {
    // Apaga a memória do servidor para este usuário
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect("/");  // Redireciona para home sem o login
    });
};