import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styles: [
    ` @media screen and (max-width: 300px) {
        .sizeInputText {
          overflow: auto;
        }
        label {
	        display: none !important;
        }
        input::placeholder {
          font-size: 0.9em;
        }
      }
      @media screen and (min-width: 301px) {
        input::placeholder {
          color: transparent;
        }
      }
    `
  ]
})
export class SearchFilterComponent implements OnInit {

  @Input() lstOrdOriginal!: string[];
  @Input() dt!: Table;
  @Output() filteredListEvent = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  applyFilterCustom(filterValue: string) {
    if (filterValue) {
      const lstOrdF = this.lstOrdOriginal.filter(order => order.includes(filterValue));
      this.filteredListEvent.emit(lstOrdF);
    } else {
      this.filteredListEvent.emit(this.lstOrdOriginal);
    }
    this.dt.reset();
  }
}
