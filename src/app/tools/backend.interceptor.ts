import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {catchError, throwError} from 'rxjs';

export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith("/")) {
    //const token = inject(AuthService).token;
    req = req.clone({
      url: "http://localhost:3000" + req.url,
      //setHeaders: token ? {Authorization: "Bearer " + token} : undefined
    })
  }
  return next(req);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  if (req.url.startsWith("http://localhost:3000") && token) {
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    })
  }
  return next(req)
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (req.url.startsWith("http://localhost:3000")) {
    return next(req).pipe(catchError(err => {
      if(err.status === 401) {
        auth.logout()
      }
      // À garder dans un catch error pour permettre une gestion ultérieure de celle-ci
      return throwError(() => err)
    }))
  }
  return next(req)
}
