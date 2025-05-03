const db = require('./conn.js');

const selectExpenses = async () => {
    try {
        const result = await db('expenses').select('*');
        return(result);
    } catch (error) {
        console.error('Erro ao selecionar dados:', error);
    }
}

const selectExpenseById = async (id) => {
    try {
        const result = await db('expenses').where('idExpenses', id).first();
        return result;
    } catch (error) {
        console.error('Erro ao selecionar despesa:', error);
    }
}

const updateExpense = async (id, data) => {
    try {
        const result = await db('expenses').where('idExpenses', id).update(data);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
    }
}

const deleteExpense = async (id) => {
    try {
        const result = await db('expenses').where('idExpenses', id).del();
        return result;
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
    }
}

const insertExpense = async (data) => {
    try {
        const result = await db('expenses').insert(data);
        return result;
    } catch (error) {
        console.error('Erro ao inserir despesa:', error);
    }
}

module.exports = {
    selectExpenses,
    selectExpenseById,
    updateExpense,
    deleteExpense,
    insertExpense
}
