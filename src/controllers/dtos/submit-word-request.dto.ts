import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitWordRequestDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  word: string;
}
