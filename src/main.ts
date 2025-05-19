import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // <-- Importa aquí

// ✅ Registramos el locale español
registerLocaleData(localeEs);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule),  // <-- Añade aquí
    { provide: LOCALE_ID, useValue: 'es' }
  ]
}).catch((err) => console.error(err));
