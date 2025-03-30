import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toStarWarsFilmMapper } from './mappers/film.mapper';

type X = {
  title: string;
  openingCrawl: string;
  releaseDate: string;
  episodeId: number;
}

const starWarsFilmEquality = (b: X) => { 
  console.log('equal', ![4,5,6].includes(b.episodeId));
  return ![4,5,6].includes(b.episodeId);
}

@Component({
  selector: 'app-starwars-movie',
  imports: [],
  template: `
    <div>
      @if (filmResource.isLoading()) {
          <p>Loading Film...</p>
      } @else if (filmResource.error()) {
          <p>Error: {{ filmResource.error() }}</p>
      } @else {
        Testing.....
        @if (filmResource.hasValue()) {
          @let c = filmResource.value();
          <p><label>Title: </label>{{ c.title }}</p>
          <p><label>Episode: </label>{{ c.episodeId }}</p>
          <p>{{ ![4,5,6].includes(c.episodeId) }}</p>
          <p><label>Release Date: </label>{{ c.releaseDate }}</p>
          <p><label>Opening Crawl: </label>{{ c.openingCrawl }}</p>
          <hr />
        }
      }     
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarwarsMovieComponent {
  url = input('https://swapi.py4e.com/api/films/1/');

  filmResource = httpResource(
    () => this.url() ? this.url() : undefined,
  {
    parse: (raw) => toStarWarsFilmMapper(raw),
    equal: (a, b) => { 
      console.log('equal', a, b);
      return true;
      //return starWarsFilmEquality(b)
    },
    defaultValue: undefined,
  });
}
