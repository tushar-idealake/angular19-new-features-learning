import { starWarsFilmSchema } from "../schemas/film.schema";
import { StarWarsMovie } from '../types/starwars-movie.type';

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
    } as StarWarsMovie;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
