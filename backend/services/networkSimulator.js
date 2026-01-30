const Event = require("../models/Event");

const activeSimulations = {};

function startNetworkSimulation(caseId) {
  if (activeSimulations[caseId]) return;

  console.log("🌐 Starting network simulation for case:", caseId);

  activeSimulations[caseId] = setInterval(async () => {
    const fakeDomains = [
      "google.com",
      "instagram.com",
      "youtube.com",
      "whatsapp.net",
      "amazon.in",
      "netflix.com"
    ];

    const event = new Event({
      case: caseId,
      type: "network",
      timestamp: new Date(),
      data: {
        domain: fakeDomains[Math.floor(Math.random() * fakeDomains.length)],
        bytesSent: Math.floor(Math.random() * 5000) + 500,
        bytesReceived: Math.floor(Math.random() * 15000) + 2000,
        ip: "192.168.1." + Math.floor(Math.random() * 255)
      }
    });

    await event.save();
    console.log("📡 Network event generated");

  }, 5000); // every 5 sec
}

function stopNetworkSimulation(caseId) {
  if (activeSimulations[caseId]) {
    clearInterval(activeSimulations[caseId]);
    delete activeSimulations[caseId];
    console.log("🛑 Stopped network simulation");
  }
}

module.exports = { startNetworkSimulation, stopNetworkSimulation };
