import { CallHandler } from '@nestjs/common';
import { tap, throwError } from 'rxjs';

const SUCCESS_THRESHOLD = 3;
const FAILURE_THRESHOLD = 3;
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60000; // 1 minute in milliseconds

enum CircuitBreakerState {
  CLOSED,
  OPEN,
  HALF_OPEN,
}

export class CircuitBreaker {
  private state = CircuitBreakerState.CLOSED;
  private failureCount = 0;
  private successCount = 0;
  private lastError: Error | null = null;
  private nextAttempt;

  exec(next: CallHandler) {
    if (this.state === CircuitBreakerState.OPEN) {
      if (this.nextAttempt > Date.now()) {
        return throwError(() => this.lastError);
      }
      this.state = CircuitBreakerState.HALF_OPEN;
    }

    return next.handle().pipe(
      tap({
        next: () => this.handleSuccess(),
        error: (err: Error) => this.handleError(err),
      }),
    );
  }

  private handleSuccess() {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HALF_OPEN) {
      this.successCount++;

      if (this.successCount >= SUCCESS_THRESHOLD) {
        this.state = CircuitBreakerState.CLOSED;
        this.successCount = 0;
      }
    }
  }

  private handleError(error: Error) {
    this.failureCount++;

    if (
      this.failureCount >= FAILURE_THRESHOLD ||
      this.state === CircuitBreakerState.HALF_OPEN
    ) {
      this.state = CircuitBreakerState.OPEN;
      this.lastError = error;
      this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME;
    }
  }
}
