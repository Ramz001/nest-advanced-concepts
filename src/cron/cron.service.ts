import { IntervalHost } from 'src/scheduler/decorator/interval-host.decorator';
import { Interval } from 'src/scheduler/decorator/interval.decorator';

@IntervalHost
export class CronService {
  @Interval(100000)
  everySecond() {
    console.log('Every second');
  }
}
