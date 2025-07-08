# NLW Agents
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Rocketseat](https://img.shields.io/badge/Rocketseat-8257E5?style=for-the-badge&logo=rocketseat&logoColor=white)

Este projeto foi desenvolvido durante o evento NLW Agents da Rocketseat e consiste em uma aplicação completa com backend e frontend. A aplicação permite a criação de salas de perguntas e respostas, onde os usuários podem interagir com agentes de inteligência artificial.

## Estrutura do Projeto

O repositório está organizado em duas pastas principais:

- **server/**: Contém o backend da aplicação, responsável por gerenciar a API e o banco de dados.
- **web/**: Contém o frontend da aplicação, responsável pela interface do usuário.

---

## Funcionalidades

### Backend (server/)
- **Gerenciamento de Salas**: Criação, listagem e consulta de salas.
- **Gerenciamento de Perguntas**: Criação e listagem de perguntas associadas às salas.
- **Respostas com IA**: Integração para geração de respostas automáticas.
- **Health Check**: Endpoint para verificar o status do servidor.

### Frontend (web/)
- **Interface de Criação de Salas**: Formulário para criar novas salas.
- **Interface de Perguntas e Respostas**: Permite aos usuários fazer perguntas e visualizar respostas geradas por IA.
- **Listagem de Salas**: Exibição de salas criadas recentemente com informações detalhadas.
- **Design Responsivo**: Interface adaptada para diferentes dispositivos.

---

## Tecnologias Utilizadas

### Backend
- **Node.js** + **TypeScript**: Base para o desenvolvimento do servidor.
- **Fastify**: Framework para criação de APIs HTTP rápidas e eficientes.
- **Zod**: Validação de dados com tipagem forte.
- **Drizzle ORM**: ORM para manipulação do banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional com extensão pgvector para IA.
- **Docker**: Containerização do banco de dados.

### Frontend
- **React**: Biblioteca para construção de interfaces.
- **React Router**: Gerenciamento de rotas.
- **React Query**: Gerenciamento de estado assíncrono.
- **TailwindCSS**: Estilização com classes utilitárias.
- **Vite**: Ferramenta de build e desenvolvimento.
- **TypeScript**: Tipagem estática para JavaScript.

---

## Padrões de Projeto

### Backend
- **Organização por Domínio**: Separação de responsabilidades em `src/db`, `src/http`, etc.
- **Validação com Zod**: Garantia de dados consistentes e tipados.
- **Migrations e Seeds**: Gerenciamento do esquema do banco de dados com Drizzle ORM.

### Frontend
- **Componentização**: Separação de funcionalidades em componentes reutilizáveis.
- **Alias**: Configuração de aliases para facilitar importações.
- **Estrutura de Pastas**: Organização em `components`, `pages`, `lib`, etc.

---

## Setup do Projeto

### Backend
1. **Clone o repositório e instale as dependências**:
  ```bash
  cd server
  npm install
  ```
2. **Configure o banco de dados**:
  - Utilize o Docker Compose:
    ```bash
    docker-compose up -d
    ```
  - O banco será iniciado em `localhost:5432` com usuário e senha `docker`.
3. **Configure o arquivo `.env`**:
  - Exemplo:
    ```
    PORT=3333
    DATABASE_URL="postgresql://docker:docker@localhost:5432/agents"
    ```
4. **Rode as migrations e seeds**:
  ```bash
  npm run db:seed
  ```
5. **Inicie o servidor**:
  ```bash
  npm run dev
  ```

### Frontend
1. **Clone o repositório e instale as dependências**:
  ```bash
  cd web
  npm install
  ```
2. **Execute o projeto em modo desenvolvimento**:
  ```bash
  npm run dev
  ```
3. **Build para produção**:
  ```bash
  npm run build
  ```
4. **Preview do build**:
  ```bash
  npm run preview
  ```

---

## Endpoints Disponíveis

### Backend
- `GET /rooms` — Lista todas as salas.
- `POST /rooms` — Cria uma nova sala.
- `GET /rooms/:roomId/questions` — Lista perguntas de uma sala específica.
- `POST /rooms/:roomId/questions` — Cria uma nova pergunta em uma sala.
- `GET /health` — Verifica o status do servidor.

---

## Estrutura de Arquivos

### Backend
- `src/db/`: Configuração do banco de dados, incluindo schema e migrations.
- `src/http/`: Rotas e lógica da API.
- `src/env.ts`: Configuração de variáveis de ambiente.

### Frontend
- `src/pages/`: Páginas da aplicação.
- `src/components/`: Componentes reutilizáveis.
- `src/lib/`: Funções utilitárias.
- `vite.config.ts`: Configuração do Vite.
- `tsconfig.json`: Configuração do TypeScript.

---

Rocketseat 🚀