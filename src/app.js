import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import registerRouter from './routes/register.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());

app.use('/register', registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
