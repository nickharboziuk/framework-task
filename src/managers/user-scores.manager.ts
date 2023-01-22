import { SubmitWordRequestDto } from '../controllers/dtos';
import { ScoresService, WordsService } from '../services';
import { IUserScore } from './types';

export class UserScoresManager {
  private readonly wordsService: WordsService;
  private readonly scoresService: ScoresService;

  constructor(wordsService: WordsService) {
    this.wordsService = wordsService;
    this.scoresService = ScoresService.getInstance();
  }

  public getUsersScores(): IUserScore[] {
    return this.scoresService.getArrayFromMap();
  }

  public submitWord({ word, userName }: SubmitWordRequestDto): number {
    const palindromeLength = this.wordsService.getPalindromeLength(word);

    this.scoresService.addNewUserScore(userName, palindromeLength);
    this.scoresService.sortUsersTopResult();

    return palindromeLength;
  }
}
