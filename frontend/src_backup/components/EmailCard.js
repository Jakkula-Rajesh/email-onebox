import React from "react";

const EmailCard = ({ email }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "8px" }}>
      <h3>{email.subject}</h3>
      <p><strong>From:</strong> {email.from}</p>
      <p><strong>Account:</strong> {email.account}</p>
      <p><strong>Category:</strong> {email.category}</p>
      <p>{email.text?.substring(0, 100)}...</p>
    </div>
  );
};

export default EmailCard;
