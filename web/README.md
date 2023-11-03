# Smart Company

HCMUT CO3109 project Smart Company.

## Instruction

1. Create a `.env.local` file in the root directory of the project.

```env
DATABASE_URL=
```

2. Start Docker Compose, which includes PostgreSQL and other dependencies.

```sh
docker compose --env-file .env.local up
```

3. Run database migration

We use [golang-migrate/migrate](https://github.com/golang-migrate/migrate) for migration.

```sh
migrate -source file://./db/migrations -database "$DATABASE_URL" up
```

To create a new migration file, run:

```sh
migrate create -ext sql -dir ./db/migrations -seq <migration_name>
```
