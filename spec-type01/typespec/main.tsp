import "@typespec/http";
import "@typespec/rest";

using TypeSpec.Http;
using TypeSpec.Rest;

@service({
  title: "Data Analysis API",
  version: "0.1.0",
})
namespace DataAnalysisAPI;

@doc("Table data structure with columns and rows")
model TableData {
  @doc("Column names")
  columns: string[];
  
  @doc("Row data as JSON values")
  rows: unknown[][];
}

@doc("Dashboard statistics")
model DashboardStats {
  @doc("Total number of records")
  total_records: int64;
  
  @doc("Number of unique values")
  unique_values: int64;
  
  @doc("Average value")
  avg_value: float64;
}

@doc("Query request")
model QueryRequest {
  @doc("SQL query string")
  query: string;
}

@route("/api")
namespace API {
  @doc("Execute a SQL query and return table data")
  @post
  @route("/query")
  op executeQuery(@body request: QueryRequest): TableData | Error;
  
  @doc("Get dashboard statistics")
  @get
  @route("/dashboard/stats")
  op getDashboardStats(): DashboardStats | Error;
}

@doc("Error response")
@error
model Error {
  @doc("Error message")
  message: string;
}
