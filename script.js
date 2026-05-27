const produtos = [
    {
      id: 1,
      nome: "Mouse Gamer RGB",
      preco: 99.90,
      imagem: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      nome: "Teclado Mecânico",
      preco: 199.90,
      imagem: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      nome: "Headset Gamer",
      preco: 149.90,
      imagem: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 4,
      nome: "Monitor Full HD",
      preco: 799.90,
      imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 5,
      nome: "Webcam HD",
      preco: 129.90,
      imagem: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 6,
      nome: "Caixa de Som Bluetooth",
      preco: 179.90,
      imagem: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop"
    }
  ];
  
  function pegarCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
  }
  
  function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
  
  function adicionarProduto(id) {
    let carrinho = pegarCarrinho();
    const produto = produtos.find(p => p.id === id);
  
    const itemExistente = carrinho.find(item => item.id === id);
  
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
  
    salvarCarrinho(carrinho);
    alert(`${produto.nome} foi adicionado ao carrinho!`);
    atualizarContador();
  }
  
  function removerProduto(id) {
    let carrinho = pegarCarrinho();
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho(carrinho);
    mostrarCarrinho();
    atualizarContador();
  }
  
  function limparCarrinho() {
    localStorage.removeItem("carrinho");
    mostrarCarrinho();
    atualizarContador();
  }
  
  function mostrarCarrinho() {
    const areaCarrinho = document.getElementById("area-carrinho");
    const resumo = document.getElementById("resumo-carrinho");
  
    if (!areaCarrinho) return;
  
    const carrinho = pegarCarrinho();
    areaCarrinho.innerHTML = "";
  
    if (carrinho.length === 0) {
      areaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
      if (resumo) resumo.innerHTML = "";
      return;
    }
  
    let total = 0;
    let totalItens = 0;
  
    carrinho.forEach(item => {
      total += item.preco * item.quantidade;
      totalItens += item.quantidade;
  
      areaCarrinho.innerHTML += `
        <div class="item-carrinho">
          <img src="${item.imagem}" alt="${item.nome}">
          <div>
            <h3>${item.nome}</h3>
            <p>Preço: R$ ${item.preco.toFixed(2)}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <button class="remover" onclick="removerProduto(${item.id})">Remover produto</button>
          </div>
        </div>
      `;
    });
  
    resumo.innerHTML = `
      <h2>Resumo da compra</h2>
      <p>Total de itens: ${totalItens}</p>
      <p>Valor total: R$ ${total.toFixed(2)}</p>
      <button onclick="alert('Compra finalizada com sucesso!')">Finalizar compra</button>
      <button class="remover" onclick="limparCarrinho()">Limpar carrinho</button>
    `;
  }
  
  function mostrarRelatorio() {
    const areaRelatorio = document.getElementById("area-relatorio");
  
    if (!areaRelatorio) return;
  
    const carrinho = pegarCarrinho();
  
    areaRelatorio.innerHTML = "<h2>Dados armazenados no LocalStorage</h2>";
  
    if (carrinho.length === 0) {
      areaRelatorio.innerHTML += "<p>Nenhum produto armazenado no carrinho.</p>";
      return;
    }
  
    let total = 0;
  
    carrinho.forEach(item => {
      total += item.preco * item.quantidade;
  
      areaRelatorio.innerHTML += `
        <div class="card-relatorio">
          <h3>${item.nome}</h3>
          <p>Preço: R$ ${item.preco.toFixed(2)}</p>
          <p>Quantidade: ${item.quantidade}</p>
        </div>
      `;
    });
  
    areaRelatorio.innerHTML += `
      <h2>Resumo armazenado</h2>
      <p>Total de produtos diferentes: ${carrinho.length}</p>
      <p>Valor total: R$ ${total.toFixed(2)}</p>
      <button class="remover" onclick="localStorage.clear(); location.reload()">Limpar dados armazenados</button>
    `;
  }
  
  function atualizarContador() {
    const contador = document.getElementById("contador-carrinho");
  
    if (!contador) return;
  
    const carrinho = pegarCarrinho();
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  
    contador.textContent = totalItens;
  }
  
  function enviarMensagem(event) {
    event.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const resposta = document.getElementById("resposta-contato");
  
    resposta.innerHTML = `Obrigado pelo contato, ${nome}! Em breve responderemos sua mensagem.`;
  
    document.querySelector(".form-contato").reset();
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrinho();
    mostrarRelatorio();
    atualizarContador();
  });