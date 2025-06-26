// services/users/src/routes/user.routes.ts
import express, {Request, Response} from 'express';
import { User } from '../models/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user ? user!.password as string :'');
    // if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user?user._id:'', role: user?user.role:'' },
      'secret',   // ⚠️ Move this to env in production
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role });
        await user.save();
        res.status(201).json({ message: 'User created' });
  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
  }
});

export default router;