# DDD + ヘキサゴナルアーキテクチャ サンプルプロジェクト

このプロジェクトは「ドメイン駆動設計入門 ボトムアップでわかる! ドメイン駆動設計の基本」の概念をNestJS + TypeScript で実装したサンプルです。

## 🏗️ アーキテクチャ

### ドメイン駆動設計（DDD）
- **値オブジェクト**: 不変で等価性を持つオブジェクト（UserName, Email, UserId）
- **エンティティ**: 識別子を持ちライフサイクルがあるオブジェクト（User）
- **ドメインサービス**: エンティティや値オブジェクトに属さないドメインロジック（重複チェック）
- **リポジトリ**: データアクセスの抽象化
- **アプリケーションサービス**: ユースケースの実装

### ヘキサゴナルアーキテクチャ
- **ポート**: インターフェース（IUserRepository）
- **アダプター**: 具体的な実装（UserRepository）
- **レイヤー分離**: 依存性の方向を制御

## 🛠️ 技術スタック

- **NestJS**: Node.jsフレームワーク
- **TypeScript**: 型安全なJavaScript
- **GraphQL**: APIクエリ言語
- **TypeORM**: オブジェクトリレーショナルマッピング
- **MySQL**: データベース

## 📁 ディレクトリ構成

```
src/
├── domain/           # ドメイン層
│   ├── entities/     # エンティティ
│   ├── value-objects/# 値オブジェクト
│   ├── services/     # ドメインサービス
│   └── repositories/ # リポジトリインターフェース
├── application/      # アプリケーション層
│   ├── services/     # アプリケーションサービス
│   └── dto/          # データ転送オブジェクト
├── infrastructure/   # インフラストラクチャ層
│   ├── repositories/ # リポジトリ実装
│   └── database/     # データベース設定
└── presentation/     # プレゼンテーション層
    ├── graphql/      # GraphQLリゾルバー
    └── dto/          # 入出力DTO
```

## 🚀 セットアップ

### 前提条件
- Node.js (v18以上)
- MySQL (v8.0以上)

### インストール

```bash
# 依存関係のインストール
npm install

# データベースのセットアップ
# MySQLでddd_sampleデータベースを作成
mysql -u root -p -e "CREATE DATABASE ddd_sample;"
```

### 環境変数の設定

`.env`ファイルを編集してデータベース接続情報を設定してください。

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=ddd_sample
NODE_ENV=development
```

### アプリケーションの起動

```bash
# 開発モードで起動
npm run start:dev
```

## 📋 API仕様

GraphQL Playgroundで以下にアクセス: http://localhost:3000/graphql

### クエリ例

```graphql
# 全ユーザー取得
query {
  users {
    id
    name
    email
  }
}

# ユーザー作成
mutation {
  createUser(input: {
    name: "山田太郎"
    email: "yamada@example.com"
  })
}

# ユーザー更新
mutation {
  updateUser(id: "user-id", input: {
    name: "山田次郎"
  }) {
    id
    name
    email
  }
}
```

## 🧪 学習ポイント

### 値オブジェクト
- `UserName`, `Email`, `UserId`クラスで実装
- 不変性、等価性、バリデーションを含む

### エンティティ
- `User`クラスで実装
- 識別子（UserId）を持つ
- ファクトリメソッドでインスタンス化

### ドメインサービス
- `UserDuplicationCheckService`で重複チェックロジック
- エンティティに属さないドメインロジック

### リポジトリパターン
- インターフェース（ポート）と実装（アダプター）を分離
- テスタビリティの向上

## 📚 参考書籍

「ドメイン駆動設計入門 ボトムアップでわかる! ドメイン駆動設計の基本」（成瀬允宣 著）

このプロジェクトは書籍の内容を実際のコードで学習できるように設計されています。
