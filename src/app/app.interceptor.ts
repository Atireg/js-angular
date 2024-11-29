import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';

const API ='/api';
const { apiUrl } = environment;

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith(API)){
    // debugger;
    req = req.clone({
      url: req.url.replace(API, apiUrl),
      withCredentials: true
    })

  }
  return next(req);
};
