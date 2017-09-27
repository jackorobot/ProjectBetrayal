import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DialogService } from 'ng2-bootstrap-modal';
import { AuthenticationService } from './../_services/authentication.service';

import { MessageComponent } from './../../message/message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dialogService: DialogService) { }

  ngOnInit() {
    // Reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          // Auth succesful
          this.router.navigate(['/user']);
        },
        error => {
          const messagePopup = this.dialogService.addDialog(MessageComponent, {
            title: 'Error',
            message: 'Error during login, check your credentials'
          }).subscribe();

          setTimeout( () => {
            messagePopup.unsubscribe();
          }, 10000);

          this.loading = false;
        }
      );
  }

}
