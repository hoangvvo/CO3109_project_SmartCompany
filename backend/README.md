# smart-company

## Requirements

The following tools are required to run the project:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) (v20)
- [Migrate CLI](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate)
- [pgAdmin](https://www.pgadmin.org/download/)

## Instruction

Note for teacher: You can skip all the steps related to backend if you use the .env file that come with the ZIP file of the BKEL submission.

1. Create a `.env` file in the root directory (inside `backend` folder) of the project.

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

3. Run database migration (only once)

```sh
migrate -source file://./migrations -database "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" up
```

If you have trouble using this tool, you can run each migration file in [migrations directory](./migrations/) manually using pgAdmin.

4. Import mock data (optional)

You can either run the file [mock-data.sql](./e2e/mock-data.sql) in pgAdmin or run the following command:

```sh
psql -U postgres -d postgres -f ./e2e/mock-data.sql
```

5. Build the project

```sh
npm run build
```

6. Run the project

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

4. Remove docker compose data

```sh
docker compose down -v
docker volume rm $(docker volume ls -q)
```

## TODO

- [ ] Implement Redis queue to support horizontal scaling (handling duplicate MQTT messages and Cron execution)
