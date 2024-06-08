import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './tokens.model';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokensService],
  controllers: [TokensController],
  imports: [
    SequelizeModule.forFeature([User, Token]),
    forwardRef(() => UsersModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'SECRET',
        signOptions: {
          expiresIn: '24h'
        }
    })
  ],
  exports: [
    TokensService,
    JwtModule
  ] 
})
export class TokensModule {}
