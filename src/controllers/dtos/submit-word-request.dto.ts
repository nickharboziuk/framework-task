import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitWordRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  word: string;
}
