function executarSistema()
{
    const nome = document.getElementById("inputNome").value;
    const idade = parseInt(document.getElementById("inputIdade").value);
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    // dados de saida
    const msg = document.getElementById("mensagem-autorizacao");
    const lista = document.getElementById("lista-estoque");
    const relatorio = document.getElementById("relatorio-final");

    // validacoa para campos vazios
    if (!nome || isNaN(idade) || isNaN(valor))
    {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // regra de negocio
    if(idade >= 16)
    {
        msg.innerText = `Venda autorixa: ${nome}`;
        msg.style.color = "#00ff88"; 
    
        // desconto
        let valorFinal = (valor > 500 || cupom ) ? valor * 0.85 : valor;

        // estoque
        let estoque = ("Placa de Video", "Processador", "Memoria RAM");
        lista.innerHTML = ""; // limpa a lista anterior
    }

    
}