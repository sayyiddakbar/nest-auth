import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { GoogleStrategy } from './google.strategy'

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController,],
  providers: [AppService,GoogleStrategy],
})
export class AppModule {}
