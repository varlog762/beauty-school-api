import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const { course, name, phone } = req.body;

  if (!name || !course || !phone) {
    return res
      .status(400)
      .json({ error: 'All fields are required: course, name, phone, date' });
  }

  console.log(course, name, phone);

  return res.status(201).json({ status: 'success' });
});

export default router;
