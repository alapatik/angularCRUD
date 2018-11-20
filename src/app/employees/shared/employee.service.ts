import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable()
export class EmployeeService {
selectedEmployee: Employee;
employees: Employee[];

  constructor(private http: Http) { }
  
  postEmployee(emp: Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type': 'application/JSON'});
    var requestOptions = new RequestOptions({method: RequestMethod.Post,headers: headerOptions});
    return this.http.post('http://localhost:58555/api/employee/PostEmployee', body, requestOptions).pipe(map(x => x.json()));     
   }
  putEmployee(id: number, emp: Employee){
      var body = JSON.stringify(emp);
      var headerOptions = new Headers({'Content-Type':'application/JSON'});
      var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});
      return this.http.put("http://localhost:58555/api/employee/" + id, body, requestOptions);
    }
  deleteEmployee(emp: Employee){
    return this.http.delete('http://localhost:58555/api/employee/' + emp.EmployeeID);
  }
  getEmployees(){
    this.http.get('http://localhost:58555/api/employee/')
      .pipe(map(data => {
        return data.json() as Employee[];
      }))
      .toPromise().then(x => {
        this.employees = x;
      });
  }

}
