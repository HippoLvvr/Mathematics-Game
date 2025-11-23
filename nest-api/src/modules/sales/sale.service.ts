import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { CreateSaleDto } from './sale.dto';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepo: SaleRepository) {}

  findAll() {
    return this.saleRepo.findAll();
  }

  create(dto: CreateSaleDto) {
    return this.saleRepo.create(dto);
  }
}
