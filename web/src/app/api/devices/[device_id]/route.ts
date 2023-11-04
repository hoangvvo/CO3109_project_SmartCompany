import { deviceRepository } from "@/backend/database";
import { DeviceDbObject } from "@/backend/database/types";
import { unauthorizedResponse } from "@/backend/http";
import { authService } from "@/backend/services";
import { cookies } from "next/headers";

export type ApiDeviceGetResponse = DeviceDbObject;

export async function GET(
  request: Request,
  { params }: { params: { device_id: string } },
) {
  const user = await authService.getUserBySession(
    cookies().get("authToken")?.value,
  );

  if (!user) {
    return unauthorizedResponse;
  }

  const device = await deviceRepository.getDeviceById(Number(params.device_id));

  if (!device) {
    return Response.json({ message: "Device not found" }, { status: 404 });
  }

  return Response.json(device);
}

export type ApiDevicePutRequest = Pick<
  DeviceDbObject,
  "name" | "path" | "description" | "description_location" | "device_category"
>;

export type ApiDevicePutResponse = DeviceDbObject;

export async function PUT(
  request: Request,
  { params }: { params: { device_id: string } },
) {
  const user = await authService.getUserBySession(
    cookies().get("authToken")?.value,
  );

  if (!user) {
    return unauthorizedResponse;
  }

  const {
    name,
    path,
    description,
    description_location,
    device_category,
  }: ApiDevicePutRequest = await request.json();

  const updatedDevice = await deviceRepository.updateDevice({
    id: Number(params.device_id),
    user_id: user.id,
    name,
    path,
    description,
    description_location,
    device_category,
  });

  return Response.json(updatedDevice);
}

export async function DELETE(request: Request) {
  const user = await authService.getUserBySession(
    cookies().get("authToken")?.value,
  );

  if (!user) {
    return unauthorizedResponse;
  }

  const device = await request.json();

  await deviceRepository.deleteDeviceById(device);

  return new Response(null, { status: 204 });
}
