import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Data Analysis App - spec-type02';
  activeTab: 'tables' | 'dashboard' = 'tables';

  setActiveTab(tab: 'tables' | 'dashboard'): void {
    this.activeTab = tab;
  }
}
