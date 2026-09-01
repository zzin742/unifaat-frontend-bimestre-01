import userRender from "../render/userRender.js";

/**
 * Volta um item de edicao para leitura, sem chamar a API.
 *
 * Os valores originais vem de liElement.userData, guardado na renderizacao.
 * Por isso cancelar nao precisa rebuscar a lista inteira - o que evita uma
 * requisicao e mantem a pagina atual intacta.
 */
export function userViewRender(liElement) {

    const novoLiElement = userRender(liElement.userData);

    liElement.replaceWith(novoLiElement);

    return novoLiElement;
}

export default function cancelButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.parentElement;

    userViewRender(liElement);
}
