/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { apiGameAddPlayerPost$Json } from '../fn/game/api-game-add-player-post-json';
import { ApiGameAddPlayerPost$Json$Params } from '../fn/game/api-game-add-player-post-json';
import { apiGameAddPlayerPost$Plain } from '../fn/game/api-game-add-player-post-plain';
import { ApiGameAddPlayerPost$Plain$Params } from '../fn/game/api-game-add-player-post-plain';
import { apiGameCreateMatchPost$Json } from '../fn/game/api-game-create-match-post-json';
import { ApiGameCreateMatchPost$Json$Params } from '../fn/game/api-game-create-match-post-json';
import { apiGameCreateMatchPost$Plain } from '../fn/game/api-game-create-match-post-plain';
import { ApiGameCreateMatchPost$Plain$Params } from '../fn/game/api-game-create-match-post-plain';
import { apiGameEndMatchMatchIdPost } from '../fn/game/api-game-end-match-match-id-post';
import { ApiGameEndMatchMatchIdPost$Params } from '../fn/game/api-game-end-match-match-id-post';
import { apiGameGetMatchlistGet$Json } from '../fn/game/api-game-get-matchlist-get-json';
import { ApiGameGetMatchlistGet$Json$Params } from '../fn/game/api-game-get-matchlist-get-json';
import { apiGameGetMatchlistGet$Plain } from '../fn/game/api-game-get-matchlist-get-plain';
import { ApiGameGetMatchlistGet$Plain$Params } from '../fn/game/api-game-get-matchlist-get-plain';
import { apiGameGetMatchStateByPlayerIdPlayerIdGet$Json } from '../fn/game/api-game-get-match-state-by-player-id-player-id-get-json';
import { ApiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Params } from '../fn/game/api-game-get-match-state-by-player-id-player-id-get-json';
import { apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain } from '../fn/game/api-game-get-match-state-by-player-id-player-id-get-plain';
import { ApiGameGetMatchStateByPlayerIdPlayerIdGet$Plain$Params } from '../fn/game/api-game-get-match-state-by-player-id-player-id-get-plain';
import { apiGameMovePlayerPost } from '../fn/game/api-game-move-player-post';
import { ApiGameMovePlayerPost$Params } from '../fn/game/api-game-move-player-post';
import { apiGamePlayerShootPlayerIdPost } from '../fn/game/api-game-player-shoot-player-id-post';
import { ApiGamePlayerShootPlayerIdPost$Params } from '../fn/game/api-game-player-shoot-player-id-post';
import { apiGameStartMatchMatchIdPost } from '../fn/game/api-game-start-match-match-id-post';
import { ApiGameStartMatchMatchIdPost$Params } from '../fn/game/api-game-start-match-match-id-post';
import { GameMatch } from '../models/game-match';
import { MatchListElement } from '../models/match-list-element';
import { Player } from '../models/player';

