import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { GeneralSettingsService } from './guest/general-settings.service';

@Injectable({ providedIn: 'root' })
export class SEOService {
    generalSettings: any;

    constructor(
        private title: Title,
        private meta: Meta,
        private generalSettingsService: GeneralSettingsService
    ) {
        this.updateSettinsg();
    }

    updateTitle(title: string) {
        const name = this.generalSettings ? ' | ' + this.generalSettings.name : '';
        this.title.setTitle(title + name);
    }

    updateOgUrl(url: string) {
        this.meta.updateTag({ name: 'og:url', content: url });
    }

    updateDescription(desc: string) {
        const name = this.generalSettings ? ' | ' + this.generalSettings.name : '';
        this.meta.updateTag({ name: 'description', content: desc + name });
    }
    updateKeyword(keywords: string) {
        const name = this.generalSettings ? ' | ' + this.generalSettings.name : '';
        this.meta.updateTag({ name: 'keywords', content: keywords + name });
    }

    private updateSettinsg() {
        this.generalSettingsService.settings().subscribe(res => {
            if (res) { this.generalSettings = res.generalSettings; }
        });
    }
}
