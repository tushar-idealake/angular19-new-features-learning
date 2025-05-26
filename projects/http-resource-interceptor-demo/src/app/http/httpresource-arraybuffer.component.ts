import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { makeResourceRefStatus } from './http-resource-ref.util';

const PIKACHU_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg';

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
      body: { x: 'bad arraybuffer data' }
    } : undefined
  );

  resourceRefStatus = makeResourceRefStatus(this.imgResource);
  imgProgress = this.resourceRefStatus.progress;
  imgError = this.resourceRefStatus.error;


  bufferedImage = computed(() => {
    return this.imgResource.hasValue() ?
      URL.createObjectURL(new Blob([this.imgResource.value()])) :
      undefined;
  });
}
