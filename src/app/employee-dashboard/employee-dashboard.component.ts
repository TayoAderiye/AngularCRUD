
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Employee } from 'employee.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  employees: Employee[] = []
  formValue!: FormGroup
  employeeModelObj: Employee = new Employee()
  showAdd!: boolean
  showUpdate!: boolean



  constructor(private formbuilder: FormBuilder,
              private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      gender: ['', Validators.required]


    })
    this.getAllEmployee()

  }
  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd = true
    this.showUpdate = false
  }





  createEmployee(){
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.status = this.formValue.value.status
    this.employeeModelObj.gender = this.formValue.value.gender

    this.api.add(this.employeeModelObj).subscribe(res=>{
      console.log(res)
      alert('Employee Added Succesfully')
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
    },err=>{
      alert("Something went wrong")
    })
  }
  getAllEmployee(){
    this.api.getAll().subscribe((data: Employee[])=> {
      (this.employees = data)
    })
  }

  deleteEmployee(employee: any){
    this.api.delete(employee.id).subscribe(res=> {
      alert("Employee Deleted")
      this.getAllEmployee()
    })
  }
  onEdit(employee: any){
    this.showAdd = false
    this.showUpdate = true
    this.employeeModelObj.id = employee.id
    this.formValue.controls['firstName'].setValue(employee.firstName)
    this.formValue.controls['lastName'].setValue(employee.lastName)
    this.formValue.controls['email'].setValue(employee.email)
    this.formValue.controls['status'].setValue(employee.status)
    this.formValue.controls['gender'].setValue(employee.gender)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName
    this.employeeModelObj.lastName = this.formValue.value.lastName
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.status = this.formValue.value.status
    this.employeeModelObj.gender = this.formValue.value.gender

    this.api.update(this.employeeModelObj, this.employeeModelObj.id).subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
    })
  }


}
