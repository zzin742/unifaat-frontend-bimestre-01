import listUserRender, { setCurrentPage } from "../render/listUserRender.js";

/**
 * Troca de pagina.
 *
 * O numero da pagina de destino vem numa propriedade colocada no proprio
 * botao (targetPage), no mesmo padrao que o projeto ja usa em
 * liElement.userId. Assim o handler nao precisa ler o texto do botao nem
 * recalcular a pagina.
 *
 * Nao ha reload: apenas rebusca via userListApi e remonta a lista.
 */
export default async function pageButtonClickHandler(event) {
    event.preventDefault();

    const buttonElement = event.currentTarget;
    const targetPage = buttonElement.targetPage;

    if (!targetPage || targetPage < 1) {
        return;
    }

    // Cliques repetidos enquanto a requisicao esta em curso disparariam varias
    // buscas e a ultima a responder venceria - que nao e necessariamente a
    // ultima clicada.
    buttonElement.disabled = true;

    setCurrentPage(targetPage);

    await listUserRender();
}
