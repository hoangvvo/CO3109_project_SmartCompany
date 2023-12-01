BEGIN;
DROP INDEX device_activity_ended_at_idx;
DROP INDEX device_activity_started_at_idx;
DROP TABLE device_activity;
DROP TABLE device;
DROP TYPE device_category_type;
DROP TYPE device_state_type;
COMMIT;

