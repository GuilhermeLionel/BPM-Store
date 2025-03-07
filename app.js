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
  