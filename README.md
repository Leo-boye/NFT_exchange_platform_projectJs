## Setup `.env` file

```bash
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_HOST="localhost"
DATABASE_PORT="5463"
DATABASE_NAME="database"
DATABASE_SCHEMA="public"

DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}"

JWT_SECRET="secret"
```

## Setup database

```bash
docker compose --env-file .env up -d
```

## Create database tables

```bash
npx prisma migrate dev --name migration
```

## Create admin user

```bash
npx ts-node database/load_db.ts
```

## Start server

```bash
npm run start
```

## Package choices

* `class-transformer` for DTO data validation
* `class-validator` for DTO data validation
* `config` for environment variables
* `generate-password` for password generation
* `jwt` for token generation
* `prisma` for database management (good for migrations and ORM)
* `passport` for authentication
* `swagger` for API documentation

## Author

* Léo Boyé (leo.boye@epita.fr)
* Mathis Aymonin (mathis.aymonin@epita.fr)