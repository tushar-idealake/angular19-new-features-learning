import { ChangeDetectionStrategy, Component, signal, VERSION } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressForm } from './address-form.component';
import { AddressList } from './address-list.component';
import { Address } from './address.type';
import { addresses } from './data';

@Component({
  selector: 'app-root',
  imports: [AddressList, FormsModule, AddressForm],
  template: `
    <h1>Version - {{ version }} - {{ description }}</h1>
    <div class="container">
      <app-address-list [addresses]="addresses" 
        (deleteItem)="removeAddress($event)" 
        (saveItem)="saveItem($event)" />
      <hr />
      <app-address-form [item]="addressInput()" (addAddress)="addAddress($event)" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  description = 'Tracking expressions requiring temporary variables';

  addresses = addresses;

  private isUndefined(val: string | undefined) {
    return typeof val === 'undefined';
  }

  removeAddress(address: Address) {
    this.addresses = this.addresses.filter((a) => {
      const isSameZip = (this.isUndefined(address.zip) && this.isUndefined(a.zip))
        || (!this.isUndefined(address.zip) && !this.isUndefined(a.zip) && 
          address.zip === a.zip);
      const isSamePostal = (this.isUndefined(address.postalCode) && this.isUndefined(a.postalCode))
        || (!this.isUndefined(address.postalCode) && !this.isUndefined(a.postalCode)&& 
          address.postalCode === a.postalCode);
      
      return !isSameZip || !isSamePostal || 
        a.line1 !== address.line1 || 
        a.city !== address.city || 
        a.country !== address.country;
    });
  }

  addressInput = signal<Address>({
    line1: '',
    city: '',
    country: ''
  });

  addAddress(address: Address) {
    this.addresses = [ ...this.addresses, address ];

    this.addressInput.set({
      line1: '',
      city: '',
      country: ''
    });
  }

  saveItem({ item, index }: { item: Address; index: number }) {
    this.addresses = this.addresses.map((a, i) => i === index ? item : a);
  }
}
