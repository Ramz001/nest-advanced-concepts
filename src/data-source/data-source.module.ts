import { Module } from '@nestjs/common';
import { DataSourceService } from './data-source.service';

@Module({
  providers: [DataSourceService]
})
export class DataSourceModule {}
