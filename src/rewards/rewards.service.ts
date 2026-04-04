import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  log() {
    console.log('RewardsService log method called');
  }
}
