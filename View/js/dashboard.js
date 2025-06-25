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

    // Seleciona os botões
    const btnNovaReceita = document.querySelector('.nova-receita');
    const btnNovaDespesa = document.querySelector('.nova-despesa');

    // Função para criar o overlay/modal
    function showModal(form) {
        let overlay = document.getElementById('modal-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0,0,0,0.5)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = 1000;
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = '';
        form.style.display = 'block';
        form.style.background = '#fff';
        form.style.padding = '2rem';
        form.style.borderRadius = '8px';
        form.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        overlay.appendChild(form);
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                form.style.display = 'none';
                overlay.style.display = 'none';
            }
        };
        overlay.style.display = 'flex';
    }

    // Cria o formulário de receita
    const formReceita = document.createElement('form');
    formReceita.className = 'modal-form';
    formReceita.innerHTML = `
        <h3>Nova Receita</h3>
        <input type="text" name="titulo" placeholder="Título" required>
        <input type="number" name="valor" placeholder="Valor" required step="0.01">
        <input type="date" name="data" required>
        <button type="submit">Salvar</button>
        <button type="button" id="cancelarReceita">Cancelar</button>
    `;
    formReceita.style.display = 'none';

    // Cria o formulário de despesa
    const formDespesa = document.createElement('form');
    formDespesa.className = 'modal-form';
    formDespesa.innerHTML = `
        <h3>Nova Despesa</h3>
        <input type="text" name="titulo" placeholder="Título" required>
        <input type="number" name="valor" placeholder="Valor" required step="0.01">
        <input type="date" name="data" required>
        <input type="text" name="status" placeholder="Status" required>
        <button type="submit">Salvar</button>
        <button type="button" id="cancelarDespesa">Cancelar</button>
    `;
    formDespesa.style.display = 'none';

    // Ação dos botões para mostrar os formulários como pop-up
    btnNovaReceita.addEventListener('click', () => {
        showModal(formReceita);
    });
    btnNovaDespesa.addEventListener('click', () => {
        showModal(formDespesa);
    });

    // Cancelar
    formReceita.querySelector('#cancelarReceita').onclick = () => {
        formReceita.style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
    };
    formDespesa.querySelector('#cancelarDespesa').onclick = () => {
        formDespesa.style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
    };

    // Submissão do formulário de receita
    formReceita.onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            titulo: formReceita.titulo.value,
            valor: parseFloat(formReceita.valor.value),
            data: formReceita.data.value
        };
        await fetch('http://localhost:3000/revenues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        formReceita.style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        window.location.reload();
    };

    // Submissão do formulário de despesa
    formDespesa.onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            titulo: formDespesa.titulo.value,
            valor: parseFloat(formDespesa.valor.value),
            data: formDespesa.data.value,
            status: formDespesa.status.value
        };
        await fetch('http://localhost:3000/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        formDespesa.style.display = 'none';
        document.getElementById('modal-overlay').style.display = 'none';
        window.location.reload();
    };

    // Adiciona os formulários ao body (fora do fluxo principal)
    document.body.appendChild(formReceita);
    document.body.appendChild(formDespesa);

    try {
        // Fetch receitas e despesas
        const headers = { 'Authorization': `Bearer ${token}` };

        const receitasResponse = await fetch('http://localhost:3000/revenues', { headers });
        const despesasResponse = await fetch('http://localhost:3000/expenses', { headers });

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
        receitasList.innerHTML = '';
        if (receitas.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="3" style="text-align:center;">Nenhuma receita cadastrada</td>`;
            receitasList.appendChild(row);
        } else {
            receitas.forEach(receita => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${receita.titulo}</td>
                    <td>R$ ${receita.valor.toFixed(2)}</td>
                    <td>${new Date(receita.data).toLocaleDateString()}</td>
                `;
                receitasList.appendChild(row);
            });
        }

        // Preencher tabela de despesas
        despesasList.innerHTML = '';
        if (despesas.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="3" style="text-align:center;">Nenhuma despesa cadastrada</td>`;
            despesasList.appendChild(row);
        } else {
            despesas.forEach(despesa => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${despesa.titulo}</td>
                    <td>R$ ${despesa.valor.toFixed(2)}</td>
                    <td>${despesa.status}</td>
                `;
                despesasList.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        alert('Erro ao carregar dados do dashboard.');
    }
});