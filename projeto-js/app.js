//incluindo uma biblioteca que no caso é do http
const http = require('http');
const url = require("url");
const queryString = require("query-string");
const fs = require("fs");

//definição de endereço/url
const hostname = '127.0.0.1'; //localhost
const port = 3000;

//implementação da regra de negócio
  const server = http.createServer((req, res) => {

    var resposta;
    const urlparse = url.parse(req.url, true);

    //receber informacoes do usuario
    const params = queryString.parse(urlparse.search);//.search pega o que tá depois da interrogação

    //criar um usuario - Atualizar um usuário
    if(urlparse.pathname == "/criar-atualizar-usuario"){//.pathname pega o que está antes da interrogação, ou seja, o comando
  
      //salvar informacoes
      fs.writeFile(`users/${params.id}.txt`, JSON.stringify(params), function (err) {//comando cria um arquivo ou sobrescreve um já existente, salva e executa uma função de sucesso ou erro,JSON.stringfy transforma um objeto em string
        if (err) throw err; //mensagem de erro caso não funcione
        console.log('Saved!'); //console caso de certo
        //retornar a resposta escolhida
        resposta = "Usuario criado/atualizado com sucesso!"
        res.statusCode = 200;//fala pro navegador que deu certo
        res.setHeader('Content-Type', 'text/plain'); //header de comunicação
        res.end(resposta);
    });
  }
  //selecionar usuario
  else if(urlparse.pathname == "/selecionar-usuario"){
    fs.readFile(`users/${params.id}.txt`, function(err, data){
      resposta = data;    
    
      //retornar a resposta escolhida
      res.statusCode = 200;//fala pro navegador que deu certo
      res.setHeader('Content-Type', 'application/json'); //header de comunicação
      res.end(resposta);
    });
  }
  //remover usuario
  else if(urlparse.pathname == "/remover-usuario"){
    fs.unlink(`users/${params.id}.txt`, function(err, data){//.unlink remover
      console.log("File Deleted!")   ; 
    
      //retornar a resposta escolhida
      resposta = err ? "Usuario nao encontrado." : "Usuario removido.";
      res.statusCode = 200;//fala pro navegador que deu certo
      res.setHeader('Content-Type', 'text/plain'); //header de comunicação
      res.end(resposta);
    });
  }
});


    


//execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//localhost:3000/criar-atualizar-usuario?nome=gessy&idade=80&id=1
//localhost:3000/selecionar-usuario?nome=gessy&idade=32&id=1
//localhost:3000/remover-usuario?nome=gessy&idade=32&id=1