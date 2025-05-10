document.addEventListener('DOMContentLoaded', () => {
  // Verifica em qual página estamos
  const isIndexPage = document.getElementById('pratos') !== null;
  const isDetalhesPage = document.getElementById('titulo-prato') !== null;

  if (isIndexPage) {
    // Página inicial: adiciona evento de clique nos cards
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const prato = {
          imagem: card.querySelector('.card-img-top').src,
          titulo: card.querySelector('.card-title').innerText,
          tempoPreparo: card.querySelector('.tempoPreparo').innerText,
          descricao: card.querySelector('.card-text').innerText,
          ingredientes: [],
          modoPreparo: []
        };

        card.querySelectorAll('.ingredientes li').forEach(li => {
          prato.ingredientes.push(li.innerText);
        });

        card.querySelectorAll('.modoPreparo li').forEach(li => {
          prato.modoPreparo.push(li.innerText);
        });

        localStorage.setItem('pratoSelecionado', JSON.stringify(prato));

        window.location.href = 'detalhes.html';
      });
    });

  }  else if (isDetalhesPage) {
    // Página detalhes: recupera dados e mostra
    const pratoSelecionado = JSON.parse(localStorage.getItem('pratoSelecionado'));

    if (pratoSelecionado) {
      document.getElementById('titulo-prato').innerText = pratoSelecionado.titulo;
      document.getElementById('tempo-preparo').innerText = pratoSelecionado.tempoPreparo;
      document.getElementById('descricao').innerText = pratoSelecionado.descricao;

      const imagemPrato = document.createElement('img');
      imagemPrato.alt = pratoSelecionado.titulo;
      imagemPrato.src = pratoSelecionado.imagem;
      document.getElementById('imagem-prato').appendChild(imagemPrato);

      const ingredientesLista = document.getElementById('ingredientes-lista');
      pratoSelecionado.ingredientes.forEach(ingrediente => {
        const li = document.createElement('li');
        li.innerText = ingrediente;
        ingredientesLista.appendChild(li);
      });

      const modoPreparoLista = document.getElementById('modo-preparo-lista');
      pratoSelecionado.modoPreparo.forEach(passo => {
        const li = document.createElement('li');
        li.innerText = passo;
        modoPreparoLista.appendChild(li);
      });
    }
  }
});

/* carousel */

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os itens do carousel
  const itensCarousel = document.querySelectorAll('.carousel-item');

  // Para cada item, adiciona um clique
  itensCarousel.forEach(item => {
    item.addEventListener('click', () => {
      const prato = {
        imagem: item.querySelector('img').src,
        titulo: item.querySelector('h5').innerText,
        descricao: item.querySelectorAll('p')[0].innerText, // primeiro <p> é a descrição
        tempoPreparo: item.querySelector('.tempoPreparo')?.innerText || '',
        ingredientes: [],
        modoPreparo: []
      };

      item.querySelectorAll('.ingredientes li').forEach(li => {
        prato.ingredientes.push(li.innerText);
      });

      item.querySelectorAll('.modoPreparo li').forEach(li => {
        prato.modoPreparo.push(li.innerText);
      });

      localStorage.setItem('pratoSelecionado', JSON.stringify(prato));
      window.location.href = 'detalhes.html';
    });
  });
});

