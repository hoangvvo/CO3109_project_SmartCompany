BEGIN;
ALTER TABLE device
  DROP COLUMN wattage;
COMMIT;
