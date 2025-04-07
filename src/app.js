import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import registerRouter from './routes/register.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.use('/register', registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
