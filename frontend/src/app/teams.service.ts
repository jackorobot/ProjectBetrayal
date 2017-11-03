import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TeamsService {

  constructor(private http: Http) { }

  getAllTeams() {
    return this.http.get('/api/teams')
      .map(res => res.json());
  }

  getTeam(id) {
    return this.http.get('/api/teams/' + id)
      .map(res => res.json());
  }
  addTeam(team) {
    return this.http.put('/api/teams', team)
      .map(res => res.json());
  }
  updateTeam(team) {
    return this.http.put('/api/teams/' + team._id, team)
      .map(res => res.json());
  }

  deleteTeam(team) {
    return this.http.delete('/api/teams/' + team._id)
      .map(res => res.json());
  }
}
