BEGIN;

CREATE TYPE device_state_type AS ENUM ('on', 'off');
CREATE TYPE device_category_type AS ENUM (
    'light',
    'thermostat',
    'door',
    'air_conditioner',
    'fan'
);

CREATE TABLE device (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES app_user(id),
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    description TEXT NULL,
    description_location VARCHAR(255) NULL,
    device_category device_category_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    current_state device_state_type NOT NULL DEFAULT 'off',
    current_value NUMERIC NULL,
    current_extra_data JSONB NULL
);

CREATE TABLE device_activity (
    id SERIAL PRIMARY KEY,
    device_id INTEGER NOT NULL REFERENCES device(id) ON DELETE CASCADE,
    current_state device_state_type NOT NULL,
    current_value NUMERIC NULL,
    current_extra_data JSONB NULL,
    duration_seconds INTEGER NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX device_activity_created_at_idx ON device_activity(created_at);

COMMIT;