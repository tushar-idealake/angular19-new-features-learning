import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { toStarWarsFilmMapper } from './mappers/film.mapper';
import { StarWarsMovie } from './types/starwars-movie.type';

const starWarsFilmEquality = (b: StarWarsMovie | undefined) => { 
  const isNotInTrilogy = typeof b !== 'undefined' && ![4, 5, 6].includes(b.episodeId);
  console.log('equal', isNotInTrilogy);
  return isNotInTrilogy;
}

@Component({
  selector: 'app-starwars-movie',
  templateUrl: './starwars-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarsMovieComponent {
  url = input.required<{ value: string }>();

  filmResource = httpResource(() => this.url() ? this.url().value : undefined, 
  {
      parse: (raw) => toStarWarsFilmMapper(raw),
      equal: (a, b) => starWarsFilmEquality(b),
      defaultValue: undefined,
    });
}
