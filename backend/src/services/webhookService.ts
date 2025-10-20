import fetch from 'node-fetch';

export async function triggerWebhook(emailData: any) {
  const slackUrl = process.env.SLACK_WEBHOOK_URL || '';
  const webhookUrl = process.env.WEBHOOK_SITE_URL || '';

  if (slackUrl) {
    await fetch(slackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `New Interested Email: ${emailData.subject} from ${emailData.from}` })
    });
  }

  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'InterestedLead', email: emailData })
    });
  }
}
