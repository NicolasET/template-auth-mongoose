import {
  IsMongoId,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsStrongPassword(
    {
      minLength: 7,
      minLowercase: 5,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'La contraseña debe de tener al menos: 7 caracteres (5 minúsculas, 1 mayúscula y 1 número).',
    },
  )
  password: string;

  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
  @MinLength(5, {
    message: 'El nombre de usuario debe ser mayor o igual a 5 caracteres.',
  })
  username: string;

  @IsMongoId({ message: 'El rol debe ser un ID de mongo.' })
  role: string;
}
