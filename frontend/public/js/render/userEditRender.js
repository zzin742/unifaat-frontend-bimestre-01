import saveButtonClickHandler from "../listeners/saveButtonClickHandler.js";
import cancelButtonClickHandler from "../listeners/cancelButtonClickHandler.js";

/**
 * Item da lista em modo de EDICAO.
 *
 * Troca os textos por inputs ja preenchidos com os valores atuais e substitui
 * "Editar" por "Salvar" e "Cancelar". Reescreve o conteudo do <li> recebido em
 * vez de criar outro elemento, para nao perder a posicao dele na lista.
 *
 * Os inputs ficam acessiveis pelo <li> (nameInput / emailInput) para o handler
 * de salvar ler os valores sem depender de seletor CSS.
 */
export default function userEditRender(liElement) {

    const user = liElement.userData;

    liElement.innerHTML = "";

    const formElement = document.createElement("div");
    formElement.classList.add("d-flex", "flex-column", "flex-grow-1", "gap-1");

    const nameInputElement = document.createElement("input");
    nameInputElement.type = "text";
    nameInputElement.classList.add("form-control", "form-control-sm");
    nameInputElement.value = user.name;
    nameInputElement.placeholder = "Nome";

    const emailInputElement = document.createElement("input");
    emailInputElement.type = "email";
    emailInputElement.classList.add("form-control", "form-control-sm");
    emailInputElement.value = user.email;
    emailInputElement.placeholder = "E-mail";

    // Uma unica area de mensagem para os dois campos: as validacoes desta tela
    // sao mutuamente exclusivas na pratica e duas caixas de erro empilhadas
    // bagunçariam o item da lista.
    const feedbackElement = document.createElement("small");
    feedbackElement.classList.add("text-danger", "d-none");

    formElement.append(nameInputElement, emailInputElement, feedbackElement);

    liElement.nameInput = nameInputElement;
    liElement.emailInput = emailInputElement;
    liElement.feedback = feedbackElement;

    const buttonSaveElement = document.createElement("button");
    buttonSaveElement.classList.add("btn", "btn-success", "btn-sm");
    buttonSaveElement.innerText = "Salvar";
    buttonSaveElement.addEventListener("click", saveButtonClickHandler);

    const buttonCancelElement = document.createElement("button");
    buttonCancelElement.classList.add("btn", "btn-outline-secondary", "btn-sm");
    buttonCancelElement.innerText = "Cancelar";
    buttonCancelElement.addEventListener("click", cancelButtonClickHandler);

    liElement.append(formElement, buttonSaveElement, buttonCancelElement);

    nameInputElement.focus();

    return liElement;

}
