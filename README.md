# Task Manager App

Aplicação de gerenciamento de tarefas com autenticação e CRUD completo.

## Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **HTTP:** Axios com interceptors
- **Auth:** JWT + CSRF Token
- **Validation:** CPF validation (cpf-cnpj-validator)
- **Frontend:** React 18 + TypeScript + Vite- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

## Arquitetura

```

src/- **Forms:** React Hook Form + Zod validation

├── core/           # Configurações centrais (auth, routes, interceptors)

├── features/       # Funcionalidades por domínio (auth, tasks)- **HTTP:** Axios com interceptors## React Compiler

├── shared/         # Componentes e serviços reutilizáveis

└── assets/         # Recursos estáticos- **Auth:** JWT + CSRF Token

```

- **Validation:** CPF validation (cpf-cnpj-validator)The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Funcionalidades
- ✅ Autenticação JWT com CSRF protection

- ✅ Cadastro com validação de CPF

- ✅ CRUD de tarefas

- ✅ Validação de formulários em tempo real

- ✅ Interceptors para refresh token automático

- ✅ Layout responsivo

## Como rodar

1. Clonar o projeto e instalar dependências
```bash
git clone https://github.com/yasminlopes/task-manager-app.git
cd task-manager-app

npm install
```

2. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do frontend:

```
# URL base da API (sem barra no final)
VITE_API_URL=http://localhost:3333
```

3. Rodar em modo desenvolvimento com `npm run dev`


## Backend

Repositório da API: [task-manager-api](https://github.com/yasminlopes/task-manager-api)

