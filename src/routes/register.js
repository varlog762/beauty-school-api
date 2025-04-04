import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { course, name, phone, date } = req.body;

  if (!name || !course || !phone || !date) {
    return res
      .status(400)
      .json({ error: 'All fields are required: course, name, phone, date' });
  }

  console.log(course, name, phone, date);

  return res.status(201).json({ status: 'success' });
});

export default router;
