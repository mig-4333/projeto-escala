import "dotenv/config"
import express from "express";  
import path from "path";                   
import routes from "./routes/routes.js"; 
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from 'connect-flash';
import { erro404 } from "./src/middlewares/middlewares.js";
import { flash_messages } from "./src/middlewares/middlewares.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT

app.set("views", path.join(__dirname,"src","views"));    
app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());  
app.use(express.urlencoded({ extended   : true })); 

app.use((req, res, next) => {
  res.locals.status = req.query; 
  next();
});

app.use(session({
    secret: 'segredo-super-secreto-do-agiliza', // Usado para assinar o cookie
    resave: false,              // Evita salvar a sessão se nada mudou
    saveUninitialized: true,    // Salva uma sessão vazia para visitantes novos
    cookie: { 
        maxAge: null, // Duração de 1 dia (em milissegundos)
        secure: false // Coloque 'true' apenas se tiver HTTPS (Produção)
    }
}));

app.use(flash());
app.use(flash_messages);

app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    };
}));

app.use(routes);

app.use(erro404);

app.listen(port,() => {
    console.log("Servidor rodando na porta " + port);
});