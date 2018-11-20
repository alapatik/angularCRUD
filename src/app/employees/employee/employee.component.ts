import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private roastR: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm){
    if(form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: null,
      LastName: null,
      EmpCode: null,
      Office:null,
      Position: null     
    };
  }

  onSubmit(form: NgForm){
    if(form.value.EmployeeID == null || form.value.EmployeeID == 0){
    this.employeeService.postEmployee(form.value)
      .subscribe(data =>{
        this.resetForm(form);
        this.employeeService.getEmployees();
        this.roastR.success("Employee record added successfully.","Employee Register");
      });
    }
    else{
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployees();
          this.roastR.success("Empolyee record updated successfully.", "Employee Register");
        });
    }
  }
}
