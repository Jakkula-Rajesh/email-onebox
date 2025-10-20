import React from "react";

function Filters({ search, setSearch, folder, setFolder, account, setAccount }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search emails..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "6px", marginRight: "10px" }}
      />

      <select
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        style={{ padding: "6px", marginRight: "10px" }}
      >
        <option value="">All Folders</option>
        <option value="INBOX">INBOX</option>
        <option value="Spam">Spam</option>
      </select>

      <input
        type="text"
        placeholder="Account..."
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        style={{ padding: "6px" }}
      />
    </div>
  );
}

export default Filters;
