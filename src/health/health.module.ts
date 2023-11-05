import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, TerminusModule],
  controllers: [HealthController],
  providers: [PrismaClient],
})
export class HealthModule {}
