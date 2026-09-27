import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const publicUrls = [
    '/auth/v1/signup',
    '/auth/v1/login',
  ];

  const isPublicUrl = publicUrls.some(url =>
    req.url.includes(url)
  );

  // Add API Key to every request
  let modifiedReq = req.clone({
    setHeaders: {
      'apikey':'sb_publishable_5n8kh9s1vVaJ7HqiWWSMPg_tLyAlfi2' ,
    },
  });

  // Public endpoints don't need Access Token
  if (isPublicUrl) {
    return next(modifiedReq);
  }

  // Protected endpoints get Access Token
  const token = localStorage.getItem('accessToken');

  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq);
};
