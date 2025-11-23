import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import type { AuthorId } from '../authors/author.entity';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  yearPublished: number;

  @IsString()
  @IsOptional()
  photoUrl?: string;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUUID(4)
  @IsOptional()
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  @IsOptional()
  yearPublished: number;

  @IsString()
  @IsOptional()
  photoUrl?: string;
}

export class GetBooksDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}