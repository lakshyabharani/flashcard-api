import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @MinLength(1)
  question: string;

  @IsString()
  @MinLength(1)
  answer: string;

  @IsUUID()
  deckId: string;
}
