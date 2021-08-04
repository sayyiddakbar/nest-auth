import { Injectable , HttpException, HttpStatus, UseInterceptors} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require ('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let user = await this.usersService.findOne(username);
    console.log('user', user);
    if(!user)
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if(!isPasswordMatching)
    throw new HttpException('Login was not Successfulll Password didint match', HttpStatus.UNAUTHORIZED);

    if (user && isPasswordMatching) {
      //const { password, ...result } = user;
     // delete user.password;
      console.log('user2', user);
      return {
        username : user.username,
      _id: user['_id']
    };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username,id:user._id };
    return {
      access_token: this.jwtService.sign(payload),
     user
    };
  }
}
