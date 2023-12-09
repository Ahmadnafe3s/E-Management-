import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModuleComponent } from './app/router.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './app/auth/Interceptor.service';
import { BnNgIdleService } from 'bn-ng-idle';



bootstrapApplication(AppComponent , {
    providers:[importProvidersFrom(RouterModuleComponent , HttpClientModule , BnNgIdleService) , {provide : HTTP_INTERCEPTORS , useClass: AuthInterceptor , multi : true}]
});

