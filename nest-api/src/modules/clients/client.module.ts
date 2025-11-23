import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [ClientService, ClientRepository],
  controllers: [ClientController],
  exports: [ClientService, ClientRepository],
})
export class ClientModule {}
