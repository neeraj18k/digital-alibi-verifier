import React from "react";

const EvidenceGallery = ({ events }) => {
  const screenshots = events.filter(
    (e) => e.type === "screenshot" && e.data?.fileUrl
  );

  if (screenshots.length === 0) {
    return (
      <div className="card">
        <h2>🖼 Evidence Gallery</h2>
        <p className="empty">No screenshots uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🖼 Evidence Gallery</h2>
      <div className="gallery">
        {screenshots.map((e) => (
          <img
            key={e._id}
            src={`http://localhost:5000${e.data.fileUrl}`}
            alt="evidence"
            onError={(ev) => (ev.target.style.display = "none")}
          />
        ))}
      </div>
    </div>
  );
};

export default EvidenceGallery;

