// Import necessary packages
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './config/index.js';
import { connection } from './database/index.js';
import router from './api/index.js';
import { initSendEmailByScheduledTime } from './services/email-schedule.service.js';
import { errorMiddleware } from './middlewares/error-handler.middleware.js';

const initExpress = () => {

  // Initialize Express application
  const app = express();

  // Enable CORS with specific methods
  app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  }));

  // Use body-parser middleware
  app.use(bodyParser.json());

  // Attach router
  app.use(router);

  // Use custom error middleware
  app.use(errorMiddleware);

  return app
}

// Function to start the server and connect to the database
export const startServer = async () => {
  const app = initExpress()
  await connection.startConnection();
  console.log('ESTABLISHED DATABASE CONNECTION');

  initSendEmailByScheduledTime()

  app.listen(PORT, () => {
    console.log('APP IS RUNNING ON PORT', PORT);
  });
};
