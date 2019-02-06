
set -gx FISH_ALIASES "~/.config/fish"
set -gx GOPATH ~/.go
set -gx PATH ~/.nodebrew/current/bin /usr/local/php5/bin /usr/local/bin /usr/bin /bin /usr/sbin /sbin ~/.go/bin ~/.composer/vendor/bin

function fish_user_key_bindings
  bind \cr 'peco_select_history (commandline -b)'
end

source ~/.config/fish/aliases.fish





# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/haco/google-cloud-sdk/path.fish.inc' ]; if type source > /dev/null; source '/Users/haco/google-cloud-sdk/path.fish.inc'; else; . '/Users/haco/google-cloud-sdk/path.fish.inc'; end; end
