import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateItemDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
    @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<User> {
    return this.usersService.create(createItemDto);
  }
}
