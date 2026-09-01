import pageButtonClickHandler from "../listeners/pageButtonClickHandler.js";

/**
 * Controles de navegacao entre paginas.
 *
 * Recebe os campos que a propria API devolve (page, next, total) em vez de
 * calcular limites por conta propria. Se o backend mudar o tamanho da pagina,
 * os botoes continuam corretos sem tocar aqui.
 *
 * - "Anterior" fica desabilitado na pagina 1
 * - "Proxima" fica desabilitado quando next vem null
 */
export default function paginationRender({ page, next, total }) {

    const containerElement = document.createElement("div");
    containerElement.classList.add(
        "d-flex", "justify-content-between", "align-items-center", "mt-3", "gap-2"
    );

    const previousButtonElement = document.createElement("button");
    previousButtonElement.classList.add("btn", "btn-outline-primary", "btn-sm");
    previousButtonElement.innerText = "Anterior";
    previousButtonElement.disabled = (page <= 1);
    previousButtonElement.targetPage = page - 1;
    previousButtonElement.addEventListener("click", pageButtonClickHandler);

    const statusElement = document.createElement("small");
    statusElement.classList.add("text-muted");
    statusElement.innerText = `Página ${page} — ${total} usuário(s) no total`;

    const nextButtonElement = document.createElement("button");
    nextButtonElement.classList.add("btn", "btn-outline-primary", "btn-sm");
    nextButtonElement.innerText = "Próxima";
    nextButtonElement.disabled = (next === null);
    nextButtonElement.targetPage = next;
    nextButtonElement.addEventListener("click", pageButtonClickHandler);

    containerElement.append(previousButtonElement, statusElement, nextButtonElement);

    return containerElement;

}
