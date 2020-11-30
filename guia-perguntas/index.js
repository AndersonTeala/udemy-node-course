const express = require("express");
const app = express();

app.set("view engine','ejs'");
app.use(express.static('public'));

app.get("/:nome/:lang",(req,res) => {
  var nome = req.params.nome;
  var lang = req.params.lang;
  var exibirMsg = false;

  var produtos = [
    {nome: "Doritos",preco: 3.14},
    {nome: "Coca-cola",preco: 5},
    {nome: "Energetico",preco: 8.99},
    {nome: "Carne",preco: 99.90},
    {nome: "Pão",preco: 50.90},
    {nome: "Toddy",preco: 20.90}
  ]

  res.render("index.ejs",{
    nome: nome,
    lang:lang,
    empresa: "Spaceatm",
    inscritos: 9000,
    msg: exibirMsg,
    produtos: produtos
  });
});

app.listen(8080,()=>{
  console.log("App rodando!");
});