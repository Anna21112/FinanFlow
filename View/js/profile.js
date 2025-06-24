document.getElementById('profileForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId'); // Obtém o ID do usuário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const alerts = document.getElementById('alerts').checked;

    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (!token) {
        alert('Você precisa estar logado para acessar o dashboard.');
        window.location.href = '/login';
        return;
    }

    if (!userId) {
        alert('ID do usuário não encontrado. Faça login novamente.');
        window.location.href = '/login';
        return;
    }

    if (password && password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const body = { name, email}; // Remova o campo `password` se ele não for necessário
if (password) {
    body.password = password; // Adicione apenas se o campo `password` for preenchido
}

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert('Alterações salvas com sucesso!');
        } else {
            const data = await response.json();
            alert(data.message || 'Erro ao salvar alterações.');
        }
    } catch (err) {
        alert('Erro de conexão com o servidor.');
    }
});

document.getElementById('deleteAccount').addEventListener('click', async function (e) {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId'); // Obtém o ID do usuário
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (!token) {
        alert('Você precisa estar logado para acessar o dashboard.');
        window.location.href = '/login';
        return;
    }

    if (confirm('Tem certeza que deseja excluir sua conta?')) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Conta excluída com sucesso!');
                window.location.href = '/register';
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao excluir conta.');
            }
        } catch (err) {
            alert('Erro de conexão com o servidor.');
        }
    }
});