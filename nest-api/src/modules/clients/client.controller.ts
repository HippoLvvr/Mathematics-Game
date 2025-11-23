import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './client.dto';

@Controller('api/clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Post()
  create(@Body() data: CreateClientDto) {
    return this.clientService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateClientDto) {
    return this.clientService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
    