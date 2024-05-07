import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: [
  ]
})
export class EmployeeFormComponent {
  submitted: boolean = false;
  isLoggedIn: boolean = false; // Variable to track login status
  mode: 'login' | 'createAccount' = 'login'; // Variable to track current mode

  constructor(public service: EmployeeService, private toastr: ToastrService) { }


  onSubmit() {
    this.submitted = true;
    if (this.service.employeeForm.valid) {
      debugger;
      if (this.service.employeeForm.get('_id')?.value == '')
        this.service.postEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          this.toastr.success('Created successfully', 'Accounts Created')
          this.resetForm();
        })
      else
        this.service.putEmployee().subscribe(res => {
          this.service.fetchEmployeeList();
          this.toastr.info('Updated successfully', 'Accounts Edited')
          this.resetForm();
        })
    }
  }

  resetForm() {
    this.service.employeeForm.reset(new Employee());
    this.submitted = false;
  }

  /* showLoginForm() {
    const loginForm = document.getElementById("loginForm");
    const createForm = document.getElementById("createForm");
    if (loginForm && createForm) {
        loginForm.style.display = "block";
        createForm.style.display = "none";
    }
  }

  showCreateForm() {
    const loginForm = document.getElementById("loginForm");
    const createForm = document.getElementById("createForm");
    if (loginForm && createForm) {
        loginForm.style.display = "none";
        createForm.style.display = "block";
    }
  } */

  toggleMode(mode: 'login' | 'createAccount') {
    this.mode = mode;
    this.resetForm();
  }
  
  onLogin() {
    const username = this.service.employeeForm.get('username')?.value;
    const password = this.service.employeeForm.get('password')?.value;

    const employee = this.service.list.find(emp => emp.username === username && emp.password === password);

    if (employee) {
      // Authentication successful
      this.toastr.success('Login Successful', 'Login');
      this.resetForm(); // Reset form after successful login
      this.toggleMode('createAccount');
      this.isLoggedIn = true; // Set login status to true
      // Introduce a delay before displaying the toastr message
        setTimeout(() => {
          this.toastr.info('This is simple Crud Operation', 'No more');
      }, 1500);
    } else {
      // Authentication failed
      this.toastr.error('Invalid username or password', 'Login Error');
      this.toggleMode('login');
      this.isLoggedIn = false; // Set login status to false
    }
  }

}