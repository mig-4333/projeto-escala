const express = require("express");  // Importa o express
const app = express()                // Cria uma instancia do express chamada app
const path = require("path");
const port = 3000                   // Define a porta, onde sera feita a conexão. Em prod vem de um arquivo env
const routes = require("./routes/routes");  // Importa o arquivo de rotas


app.use(routes);  // Express utiliza o arquivo routes para criar os endpoints

app.set("views", path.join(__dirname,"src","views")); // Configura a pasta de views que o express deve utilizar   
app.set("view engine", "ejs");

// Inicializa o app
app.listen(port,() => {
    console.log("Servidor rodando na porta " + port)
});