import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SaleEntity } from '../sales/sale.entity';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @OneToMany(() => SaleEntity, (sale) => sale.client)
  sales: SaleEntity[];
}
