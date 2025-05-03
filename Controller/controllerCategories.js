const dbCategories = require('../Model/categories');

const listCategories = async (req, res) => {
    try {
        const categories = await dbCategories.selectCategories(); // Chama a função para selecionar as categorias do banco de dados
        if (categories.length === 0) {
            return res.status(404).json({ message: 'Nenhuma categoria encontrada' });
        }   
        res.json(categories); // Retorna as categorias encontradas
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ error: 'Erro ao listar categorias' });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params; // Obtém o ID da categoria a partir dos parâmetros da requisição
    try {
        const category = await dbCategories.selectCategoryById(id); // Chama a função para selecionar a categoria pelo ID
        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }   
        res.json(category); // Retorna a categoria encontrada
    } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params; // Obtém o ID da categoria a partir dos parâmetros da requisição
    const data = req.body; // Obtém os dados da categoria a serem atualizados a partir do corpo da requisição
    try {
        const updatedCategory = await dbCategories.updateCategory(id, data); // Chama a função para atualizar a categoria pelo ID
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }   
        res.json({ message: 'Categoria atualizada com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params; // Obtém o ID da categoria a ser deletada a partir dos parâmetros da requisição
    try {
        const deletedCategory = await dbCategories.deleteCategory(id); // Chama a função para deletar a categoria pelo ID
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }   
        res.json({ message: 'Categoria deletada com sucesso' }); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
}

const insertCategory = async (req, res) => {
    const data = req.body; // Obtém os dados da nova categoria a serem inseridos a partir do corpo da requisição
    try {
        const newCategory = await dbCategories.insertCategory(data); // Chama a função para inserir a nova categoria no banco de dados
        res.status(201).json({ message: 'Categoria criada com sucesso', id: newCategory[0] }); // Retorna uma mensagem de sucesso e o ID da nova categoria
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro ao criar categoria' });
    }
}

module.exports = {
    listCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    insertCategory
}