/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/prisma.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  providers: [RoleService, PrismaService],
  controllers: [RoleController],
  imports: [
    forwardRef(() => AccountModule),
  ],
  exports: [
    RoleService
  ]
})
export class RoleModule {}
