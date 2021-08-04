import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
const bcrypt = require ('bcrypt');

//export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<any>) {
    
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username:username});
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async create(user: User): Promise<User> {
    const userold=this.findOne(user.password);
    if(userold)
    throw new HttpException('Username already in use', HttpStatus.CONFLICT);


    const hash = await bcrypt.hash(user.password, 10);
    user.password=hash;

    const newItem = new this.userModel(user);

    return await newItem.save();
  }
}
