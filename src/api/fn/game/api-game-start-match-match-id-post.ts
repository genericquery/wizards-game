/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ApiGameStartMatchMatchIdPost$Params {
  matchId: string;
}

export function apiGameStartMatchMatchIdPost(http: HttpClient, rootUrl: string, params: ApiGameStartMatchMatchIdPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, apiGameStartMatchMatchIdPost.PATH, 'post');
  if (params) {
    rb.path('matchId', params.matchId, {});
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

apiGameStartMatchMatchIdPost.PATH = '/api/Game/StartMatch/{matchId}';
