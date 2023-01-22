export class WordsService {
  public getPalindromeLength(word: string): number {
    const length = word.length;

    for (let index = 0; index < length / 2; index++) {
      if (word[index] !== word[length - 1 - index]) {
        return 0;
      }
    }

    return length;
  }
}
