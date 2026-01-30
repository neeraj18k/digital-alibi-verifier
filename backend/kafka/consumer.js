const { Kafka } = require("kafkajs");
const Event = require("../models/Event");

const kafka = new Kafka({
  clientId: "alibi-consumer",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "alibi-group" });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "alibi-events", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());

      await Event.create({
        caseId: event.caseId,
        type: event.type,
        timestamp: new Date(event.timestamp),
        data: event.data,
      });

      console.log("📥 Event stored from Kafka:", event.type);
    },
  });
};

module.exports = { startConsumer };
