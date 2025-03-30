import { z } from 'zod';

export const starWarsFilmSchema = z.object({
  title: z.string(),
  opening_crawl: z.string(),
  release_date: z.string(),
  episode_id: z.coerce.number(),
});
