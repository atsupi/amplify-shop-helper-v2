# Amplify Shop Helper v2 プロジェクト概要

## 1. 概要

このリポジトリは、React + TypeScript + Vite で構成されたショッピング支援アプリです。AWS Amplify を利用し、認証・API・ストレージ・GraphQL を組み合わせた構成になっています。

主な目的は、以下のような EC 系の体験を簡易的に実現することです。

- 商品の登録
- 商品一覧の表示
- カート内商品管理
- 購入処理
- 購入履歴の表示
- 商品詳細の表示

## 2. 技術スタック

- フロントエンド: React 18, TypeScript, Vite
- UI: AWS Amplify UI, MUI, Bootstrap
- ルーティング: react-router-dom
- 認証: Amazon Cognito (Amplify Auth)
- API: AWS AppSync (GraphQL)
- ストレージ: Amazon S3 (Amplify Storage)
- バックエンド定義: Amplify CLI / backend config

package.json で確認できる依存関係の中心は以下です。

- react
- react-dom
- react-router-dom
- aws-amplify
- @aws-amplify/ui-react
- @mui/material
- bootstrap

## 3. ディレクトリ構造

```text
.
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── Utils.ts
│   ├── aws-exports.ts
│   ├── aws-exports.d.ts
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── HomeBar.tsx
│   │   ├── ShopItem.tsx
│   │   ├── CartItem.tsx
│   │   ├── DetailList.tsx
│   │   ├── PaginateItems.tsx
│   │   ├── PurchaseItem.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Register.tsx
│   │   ├── Shop.tsx
│   │   ├── Cart.tsx
│   │   ├── PurchaseList.tsx
│   │   ├── Detail.tsx
│   │   └── ...
│   └── graphql/
│       ├── queries.ts
│       ├── mutations.ts
│       ├── subscriptions.ts
│       └── schema.json
├── amplify/
│   ├── README.md
│   ├── cli.json
│   ├── team-provider-info.json
│   ├── backend/
│   │   ├── backend-config.json
│   │   ├── api/
│   │   ├── auth/
│   │   ├── hosting/
│   │   ├── storage/
│   │   └── types/
│   └── hooks/
└── .gitignore
```

## 4. 役割ごとの責務分担

### 4.1 src/

- `main.tsx`
  - アプリのエントリーポイント
  - AWS Amplify の設定を行い、App を描画する

- `App.tsx`
  - アプリ全体のルーティングと認証ラッパー
  - `Authenticator` で認証状態を管理
  - `BrowserRouter` と `Routes` で各画面を切り替える

- `Utils.ts`
  - GraphQL クエリや、データ取得処理をまとめるユーティリティ層
  - `listItems`, `listItemsInCart`, `fetchItem`, `updateItemStatus` などがある

- `types.ts`
  - アプリで使う型定義を集約

- `graphql/`
  - AppSync に対する GraphQL の定義やスキーマを管理
  - `queries.ts`, `mutations.ts`, `subscriptions.ts` が中心

- `components/`
  - 再利用可能な UI コンポーネント群
  - `ShopItem`, `CartItem`, `DetailList`, `PurchaseItem`, `PaginateItems`, `HomeBar` など

- `pages/`
  - 画面単位のコンポーネント群
  - 各画面の役割を分離している

### 4.2 amplify/

- AWS Amplify の生成物やバックエンド定義が配置されている
- 具体的には以下が含まれる
  - API
  - Auth
  - Storage
  - Hosting
  - backend-config

App を動かすうえで、バックエンドの定義が Amplify 側に存在しているため、GraphQL や認証の仕組みをフロントエンドから利用できる構成になっている。

## 5. 画面構成と役割

### 5.1 Home

- ファイル: `src/pages/Home.tsx`
- 役割: アプリの入口ページ
- 実装: シンプルな「Home Page」表示

### 5.2 Register

- ファイル: `src/pages/Register.tsx`
- 役割: 商品登録画面
- 主要機能:
  - 商品説明の入力
  - 価格の入力
  - 画像ファイルのアップロード
  - Storage への保存
  - GraphQL の `createPurchaseTable` で商品登録

### 5.3 Shop

- ファイル: `src/pages/Shop.tsx`
- 役割: 商品一覧画面
- 主要機能:
  - 商品一覧の取得と表示
  - 4 件単位のページング
  - カート内商品の件数表示
  - 商品をカートに入れる状態の管理
  - GraphQL subscription で更新検知

### 5.4 Cart

- ファイル: `src/pages/Cart.tsx`
- 役割: カート画面
- 主要機能:
  - カート内商品一覧の表示
  - 商品削除
  - 購入ボタンによる購入処理
  - `purchase` テーブルへ購入データ登録

### 5.5 PurchaseList

- ファイル: `src/pages/PurchaseList.tsx`
- 役割: 購入履歴一覧画面
- 主要機能:
  - 購入済みデータの取得
  - 履歴一覧の表示
  - 商品詳細ページへのリンク

### 5.6 Detail

- ファイル: `src/pages/Detail.tsx`
- 役割: 商品詳細画面
- 主要機能:
  - URL の `:id` を取得
  - `DetailList` に渡して詳細表示
  - 購入履歴から詳細へ遷移できる

## 6. 画面遷移の全体像

`App.tsx` にて `BrowserRouter` と `Routes` が定義されている。

