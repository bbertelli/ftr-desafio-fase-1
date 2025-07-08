import { FastifyRequest, FastifyReply } from 'fastify';
import { LinkService } from '../services/linkService';
import { ExportService } from '../services/exportService';

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

interface DeleteLinkRequest {
  Params: {
    id: string;
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
          shortUrl: `${request.protocol}://${request.hostname}:${request.port || 3333}/api/links/${link.shortCode}`
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
   * Delete a link by ID
   * DELETE /api/links/:id
   */
  static async deleteLink(request: FastifyRequest<DeleteLinkRequest>, reply: FastifyReply) {
    try {
      const { id } = request.params;

      // Check if link exists
      const existingLink = await LinkService.getLinkById(id);

      if (!existingLink) {
        return reply.status(404).send({
          error: 'Link not found',
          message: 'The requested link does not exist'
        });
      }

      // Delete the link
      const deleted = await LinkService.deleteLink(id);

      if (!deleted) {
        return reply.status(500).send({
          error: 'Internal server error',
          message: 'Failed to delete link'
        });
      }

      return reply.status(200).send({
        success: true,
        message: 'Link deleted successfully',
        data: {
          id: existingLink.id,
          shortCode: existingLink.shortCode,
          originalUrl: existingLink.originalUrl
        }
      });
    } catch (error) {
      console.error('Error deleting link:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to delete link'
      });
    }
  }

  /**
   * Export all links to CSV
   * GET /api/links/export
   */
  static async exportLinksToCSV(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { url, fileName } = await ExportService.exportLinksToCSVAndUpload();

      return reply.send({
        success: true,
        message: 'Links exported successfully to CSV',
        data: {
          downloadUrl: url,
          fileName: fileName,
          exportedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error exporting links to CSV:', error);
      return reply.status(500).send({
        error: 'Internal server error',
        message: 'Failed to export links to CSV'
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
          shortUrl: `${request.protocol}://${request.hostname}:${request.port || 3333}/api/links/${link.shortCode}`
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
          shortUrl: `${request.protocol}://${request.hostname}:${request.port || 3333}/api/links/${link.shortCode}`
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

  /**
   * Get link by shortCode (API JSON)
   * GET /api/links/:shortCode/data
   */
  static async getLinkByShortCode(request: FastifyRequest<GetLinkRequest>, reply: FastifyReply) {
    try {
      const { shortCode } = request.params;
      const link = await LinkService.getLinkByShortCode(shortCode);
      if (!link) {
        return reply.status(404).send({
          success: false,
          message: 'Link não encontrado'
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
          shortUrl: `${request.protocol}://${request.hostname}:${request.port || 3333}/r/${link.shortCode}`
        }
      });
    } catch (error) {
      console.error('Error getting link by shortCode:', error);
      return reply.status(500).send({
        success: false,
        message: 'Erro ao buscar link'
      });
    }
  }
} 