import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './app-toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToastComponent {
  constructor() {
  }
}
