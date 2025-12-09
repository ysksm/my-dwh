import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import TableViewer from "./components/TableViewer";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<"tables" | "dashboard">("tables");

  return (
    <div className="container">
      <header>
        <h1>Data Analysis App - spec-type01</h1>
        <p>React + Tauri + DuckDB + Parquet</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === "tables" ? "active" : ""}
          onClick={() => setActiveTab("tables")}
        >
          テーブル表示
        </button>
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          ダッシュボード
        </button>
      </nav>

      <main>
        {activeTab === "tables" && <TableViewer />}
        {activeTab === "dashboard" && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
