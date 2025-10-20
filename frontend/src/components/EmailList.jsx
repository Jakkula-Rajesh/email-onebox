import React from "react";
import EmailItem from "./EmailItem";

function EmailList({ emails = [] }) {
  if (!Array.isArray(emails) || emails.length === 0) {
    return <p>No emails found.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {emails.map((email) => (
        <EmailItem key={email.id || Math.random()} email={email} />
      ))}
    </div>
  );
}

export default EmailList;
