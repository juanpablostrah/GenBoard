import { Component, ViewChild } from '@angular/core';
import { Credentials } from 'app/services/auth/credentials.model';
import { AuthService } from 'app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
// import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  login(){
      console.log("Form Submitted!");
  }

}
