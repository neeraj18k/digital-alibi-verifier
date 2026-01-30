import React from "react";

const VerdictCard = ({ verdict }) => {
  if (!verdict) return null;

  return (
    <div className="card verdict-final">
      <h2>⚖ FINAL VERDICT</h2>
      <h1 className={verdict.result === "TRUE" ? "true" : "false"}>
        {verdict.result === "TRUE" ? "ALIBI VERIFIED" : "ALIBI DISPROVED"}
      </h1>
      <p>{verdict.reason}</p>
    </div>
  );
};

export default VerdictCard;
