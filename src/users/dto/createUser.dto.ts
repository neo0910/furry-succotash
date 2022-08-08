import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsDefined,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
