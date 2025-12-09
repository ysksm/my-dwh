import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';

export interface TableData {
  columns: string[];
  rows: any[][];
}

export interface DashboardStats {
  total_records: number;
  unique_values: number;
  avg_value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  async executeQuery(query: string): Promise<TableData> {
    return await invoke<TableData>('execute_query', { query });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return await invoke<DashboardStats>('get_dashboard_stats');
  }
}
