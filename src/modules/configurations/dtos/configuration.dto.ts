import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class ConfigurationDto {
  @IsNotEmpty()
  @IsNumberString()
  APP_PORT: string;

  @IsNotEmpty()
  @IsString()
  NODE_ENV: string;

  @IsNotEmpty()
  @IsString()
  FRONT_END_API_ENDPOINT: string;

  @IsNotEmpty()
  @IsNumberString()
  USERS_TOP_QUANTITY: string;
}
