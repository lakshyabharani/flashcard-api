import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepo: Repository<Card>,
  ) {}

  async findByDeck(deckId: string): Promise<Card[]> {
    return this.cardsRepo.find({
      where: { deckId },
      order: { difficultyScore: 'ASC' }, // hardest cards first
    });
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardsRepo.findOne({ where: { id } });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async create(dto: CreateCardDto): Promise<Card> {
    const card = this.cardsRepo.create(dto);
    return this.cardsRepo.save(card);
  }

  async update(id: string, dto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id);
    Object.assign(card, dto);
    return this.cardsRepo.save(card);
  }

  async remove(id: string): Promise<{ message: string }> {
    const card = await this.findOne(id);
    await this.cardsRepo.remove(card);
    return { message: 'Card deleted successfully' };
  }

  // Called when user marks a card correct or incorrect
  async recordAnswer(id: string, correct: boolean): Promise<Card> {
    const card = await this.findOne(id);
    if (correct) {
      card.timesCorrect += 1;
    } else {
      card.timesIncorrect += 1;
    }
    // Difficulty score — higher means needs more practice
    // Formula: incorrect / (correct + incorrect + 1)
    const total = card.timesCorrect + card.timesIncorrect;
    card.difficultyScore = total > 0 ? card.timesIncorrect / total : 0;
    return this.cardsRepo.save(card);
  }

  // Get cards for a study session — sorted by difficulty (hardest first)
  async getStudySession(deckId: string): Promise<Card[]> {
    return this.cardsRepo.find({
      where: { deckId },
      order: { difficultyScore: 'DESC' },
    });
  }
}
