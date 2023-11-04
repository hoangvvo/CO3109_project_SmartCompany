import { connect } from "mqtt";
import { handleStateMessage } from "./handler";

const client = connect({
  host: "76ce80b3597543e1ba0c836518fdac5e.s2.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "admin",
  password: "password",
});
console.log("MQTT client connecting...");

client.on("connect", () => {
  console.log("MQTT client connected");
});

client.on("error", (error) => {
  console.error("MQTT client error:", error);
});

let hasInitialized = false;

if (!hasInitialized) {
  client.on("message", (topic, message) => {
    console.log(`MQTT client message: ${topic}`, message.toString());
    handleStateMessage(topic, message.toString());
  });

  client.subscribe("device_state_set");
  client.subscribe("device_state_changed");
  hasInitialized = true;
} else {
  console.log("MQTT client already initialized");
}

export { client as mqttClient };
