/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GameMatch } from '../../models/game-match';

export interface ApiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Params {
  playerId: string;
}

export function apiGameGetMatchStateByPlayerIdPlayerIdGet$Json(http: HttpClient, rootUrl: string, params: ApiGameGetMatchStateByPlayerIdPlayerIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<GameMatch>> {
  const rb = new RequestBuilder(rootUrl, apiGameGetMatchStateByPlayerIdPlayerIdGet$Json.PATH, 'get');
  if (params) {
    rb.path('playerId', params.playerId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GameMatch>;
    })
  );
}

apiGameGetMatchStateByPlayerIdPlayerIdGet$Json.PATH = '/api/Game/GetMatchStateByPlayerId/{playerId}';
