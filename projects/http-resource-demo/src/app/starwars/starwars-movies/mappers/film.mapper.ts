import { starWarsFilmSchema } from "../schemas/film.schema";

export function toStarWarsFilmMapper(raw: unknown) {
  const parsed = starWarsFilmSchema.parse(raw)

  return {
    title: parsed.title,
    openingCrawl: parsed.opening_crawl,
    releaseDate: parsed.release_date,
    episodeId: parsed.episode_id,
  };
}
