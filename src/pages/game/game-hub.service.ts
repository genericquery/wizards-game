import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { GameState } from '../../model';

@Injectable({ providedIn: 'root' })
export class GameHubService {
  private connection?: HubConnection;
  connectionEstablishment = new Subject<boolean>();
  state$ = new Subject<GameState>();

  connect() {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(`/api/signal/game`)
        .build();

      this.connection.on('GameStateAsync', (message: GameState) => {
        console.log(message);
        this.state$.next(message);
      });

      this.connection
        .start()
        .then(() => {
          console.log('Hub connection started');
          this.connectionEstablishment.next(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = undefined;
    }
  }
}
