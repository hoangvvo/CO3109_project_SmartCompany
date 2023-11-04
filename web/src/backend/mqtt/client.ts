import { BROKER_URL } from "@/constants/environments";
import { connect } from "mqtt";
import { handleStateMessage } from "./handler";

const client = connect(BROKER_URL);

client.on("connect", () => {
  console.log("MQTT client connected");
});

client.on("error", (error) => {
  console.error("MQTT client error:", error);
});

client.on("message", (topic, message) => {
  console.log(`MQTT client message: ${topic}`, message.toString());
  handleStateMessage(topic, message.toString());
});

client.subscribe("device_state_set");
client.subscribe("device_state_changed");

export { client as mqttClient };
