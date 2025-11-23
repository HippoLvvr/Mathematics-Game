import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { SaleRepository } from './sale.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  providers: [SaleService, SaleRepository],
  controllers: [SaleController],
  exports: [SaleService, SaleRepository],
})
export class SaleModule {}
