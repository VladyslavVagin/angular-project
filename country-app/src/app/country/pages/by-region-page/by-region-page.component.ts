import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europa',
    'Oceania',
  ];
  countryService = inject(CountryService);
  selectedRegion = signal<Region | null>(null);
  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({request}) => {
      if(!request.region) return of([]);
      return this.countryService.searchByRegion(request.region)
    }
  })
}
