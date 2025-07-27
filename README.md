# Dotfiles

個人用の設定ファイル管理リポジトリ

## 含まれる設定

- **Zsh**: Oh My Zshを使用したシェル設定
- **Neovim**: Lua設定によるエディタ設定
- **Git**: グローバル設定とgitignore
- **Tmux**: ターミナルマルチプレクサ設定
- **SSH**: 接続設定の例

## インストール

```bash
git clone <repository-url> ~/.dotfiles
cd ~/.dotfiles
./install.sh
```

## 設定の更新

システム上で設定を変更した後、dotfilesリポジトリを更新する場合：

```bash
cd ~/.dotfiles
./update.sh
git add .
git commit -m "設定を更新"
git push
```

## ディレクトリ構造

```
.dotfiles/
├── zsh/
│   ├── .zshrc
│   └── .zprofile
├── nvim/
│   ├── init.lua
│   └── lua/
├── git/
│   ├── .gitconfig
│   └── gitignore_global
├── tmux/
│   └── .tmux.conf
├── ssh/
│   └── config.example
└── install.sh
```

## 注意事項

- 既存の設定ファイルは自動的にバックアップされます
- SSH設定はセキュリティ上の理由でexampleファイルとして保存されています
- インストール後はシェルの再起動が必要な場合があります