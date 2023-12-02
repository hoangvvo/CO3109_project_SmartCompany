BEGIN;
CREATE TYPE logical_operator_type AS ENUM(
  'and',
  'or'
);
CREATE TYPE automation_condition_type AS ENUM(
  'device',
  'cron'
);
CREATE TYPE condition_operator_type AS ENUM(
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte'
);
CREATE TABLE automation(
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES app_user(id),
  name varchar(255) NOT NULL,
  description text NULL,
  logical_operator logical_operator_type NOT NULL
);
CREATE TABLE automation_condition(
  id serial PRIMARY KEY,
  automation_id integer NOT NULL REFERENCES automation(id) ON DELETE CASCADE,
  condition_type automation_condition_type NOT NULL,
  device_id integer NULL REFERENCES device(id) ON DELETE CASCADE,
  device_property varchar(255) NULL,
  condition_operator condition_operator_type NULL,
  condition_value numeric NULL,
  cron_expression varchar(255) NULL
);
CREATE TABLE automation_action(
  id serial PRIMARY KEY,
  automation_id integer NOT NULL REFERENCES automation(id) ON DELETE CASCADE,
  device_id integer NULL REFERENCES device(id) ON DELETE CASCADE,
  device_state device_state_type NULL,
  device_value numeric NULL,
  device_extra_data jsonb NULL
);
CREATE TABLE automation_activity(
  id serial PRIMARY KEY,
  automation_id integer NOT NULL REFERENCES automation(id) ON DELETE CASCADE,
  created_at timestamp NOT NULL DEFAULT NOW()
);
CREATE INDEX automation_activity_created_at_idx ON automation_activity(created_at);
COMMIT;

