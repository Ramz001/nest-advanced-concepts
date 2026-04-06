/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { INTERVAL_HOST_KEY } from '../decorator/interval-host.decorator';
import { INTERVAL_KEY } from '../decorator/interval.decorator';

@Injectable()
export class IntervalScheduler implements OnApplicationBootstrap {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();

    providers.forEach((wrapper) => {
      const { token, instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!prototype || !instance) return;
      const isIntervalHost =
        this.reflector.get(INTERVAL_HOST_KEY, instance.constructor) ?? false;
      if (isIntervalHost) {
        console.log('Interval Host Found:', token);
      }

      const methodNames = this.metadataScanner.getAllMethodNames(prototype);
      methodNames.forEach((methodName) => {
        const interval = this.reflector.get(INTERVAL_KEY, instance[methodName]);
        if (interval) {
          console.log(
            `Interval method found: ${methodName} with interval ${interval}ms`,
          );
          setInterval(() => {
            instance[methodName]();
          }, interval);
        }
      });
    });
  }
}
