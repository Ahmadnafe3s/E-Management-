import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModuleComponent } from './app/router.module';
import { HttpClientModule } from '@angular/common/http';



bootstrapApplication(AppComponent , {
    providers:[importProvidersFrom(RouterModuleComponent , HttpClientModule)]
});

