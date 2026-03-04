#!/usr/bin/env zsh
# IDE window management

ide() {
    [ -z "$TMUX" ] && { echo "❌ Not in tmux session"; return 1; }

    local target=${1:-$(pwd)}
    local dir
    local nvim_cmd

    # ファイルかディレクトリかを判定
    if [ -f "$target" ]; then
        dir=$(dirname "$(realpath "$target")")
        nvim_cmd="nvim '$(realpath "$target")'"
    elif [ -d "$target" ]; then
        dir="$(realpath "$target")"
        nvim_cmd="nvim ."
    else
        echo "❌ '$target' not found"
        return 1
    fi

    # 新しいウィンドウを作成してIDEレイアウトを構築
    tmux new-window -n "ide" -c "$dir"
    tmux split-window -h -p 30 -c "$dir"
    tmux split-window -v -p 20 -c "$dir"

    # Neovim終了後にウィンドウを自動で閉じる
    tmux send-keys -t 1 "$nvim_cmd; tmux kill-window" C-m

    tmux send-keys -t 2 "ai" C-m

    tmux select-pane -t 1
}
