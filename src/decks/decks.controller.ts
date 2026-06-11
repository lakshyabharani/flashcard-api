import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('decks')
export class DecksController {
  constructor(private decksService: DecksService) {}

  @Get()
  findAll(@Request() req) {
    return this.decksService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.decksService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateDeckDto, @Request() req) {
    return this.decksService.create(dto, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDeckDto, @Request() req) {
    return this.decksService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.decksService.remove(id, req.user.id);
  }
}
