import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/emails", (req, res) => {
  const emails = [
    {
      id: "1",
      subject: "Test Email 1",
      body: "Hello, this is a test email.",
      from: "test1@example.com",
      to: ["you@example.com"],
      folder: "INBOX",
      accountId: "test1@example.com",
      aiCategory: "Interested",
    },
    {
      id: "2",
      subject: "Test Email 2",
      body: "Another test email.",
      from: "test2@example.com",
      to: ["you@example.com"],
      folder: "INBOX",
      accountId: "test2@example.com",
      aiCategory: "Not Interested",
    },
  ];
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
