import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly baseUrl = environment.trainTicketApi;


  // here can nbe added retry logic, handling errors, whatever you want (for "bad connection")
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (/^https?:\/\//i.test(req.url)) {
      return next.handle(req);
    }

    const apiReq = req.clone({ url: this.baseUrl + req.url });
    return next.handle(apiReq);
  }
}
