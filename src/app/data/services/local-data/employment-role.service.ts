import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class EmploymentRoleService {

  private Roles = new Array(
    { id: 'Intern', name: 'Intern'},
    { id: 'Individual Contribytor', name: 'Individual Contribytor'},
    { id: 'Lead', name: 'Lead'},
    { id: 'Manager', name: 'Manager'},
    { id: 'Executive', name: 'Executive'},
    { id: 'Owner', name: 'Owner'}
  );

  getRoles(): any[] {
    return this.Roles;
  }
}
