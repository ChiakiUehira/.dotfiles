
set -gx FISH_ALIASES "~/.config/fish"
set -gx GOPATH ~/.go
set -gx PATH ~/.nodebrew/current/bin /usr/local/bin /usr/bin /bin /usr/sbin /sbin ~/.go/bin

function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
end

source ~/.config/fish/aliases.fish




