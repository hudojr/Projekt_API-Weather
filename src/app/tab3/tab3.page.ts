import { Component } from '@angular/core';

import { HistoryService } from '../api/history.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  person = { name: '', country: '' };
  name: string;
  storageName: string;
  country: string;

  constructor(
    private storage: HistoryService
  ) { }

  setStorage() {
    this.storage.setString('name', this.name);
    this.storage.setObject('person', {
      name: this.name,
      country: this.country
    });
  }

  getStorage() {
    this.storage.getString('name').then((data: any) => {
      if (data.value) {
        this.storageName = data.value;
      }
    });
    this.storage.getObject('person').then((data: any) => {
      this.person = data;
    });
  }

  clearStorage() {
    this.storage.clear();
  }

}