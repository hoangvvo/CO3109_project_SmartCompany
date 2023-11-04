BEGIN;

DROP INDEX device_activity_created_at_idx;
DROP TABLE device_activity;
DROP TABLE device;
DROP TYPE device_category_type;
DROP TYPE device_state_type;

COMMIT;