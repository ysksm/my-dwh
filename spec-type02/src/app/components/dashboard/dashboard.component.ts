import { Component, OnInit } from '@angular/core';
import { DataService, DashboardStats } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  async loadDashboardData(): Promise<void> {
    this.loading = true;
    
    try {
      this.stats = await this.dataService.getDashboardStats();
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      this.loading = false;
    }
  }
}
