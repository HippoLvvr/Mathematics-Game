import { Injectable } from '@nestjs/common';

import { ClientRepository } from './client.repository';
import { CreateClientDto, UpdateClientDto } from './client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepo: ClientRepository) {}

  findAll() {
    return this.clientRepo.findAll();
  }

  findOne(id: number) {
    // find one by id in sales model
    return this.clientRepo.findOne(id);
  }

  async create(data: CreateClientDto) {
    const client = await this.clientRepo.create(data);
    return this.clientRepo.save(client);
  }

  async update(id: number, data: UpdateClientDto) {
    await this.clientRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.clientRepo.delete(id);
    return { deleted: true };
  }
}
