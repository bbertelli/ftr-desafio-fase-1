import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { db } from './database';

const app = Fastify();

// Middlewares
app.register(cors, { origin: true });
app.register(helmet);

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

// TODO: Register routes
// app.register(require('./routes/links'));

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen({ port, host: '0.0.0.0' })
  .then(() => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  })
  .catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
  });
