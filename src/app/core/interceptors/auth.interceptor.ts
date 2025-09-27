import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _snackBar = inject(MatSnackBar);
  
  const openSnackBar = (msg: string)  => {
    _snackBar.open(msg, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000
    });
  }

  
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned).pipe(
      catchError((error) => {
        if(error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        openSnackBar(error.error?.msg || 'An error occurred');
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  return next(req);
};