```tsx
<Route index path="/" element={<Home />} />
<Route path="/register" element={<Register username={user?.username} />} />
<Route path="/shop" element={<Shop />} />
<Route path="/cart" element={<Cart username={user?.username} />} />
<Route path="/purchase" element={<PurchaseList />} />
<Route path="/detail" element={null}>
  <Route path=":id" element={<Detail />} />
</Route>
```

ナビゲーションは `HomeBar.tsx` に定義されており、リンクは以下の通りです。

- Home
- Register
- Shop
- Cart
- Purchase

画面遷移の流れとしては大きく次のような構造です。

```text
Home
 ├─ Register
 │    └─ 商品登録
 └─ Shop
      ├─ 商品一覧を見る
      ├─ カートに追加する
      └─ Cart
           ├─ 商品削除
           └─ Submit
                └─ PurchaseList
                     └─ Detail/:id
```

## 7. state と props の流れ

### 7.1 App からの props の受け渡し

`App.tsx` では `Authenticator` の `user` を取得し、以下のように画面に渡している。

```tsx
<Route
  path="/register"
  element={<Register username={user?.username} />}
/>

<Route
  path="/cart"
  element={<Cart username={user?.username} />}
/>
```

この `username` は、登録や購入時にデータに紐付けられる。

### 7.2 Register の state

Register はフォーム入力に対してローカル state を持つ。

- `presignedUrl`
- `dataName`
- `isUrlSet`
- `description`
- `price`

これらは、アップロード中の状態や入力値を保持するためのもの。

### 7.3 Shop の state

Shop は以下の状態を持つ。

- `itemList`: 商品一覧
- `numberOfItems`: カート内商品数

一覧取得後に `itemList` にデータが入り、`isInCart` の件数が `numberOfItems` に計算される。

### 7.4 Cart の state

Cart は以下の状態を持つ。

- `itemList`: カート内の商品一覧

商品削除や購入確定時に `setItemList` が呼ばれる。

### 7.5 PurchaseList の state

PurchaseList は以下の状態を持つ。

- `purchaseLists`: 購入履歴一覧

`listItems("purchase")` を呼び、購入済みデータを取得して表示する。

### 7.6 Detail の state

Detail は URL パラメータを使って state を組み立てる。

- `id`
- `isIdSet`

`useParams()` で `:id` を取得し、その ID を `DetailList` に渡して詳細画面を表示する。

## 8. バックエンドとデータの流れ

### 8.1 商品登録

`Register.tsx` で以下を行う。

1. 画像を `Storage.put` でアップロード
2. `getPresignedUrl` で表示用 URL を取得
3. `API.graphql(graphqlOperation(createPurchaseTable, { input: value }))` で item を保存

入力 value の例:

```ts
const value: NewItemValue = {
  PK: "item#" + itemId,
  SK: "#meta#" + itemId,
  type: "item",
  imagefile: dataName,
  price: parseInt(price),
  username: props.username || "unknown",
  description: description,
  isInCart: 0,
};
```

### 8.2 カートに入れる

`Shop.tsx` の UI 上では checkbox などによって `isInCart` を管理する。

### 8.3 購入処理

`Cart.tsx` の `onSubmit()` で以下を実行する。

1. `purchase` メタレコードを生成
2. `pitem` レコードを各商品ごとに作成
3. データ保存後に購入履歴として扱う

## 9. GraphQL の役割

`src/graphql` 配下の定義は、AppSync との通信を担う。

- `queries.ts`: 取得系のクエリ
- `mutations.ts`: 生成・更新系のミューテーション
- `subscriptions.ts`: イベント購読
- `schema.json`: GraphQL スキーマ定義

この構成により、アプリの UI 側で直接 DDB/DB を触るのではなく、Amplify の GraphQL でデータを管理している。

## 10. 設計上の特徴

- 画面ごとにローカル state を持つ設計
- App で認証情報を管理し、必要な画面に props で渡す
- フロントエンドから Amplify GraphQL と Storage を利用
- 画面遷移は `react-router-dom` ベース
- 構成は典型的な「React Frontend + Amplify Backend」パターン

## 11. 今後の改善案

### 11.1 state 管理の改善

現状では、画面ごとのローカル state が多く、取得済みデータも `useState + useEffect` で扱っている。

このリポジトリでは、データ取得系を SWR に置き換えることで以下が改善できる。

- データ取得ロジックの整理
- props の深い受け渡しの削減
- キャッシュと再検証の導入
- UI とサーバー状態の責務分離

具体的には以下の方向が適している。

- `useState` はフォーム入力や一時的な UI 状態に残す
- `useSWR` は商品一覧, 購入履歴, 商品詳細, 購入済みデータの取得に使う
- 認証ユーザー情報は `useUser()` のような SWR フックで取得する

### 11.2 props の見直し

現在の実装では `App -> Register / Cart` に `username` を渡しているが、これは SWR に置き換えやすい。React における「認証情報の横断渡し」を props に依存すべきかどうかは再検討の余地がある。

## 12. まとめ

このリポジトリの基本構造は、次のように整理できる。

- フロントエンド: React + TypeScript + Vite
- 画面: pages 配下に分離
- UI 部品: components 配下に分離
- API/DB 連携: GraphQL + AWS Amplify
- 認証: Amplify Auth
- 保存先: S3 と AppSync
- 画面遷移: react-router-dom

アプリ全体としては、商品管理から購入、詳細確認までを簡易実装した EC 系アプリを、Amplify 上で構築している形である。

---

このドキュメントは、コードの構造、画面役割、状態管理、データの流れを把握するための基礎資料として利用できる。
