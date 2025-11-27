exports.inicioGET = (req,res) => {
    res.render("inicio")
};

exports.loginGET = (req,res) => {
    res.send("Tela de login")
}