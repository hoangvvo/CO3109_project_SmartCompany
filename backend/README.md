# smart-company

1. Run database migration

We use [golang-migrate/migrate](https://github.com/golang-migrate/migrate) for migration.

```sh
migrate -source file://./db/migrations -database "$DATABASE_URL?options=endpoint%3D[endpoint_id]" up
```

To create a new migration file, run:

```sh
migrate create -ext sql -dir ./db/migrations -seq <migration_name>
```
