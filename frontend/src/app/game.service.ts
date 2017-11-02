import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  constructor(private http: Http) { }

  startGame(time) {
    return this.http.put('http://localhost:3000/api/game/start', {interval: time})
      .map(res => res.json());
  }

  setRoundTime(time) {
    return this.http.put('http://localhost:3000/api/game/setroundtime', {interval: time})
      .map(res => res.json());
  }

  getGameState() {
    return this.http.get('http://localhost:3000/api/game/getstate')
      .map(res => res.json());
  }

  stopGame() {
    return this.http.get('http://localhost:3000/api/game/stop')
      .map(res => res.json());
  }
}
