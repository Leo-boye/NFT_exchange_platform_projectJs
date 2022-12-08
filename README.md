## Setup `.env` file

```bash
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_HOST="localhost"
DATABASE_PORT="5463"
DATABASE_NAME="database"
DATABASE_SCHEMA="public"

DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}"
```

## Setup database

```bash
docker compose --env-file .env up -d
```

## Create database tables

```bash
npx prisma migrate dev --name migration
```