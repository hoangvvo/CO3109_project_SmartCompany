import { api } from "./api";
import { GetAllDeviceActivitiesRequest } from "./openapi";

export const deviceActivityApi = {
  getDeviceActivities(id: string) {
    return api.getDeviceActivities({
      deviceId: Number(id),
    });
  },

  async getAllDeviceActivities(variables: GetAllDeviceActivitiesRequest) {
    return api.getAllDeviceActivities(variables);
  },
};
