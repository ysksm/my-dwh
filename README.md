# my-dwh - Data Analysis Application Prototypes

このプロジェクトは、データ分析アプリケーションのアーキテクチャを決定するための複数のプロトタイプを作成するプロジェクトです。

## 概要

データ分析アプリは以下の機能を提供します：
- 基本的なテーブルの表示
- テーブルの結合
- 複数のデータベースを参照して集計
- ダッシュボードの作成

## 技術要件

- **データベース**: DuckDB
- **データ形式**: Parquet ファイル
- **バックエンド**: Rust + Tauri
- **API定義**: TypeSpec
- **フロントエンド**: React または Angular

## プロトタイプ

### spec-type01
- フロントエンド: React
- バックエンド: Rust + Tauri
- データベース: DuckDB + Parquet

### spec-type02
- フロントエンド: Angular
- バックエンド: Rust + Tauri
- データベース: DuckDB + Parquet

## 開発環境のセットアップ

各プロトタイプには独自のREADMEファイルがあり、セットアップ手順が記載されています。

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) を参照してください。