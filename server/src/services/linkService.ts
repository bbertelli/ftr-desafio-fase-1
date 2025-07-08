import { db } from '../database';
import { links } from '../models/links';
import { eq, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export class LinkService {
  /**
   * Create a new shortened link
   */
  static async createLink(originalUrl: string): Promise<{ id: string; shortCode: string; originalUrl: string }> {
    // Validate URL
    try {
      new URL(originalUrl);
    } catch {
      throw new Error('Invalid URL format');
    }

    // Generate unique short code
    let shortCode: string;
    let attempts = 0;
    const maxAttempts = 10;

    do {
      shortCode = nanoid(8); // 8 characters
      attempts++;
      
      if (attempts > maxAttempts) {
        throw new Error('Unable to generate unique short code');
      }
    } while (await this.getLinkByShortCode(shortCode));

    // Insert new link
    const [newLink] = await db.insert(links).values({
      originalUrl,
      shortCode,
    }).returning({
      id: links.id,
      shortCode: links.shortCode,
      originalUrl: links.originalUrl,
    });

    return newLink;
  }

  /**
   * Get link by short code
   */
  static async getLinkByShortCode(shortCode: string): Promise<{ id: string; originalUrl: string; shortCode: string; accessCount: number; createdAt: Date } | null> {
    const [link] = await db
      .select({
        id: links.id,
        originalUrl: links.originalUrl,
        shortCode: links.shortCode,
        accessCount: links.accessCount,
        createdAt: links.createdAt,
      })
      .from(links)
      .where(eq(links.shortCode, shortCode));

    return link || null;
  }

  /**
   * Get link by ID
   */
  static async getLinkById(id: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    accessCount: number;
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.id, id));

    return link || null;
  }

  /**
   * Delete link by ID
   */
  static async deleteLink(id: string): Promise<boolean> {
    const [deletedLink] = await db
      .delete(links)
      .where(eq(links.id, id))
      .returning({
        id: links.id,
        shortCode: links.shortCode,
      });

    return !!deletedLink;
  }

  /**
   * Increment access count for a link
   */
  static async incrementAccessCount(shortCode: string): Promise<void> {
    await db
      .update(links)
      .set({
        accessCount: sql`${links.accessCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(links.shortCode, shortCode));
  }

  /**
   * Get link statistics
   */
  static async getLinkStats(shortCode: string): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    accessCount: number;
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const [link] = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, shortCode));

    return link || null;
  }

  /**
   * Get all links (for admin purposes)
   */
  static async getAllLinks(): Promise<{
    id: string;
    originalUrl: string;
    shortCode: string;
    accessCount: number;
    createdAt: Date;
    updatedAt: Date;
  }[]> {
    return await db
      .select()
      .from(links)
      .orderBy(links.createdAt);
  }
} 