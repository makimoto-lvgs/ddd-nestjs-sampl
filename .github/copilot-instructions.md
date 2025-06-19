# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

このプロジェクトは以下の特徴を持つDDD（ドメイン駆動設計）+ ヘキサゴナルアーキテクチャのサンプルプロジェクトです：

## 技術スタック
- **NestJS**: フレームワーク
- **TypeORM**: ORM
- **GraphQL**: API
- **TypeScript**: 言語
- **MySQL**: データベース

## アーキテクチャ原則
- **ドメイン駆動設計（DDD）**: 値オブジェクト、エンティティ、ドメインサービス、リポジトリ、アプリケーションサービス
- **ヘキサゴナルアーキテクチャ**: ポート&アダプターパターン
- **レイヤー分離**: ドメイン層、アプリケーション層、インフラストラクチャ層、プレゼンテーション層

## ディレクトリ構成
```
src/
├── domain/           # ドメイン層
│   ├── entities/     # エンティティ
│   ├── value-objects/ # 値オブジェクト
│   ├── services/     # ドメインサービス
│   └── repositories/ # リポジトリインターフェース
├── application/      # アプリケーション層
│   ├── services/     # アプリケーションサービス
│   ├── factories/    # ファクトリ
│   └── dto/          # データ転送オブジェクト
├── infrastructure/   # インフラストラクチャ層
│   ├── repositories/ # リポジトリ実装
│   ├── database/     # データベース設定
│   └── external/     # 外部サービス
└── presentation/     # プレゼンテーション層
    ├── graphql/      # GraphQLリゾルバー
    └── dto/          #入出力DTO
```

## コーディング指針
1. **値オブジェクト**: 不変で等価性を持つ
2. **エンティティ**: 識別子を持ち、ライフサイクルがある
3. **ドメインサービス**: ドメインロジックでエンティティや値オブジェクトに属さないもの
4. **リポジトリ**: データアクセスの抽象化
5. **アプリケーションサービス**: ユースケースの実装
6. **依存性の方向**: 外側から内側（ドメインに依存）

## 参考書籍
「ドメイン駆動設計入門 ボトムアップでわかる! ドメイン駆動設計の基本」の概念を実装
