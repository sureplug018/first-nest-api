import { IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MaxLength(3)
  name: string;

  @IsString()
  description: string;
}
