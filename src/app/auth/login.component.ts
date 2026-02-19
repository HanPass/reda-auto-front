import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });

  submit(): void {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();
    this.auth.login(username!, password!).subscribe(() => this.router.navigate(['/dashboard']));
  }
}
