import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private subject = new Subject<any>();

  get adminURL() {
    return 'administrator';
  }

  get isDemo() {
    return false;
  }

  private tempURL() {
    let url, hostname;
    hostname = window.location.hostname;
    hostname = hostname.replace('http://', '').replace('https://', '');
    const target = hostname.substring(0, 4);
    if (target === 'www.') {
      url = hostname;
    } else {
      url = 'www.' + hostname;
    }
    return url;
  }

  base_url() {
    return 'https://ourbank.online/backend/';
  }

  bankInfo() {
    return null;
  }

  clearnUrl(str) {
    if (str) {
      return str.replace(/[^a-zA-Z0-9 &+,._-]/g, '').split('&').join('and')
        .split(' + ').join('-').split('+ ').join('-').split('+').join('-')
        .split(', ').join('-').split(',').join('-')
        .split('  ').join('-').split(' - ').join('-').split(' ').join('-')
        .toLowerCase();
    }
  }

  getTitleCase(str) {
    return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase(); });
  }

  getRandomString(lengthCnt) {
    let result = '', i;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (i = lengthCnt; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  isRootAdmin(admin) {
    if (admin && admin.username === 'administrator') {
      return true;
    } else {
      return false;
    }
  }

}



// $2y$10$4fdyWgJZdIhBelKusvevFeje8PlSttLmMzYuSGch5RPug5Wj1Hck.

// 33,814


// 15, 208
