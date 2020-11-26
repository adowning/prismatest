import { AccountResolver } from './account.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Module({
  providers: [AccountResolver, PrismaService],
})
export class AccountModule {}
