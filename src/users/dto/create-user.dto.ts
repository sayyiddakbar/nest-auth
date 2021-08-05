import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
     readonly password: string;
  
  }