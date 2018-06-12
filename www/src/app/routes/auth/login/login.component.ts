import { Component, ViewChild } from '@angular/core';
import { Credentials } from 'app/services/auth/credentials.model';
import { AuthService } from 'app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppConfig } from 'app/config/app.config';
import { LoggerService } from 'app/core/logger.service';
import { FormsModule }   from '@angular/forms';
import { PasswordField } from 'material-ui-password-field'
import { PartidasService } from 'app/services/partidas/partidas.service';
import { PlayerService } from 'app/services/player/player.service';
import { Player } from 'app/routes/player/player';

const PLAYER_ID = 'PLAYER_ID';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('form')
  authForm;

  player: Player

  credentials:Credentials

  nameControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private playerService : PlayerService
    // private alertService: AlertService
  ) {
    this.credentials = {
      username: '',
      password: '',
    }
  }

  login(){
    this.authService.logIn(this.credentials)
    .then(()=> {this.router.navigate([''])
        this.playerService.getByUserName(this.credentials.username).
          then((player)=>{
            console.log("jugador :", player)
            this.player = player
            window.localStorage.setItem(PLAYER_ID, player.id.toString())
          } )
      })
    .catch(()=>{
      //handle invalid credentials
    })
  }

  getNameErrorMessage(){
    return this.nameControl.hasError('required') ? 'Ingresa el nombre de usuario' :
            '';
  }

  register(){

  }

}
