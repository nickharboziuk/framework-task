import express from 'express';

import { WordsController } from '../controllers';
import { SubmitWordRequestDto } from '../controllers/dtos';
import { validateBody } from '../middlewares';

const router = express.Router();

router.post('/words', validateBody(SubmitWordRequestDto), WordsController.submitWord);

export default router;
