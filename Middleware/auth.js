const jwt = require('jsonwebtoken');
const SECRET = 'seu_segredo_superseguro';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;