import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @Min(0, { message: 'El límite no debe ser inferior a 0.' })
  @IsInt({ message: 'El límite debe ser un número entero.' })
  @IsOptional()
  limit?: number;

  @Min(0, { message: 'El offset no debe ser inferior a 0.' })
  @IsInt({ message: 'El offset debe ser un número entero.' })
  @IsOptional()
  offset?: number;
}
