const db = require('./conn.js'); // Importando o arquivo de conexão com o banco de dados


// Função para selecionar todos os usuários do banco de dados
async function selectUsers() {
    try {
        const result = await db('users').select('*');
        return(result);
    } catch (error) {
        console.error('Erro ao selecionar dados:', error);
    }
}

// Função para buscar um usuário pelo ID
async function selectUserById(id) {
    try {
        const result = await db('users').where('idUsers', id).first();
        return result;
    } catch (error) {
        console.error('Erro ao selecionar usuário:', error);
    }
}

// Função para atualizar um usuário pelo ID
async function updateUser(id, data) {
    try {
        const result = await db('users').where('idUsers', id).update(data);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
    }
}

// Função para deletar um usuário pelo ID
async function deleteUser(id) {
    try {
        const result = await db('users').where('idUsers', id).del();
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
    }
}

// Função para inserir um novo usuário no banco de dados
async function insertUser(data) {
    try {
        const result = await db('users').insert(data);
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
    }
}

const selectUserByEmail = async (emailLogado) => {
    try {
        const user = await db('users').where({ email: emailLogado }).first(); // Retorna o primeiro usuário encontrado com o e-mail
        if (!user) {
            return null; // Retorna null se nenhum usuário for encontrado
        }
        return { ...user }; // Converte o RowDataPacket para um objeto simples
    } catch (error) {
        console.error('Erro ao buscar usuário por e-mail:', error);
        throw error;
    }
};

module.exports = {
    selectUsers,
    selectUserById,
    selectUserByEmail, // Adicione esta função ao export
    updateUser,
    deleteUser,
    insertUser
};