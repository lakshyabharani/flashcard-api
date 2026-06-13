import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('deck/:deckId')
  findByDeck(@Param('deckId') deckId: string) {
    return this.cardsService.findByDeck(deckId);
  }

  @Get('study/:deckId')
  getStudySession(@Param('deckId') deckId: string) {
    return this.cardsService.getStudySession(deckId);
  }

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardsService.update(id, dto);
  }

  @Patch(':id/answer')
  recordAnswer(@Param('id') id: string, @Body() body: { correct: boolean }) {
    return this.cardsService.recordAnswer(id, body.correct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
