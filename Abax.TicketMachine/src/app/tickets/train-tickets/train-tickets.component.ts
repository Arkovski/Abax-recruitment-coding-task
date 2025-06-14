import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {TrainTicketsService} from './train-tickets.service';
import {StationNamesComponent} from '../common/station-names.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'train-tickets',
  templateUrl: 'train-tickets.component.html',
  styleUrls: ['train-tickets.component.scss'],
  imports: [StationNamesComponent],
  providers: [TrainTicketsService],
})
export class TrainTicketsComponent {
  stations = signal<string[]>([]);

  constructor(readonly trainTicketsService: TrainTicketsService) {
    this.stations.set(trainTicketsService.fetchTrainStationNames());
  }
}
