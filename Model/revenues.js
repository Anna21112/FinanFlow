const db = require('./conn.js')

//Lista todas as receitas do banco de dados
async function selectRevenues(){
    try {
        const result = await db('revenues').select('*');
        return(result);
    } catch (error) {
        console.error('Erro ao selecionar dados:', error);
    }
}

//Busca uma receita pelo id
async function selectRevenueById(id) {
    try {
        const result = await db('revenues').where('idRevenues', id).first();
        return result;
    } catch (error) {
        console.error('Erro ao selecionar receita:', error);
    }
}

//Edita uma receita pelo id
async function updateRevenue(id, data) {
    try {
        const result = await db('revenues').where('idRevenues', id).update(data);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
    }
}

//Deleta uma receita pelo id
async function deleteRevenue(id) {
    try {
        const result = await db('revenues').where('idRevenues', id).del();
        return result;
    } catch (error) {
        console.error('Erro ao deletar receita:', error);
    }
}

//Insere uma nova receita no banco de dados
async function insertRevenue(data) {
    try {
        const result = await db('revenues').insert(data);
        return result;
    } catch (error) {
        console.error('Erro ao inserir receita:', error);
    }
}


module.exports = {
    selectRevenues,
    selectRevenueById,
    updateRevenue,
    deleteRevenue,
    insertRevenue
};