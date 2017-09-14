import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CellsService {

  constructor(private http: Http) { }

  getAllCells() {
    return this.http.get('/api/cells')
      .map(res => res.json());
  }

  getCell(id) {
    return this.http.get('/api/cells/' + id)
      .map(res => res.json());
  }

  addCell(cell) {
    return this.http.put('/api/cells', cell)
      .map(res => res.json());
  }

  updateCell(cell) {
    return this.http.put('/api/cells/' + cell._id, cell)
      .map(res => res.json());
  }

  deleteCell(cell) {
    return this.http.delete('/api/cells/' + cell._id)
      .map(res => res.json());
  }
}
