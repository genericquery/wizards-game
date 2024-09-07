import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected baseUrl = '/api/Game';

  http = inject(HttpClient);

  AddPlayer() {}
}
