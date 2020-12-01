const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
  Pergunta.findAll({ raw: true, order:[
    ['id','DESC'] /* ASC = Crescente || DESC = Decrescente */
  ]}).then(perguntas => {
    res.render("index.ejs",{
      perguntas: perguntas
    });
  });
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

app.get("/pergunta/:id",(req,res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id},
  }).then(pergunta => {
    if(pergunta != undefined){ /* PERGUNTA ENCONTRADA */

          Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order: [['id', 'DESC']]
          }).then(respostas => {
            res.render("pergunta.ejs",{
              pergunta: pergunta,
              respostas: respostas
            });
          }); 
    }else{ /* PERGUNTA NÃO ENCONTRADA */
        res.redirect("/");
    }
  });
})

app.post("/responder",(req,res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
      res.redirect("/pergunta/"+perguntaId);
  });
});

app.listen(PORT,HOST,()=>{console.log("🚀 Back-end started!");});