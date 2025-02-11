import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '@app/shared/interfaces';
import { environment } from '@envs/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(private readonly httpClient: HttpClient) {}

  getGenres() {
    return this.httpClient.get<Genre[]>(`${environment.apiUrl}/genres`);
  }
}
