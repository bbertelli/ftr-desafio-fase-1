import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createObjectCsvStringifier } from 'csv-writer';
import { LinkService } from './linkService';
import { nanoid } from 'nanoid';

const {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_ACCESS_KEY_ID,
  CLOUDFLARE_SECRET_ACCESS_KEY,
  CLOUDFLARE_BUCKET,
  CLOUDFLARE_PUBLIC_URL,
} = process.env;

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export class ExportService {
  static async exportLinksToCSVAndUpload(): Promise<{ url: string; fileName: string }> {
    // 1. Buscar todos os links
    const links = await LinkService.getAllLinks();

    // 2. Gerar CSV em memória
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'originalUrl', title: 'Original URL' },
        { id: 'shortUrl', title: 'Short URL' },
        { id: 'accessCount', title: 'Access Count' },
        { id: 'createdAt', title: 'Created At' },
      ],
    });

    const records = links.map(link => ({
      originalUrl: link.originalUrl,
      shortUrl: `${CLOUDFLARE_PUBLIC_URL}/${link.shortCode}`,
      accessCount: link.accessCount,
      createdAt: link.createdAt.toISOString(),
    }));

    const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

    // 3. Gerar nome único para o arquivo
    const fileName = `links-${nanoid(12)}.csv`;

    // 4. Fazer upload para o bucket
    await s3.send(new PutObjectCommand({
      Bucket: CLOUDFLARE_BUCKET,
      Key: fileName,
      Body: Buffer.from(csvContent, 'utf-8'),
      ContentType: 'text/csv',
      ACL: 'public-read',
    }));

    // 5. Retornar a URL pública
    const url = `${CLOUDFLARE_PUBLIC_URL}/${fileName}`;
    return { url, fileName };
  }
} 