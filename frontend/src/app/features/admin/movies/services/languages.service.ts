import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '@app/shared/interfaces';
import { environment } from '@envs/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  constructor(private readonly httpClient: HttpClient) {}

  getLanguages() {
    return this.httpClient.get<Language[]>(`${environment.apiUrl}/languages`);
  }
}
