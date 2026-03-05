#!/bin/bash
# Usage: tmux-status.sh set "ラベル" | tmux-status.sh clear
# tmux rename-window でウィンドウ名にサフィックスを付け外しする

[ -z "$TMUX" ] && exit 0
[ -z "$TMUX_PANE" ] && exit 0

ACTION="$1"
LABEL="$2"
T="$TMUX_PANE"

# このペインが属するウィンドウを特定
WINDOW=$(tmux display-message -t "$T" -p '#{window_id}')
NAME=$(tmux display-message -t "$T" -p '#W')

# 既存のステータスサフィックスを除去してクリーンな名前を得る
CLEAN=$(echo "$NAME" | sed 's/(作業中)$//; s/(待機中)$//')

if [ "$ACTION" = "set" ]; then
  NEW="${CLEAN}(${LABEL})"
  [ "$NAME" = "$NEW" ] && exit 0
  tmux rename-window -t "$WINDOW" "$NEW"

elif [ "$ACTION" = "clear" ]; then
  [ "$NAME" = "$CLEAN" ] && exit 0
  tmux rename-window -t "$WINDOW" "$CLEAN"
fi

exit 0
