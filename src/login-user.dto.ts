import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
    readonly username: string;
    @IsNotEmpty()
   @IsDefined()
    readonly password: string;
  
  }