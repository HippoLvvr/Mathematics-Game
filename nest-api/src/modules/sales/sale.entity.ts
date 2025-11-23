import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, (client) => client.sales, { eager: true })
  client: ClientEntity;

  @ManyToOne(() => BookEntity, (book) => book.sales, { eager: true })
  book: BookEntity;

  @Column()
  date: string;

}
  