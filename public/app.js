document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3000/pratos");
        const pratos = await response.json(); // Converte JSON para objeto

        const container = document.getElementById("pratos"); // Elemento que contém os cards
        container.innerHTML = ""; // Limpa o conteúdo existente

        pratos.forEach(prato => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img class="card-img-top" src="${prato.imagem}" alt="${prato.nome}">
                <div class="card-body">
                    <h5 class="card-title">${prato.nome}</h5>
                    <p class="card-text">${prato.descricao}</p>
                    <p class="tempoPreparo">Tempo de preparo: ${prato.tempoPreparo}</p>
                </div>
            `;
            card.addEventListener("click", () => {
                localStorage.setItem("pratoSelecionado", JSON.stringify(prato));
                window.location.href = "detalhes.html";
            });

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao buscar os pratos:", error);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const pratoSelecionado = JSON.parse(localStorage.getItem("pratoSelecionado"));

    if (pratoSelecionado) {
        document.getElementById("titulo-prato").innerText = pratoSelecionado.nome;
        document.getElementById("tempo-preparo").innerText = pratoSelecionado.tempoPreparo;
        document.getElementById("descricao").innerText = pratoSelecionado.descricao;

        const imagemPrato = document.createElement("img");
        imagemPrato.src = pratoSelecionado.imagem;
        imagemPrato.alt = pratoSelecionado.nome;
        document.getElementById("imagem-prato").appendChild(imagemPrato);

        const ingredientesLista = document.getElementById("ingredientes-lista");
        pratoSelecionado.ingredientes.forEach(ingrediente => {
            const li = document.createElement("li");
            li.innerText = ingrediente;
            ingredientesLista.appendChild(li);
        });

        const modoPreparoLista = document.getElementById("modo-preparo-lista");
        pratoSelecionado.modoPreparo.forEach(passo => {
            const li = document.createElement("li");
            li.innerText = passo;
            modoPreparoLista.appendChild(li);
        });
    } else {
        console.error("Nenhum prato foi selecionado.");
    }
});
