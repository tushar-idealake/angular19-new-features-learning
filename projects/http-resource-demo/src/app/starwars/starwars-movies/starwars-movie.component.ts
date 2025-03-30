import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toStarWarsFilmMapper } from './mappers/film.mapper';
import { StarWarsMovie } from './types/starwars-movie.type';

const starWarsFilmEquality = (b: StarWarsMovie) => { 
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
    parse: (raw) => toStarWarsFilmMapper(raw),
    equal: (_, b: StarWarsMovie) => starWarsFilmEquality(b),
    defaultValue: undefined,
  });
}
