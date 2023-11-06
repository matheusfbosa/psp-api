import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: PrismaHealthIndicator,
    private readonly prismaClient: PrismaClient,
  ) {}

  @ApiOperation({ summary: 'Get application health' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('prisma', this.prismaClient),
    ]);
  }
}
