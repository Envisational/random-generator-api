import Router from '@koa/router';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

export const generationRoutes = new Router();

// In-memory storage for random numbers using Record
// Structure: { [id: string]: number }
const generatedNumbers: Record<string, number> = {};

// POST /v1/generate
generationRoutes.post('/generate', async (ctx) => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  const id = uuidv4();

  // Store in in-memory object
  generatedNumbers[id] = randomNumber;

  ctx.body = {
    id,
    randomNumber
  };
  ctx.status = 201; // Created
});

// GET /v1/retrieve/:id
generationRoutes.get('/retrieve/:id', async (ctx) => {
  const { id } = ctx.params;
  const randomNumber = generatedNumbers[id];

  if (randomNumber && uuidValidate(id)) {
    ctx.body = {
      id,
      randomNumber
    };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Not found' };
  }
});
