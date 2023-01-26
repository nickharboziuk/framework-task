import { IUserScore } from '../managers/types';
import { ConfigurationService } from '../modules/configurations/configuration.service';

export class ScoresService {
  private static instance: ScoresService;
  private readonly USERS_TOP_QUANTITY: number;
  private usersResult: Map<string, number> = new Map();

  constructor(private readonly configuration: ConfigurationService) {
    this.USERS_TOP_QUANTITY = +configuration.get('USERS_TOP_QUANTITY');
  }

  static getInstance(): ScoresService {
    if (!ScoresService.instance) {
      ScoresService.instance = new ScoresService(new ConfigurationService());
    }
    return ScoresService.instance;
  }

  public getArrayFromMap(): IUserScore[] {
    return [...this.usersResult].map(([name, points]) => ({ name, points }));
  }

  public sortUsersTopResult(): void {
    this.usersResult = new Map(
      [...this.usersResult.entries()].sort((a, b) => b[1] - a[1]).slice(0, this.USERS_TOP_QUANTITY)
    );
  }

  public addNewUserScore(userName: string, palindromeLength: number): void {
    if (!this.usersResult.has(userName)) {
      this.usersResult.set(userName, palindromeLength);

      return;
    }

    const userScore = this.usersResult.get(userName);
    this.usersResult.set(userName, Math.max(userScore || 0, palindromeLength));
  }
}
