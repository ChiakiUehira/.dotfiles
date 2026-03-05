#!/bin/bash
# Notification イベントの notification_type で分岐

INPUT=$(cat)
case "$INPUT" in
  *"permission_prompt"*|*"elicitation_dialog"*)
    ~/.claude/hooks/tmux-status.sh set "待機中"
    ;;
  *"idle_prompt"*)
    ~/.claude/hooks/tmux-status.sh clear
    ;;
esac
exit 0
