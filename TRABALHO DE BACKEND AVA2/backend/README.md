# Backend - Clínica Médica

## Como rodar

1. Instale as dependências:
   ```
npm install
   ```
2. Configure o arquivo `.env` com sua string do MongoDB e chave da OpenWeatherMap.
3. Inicie o servidor:
   ```
npm run dev
   ```

## Endpoints principais
- POST `/api/users/register` — Cadastro de usuário
- POST `/api/users/login` — Login
- POST `/api/appointments` — Agendar consulta (autenticado)
- GET `/api/appointments` — Listar consultas (autenticado)
- GET `/api/admin/dashboard` — Painel administrativo (autenticado)

