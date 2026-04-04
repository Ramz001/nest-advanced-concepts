import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(private readonly lazyModuleLoader: LazyModuleLoader) {}

  async test() {
    console.time();
    const rewardsModuleRef = await this.lazyModuleLoader.load(() =>
      import('./rewards/rewards.module.js').then((m) => m.RewardsModule),
    );

    const { RewardsService } = await import('./rewards/rewards.service.js');

    const rewardsService = rewardsModuleRef.get(RewardsService);

    rewardsService.log();
    console.timeEnd();
    return 'Hello World!';
  }
}
