import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { HttpResourceArrayBufferComponent } from './http/httpresource-arraybuffer.component';
import { HttpResourceBlobComponent } from './http/httpresource-blob.component';
import { HttpResourceTextComponent } from './http/httpresource-text.component';

@Component({
  selector: 'app-root',
  imports: [
    HttpResourceBlobComponent, 
    HttpResourceArrayBufferComponent,
    HttpResourceTextComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/59876',
  ];
  name = 'httpResource sub-constructors';
  description = 'httpResource functions to query non-JSON data';
}