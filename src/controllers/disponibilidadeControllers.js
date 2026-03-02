import Missa from "../models/missaModels";
import Lideranca from "../models/liderancaModels"
import Disponibilidade from "../models/disponibilidadeModels"; 

export const disponibilidadeGET = async (req,res) => {
    const missas = await Missa.buscaMissas(req.session.pastoral_id);
    const liderancas = await Lideranca.buscaLiderancas(req.session.pastoral_id);
            console.log(liderancas)
    res.render("disponibilidade", { missas, liderancas });
};