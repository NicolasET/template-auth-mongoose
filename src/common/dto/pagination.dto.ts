import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @Min(0)
  @IsInt()
  @IsOptional()
  limit?: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  offset?: number;
}
