// Função para exibir a aba de estoque
function showEstoque() {
    // Exibe o conteúdo da aba "Estoque"
    document.getElementById("estoqueContent").classList.add("show");
    // Oculta o conteúdo da aba "Manutenção"
    document.getElementById("manutencaoContent").classList.remove("show");
    // Adiciona a classe "active" na aba "Estoque" e remove da aba "Manutenção"
    document.getElementById("estoqueTab").classList.add("active");
    document.getElementById("manutencaoTab").classList.remove("active");
}

// Função para exibir a aba de manutenção
function showManutencao() {
    // Exibe o conteúdo da aba "Manutenção"
    document.getElementById("manutencaoContent").classList.add("show");
    // Oculta o conteúdo da aba "Estoque"
    document.getElementById("estoqueContent").classList.remove("show");
    // Adiciona a classe "active" na aba "Manutenção" e remove da aba "Estoque"
    document.getElementById("manutencaoTab").classList.add("active");
    document.getElementById("estoqueTab").classList.remove("active");
}

// Event listeners para as abas
document.getElementById("estoqueTab").addEventListener("click", showEstoque);
document.getElementById("manutencaoTab").addEventListener("click", showManutencao);

// Exibir a aba de estoque ao carregar a página
window.onload = showEstoque;
