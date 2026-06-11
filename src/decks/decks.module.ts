import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './deck.entity';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  providers: [DecksService],
  controllers: [DecksController],
  exports: [DecksService],
})
export class DecksModule {}
