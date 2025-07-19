import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, of, tap } from 'rxjs';
import type { RestCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RestCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query: ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${API_URL}/name/${query}`;
    query = query.trim().toLowerCase();
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }
    return this.http.get<RestCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
       tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query: ${query}`)
        );
      })
    );
  }

  searchCountryByCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;
    return this.http.get<RestCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese código: ${code}`)
        );
      })
    );
  }

    searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }
    return this.http.get<RestCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
       tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese region: ${region}`)
        );
      })
    );
  }
}
