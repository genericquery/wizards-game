/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ApiGamePlayerShootPlayerIdPost$Params {
  playerId: string;
}

export function apiGamePlayerShootPlayerIdPost(http: HttpClient, rootUrl: string, params: ApiGamePlayerShootPlayerIdPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiGamePlayerShootPlayerIdPost.PATH, 'post');
  if (params) {
    rb.path('playerId', params.playerId, {});
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

apiGamePlayerShootPlayerIdPost.PATH = '/api/Game/PlayerShoot/{playerId}';
