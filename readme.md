# TF - FE - Aula 01 :: Servidor de arquivos estáticos e DOM

**Aluno:** José Henrique Teixeira Luiz
**RA:** 3225002
**Disciplina:** Frontend — Centro Universitário UniFAAT
**Professor:** Luan Tavares
**Semestre:** 2026-2
**Repositório base:** https://github.com/luan-tavares/unifaat-frontend-bimestre-01

---

## Sobre o TF

Aplicação simples de lista de nomes que renderiza a partir de um array
JavaScript, com duas funcionalidades adicionais implementadas via DOM puro:

1. **Botão Adicionar** — pega o valor do input, valida se não é vazio (ignora
   também espaços em branco via `trim()`), cria um novo `<li>` com botão de
   excluir e insere no `<ul>`. Depois de adicionar, limpa o input.

2. **Botão Excluir** — cada item da lista (inclusive os do array inicial) tem
   seu próprio botão que remove aquele `<li>` específico ao ser clicado, sem
   afetar os outros.

### Bônus

- Tecla **Enter** no input também adiciona o item (dispara o clique do botão).
- Uso de `getElementsByClassName` e `getElementsByTagName` no log de checagem
  (conforme sugerido no enunciado).
- Função `criarItem(texto)` reutilizada para os itens iniciais e os
  adicionados via input (DRY).

## Como rodar (Docker + Nginx)

1. Clonar:
   ```sh
   git clone https://github.com/zzin742/unifaat-frontend-bimestre-01
   cd unifaat-frontend-bimestre-01
   ```

2. Criar `.env` a partir do template:
   ```sh
   cp .env.example .env
   ```

3. Subir:
   ```sh
   docker compose up --build
   ```

4. Abrir: http://localhost:8080

## Estrutura

| Caminho | Descrição |
|---|---|
| `public/` | Arquivos servidos pelo Nginx (`index.html`, `app.js`, `app.css`, imagens). |
| `public/app.js` | Lógica JS (arquivo do TF). |
| `docker/nginx/` | Dockerfile e template de config do Nginx. |
| `docker-compose.yml` | Orquestração (1 container `nginx-container` na porta 8080). |
| `.env.example` | Template de variáveis de ambiente. |

## Container

| Container | Imagem | Porta interna | Porta externa |
|---|---|---|---|
| `nginx_01` | `nginx:1.25-alpine` | 80 | **8080** |

## Regras atendidas

- ✅ Somente DOM puro: `createElement`, `append`, `remove`, `setAttribute`,
  `classList`, `addEventListener`
- ✅ Usa coleções (`getElementsByClassName`, `getElementsByTagName`)
- ✅ Rodando com Docker/Nginx da aula
- ✅ Item vazio não é adicionado (nem strings só com espaços)
- ✅ Cada item removido não afeta os outros
