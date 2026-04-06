import { Controller, Get, Query } from '@nestjs/common';

@Controller('fibonacci')
export class FibonacciController {
  @Get()
  fibonacci(@Query('n') n = 10) {
    if (n < 2) return n;
    const result: number = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    return result;
  }
}
