function executarSistema() {
    try {
        // Dados de entrada
        const inputNome = document.getElementById("inputNome");
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

        btn.disable = true;
        btn.innerText = "Processando...";

        // trim() remove os valores em branco
        const nome = inputNome.value.trim().toUpperCase();
        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
            msg.innerText = "O nome deve conter apenas letras e espaços.";
            msg.style.color = "#ff4444";
            return;
        }
        const idade = parseInt(inputIdade.value);
        if (idade > 150) {
            msg.innerText = "A idade máxima permitida é 150 anos.";
            msg.style.color = "#ff4444";
            return;
        }
        const valor = parseFloat(
            inputValor.value
                .replace("R$ ", "")
                .replace(/\./g, "")
                .replace(",", ".")
        );
        const cupom = inputCupom.value === "true";
        const data = inputData.value.trim();
        const hora = inputHora.value.trim();

        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor) || !data || !hora) {
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

function formatarData() {
    let elemento = document.getElementById("inputData");
    let valor = elemento.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita a 8 dígitos (ddmmaaaa)
    valor = valor.substring(0, 8);

    // Valida o dia
    if (valor.length >= 2) {
        let dia = parseInt(valor.substring(0, 2));

        if (dia > 31) {
            dia = 31;
        }

        valor = dia.toString().padStart(2, "0") + valor.substring(2);
    }

    // Valida o mês
    if (valor.length >= 4) {
        let dia = valor.substring(0, 2);
        let mes = parseInt(valor.substring(2, 4));

        if (mes > 12) {
            mes = 12;
        }

        valor = dia + mes.toString().padStart(2, "0") + valor.substring(4);
    }

    // Formata para DD/MM/AAAA
    if (valor.length > 4) {
        valor = valor.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d+)/, "$1/$2");
    }

    elemento.value = valor;
}

function formatarHora() {
    let elemento = document.getElementById("inputHora");
    let valor = elemento.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    // Limita a 4 dígitos
    valor = valor.substring(0, 4);

    // Se tiver pelo menos 2 dígitos, verifica as horas
    if (valor.length >= 2) {
        let horas = parseInt(valor.substring(0, 2));

        if (horas > 23) {
            horas = 23;
        }

        valor = horas.toString().padStart(2, "0") + valor.substring(2);
    }

    // Se tiver 4 dígitos, verifica os minutos
    if (valor.length === 4) {
        let horas = valor.substring(0, 2);
        let minutos = parseInt(valor.substring(2, 4));

        if (minutos > 59) {
            minutos = 59;
        }

        valor = horas + minutos.toString().padStart(2, "0");
    }

    // Formata para HH:MM
    if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d+)/, "$1:$2");
    }

    elemento.value = valor;
}