export default function DevicePage({
  params,
}: {
  params: {
    device_id: string;
  };
}) {
  return <div>Device {params.device_id}</div>;
}
