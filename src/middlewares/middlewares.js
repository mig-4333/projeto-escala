export const protegerRotas = (req, res, next) => {
    if (req.session.pastoral_id) {
        next();
    } else {
        // Se não estiver, redireciona para o login com uma mensagem
        res.render("erro");
        console.log("ERRO DE SESSÃO")
    }
};

export const erro404 = (req, res, next) => {
    res.status(404).render("erro");
};

export const flash_messages = (req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
};