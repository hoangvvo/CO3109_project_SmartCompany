import { connect } from "mqtt";
import { BROKER_URL } from "../constants/environments.js";

const client = connect(BROKER_URL);
console.log("MQTT client connecting...");

client.on("connect", () => {
  console.log("MQTT client connected");
});

client.on("error", (error) => {
  console.error("MQTT client error:", error);
});

export { client as mqttClient };
