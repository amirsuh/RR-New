import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorFn:HttpInterceptorFn= (req,res)=>{
  const cloned= req.clone({
    setHeaders:{
      Authorization: `Bearer ${localStorage.getItem('auth') || ''}`,
      'X-App-Version': '20.0'
    }
  })
  return res(cloned)
}
