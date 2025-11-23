import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { AuthorId } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.getAllAuthors();
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
    const author = await this.authorRepository.getAuthorById(id);
    if (!author) {
      throw new NotFoundException(`Auteur avec l'ID ${id} introuvable.`);
    }
    return author;
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
