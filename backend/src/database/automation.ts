import { pool } from "./database.js";
import type {
  AutomationActionDbObject,
  AutomationActivityDbObject,
  AutomationConditionDbObject,
  AutomationDbObject,
} from "./types.ts";

export const automationRepository = {
  // Fetch a single automation by its ID
  async getAutomationById(id: number) {
    const res = await pool.query<AutomationDbObject>(
      `SELECT * FROM automation WHERE id = $1`,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  // Fetch all automations
  async getAllAutomations() {
    const res = await pool.query<AutomationDbObject>(
      `SELECT * FROM automation`,
    );

    return res.rows;
  },

  // Create a new automation
  async createAutomation(automation: Omit<AutomationDbObject, "id">) {
    const { user_id, name, description, logical_operator } = automation;
    const res = await pool.query<AutomationDbObject>(
      `
        INSERT INTO automation (user_id, name, description, logical_operator)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [user_id, name, description, logical_operator],
    );

    return res.rows[0];
  },

  // Update an existing automation
  async updateAutomation(automation: Omit<AutomationDbObject, "user_id">) {
    const { id, name, description, logical_operator } = automation;
    const res = await pool.query<AutomationDbObject>(
      `
        UPDATE automation
        SET name = $1, description = $2, logical_operator = $3
        WHERE id = $4
        RETURNING *
      `,
      [name, description, logical_operator, id],
    );

    return res.rows[0];
  },

  // Delete an automation by its ID
  async deleteAutomationById(id: number) {
    await pool.query(
      `
        DELETE FROM automation
        WHERE id = $1
      `,
      [id],
    );
  },
};

export const automationConditionRepository = {
  // Fetch all conditions for a specific automation
  async getConditionsByAutomationId(automationId: number) {
    const res = await pool.query<AutomationConditionDbObject>(
      `SELECT * FROM automation_condition WHERE automation_id = $1`,
      [automationId],
    );

    return res.rows;
  },

  // Create a new automation condition
  async replaceConditionsByAutomationId(
    automationId: number,
    conditions: Omit<AutomationConditionDbObject, "id" | "automation_id">[],
  ) {
    // Delete all existing conditions for this automation
    await pool.query(
      `
        DELETE FROM automation_condition
        WHERE automation_id = $1
      `,
      [automationId],
    );

    // Create new conditions for this automation
    const res = await pool.query<AutomationConditionDbObject>(
      `
        INSERT INTO automation_condition (automation_id, condition_type, device_id, device_property, condition_operator, condition_value, cron_expression)
        VALUES ${conditions
          .map(
            (_, index) =>
              `($1, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${
                index * 6 + 5
              }, $${index * 6 + 6}, $${index * 6 + 7})`,
          )
          .join(", ")}
        RETURNING *
      `,
      [
        automationId,
        ...conditions.flatMap((condition) => [
          condition.condition_type,
          condition.device_id,
          condition.device_property,
          condition.condition_operator,
          condition.condition_value,
          condition.cron_expression,
        ]),
      ],
    );

    return res.rows;
  },
};

export const automationActionRepository = {
  // Fetch all actions for a specific automation
  async getActionsByAutomationId(automationId: number) {
    const res = await pool.query<AutomationActionDbObject>(
      `SELECT * FROM automation_action WHERE automation_id = $1`,
      [automationId],
    );

    return res.rows;
  },

  // Create a new automation action
  async updateActionForAutomation(
    action: Omit<AutomationActionDbObject, "id" | "created_at">,
  ) {
    const existingActionRes = await pool.query<AutomationActionDbObject>(
      `SELECT * FROM automation_action WHERE automation_id = $1`,
      [action.automation_id],
    );
    if (existingActionRes.rowCount === 0) {
      const res = await pool.query<AutomationActionDbObject>(
        `
          INSERT INTO automation_action (automation_id, device_id, device_state, device_value, device_extra_data)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `,
        [
          action.automation_id,
          action.device_id,
          action.device_state,
          action.device_value,
          action.device_extra_data,
        ],
      );

      return res.rows;
    } else {
      const res = await pool.query<AutomationActionDbObject>(
        `
          UPDATE automation_action
          SET device_id = $1, device_state = $2, device_value = $3, device_extra_data = $4
          WHERE automation_id = $5
          RETURNING *
        `,
        [
          action.device_id,
          action.device_state,
          action.device_value,
          action.device_extra_data,
          action.automation_id,
        ],
      );

      return res.rows;
    }
  },

  // Delete an automation action by its ID
  async deleteActionById(id: number) {
    await pool.query(
      `
        DELETE FROM automation_action
        WHERE id = $1
      `,
      [id],
    );
  },
};

export const automationActivityRepository = {
  // Fetch a single automation activity by its ID
  async getActivityById(id: number) {
    const res = await pool.query<AutomationActivityDbObject>(
      `SELECT * FROM automation_activity WHERE id = $1`,
      [id],
    );

    if (res.rowCount === 0) {
      return null;
    }

    return res.rows[0];
  },

  // Fetch all activities for a specific automation
  async getActivitiesByAutomationId(automationId: number) {
    const res = await pool.query<AutomationActivityDbObject>(
      `SELECT * FROM automation_activity WHERE automation_id = $1`,
      [automationId],
    );

    return res.rows;
  },

  // Create a new automation activity
  async createActivity(
    activity: Omit<AutomationActivityDbObject, "id" | "created_at">,
  ) {
    const { automation_id } = activity;
    const res = await pool.query<AutomationActivityDbObject>(
      `
        INSERT INTO automation_activity (automation_id)
        VALUES ($1)
        RETURNING *
      `,
      [automation_id],
    );

    return res.rows[0];
  },

  // Delete an automation activity by its ID
  async deleteActivityById(id: number) {
    await pool.query(
      `
        DELETE FROM automation_activity
        WHERE id = $1
      `,
      [id],
    );
  },
};
