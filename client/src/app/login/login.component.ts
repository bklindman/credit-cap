import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { confirmPasswordValidator } from '../validators/confirm-password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, 
        Validators.minLength(2), 
        Validators.pattern(/^[a-zA-Z]*$/)
      ]),
      username: new FormControl('',[Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[a-zA-Z]+[\w]*$/)
      ]),
      password: new FormControl('',[Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[\w!@#$]+$/)
      ]),
      confirmPass: new FormControl('',[Validators.required])
    }, {validators: confirmPasswordValidator});
  
  }

  onSubmitLogin(){
    this.authService.logIn({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe( res => {
      localStorage.setItem("user", JSON.stringify(res));
    });
  }

  onSubmitRegister(){
    this.authService.signUp({
      name: this.signupForm.value.name,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password
    }).subscribe( res => {
      localStorage.setItem("user", JSON.stringify(res));
    });
  }

  onLogout() {
    this.authService.logOut().subscribe(res => {
      this.authService.deleteLocalStorage();
    });
  }

  getUsernameLoginErrors(){
    return this.loginForm.get("username").hasError('required') ? 'Username is required' : '';
  }

  getPassLoginErrors() {
    return this.loginForm.get("password").hasError('required') ? 'Password is required' : '';
  }

  getUsernameSignupErrors(){
    return this.signupForm.get("username").hasError('required') ? 'Username is required' :
      this.signupForm.get("username").hasError('pattern') ? 'Username must start with a letter and contain only alphanumeric characters/underscores':
      this.signupForm.get("username").hasError('minlength') ? 'Username must be at least 5 characters' : '';
  }

  getNameErrors(){
    return this.signupForm.get("name").hasError('required') ? 'Name is required' :
      this.signupForm.get("name").hasError('pattern') ? 'Name can only contain letters' :
      this.signupForm.get("name").hasError('minlength') ? 'Name must be at least 2 characters' : '';
  }

  getPassSignupErrors(){
    return this.signupForm.get("password").hasError('required') ? 'Password is required' :
      this.signupForm.get("password").hasError('pattern') ? 'Password can only contain alphanumeric characters, underscores, and !@#$':
      this.signupForm.get("password").hasError('minlength') ? 'Password must be at least 8 characters' : '';
  }

  getConfirmErrors(){
    return this.signupForm.get('confirmPass').hasError('required') ? 'This field is required': ''; 
  }
  
  getMatchingErrors(){
    return this.signupForm.hasError('nonMatching') ? 'Passwords must match' : '';    
  }

}
