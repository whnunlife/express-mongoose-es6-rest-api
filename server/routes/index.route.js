import express from 'express';
import path from 'path';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const buildDirectory = path.join(process.cwd(), '/build/');
const router = express.Router(); // eslint-disable-line new-cap

router.get('/', express.static(buildDirectory));

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/api/users', userRoutes);

// mount auth routes at /auth
router.use('/api/auth', authRoutes);

export default router;
