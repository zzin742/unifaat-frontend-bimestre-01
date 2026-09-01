import { userUpdateApi } from "../api/userUpdateApi.js";
import listUserRender from "../render/listUserRender.js";

/**
 * Confirma a edicao: valida, chama PUT /users/:id e so entao atualiza a lista.
 *
 * A ordem importa. Atualizar a tela antes da resposta mostraria um dado que
 * ainda pode ser recusado pelo servidor - se o email ja existir, a lista
 * exibiria um valor que nao foi gravado.
 */
export default async function saveButtonClickHandler(event) {
    event.preventDefault();

    const buttonElement = event.currentTarget;
    const liElement = buttonElement.parentElement;

    const nameInputElement = liElement.nameInput;
    const emailInputElement = liElement.emailInput;
    const feedbackElement = liElement.feedback;

    const name = nameInputElement.value.trim();
    const email = emailInputElement.value.trim();

    const mostrarErro = (mensagem, inputElement) => {
        feedbackElement.innerText = mensagem;
        feedbackElement.classList.remove("d-none");
        inputElement.classList.add("is-invalid");
        inputElement.focus();
    };

    const limparErro = () => {
        feedbackElement.classList.add("d-none");
        nameInputElement.classList.remove("is-invalid");
        emailInputElement.classList.remove("is-invalid");
    };

    limparErro();

    // Validacao exigida pelo enunciado: nao pode salvar vazio.
    // O trim() e o que impede " " de passar como nome valido - sem ele, o
    // campo pareceria preenchido e o backend gravaria um espaco.
    if (name === "") {
        return mostrarErro("O nome não pode ficar vazio.", nameInputElement);
    }

    if (email === "") {
        return mostrarErro("O e-mail não pode ficar vazio.", emailInputElement);
    }

    // O backend tambem valida (retorna 400 sem name/email). A checagem aqui
    // poupa a viagem ate o servidor, mas nao substitui a de la: validacao de
    // cliente e conveniencia, nao seguranca.

    buttonElement.disabled = true;
    buttonElement.innerText = "Salvando...";

    try {
        // password nao e enviado: o controller so re-criptografa a senha se o
        // campo vier no corpo, e esta tela nao edita senha.
        await userUpdateApi(liElement.userId, { name, email });

        await listUserRender();
    } catch (error) {
        buttonElement.disabled = false;
        buttonElement.innerText = "Salvar";

        // 409 vem do SequelizeUniqueConstraintError tratado no controller:
        // outro usuario ja usa esse email.
        if (error.response?.status === 409) {
            return mostrarErro("Este e-mail já está em uso.", emailInputElement);
        }

        if (error.response?.status === 400) {
            return mostrarErro("Nome e e-mail são obrigatórios.", nameInputElement);
        }

        if (error.response?.status === 404) {
            return mostrarErro("Usuário não encontrado. Atualize a lista.", nameInputElement);
        }

        return mostrarErro("Não foi possível salvar. Tente novamente.", nameInputElement);
    }
}
