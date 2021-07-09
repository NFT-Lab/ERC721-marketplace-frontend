import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WalletService } from '../../Services/WalletService/wallet.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IpfsService } from '../../Services/IpfsService/ipfs.service';

@Component({
  selector: 'app-forge-page',
  templateUrl: './forge-page.component.html',
  styleUrls: ['./forge-page.component.css'],
})
export class ForgePageComponent implements OnInit {
  walletAddress: string = '';
  categories: string[] = [];
  selectable: boolean = true;
  removable: boolean = true;
  categoryCtrl: FormControl = new FormControl();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  private allCategories: string[] = ['Image', 'Music', 'Video'];
  filteredCategories: Observable<string[]>;

  @ViewChild('categoryInput')
  categoryInput!: ElementRef<HTMLInputElement>;

  constructor(
    private walletService: WalletService,
    private ipfsService: IpfsService
  ) {
    walletService
      .getAccounts()
      .then((accounts) => {
        this.walletAddress = accounts ? accounts[0] : '';
      })
      .catch((error) => {
        console.log(error);
      });
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allCategories.slice()
      )
    );
  }

  ngOnInit(): void {}

  remove(category: string) {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.allCategories.includes(value)) {
      this.categories.push(value);
    }
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
  }

  mint() {
    console.log('Mint called');
  }
}
