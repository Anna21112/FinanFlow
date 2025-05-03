const dbCategories = require('../Model/expenses');

const listExpenses = async (req, res) => {
    try {
        const expenses = await dbCategories.selectExpenses(); // Chama a função para selecionar as despesas do banco de dados
        if (expenses.length === 0) {
            return res.status(404).json({ message: 'Nenhuma despesa encontrada' });
        }   
        res.json(expenses); // Retorna as despesas encontradas
    } catch (error) {
        console.error('Erro ao listar despesas:', error);
        res.status(500).json({ error: 'Erro ao listar despesas' });
    }
}

const getExpenseById = async (req, res) => {
    const { id } = req.params; // Obtém o ID da despesa a partir dos parâmetros da requisição
    try {
        const expense = await dbCategories.selectExpenseById(id); // Chama a função para selecionar a despesa pelo ID
        if (!expense) {
            return res.status(404).json({ message: 'Despesa não encontrada' });
        }   
        res.json(expense); // Retorna a despesa encontrada
    } catch (error) {
        console.error('Erro ao buscar despesa:', error);
        res.status(500).json({ error: 'Erro ao buscar despesa' });
    }
}

const updateExpense = async (req, res) => {
    const { id } = req.params; // Obtém o ID da despesa a partir dos parâmetros da requisição
    const data = req.body; // Obtém os dados da despesa a serem atualizados a partir do corpo da requisição
    try {
        const updatedExpense = await dbCategories.updateExpense(id, data); // Chama a função para atualizar a despesa pelo ID
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Despesa não encontrada' });
        }   
        res.json({ message: 'Despesa atualizada com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        res.status(500).json({ error: 'Erro ao atualizar despesa' });
    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params; // Obtém o ID da despesa a ser deletada a partir dos parâmetros da requisição
    try {
        const deletedExpense = await dbCategories.deleteExpense(id); // Chama a função para deletar a despesa pelo ID
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Despesa não encontrada' });
        }   
        res.json({ message: 'Despesa deletada com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
        res.status(500).json({ error: 'Erro ao deletar despesa' });
    }
}

const insertExpense = async (req, res) => {
    const data = req.body; // Obtém os dados da nova despesa a serem inseridos a partir do corpo da requisição
    try {
        const newExpense = await dbCategories.insertExpense(data); // Chama a função para inserir a nova despesa no banco de dados
        res.status(201).json({ message: 'Despesa inserida com sucesso', id: newExpense[0] }); // Retorna uma mensagem de sucesso e o ID da nova despesa
    } catch (error) {
        console.error('Erro ao inserir despesa:', error);
        res.status(500).json({ error: 'Erro ao inserir despesa' });
    }
}

module.exports = {
    listExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    insertExpense
}
