import { Component, ViewChild } from '@angular/core';
import { Credentials } from 'app/services/auth/credentials.model';
import { AuthService } from 'app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { FormsModule }   from '@angular/forms';
import { PasswordField } from 'material-ui-password-field'

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('form')
  authForm;

  credentials:Credentials

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.credentials = {
      username: '',
      password: '',
    }
  }

  login(){
    // this.credentials.username = 'carabonita'
    // this.credentials.password = '12345678'
    this.authService.logIn(this.credentials)
    .then(()=>this.router.navigate(['']))
    .catch(()=>{
      //handle invalid credentials
    })
  }

}
