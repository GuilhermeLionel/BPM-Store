// Função para exibir a aba de estoque
function showEstoque() {
    document.getElementById("estoqueContent").style.display = "block";
    document.getElementById("manutencaoContent").style.display = "none";
    document.getElementById("estoqueTab").classList.add("active");
    document.getElementById("manutencaoTab").classList.remove("active");
}

// Função para exibir a aba de manutenção
function showManutencao() {
    document.getElementById("manutencaoContent").style.display = "block";
    document.getElementById("estoqueContent").style.display = "none";
    document.getElementById("manutencaoTab").classList.add("active");
    document.getElementById("estoqueTab").classList.remove("active");
}

// Event listeners para as abas
document.getElementById("estoqueTab").addEventListener("click", showEstoque);
document.getElementById("manutencaoTab").addEventListener("click", showManutencao);

// Inicia com a aba de estoque
showEstoque();

// Mostrar formulário de Adicionar Item
document.getElementById("adicionarItemBtn").addEventListener("click", function() {
    document.getElementById("formEstoque").style.display = "block";
});

// Mostrar formulário de Adicionar Manutenção
document.getElementById("adicionarManutencaoBtn").addEventListener("click", function() {
    document.getElementById("formManutencao").style.display = "block";
});

// Adicionar Item ao Estoque
document.getElementById("formAdicionarItem").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nomeItem = document.getElementById("nomeItem").value;
    const quantidadeItem = document.getElementById("quantidadeItem").value;
    const precoItem = document.getElementById("precoItem").value;

    const listaEstoque = document.getElementById("lista-estoque");
    const item = document.createElement("li");
    
    const itemId = new Date().getTime();
    item.setAttribute('data-id', itemId);
    
    item.innerHTML = `
        ${nomeItem} - Quantidade: <span class="quantidade">${quantidadeItem}</span> - Preço: R$${precoItem}
        <div class="control-buttons">
            <button class="quantidade-btn" onclick="alterarQuantidade(this, 'incrementar')">+</button>
            <button class="quantidade-btn" onclick="alterarQuantidade(this, 'decrementar')">-</button>
            <button class="editar-btn" onclick="editarItem(this)">Editar</button>
            <button class="excluir-btn" onclick="excluirItem(this)">Excluir</button>
        </div>
    `;

    listaEstoque.appendChild(item);

    document.getElementById("formAdicionarItem").reset();
    document.getElementById("formEstoque").style.display = "none";
});

// Função para alterar a quantidade do item
function alterarQuantidade(button, acao) {
    const item = button.closest("li");
    const quantidadeElement = item.querySelector(".quantidade");
    let quantidade = parseInt(quantidadeElement.textContent);

    if (acao === 'incrementar') {
        quantidade++;
    } else if (acao === 'decrementar' && quantidade > 0) {
        quantidade--;
    }

    quantidadeElement.textContent = quantidade;
}

// Função para editar o item
function editarItem(button) {
    const item = button.closest("li");
    
    const nomeItem = item.querySelector("span").previousSibling.nodeValue.trim();
    const quantidadeItem = item.querySelector(".quantidade").textContent;
    const precoItem = item.querySelector("span").nextSibling.nodeValue.trim();
    
    document.getElementById("nomeItem").value = nomeItem;
    document.getElementById("quantidadeItem").value = quantidadeItem;
    document.getElementById("precoItem").value = precoItem;
    
    document.getElementById("formAdicionarItem").setAttribute('data-edit-id', item.getAttribute('data-id'));

    document.getElementById("formEstoque").style.display = "block";

    document.getElementById("formAdicionarItem").onsubmit = function(event) {
        event.preventDefault();
        
        const itemId = document.getElementById("formAdicionarItem").getAttribute('data-edit-id');
        const itemToEdit = document.querySelector(`li[data-id='${itemId}']`);
        
        itemToEdit.querySelector("span").textContent = document.getElementById("quantidadeItem").value;
        itemToEdit.innerHTML = itemToEdit.innerHTML.replace(new RegExp(nomeItem, 'g'), document.getElementById("nomeItem").value);
        itemToEdit.innerHTML = itemToEdit.innerHTML.replace(new RegExp(precoItem, 'g'), `R$${document.getElementById("precoItem").value}`);
        
        document.getElementById("formAdicionarItem").reset();
        document.getElementById("formAdicionarItem").removeAttribute('data-edit-id');
        document.getElementById("formEstoque").style.display = "none";
    };
}

// Função para excluir o item
function excluirItem(button) {
    const item = button.closest("li");
    item.remove();
}

// Adicionar Manutenção
document.getElementById("formAdicionarManutencao").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nomeAparelho = document.getElementById("nomeAparelho").value;
    const statusManutencao = document.getElementById("statusManutencao").value;
    const quemMexeu = document.getElementById("quemMexeu").value;
    const comentario = document.getElementById("comentario").value;

    const listaManutencao = document.getElementById("lista-manutencao");
    const manutencao = document.createElement("li");
    manutencao.setAttribute("data-id", new Date().getTime());
    
    manutencao.innerHTML = `
        ${nomeAparelho} - Status: ${statusManutencao} 
        <br>Quem mexeu: ${quemMexeu}
        <br>Comentário: ${comentario}
        <div class="control-buttons">
            <button class="novo-comentario-btn" onclick="novoComentario(this)">Novo Comentário</button>
        </div>
    `;
    listaManutencao.appendChild(manutencao);

    document.getElementById("formAdicionarManutencao").reset();
    document.getElementById("formManutencao").style.display = "none";
});

// Função para adicionar novo comentário
function novoComentario(button) {
    const manutencaoItem = button.closest("li");
    const novoComentarioForm = document.createElement("form");
    
    novoComentarioForm.innerHTML = `
        <label for="quemMexeu">Quem mexeu:</label>
        <input type="text" id="quemMexeu" required>
        <label for="comentario">Novo comentário:</label>
        <textarea id="comentario" required></textarea>
        <button type="submit">Adicionar Comentário</button>
    `;

    novoComentarioForm.onsubmit = function(event) {
        event.preventDefault();

        const quemMexeu = document.getElementById("quemMexeu").value;
        const comentario = document.getElementById("comentario").value;

        const comentarioItem = document.createElement("p");
        comentarioItem.innerHTML = `<strong>Quem mexeu:</strong> ${quemMexeu} <br><strong>Comentário:</strong> ${comentario}`;

        manutencaoItem.appendChild(comentarioItem);
        novoComentarioForm.reset();
        manutencaoItem.querySelector(".control-buttons").removeChild(button);
    };

    manutencaoItem.appendChild(novoComentarioForm);
}
