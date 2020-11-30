const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

/* Database */
connection
    .authenticate()
    .then(() => {
      console.log("✅ Connected to the database!")
    })
    .catch((msgErro) => {
      console.log(msgErro);
    })

const PORT = 3000;
const HOST = '0.0.0.0';

/* Dizendo para o Express usar o EJS como View engine */
app.set("view engine','ejs'");
app.use(express.static('public'));

/* body parser */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Rotas */
app.get("/",(req,res) => {
  res.render("index.ejs");
});

app.get("/perguntar",(req,res) => {
  res.render("perguntar.ejs");
});

app.post("/salvarpergunta",(req, res) => {

  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.listen(PORT,HOST,()=>{console.log("🚀 Back-end started!");});