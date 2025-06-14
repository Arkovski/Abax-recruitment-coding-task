import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LettersService {
  readonly letters: string[] = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
}
