const jwt = require('jsonwebtoken');
const dbUsers = require('../Model/users');
const ACCESS_SECRET = 'seu_segredo_superseguro';
const REFRESH_SECRET = 'seu_segredo_refresh';

let refreshTokens = []; 

const loginUser = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await dbUsers.selectUserEmail(email);

        if (!user || user.pass !== pass) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos' });
        }

        const accessToken = jwt.sign({ id: user.idUsers }, ACCESS_SECRET, { expiresIn: '1h' }); // Use idUsers aqui
        const refreshToken = jwt.sign({ id: user.idUsers }, REFRESH_SECRET, { expiresIn: '7d' }); // Use idUsers aqui
        console.log('Usuário logado:', user.idUsers); // Log do ID do usuário
        
        res.json({
            accessToken,
            refreshToken,
            userId: user.idUsers // Certifique-se de que o ID do usuário está sendo retornado corretamente
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Refresh token não enviado' });
    if (!refreshTokens.includes(token)) return res.status(403).json({ message: 'Refresh token inválido' });

    jwt.verify(token, REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Refresh token inválido' });
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            ACCESS_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ accessToken });
    });
};

const logoutUser = (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.json({ message: 'Logout realizado com sucesso' });
};

module.exports = { loginUser, refreshToken, logoutUser };