import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

//                    TODO::implement Logger letter
// -----------------------------------------------------------------
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    console.log(`Method: ${method}, URL: ${url}`);
    console.log(req.body);
    const now = Date.now();
    console.log('After...');
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
        return data;
      }),
    );
  }
}
