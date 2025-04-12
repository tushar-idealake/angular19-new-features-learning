import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { makeResourceRefStatus } from './http-resource-ref.util';

const PIKACHU_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png';

@Component({
  selector: 'app-resource-array-buffer',
  templateUrl: './httpresource-arraybuffer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourceArrayBufferComponent {
  imageUrl = PIKACHU_IMAGE_URL;
  imageSignal = signal('');

  imgResource = httpResource.arrayBuffer(
    () => this.imageSignal() ? { 
      url: this.imageSignal(),
      reportProgress: true,
      method: 'GET',
    } : undefined
  );

  resourceRefStatus = makeResourceRefStatus(this.imgResource);
  imgProgress = this.resourceRefStatus.progress;
  imgError = this.resourceRefStatus.error;
  value = this.resourceRefStatus.value;

  bufferedImage = computed(() => {
    return this.value() ?
      URL.createObjectURL(new Blob([this.value() as ArrayBuffer])) :
      undefined;
  });
}
