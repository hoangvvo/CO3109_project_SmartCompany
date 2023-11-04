import { pool } from "./database";
import { DeviceActivityDbObject, DeviceDbObject } from "./types";

export const deviceRepository = {
  async getDeviceById(id: number) {
    const res = await pool.query<DeviceDbObject>(
      `SELECT * FROM device WHERE id = $1`,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getDeviceByPath(path: string) {
    const res = await pool.query<DeviceDbObject>(
      `SELECT * FROM device WHERE path = $1`,
      [path],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getAllDevices() {
    const res = await pool.query<DeviceDbObject>(
      `SELECT * FROM device ORDER BY created_at DESC`,
    );

    if (res.rowCount === 0) {
      return [];
    }

    return res.rows;
  },

  async createDevice(device: Omit<DeviceDbObject, "id" | "created_at">) {
    const res = await pool.query<DeviceDbObject>(
      `
        INSERT INTO device (user_id, name, path, description, description_location, device_category, current_state, current_value, current_extra_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `,
      [
        device.user_id,
        device.name,
        device.path,
        device.description,
        device.description_location,
        device.device_category,
        device.current_state,
        device.current_value,
        device.current_extra_data,
      ],
    );

    return res.rows[0];
  },

  async updateDevice(device: Omit<DeviceDbObject, "created_at">) {
    const res = await pool.query<DeviceDbObject>(
      `
        UPDATE device
        SET user_id = $1, name = $2, path = $3, description = $4, description_location = $5, device_category = $6, current_state = $7, current_value = $8, current_extra_data = $9
        WHERE id = $10
        RETURNING *
        `,
      [
        device.user_id,
        device.name,
        device.path,
        device.description,
        device.description_location,
        device.device_category,
        device.current_state,
        device.current_value,
        device.current_extra_data,
        device.id,
      ],
    );
  },

  async deleteDeviceById(id: number) {
    await pool.query(
      `
        DELETE FROM device
        WHERE id = $1
        `,
      [id],
    );
  },
};

export const deviceActivityRepository = {
  async getLastDeviceActivityById(id: number) {
    const res = await pool.query<DeviceActivityDbObject>(
      `SELECT * FROM device_activity WHERE id = $1 ORDER BY created_at DESC LIMIT 1`,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  async getAllDeviceActivities() {
    const res = await pool.query<
      DeviceActivityDbObject & Pick<DeviceDbObject, "name">
    >(`
      SELECT device_activity.*, device.name FROM device_activity
      JOIN device ON device.id = device_activity.device_id
      ORDER BY device_activity.created_at DESC
      `);

    if (res.rowCount === 0) {
      return [];
    }

    return res.rows;
  },

  async getAllDeviceActivitiesByDeviceId(device_id: number) {
    const res = await pool.query<
      DeviceActivityDbObject & Pick<DeviceDbObject, "name">
    >(
      `
      SELECT device_activity.*, device.name FROM device_activity
      JOIN device ON device.id = device_activity.device_id
      WHERE device_id = $1
      ORDER BY device_activity.created_at DESC
      `[device_id],
    );

    if (res.rowCount === 0) {
      return [];
    }

    return res.rows;
  },

  async createDeviceActivity(
    deviceActivity: Omit<DeviceActivityDbObject, "id" | "created_at">,
  ) {
    const res = await pool.query<DeviceActivityDbObject>(
      `
        INSERT INTO device_activity (device_id, current_state, current_value, current_extra_data, duration_seconds)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [
        deviceActivity.device_id,
        deviceActivity.current_state,
        deviceActivity.current_value,
        deviceActivity.current_extra_data,
        deviceActivity.duration_seconds,
      ],
    );

    return res.rows[0];
  },

  async updateDeviceActivity(
    deviceActivity: Omit<DeviceActivityDbObject, "created_at">,
  ) {
    const res = await pool.query<DeviceActivityDbObject>(
      `
        UPDATE device_activity
        SET device_id = $1, current_state = $2, current_value = $3, current_extra_data = $4, duration_seconds = $5
        WHERE id = $6
        RETURNING *
        `,
      [
        deviceActivity.device_id,
        deviceActivity.current_state,
        deviceActivity.current_value,
        deviceActivity.current_extra_data,
        deviceActivity.duration_seconds,
        deviceActivity.id,
      ],
    );
  },
};
