import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MessageComponent } from './../../message/message.component';
import { SimpleModalService } from 'ngx-simple-modal';

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
    private simpleModalService: SimpleModalService) { }

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
          const messagePopup = this.simpleModalService.addModal(MessageComponent, {
            title: 'Error',
            message: 'Error during login, check your credentials'
          }).subscribe();

          setTimeout(() => {
            messagePopup.unsubscribe();
          }, 10000);

          this.loading = false;
        }
      );
  }

}
