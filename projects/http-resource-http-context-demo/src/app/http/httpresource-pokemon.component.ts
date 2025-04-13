import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { BinaryResponseType } from './type/response-type.type';
import { makeResourceRefStatus } from './utils/binary-resource-ref.util';
import { makeHttpRequest } from './utils/http-request.util';
import { createURLFromBinary } from './utils/object-url.util';

const PIKACHU_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png';

@Component({
  selector: 'app-resource-pokemon',
  templateUrl: './httpresource-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourcePokemonComponent {
  imageUrl = PIKACHU_IMAGE_URL;
  imageSignal = signal('');

  responseType = input<BinaryResponseType>('');

  imgResourceRef = httpResource(
    () => this.imageSignal() ? makeHttpRequest(this.imageSignal(), this.responseType()) : undefined
  );

  resourceRefStatus = makeResourceRefStatus(this.imgResourceRef);
  imgError = this.resourceRefStatus.error;
  imgProgress = this.resourceRefStatus.progress;

  imgSrc = computed(() => {
    const value = this.imgResourceRef.hasValue() ? 
      this.imgResourceRef.value() : undefined;
    return createURLFromBinary(this.responseType(), value);
  });
}
