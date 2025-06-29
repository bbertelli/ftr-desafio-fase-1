import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { db } from './database';
import { linkRoutes } from './routes/linkRoutes';

const app = Fastify();

// Middlewares
app.register(cors, { origin: true });
app.register(helmet);

// Register routes
app.register(linkRoutes);

// Health check route
app.get('/health', async () => {
  return { status: 'ok' };
});

// Database test route
app.get('/db-test', async () => {
  try {
    // Test database connection by running a simple query
    const result = await db.execute('SELECT NOW() as current_time');
    return { 
      status: 'success', 
      message: 'Database connection working',
      timestamp: result[0].current_time 
    };
  } catch (error) {
    return { 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen({ port, host: '0.0.0.0' })
  .then(() => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🗄️  Database connection test: http://localhost:${port}/db-test`);
    console.log(`🔗 API endpoints:`);
    console.log(`   POST /api/links - Create shortened link`);
    console.log(`   GET /api/links/:shortCode - Redirect to original URL`);
    console.log(`   GET /api/links/:shortCode/stats - Get link statistics`);
    console.log(`   GET /api/links - Get all links`);
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
