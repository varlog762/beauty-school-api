import express from 'express';
import registerRouter from './routes/register.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/register', registerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
