import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSaleDto } from './sale.dto';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity, BookId } from '../books/entities/book.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly repo: Repository<SaleEntity>,
    // optionnel : pour charger client/book si nécessaire
    private readonly dataSource: DataSource,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['client', 'book'] });
  }

  async create(dto: CreateSaleDto) {
    // Récupère les entités Client et Book via manager
    const manager = this.dataSource.manager;
    const client = await manager.findOne(ClientEntity, { where: { id: dto.clientId } });
    const book = await manager.findOne(BookEntity, { where: { id: dto.bookId as BookId } });

    if (!client) throw new NotFoundException('Client not found');
    if (!book) throw new NotFoundException('Book not found');

    const sale = this.repo.create({
      client,
      book,
      date: dto.date,
    } as Partial<SaleEntity>);

    return this.repo.save(sale);
  }
}
