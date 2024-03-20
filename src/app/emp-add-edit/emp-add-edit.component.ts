import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  employeeCreateForm: FormGroup;
  isEditing: boolean = false;
  saveLoading: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private apiService: ApiService,
  ) {
    this.employeeCreateForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      department: ['', Validators.required],
      position: [''],
      salary: ['', Validators.required],
      employeeId: [''],
    });
  }

  ngOnInit(): void {
    this.employeeCreateForm.patchValue(this.data);
    if (this.data) {
      this.isEditing = true;
    }
  }

  onFormSubmit() {
    this._coreService.openSnackBar('Employee detail updated!');
    this._dialogRef.close(true);
    if (!this.isEditing) {
      this.apiService.saveEmployee(this.employeeCreateForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } else {
      this.apiService.updateEmployee(this.employeeCreateForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Employee Updated successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

}
