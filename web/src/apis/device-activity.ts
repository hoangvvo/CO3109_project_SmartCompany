import { api } from "./api";

export const deviceActivityApi = {
  getDeviceActivities(id: string) {
    return api.getDeviceActivities({
      deviceId: Number(id),
    });
  },

  async getAllDeviceActivities() {
    return api.getAllDeviceActivities();
  },
};
