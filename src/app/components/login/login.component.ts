import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  validateEmail(email: string): boolean {
    const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email.match(validRegex) !== null;
  }

  submit(): void {
    const user = this.form.getRawValue();

    if (user.email === '' || user.password === '') {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else if (!this.validateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
    } else {
      this.http.post('http://localhost:5000/api/login', user, { withCredentials: true })
        .subscribe(
          (response: any) => {
            // Handle success response, if needed
            Swal.fire('Success', 'Login successful', 'success');
            this.router.navigate(['/']); // Redirect to home or any other route
          },
          (error) => {
            // Handle error response, if needed
            Swal.fire('Error', 'Login failed', 'error');
          }
        );
    }
  }
}
