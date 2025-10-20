import { Client } from '@elastic/elasticsearch';

export const client = new Client({ node: 'http://localhost:9200' });

export async function createIndex() {
  const exists = await client.indices.exists({ index: 'emails' });
  if (!exists) {
    await client.indices.create({
      index: 'emails',
      mappings: {
        properties: {
          subject: { type: 'text' },
          body: { type: 'text' },
          accountId: { type: 'keyword' },
          folder: { type: 'keyword' },
          date: { type: 'date' },
          aiCategory: { type: 'keyword' },
          indexedAt: { type: 'date' }
        }
      }
    });
  }
}

export async function indexEmail(email: any) {
  await client.index({
    index: 'emails',
    id: email.id,
    document: email
  });
}
