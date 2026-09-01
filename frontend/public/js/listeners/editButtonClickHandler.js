import userEditRender from "../render/userEditRender.js";
import { userViewRender } from "./cancelButtonClickHandler.js";

/**
 * Entra no modo de edicao do item clicado.
 *
 * Nota sobre o ciclo de imports: userRender -> editButtonClickHandler ->
 * cancelButtonClickHandler -> userRender. E circular de fato, e e inerente ao
 * problema: para renderizar em leitura e preciso saber entrar em edicao, e
 * para sair da edicao e preciso saber renderizar em leitura.
 *
 * Em ES modules isso funciona porque os bindings sao resolvidos na hora da
 * chamada, nao na avaliacao do modulo - e nenhuma dessas funcoes e executada
 * durante o import. Se alguma delas passasse a rodar no topo do arquivo,
 * quebraria.
 *
 * Fecha qualquer outro item que ja esteja em edicao: deixar dois abertos
 * permitiria salvar um por cima do outro sem perceber, alem de tornar ambiguo
 * o que "Cancelar" desfaz.
 */
export default function editButtonClickHandler(event) {
    event.preventDefault();

    const liElement = event.currentTarget.parentElement;
    const ulElement = liElement.parentElement;

    ulElement.querySelectorAll("li").forEach((outroLiElement) => {
        // nameInput so existe nos itens que estao em modo de edicao.
        if (outroLiElement !== liElement && outroLiElement.nameInput) {
            userViewRender(outroLiElement);
        }
    });

    userEditRender(liElement);
}
