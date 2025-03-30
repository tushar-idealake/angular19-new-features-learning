import { starWarsCharacterSchema } from "../schemas/character.schema";
import { StarWarsCharacter } from '../types/starwars-character.type';

export function toStarWarsCharacterMapper(id: number, isSith: boolean, fromData: unknown) {
  try {
    const parsed = starWarsCharacterSchema.parse(fromData)

    return {
      id,
      isSith,
      gender: parsed.gender,
      eyeColor: parsed.eye_color,
      hairColor: parsed.hair_color,
      skinColor: parsed.skin_color,
      name: parsed.name,
      films: parsed.films,
    } as StarWarsCharacter;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
