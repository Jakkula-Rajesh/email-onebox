import React from "react";

function EmailItem({ email }) {
  if (!email) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>{email.subject || "No Subject"}</h3>
      <p>{email.body || "No Content"}</p>
      <small>
        <strong>From:</strong> {email.from || "Unknown"} |{" "}
        <strong>Folder:</strong> {email.folder || "N/A"} |{" "}
        <strong>Account:</strong> {email.accountId || "N/A"}
      </small>
    </div>
  );
}

export default EmailItem;
