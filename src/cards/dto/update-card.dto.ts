import { IsString, IsOptional } from 'class-validator';

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  answer?: string;
}
