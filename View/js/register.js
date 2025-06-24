document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = '';

    if (pass !== confirmPass) {
        errorMsg.textContent = 'As senhas não coincidem.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, pass })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login';
        } else {
            errorMsg.textContent = data.message || 'Erro ao cadastrar usuário';
        }
    } catch (err) {
        errorMsg.textContent = 'Erro de conexão com o servidor';
    }
});