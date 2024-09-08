import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { GameHubService } from '../game/game-hub.service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddPlayerDto, SideType } from '../../api/models';
import { MagicType } from '../../model/api.model';
import { GameService } from '../../api/services';
import { map, pairwise, take, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { texts } from '../../shared';

type PlayerForm = {
  matchId: FormControl<string | null>;
  playerName: FormControl<string | null>;
  sideType: FormControl<SideType | null>;
  magicType: FormControl<MagicType | null>;
};

@Component({
  selector: 'wiz-lobby',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit {
  gameService = inject(GameHubService);
  apiGameService = inject(GameService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  private _gameId: string | undefined;
  errorMessage?: string;

  @Input() set gameId(gameId: string) {
    this._gameId = gameId;
    this.playerForm.get('matchId')?.setValue(gameId);
    this.gameService.GetPlayers(gameId);
  }

  state$ = this.gameService.state$;

  greenTeam$ = this.gameService.greenTeam$;
  redTeam$ = this.gameService.redTeam$;

  //   redUsers$ = this.gameService.

  playerForm = new FormGroup<PlayerForm>({
    matchId: new FormControl(null, [Validators.required]),
    playerName: new FormControl(null, [Validators.required]),
    sideType: new FormControl(null, [Validators.required]),
    magicType: new FormControl(null, [Validators.required]),
  });

  currentWizardText$ = this.playerForm.valueChanges.pipe(
    map((x) =>
      x.magicType !== undefined
        ? texts.wizardDescriptions[x.magicType as MagicType]
        : ''
    )
  );

  wizards = [
    {
      name: 'Воздух',
      image: '/sprites/wizard_air.svg',
      value: MagicType.Air,
    },
    {
      name: 'Огонь',
      image: '/sprites/wizard_flame.svg',
      value: MagicType.Fire,
    },
    {
      name: 'Земля',
      image: '/sprites/wizard_earth.svg',
      value: MagicType.Earth,
    },
    {
      name: 'Вода',
      image: '/sprites/wizard_water.svg',
      value: MagicType.Water,
    },
  ];
  sides = [
    {
      name: 'Красная',
      className: 'bg-red-400',
      activeClassName: 'bg-red-600',
      value: SideType.$1,
    },
    {
      name: 'Зеленая',
      className: 'bg-green-400',
      activeClassName: 'bg-green-600',
      value: SideType.$0,
    },
  ];

  isWizardSelected(type: MagicType) {
    return this.playerForm.get('magicType')?.value === type;
  }

  isSideSelected(side: SideType) {
    return this.playerForm.get('sideType')?.value === side;
  }

  isGameCreatedByCurrentUser() {
    return this.gameService.isGameCreatedByCurrentUser(this._gameId as string);
  }

  ngOnInit(): void {
    this.gameService.connect();
    this.state$
      .pipe(
        map((x) => x?.isMatchStarted ?? false),
        takeUntilDestroyed(this.destroyRef),
        pairwise()
      )
      .subscribe(([prevStart, currentStart]) => {
        if (prevStart === false && currentStart === true) {
          this.navigateToGameScreen();
        }
      });
    setTimeout(() => {
      this.gameService.GetPlayers(this._gameId as string);
    }, 1000);
  }

  addPlayer() {
    this.errorMessage = undefined;
    if (this.playerForm.valid) {
      this.apiGameService
        .apiGameAddPlayerPost$Json({
          body: this.playerForm?.value as AddPlayerDto,
        })
        .pipe(take(1))
        .subscribe((response) => {
          if (response?.id) {
            this.gameService.GetPlayerState(response.id);
          }
        });
    } else {
      if (this.playerForm.get('matchId')?.hasError('required')) {
        this.errorMessage = 'Попробуйте пересоздать игру';
      }

      if (this.playerForm.get('playerName')?.hasError('required')) {
        this.errorMessage = 'Вы не ввели имя игрока';
      }

      if (this.playerForm.get('side')?.hasError('required')) {
        this.errorMessage = 'Вы не выбрали команду';
      }

      if (this.playerForm.get('magicType')?.hasError('required')) {
        this.errorMessage = 'Вы не выбрали мага';
      }
    }
  }

  startMatch() {
    this.apiGameService
      .apiGameStartMatchMatchIdPost({
        matchId: this._gameId as string,
      })
      .pipe(take(1))
      .subscribe(() => this.navigateToGameScreen());
  }

  private navigateToGameScreen(): void {
    this.router.navigate(['/game', this._gameId as string]);
  }
}
