import { connect } from "mqtt";

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

export { client as mqttClient };
