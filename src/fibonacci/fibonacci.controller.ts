import {
  Controller,
  Get,
  Query,
  RequestTimeoutException,
  UseInterceptors,
} from '@nestjs/common';
import { CircuitBreakerInterceptor } from 'src/common/interceptors/circuit-breaker/circuit-breaker.interceptor';

@UseInterceptors(CircuitBreakerInterceptor)
@Controller('fibonacci')
export class FibonacciController {
  @Get()
  fibonacci(@Query('n') n = 10) {
    console.log(`Executing circuit error`);
    throw new RequestTimeoutException(
      'Boom time out error for testing circuit breaker',
    );
    // if (n < 2) return n;
    // const result: number = this.fibonacci(n - 1) + this.fibonacci(n - 2);
    // return result;
  }
}
