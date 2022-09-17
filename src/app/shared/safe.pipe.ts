import {Pipe, PipeTransform } from '@angular/core';
import { 
    DomSanitizer,
    SafeHtml,
    SafeStyle,
    SafeScript,
    SafeUrl,
    SafeResourceUrl
} from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})

export class SafePipe implements PipeTransform {
    constructor(protected sanitizer: DomSanitizer) {}
    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        if (value) {
            return this.sanitizer.bypassSecurityTrustUrl(value);
        }
      }
}
