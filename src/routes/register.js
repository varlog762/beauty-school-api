import { Router } from 'express';
import tgBot from '../services/tgBotInstance.js';
import { createMessageForTelegram, isDataInvalid } from '../utils/index.js';
import { saveClientRequestToDB } from '../models/requests.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const name = String(req.body?.name).trim();
    const phone = String(req.body?.phone).trim();
    const course = String(req.body?.course).trim();

    if (isDataInvalid(name, phone, course)) {
      console.warn('Validation failed for input:', { name, phone, course });
      return res.status(400).json({ error: 'Invalid input data' });
    }

    saveClientRequestToDB(name, phone, course);

    const message = createMessageForTelegram(name, phone, course);
    await tgBot.sendToAll(message);

    return res.status(201).json({ status: 'success' });
  } catch (error) {
    console.error('Registration error:', error?.message);
    return res.status(500).json({
      error: 'Something went wrong, please try again later',
    });
  }
});

export default router;
