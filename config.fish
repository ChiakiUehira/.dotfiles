# Path to Oh My Fish install.
set -gx OMF_PATH "~/.local/share/omf"

# Customize Oh My Fish configuration path.
#set -gx OMF_CONFIG "~/.config/omf"

# Load oh-my-fish configuration.
source $OMF_PATH/init.fish

# export
set -gx PATH ~/.nodebrew/current/bin /usr/local/bin /usr/bin /bin /usr/sbin:/sbin ~/.shell


# open

alias safari='open -a safari'
alias atom='open -a atom'
alias chrome='open -a Google\ Chrome'
alias sushida='open -a Google\ Chrome http://neutral.x0.com/home/sushida/play2.html'
alias github='open -a Google\ Chrome http://github.com/in-the-box'
# short

alias stat='stat -x'
alias la='ls -a'
alias ll='ls -l'
alias l='ls -a -l -i'
alias li='ls -i'

# dir

alias desktop='~/Desktop'
alias works='~/works'
alias dropbox='~/Dropbox'
alias tmp='~/tmp'


