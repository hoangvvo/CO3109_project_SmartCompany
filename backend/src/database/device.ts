import { pool } from "./database.js";
import type { DeviceActivityDbObject, DeviceDbObject } from "./types.js";

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

    return res.rows[0];
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

  async getAllDeviceActivities(filters?: {
    filter_device_ids?: number[];
    start_date?: Date;
    end_date?: Date;
  }) {
    const { filter_device_ids, start_date, end_date } = filters || {};

    // Base SQL query
    let sql = `SELECT da.*, d.id AS deviceId, d.name, d.wattage, d.description_location, d.device_category FROM device_activity da INNER JOIN device d ON da.device_id = d.id`;
    const params = [];
    const conditions = [];

    // Add filters to the query
    if (filter_device_ids && filter_device_ids.length) {
      params.push(filter_device_ids);
      conditions.push(`d.id = ANY($${params.length})`);
    }

    if (start_date) {
      params.push(start_date);
      conditions.push(`da.started_at >= $${params.length}`);
    }

    if (end_date) {
      params.push(end_date);
      conditions.push(
        `(da.ended_at <= $${params.length} OR da.ended_at IS NULL)`,
      );
    }

    if (conditions.length) {
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += ` ORDER BY da.started_at DESC`;

    const res = await pool.query<
      DeviceActivityDbObject &
        Pick<
          DeviceDbObject,
          "name" | "wattage" | "description_location" | "device_category"
        > & {
          deviceId: number;
        }
    >(sql, params);

    return (
      res.rows.map((deviceActivity) => ({
        ...deviceActivity,
        device: {
          id: deviceActivity.device_id,
          name: deviceActivity.name,
          wattage: deviceActivity.wattage,
          description_location: deviceActivity.description_location,
          device_category: deviceActivity.device_category,
        },
      })) || []
    );
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

    return (
      res.rows.map((deviceActivity) => ({
        ...deviceActivity,
        device: {
          name: deviceActivity.name,
        },
      })) || []
    );
  },

  async createDeviceActivity(
    deviceActivity: Omit<DeviceActivityDbObject, "id" | "created_at">,
  ) {
    const res = await pool.query<DeviceActivityDbObject>(
      `
        INSERT INTO device_activity (device_id, current_state, current_value, current_extra_data, started_at, ended_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [
        deviceActivity.device_id,
        deviceActivity.current_state,
        deviceActivity.current_value,
        deviceActivity.current_extra_data,
        deviceActivity.started_at,
        deviceActivity.ended_at,
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
        SET device_id = $1, current_state = $2, current_value = $3, current_extra_data = $4, started_at = $5, ended_at = $6
        WHERE id = $7
        RETURNING *
        `,
      [
        deviceActivity.device_id,
        deviceActivity.current_state,
        deviceActivity.current_value,
        deviceActivity.current_extra_data,
        deviceActivity.started_at,
        deviceActivity.ended_at,
        deviceActivity.id,
      ],
    );

    return res.rows[0];
  },
};
