import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastR: ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployees();
  }
  onShowEdit(emp: Employee){
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }
  onDelete(emp: Employee){
    this.employeeService.deleteEmployee(emp)
    .subscribe(data => {
      this.employeeService.getEmployees();
      this.toastR.success("Employee deleted successfully.", "Employee Register");
    });
  }
}
