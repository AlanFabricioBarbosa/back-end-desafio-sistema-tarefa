# Documentação do Backend da Lista de Tarefas

Este documento descreve a configuração e o funcionamento da API backend do sistema de lista de tarefas, construída com Node.js, Express e MongoDB.

---

## Sumário
- [Introdução](#introducao)
- [Instalação](#instalacao)
- [Configuração do Ambiente](#configuracao-do-ambiente)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints](#endpoints)
  - [GET /api/tasks](#get-apitasks)
  - [POST /api/tasks](#post-apitasks)
  - [PUT /api/tasks/:id](#put-apitasksid)
  - [DELETE /api/tasks/:id](#delete-apitasksid)
- [Validações e Erros](#validacoes-e-erros)

---

## Introdução

Este projeto é um backend para gerenciar tarefas, fornecendo endpoints para criar, listar, atualizar e deletar tarefas. Ele utiliza o MongoDB como banco de dados e foi desenvolvido com Node.js e Express.

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável de ambiente:

```
MONGODB_URI=<sua-string-de-conexao-do-mongodb>
```

---

## Estrutura do Projeto

```
├── controllers
│   └── taskController.js     # Funções de controle para cada rota
├── models
│   └── Task.js               # Modelo de dados para uma tarefa
├── routes
│   └── taskRoutes.js         # Definição das rotas da API
├── .env                      # Variáveis de ambiente
├── server.js                 # Configuração principal do servidor
└── package.json              # Configurações e dependências do projeto
```

---

## Endpoints

### GET /api/tasks

Retorna todas as tarefas, ordenadas pela propriedade `order`.

- **URL**: `/api/tasks`
- **Método**: GET
- **Resposta de Sucesso**:
  - **Status**: 200 OK
  - **Corpo**:
    ```json
    [
      {
        "_id": "id-da-tarefa",
        "name": "Nome da Tarefa",
        "cost": 100,
        "deadline": "2024-12-31T00:00:00.000Z",
        "order": 1
      },
      ...
    ]
    ```

### POST /api/tasks

Cria uma nova tarefa.

- **URL**: `/api/tasks`
- **Método**: POST
- **Corpo da Requisição**:
  ```json
  {
    "name": "Nova Tarefa",
    "cost": 100,
    "deadline": "2024-12-31",
    "order": 2
  }
  ```
- **Resposta de Sucesso**:
  - **Status**: 201 Created
  - **Corpo**:
    ```json
    {
      "_id": "id-da-tarefa",
      "name": "Nova Tarefa",
      "cost": 100,
      "deadline": "2024-12-31T00:00:00.000Z",
      "order": 2
    }
    ```
- **Erros**:
  - **Status**: 400 Bad Request – Quando algum campo obrigatório está faltando.
  - **Status**: 500 Internal Server Error – Erro no servidor.

### PUT /api/tasks/:id

Atualiza uma tarefa existente.

- **URL**: `/api/tasks/:id`
- **Método**: PUT
- **Corpo da Requisição**:
  ```json
  {
    "name": "Tarefa Atualizada",
    "cost": 150,
    "deadline": "2024-11-30"
  }
  ```
- **Resposta de Sucesso**:
  - **Status**: 200 OK
  - **Corpo**:
    ```json
    {
      "_id": "id-da-tarefa",
      "name": "Tarefa Atualizada",
      "cost": 150,
      "deadline": "2024-11-30T00:00:00.000Z",
      "order": 2
    }
    ```

### DELETE /api/tasks/:id

Deleta uma tarefa.

- **URL**: `/api/tasks/:id`
- **Método**: DELETE
- **Resposta de Sucesso**:
  - **Status**: 200 OK
  - **Corpo**:
    ```json
    {
      "message": "Tarefa excluída com sucesso"
    }
    ```

---

## Validações e Erros

O sistema faz validações para garantir que os dados estejam corretos:

- `name`: Obrigatório, deve ser único.
- `cost`: Obrigatório, deve ser um número.
- `deadline`: Obrigatório, deve ser uma data.
- `order`: Obrigatório, deve ser único.

Erros comuns incluem:

- **400 Bad Request**: Campos faltando ou com formato incorreto.
- **500 Internal Server Error**: Erro de servidor ou de conexão com o banco de dados.
