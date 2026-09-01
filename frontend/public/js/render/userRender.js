import deleteButtonClickHandler from "../listeners/deleteButtonClickHandler.js";
import editButtonClickHandler from "../listeners/editButtonClickHandler.js";

/**
 * Item da lista em modo de LEITURA.
 *
 * Os botoes sao filhos diretos do <li>, e nao de um wrapper, porque o
 * deleteButtonClickHandler que ja existia no projeto localiza o item via
 * event.currentTarget.parentElement. Agrupar os botoes numa div quebraria
 * aquele handler sem que o erro aparecesse ate alguem tentar excluir.
 */
export default function userRender(user) {

    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "gap-2");
    liElement.userId = user.id;

    // Guardado no proprio elemento para o modo de edicao repopular os inputs e
    // para o "Cancelar" conseguir restaurar os valores originais sem uma nova
    // ida a API.
    liElement.userData = user;

    const infoElement = document.createElement("div");
    infoElement.classList.add("d-flex", "flex-column", "flex-grow-1");

    const nameElement = document.createElement("span");
    nameElement.innerText = user.name;

    const emailElement = document.createElement("small");
    emailElement.classList.add("text-muted");
    emailElement.innerText = user.email;

    infoElement.append(nameElement, emailElement);
    liElement.append(infoElement);

    const buttonEditElement = document.createElement("button");
    buttonEditElement.classList.add("btn", "btn-secondary", "btn-sm");
    buttonEditElement.innerText = "Editar";
    buttonEditElement.addEventListener("click", editButtonClickHandler);
    liElement.append(buttonEditElement);

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", deleteButtonClickHandler);
    liElement.append(buttonDeleteElement);

    return liElement;

}
