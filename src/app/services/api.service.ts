import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private crudService: CrudService) { }


  saveEmployee(payload: any): Observable<any> {
    return this.crudService.saveData(`/web/api/v1/employees`, payload);
  }

  updateEmployee(payload: any): Observable<any> {
    return this.crudService.updateData(`/web/api/v1/employees/update`, payload);
  }

  getEmployeeList(queryParams: string) {
    return this.crudService.getData(`/web/api/v1/employees?${queryParams}`);
  }

  deleteEmployee(employeeId: any): Observable<any> {
    return this.http.delete(
      `${environment.API_ENDPOINT}/web/api/v1/employees/delete/${employeeId}`
    );
  }

}
