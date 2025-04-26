const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost', // Substitua pelo host do seu banco de dados
        user: 'root', // Substitua pelo seu usuário do banco de dados
        password: '', // Substitua pela sua senha do banco de dados
        database: 'finanflow' // Substitua pelo nome do seu banco de dados
    }
});


module.exports = db;