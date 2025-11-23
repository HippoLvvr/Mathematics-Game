import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';


export class CreateSaleDto {
  @IsInt()
  @IsNotEmpty()
  clientId!: number;

  @IsUUID()
  @IsNotEmpty()
  bookId!: string;

  // ISO date string, ex: "2025-10-31"
  @IsDateString()
  date!: string;
}

export class SaleResponseDto {
  id!: number;
  clientId!: number;
  bookId!: number;
  date!: string;
}
