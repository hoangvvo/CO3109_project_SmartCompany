BEGIN;
ALTER TABLE device
  ADD COLUMN wattage INTEGER NULL;
COMMIT;

