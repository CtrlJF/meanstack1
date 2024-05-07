import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styles: [
  ]
})
export class EmployeesComponent implements OnInit {

  constructor(public service: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.fetchEmployeeList();
  }

  populateForm(selectedRecord: Employee) {
    // Replace the password with asterisks
    //const hiddenPassword = '*'.repeat(selectedRecord.password.length);

    this.service.employeeForm.setValue({
      _id: selectedRecord._id,
      username: selectedRecord.username,
      password:  selectedRecord.password, // Use hiddenPassword here
      gender: selectedRecord.gender,
      age: selectedRecord.age,
    })
  }

  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(_id).subscribe(res => {
        this.service.fetchEmployeeList();
        this.toastr.error('Deleted successfully', 'Accounts Deleted')
      })
    }
  }

}
