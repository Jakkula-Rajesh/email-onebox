import { Request, Response } from "express";

export const getEmails = (req: Request, res: Response) => {
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
};
