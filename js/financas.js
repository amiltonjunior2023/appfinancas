function adicionarItem() {
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("data").value = "";
    alert('Adionado com sucesso')


    if (descricao && !isNaN(valor) && data) {
        const item = { descricao, valor, data };
        const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
        listaItens.push(item);
        localStorage.setItem("listaItens", JSON.stringify(listaItens));
        atualizarLista();
    } else {
        alert("Preencha todos os campos corretamente.");
    }


}

// Função para atualizar a lista de itens
function atualizarLista() {
    const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
    const listaItensElement = document.getElementById("lista-itens");
    listaItensElement.innerHTML = "";

    listaItens.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.descricao} - R$ ${item.valor.toFixed(2)} - ${item.data}`;
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.onclick = () => removerItem(index);
        li.appendChild(removerBtn);
        listaItensElement.appendChild(li);
    });
}

// Função para remover um item da lista
function removerItem(index) {
    const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
    listaItens.splice(index, 1);
    localStorage.setItem("listaItens", JSON.stringify(listaItens));
    atualizarLista();
    alert( 'Excluido com sucesso')
}

// Função para filtrar itens por data
function filtrarPorData() {
    const dataFiltro = document.getElementById("data").value;
    const listaItens = JSON.parse(localStorage.getItem("listaItens")) || [];
    const listaFiltrada = listaItens.filter(item => item.data === dataFiltro);
    const listaItensElement = document.getElementById("lista-itens");
    listaItensElement.innerHTML = "";

    listaFiltrada.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.descricao} - R$ ${item.valor.toFixed(2)} - ${item.data}`;
        
        // Criar o botão de remover
        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.classList.add("remover-btn"); // Adicionar a classe personalizada
        removerBtn.onclick = () => removerItem(index);
        
        // Adicionar o botão à lista
        li.appendChild(removerBtn);
        
        // Adicionar a lista ao elemento
        listaItensElement.appendChild(li);
    
    
    });
}

// Função para limpar o filtro
function limparFiltro() {
    document.getElementById("data").value = "";
    document.getElementById("valor").value = "";
     document.getElementById("descricao").value = "";
    atualizarLista();
}




// Carregar a lista inicial ao carregar a página
atualizarLista();

document.addEventListener('DOMContentLoaded', function () {
  const textElement = document.getElementById('welcome-text');
  const text = 'Seja bem-vindo a Lista de Finanças';
  let index = 0;

  function type() {
    textElement.textContent += text[index];
    index++;

    if (index < text.length) {
      setTimeout(type, 300); // Adjust the speed (in milliseconds) of typing
    }
  }

  type();
});