import { deviceRepository } from "@/backend/database";
import { DeviceDbObject } from "@/backend/database/types";
import { unauthorizedResponse } from "@/backend/http";
import { authService } from "@/backend/services";
import { cookies } from "next/headers";

export type ApiDevicesGetResponse = DeviceDbObject[];

export async function GET() {
  const user = await authService.getUserBySession(
    cookies().get("authToken")?.value,
  );

  if (!user) {
    return unauthorizedResponse;
  }

  const devices = await deviceRepository.getAllDevices();

  return Response.json(devices);
}

export type ApiDevicesPostRequest = Pick<
  DeviceDbObject,
  "name" | "path" | "description" | "description_location" | "device_category"
>;

export async function POST(request: Request) {
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
  }: ApiDevicesPostRequest = await request.json();

  const createdDevice = await deviceRepository.createDevice({
    user_id: user.id,
    name,
    path,
    description,
    description_location,
    device_category,
  });

  return Response.json(createdDevice);
}
