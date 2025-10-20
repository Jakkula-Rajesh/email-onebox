import React, { useState, useEffect } from "react";
import { fetchEmails } from "../services/api";
import EmailCard from "../components/EmailCard";
import Filters from "../components/Filters";

const InboxPage = () => {
  const [emails, setEmails] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [query, setQuery] = useState("");

  const loadEmails = async () => {
    const data = await fetchEmails(query);
    setEmails(data);
    const uniqueAccounts = [...new Set(data.map(email => email.account))];
    setAccounts(uniqueAccounts);
  };

  useEffect(() => {
    loadEmails();
  }, [query]);

  const filteredEmails = selectedAccount ? emails.filter(e => e.account === selectedAccount) : emails;

  return (
    <div style={{ padding: "20px" }}>
      <Filters
        accounts={accounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        query={query}
        setQuery={setQuery}
      />
      {filteredEmails.map(email => <EmailCard key={email.date + email.from} email={email} />)}
    </div>
  );
};

export default InboxPage;
