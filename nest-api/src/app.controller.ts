import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('app/:id')
  public fetchId(@Param('id') id: string): string {
    return `You are ${id}`;
  }
}
