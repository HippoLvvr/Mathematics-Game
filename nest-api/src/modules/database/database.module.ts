import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from '../authors/author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity'; 
import { SaleEntity } from '../sales/sale.entity'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [AuthorEntity, BookEntity, ClientEntity, SaleEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
