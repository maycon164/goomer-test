# Menu & Promotions API

API para gerenciar produtos, promoções e gerar o menu com promoções ativas.

---

## Tecnologias utilizadas

- **Node.js** - runtime para execução do backend.
- **Express** - framework web para criação de endpoints REST.
- **PostgreSQL (pg)** - banco de dados relacional.
- **Flyway** - gerenciamento de migrations do banco.
- **Jest** - framework de testes unitários.
- **TypeScript** - tipagem estática e melhoria de qualidade do código.

---

## Endpoints

### Produtos

| Método | Rota            | Descrição                       |
|--------|----------------|--------------------------------|
| GET    | `/products`     | Retorna todos os produtos       |
| POST   | `/products`     | Cria um novo produto           |
| PUT    | `/products/:id` | Atualiza um produto existente  |
| DELETE | `/products/:id` | Remove um produto existente    |

### Promoções

| Método | Rota              | Descrição                        |
|--------|-----------------|---------------------------------|
| GET    | `/promotions`     | Retorna todas as promoções       |
| POST   | `/promotions`     | Cria uma nova promoção           |
| PUT    | `/promotions/:id` | Atualiza uma promoção existente  |
| DELETE | `/promotions/:id` | Remove uma promoção existente    |

### Menu

| Método | Rota      | Descrição                                             |
|--------|----------|------------------------------------------------------|
| GET    | `/menu`   | Retorna o menu atual com produtos e promoções ativas |

---

## Como rodar o projeto localmente

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados

- Atualize as variaveis de ambiente .env
- Atualize os valores na pasta ./flyway/conf/flyway.conf

### 3. Rodar migrations com Flyway
- Instale o cli do flyway
- Execute: flyway -configFiles=.flyway/conf/flyway.conf migrate

### 4. Rodar a aplicação
```bash
npm run dev
```