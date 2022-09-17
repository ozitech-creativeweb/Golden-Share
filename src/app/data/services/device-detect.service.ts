import { Injectable, VERSION } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({ providedIn: 'root' })
export class DeviceDetectService {
    propsToShow = [
        'userAgent',
        'os',
        'browser',
        'device',
        'os_version',
        'browser_version'
    ];
    deviceInfo = null;
    version = VERSION.full;

    constructor(
        private deviceService: DeviceDetectorService
    ) {
        this.deviceInfo = deviceService.getDeviceInfo();
        // console.log(this.deviceInfo);
    }

    get isMobile() {
        // return true;
        return this.deviceService.isMobile();
    }

    get isTablet() {
        return this.deviceService.isTablet();
    }

    get isDesktop() {
        return this.deviceService.isDesktop();
    }
}
