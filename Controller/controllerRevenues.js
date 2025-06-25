const dbRevenues = require('../Model/revenues');

// Lista todas as receitas do banco de dados
const listRevenues = async (req, res) => {
    try {
        const revenues = await dbRevenues.selectRevenues();
        res.json(revenues); // Sempre retorna array, mesmo vazio
    } catch (error) {
        console.error('Erro ao listar receitas:', error);
        res.status(500).json({ error: 'Erro ao listar receitas' });
    }
}

//Busca uma receita pelo id
const getRevenueById = async (req, res) => {
    const { id } = req.params; // Obtém o ID da receita a partir dos parâmetros da requisição
    try {
        const revenue = await dbRevenues.selectRevenueById(id); // Chama a função para selecionar a receita pelo ID
        if (!revenue) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }   
        res.json(revenue); // Retorna a receita encontrada
    } catch (error) {
        console.error('Erro ao buscar receita:', error);
        res.status(500).json({ error: 'Erro ao buscar receita' });
    }
}

// Edita uma receita pelo id
const updateRevenue = async (req, res) => {
    const { id } = req.params; // Obtém o ID da receita a partir dos parâmetros da requisição
    const data = req.body; // Obtém os dados da receita a serem atualizados a partir do corpo da requisição
    try {
        const updatedRevenue = await dbRevenues.updateRevenue(id, data); // Chama a função para atualizar a receita pelo ID
        if (!updatedRevenue) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }   
        res.json({ message: 'Receita atualizada com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        res.status(500).json({ error: 'Erro ao atualizar receita' });
    }
}

// Deleta uma receita pelo id
const deleteRevenue = async (req, res) => {
    const { id } = req.params; // Obtém o ID da receita a ser deletada a partir dos parâmetros da requisição
    try {
        const deletedRevenue = await dbRevenues.deleteRevenue(id); // Chama a função para deletar a receita pelo ID
        if (!deletedRevenue) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }   
        res.json({ message: 'Receita deletada com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao deletar receita:', error);
        res.status(500).json({ error: 'Erro ao deletar receita' });
    }
}

// Insere uma nova receita no banco de dados
const insertRevenue = async (req, res) => {
    const data = req.body; // Obtém os dados da nova receita a serem inseridos a partir do corpo da requisição
    try {
        const newRevenue = await dbRevenues.insertRevenue(data); // Chama a função para inserir a nova receita no banco de dados
        res.status(201).json({ message: 'Receita inserida com sucesso', id: newRevenue[0] }); // Retorna uma mensagem de sucesso e o ID da nova receita
    } catch (error) {
        console.error('Erro ao inserir receita:', error);
        res.status(500).json({ error: 'Erro ao inserir receita' });
    }
}

module.exports = {
    listRevenues,
    getRevenueById,
    updateRevenue,
    deleteRevenue,
    insertRevenue
}