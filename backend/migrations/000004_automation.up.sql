BEGIN;

CREATE TYPE logical_operator_type AS ENUM ('and', 'or');
CREATE TYPE automation_condition_type AS ENUM ('device', 'cron');

CREATE TABLE automation (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES app_user(id),
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  logical_operator logical_operator_type NOT NULL
);

CREATE TABLE automation_condition (
  id SERIAL PRIMARY KEY,
  automation_id INTEGER NOT NULL REFERENCES automation(id) ON DELETE CASCADE,
  condition_type automation_condition_type NOT NULL,
  device_id INTEGER NULL REFERENCES device(id) ON DELETE CASCADE,
  device_state device_state_type NULL,
  device_value NUMERIC NULL,
  device_extra_data JSONB NULL,
  cron_expression VARCHAR(255) NULL
);

CREATE TABLE automation_action (
  id SERIAL PRIMARY KEY,
  automation_id INTEGER NOT NULL REFERENCES automation(id) ON DELETE CASCADE,
  device_id INTEGER NULL REFERENCES device(id) ON DELETE CASCADE,
  device_state device_state_type NULL,
  device_value NUMERIC NULL,
  device_extra_data JSONB NULL
);

CREATE TABLE automation_activity (
  id SERIAL PRIMARY KEY,
  automation_id INTEGER NOT NULL REFERENCES automation(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX automation_activity_created_at_idx ON automation_activity(created_at);

COMMIT;