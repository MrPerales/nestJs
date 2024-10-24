import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsEmail,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUserdto extends PartialType(CreateUserDto) {}

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
