import { inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { GameState } from '../../model';
import {
  createdByUserGameIdsKey,
  currentPlayerIdKey,
  LocalStorage,
} from '../../shared';
import { MovementAxis } from '../../api/models';

export interface Teams {
  redTeam: string[];
  greenTeam: string[];
}

@Injectable({ providedIn: 'root' })
export class GameHubService {
  private connection?: HubConnection;
  private localStorage = inject(LocalStorage);
  connectionEstablishment = new Subject<boolean>();
  state$ = new BehaviorSubject<GameState | undefined>(undefined);
  matchId: string | undefined = undefined;
  playerId$ = new BehaviorSubject<string | undefined>(undefined);
  playerList$ = new BehaviorSubject<Teams | undefined>(undefined);

  redTeam$ = this.playerList$.pipe(map((teams) => teams?.redTeam));
  greenTeam$ = this.playerList$.pipe(map((teams) => teams?.greenTeam));

  connect() {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(`/api/signal/game`)
        .build();

      this.connection.on('GameState', (message: GameState) => {
        this.state$.next(message);
        setTimeout(() => {
          if (message.winner == null) {
            this.GetPlayerState(this.playerId$.value as string);
          }
        }, 10);
      });

      this.connection.on('PlayersList', (playersList) => {
        this.playerList$.next(playersList);
        setTimeout(() => {
          this.GetPlayers(this.matchId as string);
        }, 10);
      });

      this.connection
        .start()
        .then(() => {
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

  GetPlayerState(playerId: string) {
    this.localStorage.setItem(currentPlayerIdKey, playerId);
    this.playerId$.next(playerId);
    this.connection?.invoke('GameStateAsync', playerId).then((x) => {});
  }

  GetPlayers(matchId: string) {
    this.matchId = matchId;
    this.connection?.invoke('GetPlayersListAsync', matchId).then((x) => {});
  }

  MovePlayer(vector: MovementAxis) {
    this.connection?.invoke('MovePlayer', this.playerId$.value, vector);
  }

  addGameIdToCreatedByUser(matchId: string) {
    let createdByUserGames = this.getCreatedByCurrentUserGames();

    createdByUserGames.push(matchId);

    this.localStorage.setItem(
      createdByUserGameIdsKey,
      JSON.stringify(createdByUserGames)
    );
  }

  private getCreatedByCurrentUserGames(): string[] {
    const gamesString = this.localStorage.getItem(createdByUserGameIdsKey);
    return gamesString ? JSON.parse(gamesString) : [];
  }

  isGameCreatedByCurrentUser(matchId: string) {
    const games = this.getCreatedByCurrentUserGames();
    return games.includes(matchId);
  }

  Shoot() {
    this.connection?.invoke('PlayerShoot', this.playerId$.value);
  }

  DeffecncePlayer(isDeffend: boolean) {
    this.connection?.invoke(
      isDeffend ? 'DefendPlayerDown' : 'DefendPlayerUp',
      this.playerId$.value
    );
  }

  FillObelisk(isFilled: boolean) {
    this.connection?.invoke(
      isFilled ? 'FillObeliskDown' : 'FillObeliskUp',
      this.playerId$.value
    );
  }
}
