import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './author.dto';
import { AuthorId } from './author.entity';

@Controller('api/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  public async getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(id as AuthorId);
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string) {
    await this.authorService.deleteAuthor(id as AuthorId);
    return { message: `Auteur ${id} supprimé avec succès.` };
  }
}
