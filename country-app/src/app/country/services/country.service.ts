import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';
import { RestCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();
    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;
    query = query.trim().toLowerCase();
    return this.http.get<RestCountry[]>(url).pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`))
      })
    );
  }
}
