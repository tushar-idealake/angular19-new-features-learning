import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toStarWarsCharacterMapper } from './mappers/character.mapper';
import { StarWarsCharacter } from './types/starwars-character.type';

const starWarsCharacterEquality = (b: StarWarsCharacter | undefined) => {
  const isJediEqual = typeof b !== 'undefined' && 
    !b.isSith && b.id > 50;
  const isSithEqual = typeof b !== 'undefined' && 
    b.isSith && !b.name.startsWith('Darth') 

  return typeof b === 'undefined' || isJediEqual ||
  isSithEqual;
}

@Component({
  selector: 'app-star-wars-card',
  imports: [RouterLink],
  templateUrl: './starwars-card.component.html',
  styleUrl: './starwars-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarsCardComponent {
  characterInput = input.required<{ id: number; isSith: boolean }>();

  showFighter = output<StarWarsCharacter>();

  id = computed(() => this.characterInput()?.id);
  isSith = computed(() => this.characterInput()?.isSith);

  requestUrl = computed(() => 
    this.characterInput() ? `https://swapi.py4e.com/api/people/${this.id()}` : undefined
  );

  characterResource = httpResource(this.requestUrl, 
  {
    parse: (raw) => 
      toStarWarsCharacterMapper(this.id(), this.isSith(),raw),
    equal: (_, b) => starWarsCharacterEquality(b),
    defaultValue: undefined
  });

  showCardClass = computed(() => {
    return this.characterResource.error() ||
      this.characterResource.hasValue();
  });
}
