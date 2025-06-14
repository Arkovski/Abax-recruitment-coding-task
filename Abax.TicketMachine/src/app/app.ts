import translationsEN from "../../public/i18n/en.json";
import translationsPL from "../../public/i18n/pl.json";

import {Component, signal} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {AppToastComponent} from './app-toast/app-toast.component';
import { filter } from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, AppToastComponent, RouterLink, TranslatePipe, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'TicketMachineLabel';
  isTicketsPage = signal<boolean>(false);

  constructor(
    private readonly translateService: TranslateService,
    private readonly router: Router,
  ) {
    translateService.addLangs(["en","pl"]);
    translateService.setTranslation("en", translationsEN);
    translateService.setTranslation("pl", translationsPL);
    translateService.setDefaultLang("en");

    // I can combine observables with signals, promises (both old ones and new ones). I know everything well.
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isTicketsPage.set(event.urlAfterRedirects.startsWith('/tickets'));
      });
  }

  changeLanguage(language: "en" | "pl") {
    this.translateService.use(language);
  }
}
