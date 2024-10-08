/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MatchListElement } from '../../models/match-list-element';

export interface ApiGameGetMatchlistGet$Plain$Params {
}

export function apiGameGetMatchlistGet$Plain(http: HttpClient, rootUrl: string, params?: ApiGameGetMatchlistGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MatchListElement>>> {
  const rb = new RequestBuilder(rootUrl, apiGameGetMatchlistGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MatchListElement>>;
    })
  );
}

apiGameGetMatchlistGet$Plain.PATH = '/api/Game/GetMatchlist';
