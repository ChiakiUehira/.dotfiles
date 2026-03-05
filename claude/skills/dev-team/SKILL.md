---
name: dev-team
description: 開発タスクに最適なエージェントチームを自動構成するスキル。リーダーがタスクを分析・分割し、リサーチャー・開発者・テスター・レビュアーを必要に応じて起動して並列開発を行う。「開発して」「実装して」「チームで作業して」「この機能を作って」など、コーディングを伴う作業全般で使用する。ほとんどの開発タスクでこのスキルを使うことが推奨される。
---

# Dev Team

開発タスクに最適なエージェントチームを自動構成し、リーダー主導で作業を進める。

## 役割一覧

| 役割 | subagent_type | 責務 |
|------|---------------|------|
| leader | - | 自分自身。タスク分析・分割・割り当て・進捗管理 |
| researcher | Explore | コードベース調査・設計方針の提案 |
| developer | general-purpose | 実装・コード変更 |
| tester | general-purpose | テスト実行・テストコード作成 |
| reviewer | general-purpose | コードレビュー・品質確認 |

## ワークフロー

### 1. タスク分析

ユーザーのリクエストを分析し、以下を判断する：

- タスクの複雑さ（小・中・大）
- 必要な役割
- 並列化可能なサブタスク

### 2. チーム構成の決定

タスク規模に応じて必要なメンバーだけを起動する。全員を常に起動する必要はない。

**小規模タスク**（単一ファイルの修正、簡単なバグ修正など）:
- developer × 1
- reviewer × 1

**中規模タスク**（複数ファイルにまたがる機能追加など）:
- researcher × 1
- developer × 1〜2
- reviewer × 1

**大規模タスク**（新機能の設計から実装、アーキテクチャ変更など）:
- researcher × 1
- developer × 2〜3
- tester × 1
- reviewer × 1

### 3. チームの作成

TeamCreateでチームを作成する：

```
TeamCreate:
  team_name: "dev-{タスクの短い識別名}"
  description: "{タスクの概要}"
```

### 4. タスクの作成と依存関係の設定

TaskCreateでサブタスクを作成し、TaskUpdateで依存関係（blocks/blockedBy）を設定する。

典型的な依存関係：

```
調査タスク（researcher）
  ↓ blocks
実装タスク（developer）
  ↓ blocks
テストタスク（tester）
  ↓ blocks
レビュータスク（reviewer）
```

並列化できるタスクは依存関係なしで同時に作成する。

### 5. メンバーの起動

Taskツールでチームメンバーを起動する。各メンバーには以下を伝える：

- チーム名（team_name パラメータ）
- 担当タスクの概要
- 作業対象のファイルやディレクトリ
- 守るべき規約やパターン

起動例：

```
Task:
  subagent_type: general-purpose
  team_name: "dev-auth"
  name: "developer-1"
  prompt: |
    あなたはdev-authチームのdeveloper-1です。
    チーム設定: ~/.claude/teams/dev-auth/config.json

    担当タスク: ログイン機能の実装
    対象ファイル: src/auth/login.ts

    作業手順:
    1. TaskListで自分に割り当てられたタスクを確認
    2. TaskUpdateでタスクをin_progressにする
    3. 実装を行う
    4. 完了したらTaskUpdateでcompletedにする
    5. TaskListで次のタスクがあるか確認
```

### 6. 進捗管理

- TaskListで全体の進捗を監視する
- メンバーからのメッセージ（自動配信）に応じて判断する
- ブロッカーがあればSendMessageで指示を出す
- タスク完了時に次のフェーズのタスクをアンブロックする

### 7. レビューフェーズ

実装とテストが完了したら、レビュアーを起動する。レビュアーには：

- 変更されたファイルの一覧
- 変更の目的と背景
- 確認すべきポイント

を伝える。レビュー指摘があればdeveloperにSendMessageで修正を依頼する。

### 8. 完了とクリーンアップ

全タスク完了後：

1. ユーザーに結果を報告する
2. 全メンバーにshutdown_requestを送る
3. 全メンバーがシャットダウンしたらTeamDeleteでクリーンアップ

## チームメンバーへの共通指示テンプレート

メンバー起動時のpromptに含めるべき共通指示：

```
あなたは{team_name}チームの{role_name}です。
チーム設定: ~/.claude/teams/{team_name}/config.json

## あなたの役割
{role_description}

## 作業ルール
- TaskListで自分のタスクを確認してから作業開始する
- タスク開始時にTaskUpdateでin_progressにする
- 完了したらTaskUpdateでcompletedにする
- 問題が発生したらリーダーにSendMessageで報告する
- 他のメンバーに質問がある場合はSendMessageで直接連絡してよい
```

## 注意事項

- 開発者が同じファイルを同時に編集するコンフリクトを避ける。タスク分割時にファイルの担当を明確にする
- researcherはExploreエージェント（読み取り専用）なので、実装タスクは割り当てない
- チームメンバーが多いほどコストがかかる。必要最小限のメンバーで構成する
- メンバーのアイドル通知は正常動作。すぐに反応する必要はない
