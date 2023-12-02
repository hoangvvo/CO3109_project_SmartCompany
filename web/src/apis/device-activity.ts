import { api } from "./api";
import { GetAllDeviceActivitiesRequest } from "./openapi";

export const deviceActivityApi = {
  getDeviceActivities(id: number) {
    return api.getDeviceActivities({
      deviceId: id,
    });
  },

  async getAllDeviceActivities(variables: GetAllDeviceActivitiesRequest) {
    return api.getAllDeviceActivities(variables);
  },
};
