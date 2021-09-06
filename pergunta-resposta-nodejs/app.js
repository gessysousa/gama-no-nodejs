//incluindo uma biblioteca que no caso é do http
const http = require('http');
const url = require("url");
const queryString = require("query-string");

//definição de endereço/url
const hostname = '127.0.0.1'; //localhost
const port = 3000;

//implementação da regra de negócio
const server = http.createServer((req, res) => {

    //pegar a pergunta na url
    const params = queryString.parse(url.parse(req.url, true).search);//trata o parâmetro enviado na url => localhost:3000/?pergunta=melhor-filme
    //verificar a pergunta e escolher uma resposta
    let resposta;
    if(params.pergunta == "melhor-filme"){
      resposta = "Star Wars";
    } 
    else if(params.pergunta == "melhor-tecnologia-backend"){
      resposta = "nodejs";
    } 
    else
    {
      resposta = "Nao sei, desculpe :(";
    }
    //retornar a resposta escolhida
  res.statusCode = 200;//fala pro navegador que deu certo
  res.setHeader('Content-Type', 'text/plain'); //header de comunicação
  res.end(resposta);
});

//execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});