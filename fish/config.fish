
set -gx FISH_ALIASES "~/.config/fish"
set -gx PATH ~/.nodebrew/current/bin /usr/local/bin /usr/bin /bin /usr/sbin /sbin
set -gx GOPATH ~/.go

function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
end

source ~/.config/fish/aliases.fish




