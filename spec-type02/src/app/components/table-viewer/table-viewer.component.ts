import { Component } from '@angular/core';
import { DataService, TableData } from '../../services/data.service';

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.css']
})
export class TableViewerComponent {
  tableData: TableData | null = null;
  query: string = 'SELECT * FROM sample_table LIMIT 100';
  loading: boolean = false;
  error: string = '';

  constructor(private dataService: DataService) { }

  async executeQuery(): Promise<void> {
    this.loading = true;
    this.error = '';
    
    try {
      this.tableData = await this.dataService.executeQuery(this.query);
    } catch (err) {
      this.error = String(err);
      console.error('Query error:', err);
    } finally {
      this.loading = false;
    }
  }
}
