import { Component, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../../../../data/services/guest/general-settings.service';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss']
})
export class AdminFooterComponent implements OnInit {
  generalSettings: any;
  currYear: number;

  constructor(
    private generalSettingsService: GeneralSettingsService,
  ) { }

  ngOnInit() {
    this.updateSettings();

    const date = new Date();
    this.currYear = date.getFullYear();
  }

  private updateSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      this.generalSettings = res;
    });
  }

}
