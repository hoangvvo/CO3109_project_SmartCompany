import { deviceActivityRepository } from "@/backend/database";
import {
  DeviceActivityDbObject,
  DeviceDbObject,
} from "@/backend/database/types";
import { unauthorizedResponse } from "@/backend/http";
import { authService } from "@/backend/services";
import { cookies } from "next/headers";

export type ApiDeviceActivitiesGetResponse = (DeviceActivityDbObject &
  Pick<DeviceDbObject, "name">)[];

export async function GET(request: Request) {
  const user = await authService.getUserBySession(
    cookies().get("authToken")?.value,
  );

  if (!user) {
    return unauthorizedResponse;
  }

  const deviceActivities =
    await deviceActivityRepository.getAllDeviceActivities();

  return Response.json(deviceActivities);
}
