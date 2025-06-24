document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = '';

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pass })
        });

        const data = await response.json();
        if (response.ok) {
            const { accessToken, refreshToken, userId } = data; // Certifique-se de que o backend retorna o userId
            if (document.getElementById('remember').checked) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', userId); // Salva o ID do usuário
            } else {
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('userId', userId); // Salva o ID do usuário
            }
            window.location.href = '/dashboard';
        } else {
            errorMsg.textContent = data.message || 'Erro ao fazer login';
        }
    } catch (err) {
        errorMsg.textContent = 'Erro de conexão com o servidor';
    }
});