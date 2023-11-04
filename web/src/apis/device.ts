import {
  ApiDevicePutRequest,
  ApiDevicePutResponse,
  ApiDevicesGetResponse,
  ApiDevicesPostRequest,
  ApiDeviceStatePostRequest,
} from "@/app/api/types";
import { baseApi } from "./base";

export const deviceApi = {
  async getDevices() {
    const res = await baseApi.GET<ApiDevicesGetResponse>("/api/devices");
    return res;
  },

  async getDevice(id: string) {
    const res = await baseApi.GET<ApiDevicesGetResponse>(`/api/devices/${id}`);
    return res;
  },

  async createDevice(input: ApiDevicesPostRequest) {
    const res = await baseApi.POST<ApiDevicesPostRequest>(
      "/api/devices",
      input,
    );
    return res;
  },

  async updateDevice(id: string, input: ApiDevicePutRequest) {
    const res = await baseApi.PUT<ApiDevicePutResponse>(
      `/api/devices/${id}`,
      input,
    );
    return res;
  },

  async deleteDevice(id: string) {
    const res = await baseApi.DELETE<void>(`/api/devices/${id}`);
    return res;
  },

  async updateDeviceState({
    id,
    ...input
  }: ApiDeviceStatePostRequest & { id: number }) {
    const res = await baseApi.POST<ApiDevicePutResponse>(
      `/api/devices/${id}/state`,
      input,
    );
    return res;
  },
};
