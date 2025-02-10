import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Language } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  constructor(private readonly httpClient: HttpClient) {}

  getLanguages() {
    return this.httpClient.get<Language[]>(`${environment.apiUrl}/languages`);
  }
}
