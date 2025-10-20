import React, { useEffect, useState } from "react";
import { fetchEmails } from "./api/emailApi";
import EmailList from "./components/EmailList";
import Filters from "./components/Filters";

function App() {
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadEmails = async () => {
      const data = await fetchEmails();
      console.log("📩 Emails from backend:", data);
      setEmails(data);
    };
    loadEmails();
  }, []);

  const filteredEmails = emails.filter((email) => {
    const s = search.toLowerCase();
    return (
      (!search ||
        email.subject.toLowerCase().includes(s) ||
        email.body.toLowerCase().includes(s)) &&
      (!folder || email.folder === folder) &&
      (!account || email.accountId === account)
    );
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Email Onebox Frontend</h1>
      <Filters
        search={search}
        setSearch={setSearch}
        folder={folder}
        setFolder={setFolder}
        account={account}
        setAccount={setAccount}
      />
      <EmailList emails={filteredEmails} />
      <p style={{ marginTop: "20px" }}>Backend: http://localhost:5000</p>
    </div>
  );
}

export default App;
