import { Request, Response } from 'express';

import { UserScoresManager } from '../managers';
import { WordsService } from '../services';

const userScoresManager = new UserScoresManager(new WordsService());
export const getAll = async (_request: Request, response: Response): Promise<void> => {
  const body = userScoresManager.getUsersScores();

  response.json(body);
};
