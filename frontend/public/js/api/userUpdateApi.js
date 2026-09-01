import clientApi from "./_clientApi.js";

/**
 * PUT /users/:id
 *
 * O backend (UpdateUserController) exige name e email preenchidos e devolve
 * 400 se algum vier vazio. A validacao no cliente evita a ida ate o servidor,
 * mas nao substitui a de la - por isso o handler de salvar trata os dois casos.
 *
 * password e opcional: o controller so re-criptografa a senha se ela vier no
 * corpo. Como esta tela nao edita senha, o campo nao e enviado.
 */
export async function userUpdateApi(id, requestBody) {
    const { data } = await clientApi.put(`/users/${id}`, requestBody);

    return data;
}
