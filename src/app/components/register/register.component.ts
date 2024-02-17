import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2';
import { EmitterService } from '../../emmiter.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private EmitterService: EmitterService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ValidateEmail(email: string): boolean {
    const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    return validRegex.test(email);
  }
  
  submit(): void {
    const user = this.form.getRawValue();

    if (user.name === '' || user.email === '' || user.password === '') {
      Swal.fire('Error', 'Please enter all the fields', 'error');
    } else if (!this.ValidateEmail(user.email)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
    } else {
      this.http.post('http://localhost:5000/api/register', user, { withCredentials: true })
        .subscribe({
          next: (response: any) => {
            // Handle success response, if needed
            Swal.fire('Success', 'Registration successful', 'success');
            
            // Update authentication status after successful registration
            EmitterService.authEmitter.emit(true);
            
            this.router.navigate(['']);
          },
          error: (error) => {
            // Handle error response, if needed
            Swal.fire('Error', error.error.message, 'error');
          }
        });
    }
  }
}

