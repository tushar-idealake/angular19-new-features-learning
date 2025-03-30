import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toStarWarsFilmMapper } from './mappers/film.mapper';

type X = {
  url: string;
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
  templateUrl: './starwars-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarwarsMovieComponent {
  url = input.required<string>();

  requestUrl = computed(() => this.url() ? this.url() : undefined);

  filmResource = httpResource(this.requestUrl, {
    equal: () => {
      console.log('equal 2');
      return true;
    },
    parse: (raw) => toStarWarsFilmMapper(raw),
    defaultValue: undefined,
  });
}
