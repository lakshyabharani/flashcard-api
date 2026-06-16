# FlashCard Study App

A full stack flashcard application with spaced repetition learning. Create decks, add cards, and study smarter — cards you miss appear more often until you master them.

## Features

- **JWT Authentication** — register, login, each user has their own private decks
- **Deck management** — create, update, delete decks
- **Card management** — add, edit, delete cards per deck
- **Study mode** — flip cards, mark as Got It or Missed It
- **Spaced repetition** — difficulty score updates after every answer, harder cards appear first in study sessions
- **Progress tracking** — score per card, session results with percentage
- **Clean UI** — dark purple theme, responsive layout, served directly from NestJS

## Tech Stack

- **Backend:** NestJS + TypeScript
- **Database:** PostgreSQL (via Docker)
- **ORM:** TypeORM
- **Auth:** JWT + Passport
- **Validation:** class-validator
- **Frontend:** Vanilla HTML/CSS/JS served by NestJS

## How Spaced Repetition Works

Every card tracks `timesCorrect` and `timesIncorrect`. After each answer the difficulty score is recalculated:

```
difficultyScore = timesIncorrect / (timesCorrect + timesIncorrect)
```

Cards with a higher difficulty score appear first in study sessions — so the cards you struggle with get more practice automatically.

## Project Structure

```
flashcard-api/
├── src/
│   ├── auth/                  # JWT auth — register, login
│   │   ├── dto/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── users/                 # User entity and service
│   │   ├── user.entity.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── decks/                 # Deck CRUD
│   │   ├── dto/
│   │   ├── deck.entity.ts
│   │   ├── decks.controller.ts
│   │   ├── decks.service.ts
│   │   └── decks.module.ts
│   ├── cards/                 # Card CRUD + spaced repetition
│   │   ├── dto/
│   │   ├── card.entity.ts
│   │   ├── cards.controller.ts
│   │   ├── cards.service.ts
│   │   └── cards.module.ts
│   ├── app.controller.ts      # Serves frontend dashboard
│   ├── app.module.ts
│   └── main.ts
├── public/
│   └── index.html             # Frontend (auth, decks, study mode)
├── docker-compose.yml
├── .env.example
└── README.md
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Decks (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/decks` | Get all decks for logged-in user |
| GET | `/api/decks/:id` | Get a single deck |
| POST | `/api/decks` | Create a new deck |
| PATCH | `/api/decks/:id` | Update a deck |
| DELETE | `/api/decks/:id` | Delete a deck and all its cards |

### Cards (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cards/deck/:deckId` | Get all cards in a deck |
| GET | `/api/cards/study/:deckId` | Get cards sorted by difficulty (hardest first) |
| POST | `/api/cards` | Create a new card |
| PATCH | `/api/cards/:id` | Update a card |
| PATCH | `/api/cards/:id/answer` | Record a correct or incorrect answer |
| DELETE | `/api/cards/:id` | Delete a card |

## Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop

### 1 — Clone the repo

```bash
git clone https://github.com/lakshyabharani/flashcard-api.git
cd flashcard-api
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values.

### 4 — Start the database

```bash
docker-compose up -d
```

### 5 — Start the server

```bash
npm run start:dev
```

### 6 — Open the app

```
http://localhost:3000
```

Register an account, create a deck, add cards and start studying!

## Example Requests

### Register
```json
POST /api/auth/register
{
  "name": "Lakshya",
  "email": "lakshya@example.com",
  "password": "password123"
}
```

### Create a Deck
```json
POST /api/decks
Authorization: Bearer <token>

{
  "title": "AWS Concepts",
  "description": "Study cards for AWS certification"
}
```

### Add a Card
```json
POST /api/cards
Authorization: Bearer <token>

{
  "question": "What is EC2?",
  "answer": "Elastic Compute Cloud — virtual servers in the cloud",
  "deckId": "uuid-of-deck"
}
```

### Record an Answer
```json
PATCH /api/cards/:id/answer
Authorization: Bearer <token>

{ "correct": true }
```

## Author

**Lakshya Bharani**
[LinkedIn](https://www.linkedin.com/in/lakshya-bharani) · [GitHub](https://github.com/lakshyabharani) · [Portfolio](https://lakshyabharani.github.io)