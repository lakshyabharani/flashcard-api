import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Deck } from '../decks/deck.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  // Spaced repetition fields
  @Column({ default: 0 })
  timesCorrect: number;

  @Column({ default: 0 })
  timesIncorrect: number;

  // Lower score = needs more practice
  @Column({ type: 'float', default: 0 })
  difficultyScore: number;

  @ManyToOne(() => Deck, { onDelete: 'CASCADE' })
  deck: Deck;

  @Column()
  deckId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
