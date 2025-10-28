import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app-routes.module';
import { UserServiceService } from './user-service.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'; 
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme:{
        preset:Aura
      }
    }),
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

function providePrimeNG(arg0: { theme: { preset: any; }; }): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}
