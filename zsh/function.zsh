# 関数ファイルの読み込み
# 関数ディレクトリが存在する場合のみ読み込み
FUNCTIONS_DIR="$HOME/.config/zsh/functions"

if [ -d "$FUNCTIONS_DIR" ]; then
    # すべての.zshファイルを読み込み
    for func_file in "$FUNCTIONS_DIR"/*.zsh; do
        [ -f "$func_file" ] && source "$func_file"
    done
    unset func_file
fi

unset FUNCTIONS_DIR

