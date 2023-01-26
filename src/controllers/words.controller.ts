import { Request, Response } from 'express';

import { UserScoresManager } from '../managers';
import { WordsService } from '../services';
import { SubmitWordRequestDto } from './dtos';

const userScoresManager = new UserScoresManager(new WordsService());
export const submitWord = async (request: Request, response: Response): Promise<void> => {
  const body: SubmitWordRequestDto = request.body;
  const scores = userScoresManager.submitWord(body);

  response.json({ scores });
};
