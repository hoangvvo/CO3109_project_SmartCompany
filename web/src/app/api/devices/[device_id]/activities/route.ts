import { deviceActivityRepository, deviceRepository } from "@/backend/database";
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

  if (!device) {
    return Response.json({ message: "Device not found" }, { status: 404 });
  }

  const deviceActivities =
    await deviceActivityRepository.getAllDeviceActivitiesByDeviceId(device.id);

  return Response.json(deviceActivities);
}
