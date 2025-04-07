import { Router } from 'express';
import tgBot from '../services/tgBotInstance.js';
import { createMessageForTelegram } from '../utils/index.js';

const router = Router();

router.post('/', (req, res) => {
  try {
    const { course, name, phone } = req.body;

    if (!name || !course || !phone) {
      return res
        .status(400)
        .json({ error: 'All fields are required: course, name, phone' });
    }

    const message = createMessageForTelegram(name, phone, course);
    tgBot.sendToAll(message);
  } catch (error) {
    console.error(error?.message);
    return res.status(400).json({ error: '...' });
  }

  return res.status(201).json({ status: 'success' });
});

export default router;
