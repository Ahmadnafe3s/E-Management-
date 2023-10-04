import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModuleComponent } from './app/router.module';
import { HttpClientModule } from '@angular/common/http';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent , {
    providers:[importProvidersFrom(RouterModuleComponent , HttpClientModule)]
});