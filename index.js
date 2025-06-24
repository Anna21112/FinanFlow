//importando os pacotes para uso no arquivo index.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const path = require('path');
const { listUsers, getUserById, updateUser, deleteUser, insertUser } = require('./Controller/controllerUser');
const { listCategories, getCategoryById, updateCategory, deleteCategory, insertCategory } = require('./Controller/controllerCategories');
const { listExpenses, getExpenseById, updateExpense, deleteExpense, insertExpense } = require('./Controller/controllerExpenses');
const { listRevenues, getRevenueById, updateRevenue, deleteRevenue, insertRevenue } = require('./Controller/controllerRevenues');
const authenticateToken = require('./Middleware/auth');
const { loginUser, refreshToken, logoutUser } = require('./Controller/controllerAuth');


//criando um servidor express

const app = express();

// aplicando as configuraçes dentro do servidor express, adicionando os pacotes

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
/* O body-parser.urlencoded() no Express.js é um middleware que analisa o corpo de uma requisição HTTP que contém dados codificados como URL. Isso é útil quando você está recebendo dados de formulários ou dados que foram enviados no formato application/x-www-form-urlencoded, que é o formato padrão para envio de dados de formulários HTML*/
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o diretório estático para servir arquivos HTML, CSS e JS
app.use(express.static(path.join(__dirname, 'View')));
// Configurando o diretório estático para servir arquivos de imagem
app.use('/images', express.static(path.join(__dirname, 'View/images')));

// Rotas públicas (sem autenticação)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/register.html'));
});

// Rota pública para exibir os Termos de Privacidade
app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/terms.html'));
});

// Rota pública para exibir o Contato
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/contact.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/dashboard.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'View/html/profile.html'));
});


app.post('/login', loginUser); // Rota para login de usuário
app.post('/refresh-token', refreshToken); // Rota para atualizar o token de acesso
app.post('/logout', logoutUser); // Rota para logout de usuário
app.post('/users', insertUser); // Rota para cadastro de usuário

// Middleware para autenticação de token
app.use(authenticateToken); // Aplicar autenticação apenas nas rotas abaixo

// Rotas protegidas para usuários
app.get('/listusers', listUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

// Rotas protegidas para categorias
app.get('/categories', listCategories);
app.get('/categories/:id', getCategoryById);
app.put('/categories/:id', updateCategory);
app.delete('/categories/:id', deleteCategory);
app.post('/categories', insertCategory);

// Rotas protegidas para despesas
app.get('/expenses', listExpenses);
app.get('/expenses/:id', getExpenseById);
app.put('/expenses/:id', updateExpense);
app.delete('/expenses/:id', deleteExpense);
app.post('/expenses', insertExpense);

// Rotas protegidas para receitas
app.get('/revenues', listRevenues);
app.get('/revenues/:id', getRevenueById);
app.put('/revenues/:id', updateRevenue);
app.delete('/revenues/:id', deleteRevenue);
app.post('/revenues', insertRevenue);

// o servidor irá rodar dentro da porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});