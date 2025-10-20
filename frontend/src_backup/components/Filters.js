import React from "react";

const Filters = ({ accounts, selectedAccount, setSelectedAccount, query, setQuery }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
        <option value="">All Accounts</option>
        {accounts.map(acc => <option key={acc} value={acc}>{acc}</option>)}
      </select>

      <input
        type="text"
        placeholder="Search emails..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

export default Filters;
