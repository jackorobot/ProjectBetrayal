import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamsService } from '../teams.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageComponent } from './../message/message.component';
import { AddTeamComponent } from './../add-team/add-team.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {
  teams: any = [];

  constructor(private teamsService: TeamsService, private dialogService: DialogService) { }

  ngOnInit() {
    this.updateList();
  }

  updateList() {
    this.teamsService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });
  }
  addTeam() {
    const addTeamPopup = this.dialogService.addDialog(AddTeamComponent, {})
    .subscribe(answer => {
      if (answer.name !== '' && answer.color !== '') {
        this.teamsService.addTeam(answer).subscribe(resp => {
          if (resp.message) {
            // Popup with message
            const messagePopup = this.dialogService.addDialog(MessageComponent, {
              title: 'Message',
              message: resp.message
            }).subscribe();

            setTimeout( () => {
              messagePopup.unsubscribe();
            }, 10000);
          } else if (resp.errmsg) {
            // Popup with errmsg
            const messagePopup = this.dialogService.addDialog(MessageComponent, {
              title: resp.name,
              message: resp.errmsg
            }).subscribe();

            setTimeout( () => {
              messagePopup.unsubscribe();
            }, 10000);
          }
          // Update list
          this.updateList();
        });
      }
    });
  }

  updateTeam(team) {
    this.teamsService.updateTeam(team).subscribe(resp => {
      if (resp.message) {
        // Popup with message
        const messagePopup = this.dialogService.addDialog(MessageComponent, {
          title: 'Message',
          message: resp.message
        }).subscribe();

        setTimeout( () => {
          messagePopup.unsubscribe();
        }, 10000);
      } else if (resp.errmsg) {
        // Popup with errmsg
        const messagePopup = this.dialogService.addDialog(MessageComponent, {
          title: resp.name,
          message: resp.errmsg
        }).subscribe();

        setTimeout( () => {
          messagePopup.unsubscribe();
        }, 10000);
      }
    });
  }

  deleteTeam(team) {
    // Are you sure prompt
    const confirmPopup = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this team?'
    }).subscribe( (isConfirmed) => {
      if (isConfirmed) {
        // Confirmed is true, so do delete
        this.teamsService.deleteTeam(team).subscribe(resp => {
          if (resp.message) {
            // Popup with message
            const messagePopup = this.dialogService.addDialog(MessageComponent, {
              title: 'Message',
              message: resp.message
            }).subscribe();

            setTimeout( () => {
              messagePopup.unsubscribe();
            }, 10000);
          } else if (resp.errmsg) {
            // Popup with errmsg
            const messagePopup = this.dialogService.addDialog(MessageComponent, {
              title: resp.name,
              message: resp.errmsg
            }).subscribe();

            setTimeout( () => {
              messagePopup.unsubscribe();
            }, 10000);
          }
          // Update list
          this.updateList();
        }
      );
      } else {
        // Exit this function, do not delete
        return false;
      }
    });

    setTimeout( () => {
      confirmPopup.unsubscribe();
    }, 10000);
  }
}
