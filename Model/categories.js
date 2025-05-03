const db = require('./conn.js');

//Lista todas as categorias do banco de dados
async function selectCategories(){
    try {
        const result = await db('categories').select('*');
        return(result);
    } catch (error) {
        console.error('Erro ao selecionar dados:', error);
    }
}

//Busca uma categoria pelo id
async function selectCategoryById(id) {
    try {
        const result = await db('categories').where('idCategories', id).first();
        return result;
    } catch (error) {
        console.error('Erro ao selecionar categoria:', error);
    }
}

//Edita uma categoria pelo id
async function updateCategory(id, data) {
    try {
        const result = await db('categories').where('idCategories', id).update(data);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
    }
}

//Deleta uma categoria pelo id
async function deleteCategory(id) {
    try {
        const result = await db('categories').where('idCategories', id).del();
        return result;
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
    }
}

//Insere uma nova categoria no banco de dados
async function insertCategory(data) {
    try {
        const result = await db('categories').insert(data);
        return result;
    } catch (error) {
        console.error('Erro ao inserir categoria:', error);
    }
}

module.exports = {
    selectCategories,
    selectCategoryById,
    updateCategory,
    deleteCategory,
    insertCategory
};