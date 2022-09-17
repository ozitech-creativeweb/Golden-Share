import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class MyDateService {

  private months = new Array(
    { id: 'January', name: 'January'},
    { id: 'Febuary', name: 'Febuary'},
    { id: 'March', name: 'March'},
    { id: 'April', name: 'April'},
    { id: 'May', name: 'May'},
    { id: 'June', name: 'June'},
    { id: 'July', name: 'July'},
    { id: 'August', name: 'August'},
    { id: 'September', name: 'September'},
    { id: 'October', name: 'October'},
    { id: 'November', name: 'November'},
    { id: 'December', name: 'December'}
  );

  getMonths(): any[] {
    return this.months;
  }

  getYears(start: number = 0, addTo: number = 0): any[] {
    const date = new Date();
    const year = date.getFullYear();
    const yearObj = [];
    let x;

    if (start > 0 && start < 1900) { start = 1970; }
    if (addTo > 50) { addTo = 50; }

    for (x = start; x <= year + addTo; x ++) {
      yearObj.push({ 'id' : x, 'name' : x});
    }

    return yearObj;
  }

}
