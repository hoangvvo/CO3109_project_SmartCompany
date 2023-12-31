import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { NotFoundError, UnauthorizedError } from "../../constants/errors.js";
import {
  automationActionRepository,
  automationConditionRepository,
  automationRepository,
} from "../../database/automation.js";
import {
  automationActionPutSchema,
  automationConditionsPutSchema,
  automationDeleteSchema,
  automationGetSchema,
  automationPostSchema,
  automationPutSchema,
  automationsGetSchema,
} from "./schema.js";

export const automationRouter: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.auth);

  fastify.get("/", { schema: automationsGetSchema }, async () => {
    const automations = await automationRepository.getAllAutomations();

    return { automations };
  });

  fastify.post("/", { schema: automationPostSchema }, async (request) => {
    if (!request.user) {
      throw new UnauthorizedError();
    }

    const automationDbObject = await automationRepository.createAutomation({
      user_id: request.user.id,
      name: request.body.name,
      description: request.body.description || null,
      logical_operator: request.body.logical_operator,
    });

    return { automation: automationDbObject };
  });

  fastify.get(
    "/:automationId",
    { schema: automationGetSchema },
    async (request) => {
      const automation = await automationRepository.getAutomationById(
        request.params.automationId,
      );

      if (!automation) {
        throw new NotFoundError();
      }

      return {
        automation: {
          ...automation,
          conditions:
            await automationConditionRepository.getConditionsByAutomationId(
              automation.id,
            ),
          actions: await automationActionRepository.getActionsByAutomationId(
            automation.id,
          ),
        },
      };
    },
  );

  fastify.put(
    "/:automationId",
    { schema: automationPutSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const automationDbObject = await automationRepository.updateAutomation({
        id: request.params.automationId,
        name: request.body.name,
        description: request.body.description || null,
        logical_operator: request.body.logical_operator || null,
      });

      if (!automationDbObject) {
        throw new NotFoundError();
      }

      return { automation: automationDbObject };
    },
  );

  fastify.delete(
    "/:automationId",
    { schema: automationDeleteSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const automationDbObject = await automationRepository.getAutomationById(
        request.params.automationId,
      );

      if (!automationDbObject) {
        throw new NotFoundError();
      }

      await automationRepository.deleteAutomationById(
        request.params.automationId,
      );

      return null;
    },
  );

  fastify.put(
    "/:automationId/conditions",
    { schema: automationConditionsPutSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const automation = await automationRepository.getAutomationById(
        request.params.automationId,
      );

      if (!automation) {
        throw new NotFoundError();
      }

      const conditions =
        await automationConditionRepository.replaceConditionsByAutomationId(
          automation.id,
          request.body.conditions,
        );

      return { conditions };
    },
  );

  fastify.put(
    "/:automationId/actions",
    { schema: automationActionPutSchema },
    async (request) => {
      if (!request.user) {
        throw new UnauthorizedError();
      }

      const automation = await automationRepository.getAutomationById(
        request.params.automationId,
      );

      if (!automation) {
        throw new NotFoundError();
      }

      const actions =
        await automationActionRepository.updateActionForAutomation({
          automation_id: automation.id,
          ...request.body.action,
          device_extra_data: null,
        });

      return { actions };
    },
  );
};
