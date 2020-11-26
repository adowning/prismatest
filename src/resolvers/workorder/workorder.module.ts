import { WorkorderResolver } from './workorder.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Module({
  providers: [WorkorderResolver, PrismaService]
})
export class WorkorderModule {}
