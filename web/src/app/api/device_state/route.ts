import { deviceActivityRepository, deviceRepository } from "@/backend/database";
import { DeviceStateType } from "@/backend/database/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") as string;
  if (!path) {
    return Response.json(
      {
        message: "Missing path",
      },
      { status: 400 },
    );
  }

  const device = await deviceRepository.getDeviceByPath(path);

  if (!device) {
    return Response.json(
      {
        message: `Device with path ${path} not found`,
      },
      { status: 404 },
    );
  }

  const lastActivity = await deviceActivityRepository.getLastDeviceActivityById(
    device.id,
  );

  if (lastActivity) {
    // update last activity with duration
    await deviceActivityRepository.updateDeviceActivity({
      ...lastActivity,
      duration_seconds: Math.floor(
        (Date.now() - lastActivity.created_at.getTime()) / 1000,
      ),
    });
  }

  const { state, value, extra_data } = (await request.json()) as {
    path: string;
    state: DeviceStateType;
    value: number;
    extra_data: any;
  };

  const createdActivity = await deviceActivityRepository.createDeviceActivity({
    device_id: device.id,
    current_state: state,
    current_value: value,
    current_extra_data: extra_data,
  });

  return Response.json(createdActivity);
}
