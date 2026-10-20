import express from 'express';
import Interview from '../models/Interview.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user._id }).sort({ date: 1 });
    res.json(interviews);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const interview = await Interview.create({ ...req.body, user: req.user._id });
    res.status(201).json(interview);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const interview = await Interview.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    res.json(interview);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Interview.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
