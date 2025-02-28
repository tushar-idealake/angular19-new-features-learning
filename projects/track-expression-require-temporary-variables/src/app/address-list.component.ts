import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Address } from './address.type';
import { AddressItem } from './addres-item.component';

@Component({
  selector: 'app-address-list',
  imports: [AddressItem],
  template: `
    @for (address of addresses(); track address.zip || address.postalCode || address.line1; let idx = $index) {
      <app-address-item [address]="address" [index]="idx" (deleteItem)="deleteItem.emit($event)"
        (saveItem)="saveItem.emit($event)" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressList {
  addresses = input<Address[]>([]);

  deleteItem = output<Address>();

  saveItem = output<{ item: Address; index: number }>();
}
