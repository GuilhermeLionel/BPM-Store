// Função para adicionar um item ao estoque
function adicionarItem() {
    db.collection("estoque").add({
        nome: "Peça Teste",
        quantidade: 10,
        preco: 50
    }).then(() => {
        console.log("Item adicionado!");
        carregarEstoque();
    }).catch(error => console.error("Erro ao adicionar:", error));
}

// Função para carregar os itens do estoque
function carregarEstoque() {
    const lista = document.getElementById("lista-estoque");
    lista.innerHTML = "";

    db.collection("estoque").get().then(snapshot => {
        snapshot.forEach(doc => {
            let item = document.createElement("li");
            item.textContent = ${doc.data().nome} - Quantidade: ${doc.data().quantidade} - Preço: R$${doc.data().preco};
            lista.appendChild(item);
        });
    });
}

// Carregar os dados ao abrir a página
window.onload = carregarEstoque;