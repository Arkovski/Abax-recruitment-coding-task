import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrainTicketsService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  // since it's train ticket machine, requests shouldn't be sent after each char input
  fetchTrainStationNames() {
    // Imagine here are http interceptors (retry requests / queueing) to mitigate the connection issues
    // return this.httpClient.get<string[]>("https://raw.githubusercontent.com/abax-as/coding-challenge/master/station_codes.json");

    const myStationNamesFromImaginaryService = [
      "Abax",
      "Abaxx",
      "AAbax",
      "NorwayNorway",
      "Norway Norway",
      "Poland Poland",
      "Polandd Polandd"
    ];

    return myStationNamesFromImaginaryService.map(name =>
      name.toUpperCase()
    );
  }
}
