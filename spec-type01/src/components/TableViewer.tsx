import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./TableViewer.css";

interface TableData {
  columns: string[];
  rows: any[][];
}

function TableViewer() {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [query, setQuery] = useState<string>("SELECT * FROM sample_table LIMIT 100");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const executeQuery = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await invoke<TableData>("execute_query", { query });
      setTableData(result);
    } catch (err) {
      setError(err as string);
      console.error("Query error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-viewer">
      <div className="query-section">
        <h2>SQL クエリ実行</h2>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SELECT * FROM table_name"
          rows={5}
        />
        <button onClick={executeQuery} disabled={loading}>
          {loading ? "実行中..." : "クエリを実行"}
        </button>
      </div>

      {error && (
        <div className="error">
          <strong>エラー:</strong> {error}
        </div>
      )}

      {tableData && (
        <div className="results">
          <h3>結果 ({tableData.rows.length} 行)</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {tableData.columns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx}>{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableViewer;
