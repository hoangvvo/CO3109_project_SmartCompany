# Smart Company

HCMUT CO3109 project Smart Company.

## Instruction

1. Create a `.env.local` file in the root directory of the project.

```env
DATABASE_URL=
```

2. Run database migration (optional)

We use [golang-migrate/migrate](https://github.com/golang-migrate/migrate) for migration.

```sh
migrate -source file://./db/migrations -database "$DATABASE_URL?options=endpoint%3D[endpoint_id]" up
```

To create a new migration file, run:

```sh
migrate create -ext sql -dir ./db/migrations -seq <migration_name>
```

3. Install dependencies

```sh
npm install
```

4. Run the project

```sh
npm run dev
```
