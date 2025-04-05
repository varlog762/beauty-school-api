import { Router } from 'express';
import { tgBot } from '../app.js';
import { createMessageForTelegram } from '../utils/index.js';

const router = Router();

router.post('/', (req, res) => {
  const { course, name, phone } = req.body;

  if (!name || !course || !phone) {
    return res
      .status(400)
      .json({ error: 'All fields are required: course, name, phone' });
  }

  const message = createMessageForTelegram(name, phone, course);
  tgBot.sendToAll(message);

  return res.status(201).json({ status: 'success' });
});

export default router;
