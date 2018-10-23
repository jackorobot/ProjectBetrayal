import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-items',
  templateUrl: './tag-items.component.html',
  styleUrls: ['./tag-items.component.css']
})
export class TagItemsComponent {
  @Input() options;
  @Input() checked;

  optionSelected: string;

  constructor() { }

  getName(id) {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i]._id === id) {
        return this.options[i].name;
      }
    }
  }

  addOption() {
    // Add the selected option
    if (this.checked.indexOf(this.optionSelected) === -1) {
      this.checked.push(this.optionSelected);
    }
  }

  deleteChecked(item)  {
    // Delete the clicked item
    const index = this.checked.indexOf(item);
    if ( index !== -1) {
      this.checked.splice(index, 1);
    }
  }
}
