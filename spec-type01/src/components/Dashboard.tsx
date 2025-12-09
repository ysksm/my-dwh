import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./Dashboard.css";

interface DashboardStats {
  total_records: number;
  unique_values: number;
  avg_value: number;
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const result = await invoke<DashboardStats>("get_dashboard_stats");
      setStats(result);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard">読み込み中...</div>;
  }

  return (
    <div className="dashboard">
      <h2>ダッシュボード</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>総レコード数</h3>
          <p className="stat-value">{stats?.total_records || 0}</p>
        </div>
        <div className="stat-card">
          <h3>ユニーク値</h3>
          <p className="stat-value">{stats?.unique_values || 0}</p>
        </div>
        <div className="stat-card">
          <h3>平均値</h3>
          <p className="stat-value">{stats?.avg_value?.toFixed(2) || 0}</p>
        </div>
      </div>
      <div className="info-section">
        <h3>機能概要</h3>
        <ul>
          <li>✅ 基本的なテーブルの表示</li>
          <li>✅ テーブルの結合 (JOIN クエリ対応)</li>
          <li>✅ 複数のデータベース参照</li>
          <li>✅ Parquet ファイル読み込み</li>
          <li>✅ DuckDB による高速クエリ</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
