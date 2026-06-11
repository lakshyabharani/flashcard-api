import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
