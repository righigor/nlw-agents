# NLW Agents

Projeto desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias e Bibliotecas

- **Node.js** + **TypeScript**
- [Fastify](https://fastify.dev/) (API HTTP)
- [Zod](https://zod.dev/) (validação de dados)
- [drizzle-orm](https://orm.drizzle.team/) (ORM para PostgreSQL)
- [drizzle-seed](https://github.com/drizzle-team/drizzle-seed) (seed de banco de dados)
- [postgres](https://github.com/porsager/postgres) (driver PostgreSQL)
- [@fastify/cors](https://github.com/fastify/fastify-cors) (CORS)
- Docker (banco de dados PostgreSQL com extensão pgvector)

## Padrões de Projeto

- Organização por domínio (`src/db`, `src/http`, `src/env.ts`)
- Validação e tipagem forte com Zod e TypeScript
- Migrations e seeds com Drizzle ORM

## Setup do Projeto

1. **Clone o repositório e instale as dependências:**
  ```bash
  npm install
  ```

2. **Configure o banco de dados:**
  - Utilize o Docker Compose:
    ```bash
    docker-compose up -d
    ```
  - O banco será iniciado em `localhost:5432` com usuário e senha `docker`.

3. **Configure o arquivo `.env`:**
  - Exemplo já incluso no projeto:
    ```
    PORT=3333
    DATABASE_URL="postgresql://docker:docker@localhost:5432/agents"
    ```

4. **Rode as migrations e seeds:**
  ```bash
  npm run db:seed
  ```

5. **Inicie o servidor:**
  ```bash
  npm run dev
  ```

## Endpoints

- `GET /rooms` — Lista todas as salas
- `GET /health` — Health check

---

Desenvolvido durante o NLW da Rocketseat.