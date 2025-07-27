# Google検索関数
google() {
    local query="$*"
    if [[ -z "$query" ]]; then
        echo "使用法: google 検索キーワード"
        return 1
    fi
    
    # URLエンコード
    local encoded_query=$(echo "$query" | sed 's/ /+/g')
    local url="https://www.google.com/search?q=${encoded_query}"
    
    # ブラウザで開く
    open "$url"
}