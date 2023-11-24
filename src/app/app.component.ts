import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ru } from 'date-fns/locale';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, RouterOutlet],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: ru },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE]
    },
  ],
  template: `
    <app-navigation />
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      padding: 1rem;
    }
  `],
})
export class AppComponent {
  readonly #iconRegistry = inject(MatIconRegistry);

  constructor() {
    this.#initMaterialSymbols();
  }

  #initMaterialSymbols() {
    const defaultFontSetClasses = this.#iconRegistry.getDefaultFontSetClass();
    const outlinedFontSetClasses = defaultFontSetClasses.filter(fontSetClass => fontSetClass !== 'material-icons').concat(['material-symbols-outlined']);
    this.#iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses);
  }
}
