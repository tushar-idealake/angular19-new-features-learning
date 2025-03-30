import { starWarsFilmSchema } from "../schemas/film.schema";
import { StarWarsFilm } from '../types/starwars-film.type';

export function toStarWarsFilmMapper(raw: unknown) {
  try {
    const parsed = starWarsFilmSchema.parse(raw)

    console.log('parsed 2');
    return {
      url: parsed.url,
      title: parsed.title,
      openingCrawl: parsed.opening_crawl,
      releaseDate: parsed.release_date,
      episodeId: parsed.episode_id,
    } as StarWarsFilm;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
