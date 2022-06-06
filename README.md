# ✨ Desafio Backend

### 🏁 **Informações importantes**:

1. ADMIN - Para que o admin seja criado corretamente e as migrações do BD funcionem corretamente, deve ser passado a variável de ambiente ADMIN_KEY no .env. Poderá ser passado também, se desejar, as variáveis ADMIN_PASS e ADMIN_EMAIL. Caso não seja passado, será criado como padrão `email: admin@email` e `senha: admin123`.

2. AUTENTICAÇÃO - As rotas autenticadas precisam que o token seja enviado no cabeçalho, no campo authorization. Dessa forma:

```json
authorization: "Bearer TOKEN"
``` 

3. As rotas autenticadas estão com  🔒 na tabela de rotas mais abaixo. 

## 💡 **Instruções para execução da API:**

### 1 - Clone esse repositório:

```bash
git clone git@github.com:Matheusd3v/nodejs-backend-challenge.git
```

### 2 - Entre na raiz do projeto:

```bash
cd nodejs-backend-challenge
```

### 3 - Crie o arquivo .env e configure as variáveis de ambiente. Os nomes encontram-se no arquivo .env.example .

### 4 - Execute o docker-compose:

```bash
docker-compose up --build -d
```

1. \*Caso utilize ubuntu, use sudo na frente.

### 5 - Assim que os containeres estiverem prontos, execute as migrations do banco de dados:

```bash
docker exec -it api_container yarn migration:run
```

### Após esses passos, a API estára pronta para receber requisições.

# **📃 Documentação e detalhamento**

## Rotas e funcionalidades

