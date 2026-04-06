import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';

@Module({
  imports: [SchedulerModule, CronModule, FibonacciModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
