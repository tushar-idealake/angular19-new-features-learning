import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { makeResourceRefStatus } from './utils/binary-resource-ref.util';
import { HttpContext, httpResource } from '@angular/common/http';
import { RESPONSE_TYPE } from './http-context-token.constant';
import { BinaryResponseType } from './type/response-type.type';
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

  responseType = input<BinaryResponseType>('arraybuffer');

  imgResourceRef = httpResource(
    () => this.imageSignal() ? { 
      url: this.imageSignal(),
      reportProgress: true,
      method: 'GET',
      context: new HttpContext().set(RESPONSE_TYPE, this.responseType()),
    } : undefined
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