| METODO | ROTA                                                           | RESPONSABILIDADE                                            |
| ------ | -------------------------------------------------------------- | ----------------------------------------------------------- |
| POST   | [/api/v1/user](#post---user)                           | Cadastro de usuário.                                        |
| POST   | [/api/v1/login](#post---login)                             | Realiza login.                                              |
| POST   | [/api/v1/todo](#post---todo) 🔒                            | Cria novo TODO.                                             |
| GET    | [/api/v1/todo](#get---todo) 🔒                | Atualiza TODOS atrasados e busca todos os TODOS do usuário. |
| PATCH  | [/api/v1/todo/{todo_id}](#patch---todo{todo_id}) 🔒                   | Atualiza um TODO pelo id.                                   |
| PATCH  | [/api/v1/todo/{todo_id}/finish](#patch---todo{todo_id}finish)🔒 | Muda o TODO para concluído.                                 |
| POST   | [/api/v1/login/admin](#post---loginadmin)             | Realiza login do admin.                                     |
| GET    | [/api/v1/todos/admin](#get---todosadmin) 🔒        | Busca todos os TODOS cadastrados.                           |

## User

### POST - user

Essa rota realiza o cadastro do usuário. É necessário enviar no corpo de requisição os campos email e password, ambos como tipo string. Caso sucedido, será retornado o id do usuário e o email.

Exemplo:

-   Requisição:

```json
{
    "email": "usuarioTESTE@mail.com",
    "password": "123456"
}
```

-   **Tipos de Respostas**:

1. status: `201 - Created`:

```json
{
    "id": "c7ed8557-b66f-4ec3-9ca7-cb4784b159b2",
    "email": "usuarioteste@mail.com"
}
```

2. status: `400 - BadRequest` - na falta de um campo obrigatório:

```json
["password is a required field"]
```

3. status: `400 - BadRequest` - no envio de um tipo inválido de senha:

```json
[
    "password must be a `string` type, but the final value was: `[\n  \"\\\"senha como array teste\\\"\"\n]`."
]
```

4. status: `409 - Conflict` - caso ja exista um usuário com o mesmo email cadastrado:

```json
{
    "error": "This user already exists."
}
```

## Login

## POST - login

Essa rota permite que o usuário entre na plataforma através do login. Deverá ser enviado no corpo de requisição os campos email e senha, ambos com o tipo string. Caso a requisição seja sucedida, irá retornar um `token` de acesso.

Exemplo:

-   **Requisição correta**:

```json
{
    "email": "usuarioteste@mail.com",
    "password": "123456"
}
```

-   **Tipos de respostas**:

1. status: `200 - OK`:

```json
{
    "message": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjN2VkODU1Ny1iNjZmLTRlYzMtOWNhNy1jYjQ3ODRiMTU5YjIiLCJpYXQiOjE2NTQ1MjgzMzUsImV4cCI6MTY1NDUzMTkzNX0.FrukcEuwsfnQMYNmNKOE9iAovU5T9nYF6zBBAszqylY"
}
```

2. status: `401 - Unauthorized` - no envio de senha/email errado

```json
{
    "error": "Email and password don't match."
}
```

3. status: `400 - BadRequest` - na falta de um campo obrigatório

```json
["email is a required field"]
```

## POST - todo

Essa rota cria um novo TODO. É necessário autenticação, enviando o token. Os campos requeridos são: description e deadline. Ambos devem ser string e a deadline deve ser enviada no formato: '`dd/mm/yyyy 24:59:59`'. Caso sucedida, será retornado os dados do novo TODO.

Exemplo:

-   **Requisição correta**:

```json
{
    "description": "Limpar o quarto.",
    "deadline": "30/06/2022 09:35:00"
}
```

-   **Tipos de respostas**:

1. status: `201 - Created`:

```json
{
    "deadline": "2022-06-30T12:35:00.000Z",
    "description": "Limpar o quarto.",
    "finishedAt": null,
    "id": "3c0e7390-dd03-4a0b-a423-2b443a7ff774",
    "createdAt": "2022-06-06T15:35:39.594Z",
    "updatedAt": "2022-06-06T15:35:39.594Z",
    "overdue": false
}
```

2. status: `409 - Conflict` - caso um usuario tente cadastrar a mesma description no mesmo prazo em sua lista de TODOS. (`outros usuarios poderão cadastrar descriptions iguais.`)

```json
{
    "error": "This unique item is already saved."
}
```

3. status: `400 - BadRequest` - na falta de um campo obrigatório

```json
["description is a required field"]
```

2. status: `401 - Unauthorized` - caso não seja enviado o token

```json
{
    "error": "Missing authorization headers"
}
```

## GET - todo

Essa rota busca todos os TODOS do usuário, antes verifica os atrasados e os atualiza mudando `overdue` para `true`. É necessário autenticação, enviando o token. Não é necessário corpo de requisição, somente o envio do token. Caso sucedida, será retornado um array com todos os TODOS.

Exemplo:

-   **Requisição**: `sem corpo de requisição.`

-   **Tipos de Respostas**:

1. status: `200 - OK`:

```json
[
    {
        "id": "f553099e-1373-4f6f-aaab-ff2200f5a34c",
        "createdAt": "2022-06-06T15:41:13.147Z",
        "updatedAt": "2022-06-06T16:11:35.000Z",
        "finishedAt": "2022-06-06 16:11:35.795",
        "deadline": "2022-06-30T12:35:00.000Z",
        "description": "Todo atualizado com sucesso",
        "overdue": false
    },
    {
        "id": "8a944e10-e399-4b8c-9024-4a5d2d643eba",
        "createdAt": "2022-06-06T16:11:05.213Z",
        "updatedAt": "2022-06-06T16:11:09.000Z",
        "finishedAt": null,
        "deadline": "2022-06-01T12:35:00.000Z",
        "description": "Atrasado para o readme.",
        "overdue": true
    }
]
```

2. status: status: `401 - Unauthorized` - caso não seja enviado o token

```json
{
    "error": "Missing authorization headers"
}
```

## PATCH - todo/{todo_id}

Essa rota atualiza um todo. É necessário autenticação, enviando o token. Os campos aceitos são: description e deadline. Ambos precisam ser do tipo string. Caso sucedida, será retornado o TODO atualizado.

Exemplo:

-   **Requisição correta**:

```json
{
    "description": "Todo atualizado com sucesso"
}
```

-   **Tipos de respostas**:

1. status: `200 - OK`:

```json
{
    "id": "f553099e-1373-4f6f-aaab-ff2200f5a34c",
    "createdAt": "2022-06-06T15:41:13.147Z",
    "updatedAt": "2022-06-06T15:52:29.000Z",
    "finishedAt": null,
    "deadline": "2022-06-30T12:35:00.000Z",
    "description": "Todo atualizado com sucesso",
    "overdue": false
}
```

2. status: `400 - BadRequest` - caso nenhum campo seja enviado

```json
{
    "error": "No fields were sent."
}
```

3. status: status: `401 - Unauthorized` - caso não seja enviado o token

```json
{
    "error": "Missing authorization headers"
}
```

## PATCH - todo/{todo_id}/finish

Essa rota atualiza o TODO para concluído. É necessário autenticação, enviando o token. Não é necessário corpo de requisição, apenas que seja passado o id do TODO na rota. Caso sucedido, será retornado apenas uma mensagem de sucesso.

Exemplo:

-   **Requisição**:
    `sem corpo de requisição`

-   **Tipo de respostas**:

1. status: `200 - OK`:

```json
{
    "message": "success"
}
```

2. status: status: `401 - Unauthorized` - caso não seja enviado o token

```json
{
    "error": "Missing authorization headers"
}
```

3. status: `404 - NotFound` - caso o id, passado na rota, não exista.

```json
{
    "error": "To do not found."
}
```

## 🛡️ Admin

## POST - login/admin

Essa rota é exclusiva para o login do admin. É necessário o envio dos campos email, password e adminKey. Ambos devem ser passados como string. Caso sucedia, será retornado o token do admin.

Exemplo:

-   **Requisição correta**:

```json
{
    "email": "bolinha@mail.com",
    "password": "bolinha123",
    "adminKey": "A94uma_key_muito_boa_aquiCD34797AD3"
}
```

-   **Tipos de respostas**:

1. status: `200 - OK`

```json
{
    "message": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJhZG1pbktleSI6IkE5NENEMEI4Njc1OTJFMTc0OTVGNEY3QjIzREFEODM4RjdEMzhGODBGREYyNDJGNTQ3NDBEMEQ3Q0QzNDc5NzMiLCJlbWFpbCI6ImJvbGluaGFAbWFpbC5jb20iLCJpYXQiOjE2NTQ1MjM1NDEsImV4cCI6MTY1NDUyNzE0MX0.95N8r97t0XZdHlW6tPLhskUqdxnbLATuiVRx-zEzUn8"
}
```

2. status: `401 - Unauthorized` - caso seja enviado email/password/adminKey errado

```json
{
    "error": "Invalid admin credentials!"
}
```

3. status: `400 - BadRequest` - na falta de um campo obrigatório

```json
["adminKey is a required field"]
```

4. status: `400 - BadRequest` - no envio de um campo de tipo inválido

```json
["password must be a `string` type, but the final value was: `[]`."]
```

## GET - todos/admin

Essa rota lista todos os TODOS cadastrados no banco de dados. É uma rota atenticada, sendo necessário o envio do token gerado no login de admin. Não é necessário envio de corpo de requisição. Caso sucedido, irá retornar um array com todos os todos e seus donos.

Essa rota aceita as query params: page, per_page e overdue. Caso não seja passado na rota, está definido por padrão page=1, per_page=10. A query overdue deve ser enviada como: `overdue=true`, caso queira filtrar os TODOS atrasados.

Exemplos:

-   **Tipos de requisições**:

1. Sem query params:

```
localhost:`PORT`/api/v1/todos/admin
```

2. Com paginação:

```
localhost:`PORT`/api/v1/todos/admin?per_page=3&page=2
```

3. Com paginação e filtragem dos atrasados:

```
localhost:`PORT`/api/v1/todos/admin?per_page=3&page=2&overdue=true
```

- Tipo de respostas: 

1. status: `200 - OK`
```json
[
	{
		"id": "91d4deef-22ec-4f16-8f85-e6b602bad02e",
		"deadline": "2022-06-30T12:35:00.000Z",
		"description": "Todo user55",
		"user": {
			"email": "usuarioteste55@mail.com"
		}
	},
	{
		"id": "8a944e10-e399-4b8c-9024-4a5d2d643eba",
		"deadline": "2022-06-01T12:35:00.000Z",
		"description": "Atrasado para o readme.",
		"user": {
			"email": "usuarioteste@mail.com"
		}
	},
	{
		"id": "f553099e-1373-4f6f-aaab-ff2200f5a34c",
		"deadline": "2022-06-30T12:35:00.000Z",
		"description": "Todo atualizado com sucesso",
		"user": {
			"email": "usuarioteste@mail.com"
		}
	}
]
```

2. status: status: `401 - Unauthorized` - caso não seja enviado o token

```json
{
    "error": "Missing authorization headers"
}
```