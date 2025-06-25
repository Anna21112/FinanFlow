
const dbUsers = require('../Model/users.js'); // Importando o arquivo de conexão com o banco de dados



const listUsers = async (req, res) => {
    try {
        const users = await dbUsers.selectUsers(); // Chama a função para selecionar os usuários do banco de dados
        if (users.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }   
        res.json(users); // Retorna os usuários encontrados
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro ao listar usuários' });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário a partir dos parâmetros da requisição
    try {
        const user = await dbUsers.selectUserById(id); // Chama a função para selecionar o usuário pelo ID
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }   
        res.json(user); // Retorna o usuário encontrado
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário a partir dos parâmetros da requisição
    const data = req.body; // Obtém os dados do usuário a serem atualizados a partir do corpo da requisição
    try {
        const updatedUser = await dbUsers.updateUser(id, data); // Chama a função para atualizar o usuário pelo ID
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }   
        res.json({ message: 'Usuário atualizado com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params; // Obtém o ID do usuário a ser deletado a partir dos parâmetros da requisição
    try {
        const deletedUser = await dbUsers.deleteUser(id); // Chama a função para deletar o usuário pelo ID
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }   
        res.json({ message: 'Usuário deletado com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
}

const insertUser = async (req, res) => {
    const { email, name, pass } = req.body; // Obtém os dados do novo usuário
    try {
        // Verifica se o e-mail já existe
        const existingUser = await dbUsers.selectUserEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado. Por favor, use outro e-mail.' });
        }

        // Insere o novo usuário
        const newUser = await dbUsers.insertUser({ email, name, pass });
        res.status(201).json({ message: 'Usuário inserido com sucesso', userId: newUser[0] });
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
        res.status(500).json({ error: 'Erro ao inserir usuário' });
    }
};


// Exportando as funções para serem utilizadas em outros arquivos
module.exports = {
    listUsers,
    getUserById,
    updateUser,
    deleteUser,
    insertUser
}
