document.addEventListener('DOMContentLoaded', async () => {
    const saldoElement = document.getElementById('saldo');
    const receitasElement = document.getElementById('receitas');
    const despesasElement = document.getElementById('despesas');
    const receitasList = document.getElementById('receitas-list');
    const despesasList = document.getElementById('despesas-list');

    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (!token) {
        alert('Você precisa estar logado para acessar o dashboard.');
        window.location.href = '/login';
        return;
    }

    try {
        // Fetch receitas e despesas
        const receitasResponse = await fetch('http://localhost:3000/revenues');
        const despesasResponse = await fetch('http://localhost:3000/expenses');

        const receitas = await receitasResponse.json();
        const despesas = await despesasResponse.json();

        // Calcular saldo, total de receitas e despesas
        const totalReceitas = receitas.reduce((acc, receita) => acc + receita.valor, 0);
        const totalDespesas = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);
        const saldo = totalReceitas - totalDespesas;

        // Atualizar valores no dashboard
        saldoElement.textContent = `R$ ${saldo.toFixed(2)}`;
        receitasElement.textContent = `+R$ ${totalReceitas.toFixed(2)}`;
        despesasElement.textContent = `-R$ ${totalDespesas.toFixed(2)}`;

        // Preencher tabela de receitas
        receitas.forEach(receita => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${receita.titulo}</td>
                <td>R$ ${receita.valor.toFixed(2)}</td>
                <td>${new Date(receita.data).toLocaleDateString()}</td>
            `;
            receitasList.appendChild(row);
        });

        // Preencher tabela de despesas
        despesas.forEach(despesa => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${despesa.titulo}</td>
                <td>R$ ${despesa.valor.toFixed(2)}</td>
                <td>${despesa.status}</td>
            `;
            despesasList.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        alert('Erro ao carregar dados do dashboard.');
    }
});