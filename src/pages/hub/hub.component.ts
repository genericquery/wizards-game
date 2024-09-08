import { Component, inject } from '@angular/core';
import { GameService } from '../../api/services';
import { take } from 'rxjs';
import { LocalStorage } from '../../shared';
import { currentGameIdKey } from '../../shared/constants';
import { Router } from '@angular/router';
import { GameHubService } from '../game/game-hub.service';

@Component({
  selector: 'wiz-hub',
  standalone: true,
  imports: [],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
})
export class HubComponent {
  gameService = inject(GameService);
  gameHubService = inject(GameHubService);
  localStorage = inject(LocalStorage);
  router = inject(Router);

  createGame() {
    this.gameService
      .apiGameCreateMatchPost$Json()
      .pipe(take(1))
      .subscribe((gameId: string) => {
        this.localStorage.setItem(currentGameIdKey, gameId);
        this.gameHubService.addGameIdToCreatedByUser(gameId);
        this.router.navigate(['/lobby', gameId]);
      });
  }
}
