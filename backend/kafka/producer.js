const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "alibi-producer",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka.producer();

const initProducer = async () => {
  await producer.connect();
  console.log("✅ Kafka Producer Connected");
};

const produceEvent = async (event) => {
  await producer.send({
    topic: "alibi-events",
    messages: [{ key: event.caseId.toString(), value: JSON.stringify(event) }],
  });
};

module.exports = { initProducer, produceEvent };
