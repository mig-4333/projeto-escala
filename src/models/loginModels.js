import prisma from "../prisma.js"
import bcrypt from "bcrypt";

class Login {
    static async valida_login(nome,senha){
        try{
            const user = await prisma.pastoral.findFirst({ where: { nome: nome,} });
            if (!user) {
                throw new Error("pastoral não existe no registro"); 
            };
            const senha_hash = await bcrypt.compare(senha, user.senha);
            if (!senha_hash){
                throw new Error("senha incorreta");
            };
            return user;
        }
        catch (error) {
            throw error;
        };
    };
};

export default Login;