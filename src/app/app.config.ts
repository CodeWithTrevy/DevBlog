import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app-routes.module';
import { UserServiceService } from './user-service.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withFetch(),
    ),
    provideRouter(routes),
    provideHttpClient(),
    UserServiceService,
    {
      provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true
    }
  ]
};