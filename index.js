//importando os pacotes para uso no arquivo index.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const { listUsers, getUserById, updateUser, deleteUser, insertUser } = require('./Controller/controllerUser');
const { listCategories, getCategoryById, updateCategory, deleteCategory, insertCategory } = require('./Controller/controllerCategories');
const { listExpenses, getExpenseById, updateExpense, deleteExpense, insertExpense } = require('./Controller/controllerExpenses');
const { listRevenues, getRevenueById, updateRevenue, deleteRevenue, insertRevenue } = require('./Controller/controllerRevenues');
const authenticateToken = require('./middleware/auth');
const { loginUser, refreshToken, logoutUser } = require('./Controller/controllerAuth');


//criando um servidor express

const app = express();

// aplicando as configuraçes dentro do servidor express, adicionando os pacotes

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
/* O body-parser.urlencoded() no Express.js é um middleware que analisa o corpo de uma requisição HTTP que contém dados codificados como URL. Isso é útil quando você está recebendo dados de formulários ou dados que foram enviados no formato application/x-www-form-urlencoded, que é o formato padrão para envio de dados de formulários HTML*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateToken);

//ROUTES USERS
app.get('/listusers', listUsers); // Rota para listar todos os usuários
app.get('/users/:id', getUserById); // Rota para obter um usuário específico pelo ID
app.put('/users/:id', updateUser); // Rota para atualizar um usuário específico pelo ID
app.delete('/users/:id', deleteUser); // Rota para deletar um usuário específico pelo ID
app.post('/users', insertUser); // Rota para inserir um novo usuário

//ROUTES CATEGORIES
app.get('/categories', listCategories); // Rota para listar todas as categorias
app.get('/categories/:id', getCategoryById); // Rota para obter uma categoria específica pelo ID
app.put('/categories/:id', updateCategory); // Rota para atualizar uma categoria específica pelo ID
app.delete('/categories/:id', deleteCategory); // Rota para deletar uma categoria específica pelo ID
app.post('/categories', insertCategory); // Rota para inserir uma nova categoria

//ROUTES EXPENSES
app.get('/expenses', listExpenses); // Rota para listar todas as despesas
app.get('/expenses/:id', getExpenseById); // Rota para obter uma despesa específica pelo ID
app.put('/expenses/:id', updateExpense); // Rota para atualizar uma despesa específica pelo ID
app.delete('/expenses/:id', deleteExpense); // Rota para deletar uma despesa específica pelo ID
app.post('/expenses', insertExpense); // Rota para inserir uma nova despesa

//ROUTES REVENUES
app.get('/revenues', listRevenues); // Rota para listar todas as receitas
app.get('/revenues/:id', getRevenueById); // Rota para obter uma receita específica pelo ID
app.put('/revenues/:id', updateRevenue); // Rota para atualizar uma receita específica pelo ID
app.delete('/revenues/:id', deleteRevenue); // Rota para deletar uma receita específica pelo ID
app.post('/revenues', insertRevenue); // Rota para inserir uma nova receita

//ROUTES AUTH
app.post('/login', loginUser); // Rota para login de usuário
app.post('/refresh-token', refreshToken); // Rota para atualizar o token de acesso
app.post('/logout', logoutUser); // Rota para logout de usuário

// o servidor irá rodar dentro da porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
}   );

