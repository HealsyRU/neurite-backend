/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './account.controller';
import { UserService } from './account.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { RoleModule } from 'src/role/role.module';

@Module({
  providers: [PrismaService, UserService],
  controllers: [UserController],
  imports: [
    forwardRef(() => JwtModule),
    forwardRef(() => AuthModule),
    forwardRef(() => RoleModule),
  ],
  exports: [
    UserService
  ]
})
export class AccountModule {}
