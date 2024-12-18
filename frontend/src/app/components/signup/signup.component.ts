import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { AppuserService } from '../../../services/appuser.service'; // Adjust path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Fixed property name
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(private appUserService: AppuserService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
      ]),
      role: new FormControl(null, Validators.required)
    });
  }

  setRole(role: string) {
    this.form.controls['role'].setValue(role); // Set the role when a button is clicked
  }

  onSubmit() {
    if (this.form.valid) {
      // Submit form data to backend
      this.appUserService.registerUser(this.form.value).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          alert('Registration successful! Redirecting to login.');
          this.router.navigate(['/login']); // Navigate to login on success
        },
        (error) => {
          console.error('Signup failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
    this.form.reset();
  }
}

/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  form !: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup ({
      // name : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      name : new FormControl(null, Validators.required),
      email : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required,
                                        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')]),
      role : new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    console.log(this.form.value)
    this.form.reset()
  }

}

/*import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$')
      ]),
      role: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const signupData = this.form.value;

      // Send data to the backend
      this.http.post('http://localhost:3000/api/signup', signupData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.form.reset(); // Reset the form after successful submission
        },
        error: (err) => {
          console.error('Signup failed', err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
*/
