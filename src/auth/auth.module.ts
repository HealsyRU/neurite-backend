import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Token } from 'src/tokens/tokens.model';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([User, Token]),
    forwardRef(() => JwtModule),
    forwardRef(() => TokensModule),
    forwardRef(() => UsersModule),
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
