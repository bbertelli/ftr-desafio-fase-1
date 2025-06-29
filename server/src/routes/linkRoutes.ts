import { FastifyInstance } from 'fastify';
import { LinkController } from '../controllers/linkController';

export async function linkRoutes(fastify: FastifyInstance) {
  // Schema for creating a link
  const createLinkSchema = {
    schema: {
      body: {
        type: 'object',
        required: ['originalUrl'],
        properties: {
          originalUrl: {
            type: 'string',
            format: 'uri',
            description: 'The original URL to be shortened'
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                shortCode: { type: 'string' },
                originalUrl: { type: 'string' },
                shortUrl: { type: 'string' }
              }
            }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  };

  // Schema for deleting a link
  const deleteLinkSchema = {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'The ID of the link to delete'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                shortCode: { type: 'string' },
                originalUrl: { type: 'string' }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  };

  // Schema for getting link stats
  const getLinkStatsSchema = {
    schema: {
      params: {
        type: 'object',
        required: ['shortCode'],
        properties: {
          shortCode: {
            type: 'string',
            minLength: 1,
            description: 'The short code of the link'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                originalUrl: { type: 'string' },
                shortCode: { type: 'string' },
                accessCount: { type: 'number' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                shortUrl: { type: 'string' }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  };

  // Schema for redirecting to original URL
  const redirectSchema = {
    schema: {
      params: {
        type: 'object',
        required: ['shortCode'],
        properties: {
          shortCode: {
            type: 'string',
            minLength: 1,
            description: 'The short code of the link'
          }
        }
      }
    }
  };

  // POST /api/links - Create a new shortened link
  fastify.post('/api/links', createLinkSchema, LinkController.createLink);

  // DELETE /api/links/:id - Delete a link by ID
  fastify.delete('/api/links/:id', deleteLinkSchema, LinkController.deleteLink);

  // GET /api/links/:shortCode - Redirect to original URL
  fastify.get('/api/links/:shortCode', redirectSchema, LinkController.redirectToOriginal);

  // GET /api/links/:shortCode/stats - Get link statistics
  fastify.get('/api/links/:shortCode/stats', getLinkStatsSchema, LinkController.getLinkStats);

  // GET /api/links - Get all links (for admin purposes)
  fastify.get('/api/links', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  originalUrl: { type: 'string' },
                  shortCode: { type: 'string' },
                  accessCount: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  shortUrl: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, LinkController.getAllLinks);
} 