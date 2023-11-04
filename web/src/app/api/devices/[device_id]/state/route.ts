import { deviceRepository } from "@/backend/database";
import { mqttClient } from "@/backend/mqtt/client";
import { NextRequest } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { device_id: string } },
) => {
  const device = await deviceRepository.getDeviceById(Number(params.device_id));

  if (!device) {
    return Response.json(
      {
        message: `Device with id ${params.device_id} not found`,
      },
      { status: 404 },
    );
  }

  const { state, value } = await request.json();

  mqttClient.publish(
    "device_state_set",
    JSON.stringify({
      path: device.path,
      state,
      value,
    }),
  );

  return new Response(null, { status: 204 });
};
