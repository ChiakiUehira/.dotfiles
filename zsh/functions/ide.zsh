#!/usr/bin/env zsh
# IDE window management

ide() {
    [ -z "$TMUX" ] && { echo "❌ Not in tmux session"; return 1; }
    
    local target=${1:-$(pwd)}
    local window_name="ide"
    local dir
    local nvim_cmd

    # ファイルかディレクトリかを判定
    if [ -f "$target" ]; then
        # ファイルの場合
        dir=$(dirname "$(realpath "$target")")
        nvim_cmd="nvim '$(realpath "$target")'"
    elif [ -d "$target" ]; then
        # ディレクトリの場合
        dir="$(realpath "$target")"
        nvim_cmd="nvim ."
    else
        echo "❌ '$target' not found"
        return 1
    fi
    
    # 既存IDEウィンドウのチェック
    if tmux list-windows -F "#{window_name}" | grep -q "^${window_name}$"; then
        tmux select-window -t "$window_name"
        # 既存ウィンドウで新しいファイルを開く場合
        if [ -f "$target" ]; then
          tmux send-keys -t 0 ":e $(realpath "$target")" C-m
        fi
        return 0
    fi

    # 新規作成
    tmux new-window -n "$window_name" -c "$dir"
    tmux split-window -h -p 30 -c "$dir"
    tmux split-window -v -p 50 -c "$dir"
    tmux select-pane -t 0
    tmux send-keys "$nvim_cmd && tmux kill-window" C-m
    tmux send-keys -t 1 "ls" C-m
}
