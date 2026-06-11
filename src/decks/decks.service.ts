import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from './deck.entity';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private decksRepo: Repository<Deck>,
  ) {}

  async findAll(userId: string): Promise<Deck[]> {
    return this.decksRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Deck> {
    const deck = await this.decksRepo.findOne({ where: { id } });
    if (!deck) throw new NotFoundException('Deck not found');
    if (deck.userId !== userId) throw new ForbiddenException();
    return deck;
  }

  async create(dto: CreateDeckDto, userId: string): Promise<Deck> {
    const deck = this.decksRepo.create({ ...dto, userId });
    return this.decksRepo.save(deck);
  }

  async update(id: string, dto: UpdateDeckDto, userId: string): Promise<Deck> {
    const deck = await this.findOne(id, userId);
    Object.assign(deck, dto);
    return this.decksRepo.save(deck);
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const deck = await this.findOne(id, userId);
    await this.decksRepo.remove(deck);
    return { message: 'Deck deleted successfully' };
  }
}
