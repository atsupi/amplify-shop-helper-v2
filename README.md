# Amplify Shop Helper

AWS Amplify を活用した、商品登録から購入履歴の確認までを体験できるショッピング支援アプリです。React と TypeScript で構築したフロントエンドから、Cognito による認証、AppSync の GraphQL API、S3 ストレージを利用します。

## 主な機能

- **ユーザー認証** — AWS Cognito と Amplify UI によるサインアップ・サインイン
- **商品登録** — 商品説明・価格を入力し、商品画像を S3 にアップロード
- **商品一覧** — 商品を一覧表示し、4 件ずつページネーション
- **カート** — 商品の追加・削除と購入処理
- **購入履歴・詳細** — 購入データの一覧表示と商品詳細の確認

## 技術スタック

| 領域 | 技術 |
| --- | --- |
| フロントエンド | React 18、TypeScript、Vite |
| 画面・スタイリング | AWS Amplify UI、MUI、Bootstrap |
| ルーティング | React Router |
| 認証 | Amazon Cognito（AWS Amplify Auth） |
| API・データ | AWS AppSync（GraphQL）、Amplify API |
| 画像ストレージ | Amazon S3（Amplify Storage） |

## アーキテクチャ

```text
ブラウザー（React / TypeScript）
  ├─ Cognito        ユーザー認証
  ├─ AppSync        GraphQL による商品・カート・購入データの操作
  └─ Amazon S3      商品画像の保存
```

GraphQL API のスキーマは `amplify/backend/api/` にあり、商品や購入情報を `PurchaseTable` として管理します。フロントエンド側では GraphQL のクエリ・ミューテーション・サブスクリプションを `src/graphql/` にまとめています。

## ディレクトリ構成

```text
src/
├── components/   再利用可能な UI コンポーネント
├── graphql/      GraphQL クエリ・ミューテーション・サブスクリプション
├── hooks/        認証ユーザーなどの React hooks
└── pages/        Home、商品登録、ショップ、カート、購入履歴、詳細画面
amplify/
└── backend/      Auth、API、Storage などのバックエンド定義
```

## セットアップ

### 必要な環境

- Node.js と npm
- 利用可能な AWS Amplify バックエンド（Cognito、AppSync、S3）

### インストールと起動

```bash
npm install
npm run dev
```

Vite が表示するローカル URL（通常は `http://localhost:5173`）をブラウザーで開いてください。

アプリの AWS 接続設定は `src/aws-exports.ts` から読み込まれます。起動前に、設定が利用する AWS 環境の Cognito、AppSync、S3 を指していることを確認してください。別の環境を利用する場合は、その環境に対応する Amplify 設定を用意します。

## 開発コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | TypeScript の検査後、本番用ファイルを `dist/` に出力 |
| `npm run preview` | 本番ビルドをローカルでプレビュー |
| `npm run lint` | ESLint を実行 |

## 開発時の注意

- AWS の接続設定は環境ごとに管理し、公開リポジトリに認証情報や秘密情報を追加しないでください。
- `amplify/backend/` の認証ルールや API のアクセス権を確認してから、実データや本番環境で利用してください。
- 商品画像のアップロードには S3 へのアクセスが必要です。

## ライセンス

このプロジェクトは [MIT License](./LICENSE) のもとで公開されています。Copyright (c) 2026 atsupi.
