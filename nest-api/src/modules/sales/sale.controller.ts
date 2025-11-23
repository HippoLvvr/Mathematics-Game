import { Controller, Get, Post, Body } from '@nestjs/common';
import { SaleService } from './sale.service';
import {CreateSaleDto } from './sale.dto';

@Controller('api/sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Post()
  create(@Body() data: CreateSaleDto) {
    return this.saleService.create(data);
  }
}
