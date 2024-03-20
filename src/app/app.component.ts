import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  queryParams = {
    pageNumber: '0',
    pageSize: '25',
    searchValue: '',
  }
  recordsCount!: number;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  input: any;

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {

    const qpString = new URLSearchParams(this.queryParams).toString();
    this.apiService.getEmployeeList(qpString).subscribe(val => {
      this.dataSource = new MatTableDataSource(val.response.data);
      this.recordsCount = val.response.totalRecords;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(employeeId: any) {

    this.apiService.deleteEmployee(`employeeId=${employeeId}`).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }


  onSearchTermChange(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.queryParams = { ...this.queryParams, searchValue: filterValue };
    this.getEmployeeList();
  }

  onPageChange(eve: any) {
    this.queryParams = { ...this.queryParams, ...eve };
    this.getEmployeeList();
  }
}
