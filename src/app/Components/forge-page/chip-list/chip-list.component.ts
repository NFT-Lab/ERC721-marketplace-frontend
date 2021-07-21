import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipListComponent),
      multi: true,
    },
  ],
})
export class ChipListComponent implements ControlValueAccessor {
  categories: string[] = [];
  selectable: boolean = true;
  removable: boolean = true;
  categoryCtrl: FormControl = new FormControl();
  separatorKeysCodes: number[] = [COMMA, ENTER];
  private allCategories: string[] = ['Image', 'Music', 'Video'];
  filteredCategories: Observable<string[]>;

  @ViewChild('categoryInput')
  categoryInput!: ElementRef<HTMLInputElement>;
  private callback: Function | undefined;

  constructor() {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allCategories.slice()
      )
    );
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.callback = fn;
  }
  registerOnTouched(fn: any): void {}

  remove(category: string) {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
      if (this.callback) this.callback();
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.allCategories.includes(value)) {
      this.categories.push(value);
      if (this.callback) this.callback();
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
}
