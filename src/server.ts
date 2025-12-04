import express from 'express';
import { config } from './config';
import initDB from './config/db';
import { logger } from './middleware/logger';
import { todoRoutes } from './modules/todo/todo.routes';
import { userRoutes } from './modules/user/user.routes';

const app = express();
const port = config.port;

// Middleware
app.use(express.json());

// Initialize database
initDB();

// Setup routes
app.get('/', logger, (req, res) => {
  res.send('this is a GET request');
});

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
    path: req.path,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