@Injectable({ providedIn: 'root' })
export class GameService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiGameAddPlayerPost()` */
  static readonly ApiGameAddPlayerPostPath = '/api/Game/AddPlayer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameAddPlayerPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGameAddPlayerPost$Plain$Response(params?: ApiGameAddPlayerPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
    return apiGameAddPlayerPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameAddPlayerPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGameAddPlayerPost$Plain(params?: ApiGameAddPlayerPost$Plain$Params, context?: HttpContext): Observable<Player> {
    return this.apiGameAddPlayerPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Player>): Player => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameAddPlayerPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGameAddPlayerPost$Json$Response(params?: ApiGameAddPlayerPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
    return apiGameAddPlayerPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameAddPlayerPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGameAddPlayerPost$Json(params?: ApiGameAddPlayerPost$Json$Params, context?: HttpContext): Observable<Player> {
    return this.apiGameAddPlayerPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Player>): Player => r.body)
    );
  }

  /** Path part for operation `apiGameCreateMatchPost()` */
  static readonly ApiGameCreateMatchPostPath = '/api/Game/CreateMatch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameCreateMatchPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameCreateMatchPost$Plain$Response(params?: ApiGameCreateMatchPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return apiGameCreateMatchPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameCreateMatchPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameCreateMatchPost$Plain(params?: ApiGameCreateMatchPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.apiGameCreateMatchPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameCreateMatchPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameCreateMatchPost$Json$Response(params?: ApiGameCreateMatchPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return apiGameCreateMatchPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameCreateMatchPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameCreateMatchPost$Json(params?: ApiGameCreateMatchPost$Json$Params, context?: HttpContext): Observable<string> {
    return this.apiGameCreateMatchPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `apiGameStartMatchMatchIdPost()` */
  static readonly ApiGameStartMatchMatchIdPostPath = '/api/Game/StartMatch/{matchId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameStartMatchMatchIdPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameStartMatchMatchIdPost$Response(params: ApiGameStartMatchMatchIdPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGameStartMatchMatchIdPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameStartMatchMatchIdPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameStartMatchMatchIdPost(params: ApiGameStartMatchMatchIdPost$Params, context?: HttpContext): Observable<void> {
    return this.apiGameStartMatchMatchIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiGameEndMatchMatchIdPost()` */
  static readonly ApiGameEndMatchMatchIdPostPath = '/api/Game/EndMatch/{matchId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameEndMatchMatchIdPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameEndMatchMatchIdPost$Response(params: ApiGameEndMatchMatchIdPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGameEndMatchMatchIdPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameEndMatchMatchIdPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameEndMatchMatchIdPost(params: ApiGameEndMatchMatchIdPost$Params, context?: HttpContext): Observable<void> {
    return this.apiGameEndMatchMatchIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiGameGetMatchlistGet()` */
  static readonly ApiGameGetMatchlistGetPath = '/api/Game/GetMatchlist';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameGetMatchlistGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchlistGet$Plain$Response(params?: ApiGameGetMatchlistGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatchListElement>>> {
    return apiGameGetMatchlistGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameGetMatchlistGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchlistGet$Plain(params?: ApiGameGetMatchlistGet$Plain$Params, context?: HttpContext): Observable<Array<MatchListElement>> {
    return this.apiGameGetMatchlistGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MatchListElement>>): Array<MatchListElement> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameGetMatchlistGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchlistGet$Json$Response(params?: ApiGameGetMatchlistGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatchListElement>>> {
    return apiGameGetMatchlistGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameGetMatchlistGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchlistGet$Json(params?: ApiGameGetMatchlistGet$Json$Params, context?: HttpContext): Observable<Array<MatchListElement>> {
    return this.apiGameGetMatchlistGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MatchListElement>>): Array<MatchListElement> => r.body)
    );
  }

  /** Path part for operation `apiGameGetMatchStateByPlayerIdPlayerIdGet()` */
  static readonly ApiGameGetMatchStateByPlayerIdPlayerIdGetPath = '/api/Game/GetMatchStateByPlayerId/{playerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain$Response(params: ApiGameGetMatchStateByPlayerIdPlayerIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GameMatch>> {
    return apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain(params: ApiGameGetMatchStateByPlayerIdPlayerIdGet$Plain$Params, context?: HttpContext): Observable<GameMatch> {
    return this.apiGameGetMatchStateByPlayerIdPlayerIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GameMatch>): GameMatch => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameGetMatchStateByPlayerIdPlayerIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Response(params: ApiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<GameMatch>> {
    return apiGameGetMatchStateByPlayerIdPlayerIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGameGetMatchStateByPlayerIdPlayerIdGet$Json(params: ApiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Params, context?: HttpContext): Observable<GameMatch> {
    return this.apiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<GameMatch>): GameMatch => r.body)
    );
  }

  /** Path part for operation `apiGameMovePlayerPost()` */
  static readonly ApiGameMovePlayerPostPath = '/api/Game/MovePlayer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGameMovePlayerPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGameMovePlayerPost$Response(params?: ApiGameMovePlayerPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGameMovePlayerPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGameMovePlayerPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiGameMovePlayerPost(params?: ApiGameMovePlayerPost$Params, context?: HttpContext): Observable<void> {
    return this.apiGameMovePlayerPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `apiGamePlayerShootPlayerIdPost()` */
  static readonly ApiGamePlayerShootPlayerIdPostPath = '/api/Game/PlayerShoot/{playerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiGamePlayerShootPlayerIdPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGamePlayerShootPlayerIdPost$Response(params: ApiGamePlayerShootPlayerIdPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return apiGamePlayerShootPlayerIdPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiGamePlayerShootPlayerIdPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiGamePlayerShootPlayerIdPost(params: ApiGamePlayerShootPlayerIdPost$Params, context?: HttpContext): Observable<void> {
    return this.apiGamePlayerShootPlayerIdPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
