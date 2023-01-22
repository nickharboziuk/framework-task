import express from 'express';

import { ScoresController } from '../controllers';

const router = express.Router();

router.get('/scores', ScoresController.getAll);

export default router;
