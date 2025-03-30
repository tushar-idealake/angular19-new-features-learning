import { starWarsCharacterSchema } from "../schemas/character.schema";

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
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
