function executarSistema() {
    try {
        // Dados de entrada
        const inputNome = document.getElementById("inputNome").value.toUpperCase();
        const inputIdade = document.getElementById("inputIdade");
        const inputValor = document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom");
        const inputData = document.getElementById("inputData");
        const inputHora = document.getElementById("inputHora");

        // Dados de saída
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnFinalizar");

        btn.disabled = true;
        btn.innerText = "Processando...";

        // trim() remove os valores em branco
        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";
        const data = inputData.value.trim();
        const hora = inputHora.value.trim();

        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Preencha todos os campos corretamente!";
            msg.style.color = "#ff4444";
            return;
        }

        // Regra de negócio
        if (idade >= 16) {
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#00ff88";

            // Desconto
            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            // Estoque
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = ""; // Limpa a lista anterior

            // forEach: Percorre um array e aplica uma ação para cada elemento
            estoque.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li); // usado para adicionar um novo elemento ou texto
            });

            // Relatório
            relatorio.style.display = "block";
            relatorio.innerHTML = `
            <strong> RESUMO DO PEDIDO <\strong><br>
            Cliente: ${nome} <br>
            Data: ${data} <br>
            Hora: ${hora} <br>
            Total Original: R$ ${valor.toFixed(2)} <br>
            <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} <\strong>
        `;
        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = "";
        }
    } catch (error) {

    }
}

function formatarMoeda() {
    let elemento = document.getElementById('inputValor');
    let valor = elemento.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Se estiver vazio
    if (valor === '') {
        elemento.value = 'R$ ';
        return;
    }

    // Converte para centavos
    valor = (parseInt(valor) / 100).toFixed(2);

    // Formata para padrão brasileiro
    valor = valor.replace('.', ',');
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    elemento.value = 'R$ ' + valor;
}