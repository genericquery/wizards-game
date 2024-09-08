/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MovementAxis } from '../../models/movement-axis';

export interface ApiGameMovePlayerPost$Params {
  playerId?: string;
      body?: MovementAxis
}

export function apiGameMovePlayerPost(http: HttpClient, rootUrl: string, params?: ApiGameMovePlayerPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiGameMovePlayerPost.PATH, 'post');
  if (params) {
    rb.query('playerId', params.playerId, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

apiGameMovePlayerPost.PATH = '/api/Game/MovePlayer';
