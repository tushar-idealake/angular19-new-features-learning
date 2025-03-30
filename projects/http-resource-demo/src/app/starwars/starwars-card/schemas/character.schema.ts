import { z } from 'zod';

export const starWarsCharacterSchema = z.object({
  name: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  films: z.array(z.string()),
  gender: z.string(),
});
