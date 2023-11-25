import { api } from "./api";
import {
  CreateAutomationRequest,
  ReplaceAutomationConditionsRequest,
  UpdateAutomationRequest,
} from "./openapi";

export const automationApi = {
  async getAutomations() {
    return api.getAutomations();
  },

  async getAutomation(id: number) {
    return api.getAutomation({
      automationId: id,
    });
  },

  async createAutomation(input: CreateAutomationRequest) {
    return api.createAutomation({
      createAutomationRequest: input,
    });
  },

  async updateAutomation({
    id,
    ...input
  }: UpdateAutomationRequest & { id: number }) {
    return api.updateAutomation({
      automationId: id,
      updateAutomationRequest: input,
    });
  },

  async deleteAutomation(id: number) {
    return api.deleteAutomation({
      automationId: id,
    });
  },

  async replaceAutomationConditions({
    ...input
  }: ReplaceAutomationConditionsRequest & { automationId: number }) {
    return api.replaceAutomationConditions({
      automationId: input.automationId,
      replaceAutomationConditionsRequest: input,
    });
  },
};
