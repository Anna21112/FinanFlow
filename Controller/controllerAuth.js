const jwt = require('jsonwebtoken');
const dbUsers = require('../Model/users');
const ACCESS_SECRET = 'seu_segredo_superseguro';
const REFRESH_SECRET = 'seu_segredo_refresh';

let refreshTokens = []; 

const loginUser = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const users = await dbUsers.selectUsers();
        const foundUser = users.find(u => u.email === email && u.pass === pass);
        if (!foundUser) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos' });
        }
        const accessToken = jwt.sign(
            { id: foundUser.idUsers, email: foundUser.email },
            ACCESS_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { id: foundUser.idUsers, email: foundUser.email },
            REFRESH_SECRET,
            { expiresIn: '7d' }
        );
        refreshTokens.push(refreshToken); // Salva o refresh token
        res.json({ accessToken, refreshToken });
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