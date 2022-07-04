import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = context.getArgByIndex(0);
    // console.log(context.getArgByIndex(0));
    console.log(next.handle());
    console.log(`[ Request ]: ${method} | ${url} \n`);

    return next
      .handle()
      .pipe(
        tap((data) =>
          console.log(
            `[ Response ]: ${method} || ${url} \n [ Response ]: ${JSON.stringify(
              data,
            )}`,
          ),
        ),
      );
  }
}
