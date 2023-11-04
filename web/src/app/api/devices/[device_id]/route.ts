import { deviceRepository } from "@/backend/database";
import { DeviceDbObject } from "@/backend/database/types";
import { unauthorizedResponse } from "@/backend/http";
import { authService } from "@/backend/services";
import { cookies } from "next/headers";

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

  return Response.json(device);
}

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
  }: Pick<
    DeviceDbObject,
    "name" | "path" | "description" | "description_location" | "device_category"
  > = await request.json();

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
