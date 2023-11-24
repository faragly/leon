import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule, MatNoDataRow } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Author } from 'app/models';

@Component({
  selector: 'app-authors-table',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatSortModule],
  templateUrl: './authors-table.component.html',
  styles: []
})
export class AuthorsTableComponent implements AfterViewInit {
  @ContentChild(MatNoDataRow) noDataRow!: MatNoDataRow;
  @ViewChild(MatTable) table!: MatTable<Author>;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<Author>([]);

  @Input() set data(value: Author[]) {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.sort = this.sort;
  }
  @Output() action: EventEmitter<{ type: string; id: string }> = new EventEmitter();
  #liveAnnouncer = inject(LiveAnnouncer);
  displayedColumns: Array<keyof Author> = ['id', 'lastName', 'firstName', 'fatherName', 'dob'];

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
