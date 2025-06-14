import {ChangeDetectionStrategy, Component, input, OnInit, signal} from '@angular/core';
import {LettersService} from './letters.service';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'station-names',
  templateUrl: 'station-names.component.html',
  styleUrls: ['station-names.component.scss'],
  providers: [LettersService],
  imports: [TranslatePipe, FormsModule, CommonModule]
})
export class StationNamesComponent implements OnInit {
  stations = input<string[]>([]);
  filteredStations = signal<string[]>([]);
  searchText: string = "";
  showWarning = signal<boolean>(false);

  letters: string[];

  constructor(readonly lettersService: LettersService) {
    this.letters = lettersService.letters;
    // this.filteredStations.set(stations contains(the most clicked destinations)); // Could do the most used stations in the given location. Easy to implement.
  }

  ngOnInit() {
    this.filteredStations.set(this.stations());
  }

  recalculatePossibleStations(searchText: string) {
    // And about performance, there are like only 600 train stations in Poland. In Norway much less, so the performance doesn't matter
    // even despite you said it matters. If you run this on the calculator, maybe then it will be the issue. We also don't have
    // to be eco. These machines always have 24/7 electricity connection, so a CPU usage can be a little bit higher and consume 1w more.
    const searchTextCapitalized = this.capitalizeInput(searchText);
    this.searchText = searchTextCapitalized;
    this.filteredStations.set(this.stations().filter(t => t.startsWith(searchTextCapitalized)));
  }

  pushLetter(letter: string) {
    this.searchText += letter;

    this.recalculatePossibleStations(this.searchText);
  }

  clearSearchText() {
    this.searchText = "";
  }

  changeShowWarning() {
    this.showWarning.set(!this.showWarning()); // I could do it directly in HTML, but HTML should't contains logic
  }

  selectStation(station: string) {
    this.searchText = station;
    this.filteredStations.set([]);
    // go to the next page (with arrows at the bottom to go back if needed)
    // price, discounts etc. Like in train-tickets/interfaces/ticket.ts
  }

  // Below are 3 functions, mostly written by AI, for things like this the ML do the best job. But I did them as getters and as private accordingly.
  isLetterAvailable(letter: string) {
    return this.availableNextLetters.has(letter.toUpperCase());
  }

  get rows() {
    const chunkSize = 5;
    const result: string[][] = [];
    for (let i = 0; i < this.letters.length; i += chunkSize) {
      result.push(this.letters.slice(i, i + chunkSize));
    }
    return result;
  }

  private get availableNextLetters() {
    const pos = this.searchText.length;
    const source = this.searchText ? this.filteredStations() : this.stations();
    return new Set(
      source
        .map(station => station[pos])
        .filter((ch): ch is string => !!ch)
        .map(ch => ch.toUpperCase())
    );
  }

  private capitalizeInput(text: string) {
    if (!text) {
      return '';
    }

    return text.replace(/\b([a-ząćęłńóśźż])/gi, match => match.toUpperCase());
  }
}
