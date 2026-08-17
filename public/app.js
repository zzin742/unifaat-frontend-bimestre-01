// TF - FE - Aula 01 :: Servidor de arquivos estáticos e DOM
// Aluno: José Henrique Teixeira Luiz - RA 3225002

const names = [
    "Ana Martins",
    "Carlos Souza",
    "Fernanda Lima",
    "João Oliveira",
    "Mariana Costa",
    "Pedro Almeida",
    "Camila Rocha",
    "Lucas Fernandes",
    "Beatriz Gomes"
];

// Obter os elementos da árvore DOM
const sectionListElement = document.getElementById("list-container");
const inputListAddElement = document.getElementById("list-add");
const buttonListAddElement = document.getElementsByClassName("btn")[0];

// Cria o ul (container da lista) e adiciona no container principal
const ulElement = document.createElement("ul");
ulElement.setAttribute("class", "list-names");
sectionListElement.append(ulElement);

/**
 * Cria um <li> com o texto + botão Excluir que remove só ele.
 * Usada tanto na renderização inicial quanto na adição via input.
 */
function criarItem(texto) {
    const liElement = document.createElement("li");

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.innerHTML = "<strong>Excluir</strong>";
    buttonDeleteElement.setAttribute("class", "btn-delete");

    // Excluir: pega o li pai do botão clicado e remove
    buttonDeleteElement.addEventListener("click", (event) => {
        const currentTargetElement = event.currentTarget;
        const liParentElement = currentTargetElement.parentElement;
        liParentElement.remove();
    });

    liElement.append(texto, " ", buttonDeleteElement);
    return liElement;
}

// Renderiza a lista inicial (cada item ganha seu próprio botão Excluir)
names.forEach((name) => {
    ulElement.append(criarItem(name));
});

// Botão Adicionar: cria novo li a partir do input e insere no ul
buttonListAddElement.addEventListener("click", (event) => {
    event.preventDefault();

    // trim() garante que espaços em branco não passem como item válido
    const inputValue = inputListAddElement.value.trim();

    if (inputValue === "") {
        return;
    }

    ulElement.append(criarItem(inputValue));

    // Limpa o input pra próxima entrada
    inputListAddElement.value = "";
    inputListAddElement.focus();
});

// Bônus: também aceita Enter no input pra adicionar
inputListAddElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buttonListAddElement.click();
    }
});

// Log de checagem (dev)
console.log(
    "Itens iniciais:", ulElement.getElementsByTagName("li").length,
    "| botões:", document.getElementsByClassName("btn-delete").length
);
