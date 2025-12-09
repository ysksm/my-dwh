// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use duckdb::{Connection, Result as DuckDBResult};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Serialize, Deserialize)]
struct TableData {
    columns: Vec<String>,
    rows: Vec<Vec<serde_json::Value>>,
}

#[derive(Serialize, Deserialize)]
struct DashboardStats {
    total_records: u64,
    unique_values: u64,
    avg_value: f64,
}

struct AppState {
    db: Mutex<Connection>,
}

#[tauri::command]
fn execute_query(state: State<AppState>, query: String) -> Result<TableData, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    
    let mut stmt = conn.prepare(&query).map_err(|e| e.to_string())?;
    let column_count = stmt.column_count();
    
    let columns: Vec<String> = (0..column_count)
        .map(|i| stmt.column_name(i).unwrap_or("unknown").to_string())
        .collect();
    
    let rows_result = stmt
        .query_map([], |row| {
            let mut row_data = Vec::new();
            for i in 0..column_count {
                let value: serde_json::Value = row
                    .get::<_, Option<String>>(i)
                    .unwrap_or(None)
                    .map(|v| serde_json::Value::String(v))
                    .unwrap_or(serde_json::Value::Null);
                row_data.push(value);
            }
            Ok(row_data)
        })
        .map_err(|e| e.to_string())?;
    
    let mut rows = Vec::new();
    for row in rows_result {
        rows.push(row.map_err(|e| e.to_string())?);
    }
    
    Ok(TableData { columns, rows })
}

#[tauri::command]
fn get_dashboard_stats(state: State<AppState>) -> Result<DashboardStats, String> {
    let conn = state.db.lock().map_err(|e| e.to_string())?;
    
    // Sample statistics - in real app, query from actual data
    Ok(DashboardStats {
        total_records: 1000,
        unique_values: 250,
        avg_value: 42.5,
    })
}

fn initialize_database() -> DuckDBResult<Connection> {
    let conn = Connection::open_in_memory()?;
    
    // Create sample table
    conn.execute(
        "CREATE TABLE sample_table (
            id INTEGER,
            name VARCHAR,
            value DOUBLE,
            category VARCHAR
        )",
        [],
    )?;
    
    // Insert sample data
    conn.execute(
        "INSERT INTO sample_table VALUES 
            (1, 'Item A', 10.5, 'Category 1'),
            (2, 'Item B', 20.3, 'Category 2'),
            (3, 'Item C', 15.7, 'Category 1'),
            (4, 'Item D', 30.2, 'Category 3'),
            (5, 'Item E', 25.1, 'Category 2')",
        [],
    )?;
    
    Ok(conn)
}

fn main() {
    let db = initialize_database().expect("Failed to initialize database");
    
    tauri::Builder::default()
        .manage(AppState {
            db: Mutex::new(db),
        })
        .invoke_handler(tauri::generate_handler![execute_query, get_dashboard_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
