import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ActionsService {

  constructor(private http: Http) { }

  getAllActions() {
    return this.http.get('/api/actions')
      .map(res => res.json());
  }

  getAction(id) {
    return this.http.get('/api/actions/' + id)
      .map(res => res.json());
  }
  addAction(action) {
    return this.http.put('/api/actions', action)
      .map(res => res.json());
  }
  updateAction(action) {
    return this.http.put('/api/actions/' + action._id, action)
      .map(res => res.json());
  }

  deleteAction(action) {
    return this.http.delete('/api/actions/' + action._id)
      .map(res => res.json());
  }
}
