import type { Country } from "../interfaces/country.interface";
import type { RestCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
    static mapRestCountryToCountry(restCountry: RestCountry): Country {
        return {
           capital: restCountry.capital.join(', '),
           cca2: restCountry.cca2,
           flag: restCountry.flag,
           flagSvg: restCountry.flags.svg,
           name: restCountry.translations['spa'].common ?? restCountry.name.common,
           population: restCountry.population,
           region: restCountry.region,
           subRegion: restCountry.subregion
        }
    }

    static mapRestCountryArrayToCountryArray(restCountries: RestCountry[]): Country[] {
        return restCountries.map(this.mapRestCountryToCountry);
    }
}