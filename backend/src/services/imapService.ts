import Imap from 'imap-simple';
import { simpleParser } from 'mailparser';
import { indexEmail } from './elasticService';
import { triggerWebhook } from './webhookService';

// Sample accounts (replace with .env in production)
const accounts = [
  { user: 'user1@example.com', password: 'password1', host: 'imap.gmail.com', port: 993, tls: true },
  { user: 'user2@example.com', password: 'password2', host: 'imap.gmail.com', port: 993, tls: true }
];

// Fetch last 30 days
const sinceDate = new Date();
sinceDate.setDate(sinceDate.getDate() - 30);

export async function connectIMAP() {
  for (const account of accounts) {
    const config = {
      imap: {
        user: account.user,
        password: account.password,
        host: account.host,
        port: account.port,
        tls: account.tls,
        authTimeout: 3000
      },
      onmail: async (numNewMsgs: number) => {
        console.log(`New email for ${account.user}: ${numNewMsgs}`);
      }
    };

    const connection = await Imap.connect(config);
    await connection.openBox('INBOX');

    // Initial fetch
    const searchCriteria = ['ALL', ['SINCE', sinceDate.toDateString()]];
    const fetchOptions = { bodies: [''] };
    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const item of messages) {
      const all = item.parts.find((p: any) => p.which === '');
      const parsed = await simpleParser(all.body);

      const from = Array.isArray(parsed.from) ? parsed.from.map(f => f.address).join(', ') : parsed.from?.address;
      const to = Array.isArray(parsed.to) ? parsed.to.map(t => t.address).join(', ') : parsed.to?.address;

      const emailData = {
        id: parsed.messageId,
        accountId: account.user,
        folder: 'INBOX',
        subject: parsed.subject,
        body: parsed.text,
        from,
        to: Array.isArray(to) ? to : [to || ''],
        date: parsed.date,
        aiCategory: 'Uncategorized',
        indexedAt: new Date()
      };

      // Index email in Elasticsearch
      await indexEmail(emailData);

      // Trigger Slack/Webhook if Interested (for demo, can replace with AI categorization later)
      if (emailData.aiCategory === 'Interested') {
        await triggerWebhook(emailData);
      }
    }

    // Set up IDLE for real-time updates
    connection.on('mail', async (numNewMsgs: number) => {
      console.log(`Real-time new mail for ${account.user}: ${numNewMsgs}`);
      // Fetch the latest email logic (similar to above)
    });

    // Watchdog to keep IDLE alive (reconnect every 29 min)
    setInterval(async () => {
      try {
        await connection.idle();
      } catch (err) {
        console.error('Error in IDLE, reconnecting...', err);
      }
    }, 29 * 60 * 1000);
  }
}
