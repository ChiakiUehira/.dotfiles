#!/bin/bash

# Claude Code のステータスライン設定

input=$(cat)

# 基本情報の取得
current_dir=$(echo "$input" | jq -r '.workspace.current_dir')
model_name=$(echo "$input" | jq -r '.model.display_name')
context_used=$(echo "$input" | jq -r '.context_window.used_percentage // empty')

# カレントディレクトリの短縮表示
short_dir="${current_dir/#$HOME/~}"

# Gitブランチ情報の取得
git_branch=""
if git -C "$current_dir" rev-parse --git-dir > /dev/null 2>&1; then
  branch=$(git -C "$current_dir" --no-optional-locks rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [ -n "$branch" ]; then
    git_branch=" \033[36m($branch)\033[0m"
  fi
fi

# コンテキスト使用率の表示（色分け）
context_info=""
if [ -n "$context_used" ]; then
  if (( $(echo "$context_used >= 80" | bc -l 2>/dev/null || echo 0) )); then
    context_info=" \033[31m[Context: ${context_used}%]\033[0m"
  elif (( $(echo "$context_used >= 50" | bc -l 2>/dev/null || echo 0) )); then
    context_info=" \033[33m[Context: ${context_used}%]\033[0m"
  else
    context_info=" \033[32m[Context: ${context_used}%]\033[0m"
  fi
fi

# ステータスラインの出力
printf "\033[35m%s\033[0m \033[34m%s\033[0m%b%b" "$model_name" "$short_dir" "$git_branch" "$context_info"
