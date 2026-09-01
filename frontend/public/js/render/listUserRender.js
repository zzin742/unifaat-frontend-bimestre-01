import userRender from "./userRender.js";
import paginationRender from "./paginationRender.js";
import { userListApi } from "../api/userListApi.js";

/**
 * Pagina atual da listagem.
 *
 * Fica em variavel de modulo porque, em ES modules, o modulo e avaliado uma
 * unica vez e todos os imports enxergam a mesma instancia. Ou seja: o estado
 * sobrevive entre renderizacoes sem precisar de localStorage (proibido no
 * enunciado) nem de variavel global no window.
 *
 * Como consequencia, recarregar a pagina volta para a pagina 1 - o que e o
 * comportamento correto aqui, ja que nao ha persistencia pedida.
 */
let currentPage = 1;

export function setCurrentPage(page) {
    currentPage = page;
}

export function getCurrentPage() {
    return currentPage;
}

export default async function listUserRender() {

    const sectionListElement = document.querySelector("#list-container");

    const { page, total, next, data: users } = await userListApi({ page: currentPage });

    // Excluir o ultimo item de uma pagina deixaria a lista vazia com botoes de
    // navegacao apontando para o nada. Nesse caso volta uma pagina e refaz a
    // busca, em vez de mostrar uma tela vazia sem explicacao.
    if (users.length === 0 && currentPage > 1) {
        currentPage = currentPage - 1;

        return listUserRender();
    }

    // A montagem so acontece depois que os dados chegam. Limpar antes deixaria
    // a lista piscando vazia durante a requisicao.
    sectionListElement.innerHTML = "";

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");

    sectionListElement.append(ulElement);

    users.forEach((user) => {
        const liElement = userRender(user);

        ulElement.append(liElement);
    });

    // A API devolve `next` como o numero da proxima pagina ou null quando nao
    // ha mais nada. Passar os campos crus para o render mantem a decisao de
    // habilitar/desabilitar em um lugar so.
    const paginationElement = paginationRender({ page, next, total });

    sectionListElement.append(paginationElement);

}
