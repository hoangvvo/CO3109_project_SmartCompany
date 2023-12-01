BEGIN;
CREATE TYPE device_state_type AS ENUM(
    'on',
    'off'
);
CREATE TYPE device_category_type AS ENUM(
    'light',
    'thermostat',
    'door',
    'air_conditioner',
    'fan'
);
CREATE TABLE device(
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES app_user(id),
    name varchar(255) NOT NULL,
    path varchar(255) NOT NULL,
    description text NULL,
    description_location varchar(255) NULL,
    device_category device_category_type NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    current_state device_state_type NOT NULL DEFAULT 'off',
    current_value numeric NULL,
    current_extra_data jsonb NULL
);
CREATE TABLE device_activity(
    id serial PRIMARY KEY,
    device_id integer NOT NULL REFERENCES device(id) ON DELETE CASCADE,
    current_state device_state_type NOT NULL,
    current_value numeric NULL,
    current_extra_data jsonb NULL,
    started_at timestamp NOT NULL DEFAULT NOW(),
    ended_at timestamp NULL
);
CREATE INDEX device_activity_started_at_idx ON device_activity(started_at);
CREATE INDEX device_activity_ended_at_idx ON device_activity(ended_at);
COMMIT;

