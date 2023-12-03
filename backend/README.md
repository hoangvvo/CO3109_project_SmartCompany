# smart-company

## Instruction

1. Create a `.env` file in the root directory of the project.

```env
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable
REDIS_URL=redis://localhost:6379
BROKER_URL=mqtt://localhost:1883
```

2. Install dependencies

```sh
npm install
```

3. Start docker compose

```sh
docker-compose up
```

In another terminal:

3. Build the project

```sh
npm run build
```

4. Run the project

```sh
npm run start
```

## Workflows

1. Run database migration

We use [golang-migrate/migrate](https://github.com/golang-migrate/migrate) for migration.

```sh
migrate -source file://./migrations -database "$DATABASE_URL" up
```

2. Create new migration file, run:

```sh
migrate create -ext sql -dir ./migrations -seq <migration_name>
```

3. Import mock data

```sh
psql -U postgres -d postgres -f ./e2e/mock-data.sql
```

## TODO

- [ ] Implement Redis queue to support horizontal scaling (handling duplicate MQTT messages and Cron execution)
