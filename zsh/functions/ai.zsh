#!/usr/bin/env zsh
# Claude Code launcher with multi-pane support
# Usage: ai [count]
#   ai     -> Launch single claude (current pane if alone, new window if not)
#   ai 3   -> Open new tmux window with 3 claude panes

ai() {
    [ -z "$TMUX" ] && { echo "❌ Not in tmux session"; return 1; }

    local count=${1:-1}
    local current_panes=$(tmux list-panes | wc -l | tr -d ' ')

    # 1つだけ起動 → 現在のペインでそのまま起動（ペイン数に関わらず）
    if [ "$count" -eq 1 ] 2>/dev/null; then
        tmux rename-window claude 2>/dev/null
        claude --teammate-mode in-process --dangerously-skip-permissions
        return
    fi

    # 複数起動は新しいウィンドウで起動
    tmux new-window -n "claude" "claude"
    for ((i = 2; i <= count; i++)); do
        if [ "$count" -le 3 ]; then
            tmux split-window -h "claude"
            tmux select-layout even-horizontal
        else
            tmux split-window "claude"
            tmux select-layout tiled
        fi
    done
    tmux select-pane -t 1

    # ペイン削除時に自動でレイアウト再調整
    tmux set-hook -w pane-exited \
        'if-shell "[ $(tmux list-panes | wc -l) -le 3 ]" \
            "select-layout even-horizontal" \
            "select-layout tiled"'
}
