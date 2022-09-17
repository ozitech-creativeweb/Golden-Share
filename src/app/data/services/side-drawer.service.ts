import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideDrawerService {
    private sidenav: MatSidenav;
    private subject = new Subject<any>();
    
    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }

    public open() {
        return this.sidenav.open();
    }


    public close() {
        return this.sidenav.close();
    }

    public toggle(): void {
    this.sidenav.toggle();
   }

    setHeaderCtr(possition: string) {
        this.subject.next(possition);
    }

    get getHeaderCtr(): Observable<any> {
        return this.subject.asObservable();
    }
}
