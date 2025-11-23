import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  public async getAuthorById(id: AuthorId): Promise<AuthorModel> {
    const author = await this.authorRepository.findOneBy({
      id: id as unknown as AuthorEntity['id'],
    });

    if (!author) {
      throw new NotFoundException(`Auteur avec l'ID ${id} introuvable.`);
    }

    return author;
  }


  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async deleteAuthor(id: AuthorId): Promise<void> {
    await this.authorRepository.delete({ id: id as unknown as AuthorEntity['id'] });
  }
}
