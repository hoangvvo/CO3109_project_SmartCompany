import { ApiDeviceActivitiesGetResponse } from "@/app/api/types";
import { baseApi } from "./base";

export const deviceActivityApi = {
  async getDeviceActivities(id: string) {
    const res = await baseApi.GET<ApiDeviceActivitiesGetResponse>(
      `/api/devices/${id}/activities`,
    );
    return res;
  },

  async getAllDeviceActivities() {
    const res = await baseApi.GET<ApiDeviceActivitiesGetResponse>(
      `/api/device-activities`,
    );
    return res;
  },
};
