import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto, UpdateClientDto } from './client.dto';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repo: Repository<ClientEntity>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['sales'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['sales'] });
  }

  async create(dto: CreateClientDto) {
    const entity = this.repo.create(dto as ClientEntity);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateClientDto) {
    await this.repo.update(id, dto as Partial<ClientEntity>);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }

  async save(client: ClientEntity) {
    return this.repo.save(client);
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
