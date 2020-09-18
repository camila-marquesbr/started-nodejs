/*primeiro
init npm no terminal 
npm install express*/


//importar o express
const express = require('express')

//"pegar o body e dar um PArse para JSON"
const bodyParser = require('body-parser')

//criar a variável APP que usa Express para iniciar nosso servidor
const app = express();

app.use(bodyParser.json())

//subindo nosso servidor
//definindo uma porta
//PORT é uma variável para definir uma porta para subir a aplicação
const PORT = 8080

app.use(function(req, res, next){
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Headers", "*");
    res.header("Acess-Control-Allow-Methods", "*");
    next();

});

//pegar o app com o comando .listen e subir o servidor
//o listen recebe dois parametros
const listenFunction = () => console.log('servidor funcionando')

app.listen(PORT,listenFunction)


//criando a primeira API que vai retornar dados = GET
//URL com cadastro de livreos
 const books = [
        {
            name:"Harry Poter",
            autor: "JK",
            id:"1"
        }
    ]

        const listBooks = (request, response)=>{
        return response.status(200).send(books)
    }
//quando a gente manda um POST, a gente manda o que a gente quer salvar
const createBook = (request, response) =>{
    const book = request.body
    console.log('BOOK', book)
    books.push(book)

    //validação nome do livro (Sempre mandar o nome do livro)
    if(book.name && book.autor && book.id){
        return response.status(201).send({message: 'Livro Cadastrado com Sucesso!'})
    }else{
        return response.status(400).send({message: 'Falta enviar o body corretamente'})
    } 
}


const deleteBook = (request, response) =>{
    const id = request.params.id
    console.log('id', id)
    const isFoundBook = false
    books.find((element, index)=>{
          if(element.id == id){
            isFoundBook = true
            books.splice(index, 1)
        }
    })
}

    if (id) {
        return response.status(201).send({message: 'livro Excluído com sucesso'})
    }else{
        return response.status(400).send({message: 'Livro não encontrado'})
    }
     
}    

const updatebook = (request, response) =>{
    const id = request.params.id
    if(id){
        return response.status(201).send({message: 'Livro excluido com sucesso'})
    }else{
        return response.status(400).send({message: 'Falta enviar o id na url'})
    }
}

app.get("/book", listBooks)

//API para cadastro de um livro POST para mandar dados para o servidor
app.post('/book', createBook)

//API de deletar (caso precisa deletar um livro)
app.delete('/book/:id', deleteBook)
//localhost:8080/book/1

//atualizar um dado
app.put('/book/:id', updatebook)


/*method= são verbos que enviamos no nosso request que indicam qual ação vai ser executada.

method get

GET = significa que vamos retornar dados do servidor 

GET 
POST - CADASTRO DE USUARIO - mandar dados para o servidor 
PUT - Quando queremos atualizar um dado (um registro que já existe)
DELETE - Quando queremos deletar um dado (por exemplo: excluir um repositório do github)
PATCH - atualizar parcialmente um determinado recurso

response = status code = servidor respondendo para o nosso cliente o status

sucesso ou falha na aquisição

200- um GET foi bem sucedido
201 - O dado é criado com sucesso (cadastro usando POST)
404- Erro no servidor
400 - erro no servidor
500 - Ocorre algum erro inesperado

REST  - usar cada coisa do jeito certo( boas práticas)*/ 