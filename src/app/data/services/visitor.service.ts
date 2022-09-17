import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { StorageService } from '../helpers/storage.service';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  serverUrl: string;
  private _locationData = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private storageService: StorageService
  ) {
    this.serverUrl = this.config.base_url();
  }

  get userLocation (): Observable<any> {
    return this._locationData.asObservable();
  }

  // grab visitor location data
  getUserLocation() {
    return this.http.get<any>(this.serverUrl + 'visitor_data/')
    .pipe(
      tap(resData => {
        if (resData) {
            this.locationControl(resData);
            this._locationData.next(resData);
        }
    }));
  }

  autoAccessLocation() {
    if (!this.storageService.hasKey('userLocation')) {
      this.updator();
      return of(true);
    }
    const userLocation = JSON.parse(
        this.storageService.getString('userLocation')
    );

    if (userLocation) {
      this._locationData.next(userLocation);
      return of(true);
    }

    this.updator();
    return of(true);
  }

  private locationControl(userLocation) {
    this.storageService.storeString(
        'userLocation', JSON.stringify(userLocation)
    );
    this._locationData.next(userLocation);
  }

  clearVisitor() {
    this._locationData.next(null);
    this.storageService.remove('userLocation');
  }

  // Initialize or update the visitor locations apis
  private updator() {
    this.getUserLocation().subscribe(res => {
      if (res) {
        return res;
      }
    });
  }

}
