import { environment } from "../../../environments/environment";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Router } from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import { ToastService } from "../service/toast/toast.service";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toast: ToastService,
  ) {
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes("/assets/i18n")) {
      return next.handle(httpRequest);
    }
    return next.handle(this.addAuthToken(httpRequest)).pipe(
      catchError((error: HttpErrorResponse) => {
        let status = error.status;
        let message = "";
        if (typeof window !== 'undefined' && error.error instanceof ErrorEvent) {
          // handle client-side error
          message = `Error: ${error.error.message}`;
        } else {
          // handle server-side error
          message = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        if (error['status'] === 401 || error['status'] === 403) {
          this.router.navigate(['/login']);
          this.toast.showWarn('Thông báo', 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
          //token het han thi call api refesh token
          // this.idleService.refeshToken();
        }
        return throwError(() => error);
      })
    );
  }

  addAuthToken(request: HttpRequest<any>) {
    let token: any = localStorage.getItem(environment.accessToken);
    let reqClone: any;

    reqClone = request.clone({
      url: environment.apiUrl + request.url,
    });

    if (!token) {
      return reqClone.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'clientMessageId': uuidv4()

        },
      })
    }

    return reqClone.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        clientMessageId: uuidv4()
      },
    });
  }
}
