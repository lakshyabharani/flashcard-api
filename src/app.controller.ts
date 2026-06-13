import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  serveDashboard(@Res() res: Response) {
    return (res as any).sendFile(join(process.cwd(), 'public', 'index.html'));
  }
}