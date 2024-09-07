/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddPlayerDto } from '../../models/add-player-dto';
import { Player } from '../../models/player';

export interface ApiGameAddPlayerPost$Json$Params {
      body?: AddPlayerDto
}

export function apiGameAddPlayerPost$Json(http: HttpClient, rootUrl: string, params?: ApiGameAddPlayerPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
  const rb = new RequestBuilder(rootUrl, apiGameAddPlayerPost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Player>;
    })
  );
}

apiGameAddPlayerPost$Json.PATH = '/api/Game/AddPlayer';
