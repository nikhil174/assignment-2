import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

//db and authenticateUser
import connectDB from './db/connect.js';

//routes
import movieRoutes from './routes/movieRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'API' });
});

app.use('/api/v1/movie', movieRoutes);
app.use('/api/v1/ticket', ticketRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
