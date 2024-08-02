import { IsString, IsUrl, IsNotEmpty, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsUrl()
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
}

export class UpdateUserdto extends PartialType(CreateUserDto) {}
