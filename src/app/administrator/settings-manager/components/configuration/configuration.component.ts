import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { ConfigurationManagerService } from '../../../../data/services/administrator/configuration-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  isAdding = false;
  isLoading: any;
  config: any;

  form = new FormGroup({
    activation_fee: new FormControl('', []),
    account_name: new FormControl('', []),
    account_number: new FormControl('', []),
    bank_name: new FormControl('', []),
    ConfigID: new FormControl('', []),

    activation_duration: new FormControl('', []),
    activation_grace_period: new FormControl('', []),
    activation_type: new FormControl('', []),
    allowed_pending: new FormControl('', []),
    auto_merge: new FormControl('', []),
    guider_added_bonus_perc: new FormControl('', []),
    guider_qualification: new FormControl('', []),
    invest_duration: new FormControl('', []),
    manager_added_bonus_perc: new FormControl('', []),
    manager_qualification: new FormControl('', []),
    max_invest_amount: new FormControl('', []),
    min_invest_amount: new FormControl('', []),
    referral_direct_reward_perc: new FormControl('', []),
    referral_indirect_reward_perc: new FormControl('', []),
    referral_level: new FormControl('', []),
    referral_reward_count: new FormControl('', []),
    roi_perc: new FormControl('', []),
    signup_bonus: new FormControl('', []),
    telegram_token: new FormControl('', []),
    donation_request_instructions: new FormControl('', []),
    merged_payee_instruction: new FormControl('', []),
    merged_payer_instruction: new FormControl('', []),
    withdrawal_request_instructions: new FormControl('', []),
    donation_type: new FormControl('', []),
    email_verify: new FormControl('', []),
    sms_verify: new FormControl('', []),
    sms_note: new FormControl('', []),
    sms_gateway_url: new FormControl('', []),
    activation_fee_receiver: new FormControl('', []),
    auction_time: new FormControl('', []),
    auction_time_end: new FormControl('', []),
  });

  constructor(
    private configService: ConfigService,
    private configurationManagerService: ConfigurationManagerService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.getConfig();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }
  
  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (!data) {
          this.routingService.replace(['/' + this.adminUrl + '/dashboard']);
        }
      }
    });
  }

  private getConfig() {
    this.configurationManagerService.getConfiguration().subscribe(res => {
      this.config = res;
      console.log(this.config);
      this.retrieveData(res);
    });
  }

  private retrieveData(res) {
    this.form.get('ConfigID').setValue(res.id);
    this.form.get('activation_fee').setValue(res.activation_fee);
    this.form.get('account_name').setValue(res.account_name);
    this.form.get('account_number').setValue(res.account_number);
    this.form.get('bank_name').setValue(res.bank_name);
    this.form.get('activation_duration').setValue(res.activation_duration);
    this.form.get('activation_grace_period').setValue(res.activation_grace_period);
    this.form.get('activation_type').setValue(res.activation_type);
    this.form.get('allowed_pending').setValue(res.allowed_pending);
    this.form.get('auto_merge').setValue(res.auto_merge);
    this.form.get('guider_added_bonus_perc').setValue(res.guider_added_bonus_perc);
    this.form.get('guider_qualification').setValue(res.guider_qualification);
    this.form.get('invest_duration').setValue(res.invest_duration);
    this.form.get('manager_added_bonus_perc').setValue(res.manager_added_bonus_perc);
    this.form.get('manager_qualification').setValue(res.manager_qualification);
    this.form.get('max_invest_amount').setValue(res.max_invest_amount);
    this.form.get('min_invest_amount').setValue(res.min_invest_amount);
    this.form.get('referral_direct_reward_perc').setValue(res.referral_direct_reward_perc);
    this.form.get('referral_indirect_reward_perc').setValue(res.referral_indirect_reward_perc);
    this.form.get('referral_level').setValue(res.referral_level);
    this.form.get('referral_reward_count').setValue(res.referral_reward_count);
    this.form.get('roi_perc').setValue(res.roi_perc);
    this.form.get('signup_bonus').setValue(res.signup_bonus);
    this.form.get('telegram_token').setValue(res.telegram_token);
    this.form.get('donation_request_instructions').setValue(res.donation_request_instructions);
    this.form.get('merged_payee_instruction').setValue(res.merged_payee_instruction);
    this.form.get('merged_payer_instruction').setValue(res.merged_payer_instruction);
    this.form.get('withdrawal_request_instructions').setValue(res.withdrawal_request_instructions);
    this.form.get('donation_type').setValue(res.donation_type);
    this.form.get('email_verify').setValue(res.email_verify);
    this.form.get('sms_verify').setValue(res.sms_verify);
    this.form.get('sms_note').setValue(res.sms_note);
    this.form.get('sms_gateway_url').setValue(res.sms_gateway_url);
    this.form.get('activation_fee_receiver').setValue(res.activation_fee_receiver);
    this.form.get('auction_time').setValue(res.auction_time);
    this.form.get('auction_time_end').setValue(res.auction_time_end);
  }

  submit() {
    console.log(this.form.value);
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.configurationManagerService.update_configuration(data).subscribe(res => {
      if (res) {
        alert('Updated successfully!');
      } else {
        alert('Oops! We could not add your request.');
      }
      this.isLoading = false;
    });
  }

}
