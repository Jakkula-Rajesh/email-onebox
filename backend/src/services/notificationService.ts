import axios from "axios";
import { SLACK_WEBHOOK_URL, EXTERNAL_WEBHOOK_URL } from "../config/slackConfig";

export const sendSlackNotification = async (emailData: any) => {
  await axios.post(SLACK_WEBHOOK_URL, {
    text: `New Interested email from: ${emailData.from}\nSubject: ${emailData.subject}`
  });
};

export const triggerWebhook = async (emailData: any) => {
  await axios.post(EXTERNAL_WEBHOOK_URL, emailData);
};
