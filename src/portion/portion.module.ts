/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PortionService } from './portion.service';
import { PortionController } from './portion.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PortionService, PrismaService],
  controllers: [PortionController],
  exports: [
    PortionService
  ]
})
export class PortionModule {}
