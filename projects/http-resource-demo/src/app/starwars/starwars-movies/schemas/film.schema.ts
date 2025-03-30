import { z } from 'zod';

export const starWarsFilmSchema = z.object({
  url: z.string(),
  title: z.string(),
  opening_crawl: z.string(),
  release_date: z.string(),
  episode_id: z.number(),
});
