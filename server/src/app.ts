import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const app = Fastify();

// Middlewares
app.register(cors, { origin: true });
app.register(helmet);

// Health check route
app.get('/health', async () => {
  return { status: 'ok' };
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
