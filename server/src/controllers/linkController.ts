import { FastifyRequest, FastifyReply } from 'fastify';
import { LinkService } from '../services/linkService';

interface CreateLinkRequest {
  Body: {
    originalUrl: string;
  };
}

interface GetLinkRequest {
  Params: {
    shortCode: string;
  };
}

export class LinkController {
  /**
   * Create a new shortened link
   * POST /api/links
   */
  static async createLink(request: FastifyRequest<CreateLinkRequest>, reply: FastifyReply) {
    try {
      const { originalUrl } = request.body;

      if (!originalUrl) {
        return reply.status(400).send({
          error: 'originalUrl is required',
          message: 'Please provide a valid URL to shorten'
        });
      }

      const link = await LinkService.createLink(originalUrl);

      return reply.status(201).send({
        success: true,
        data: {
          id: link.id,
          shortCode: link.shortCode,
          originalUrl: link.originalUrl,
          shortUrl: `${request.protocol}://${request.hostname}/api/links/${link.shortCode}`
        }
      });
    } catch (error) {
      console.error('Error creating link:', error);
      
      if (error instanceof Error && error.message === 'Invalid URL format') {
        return reply.status(400).send({
          error: 'Invalid URL format',
          message: 'Please provide a valid URL (e.g., https://example.com)'
        });
      }

      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to create shortened link'
      });
    }
  }

  /**
   * Redirect to original URL
   * GET /api/links/:shortCode
   */
  static async redirectToOriginal(request: FastifyRequest<GetLinkRequest>, reply: FastifyReply) {
    try {
      const { shortCode } = request.params;

      const link = await LinkService.getLinkByShortCode(shortCode);

      if (!link) {
        return reply.status(404).send({
          error: 'Link not found',
          message: 'The requested shortened link does not exist'
        });
      }

      // Increment access count
      await LinkService.incrementAccessCount(shortCode);

      // Redirect to original URL
      return reply.redirect(link.originalUrl);
    } catch (error) {
      console.error('Error redirecting link:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to redirect to original URL'
      });
    }
  }

  /**
   * Get link statistics
   * GET /api/links/:shortCode/stats
   */
  static async getLinkStats(request: FastifyRequest<GetLinkRequest>, reply: FastifyReply) {
    try {
      const { shortCode } = request.params;

      const link = await LinkService.getLinkStats(shortCode);

      if (!link) {
        return reply.status(404).send({
          error: 'Link not found',
          message: 'The requested shortened link does not exist'
        });
      }

      return reply.send({
        success: true,
        data: {
          id: link.id,
          originalUrl: link.originalUrl,
          shortCode: link.shortCode,
          accessCount: link.accessCount,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
          shortUrl: `${request.protocol}://${request.hostname}/api/links/${link.shortCode}`
        }
      });
    } catch (error) {
      console.error('Error getting link stats:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to get link statistics'
      });
    }
  }

  /**
   * Get all links (for admin purposes)
   * GET /api/links
   */
  static async getAllLinks(request: FastifyRequest, reply: FastifyReply) {
    try {
      const links = await LinkService.getAllLinks();

      return reply.send({
        success: true,
        data: links.map(link => ({
          id: link.id,
          originalUrl: link.originalUrl,
          shortCode: link.shortCode,
          accessCount: link.accessCount,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
          shortUrl: `${request.protocol}://${request.hostname}/api/links/${link.shortCode}`
        }))
      });
    } catch (error) {
      console.error('Error getting all links:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to get links'
      });
    }
  }
} 