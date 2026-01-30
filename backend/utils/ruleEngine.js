const evaluateAlibi = (events, startTime, endTime) => {
  // Filter events that occur during the claimed alibi time range
  const activitiesDuringClaim = events.filter(event => {
    const eventTime = new Date(event.timestamp);
    return eventTime >= new Date(startTime) && eventTime <= new Date(endTime);
  });

  if (activitiesDuringClaim.length > 0) {
    // Found activity during claimed sleep/alibi time
    return {
      result: 'FALSE',
      reason: `Digital activity detected during claimed alibi period. Found ${activitiesDuringClaim.length} activity event(s) between ${new Date(startTime).toLocaleString()} and ${new Date(endTime).toLocaleString()}.`,
      activities: activitiesDuringClaim
    };
  } else {
    // No activity found during claimed time
    return {
      result: 'TRUE',
      reason: `No digital activity detected during the claimed alibi period from ${new Date(startTime).toLocaleString()} to ${new Date(endTime).toLocaleString()}. Alibi claim is supported by the absence of digital footprints.`,
      activities: []
    };
  }
};

module.exports = { evaluateAlibi };
