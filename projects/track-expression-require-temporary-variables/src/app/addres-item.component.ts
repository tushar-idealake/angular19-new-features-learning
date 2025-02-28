import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Address } from './address.type';
import { AddressForm } from './address-form.component';

@Component({
  selector: 'app-address-item',
  imports: [AddressForm],
  template: `    
    <div class="address">
      @if (!isEdit) {
        <p>Address: </p>
        <p>{{ address().line1 }}</p>
        <p>{{ address().city }}</p>
        <p>{{ zipOrPostalCode() }}</p>
        <div>
          <button (click)="isEdit = false; deleteItem.emit(address())">Delete</button>
          <button (click)="enableEditMode()">Edit</button>
        </div>
      } @else {
        <app-address-form [item]="clonedItem()" (addAddress)="addAddress($event)">
          <ng-container header>Edit Address</ng-container>
          <ng-container submit-button>Save</ng-container>
          <ng-container actions>
            <button (click)="isEdit=false">Cancel</button>
          </ng-container>
        </app-address-form>
      }
    </div>
    {{ printItem() }}
   `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressItem {
  address = input.required<Address>();
  
  index = input.required<number>();

  isEdit = false;

  zipOrPostalCode = computed(() => {
    const a = this.address();
    if (a.zip || a.postalCode) {
      return `${a.zip || a.postalCode}, ${a.country}`;
    }
    return a.country;
  })

  deleteItem = output<Address>();
  saveItem = output<{ item: Address; index: number }>();

  clonedItem = signal<Address>({ line1: '', city: '', country: '' });

  enableEditMode() {
    this.isEdit = true;
    this.clonedItem.set({ ...this.address() });
  }

  addAddress(item: Address) {
    console.log('AddressItem -> AddAddress called');
    this.saveItem.emit({
      item,
      index: this.index()
    });
    this.isEdit = false;
  }

  printItem() {
    console.log(this.address(), this.clonedItem());
  }
}
