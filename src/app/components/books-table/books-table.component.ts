import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule, MatNoDataRow } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BookExt } from 'app/models';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './books-table.component.html',
  styles: []
})
export class BooksTableComponent implements AfterViewInit {
  @ContentChild(MatNoDataRow) noDataRow!: MatNoDataRow;
  @ViewChild(MatTable) table!: MatTable<BookExt>;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<BookExt>([]);

  @Input() set data(value: BookExt[]) {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.sort = this.sort;
  }
  @Output() action: EventEmitter<{ type: string; id: string }> = new EventEmitter();
  #liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: Array<keyof BookExt> = ['id', 'author', 'name', 'publisher', 'year'];

  ngAfterViewInit(): void {
    this.table.setNoDataRow(this.noDataRow);
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.#liveAnnouncer.announce(`Отсортировано по ${sortState.direction === 'asc' ? 'возрастанию' : 'убыванию'}`);
    } else {
      this.#liveAnnouncer.announce('Сортировка очищена');
    }
  }
}
