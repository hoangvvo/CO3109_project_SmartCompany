import { api } from "./api";
import {
  CreateDeviceRequest,
  SetDeviceStateRequest,
  UpdateDeviceRequest,
} from "./openapi";

export const deviceApi = {
  async getDevices() {
    return api.getDevices();
  },

  async getDevice(id: string) {
    return api.getDevice({
      deviceId: Number(id),
    });
  },

  async createDevice(input: CreateDeviceRequest) {
    return api.createDevice({
      createDeviceRequest: input,
    });
  },

  async updateDevice({ id, ...input }: UpdateDeviceRequest & { id: number }) {
    return api.updateDevice({
      deviceId: id,
      updateDeviceRequest: input,
    });
  },

  async deleteDevice(id: string) {
    return api.deleteDevice({
      deviceId: Number(id),
    });
  },

  async updateDeviceState({
    id,
    ...input
  }: SetDeviceStateRequest & { id: number }) {
    return api.setDeviceState({
      deviceId: id,
      setDeviceStateRequest: input,
    });
  },
};
