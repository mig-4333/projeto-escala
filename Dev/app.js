import "dotenv/config"
import express from "express";  // Importa o express
import path from "path";                   // Define a porta, onde sera feita a conexão. Em prod vem de um arquivo env
import routes from "./routes/routes.js";  // Importa o arquivo de rotas
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT

app.set("views", path.join(__dirname,"src","views")); // Configura a pasta de views que o express deve utilizar   
app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());  // Processa dados como JSON
app.use(express.urlencoded({ extended   : true })); // Permite carregar dados que vem da view dentro de um objeto (req.body)

app.use((req, res, next) => {
  res.locals.status = req.query; 
  next();
});

app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method
      delete req.body._method
      return method
    }
}));

app.use(routes);

// Inicializa o app
app.listen(port,() => {
    console.log("Servidor rodando na porta " + port)
});