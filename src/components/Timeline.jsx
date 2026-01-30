import React from "react";
import {
  FaImage,
  FaMapMarkerAlt,
  FaWifi,
  FaMobileAlt,
  FaClock
} from "react-icons/fa";

const getIcon = (type) => {
  switch (type) {
    case "screenshot":
      return <FaImage />;
    case "location_clue":
      return <FaMapMarkerAlt />;
    case "network":
      return <FaWifi />;
    case "app_activity":
      return <FaMobileAlt />;
    default:
      return <FaClock />;
  }
};

const getLabel = (e) => {
  switch (e.type) {
    case "screenshot":
      return "Screenshot Evidence Uploaded";
    case "location_clue":
      return `Location Detected: ${e.data.place || "Unknown"}`;
    case "network":
      return `Network Activity from IP: ${e.data.ip}`;
    case "app_activity":
      return `${e.data.source} — ${e.data.action}`;
    default:
      return "Unknown Activity";
  }
};

const Timeline = ({ events }) => {
  return (
    <div className="card timeline-card">
      <h2>📊 Investigation Timeline</h2>

      {events.length === 0 ? (
        <p className="empty">No digital activity found</p>
      ) : (
        <div className="timeline-modern">
          {events.map((e) => (
            <div key={e._id} className={`timeline-row ${e.type}`}>
              <div className="timeline-icon">
                {getIcon(e.type)}
              </div>

              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-type">
                    {e.type.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="timeline-time">
                    {new Date(e.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="timeline-description">
                  {getLabel(e)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
