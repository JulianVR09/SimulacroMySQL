import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordService } from 'src/common/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
