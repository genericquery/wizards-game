import { GameHubService } from '@/pages/game/game-hub.service';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ControllerService {
  gameHubService = inject(GameHubService);
}
