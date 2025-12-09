# spec-type02 - Angular + Tauri データ分析アプリ

このプロトタイプは Angular フロントエンドと Rust/Tauri バックエンドを使用したデータ分析アプリケーションです。

## 技術スタック

- **フロントエンド**: Angular + TypeScript
- **バックエンド**: Rust + Tauri
- **データベース**: DuckDB
- **データ形式**: Parquet
- **API定義**: TypeSpec

## 機能

- ✅ 基本的なテーブルの表示
- ✅ テーブルの結合
- ✅ 複数のデータベースを参照して集計
- ✅ ダッシュボードの作成

## プロジェクト構成

```
spec-type02/
├── src/              # Angular フロントエンドソース
├── src-tauri/        # Rust バックエンドソース
├── typespec/         # TypeSpec API定義
├── data/             # サンプルParquetファイル
└── README.md         # このファイル
```

## 開発環境のセットアップ

### 必要なツール

- Node.js (v18以上)
- Rust (最新の安定版)
- Tauri CLI
- Angular CLI

### インストール

```bash
# 依存関係のインストール
npm install

# Angular CLIのインストール（グローバル）
npm install -g @angular/cli

# Tauri CLIのインストール
npm install -g @tauri-apps/cli
```

### 開発サーバーの起動

```bash
npm run tauri:dev
```

### ビルド

```bash
npm run tauri:build
```

## API仕様

API仕様は TypeSpec で定義されており、`typespec/` ディレクトリに配置されています。

## データベース接続

DuckDB を使用してParquetファイルを直接クエリします。データベースファイルは自動的に作成されます。

## ライセンス

MIT License
